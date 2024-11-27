import { supabaseAdmin } from '@/lib/supabase'
import { unstable_noStore as noStore } from 'next/cache'

type Platform = 'X' | 'LinkedIn' | 'Substack'

export async function getFeaturedPosts(platform?: Platform | null) {
  noStore()
  
  console.log('🔍 Fetching featured posts with creator data...', platform ? `for ${platform}` : 'for all platforms')
  
  try {
    let query = supabaseAdmin
      .from('posts')
      .select(`
        *,
        creator:creators (
          creator_id,
          name,
          profile_picture,
          x_handle,
          linkedin_handle,
          substack_handle
        )
      `)
      .eq('home_featured', true)
      .order('date_published', { ascending: false })

    // Apply platform filter if specified
    if (platform) {
      query = query.eq('platform', platform)
    }

    const { data: posts, error } = await query

    if (error) {
      console.error('❌ Error fetching posts:', error)
      return []
    }

    console.log('✅ Successfully fetched posts:', posts.length)
    return posts
  } catch (error) {
    console.error('❌ Error fetching posts:', error)
    return []
  }
} 