

import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "About Us",
    description: "About our organisation. Our values and Missions.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://acp.org.np/"),
};

const AboutUs = async () => {
    async function fetchData() {
        // Simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return { data: 'Hello, world!' };
    }

    await fetchData()

    return (
        <div className=" text-gray-800 max-w-screen-xl mx-auto text-xl px-2">
            <Breadcrumbs />
            <h1 className="text-4xl font-bold text-center">About Us</h1>

            <main className="container mx-auto py-6 md:flex md:flex-col gap-4">

                <section className="bg-white p-8 rounded-lg shadow-lg mb-6">
                    <h2 className="text-3xl underline underline-offset-2 text-slate-700 font-semibold mb-4">Our Story</h2>
                    <p>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}, your number one source for unique and high-quality handicrafts. We&apos;re dedicated to giving you the very best of handcrafted products, with a focus on quality, uniqueness, and customer service.</p>
                    <br />
                    <p>Founded in 2024, {process.env.NEXT_PUBLIC_APP_NAME} has come a long way from its beginnings in Boudha. When the founder first started out, their passion for handmade crafts drove them to start their own business.</p>
                </section>

                <section className="bg-white p-8 rounded-lg shadow-lg mb-6">
                    <h2 className="text-3xl underline underline-offset-2 text-slate-700 font-semibold mb-4">Mission</h2>
                    <p>Our mission is to bring the beauty and craftsmanship of handmade products to the world. We believe in supporting artisans and preserving traditional crafts. Each product we offer is a testament to the skill and dedication of the artisans who create them.</p>
                </section>

                <section className="bg-white p-8 rounded-lg shadow-lg mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Meet Our Founders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            {/* <img src="team-member1.jpg" alt="Team Member 1" className="w-full h-48 object-cover rounded-lg mb-4" /> */}
                            <h3 className="text-xl font-semibold">[F Member 1]</h3>
                            <p className="text-gray-600">Founder & CEO</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            {/* <img src="team-member2.jpg" alt="Team Member 2" className="w-full h-48 object-cover rounded-lg mb-4" /> */}
                            <h3 className="text-xl font-semibold">[F Member 2]</h3>
                            <p className="text-gray-600">Chief Artisan</p>
                        </div>
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                            {/* <img src="team-member3.jpg" alt="Team Member 3" className="w-full h-48 object-cover rounded-lg mb-4" /> */}
                            <h3 className="text-xl font-semibold">[F Member 3]</h3>
                            <p className="text-gray-600">Marketing Head</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                    <ul className="list-disc list-inside">
                        <li>High-Quality Products: We ensure that every product meets our high standards of quality.</li>
                        <li>Unique Designs: Our products are unique and handcrafted with care.</li>
                        <li>Support for Artisans: We work directly with artisans to ensure they receive fair compensation for their work.</li>
                        <li>Excellent Customer Service: We are committed to providing the best customer service experience.</li>
                    </ul>
                </section>

                <section className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p>If you have any questions or comments, please don&apos;t hesitate to contact us at [ support@himalayancraftshop.com ].</p>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;
