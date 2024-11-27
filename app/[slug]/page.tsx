import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getCreatorByIdAndPlatform } from '@/lib/actions/creators'
import { Card, CardContent } from '@/components/ui/card'
import { XPostCard } from '@/components/cards/x-post-card'
import { LinkedInPostCard } from '@/components/cards/linkedin-post-card'
import { SubstackPostCard } from '@/components/cards/substack-post-card'
import { Badge } from '@/components/ui/badge'
import { parseCreatorPageUrl } from '@/lib/utils'

// Add type for the post
type Post = {
  post_id: string
  content: string
  likes: number
  comments: number
  shares: number
  date_published: string
  post_url: string
  image?: string
  explanation?: string
  // Add other post fields as needed
}

// Create a type for the platform-specific components
type PostCardComponents = {
  'X': typeof XPostCard
  'LinkedIn': typeof LinkedInPostCard
  'Substack': typeof SubstackPostCard
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const parsed = parseCreatorPageUrl(params.slug)
  if (!parsed) return { title: 'Not Found' }

  const { creatorId, platform } = parsed
  const { creator } = await getCreatorByIdAndPlatform(creatorId, platform)
  
  if (!creator) return { title: 'Not Found' }

  return {
    title: `${creator.name}'s Best ${platform} Posts - Social Media Swipe File`,
    description: creator.bio,
    openGraph: {
      images: [{ url: creator.profile_picture }]
    }
  }
}

export default async function CreatorPlatformPage({ 
  params 
}: { 
  params: { slug: string }
}) {
  // Parse the URL to get creatorId and platform
  const parsed = parseCreatorPageUrl(params.slug)
  if (!parsed) return notFound()

  const { creatorId, platform } = parsed
  
  // Fetch creator and their posts
  const { creator, posts } = await getCreatorByIdAndPlatform(
    creatorId, 
    platform
  )
  if (!creator) return notFound()

  // Type the PostCard components object
  const PostCardComponents: PostCardComponents = {
    'X': XPostCard,
    'LinkedIn': LinkedInPostCard,
    'Substack': SubstackPostCard
  }

  // Get the correct component for this platform
  const PostCard = PostCardComponents[platform as keyof PostCardComponents]
  if (!PostCard) return notFound()

  // Limit posts to first 10
  const limitedPosts = posts.slice(0, 10)

  return (
    <main className="min-h-screen py-12 container mx-auto px-4">
      {/* Creator Header - Centered */}
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-6 mb-6">
          <Image
            src={creator.profile_picture}
            alt={creator.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {creator.name}'s Best {platform} Posts
            </h1>
            <span className="text-sm text-gray-500">
              {creator[`${platform.toLowerCase()}_handle` as keyof typeof creator]}
            </span>
          </div>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {creator.bio}
        </p>
      </div>

      {/* Posts Grid - Centered with max width */}
      <div className="grid gap-8 mx-auto max-w-[750px] px-4">
        {limitedPosts.map((post, index) => (
          <div key={post.post_id} className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Post #{index + 1}
            </h2>
            <PostCard post={post} />
            {post.explanation && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Why This Post Performed Well</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {post.explanation}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ))}

        {/* Show message if there are more posts */}
        {posts.length > 10 && (
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-muted-foreground">
              Showing 10 of {posts.length} posts. Sign up to see more.
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center max-w-[750px] mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Want to See More Posts?
        </h2>
        <p className="text-muted-foreground mb-6">
          Sign up for free to access our complete database of viral posts
        </p>
        <a 
          href="/sign-up" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Create Free Account
        </a>
      </div>
    </main>
  )
}