# URL Restructuring Guide for Next.js 14 App Router

# IMPORTANT DO NOT Modify:
- Existing database queries in `creators.ts`
- Core functionality in `posts.ts`
- Supabase configuration
- Any component rendering logic
- Authentication flow


## Overview
This guide outlines the steps to change the URL structure from `/best-{creatorId}-{platform}-posts` to:
- `/best-{platform}-posts/{creatorId}`
- `/best-{platform}-posts/{category}`

## Prerequisites
- Ensure all changes are made in a new branch
- Backup your current `[slug]` directory

## Step-by-Step Implementation

### 1. Create New Directory Structure
```
app/
  best-x-posts/
    page.tsx
    [creator]/
      page.tsx
    [category]/
      page.tsx
  best-linkedin-posts/
    page.tsx
    [creator]/
      page.tsx
    [category]/
      page.tsx
  best-substack-posts/
    page.tsx
    [creator]/
      page.tsx
    [category]/
      page.tsx
```

### 2. Update URL Utilities
In `lib/utils.ts`, modify the URL formatting functions:

```typescript
export function formatCreatorPageUrl(creatorId: string, platform: string) {
  const normalizedCreatorId = creatorId.toLowerCase()
  const normalizedPlatform = platform.toLowerCase()
  return `/best-${normalizedPlatform}-posts/${normalizedCreatorId}`
}

export function parseCreatorPageUrl(path: string, segment: string) {
  // Handle both creator and category paths
  const match = path.match(/best-(x|linkedin|substack)-posts\/(.*?)$/)
  if (!match) return null
  
  const [, platform, identifier] = match
  return {
    platform: platform.toLowerCase() === 'x' ? 'X' :
      platform.toLowerCase() === 'linkedin' ? 'LinkedIn' :
      'Substack',
    [segment]: identifier // This will be either creatorId or category
  }
}
```

### 3. Create Platform Landing Pages
Create `app/best-{platform}-posts/page.tsx` for each platform:

```typescript
// app/best-x-posts/page.tsx (repeat for linkedin and substack)
import { getFeaturedPosts } from '@/lib/actions/posts'

export default async function PlatformPage() {
  const posts = await getFeaturedPosts('X') // Change platform for each file
  
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Best X Posts</h1>
      {/* Use your existing post display components */}
    </main>
  )
}
```

### 4. Create Creator Pages
Copy your existing `[slug]/page.tsx` logic to `best-{platform}-posts/[creator]/page.tsx`:

```typescript
// app/best-x-posts/[creator]/page.tsx (repeat for linkedin and substack)
export default async function CreatorPage({ 
  params 
}: { 
  params: { creator: string; platform: string; }
}) {
  const { creator: creatorId } = params
  const platform = 'X' // Change for each platform directory
  
  const { creator, posts } = await getCreatorByIdAndPlatform(creatorId, platform)
  // Rest of your existing page.tsx code remains the same
}
```

### 5. Update Metadata Generation
Modify the metadata function in each creator page:

```typescript
export async function generateMetadata({ 
  params 
}: { 
  params: { creator: string; }
}): Promise<Metadata> {
  const platform = 'X' // Change for each platform
  const { creator, posts } = await getCreatorByIdAndPlatform(params.creator, platform)
  // Rest of your existing metadata logic remains the same
}
```

### 6. Add Category Pages (Optional - Last Step)
```typescript
// app/best-x-posts/[category]/page.tsx
export default async function CategoryPage({
  params
}: {
  params: { category: string }
}) {
  // Implement category-specific logic here
  return (
    <main>
      <h1>Category: {params.category}</h1>
    </main>
  )
}
```

### 7. Update Navigation Links
Update any components that generate links to creator pages:

```typescript
<Link href={`/best-${platform.toLowerCase()}-posts/${creatorId}`}>
  {/* Link content */}
</Link>
```

## Sitemap generation

# Sitemap Update Guide for New URL Structure

## Current Structure
The sitemap currently generates URLs in the format:
`/best-{creatorId}-{platform}-posts`

## New Structure
We need to update it to generate URLs in the format:
`/best-{platform}-posts/{creatorId}`

## Step-by-Step Implementation

### 1. Update the URL Generation in `sitemap.ts`

```typescript
import { MetadataRoute } from 'next'
import { getCreatorsForSitemap } from '@/lib/actions/creators'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.socialswipedeck.com'
  console.log('🌐 Base URL:', baseUrl)
  
  const creators = await getCreatorsForSitemap()
  console.log('👥 Creators for sitemap:', creators)

  // Generate platform landing pages
  const platformPages = ['x', 'linkedin', 'substack'].map(platform => ({
    url: `${baseUrl}/best-${platform}-posts`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  // Generate creator URLs for each platform they're on using new URL structure
  const creatorUrls = creators.flatMap(creator => {
    const urls = creator.platforms.map(platform => ({
      url: `${baseUrl}/best-${platform.toLowerCase()}-posts/${creator.id}`,
      lastModified: creator.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 1,
    }))
    console.log(`🔗 Generated URLs for creator ${creator.id}:`, urls)
    return urls
  })

  console.log('📍 All creator URLs:', creatorUrls)

  // Define static pages with appropriate priorities
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

  // Combine all URLs with proper priority ordering
  return [
    ...staticPages,
    ...platformPages,
    ...creatorUrls
  ]
}
```

### 2. What Changed

1. Added platform landing pages (`/best-{platform}-posts`)
2. Updated creator URL format in the `creatorUrls` generation
3. Added proper priorities for platform landing pages
4. Kept all existing logging for debugging
5. Maintained all existing functionality for static pages

### 3. Priorities Structure
- Home page: 1.0
- Creator pages: 1.0
- Platform landing pages: 0.8
- Terms page: 0.3

### 4. Testing Steps

1. Generate the sitemap locally:
```bash
curl http://localhost:3000/sitemap.xml
```

2. Verify the following URLs are present:
- Platform landing pages (`/best-x-posts`, `/best-linkedin-posts`, `/best-substack-posts`)
- Creator pages with new structure (`/best-x-posts/john-doe`)
- Static pages (`/`, `/terms`)

3. Verify all URLs have correct:
- lastModified dates
- changeFrequency values
- priority values

### 5. Important Notes

- DO NOT modify the `getCreatorsForSitemap` function
- DO NOT change the existing logging structure
- DO NOT modify the MetadataRoute.Sitemap type
- Maintain all existing console.log statements for debugging

### 6. Deployment Verification

After deploying:
1. Verify sitemap.xml is accessible
2. Check Google Search Console for sitemap processing
3. Monitor for any 404s in analytics
4. Verify all URLs are properly formatted



## Important Notes


### Testing Steps:
1. Test each platform landing page
2. Verify creator pages load correctly
3. Confirm metadata generation
4. Test old URL redirects
5. Verify all existing components render correctly
6. Check SEO tags and structured data

### Deployment Steps:
1. Deploy middleware first
2. Deploy new URL structure
3. Keep old `[slug]` directory for one deployment cycle
4. Remove old directory after confirming redirects work

## Rollback Plan
If issues occur:
1. Revert to the old `[slug]` directory
2. Remove middleware redirects
3. Restore original `utils.ts` functions