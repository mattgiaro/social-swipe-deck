import * as React from "react"
import { Metadata } from 'next'
import { ClientLayout } from '@/app/client-layout'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://socialswipedeck.com'),
  title: {
    template: '%s | Social Swipe Deck',
    default: 'Social Swipe Deck - Discover Viral Social Media Posts',
  },
  description: 'Discover and analyze top-performing social media content from leading creators across X, LinkedIn, and Substack. Get insights into viral posts and content strategies.',
  keywords: [
    'social media',
    'viral posts',
    'content creation',
    'X posts',
    'LinkedIn content',
    'Substack newsletters',
    'social media analytics',
    'content strategy',
    'digital marketing',
    'creator economy'
  ],
  authors: [{ name: 'Social Swipe Deck' }],
  creator: 'Social Swipe Deck',
  publisher: 'Social Swipe Deck',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Social Swipe Deck',
    title: 'Social Swipe Deck - Discover Viral Social Media Posts',
    description: 'Discover and analyze top-performing social media content from leading creators across X, LinkedIn, and Substack.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Swipe Deck - Viral Social Media Posts',
    description: 'Discover and analyze top-performing social media content from leading creators.',
    creator: '@socialswipedeck',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
        />
      </head>
      <ClientLayout>
        {children}
        <Analytics />
      </ClientLayout>
    </html>
  )
}
