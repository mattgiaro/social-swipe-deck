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
    <div className={cn("flex justify-center gap-4", className)}>
      <Button
        variant={selectedPlatform === 'X' ? "default" : "outline"}
        size="lg"
        className={cn(
          "flex items-center gap-2 transition-colors",
          "hover:border-black hover:text-black",
          selectedPlatform === 'X' && "bg-black hover:bg-black/90 hover:text-white border-black text-white"
        )}
        onClick={() => onPlatformChange?.(selectedPlatform === 'X' ? null : 'X')}
      >
        <i className="bi bi-twitter-x text-xl" />
        X
      </Button>
      <Button
        variant={selectedPlatform === 'LinkedIn' ? "default" : "outline"}
        size="lg"
        className={cn(
          "flex items-center gap-2 transition-colors",
          "hover:border-[#0A66C2] hover:text-[#0A66C2]",
          selectedPlatform === 'LinkedIn' && "bg-[#0A66C2] hover:bg-[#0A66C2]/90 hover:text-white border-[#0A66C2] text-white"
        )}
        onClick={() => onPlatformChange?.(selectedPlatform === 'LinkedIn' ? null : 'LinkedIn')}
      >
        <i className="bi bi-linkedin text-xl" />
        LinkedIn
      </Button>
      <Button
        variant={selectedPlatform === 'Substack' ? "default" : "outline"}
        size="lg"
        className={cn(
          "flex items-center gap-2 transition-colors",
          "hover:border-[#FF6719] hover:text-[#FF6719]",
          selectedPlatform === 'Substack' && "bg-[#FF6719] hover:bg-[#FF6719]/90 hover:text-white border-[#FF6719] text-white"
        )}
        onClick={() => onPlatformChange?.(selectedPlatform === 'Substack' ? null : 'Substack')}
      >
        <i className="bi bi-substack text-xl" />
        Substack
      </Button>
    </div>
  )
} 