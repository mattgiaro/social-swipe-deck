import * as React from "react"
import { Metadata } from 'next'
import { ClientLayout } from '@/app/client-layout'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://socialswipedeck.com'),
  title: {
    template: '%s | Social Swipe Deck',
    default: 'Social Swipe Deck - Discover Viral Social Media Posts',
  },
  description: 'Discover and analyze top-performing social media content from leading creators across X, LinkedIn, and Substack. Get insights into viral posts and content strategies.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ],
  },
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
      <body className="min-h-screen bg-background font-sans antialiased">
        <ClerkProvider appearance={{
          baseTheme: undefined,
          variables: { colorPrimary: '#5445FF' },
          elements: {
            formButtonPrimary: 'bg-[#5445FF] hover:bg-[#5445FF]/90',
            card: 'bg-background',
            headerTitle: 'text-foreground',
            headerSubtitle: 'text-muted-foreground',
            socialButtonsBlockButton: 'bg-background border-border text-foreground hover:bg-muted',
            socialButtonsBlockButtonText: 'text-foreground',
            dividerLine: 'bg-border',
            dividerText: 'text-muted-foreground',
            formFieldLabel: 'text-foreground',
            formFieldInput: 'bg-background border-input',
            footerActionLink: 'text-[#5445FF] hover:text-[#5445FF]/90',
            formFieldInputShowPasswordButton: 'text-muted-foreground'
          }
        }}>
          <ClientLayout>
            {children}
            <Analytics />
            <Toaster 
              position="top-center"
              expand={true}
              richColors
              closeButton
            />
          </ClientLayout>
        </ClerkProvider>
      </body>
    </html>
  )
}
