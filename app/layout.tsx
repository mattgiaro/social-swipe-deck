'use client'

import * as React from "react"
import { usePathname } from 'next/navigation'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link 
            rel="stylesheet" 
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
          />
        </head>
        <body className={inter.className}>
          <Header>
            <SignedOut>
              <Button 
                asChild
                className="bg-[#5445FF] hover:bg-[#5445FF]/90 text-white px-6"
                aria-label="Sign up for free"
              >
                <Link href="/sign-up">
                  Sign up for free
                </Link>
              </Button>
            </SignedOut>
          </Header>
          <main className="min-h-screen">
            {children}
          </main>
          {!isAuthPage && <Footer />}
        </body>
      </html>
    </ClerkProvider>
  )
}
