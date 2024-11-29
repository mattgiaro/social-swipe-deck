# SEO Optimization Implementation PRD for Next.js 14

## Overview
Implementation of dynamic sitemap generation and canonical URLs for our Next.js 14 application to improve SEO performance and prevent duplicate content issues, following App Router architecture and server-first approach.


## CURRENT FILE STRUCTURE

├── Instructions
│   └── instructions.md
├── README.md
├── app
│   ├── (auth)
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── onboarding
│   │   ├── sign-in
│   │   └── sign-up
│   ├── [slug]
│   │   └── page.tsx
│   ├── api
│   │   ├── creators
│   │   ├── search
│   │   └── webhooks
│   ├── creator
│   │   └── [creatorId]
│   ├── favicon.ico
│   ├── fonts
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── terms
│       └── page.tsx
├── components
│   ├── cards
│   │   ├── linkedin-post-card.tsx
│   │   ├── substack-post-card.tsx
│   │   └── x-post-card.tsx
│   ├── layout
│   │   ├── footer.tsx
│   │   └── header.tsx
│   ├── platform-filter.tsx
│   ├── search
│   │   ├── search-bar.tsx
│   │   └── search-results.tsx
│   ├── sections
│   │   └── filter-section.tsx
│   └── ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── select.tsx
├── hooks
│   └── use-debounce.ts
├── lib
│   ├── actions
│   │   ├── creators.ts
│   │   ├── onboarding.ts
│   │   └── posts.ts
│   ├── database.types.ts
│   ├── supabase.ts
│   └── utils.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   └── logo.png
├── supabase
│   └── requesting_user_id.sql
├── tailwind.config.ts
├── tsconfig.json
├── types
│   ├── creator.ts
│   └── user.ts
└── yarn.lock


## Success Criteria
- Working sitemap.xml that updates automatically
- Proper canonical URLs on all pages
- Valid robots.txt file
- Verified functionality in search engine tools
- Optimal Core Web Vitals scores
- Server-side rendering for critical pages

## Implementation Steps

### Phase 1: Environment Setup (Estimated time: 30 minutes)

1. Create new environment variables:
```env
NEXT_PUBLIC_BASE_URL=https://socialswipedeck.com
```

2. Project Structure Setup:

We probably need to add thse files to the project:
```
app/
  sitemap.ts                   # Dynamic sitemap generation
  robots.ts                    # Robots.txt configuration
  opengraph-image.tsx         # Default OG image (optional but recommended)
  [slug]/
    opengraph-image.tsx    # Dynamic OG image for creator pages (optional but recommended)
```

### Phase 2: Updates to database query

1. Include NEW Actions in `lib/actions/creators.ts` without breaking existing ones:
This new function getCreatorsForSitemap will:

Fetch only the necessary fields for the sitemap
Filter out creators without handles
Transform the data into the format needed for sitemap generation
Handle errors gracefully


```
import { supabaseAdmin } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

// Keep your existing types and functions...

// Add this new function for sitemap generation
export async function getCreatorsForSitemap() {
  try {
    const { data: creators, error } = await supabaseAdmin
      .from('creators')
      .select(`
        creator_id,
        updated_at,
        x_handle,
        linkedin_handle,
        substack_handle
      `)
      .not('x_handle', 'is', null')
      .not('linkedin_handle', 'is', null')
      .not('substack_handle', 'is', null');

    if (error) throw error;

    // Transform the data for sitemap use
    return creators.map(creator => {
      const platforms = [];
      if (creator.x_handle) platforms.push('X');
      if (creator.linkedin_handle) platforms.push('LinkedIn');
      if (creator.substack_handle) platforms.push('Substack');

      return {
        id: creator.creator_id,
        platforms,
        updatedAt: creator.updated_at,
      };
    });

  } catch (error) {
    console.error('Error fetching creators for sitemap:', error);
    return [];
  }
}
```

### Phase 3: Sitemap Generation (Estimated time: 2 hours)

1. Implement `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';
import { getCreators } from '@/lib/actions/creators';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const creators = await getCreators();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const creatorUrls = creators.flatMap(creator => 
    creator.platforms.map(platform => ({
      url: `${baseUrl}/creator/${creator.id}-${platform.toLowerCase()}`,
      lastModified: creator.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))
  );

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // Add other static pages
  ];

  return [...staticPages, ...creatorUrls];
}
```

