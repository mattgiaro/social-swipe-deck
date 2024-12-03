"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { PlatformFilter, PlatformFilterProps } from "@/components/platform-filter"

type Platform = 'X' | 'LinkedIn' | 'Substack'

interface FilterSectionProps {
  initialPlatform?: Platform
  availablePlatforms?: Platform[]
}

export function FilterSection({ 
  initialPlatform,
  availablePlatforms = ['X', 'LinkedIn', 'Substack']
}: FilterSectionProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handlePlatformChange = (platform: Platform | null) => {
    const params = new URLSearchParams(searchParams)
    
    if (platform) {
      params.set('platform', platform)
    } else {
      params.delete('platform')
    }

    const query = params.toString()
    const url = pathname + (query ? `?${query}` : '')
    router.replace(url, { scroll: false })
  }

  return (
    <div className="container mx-auto px-4">
      <PlatformFilter 
        className="mb-12"
        selectedPlatform={initialPlatform}
        onPlatformChange={handlePlatformChange}
        availablePlatforms={availablePlatforms}
      />
    </div>
  )
} 