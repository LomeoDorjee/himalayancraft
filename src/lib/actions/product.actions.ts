"use server"

import { revalidatePath } from "next/cache"
import { catchErrorMessage } from "@/lib/utils";
import { prisma } from "@/lib/db"
import { Prisma } from '@prisma/client'
import { auth, currentUser } from "@clerk/nextjs/server";

import { Resend } from 'resend';
import ET_OrderPlaced from "@/components/email/ET-OrderPlaced";

// find: Orders
export async function placeOrder(mainData: TY_OrderUserDetails, cartItems: TY_CartItem[]) {
    try {

        const { userId } = await auth()
        const user = await currentUser()

        if (!userId) return {
            status: "Unauthorized"
        }

        if (cartItems.length == 0) return {
            status: "Cart cannot be empty!"
        }

        const date = new Date().toISOString();

        const calculateTotal = (items: TY_CartItem[]): number => {
            return items.reduce((total, item) => total + ((parseFloat(item.price) - parseFloat(item.discount)) * item.quantity), 0);
        };


        // Insert: Order Table //
        const orderMain: {
            id: number
        } = await prisma.orders.create({
            data: {
                customerid: userId,
                date_time: date,
                status: "ORDER PLACED",
                shipping_address: mainData.shipping_address + ", " + mainData.city + ", " + mainData.state + ", " + mainData.country + (mainData.postalcode ? " - " + mainData.postalcode : ""),
                billing_address: mainData.shipping_address,
                payment_method: "N/A",
                total_amount: calculateTotal(cartItems),
                customer_name: mainData.firstname + " " + mainData.lastname,
                customer_email: mainData.email,
                customer_phone: mainData.phone,
                tracking_no: ""
            }
        })

        if (!orderMain?.id) {
            return {
                status: "Internal Server Error: Order failed to save"
            }
        }

        // Insert: Order Details Table //
        const detailData: {
            customerid: string
            quantity: number
            price: number
            orderid: number
            productid: number
        }[] = []
        cartItems.map(item => {
            detailData.push({
                customerid: userId,
                quantity: item.quantity,
                price: item.price - parseFloat(item.discount),
                orderid: orderMain.id,
                productid: item.productid
            })
        })

        if (detailData.length == 0) {
            return {
                status: "Internal Server Error: Unable to create Product"
            }
        }
        await prisma.order_details.createMany({
            data: detailData
        })

        // ToDo: Update Stock of products

        await prisma.$transaction(
            cartItems.map((item) =>
                prisma.inventories.update({
                    where: { id: item.productid },
                    data: {
                        stock: {
                            decrement: item.quantity, // Reduces the stock by the ordered quantity
                        },
                    },
                })
            )
        );


        // Insert: Shipping
        await prisma.shippings.create({
            data: {
                shipping_date: date,
                shipping_method: "Any",
                shipping_address: mainData.shipping_address,
                tracking_number: 0,
                created_at: date,
                updated_at: date,
                orderid: orderMain.id,
            }
        })


        // Remove: Cart 
        await prisma.carts.deleteMany({
            where: {
                customerid: userId
            }
        })

        if (!user) return {
            status: "success",
            id: orderMain?.id
        }

        await sendEmail(
            user?.firstName ? user?.firstName : "Customer",
            user?.emailAddresses.length > 0 ? user?.emailAddresses[0].emailAddress : "delivered@resend.dev"
        )

        return {
            status: "success",
            id: orderMain?.id
        }
    } catch (e: unknown) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

export async function requestCancel(orderid: number) {
    try {

        await prisma.orders.update({
            where: {
                id: orderid
            },
            data: {
                status: "Cancel Requested"
            }
        })

        return {
            status: ""
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function getOrderById(id: number) {
    try {

        const { userId } = await auth()

        const data: TY_OrderAllDetails[] = await prisma.$queryRaw`SELECT O.*, OD.*, 
        (SELECT name from products WHERE id = OD.productid) productname,
        (SELECT banner from products WHERE id = OD.productid) productbanner,
        (SELECT slug from products WHERE id = OD.productid) productslug
        FROM order_details OD LEFT JOIN orders O ON O.id = OD.orderid
        WHERE O.id = ${id} and O.customerid = ${userId}`

        return {
            data: data,
            status: ""
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function getOrderByUser() {
    try {

        const { userId } = await auth()

        const data: TY_OrderDetails[] = await prisma.orders.findMany({
            where: {
                customerid: userId
            }
        })

        return {
            data: data,
            status: ""
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

// find: Review
export async function submitReview(mainData: TY_Reviews) {
    try {

        const user = await currentUser()

        if (!user?.id) return {
            status: "Unauthorized"
        }

        const date = new Date().toISOString();

        // Insert: Review Table //
        await prisma.reviews.upsert({
            where: {
                id: mainData.id
            },
            create: {
                customerid: user?.id,
                customer_name: user?.fullName,
                customer_avatar: user?.imageUrl,
                productid: mainData.productid,
                rating: mainData.rating,
                review: mainData.review,
                created_at: date,
                updated_at: date,
                published_at: date,
            },
            update: {
                customerid: user?.id,
                customer_name: user?.fullName,
                customer_avatar: user?.imageUrl,
                rating: mainData.rating,
                review: mainData.review,
                created_at: date,
                updated_at: date,
                published_at: date,
            }
        })

        revalidatePath("/my-reviews")

        return {
            status: "success"
        }
    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

export async function getReviewsByUser() {
    try {

        const { userId } = await auth()

        const data: TY_ReviewByUser[] = await prisma.$queryRaw`
        SELECT R.*, P.name AS product_name, 
        (
            SELECT url from files 
            WHERE id IN (
                SELECT file_id FROM files_related_morphs 
                where related_type = "api::product.product" 
                AND field='banner' AND related_id = P.id
            ) LIMIT 1 
        ) product_banner FROM reviews R 
        LEFT JOIN products P on R.productid = P.id
        WHERE customerid = ${userId}`

        return {
            data: data,
            status: ""
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function getReviewsByProduct(productid: number) {
    try {

        const { userId } = await auth()

        const data: TY_Reviews[] = await prisma.$queryRaw`
        SELECT R.* FROM reviews R
        WHERE productid = ${productid}
        ORDER BY id desc`

        return {
            data: data,
            status: ""
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

// find: Products

export async function filterProducts(
    searchParams: any,
    LIMIT: number,
    categorySlugId?: string | number
) {
    try {

        let sql = `
            SELECT *
            FROM products P WHERE 1=1 `

        if (searchParams?.cat && searchParams?.cat != 'all') {
            sql += ` AND P.categoryid IN (
                SELECT id from categories where slug IN ("${searchParams?.cat.replaceAll(',', ' ", "')}")
            )`
        }

        if (searchParams?.tags && searchParams?.tags != 'all') {
            sql += ` AND P.id IN (
                SELECT productid from product_tags where tagname IN ("${searchParams?.tags.replaceAll(',', ' ", "')}")
            )`
        }

        if (searchParams?.min) {
            sql += ` AND P.price >= ${parseInt(searchParams?.min)} `
        }

        if (searchParams?.max) {
            sql += ` AND P.price =< ${parseInt(searchParams?.max)} `
        }

        if (searchParams?.name && searchParams?.name.length > 0) {
            sql += ` AND ( P.name LIKE '%${searchParams?.name}%' OR P.description LIKE '%${searchParams?.name}%' ) `
        }

        if (categorySlugId && categorySlugId != "all" && typeof categorySlugId === 'string') {
            sql += ` AND P.categoryid IN (
                SELECT id FROM categories 
                WHERE slug IN ("${categorySlugId.replaceAll(',', '", "')}") 
            )`
        } else if (categorySlugId && categorySlugId != 0 && typeof categorySlugId === 'number') {
            sql += ` AND P.categoryid IN (${categorySlugId}) `
        }

        // Total Record //
        const totalCount: TY_Product[] = await prisma.$queryRaw(Prisma.raw(sql))

        if (searchParams?.sort && searchParams?.sort != 'none') {
            const [sortType, sortBy] = searchParams.sort.split(" ");
            sql += ` ORDER BY ${sortBy} ${sortType}`
        } else {
            sql += ` ORDER BY P.id desc`
        }

        if (searchParams?.limit && searchParams?.limit > 1) {
            sql += ` LIMIT ${searchParams?.limit} `
        } else if (LIMIT) {
            sql += ` LIMIT ${LIMIT} `
        }

        let OFFSET = 0
        if (searchParams?.page &&
            ((parseInt(searchParams?.page) - 1) * LIMIT) > 0) {
            OFFSET = (parseInt(searchParams?.page) - 1) * LIMIT
            sql += ` OFFSET ${OFFSET} `
        }

        const data: TY_Product[] = await prisma.$queryRaw(Prisma.raw(sql))

        return {
            data: data,
            totalCount: totalCount.length,
            hasPrev: (OFFSET > 0 && totalCount.length > 0) ? true : false,
            hasNext: (totalCount.length > (LIMIT + OFFSET)) ? true : false,
            page: parseInt(searchParams?.page) || 1,
            status: ""
        }

    } catch (e) {
        return {
            data: [],
            totalCount: 0,
            hasPrev: false,
            hasNext: false,
            page: 0,
            status: catchErrorMessage(e),
        }
    }
}

export async function getProductBySlug(slug: string) {
    try {

        const sql = `
            SELECT P.*, 
            (SELECT title from categories where id = P.categoryid) category, 
            (SELECT sku from inventories where productid = P.id) sku, 
            (SELECT stock from inventories where productid = P.id) stock
            FROM products P
            WHERE P.slug IN ("${slug}")`

        const data: TY_ProductDetail[] = await prisma.$queryRaw(Prisma.raw(sql))

        return {
            data: data,
            status: ""
        }

    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function getProductImagesBySlug(slug: string) {
    try {

        const sql = `SELECT *  FROM cloud_images
            WHERE type = 'product' AND fid IN (
                SELECT id FROM products P
                WHERE P.slug IN ("${slug}")
            )`

        const data: TY_CloudImages[] = await prisma.$queryRaw(Prisma.raw(sql))

        return {
            data: data,
            status: ""
        }

    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

// find: Email
async function sendEmail(firstName: string, email: string) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_EMAIL ? process.env.RESEND_EMAIL : "",
            to: [email],
            subject: 'Subject: Testing via Resend',
            react: ET_OrderPlaced({ firstName: firstName }),
        });

        if (error) {
            console.log(error)
        }

        return Response.json(data);
    } catch (error) {
        console.log(error)
    }

}

// find: Categories
export async function getAllCategories() {
    try {

        const data: TY_Category[] = await prisma.categories.findMany()

        return {
            data: data,
            status: ""
        }

    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

// find: Cart
export async function getCartItems() {
    try {
        const { userId } = await auth();

        if (!userId) return {
            data: [],
            status: "Unauthorized"
        }


        const data: TY_CartItem[] = await prisma.$queryRaw`
        SELECT C.banner, C.customerid, C.price, C.quantity, C.productid, C.discount,
        (SELECT name FROM products where id = C.productid) AS name,
        (
            SELECT stock from inventories I WHERE I.productid = C.productid 
        ) AS stock
        FROM carts C
        WHERE C.customerid = ${userId}
        ORDER BY C.id`

        data.forEach(row => {
            row.price = new Prisma.Decimal(row.price);
            row.discount = new Prisma.Decimal(row.discount);
            row.productid = Number(row.productid);
        });

        return {
            data: data,
            status: ""
        }

    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}