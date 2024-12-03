import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

export const Header = () => {
  const { isSignedIn } = useAuth()
  
  const handleLogoClick = () => {
    // Navigation is handled by the Link component
    return
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link 
          href={isSignedIn ? "/dashboard" : "/"} 
          className="flex items-center space-x-2"
          onClick={handleLogoClick}
        >
          <img 
            src="/logo.png" 
            alt="Social Swipe Deck Logo" 
            className="h-8 w-8"
          />
          <span className="font-bold">Social Swipe Deck</span>
        </Link>
      </div>
    </header>
  )
} 