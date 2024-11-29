import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Platform = 'X' | 'LinkedIn' | 'Substack'

export interface PlatformFilterProps {
  className?: string
  selectedPlatform?: Platform
  onPlatformChange: (platform: Platform | null) => void
  availablePlatforms?: Platform[]
}

export function PlatformFilter({
  className,
  selectedPlatform,
  onPlatformChange,
  availablePlatforms = ['X', 'LinkedIn', 'Substack']
}: PlatformFilterProps) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2 sm:gap-4", className)}>
      <Button
        variant={selectedPlatform === 'X' ? "default" : "outline"}
        size="sm"
        className={cn(
          "flex items-center gap-1 sm:gap-2 transition-colors min-w-[80px] sm:min-w-[100px]",
          "hover:border-black hover:text-black text-sm sm:text-base",
          selectedPlatform === 'X' && "bg-black hover:bg-black/90 hover:text-white border-black text-white"
        )}
        onClick={() => onPlatformChange?.(selectedPlatform === 'X' ? null : 'X')}
      >
        <i className="bi bi-twitter-x text-lg sm:text-xl" />
        X
      </Button>
      <Button
        variant={selectedPlatform === 'LinkedIn' ? "default" : "outline"}
        size="sm"
        className={cn(
          "flex items-center gap-1 sm:gap-2 transition-colors min-w-[80px] sm:min-w-[100px]",
          "hover:border-[#0A66C2] hover:text-[#0A66C2] text-sm sm:text-base",
          selectedPlatform === 'LinkedIn' && "bg-[#0A66C2] hover:bg-[#0A66C2]/90 hover:text-white border-[#0A66C2] text-white"
        )}
        onClick={() => onPlatformChange?.(selectedPlatform === 'LinkedIn' ? null : 'LinkedIn')}
      >
        <i className="bi bi-linkedin text-lg sm:text-xl" />
        LinkedIn
      </Button>
      <Button
        variant={selectedPlatform === 'Substack' ? "default" : "outline"}
        size="sm"
        className={cn(
          "flex items-center gap-1 sm:gap-2 transition-colors min-w-[80px] sm:min-w-[100px]",
          "hover:border-[#FF6719] hover:text-[#FF6719] text-sm sm:text-base",
          selectedPlatform === 'Substack' && "bg-[#FF6719] hover:bg-[#FF6719]/90 hover:text-white border-[#FF6719] text-white"
        )}
        onClick={() => onPlatformChange?.(selectedPlatform === 'Substack' ? null : 'Substack')}
      >
        <i className="bi bi-substack text-lg sm:text-xl" />
        Substack
      </Button>
    </div>
  )
} 