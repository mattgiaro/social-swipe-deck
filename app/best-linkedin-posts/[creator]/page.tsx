import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getCreatorByIdAndPlatform } from '@/lib/actions/creators'
import { LinkedInPostCard } from '@/components/cards/linkedin-post-card'
import Script from 'next/script'

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
}

function StructuredData({ 
  creator, 
  posts 
}: { 
  creator: any
  posts: Post[]
}) {
  const handle = creator.linkedin_handle
  const platformUrl = 'linkedin'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: creator.name,
      description: creator.bio || '',
      image: creator.profile_picture,
      sameAs: [
        `https://${platformUrl}.com/in/${handle}`,
      ],
    },
    about: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'SocialMediaPosting',
        '@id': post.post_url,
        position: index + 1,
        url: post.post_url,
        datePublished: post.date_published,
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/LikeAction',
            userInteractionCount: post.likes
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/CommentAction',
            userInteractionCount: post.comments
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/ShareAction',
            userInteractionCount: post.shares
          }
        ]
      }))
    }
  }

  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  )
}

export async function generateMetadata({ 
  params 
}: { 
  params: { creator: string } 
}): Promise<Metadata> {
  const { creator, posts } = await getCreatorByIdAndPlatform(params.creator, 'LinkedIn')
  if (!creator) return { title: 'Not Found' }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://socialswipedeck.com'
  const canonicalUrl = `${baseUrl}/best-linkedin-posts/${params.creator}`

  const totalEngagement = posts.reduce((sum, post) => 
    sum + post.likes + post.comments + post.shares, 0
  )

  const baseTitle = `${creator.name}'s Best LinkedIn Posts`
  const bio = creator.bio || ''
  const truncatedBio = bio.length > 200 ? `${bio.slice(0, 200)}...` : bio

  return {
    title: `${baseTitle} - Social Swipe Deck`,
    description: `Discover ${creator.name}'s top performing LinkedIn content. Analysis of ${posts.length} viral posts with ${totalEngagement.toLocaleString()} total engagements. ${truncatedBio}`,
    keywords: [
      creator.name,
      'LinkedIn',
      'social media',
      'viral posts',
      'content creation',
      'professional networking',
      'linkedin marketing',
      'engagement analysis'
    ],
    authors: [{ name: creator.name }],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
      },
    },
    openGraph: {
      title: baseTitle,
      description: bio,
      url: canonicalUrl,
      images: [{
        url: creator.profile_picture,
        width: 1200,
        height: 630,
        alt: `${creator.name}'s profile picture`
      }],
      type: 'profile',
      siteName: 'Social Swipe Deck'
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description: truncatedBio,
      creator: `@${creator.linkedin_handle}`,
      images: [creator.profile_picture],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }
  }
}

export default async function CreatorPage({ 
  params 
}: { 
  params: { creator: string }
}) {
  const { creator, posts } = await getCreatorByIdAndPlatform(params.creator, 'LinkedIn')
  if (!creator) return notFound()

  const limitedPosts = posts.slice(0, 10)

  return (
    <>
      <StructuredData creator={creator} posts={limitedPosts} />
      <main className="min-h-screen py-12" role="main">
        <article className="h-feed">
          <div className="container mx-auto px-4">
            <header className="mb-12 flex flex-col items-center text-center">
              <div className="flex flex-col items-center gap-6 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={creator.profile_picture}
                    alt={`${creator.name}'s profile picture`}
                    fill
                    sizes="(max-width: 768px) 48px, 64px"
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </div>
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-2">
                    <span className="p-name">{creator.name}</span>'s Best LinkedIn Posts
                  </h1>
                  <span 
                    className="text-sm text-gray-500 p-nickname"
                    aria-label="LinkedIn handle"
                  >
                    {creator.linkedin_handle}
                  </span>
                </div>
              </div>
              <p 
                className="text-lg text-muted-foreground max-w-3xl p-summary"
                aria-label="Creator biography"
              >
                {creator.bio}
              </p>
            </header>
          </div>

          <div 
            className="grid gap-8"
            role="feed"
            aria-label={`${creator.name}'s top LinkedIn posts`}
          >
            {limitedPosts.map((post, index) => (
              <article 
                key={post.post_id} 
                className={`h-entry space-y-6 p-6 ${
                  index % 2 === 0 
                    ? 'bg-white' 
                    : 'bg-[#5445ff]/10'
                }`}
                aria-labelledby={`post-title-${post.post_id}`}
              >
                <div className="container mx-auto px-4">
                  <div className="max-w-[750px] mx-auto w-full">
                    <h2 
                      id={`post-title-${post.post_id}`}
                      className="text-3xl font-bold p-name"
                    >
                      Post #{index + 1}
                    </h2>
                  </div>
                </div>
                <div className="container mx-auto px-4">
                  <div className="max-w-[750px] mx-auto w-full">
                    <LinkedInPostCard post={post} />
                    {post.explanation && (
                      <div className="mt-6 space-y-2">
                        <h3 className="text-xl font-bold text-foreground">
                          Why This Post Performed Well
                        </h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {post.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <time 
                  className="dt-published sr-only" 
                  dateTime={post.date_published}
                >
                  {new Date(post.date_published).toLocaleDateString()}
                </time>
              </article>
            ))}
          </div>

          <div className="container mx-auto px-4">
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
                role="button"
                aria-label="Create free account"
              >
                Create Free Account
              </a>
            </div>
          </div>
        </article>
      </main>
    </>
  )
} 