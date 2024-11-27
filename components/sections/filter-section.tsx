"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { PlatformFilter } from "@/components/platform-filter"

type Platform = 'X' | 'LinkedIn' | 'Substack'

export function FilterSection({ 
  initialPlatform 
}: { 
  initialPlatform?: Platform 
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handlePlatformChange = (platform: Platform | null) => {
    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams)
    
    if (platform) {
      params.set('platform', platform)
    } else {
      params.delete('platform')
    }

    // If we're on the home page, use /?params
    // If we're on a creator page, use the current path
    const query = params.toString()
    const url = pathname + (query ? `?${query}` : '')
    router.push(url)
  }

  return (
    <PlatformFilter 
      className="mb-12"
      selectedPlatform={initialPlatform}
      onPlatformChange={handlePlatformChange}
    />
  )
} 