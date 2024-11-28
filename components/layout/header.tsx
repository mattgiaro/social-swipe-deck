import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-2">
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

        {/* Sign Up Button */}
        <Button 
          asChild
          className="bg-[#5445FF] hover:bg-[#5445FF]/90 text-white"
        >
          <Link href="/sign-up">
            SIGN UP FOR FREE
          </Link>
        </Button>

        {children}
      </div>
    </header>
  )
} 