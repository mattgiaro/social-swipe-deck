import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, UserButton } from "@clerk/nextjs"
import { Button } from '@/components/ui/button'

interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 mx-auto">
        {/* Logo and Name */}
        <Link 
          href="/" 
          className="flex items-center gap-2"
          aria-label="Go to homepage"
        >
          <Image
            src="/logo.png"
            alt="Social Swipe Deck"
            width={32}
            height={32}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <span className="font-semibold text-sm sm:text-xl">
            Social Swipe Deck
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2 [&>a]:py-1.5 [&>a]:px-3">
          {children}
          
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  )
} 