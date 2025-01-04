"use client"

import { useCart } from "@/context/CartContext"
import { toast } from "@/hooks/use-toast"
import { placeOrder } from "@/lib/actions/product.actions"
import { OrderDetailValidation } from "@/lib/validation"
import { redirect } from "next/navigation"
import { useCallback, useState } from "react"
import { useFormStatus } from "react-dom"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

type MainDataType = TY_OrderUserDetails

type FormProps = {
    userId: string
    userEmail: string
    userFirstName: string
    userLastName: string
}

export default function OrderForm({
    userId,
    userEmail,
    userFirstName,
    userLastName
}: FormProps) {

    const { state } = useCart()

    const [mainData, setMainData] = useState<MainDataType>({
        email: userEmail,
        firstname: userFirstName,
        lastname: userLastName,
        shipping_address: "",
        city: "",
        country: "US",
        state: "",
        postalcode: 727,
        phone: 4528,
    })

    const formSubmit = async (formData: FormData) => {

        // Validation
        const zod = OrderDetailValidation.safeParse(mainData)
        if (!zod.success) {

            let errorMessage = "";

            zod.error.issues.forEach((issue) => {
                errorMessage = errorMessage + "[" + issue.path[0] + "]: " + issue.message + "."
            })
            toast({
                title: "Uh oh! Something went wrong.",
                description: <span dangerouslySetInnerHTML={{ __html: errorMessage.replaceAll(".", ".<br />") }} />,
                variant: "destructive",
            })
            return;
        }

        // // serverside function call 
        const response = await placeOrder(zod.data, state.items)
        if (response?.status != "success") {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "" + response?.status,
                variant: "destructive",
            })
            console.log(response.status)
            return
        }

        // redirect to thankyou
        redirect('/thank-you?orderId=' + response?.id)

    }

    const handleChange = useCallback((type: string, value?: string | boolean | number) => {
        if (value) {
            setMainData(prevState => ({
                ...prevState,
                [type]: value
            }));
        } else {
            setMainData(prevState => ({
                ...prevState,
                [type]: ""
            }));
        }
    }, []);


    return (
        <form action={formSubmit} className="">
            <div>
                <h2 className="text-lg font-medium text-gray-900">Contact information</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-2">

                    <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            First name
                        </label>
                        <div className="mt-1">
                            <Input
                                type="text"
                                id="first-name"
                                name="first-name"
                                autoComplete="given-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleChange('firstname', e.target.value)}
                                value={mainData.firstname ? mainData.firstname : ""}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                            Last name
                        </label>
                        <div className="mt-1">
                            <Input
                                type="text"
                                id="last-name"
                                name="last-name"
                                autoComplete="family-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleChange('lastname', e.target.value)}
                                value={mainData.lastname}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">

                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <Input
                                type="email"
                                id="email-address"
                                name="email-address"
                                autoComplete="email"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                                value={mainData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>
                    </div>

                </div>

            </div>


            <div className="my-5 border-t border-b border-gray-200 py-5">
                <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

                    <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address <span className="inline-flex text-red-700">*</span>
                        </label>
                        <div className="mt-1">
                            <Textarea id="address"
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Shipping Address"
                                onChange={(e) => handleChange('shipping_address', e.target.value)}
                                value={mainData.shipping_address}
                                autoFocus
                            >
                            </Textarea>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <div className="mt-1">
                            <Input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleChange('city', e.target.value)}
                                value={mainData.city}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <div className="mt-1">
                            <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={mainData.country}
                                onChange={(e) => handleChange('country', e.target.value)}
                            >
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="MX">Mexico</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            State / Province
                        </label>
                        <div className="mt-1">
                            <Input
                                type="text"
                                name="region"
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={mainData.state}
                                onChange={(e) => handleChange('state', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            Postal code
                        </label>
                        <div className="mt-1">
                            <Input
                                type="number"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={mainData.postalcode}
                                onChange={(e) => handleChange('postalcode', e.target.valueAsNumber)}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <div className="mt-1">
                            <Input
                                type="number"
                                name="phone"
                                id="phone"
                                autoComplete="tel"
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                onChange={(e) => handleChange('phone', e.target.valueAsNumber)}
                                value={mainData.phone}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <SubmitButton />

        </form>
    )
}

function SubmitButton() {

    const { pending } = useFormStatus()
    return (
        <button type="submit" color="secondary" disabled={pending}
            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
            {pending ? "..." : "Place Order"}
        </button>
    )
}