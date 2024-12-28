

import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Contact details",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/"),
};

const ContactUs = async () => {

    return (
        <div className="px-4 py-2 lg:px-6 xl:px-32 2xl:px-64">
            <Breadcrumbs />

            <main className="mx-auto p-1">

                <h1 className="text-3xl font-bold text-center pb-4">Contact Us</h1>

                <div className="flex flex-col md:flex-row gap-4">

                    <section className="bg-white p-6 rounded-lg shadow-lg">
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

                    <div className="flex flex-col w-full gap-2 md:gap-3">

                        <div className="flex flex-col gap-2">
                            <section className="bg-white p-6 rounded-lg shadow-lg mb-2">
                                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                                <p>We&apos;d love to hear from you! Whether you have a question about our products, need assistance, or just want to share your feedback, we&apos;re here to help.</p>
                            </section>

                            <section className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                                        <p className="text-gray-600">info@himalayancraftshop.com</p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                                        <div className="text-gray-600 flex flex-row items-center gap-1">
                                            <span>+977 - 9824114513</span>
                                            {/* WhatsApp Link */}
                                            <Link
                                                href="https://wa.me/9824114513"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-500"
                                            >
                                                <Image
                                                    width={15}
                                                    height={15}
                                                    src={'/assets/svg/whatsapp.svg'}
                                                    alt='whatsapp'
                                                />
                                            </Link>

                                            {/* Viber Link */}
                                            <Link
                                                href="viber://contact?number=9824114513"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500"
                                            >
                                                <Image
                                                    width={18}
                                                    height={18}
                                                    src={'/assets/svg/viber.svg'}
                                                    alt='whatsapp'
                                                />

                                            </Link>

                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                                        <p className="text-gray-600">Boudha, Kathmandu, Nepal - 44600</p>
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


                        {/* <section className="bg-white p-6 rounded-lg shadow-lg w-full">
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
                        </section> */}

                    </div>

                </div>

            </main>

        </div>
    );
};

export default ContactUs;
