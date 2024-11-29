# Product Requirements Document (PRD)

## Project: Viral Social Media Posts Directory

### Overview

Develop a viral social media posts directory that showcases popular creators' posts across platforms like X (formerly Twitter), LinkedIn, and Substack Notes. The platform aims to drive organic traffic by acting as an open swipe file, encouraging users to sign up, explore and link to it.

### Technical Stack

- **Frontend**: Next.js 14 (app router), Tailwind CSS, TypeScript, Shadcn UI, Bootstrap Icons
- **Backend**: Supabase (PostgreSQL), Clerk for authentication
- **Libraries**: Shadcn components, Bootstrap Icons
- **Styling**: Tailwind CSS

---

## Database Schema (Supabase)

### Important Note

- **Server-Side Supabase Calls**: Always make Supabase calls on the server-side (in API routes or server components) to keep your service key secure. Create a new `route.ts` in the `api` folder for each call.

### Tables In Supabase Structure

1. **creators**
   - `creator_id` (Primary Key)
   - `name` (craetor name)
   - `bio` (contains creator bio)
   - `profile_picture` (URL)
   - `x_handle`
   - `substack_handle`
   - `linkedin_handle`

2. **posts**
   - `post_id` (Primary Key)
   - `creator_id` (Foreign Key referencing `creators.creator_id`)
   - `platform` (Enum: 'X', 'LinkedIn', 'Substack')
   - `content` (displays post content. make sure to handle line breaks properly)
   - `likes` (number of likes for post)
   - `comments` (number of comments for post)
   - `shares`(number of shares for post)
   - `date_published` (when post has been published)
   - `post_url` (redirects to the original post source)
   - `image` (URL) (if post contains an image – will be added at the end of each card (below post.content))
   - `is_featured` (Boolean. we use this to determine wether or not the post should be featured on the "best creator platform post page")
   - `explanation` (explains why the post perfromed well. only for is_featured=TRUE posts)
   - `category` (allows us to classify posts by category for filters)
   - `type` (allows us to classify posts by type for filters)
   - `home_featured` (Boolean. we use this to determine wether or not the post should be featured on the home page)

3. **users**: app users
   - `id` (Primary Key)
   - `email`
   - `platform_preference` (Enum: 'X', 'LinkedIn', 'Substack')
   - `opt_in_newsletter` (Boolean)
   - `join_date`
   - `is_confirmed` (Boolean)
   - `convertkit_id`

### Relationships

- **One-to-Many**: `creators` to `posts`
  - Each creator can have multiple posts.
  - Each post belongs to one creator.
  - Posts can be across multiple platforms.

---

## Core Components

### 1. General UI

- **Design Principles**
  - Simplistic and user-friendly.
  - Responsive design for mobile, tablet, and desktop.
  - Mimic the platform's newsfeed design; each platform will have its own card design matching the platform's aesthetics.

- **Homepage (`index` page)**
  - **Logged-Out Users**
    - Display a hero section introducing the platform.
    - then give filter option based on platform (3 buttons)
    - Show 20 featured posts like a newsfeed These are going to be static so that we don't reload them all the time. load posts.home_featured=TRUE
    - Blur each 3rd post (only the text) to encourge users to create a free account
  - **Logged-In Users**
    - Display personalized content: get access to all posts in database. Possible to filter the posts based on category, post date, numbers of likes, shares, etc.
    - **Logged-In User Interface**
      - Access to all posts.
    - Ability to filter and search posts.

### 2. Filtering Component

- **Filters**
  - **Platforms**: Users can filter posts by platform (X, LinkedIn, Substack) using platform logos (Bootstrap Icons).
  - **Creator Name**: Search and filter by creator names.
  - **Post Topic (Category)**: Filter posts based on categories.
  - **Engagement Metrics**: Filter by likes, comments, shares.
  - **Date Filter**: Filter posts by date published.

### 3. Best Creator Platform Posts

