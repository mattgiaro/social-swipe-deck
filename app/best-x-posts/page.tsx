import { Metadata } from 'next'
import { getFeaturedPosts } from '@/lib/actions/posts'
import { getXCreators } from '@/lib/actions/creators'
import { XPostCard } from '@/components/cards/x-post-card'
import Script from 'next/script'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Best X (Twitter) Posts - Social Swipe Deck',
  description: 'Discover the most engaging and viral X (Twitter) posts from top creators. Curated content for maximum engagement and learning.',
  openGraph: {
    title: 'Best X (Twitter) Posts',
    description: 'Discover the most engaging and viral X (Twitter) posts from top creators.',
    type: 'website',
  },
}

function StructuredData({ posts }: { posts: any[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
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

  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify(structuredData)}
    </Script>
  )
}

export default async function XPlatformPage() {
  const posts = await getFeaturedPosts('X')
  const limitedPosts = posts.slice(0, 10)
  const creators = await getXCreators()
  
  // Transform creators data
  const transformedCreators = creators
    .filter(creator => creator.name && creator.profile_picture)
    .map(creator => ({
      id: creator.creator_id,
      name: creator.name,
      handle: creator.x_handle,
      bio: creator.bio,
      profile_picture: creator.profile_picture,
    }))
  
  return (
    <>
      <StructuredData posts={limitedPosts} />
      <main className="min-h-screen py-12" role="main">
        {/* Header with title and description */}
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center max-w-[750px] mx-auto">
            <h1 className="text-4xl font-bold mb-4">Best X Posts</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover the most engaging and viral content from top X creators
            </p>

            {/* Creator Avatars Section */}
            <div className="relative w-full max-w-[900px] mx-auto px-4">
              <div 
                className="flex flex-wrap justify-center items-center gap-1.5 py-3"
                role="list"
                aria-label="Content creators"
              >
                {transformedCreators.map((creator) => (
                  <Link
                    key={creator.id}
                    href={`/best-x-posts/${creator.id}`}
                    className="flex-shrink-0 group relative transition-all duration-300 ease-[cubic-bezier(0.2, 0, 0, 1)] hover:scale-125 hover:-translate-y-1 hover:z-10 focus-visible:scale-125 focus-visible:-translate-y-1 focus-visible:z-10"
                    role="listitem"
                    tabIndex={0}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {creator.name}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45" />
                    </div>
                    <div className="relative w-[35px] h-[35px] rounded-full overflow-hidden shadow-sm group-hover:shadow-md">
                      {creator.profile_picture ? (
                        <Image
                          src={creator.profile_picture}
                          alt={`${creator.name} - View their best posts`}
                          fill
                          sizes="35px"
                          className="object-cover"
                          priority
                          quality={90}
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary/50">
                            {creator.name?.[0]?.toUpperCase() || '?'}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-16">
          <div 
            className="grid gap-8"
            role="feed"
            aria-label="Top X posts"
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
                    <XPostCard post={post} />
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

          {/* CTA Section */}
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
        </div>
      </main>
    </>
  )
} 