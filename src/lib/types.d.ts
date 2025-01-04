type TY_Product = {
    id: number
    categoryid: string
    slug: string
    banner: string
    description: string
    price: decimal
    name: string
    ribbon: string
    onsale: boolean
    discount: decimal
    discounttype: string
    shippinginfo: string
    tags?: string
    size: string
    adddescription: string
    category?: string
}

type TY_ProductDetail = TY_Product & {
    stock: number
    sku: string
    category: string
}

type TY_ProductVariant = {
    choices: {
        [key: string]: string;
    },
    stock: number
}

type TY_ProductOptions = {
    optionType: string
    name: string
    choices: {
        description: string
    }[]
}

type TY_Category = {
    id: number
    title: string | null
    description: string | null
    banner?: string | null
    slug: string
}

type TY_Inventory = {
    id?: number
    productid: string
    sku: string
    stock: string
}

type TY_Product_Inventory = TY_Product & TY_Inventory

type TY_Product_Extended = TY_Product & TY_Inventory & {
    categoryslug: string
}

type TY_Size = {
    id: number
    size: string
}

type TY_Slider = {
    id: number
    title: string
    description: string
    link: string
    banner: string
    background: string
}

type TY_CartItem = {
    productid: number,
    name: string,
    banner: string,
    categories: string,
    // variant: string
    quantity: number
    price: decimal
    discount: decimal
    stock?: number
    slug: string
}

type TY_OrderUserDetails = {
    email: string
    firstname: string
    lastname: string
    shipping_address: string
    city: string
    country: string
    state: string
    postalcode: number
    phone: number
}

type TY_OrderDetails = {
    id: number
    customer_email: string | null
    customer_name: string | null
    total_amount: decimal | null | string
    shipping_address: string | null
    customer_phone: number | null
    status: string | null
    date_time: date | null
    tracking_no: string | null
}

type TY_OrderAllDetails = TY_OrderDetails & {
    productname: string
    productbanner: string
    productslug: string
    price: decimal | string
    quantity: number
    productid: number
}

type TY_Reviews = {
    id?: number
    customer_name: string
    customer_avatar: string
    rating: number
    review: string
    created_at: string
    productid: number
}

type TY_ReviewByUser = TY_Reviews & {
    product_name: string
    product_banner: string
}

type TY_CloudImages = {
    id?: number
    type: string
    fid: number
    url: string
}

type TY_Tags = {
    id: number
    name: string
}

type TY_Footer = {
    id: number
    address1: string
    address2: string
    supportemail: string
    phone: string
    x?: string
    fb?: string
    ig?: string
    yt?: string
}