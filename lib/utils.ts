import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCreatorPageUrl(creatorId: string, platform: string) {
  const normalizedCreatorId = creatorId.toLowerCase()
  const normalizedPlatform = platform.toLowerCase()
  return `/best-${normalizedCreatorId}-${normalizedPlatform}-posts`
}

export function parseCreatorPageUrl(url: string) {
  const match = url.match(/best-(.*?)-(x|linkedin|substack)-posts/)
  if (!match) return null
  
  const [, creatorId, platform] = match
  return {
    creatorId,
    platform: platform.toLowerCase() === 'x' ? 'X' :
      platform.toLowerCase() === 'linkedin' ? 'LinkedIn' :
      'Substack'
  }
} 