import { MetadataRoute } from 'next'
import { getCreatorsForSitemap } from '@/lib/actions/creators'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.socialswipedeck.com'
  console.log('🌐 Base URL:', baseUrl)
  
  const creators = await getCreatorsForSitemap()
  console.log('👥 Creators for sitemap:', creators)

  // Generate creator URLs for each platform they're on
  const creatorUrls = creators.flatMap(creator => {
    const urls = creator.platforms.map(platform => ({
      url: `${baseUrl}/best-${creator.id}-${platform.toLowerCase()}-posts`,
      lastModified: creator.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 1,
    }))
    console.log(`🔗 Generated URLs for creator ${creator.id}:`, urls)
    return urls
  })

  console.log('📍 All creator URLs:', creatorUrls)

  // Define static pages with appropriate priorities and change frequencies
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Generate platform-specific pages
  // const platformPages = ['x', 'linkedin', 'substack'].map(platform => ({
  //   url: `${baseUrl}/platform/${platform}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'daily' as const,
  //   priority: 0.6,
  //}))

  // Combine all URLs, with static pages first, then platform pages, then dynamic creator pages
  return [
    ...staticPages,
    //...platformPages,
    ...creatorUrls
  ]
} 