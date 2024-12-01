import { Metadata } from 'next'
import { getFeaturedPosts } from '@/lib/actions/posts'
import { LinkedInPostCard } from '@/components/cards/linkedin-post-card'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Best LinkedIn Posts - Social Swipe Deck',
  description: 'Discover the most engaging and viral LinkedIn posts from top creators. Curated content for maximum professional engagement and learning.',
  openGraph: {
    title: 'Best LinkedIn Posts',
    description: 'Discover the most engaging and viral LinkedIn posts from top creators.',
    type: 'website',
  },
}

// Add StructuredData component
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

export default async function LinkedInPlatformPage() {
  const posts = await getFeaturedPosts('LinkedIn')
  const limitedPosts = posts.slice(0, 10)
  
  return (
    <>
      <StructuredData posts={limitedPosts} />
      <main className="min-h-screen py-12" role="main">
        <article className="h-feed">
          {/* Header - Keep centered with container */}
          <div className="container mx-auto px-4">
            <header className="mb-12 flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold mb-4">Best LinkedIn Posts</h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Discover the most engaging and viral content from top LinkedIn creators
              </p>
            </header>
          </div>

          {/* Posts Grid - Full width */}
          <div 
            className="grid gap-8"
            role="feed"
            aria-label="Top LinkedIn posts"
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

          {/* CTA Section - Keep centered with container */}
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