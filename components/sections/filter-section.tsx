"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { PlatformFilter } from "@/components/platform-filter"

type Platform = 'X' | 'LinkedIn' | 'Substack'

export function FilterSection({ 
  initialPlatform 
}: { 
  initialPlatform?: Platform 
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePlatformChange = (platform: Platform | null) => {
    console.log('Selected platform:', platform)
    
    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams)
    
    if (platform) {
      params.set('platform', platform)
    } else {
      params.delete('platform')
    }

    // Update the URL with the new search params
    router.push(`/?${params.toString()}`)
  }

  return (
    <PlatformFilter 
      className="mb-12"
      selectedPlatform={initialPlatform}
      onPlatformChange={handlePlatformChange}
    />
  )
} 