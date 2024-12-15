import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const url: string = process.env.NEXT_PUBLIC_DOMAIN_URL ? process.env.NEXT_PUBLIC_DOMAIN_URL : "https://nepalcraft.com.np/"
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${url}sitemap.xml`,
    }
}