- **Purpose**
  - Generate dynamic pages for each creator to capture SEO traffic for searches like "Best [Creator] [Platform] Posts." Needs to be SEO optimized to capture traffic.

When hitting /best-justin-welsh-x-posts...

You first look up justin-welsh in the creator_id... then look wether or not x_handle is there then only render 


  Inlucdes proper headings, subheaders, meta descriptions.

- **Page Generation Logic**

We'll use [slug] to generate the pages.

  1. **URL Structure**: `/best-{creator_id}-{platform}-posts/`
     - Example: `/best-justin-welsh-x-posts/`
  2. **Creator and Platform Data Retrieval**
     - Fetch `creator_id` and `platform` from the `creators` table.
  3. **Handle Verification**
     - Check which platform handles (`x_handle`, `linkedin_handle`, `substack_handle`) are populated for each creator.
     - Generate pages only for platforms where the creator has a handle.
  4. **Post Retrieval**
     - Fetch posts from the `posts` table where `creator_id` matches and `platform` corresponds.
     - Only include posts where `is_featured` is `TRUE`.
  5. **Limit Posts**
     - Display up to 10 posts per page.

- **Page Structure**

  - **Header**
    - **H1**: "{Creator Name}'s Best {Platform} Posts"
    - **Bio**: Display the creator's bio from the `creators` table.
    - **Profile Picture**: Display the creator's profile picture.
  - **Content**
    - **Post Sections**:
      - **H2**: "Post #1", "Post #2", etc.
      - **Post Card**: Display the post content in a card matching the platform's design.
      - **Explanation**: Display the `explanation` field from the `posts` table.
  - **Call to Action**
    - Encourage users to sign up to see all posts.

### 4. Creator Posts (All)

- **Access**
  - Only available to logged-in users with confirmed accounts (`users.is_confirmed = TRUE`).

- **Purpose**
  - Display all posts from a specific creator with filtering options.

- **URL Structure**
  - `/creator_id/`
  - Example: `/justin-welsh/`

- **Filtering**
  - Reuse the filtering component to filter posts by platform.

- **Page Structure**

  - **Header**
    - **H1**: Display the creator's name.
    - **Profile Picture**: Display the creator's image from the `creators` table.
  - **Platform Filters**
    - Display icons for X, Substack, and LinkedIn.
    - Allow users to filter posts based on the selected platform.
  - **Content**
    - Load and display 10 posts at a time.
    - Infinite scrolling or pagination as needed.

### 5. Search Functionality

- **Features**
  - **Search Bar**: Allow users to search for creators.
  - **Auto-Complete**: Implement auto-complete suggestions with creator names and profile pictures.
  - **Caching**: Cache search results for 24 hours to optimize performance and reduce bandwidth.

### 6. Account Creation Flow and Logged-In/Logged-Out Logic

- **Authentication**
  - Use Clerk for handling signup and signin processes.

- **User Data Management**
  - Create user records in Supabase based on Clerk authentication.
  - Synchronize `users` table with Clerk data.

- **Signup Flow**

  1. **User Registration**
     - New users sign up via Clerk.
     - Users are marked as not confirmed (`users.is_confirmed = FALSE`) and `opt_in_newsletter = FALSE`.

  2. **Onboarding Process**
     - Onboarding page is displayed to users where `users.is_confirmed = FALSE`.
     - **Question 1**: "Which platform do you want to grow on primarily?"
       - Options: X, LinkedIn, Substack (using platform icons).
     - **Question 2**: "Do you also want to get our proven templates to grow your {Selected Platform}?"
       - Options: Yes, No.
     - Each question is displayed on a separate page.

  3. **Data Update**
     - Upon completion, update the `users` table:
       - Set `is_confirmed = TRUE`.
       - Set `platform_preference` based on the user's choice.
       - Set `opt_in_newsletter` based on the response to Question 2.

  4. **Enforcement**
     - Users must complete the onboarding process.
     - If `users.is_confirmed = FALSE`, redirect to the onboarding page on each login.

---

