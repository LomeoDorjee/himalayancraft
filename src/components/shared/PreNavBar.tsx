import { getAllCategories } from '@/lib/actions/product.actions'
import { BanknoteIcon, Globe2, List } from 'lucide-react'
import Link from 'next/link'

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import Categories from "../../constants/categoriesConstant.js"

export async function PreNavBar() {

    const categories: TY_Category[] = Categories

    return (
        <nav className="px-4 lg:px-6 xl:px-32 2xl:px-64 py-0.5 dark:bg-gray-800 bg-white/80 border-b border-gray" >

            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
                <div className="flex gap-1 justify-start">
                    <div className="justify-between items-center flex w-auto" id="mobile-menu-2">
                        <ul className="flex font-normal flex-row mt-0">
                            <li>
                                <Link href="/" className="block md:pr-4 md:pl-3 rounded bg-primary-700 bg-transparent text-primary-700 p-2 dark:text-white" aria-current="page">Home</Link>
                            </li>
                            <li className='hidden md:flex'>
                                <Link href="/list" className="block md:pr-4 md:pl-3 rounded bg-primary-700 bg-transparent text-primary-700 p-2 dark:text-white" aria-current="page">List</Link>
                            </li>
                            <li className='hidden md:flex'>
                                <Link href="/about-us" className="block md:pr-4 md:pl-3 rounded bg-primary-700 bg-transparent text-primary-700 p-2 dark:text-white" aria-current="page">About us</Link>
                            </li>
                            <li className='hidden md:flex'>
                                <Link href="/contact-us" className="hidden md:block md:pr-4 md:pl-3 rounded bg-primary-700 bg-transparent text-primary-700 p-2 dark:text-white" aria-current="page">Contact us</Link>
                            </li>
                        </ul>


                        <NavigationMenu className='z-50'>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='md:pr-2 md:pl-3 rounded bg-primary-700 bg-transparent text-primary-700 p-2 dark:text-white w-full'>Categories</NavigationMenuTrigger>
                                    <NavigationMenuContent>

                                        <ul
                                            // className="grid gap-5 px-1 grid-cols-2 py-5 mx-4" 
                                            className="grid w-[300px] gap-1 p-4 md:w-[400px] grid-cols-2">
                                            <li className='p-1 py-3 leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-lg'>
                                                <Link
                                                    href={`/category/all`}
                                                    className=
                                                    "block space-y-1 rounded-md px-1 transition-all hover:underline hover:underline-offset-2 cursor-pointer text-sm font-medium"
                                                >
                                                    All Products
                                                </Link>
                                            </li>
                                            {
                                                categories.length > 0 ?
                                                    categories.map((cat: TY_Category, index: number) => (
                                                        <li key={index} className='p-1 py-3 transition-all leading-none no-underline outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-lg'>
                                                            <Link
                                                                href={`/category/${cat.slug}`}
                                                                className=
                                                                "block space-y-1 rounded-md px-1 cursor-pointer text-sm font-medium"
                                                            >
                                                                {cat.title}
                                                            </Link>
                                                        </li>
                                                    )
                                                    ) : (
                                                        <>No Categories Yet!</>
                                                    )
                                            }
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-gray-500">

                    <div className="flex justify-normal items-center gap-2">
                        <span className="text-gray-500"><Globe2 className='h-5 w-5' /></span>
                        <span className="font-medium"><span className='hidden md:inline-flex'>English </span> (US)</span>
                    </div>
                    <div className="flex justify-normal items-center gap-2">
                        <span className="text-gray-500"><BanknoteIcon className='h-5 w-5' /></span>
                        <span className="font-medium">USD</span>
                    </div>

                </div>

            </div>
        </nav >
    )
}
