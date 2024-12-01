import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCreatorPageUrl(creatorId: string, platform: string) {
  const normalizedCreatorId = creatorId.toLowerCase()
  const normalizedPlatform = platform.toLowerCase()
  return `/best-${normalizedPlatform}-posts/${normalizedCreatorId}`
}

export function parseCreatorPageUrl(path: string, segment: string = 'creatorId') {
  const match = path.match(/best-(x|linkedin|substack)-posts\/(.*?)$/)
  if (!match) return null
  
  const [, platform, identifier] = match
  return {
    platform: platform.toLowerCase() === 'x' ? 'X' :
      platform.toLowerCase() === 'linkedin' ? 'LinkedIn' :
      'Substack',
    [segment]: identifier
  }
} 