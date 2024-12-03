import { Metadata } from 'next'
import { Suspense } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FilterSection } from "@/components/sections/filter-section"
import { getFeaturedPosts } from "@/lib/actions/posts"
import { XPostCard } from "@/components/cards/x-post-card"
import { LinkedInPostCard } from "@/components/cards/linkedin-post-card"
import { SubstackPostCard } from "@/components/cards/substack-post-card"
import { SearchBar } from "@/components/search/search-bar"
import Link from "next/link"

// Metadata for SEO
export const metadata: Metadata = {
  title: 'Social Swipe Deck - Discover Top Performing Social Media Content & Posts',
  description: 'Directory with swipe social media posts to analyze and learn from over 1,394 viral posts by top creators across X, LinkedIn, and Substack. Grow your social media audience with data-driven insights.',
  keywords: [
    'social media swipe file',
    'best social media posts',
    'social media analytics',
    'viral posts',
    'content creation',
    'Twitter analytics',
    'LinkedIn content',
    'Substack newsletter',
    'social media growth',
    'content strategy'
  ],
  authors: [{ name: 'Social Swipe Deck' }],
  openGraph: {
    type: 'website',
    title: 'Social Swipe Deck - Viral Social Media Content Analysis',
    description: 'Discover and analyze top performing content from leading creators across X, LinkedIn, and Substack.',
    url: 'https://socialswipedeck.com',
    siteName: 'Social Swipe Deck',
    images: [{
      url: '/social-swipe-deck-og.webp', // Make sure this image exists in your public folder
      width: 1200,
      height: 630,
      alt: 'Social Swipe Deck - Social Media Content Analysis'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Swipe Deck - Viral Content Analysis',
    description: 'Analyze top performing social media content across major platforms',
    images: ['/social-swipe-deck-og.webp'], // Same image as OG
    creator: '@socialswipedeck'
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://socialswipedeck.com'
  }
}

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
        <div className="mt-8 w-full max-w-md">
          <SearchBar />
        </div>
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
      <section className="bg-[#F7F6F9]">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Choose the social platform:
          </h2>
          <FilterSection initialPlatform={searchParams.platform} />
          {searchParams.platform ? (
            <>
              <h2 className="text-2xl font-bold text-center mt-12 mb-6">
                Now, browse the best posts to swipe:
              </h2>
              <Suspense 
                key={searchParams.platform} 
                fallback={<div>Loading posts...</div>}
              >
                <Posts platform={searchParams.platform} />
              </Suspense>
            </>
          ) : (
            <div className="text-center mt-12 text-muted-foreground">
              Select a platform above to view posts
            </div>
          )}
        </div>
      </section>

      {/* Benefits CTA Section */}
      <section className="bg-[#5445FF] text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              Get Access To The Full Swipe File:
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-16 gap-y-12">
              {/* First Benefit */}
              <div className="text-left">
                <div className="flex items-center gap-4 mb-3">
                  <i className="bi bi-collection-fill text-4xl" />
                  <h3 className="text-2xl font-semibold">100% Free</h3>
                </div>
                <p className="text-xl text-white/80 pl-[52px]">
                  Get unlimited access to our complete database of viral posts
                </p>
              </div>

              {/* Second Benefit */}
              <div className="text-left">
                <div className="flex items-center gap-4 mb-3">
                  <i className="bi bi-folder2-open text-4xl" />
                  <h3 className="text-2xl font-semibold">Find Posts Based On Categories</h3>
                </div>
                <p className="text-xl text-white/80 pl-[52px]">
                  Browse posts organized by content categories
                </p>
              </div>

              {/* Third Benefit */}
              <div className="text-left">
                <div className="flex items-center gap-4 mb-3">
                  <i className="bi bi-hash text-4xl" />
                  <h3 className="text-2xl font-semibold">Find Posts Based On Topics</h3>
                </div>
                <p className="text-xl text-white/80 pl-[52px]">
                  Filter posts by specific topics like Tech, Productivity, Money, etc.
                </p>
              </div>

              {/* Fourth Benefit */}
              <div className="text-left">
                <div className="flex items-center gap-4 mb-3">
                  <i className="bi bi-people-fill text-4xl" />
                  <h3 className="text-2xl font-semibold">Find Posts Based On Creators</h3>
                </div>
                <p className="text-xl text-white/80 pl-[52px]">
                  Discover top posts from your favorite creators
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/sign-up">
                <Button 
                  size="lg" 
                  className="text-lg bg-white text-[#5445FF] hover:bg-white/90"
                >
                  Create Your Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