## Project Structure

### Frontend

- **Pages**
  - `index.tsx`: Homepage with conditional rendering based on authentication.
  - `[creator_id]/index.tsx`: Creator's all posts page.
  - `[slug]/page.tsx`: Dynamic pages for best creatorposts.

- **Components**
  - `Header`: Navigation bar with login/signup buttons.
  - `Footer`: Footer with site information.
  - `PostCard`: Displays individual posts, styled per platform.
  - `FilterBar`: Filtering component for platforms, creators, categories, etc.
  - `SearchBar`: Search functionality with auto-complete.
  - `Onboarding`: Multi-step onboarding process for new users.

### Backend

- **API Routes (`/api`)**
  - `creators.ts`: Fetch creators data.
  - `posts.ts`: Fetch posts data with filtering options.
  - `search.ts`: Handle search queries and return results.
  - `onboarding.ts`: Update user data upon onboarding completion.

- **Server Components**
  - Use server-side components where Supabase calls are made to keep service keys secure.

---

## API Routes and Data Fetching

- **Data Fetching**
  - All data fetching should be done via server-side API routes.
  - Utilize Next.js API routes (`/pages/api` or `/app/api` depending on the directory structure).

- **Security**
  - Keep Supabase service keys secure by not exposing them on the client-side.
  - Ensure all sensitive operations are performed server-side.

---

## Authentication and Authorization

- **Authentication**
  - Implement using Clerk.
  - Ensure secure handling of user sessions.

- **Authorization**
  - Restrict access to certain pages and features based on user authentication status.
    - Logged-out users can view limited content.
    - Logged-in users have full access.

---

## User Interface Design Considerations

- **Platform-Specific Post Cards**
  - Design post cards to match the aesthetic of each platform.
    - Use platform-specific colors, fonts, and icons.

- **Responsive Design**
  - Ensure the website is fully responsive across all devices.

- **Accessibility**
  - Follow best practices to make the site accessible to all users.

- **Icons and Imagery**
  - Use Bootstrap Icons for platform logos and other icons.

---

## Additional Notes

- **Caching**
  - Implement caching strategies for search results and static content to improve performance.

- **SEO Optimization**
  - Generate dynamic pages with SEO-friendly URLs and content.
  - Include meta tags and structured data where appropriate.

- **Performance**
  - Optimize images and assets.
  - Lazy load content where possible.

- **Error Handling**
  - Provide user-friendly error messages.
  - Handle edge cases gracefully.

- **Testing**
  - Write unit tests for critical components.
  - Ensure thorough testing of the onboarding flow and authentication.

---

## Step-by-Step Implementation Guide

1. **Setup the Project Environment**
   - Initialize a Next.js 14 project with TypeScript support.
   - Install Tailwind CSS and configure it.
   - Install Shadcn UI components.
   - Set up Clerk for authentication.
   - Integrate Supabase client for server-side usage.

2. **Develop the General UI Components**
   - Build the `Header`, `Footer`, `PostCard`, `FilterBar`, and `SearchBar` components.
   - Ensure responsiveness and accessibility.

3. **Create the Homepage (`index` page)**
   - Implement conditional rendering based on authentication status.
   - Display the hero section and featured posts for logged-out users.
   - Show personalized content for logged-in users.

4. **Implement the Filtering Component**
   - Allow users to filter posts by platform, creator, category, engagement metrics, and date.
   - Fetch filtered data from the server-side API routes.

5. **Develop the Best Creator Platform Posts Pages**
   - Implement dynamic routing based on the URL pattern `[slug]/page.tsx`.
   - Fetch and display featured posts for the specified creator and platform.
   - Include explanations and structured page content.

/[slug]/page.tsx is our file path

In page.tsx, you can have a server component which will have access to a params object like this:

```
export default async function Page({  params,}: {  params: Promise<{ slug: string }>}) {  const slug = (await params).slug  return <div>My Post: {slug}</div>}
```

