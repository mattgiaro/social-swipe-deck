'use client'

import * as React from "react"
import { usePathname } from 'next/navigation'
import { ClerkProvider } from '@clerk/nextjs'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedOut } from '@clerk/nextjs'

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')

  return (
    <ClerkProvider>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header>
          <SignedOut>
            <Button 
              asChild
              className="bg-[#5445FF] hover:bg-[#5445FF]/90 text-white px-6"
              aria-label="Sign up"
            >
              <Link href="/sign-up">
                Sign up
              </Link>
            </Button>
          </SignedOut>
        </Header>
        <main className="min-h-screen">
          {children}
        </main>
        {!isAuthPage && <Footer />}
      </body>
    </ClerkProvider>
  )
} 