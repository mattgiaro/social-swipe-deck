import { supabaseAdmin } from '@/lib/supabase'

export async function getFeaturedPosts() {
  console.log('🔍 Fetching featured posts with creator data...')
  
  const { data: posts, error } = await supabaseAdmin
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

  if (error) {
    console.error('❌ Error fetching posts:', error)
    return []
  }

  console.log('✅ Successfully fetched posts with creator data:', posts.length)
  console.log('📊 First post creator data:', posts[0]?.creator)

  return posts
} 