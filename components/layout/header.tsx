import * as React from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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
        <Button asChild>
          <Link href="/sign-up">
            SIGN UP FOR FREE
          </Link>
        </Button>
      </div>
    </header>
  )
} 