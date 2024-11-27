import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { supabaseAdmin } from "@/lib/supabase"
import { XPostCard } from "@/components/cards/x-post-card"
import { cn } from "@/lib/utils"

// Get featured posts for homepage
async function getFeaturedPosts() {
  const { data: posts, error } = await supabaseAdmin
    .from('posts')
    .select(`
      *,
      creator:creators (
        creator_id,
        name,
        profile_picture,
        x_handle,
        linkedin_handle,
        substack_handle
      )
    `)
    .eq('home_featured', true)
    .order('date_published', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching featured posts:', error)
    return []
  }

  return posts
}

export default async function Home() {
  const posts = await getFeaturedPosts()
  console.log('📱 Fetched featured posts:', posts.length)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center bg-gradient-to-b from-primary/5 to-background">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Learn From The Best Social Posts
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Discover and learn from viral posts by top creators across X, LinkedIn, and Substack. 
          Your one-stop swipe file for social media success.
        </p>
        <div className="mt-10">
          <Button size="lg" className="text-lg">
            Start Learning For Free
          </Button>
        </div>
      </section>

      {/* Platform Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <i className="bi bi-twitter text-xl" />
            X (Twitter)
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <i className="bi bi-linkedin text-xl" />
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <i className="bi bi-substack text-xl" />
            Substack
          </Button>
        </div>

        {/* Featured Posts */}
        <div className="grid gap-6">
          {posts.map((post, index) => {
            const isBlurred = (index + 1) % 3 === 0
            
            console.log(`📝 Rendering post #${index + 1}:`, {
              id: post.post_id,
              isBlurred,
              platform: post.platform
            })

            return (
              <div key={post.post_id}>
                <XPostCard 
                  post={post} 
                  isBlurred={isBlurred}
                />
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
