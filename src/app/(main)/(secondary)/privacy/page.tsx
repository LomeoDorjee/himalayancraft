

import Breadcrumbs from '@/components/Breadcrumbs';
import type { Metadata } from "next";
import React from 'react';

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Read and acknowledge our privacy policy",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://himalayancraftshop.com/"),
};

const Privacy = async () => {

    return (
        <div className="px-4 py-2 lg:px-6 xl:px-32 2xl:px-64">
            <Breadcrumbs />

            <div className="p-2">
                <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                    <p>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}! We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <a href="mailto:support@himalayancraftshop.com" className='text-blue-600'>support@himalayancraftshop.com</a>.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
                    <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. This may include:</p>
                    <ul className="list-disc list-inside">
                        <li>Name and Contact Data (e.g., email address, phone number)</li>
                        <li>Credentials (e.g., passwords, security information)</li>
                        <li>Payment Data (e.g., credit card information)</li>
                        <li>Usage Data (e.g., information on how you use our website)</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
                    <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. These purposes include:</p>
                    <ul className="list-disc list-inside">
                        <li>To facilitate account creation and logon process</li>
                        <li>To send administrative information to you</li>
                        <li>To fulfill and manage your orders</li>
                        <li>To manage user accounts</li>
                        <li>To respond to user inquiries/offer support to users</li>
                        <li>To send you marketing and promotional communications</li>
                        <li>To deliver targeted advertising to you</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
                    <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include:</p>
                    <ul className="list-disc list-inside">
                        <li>Payment processing</li>
                        <li>Data analysis</li>
                        <li>Email delivery</li>
                        <li>Hosting services</li>
                        <li>Customer service</li>
                        <li>Marketing efforts</li>
                    </ul>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">5. Cookies and Tracking Technologies</h2>
                    <p>We may use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">6. Data Security</h2>
                    <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. These measures include:</p>
                    <ul className="list-disc list-inside">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security audits and assessments</li>
                        <li>Access controls and authentication mechanisms</li>
                        <li>Employee training on data protection best practices</li>
                    </ul>
                    <p>However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure. Therefore, we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">7. Your Privacy Rights</h2>
                    <p>In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right to:</p>
                    <ul className="list-disc list-inside">
                        <li>Request access and obtain a copy of your personal information</li>
                        <li>Request rectification or erasure</li>
                        <li>Restrict the processing of your personal information</li>
                        <li>If applicable, to data portability</li>
                    </ul>
                    <p>If you wish to exercise any of these rights, please contact us using the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.</p>
                </section>

                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">8. Updates to This Policy</h2>
                    <p>We may update this privacy notice from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.</p>
                </section>

            </div>
        </div>
    );
};

export default Privacy;
