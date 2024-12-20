

import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Contact details",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://acp.org.np/"),
};

const ContactUs = async () => {

    return (
        <div className=" text-gray-800 max-w-screen-xl mx-auto">
            <Breadcrumbs />

            <main className="mx-auto p-4">

                <h1 className="text-3xl font-bold text-center pb-6">Contact Us</h1>

                <div className="flex flex-col w-full gap-5">

                    <div className="flex flex-col gap-2">
                        <section className="bg-white p-8 rounded-lg shadow-lg mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                            <p>We&apos;d love to hear from you! Whether you have a question about our products, need assistance, or just want to share your feedback, we&apos;re here to help.</p>
                        </section>

                        <section className="bg-white p-8 rounded-lg shadow-lg mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                                    <p className="text-gray-600">info@handicraftsstore.com</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                                    <p className="text-gray-600">+123 456 7890</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                                    <p className="text-gray-600">123 Handicraft Lane, Artisan City, Country</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                                    <p className="text-gray-600">
                                        <a href="#" className="text-blue-500 hover:underline">Facebook</a> |
                                        <a href="#" className="text-blue-500 hover:underline">Instagram</a> |
                                        <a href="#" className="text-blue-500 hover:underline">Twitter</a>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="">

                        <section className="bg-white p-8 rounded-lg shadow-lg mb-6 w-full">
                            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
                            <form action="#" method="POST" className="space-y-4">
                                <div>
                                    <label className="block text-gray-700">Name</label>
                                    <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded-lg" required />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Message</label>
                                    <textarea id="message" name="message" rows={4} className="w-full p-2 border border-gray-300 rounded-lg" required></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Send Message</button>
                                </div>
                            </form>
                        </section>
                    </div>

                </div>


                <section className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold">What is your return policy?</h3>
                            <p className="text-gray-600">We offer a 30-day return policy on all our products. If you&apos;re not satisfied with your purchase, please contact us for a return authorization.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">How can I track my order?</h3>
                            <p className="text-gray-600">Once your order has shipped, we will send you a tracking number via email. You can use this number to track your order on our website.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Do you offer international shipping?</h3>
                            <p className="text-gray-600">Yes, we offer international shipping to many countries. Shipping costs and delivery times vary depending on the destination.</p>
                        </div>
                    </div>
                </section>

            </main>

        </div>
    );
};

export default ContactUs;
