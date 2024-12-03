import { currentUser } from "@clerk/nextjs/server"
import { SearchBar } from "@/components/search/search-bar"
import { FilterSection } from "@/components/sections/filter-section"

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { platform?: 'X' | 'LinkedIn' | 'Substack' }
}) {
  const user = await currentUser()
  
  if (!user) return null

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background flex items-center">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Welcome */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Browse The Swipe File:
          </h1>
          <p className="text-muted-foreground">
            Never copy. Simply get inspired:
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar variant="dashboard" />
        </div>

        {/* Platform Filter */}
        <FilterSection initialPlatform={searchParams.platform} />
      </div>
    </div>
  )
} 