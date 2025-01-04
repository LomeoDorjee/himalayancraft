import { z } from "zod"

export const CategoryValidation = z.object({
    id:
        z.number(),
    title:
        z.string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        })
            .min(2, { message: "Title: Must be 2 or more characters long" })
            .max(10, { message: "Title: Must be less than 10 characters" })
            .trim(),
    description:
        z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        })
            .min(5, { message: "Description: Must be 5 or more characters long" })
            .max(50, { message: "Description: Must be 50 or more characters long" })
            .trim(),
    slug:
        z.string({
            required_error: "Slug is required",
            invalid_type_error: "Slug must be a string",
        })
            .min(2, { message: "Slug: Must be 2 or more characters long" })
            .max(10, { message: "Slug: Must be less than 10 characters" }).trim(),
    banner:
        z.string(),
})

export const TagValidation = z.object({
    id:
        z.number(),
    name:
        z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .min(2, { message: "Name: Must be 2 or more characters long" })
            .max(10, { message: "Name: Must be less than 10 characters" })
            .trim(),
})

export const FooterValidation = z.object({
    id:
        z.number(),
    address1:
        z.string({
            required_error: "Address 1 is required",
            invalid_type_error: "Address 1 must be a string",
        })
            .trim(),
    address2:
        z.string({
            required_error: "Address 2 is required",
            invalid_type_error: "Address 2 must be a string",
        })
            .trim(),
    supportemail:
        z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .trim(),
    phone:
        z.string({
            required_error: "Phone is required",
            invalid_type_error: "Phone must be a string",
        })
            .trim(),
    fb:
        z.string({
            invalid_type_error: "FB Link must be a string",
        })
            .trim().optional(),
    ig:
        z.string({
            invalid_type_error: "IG Link must be a string",
        })
            .trim().optional(),
    yt:
        z.string({
            invalid_type_error: "YT Link must be a string",
        })
            .trim().optional(),
    x:
        z.string({
            invalid_type_error: "X Link must be a string",
        })
            .trim().optional(),
})

export const InventoryValidation = z.object({
    stock:
        z.string(),
    productid:
        z.string(),
    sku:
        z.string({
            required_error: "SKU is required",
            invalid_type_error: "SKU must be a string",
        })
            .min(5, { message: "SKU: Must be 5 or more characters long" })
            .max(10, { message: "SKU: Must be less than 10 characters" })
            .trim(),
})

export const SliderValidation = z.object({
    id:
        z.number(),
    title:
        z.string(),
    description:
        z.string(),
    link:
        z.string(),
    banner:
        z.string(),
    background:
        z.string(),
})


export const ProductValidation = z.object({
    id:
        z.number(),
    name:
        z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .min(2, { message: "Name: Must be 2 or more characters long" })
            .max(50, { message: "Name: Must be less than 50 characters" })
            .trim(),
    slug:
        z.string({
            required_error: "Slug is required",
            invalid_type_error: "Slug must be a string",
        })
            .min(2, { message: "Slug: Must be 2 or more characters long" })
            .max(10, { message: "Slug: Must be less than 10 characters" })
            .trim(),
    description:
        z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        })
            .min(5, { message: "Description: Must be 5 or more characters long" })
            .max(3000, { message: "Description: Must be less than 3000 characters" })
            .trim(),
    adddescription:
        z.string()
            .trim(),
    banner:
        z.string(),
    categoryid:
        z.string({
            required_error: "Category is required",
        }),
    price: z.coerce.number().min(0.1),
    ribbon: z.string(),
    onsale: z.boolean(),
    discount: z.coerce.number().min(0.0),
    discounttype: z.string(),
    shippinginfo: z.string(),
    size: z.string(),
    // expense: z.coerce.number().min(0.1),
    // isactive: z.boolean(),
})

