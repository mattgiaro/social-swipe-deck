import { supabaseAdmin } from '@/lib/supabase';
import { Database } from '@/lib/database.types';

type Creator = Database['public']['Tables']['creators']['Row'];
type Post = Database['public']['Tables']['posts']['Row'];

export async function getCreatorByIdAndPlatform(creatorId: string, platform: string) {
  console.log('🔍 Starting lookup for:', { creatorId, platform })
  
  const handleColumn = `${platform.toLowerCase()}_handle` as 'x_handle' | 'linkedin_handle' | 'substack_handle'
  console.log('📝 Using handle column:', handleColumn)
  
  const normalizedPlatform = platform.toLowerCase() === 'x' ? 'X' :
    platform.toLowerCase() === 'linkedin' ? 'LinkedIn' :
    platform.toLowerCase() === 'substack' ? 'Substack' : null
  
  console.log('📝 Normalized platform:', normalizedPlatform)
  
  try {
    // First query: Get creator
    const creatorQuery = await supabaseAdmin
      .from('creators')
      .select('*')
      .eq('creator_id', creatorId)
      .not(handleColumn, 'is', null)
      .single()

    console.log('👤 Creator query result:', {
      data: creatorQuery.data,
      error: creatorQuery.error
    })

    if (!creatorQuery.data || !creatorQuery.data[handleColumn]) {
      console.log('❌ No creator found or no handle exists')
      return { creator: null, posts: [] }
    }

    // Second query: Get posts
    const postsQuery = await supabaseAdmin
      .from('posts')
      .select('*')
      .eq('creator_id', creatorQuery.data.creator_id)
      .eq('platform', normalizedPlatform)
      .eq('is_featured', true)
      .order('date_published', { ascending: false })

    console.log('📚 Posts query result:', {
      count: postsQuery.data?.length,
      error: postsQuery.error
    })

    if (!postsQuery.data || postsQuery.data.length === 0) {
      console.log('❌ No posts found')
      return { creator: null, posts: [] }
    }

    return {
      creator: creatorQuery.data,
      posts: postsQuery.data
    }
  } catch (error) {
    console.error('💥 Unexpected error:', error)
    return { creator: null, posts: [] }
  }
}

export async function getAllCreators() {
  const { data: creators, error } = await supabaseAdmin
    .from('creators')
    .select('*');

  if (error) {
    throw new Error(`Error fetching creators: ${error.message}`);
  }

  return creators;
} 