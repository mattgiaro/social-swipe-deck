"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { SearchResults } from "@/components/search/search-results"
import { useDebounce } from "@/hooks/use-debounce"
import { Creator } from "@/types/creator"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  variant?: 'dashboard' | 'homepage'
}

export function SearchBar({ variant = 'homepage' }: SearchBarProps) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<Creator[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const debouncedQuery = useDebounce(query, 300)

  React.useEffect(() => {
    const searchCreators = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    searchCreators()
  }, [debouncedQuery])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search creators..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-10 dark:bg-black/95 bg-white border-[#5445FF] dark:border-[#5445FF]/50 focus:border-[#5445FF] focus:ring-[#5445FF]/20"
          />
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        {query && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 hover:bg-transparent dark:hover:bg-transparent"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        )}
      </div>
      
      {/* Show results only if there's a query */}
      {query.length > 0 && (
        <SearchResults 
          results={results} 
          isLoading={isLoading} 
          onSelect={() => setQuery("")}
          variant={variant}
        />
      )}
    </div>
  )
} 