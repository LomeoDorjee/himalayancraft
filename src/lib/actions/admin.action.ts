"use server"

import { prisma } from "@/lib/db"
import { Prisma } from '@prisma/client'

import { revalidatePath } from "next/cache"
import { catchErrorMessage } from "@/lib/utils";

import fs from 'fs';
import path from 'path';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDINARY_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDINARY_SECRET,
})

// {/* CATEGORY */}
export async function getCategories() {
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

export async function upsertCategory(values: TY_Category, formData: FormData) {
    try {
        const file = formData.get('banner') as File;
        let newbanner: string = ""

        if (file && file != undefined) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({

                },
                    function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        console.log(result)
                        newbanner = result?.url ?? ""
                        resolve(result);
                    })
                    .end(buffer);
            });
        }

        await prisma.categories.upsert({
            where: {
                id: values.id
            },
            update: {
                title: values.title,
                description: values.description,
                slug: values.slug.replaceAll(" ", "").toLowerCase(),
                banner: newbanner != "" ? newbanner : values.banner ?? "",
            },
            create: {
                title: values.title,
                description: values.description,
                slug: values.slug,
                banner: newbanner,
            }
        })

        revalidatePath('/manage')

        return {
            data: [],
            status: "success"
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function deleteCategory(id: number) {
    try {
        await prisma.categories.delete({
            where: {
                id: id
            }
        })
        revalidatePath('/manage')
        return {
            status: "success"
        }
    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

export async function updateCategoriesFiles() {
    try {
        const Tags = await prisma.categories.findMany()

        const content = `const Categories = ${JSON.stringify(Tags, null, 2)};\n\nexport default Categories;`;
        // Save to file 
        const filePath = path.join(process.cwd(), 'src/constants', 'categoriesConstant.js');

        fs.writeFileSync(filePath, content);

        return {
            status: ""
        }

    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}


// {/* Products */}
export async function getProducts() {
    try {
        const data: TY_Product_Inventory[] = await prisma.$queryRaw`SELECT P.id, P.categoryid, P.description, P.name, P.slug, P.banner, P.ribbon, P.onsale, CONCAT(P.discount) AS discount, P.discounttype, P.shippinginfo, CONCAT(P.price) AS price, P.size, P.adddescription,
        IFNULL(GROUP_CONCAT(T.tagname SEPARATOR ", "),"") AS tags, 
        (SELECT SKU FROM inventories where productid = P.id) sku,
        IFNULL((SELECT IFNULL(stock,0) FROM inventories where productid = P.id),0) stock,
        IFNULL((SELECT title FROM categories where id = P.categoryid),"") category
        FROM products P
        LEFT JOIN product_tags T ON T.productid = P.id
        GROUP BY P.id, P.name`

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

export async function upsertProduct(values: TY_Product, formData: FormData) {
    try {
        const file = formData.get('banner') as File;
        let newbanner: string = ""

        if (file && file != undefined) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({

                },
                    function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        console.log(result)
                        newbanner = result?.url ?? ""
                        resolve(result);
                    })
                    .end(buffer);
            });
        }

        const upserted =
            await prisma.products.upsert({
                where: {
                    id: values.id
                },
                update: {
                    name: values.name,
                    description: values.description,
                    slug: values.slug.replaceAll(" ", "").toLowerCase(),
                    banner: newbanner != "" ? newbanner : values.banner ?? "",
                    ribbon: values.ribbon,
                    onsale: values.onsale,
                    discount: values.discount,
                    discounttype: values.discounttype,
                    shippinginfo: values.shippinginfo,
                    categoryid: parseInt(values.categoryid),
                    price: values.price,
                    size: values.size,
                    adddescription: values.adddescription
                },
                create: {
                    name: values.name,
                    description: values.description,
                    slug: values.slug.replaceAll(" ", "").toLowerCase(),
                    banner: newbanner,
                    ribbon: values.ribbon,
                    onsale: values.onsale,
                    discount: values.discount,
                    discounttype: values.discounttype,
                    shippinginfo: values.shippinginfo,
                    categoryid: parseInt(values.categoryid),
                    price: values.price,
                    size: values.size,
                    adddescription: values.adddescription
                }
            })


        // Tags
        const stringifiedTags = formData.get("tags") as string
        if (stringifiedTags) {

            const tags: string[] = JSON.parse(stringifiedTags)
            const objecttags = tags.map(tag => ({ tagname: tag, productid: upserted.id, tagid: 0 }));

            await prisma.product_tags.deleteMany({
                where: {
                    productid: upserted.id
                }
            })

            await prisma.product_tags.createMany({
                data: objecttags
            })

        }

        revalidatePath('/manage/products')

        return {
            data: [],
            status: "success"
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function deleteProduct(id: number) {
    try {
        await prisma.products.delete({
            where: {
                id: parseInt(id.toString())
            }
        })
        revalidatePath('/manage/products')
        return {
            status: "success"
        }
    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

export async function updateProductsFiles() {
    try {
        const data: TY_Product_Extended[] = await prisma.$queryRaw`SELECT P.id, P.categoryid, P.description, P.name, P.slug, P.banner, P.ribbon, P.onsale, CONCAT(P.discount) AS discount, P.discounttype, P.shippinginfo, CONCAT(P.price) AS price, P.size, P.adddescription,
        GROUP_CONCAT(T.tagname SEPARATOR ", ") AS tags, 
        (SELECT slug FROM categories WHERE id = P.categoryid) categoryslug,
        (SELECT SKU FROM inventories where productid = P.id) sku,
        (SELECT stock FROM inventories where productid = P.id) stock
        FROM products P
        LEFT JOIN product_tags T ON T.productid = P.id
        GROUP BY P.id, P.name`

        data.forEach(row => {
            row.id = parseInt(row.id.toString())
            row.categoryid = row.categoryid.toString()
            row.onsale = !!row.onsale
            row.tags = row.tags ?? ""
            row.sku = row.sku ?? ""
            row.stock = row.stock ? row.stock.toString() : "0"
            row.productid = row.id.toString()
            row.categoryslug = row.categoryslug ?? ""
        });

        const content = `const Products = ${JSON.stringify(data, null, 2)};\n\nexport default Products;`;
        // Save to file 
        const filePath = path.join(process.cwd(), 'src/constants', 'productConstant.js');

        fs.writeFileSync(filePath, content);

        return {
            status: ""
        }

    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

// {/* Products Image */}
export async function uploadProductImages(formData: FormData) {
    try {

        const files = formData.getAll('images') as File[];

        if (files.length <= 0) return { status: "No files receiveed" }

        const productId: string = formData.get('productid') as string;

        const toSave: TY_CloudImages[] = []

        // Upload to Cloudinary
        for (const file of files) {
            if (file) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const uploadResult = await new Promise<string>((resolve, reject) => {
                    cloudinary.uploader.upload_stream({},
                        (error, result) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(result?.url ?? "");
                        }
                    ).end(buffer);
                });

                toSave.push({
                    type: "product",
                    fid: parseInt(productId),
                    url: uploadResult
                })
            }
        }

        //  Save to DB
        await prisma.cloud_images.createMany({ data: toSave })

        return {
            status: "success"
        }
    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

export async function getCloudImages(fid: number, type: string) {
    try {

        const data: TY_CloudImages[] = await prisma.cloud_images.findMany({
            where: {
                fid: fid,
                type: type
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

// {/* Products Tags */}
export async function getTags() {
    try {

        const data: TY_Tags[] = await prisma.tags.findMany({
            orderBy: {
                name: 'asc'
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

export async function upsertTag(values: TY_Tags) {
    try {
        await prisma.tags.upsert({
            where: {
                id: values.id
            },
            update: {
                name: values.name
            },
            create: {
                name: values.name
            }
        })

        revalidatePath('/manage/tags')

        return {
            data: [],
            status: "success"
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function deleteTag(id: number) {
    try {
        await prisma.tags.delete({
            where: {
                id: id
            }
        })
        await prisma.product_tags.deleteMany({
            where: {
                tagid: id
            }
        })
        revalidatePath('/manage/tags')
        return {
            status: "success"
        }
    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

export async function updateTagsFile() {
    try {
        const Tags = await prisma.tags.findMany()

        const content = `const Tags = ${JSON.stringify(Tags, null, 2)};\n\nexport default Tags;`;
        // Save to file 
        const filePath = path.join(process.cwd(), 'src/constants', 'tagsConstant.js');

        fs.writeFileSync(filePath, content);

        return {
            status: ""
        }

    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

// find: Inventory
export async function upsertInventory(values: TY_Inventory) {
    try {
        await prisma.inventories.upsert({
            where: {
                productid: parseInt(values.productid)
            },
            update: {
                sku: values.sku,
                stock: parseInt(values.stock),
            },
            create: {
                sku: values.sku,
                stock: parseInt(values.stock),
                productid: parseInt(values.productid)
            }
        })
        revalidatePath("/manage/products")
        return {
            data: [],
            status: "success"
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

// find: Orders
export async function getOrders() {
    try {

        const data: TY_OrderDetails[] = await prisma.orders.findMany({
            orderBy: {
                id: 'desc'
            }
        })

        data.forEach(row => {
            row.total_amount = row.total_amount.toString()
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

export async function getOrderDetails(orderId: number) {
    try {

        const data: TY_OrderAllDetails[] = await prisma.$queryRaw`SELECT 
        O.*, OD.*, 
        CONCAT(O.total_amount) total_amount, 
        CONCAT(OD.price) price, 
        (SELECT name from products WHERE id = OD.productid) productname,
        (SELECT banner from products WHERE id = OD.productid) productbanner,
        (SELECT slug from products WHERE id = OD.productid) productslug
        FROM order_details OD LEFT JOIN orders O ON O.id = OD.orderid
        WHERE O.id = ${orderId}`

        // data.forEach(row => {
        //     row.price = new Prisma.Decimal(row.price);
        //     row.total_amount = new Prisma.Decimal(row.total_amount);
        //     row.productid = Number(row.productid);
        // });

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

export async function changeOrderStatus(orderId: number, status: string) {
    try {

        await prisma.orders.update({
            where: {
                id: parseInt(orderId + "")
            },
            data: {
                status: status
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

export async function updateTrackingNo(orderId: number, no: string) {
    try {

        await prisma.orders.update({
            where: {
                id: parseInt(orderId + "")
            },
            data: {
                tracking_no: no
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

// find: Slider
export async function getSliders() {
    try {

        const data: TY_Slider[] = await prisma.sliders.findMany({
            orderBy: {
                id: 'asc'
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

export async function upsertSlider(values: TY_Slider, formData: FormData) {
    try {
        const file = formData.get('banner') as File;
        let newbanner: string = ""

        if (file && file != undefined) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({

                },
                    function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        console.log(result)
                        newbanner = result?.url ?? ""
                        resolve(result);
                    })
                    .end(buffer);
            });
        }

        await prisma.sliders.upsert({
            where: {
                id: values.id
            },
            update: {
                title: values.title,
                description: values.description,
                link: values.link,
                background: values.background,
                banner: newbanner != "" ? newbanner : values.banner ?? "",
            },
            create: {
                title: values.title,
                description: values.description,
                link: values.link,
                background: values.background,
                banner: newbanner,
            }
        })

        revalidatePath('/manage/sliders')

        return {
            data: [],
            status: "success"
        }
    } catch (e) {
        return {
            data: [],
            status: catchErrorMessage(e)
        }
    }
}

export async function deleteSlider(id: number) {
    try {
        await prisma.sliders.delete({
            where: {
                id: id
            }
        })
        revalidatePath('/manage/sliders')
        return {
            status: "success"
        }
    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}

export async function updateSlidersFiles() {
    try {
        const Tags = await prisma.sliders.findMany()

        const content = `const Slides = ${JSON.stringify(Tags, null, 2)};\n\nexport default Slides;`;
        // Save to file 
        const filePath = path.join(process.cwd(), 'src/constants', 'sliderConstant.js');

        fs.writeFileSync(filePath, content);

        return {
            status: ""
        }

    } catch (e) {
        return {
            status: catchErrorMessage(e)
        }
    }
}
