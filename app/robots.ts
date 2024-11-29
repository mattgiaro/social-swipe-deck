import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://socialswipedeck.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/best-*',  // Allow all creator pages
          '/terms',
          '/search',
          '/platform/*',  // Allow platform-specific pages
        ],
        disallow: [
          '/api/*',      // Protect API routes
          '/(auth)/*',   // Protect auth routes
          '/dashboard/*', // Protect dashboard
          '/admin/*',    // Protect admin routes
          '/*.json',     // Protect JSON files
          '/*.xml',      // Protect XML files except sitemap
          '/private/*',  // Protect private routes
        ],
      },
      {
        userAgent: 'GPTBot',  // Special rules for ChatGPT bot
        disallow: ['/'],      // Prevent content scraping
      },
      {
        userAgent: 'CCBot',   // Special rules for Common Crawl
        disallow: ['/'],      // Prevent content scraping
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
} 