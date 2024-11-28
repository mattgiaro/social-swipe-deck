"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { SearchResults } from "@/components/search/search-results"
import { useDebounce } from "@/hooks/use-debounce"
import { Creator } from "@/types/creator"

export function SearchBar() {
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
      <div className="relative">
        <Input
          type="search"
          placeholder="Search creators..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 bg-white border-gray-200 focus:border-[#5445FF] focus:ring-[#5445FF]"
        />
        <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      
      {/* Show results only if there's a query */}
      {query.length > 0 && (
        <SearchResults 
          results={results} 
          isLoading={isLoading} 
          onSelect={() => setQuery("")}
        />
      )}
    </div>
  )
} 