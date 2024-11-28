import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from '@/components/ui/button'

interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-8 mx-auto sm:px-12 lg:px-16">
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
            className="w-8 h-8"
          />
          <span className="font-semibold text-xl">
            Social Swipe Deck
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {children}
          
          {/* Auth Button - Single Instance */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  )
} 