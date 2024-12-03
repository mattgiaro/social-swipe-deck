import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Creator } from "@/types/creator"

interface SearchResultsProps {
  results: Creator[]
  isLoading: boolean
  onSelect: () => void
  variant?: 'dashboard' | 'homepage'
}

export function SearchResults({ 
  results, 
  isLoading, 
  onSelect,
  variant = 'homepage'
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <Card className="absolute top-full mt-1 w-full z-50 max-h-[300px] overflow-auto p-2 dark:bg-black/95 bg-white border-[#5445FF] dark:border-[#5445FF]/50">
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="flex items-center gap-3 p-2 animate-pulse"
            >
              <div className="w-8 h-8 rounded-full bg-muted" />
              <div className="space-y-1 flex-1">
                <div className="h-4 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (results.length === 0) {
    return (
      <Card className="absolute top-full mt-1 w-full z-50 p-4 text-center text-muted-foreground dark:bg-black/95 bg-white border-[#5445FF] dark:border-[#5445FF]/50">
        No creators found
      </Card>
    )
  }

  return (
    <Card className="absolute top-full mt-1 w-full z-50 max-h-[300px] overflow-auto p-2 dark:bg-black/95 bg-white border-[#5445FF] dark:border-[#5445FF]/50">
      {results.map((creator) => (
        <Link
          key={creator.creator_id}
          href={variant === 'dashboard' 
            ? `/creator/${creator.creator_id}`
            : `/best-x-posts/${creator.creator_id}`
          }
          className="flex items-center gap-3 p-2 hover:bg-[#5445FF]/5 dark:hover:bg-[#5445FF]/10 rounded-md transition-colors"
          onClick={onSelect}
        >
          <Image
            src={creator.profile_picture}
            alt={creator.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <div className="font-medium text-foreground">{creator.name}</div>
            <div className="text-sm text-muted-foreground">
              {creator.x_handle || creator.linkedin_handle || creator.substack_handle}
            </div>
          </div>
        </Link>
      ))}
    </Card>
  )
} 