import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { XPostCard } from '@/components/cards/x-post-card'
import { LinkedInPostCard } from '@/components/cards/linkedin-post-card'
import { SubstackPostCard } from '@/components/cards/substack-post-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { supabaseAdmin } from '@/lib/supabase'
import { FilterSection } from "@/components/sections/filter-section"

// Types
type Platform = 'X' | 'LinkedIn' | 'Substack'

type Creator = {
  creator_id: string
  name: string
  bio: string
  profile_picture: string
  x_handle: string | null
  linkedin_handle: string | null
  substack_handle: string | null
}

// Fetch creator data
async function getCreator(creatorId: string) {
  const { data, error } = await supabaseAdmin
    .from('creators')
    .select('*')
    .eq('creator_id', creatorId)
    .single()

  if (error || !data) return null
  return data as Creator
}

// Fetch creator's posts with optional platform filter
async function getCreatorPosts(creatorId: string, platform?: Platform) {
  const query = supabaseAdmin
    .from('posts')
    .select('*')
    .eq('creator_id', creatorId)
    .order('date_published', { ascending: false })

  if (platform) {
    query.eq('platform', platform)
  }

  const { data, error } = await query
  if (error) return []
  return data
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { creatorId: string } 
}): Promise<Metadata> {
  const creator = await getCreator(params.creatorId)
  if (!creator) return { title: 'Creator Not Found' }

  return {
    title: `${creator.name}'s Posts - Social Media Swipe File`,
    description: creator.bio,
    openGraph: {
      images: [{ url: creator.profile_picture }]
    }
  }
}

export default async function CreatorPage({ 
  params,
  searchParams 
}: { 
  params: { creatorId: string }
  searchParams: { platform?: Platform }
}) {
  const creator = await getCreator(params.creatorId)
  if (!creator) return notFound()

  const posts = await getCreatorPosts(params.creatorId, searchParams.platform)

  // Get available platforms for this creator
  const availablePlatforms = [
    creator.x_handle && 'X',
    creator.linkedin_handle && 'LinkedIn',
    creator.substack_handle && 'Substack'
  ].filter(Boolean) as Platform[]

  // Component mapping for different platforms
  const PostCard = {
    'X': XPostCard,
    'LinkedIn': LinkedInPostCard,
    'Substack': SubstackPostCard
  }

  return (
    <main className="min-h-screen py-12 container mx-auto px-4">
      {/* Creator Header */}
      <div className="mb-12">
        <div className="flex items-center gap-6 mb-6">
          <Image
            src={creator.profile_picture}
            alt={creator.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{creator.name}</h1>
            <div className="flex gap-2">
              {creator.x_handle && (
                <Badge variant="secondary">
                  <i className="bi bi-twitter mr-1" />
                  @{creator.x_handle}
                </Badge>
              )}
              {creator.linkedin_handle && (
                <Badge variant="secondary">
                  <i className="bi bi-linkedin mr-1" />
                  {creator.linkedin_handle}
                </Badge>
              )}
              {creator.substack_handle && (
                <Badge variant="secondary">
                  <i className="bi bi-substack mr-1" />
                  {creator.substack_handle}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {creator.bio}
        </p>
      </div>

      {/* Replace Platform Filter with FilterSection */}
      <FilterSection 
        initialPlatform={searchParams.platform}
        availablePlatforms={availablePlatforms}
      />

      {/* Posts Grid */}
      <div className="grid gap-8">
        {posts.map((post) => {
          const Component = PostCard[post.platform as Platform]
          return (
            <div key={post.post_id}>
              <Component post={post} />
            </div>
          )
        })}
      </div>
    </main>
  )
} 