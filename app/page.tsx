import { Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FilterSection } from "@/components/sections/filter-section"
import { getFeaturedPosts } from "@/lib/actions/posts"
import { XPostCard } from "@/components/cards/x-post-card"
import { LinkedInPostCard } from "@/components/cards/linkedin-post-card"
import { SubstackPostCard } from "@/components/cards/substack-post-card"

// Server Component for Posts
async function Posts({ platform }: { platform?: 'X' | 'LinkedIn' | 'Substack' | null }) {
  const posts = await getFeaturedPosts(platform)
  
  return (
    <div className="grid gap-6">
      {posts.map((post, index) => {
        const isBlurred = (index + 1) % 3 === 0
        
        // Select the appropriate component based on post platform
        const PostComponent = {
          'X': XPostCard,
          'LinkedIn': LinkedInPostCard,
          'Substack': SubstackPostCard
        }[post.platform as 'X' | 'LinkedIn' | 'Substack'] || XPostCard

        return (
          <div key={post.post_id}>
            <PostComponent 
              post={post} 
              isBlurred={isBlurred}
            />
          </div>
        )
      })}
    </div>
  )
}

// Main Page Component (Server Component)
export default async function Home({
  searchParams,
}: {
  searchParams: { platform?: 'X' | 'LinkedIn' | 'Substack' }
}) {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center bg-gradient-to-b from-primary/5 to-background">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Grow Your Social Media Audience
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Uncover over 1,394 viral posts by top creators across X, LinkedIn, and Substack.
        </p>
        <div className="mt-10">
          <Button 
            size="lg" 
            className="text-lg bg-[#5445FF] hover:bg-[#5445FF]/90 text-white"
          >
            Create Your Free Account
          </Button>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <FilterSection initialPlatform={searchParams.platform} />
        <Suspense 
          key={searchParams.platform || 'all'} 
          fallback={<div>Loading posts...</div>}
        >
          <Posts platform={searchParams.platform} />
        </Suspense>
      </section>
    </main>
  )
}