### Phase 4: Robots.txt Implementation (Estimated time: 30 minutes)

1. Create `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/', /dashboard/],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

### Phase 5: Metadata and Canonical URLs Implementation (Estimated time: 3 hours)

1. Root Layout Implementation (`app/layout.tsx`):
```typescript
import { inter } from '@/lib/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    template: '%s | Site Name',
    default: 'Site Name',
  },
  description: 'Default site description',
  // ... other default metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
```

2.
In 
app/[slug]/page.tsx

Add the alternates field with canonical URL to your existing generateMetadata:



```
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const parsed = parseCreatorPageUrl(params.slug)
  if (!parsed) return { title: 'Not Found' }

  const { creatorId, platform } = parsed
  const { creator, posts } = await getCreatorByIdAndPlatform(creatorId, platform)
  
  if (!creator) return { title: 'Not Found' }

  // Add baseUrl and canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const canonicalUrl = `${baseUrl}/creator/${params.slug}`

  // Calculate total engagement for meta description
  const totalEngagement = posts.reduce((sum, post) => 
    sum + post.likes + post.comments + post.shares, 0
  )

  const handle = creator[`${platform.toLowerCase()}_handle` as keyof typeof creator]
  const baseTitle = `${creator.name}'s Best ${platform} Posts`
  const bio = creator.bio || ''

  // Safely truncate bio for X (Twitter)
  const truncatedBio = bio.length > 200 
    ? `${bio.slice(0, 200)}...`
    : bio

  return {
    title: `${baseTitle} - Social Swipe Deck`,
    description: `Discover ${creator.name}'s top performing ${platform} content. Analysis of ${posts.length} viral posts with ${totalEngagement.toLocaleString()} total engagements. ${bio}`,
    keywords: [
      creator.name,
      platform,
      'social media',
      'viral posts',
      'content creation',
      'social media strategy',
      `${platform.toLowerCase()} marketing`,
      'engagement analysis'
    ],
    authors: [{ name: creator.name }],
    // Add alternates with canonical URL
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: baseTitle,
      description: bio,
      images: [{
        url: creator.profile_picture,
        width: 1200,
        height: 630,
        alt: `${creator.name}'s profile picture`
      }],
      type: 'profile',
      siteName: 'Social Swipe Deck'
    },
    // ... rest of your existing metadata
  }
}
```



### Phase 6: Performance Optimization (Estimated time: 2 hours)

1. Image Optimization:
```typescript
import Image from 'next/image';

// In components:
<Image
  src={creator.profileImage}
  alt={creator.name}
  width={400}
  height={400}
  priority={true} // For LCP images
  className="..."
/>
```

2. Font Optimization:
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

3. Loading States:
```typescript
// app/[slug]/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

4. Error Handling:
```typescript
// app/[slug]/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Phase 7: Testing & Verification (Estimated time: 2 hours)

1. Test Cases:
```typescript
describe('SEO Implementation', () => {
  test('sitemap should include all creator pages');
  test('canonical URLs should be properly formatted');
  test('metadata should be generated correctly');
  test('robots.txt should have correct content');
});
```

2. Manual Verification Checklist:
- [ ] Verify sitemap.xml generation
- [ ] Check canonical URLs
- [ ] Test robots.txt
- [ ] Verify Core Web Vitals
- [ ] Check Server Component rendering
- [ ] Test loading states
- [ ] Verify error boundaries
- [ ] Check meta tags
- [ ] Test image optimization
- [ ] Verify font loading

## Technical Requirements

### Performance Requirements
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Time to First Byte (TTFB): < 0.8s

### Monitoring Requirements
- Implement Vercel Analytics
- Set up error tracking
- Monitor Core Web Vitals
- Track server-side errors

## Deployment Plan

### Stage 1: Development
- Implement features
- Run tests
- Verify with test data

### Stage 2: Staging
- Deploy to staging environment
- Test with production data
- Verify all optimizations

### Stage 3: Production
- Deploy during low traffic
- Monitor performance metrics
- Submit sitemap to Search Console

## Success Metrics
- Google Lighthouse score > 90
- Core Web Vitals passing
- No duplicate content warnings
- Successful sitemap indexing
- Zero SEO-related errors in Search Console

## Notes
- All components should be Server Components by default
- Use 'use client' directive only when necessary
- Implement proper error boundaries
- Use React Suspense for loading states
- Follow Next.js 14 best practices for data fetching

