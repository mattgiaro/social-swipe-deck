'use client'

import * as React from "react"
import { usePathname } from 'next/navigation'
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
  const isDashboard = pathname === '/dashboard'

  return (
    <>
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
      {!isAuthPage && (
        isDashboard ? (
          <footer className="border-t">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
              <div className="font-semibold">
                Social Swipe Deck
              </div>
              <div className="text-sm text-muted-foreground">
                Copyright © 2024. All rights reserved.{' '}
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </div>
            </div>
          </footer>
        ) : (
          <Footer />
        )
      )}
    </>
  )
} 