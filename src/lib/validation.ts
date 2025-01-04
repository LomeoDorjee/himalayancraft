import * as z from 'zod'

export const OrderDetailValidation = z.object({
    email: z.string({
        required_error: "Email is required",
    })
        .min(2, { message: "Email: Must be 2 or more characters long" })
        .max(50, { message: "Email: Must be less than 50 characters" })
        .trim(),
    firstname: z.string({
        required_error: "First Name is required",
        invalid_type_error: "First Name must be non numeric",
    })
        .min(2, { message: "First Name: Must be 2 or more characters long" })
        .max(50, { message: "First Name: Must be less than 50 characters" })
        .trim(),
    lastname: z.string({
        required_error: "Last Name is required",
        invalid_type_error: "Last Name must be a string",
    })
        .max(50, { message: "Last Name: Must be less than 50 characters" })
        .trim(),
    shipping_address: z.string({
        required_error: "Shipping Address is required",
        invalid_type_error: "Shipping Address must be a string",
    })
        .max(200, { message: "Shipping Aaddress: Must be less than 200 characters" })
        .trim(),
    city: z.string({
        required_error: "City is required",
    })
        .max(40, { message: "City: Must be less than 40 characters" })
        .trim(),
    country: z.string({
        required_error: "Country is required",
    })
        .max(40, { message: "Country: Must be less than 40 characters" })
        .trim(),
    state: z.string({
        required_error: "State is required",
        invalid_type_error: "State must be in characters",
    })
        .max(30, { message: "State: Must be less than 30 characters" })
        .trim(),
    postalcode: z.number({
        required_error: "Postal Code is Required"
    }),
    phone: z.number({
        required_error: "Phone Number is Required"
    })
})

export const ReviewValidation = z.object({
    customer_name: z.string(),
    customer_avatar: z.string(),
    rating: z.number({
        required_error: "Rating is Required"
    }),
    review: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    })
        .min(5, { message: "Description: Must be 5 or more characters long" })
        .max(500, { message: "Description : Must be less than 500 characters" })
        .trim(),
    created_at: z.string(),
    productid: z.number({
        required_error: "Product is Required"
    }),
    id: z.number()
})

export const CollectionValidation = z.object({
    collectionid:
        z.number()
            .optional(),
    title:
        z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .min(2, { message: "Name: Must be 2 or more characters long" })
            .max(10, { message: "Name: Must be less than 10 characters" })
            .trim(),
    description:
        z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        })
            .min(5, { message: "Description: Must be 5 or more characters long" })
            .max(50, { message: "Description: Must be less than 10 characters" })
            .trim(),
    image:
        z.string({
            required_error: "Image is required",
            invalid_type_error: "Image must be a string",
        })
})

export const ProductValidation = z.object({
    productid:
        z.number()
            .optional(),
    title:
        z.string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .min(2, { message: "Name: Must be 2 or more characters long" })
            .max(10, { message: "Name: Must be less than 10 characters" })
            .trim(),
    description:
        z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        })
            .min(5, { message: "Description: Must be 5 or more characters long" })
            .max(50, { message: "Description: Must be less than 10 characters" })
            .trim(),

    category:
        z.string({
            required_error: "Category is required",
            invalid_type_error: "Category must be a string",
        })
            .min(5, { message: "Category: Must be 5 or more characters long" })
            .max(30, { message: "Category: Must be less than 10 characters" })
            .trim(),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
    isactive: z.boolean(),
    collections: z.string().optional(),
    tags: z.string().optional(),
    sizes: z.string().optional(),
    colors: z.string().optional(),
    mainImage: z.string({
        required_error: "Image is required",
        invalid_type_error: "Image must be a string",
    })
})