In this case, whenever I go to a path like /best-matt-tiktok-posts, the slug will be the string “best-matt-tiktok-posts”. 

You can then do `const [creatorId, platform] = slug.replace("best-", "").replace("-posts").split("-")`

A little complex but what this line essential means is you’re removing the “best-“ and “-posts” part from the string (or literally replacing it with an empty string) so you only have “matt-linkedin” remaining, then you split that remaining string on “-“ and you’ll get back the values “matt” and “linked” in an array. Then you’re assigning it to the variable names creatorId and platform. 

Once you get the values back, you can make your supabase db calls to get the data and render the page.

6. **Build the Creator Posts (All) Page**
   - Create a page to display all posts from a specific creator.
   - Implement platform filtering within the page.
   - Ensure only logged-in and confirmed users can access this page.

7. **Implement the Search Functionality**
   - Develop the `SearchBar` with auto-complete features.
   - Cache search results for performance optimization.


8. **Implement Authentication with Clerk**
   - Configure Clerk in your Next.js app.
   - Set up protected routes and components.
   - Ensure user data syncs with the `users` table in Supabase.


9. **Set Up the Account Creation Flow**
    - Implement the onboarding process for new users.
    - Enforce the completion of onboarding before granting full access.
    - Update user preferences in the `users` table.

10. **Secure Supabase Calls**
    - Move all Supabase interactions to server-side API routes.
    - Create separate `route.ts` files in the `api` folder for each operation.

11. **Finalize UI/UX**
    - Refine the design to match platform aesthetics.
    - Conduct user testing to ensure usability.

12. **Optimize for SEO**
    - Add meta tags and structured data.
    - Generate sitemaps and ensure pages are crawlable.

13. **Testing and Deployment**
    - Perform comprehensive testing of all features.
    - Deploy the application to a hosting platform (e.g., Vercel).
    - Monitor for any issues post-deployment.

# PROJECT FILE STRUCTURE
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   ├── sign-up/
│   │   │   └── page.tsx
│   │   └── onboarding/
│   │       ├── platform-selection/
│   │       │   └── page.tsx
│   │       └── newsletter-opt-in/
│   │           └── page.tsx
│   ├── api/
│   │   ├── creators/
│   │   │   └── route.ts
│   │   ├── posts/
│   │   │   └── route.ts
│   │   ├── search/
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts
│   ├── [slug]/
│   │   └── page.tsx
│   ├── creator/
│   │   └── [creatorId]/
│   │       └── page.tsx
│   ├── error.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   ├── auth-button.tsx
│   │   └── user-button.tsx
│   ├── cards/
│   │   ├── linkedin-post-card.tsx
│   │   ├── substack-post-card.tsx
│   │   └── x-post-card.tsx
│   ├── creators/
│   │   ├── creator-header.tsx
│   │   └── creator-profile.tsx
│   ├── filters/
│   │   ├── category-filter.tsx
│   │   ├── date-filter.tsx
│   │   ├── engagement-filter.tsx
│   │   └── platform-filter.tsx
│   ├── home/
│   │   ├── featured-posts.tsx
│   │   └── hero-section.tsx
│   ├── layout/
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   └── main-nav.tsx
│   ├── search/
│   │   ├── search-bar.tsx
│   │   └── search-results.tsx
│   └── ui/
│       └──# Shadcn UI components
├── config/
│   ├── site.ts
│   └── dashboard.ts
├── hooks/
│   ├── use-debounce.ts
│   ├── use-infinite-scroll.ts
│   └── use-posts-filter.ts
├── lib/
│   ├── auth.ts
│   ├── database.types.ts
│   ├── supabase.ts
│   └── utils.ts
├── providers/
│   └── providers.tsx
├── styles/
│   └── globals.css
├── types/
│   ├── creator.ts
│   ├── post.ts
│   └── user.ts
├── middleware.ts
└── package.json


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


# MISC

Our main colors are white, black, and #5445ff

**IMPORTANT: WE USE APP ROUTER IN NEXTJS.**