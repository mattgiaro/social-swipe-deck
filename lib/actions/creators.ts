import { supabaseAdmin } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { unstable_noStore as noStore } from 'next/cache';

type Creator = Database['public']['Tables']['creators']['Row'];
type Post = Database['public']['Tables']['posts']['Row'];

interface FetchOptions {
  cache?: 'force-cache' | 'no-store'
}

export async function getCreatorByIdAndPlatform(
  creatorId: string, 
  platform: string,
  filterPlatform?: string
) {
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

    // Second query: Get posts with creator data
    const postsQuery = await supabaseAdmin
      .from('posts')
      .select(`
        *,
        creator:creators (
          creator_id,
          name,
          x_handle,
          linkedin_handle,
          substack_handle,
          profile_picture
        )
      `)
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

    // Transform the posts to include the creator data
    const postsWithCreator = postsQuery.data.map(post => ({
      ...post,
      creator: post.creator
    }))

    return {
      creator: creatorQuery.data,
      posts: filterPlatform && filterPlatform !== platform 
        ? postsWithCreator.filter(post => post.platform === filterPlatform)
        : postsWithCreator
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

// Add this new function for sitemap generation
export async function getCreatorsForSitemap() {
  try {
    console.log('🔍 Starting sitemap creator fetch')
    
    const { data: creators, error } = await supabaseAdmin
      .from('creators')
      .select(`
        creator_id,
        updated_at,
        x_handle,
        linkedin_handle,
        substack_handle
      `)

    if (error) {
      console.error('Error fetching creators for sitemap:', error)
      throw error
    }

    console.log('📊 Raw creators data:', creators)

    // Transform the data for sitemap use
    const transformedCreators = creators.map(creator => {
      const platforms = []
      if (creator.x_handle && creator.x_handle.trim() !== '') {
        platforms.push('X')
      }
      if (creator.linkedin_handle && creator.linkedin_handle.trim() !== '') {
        platforms.push('LinkedIn')
      }
      if (creator.substack_handle && creator.substack_handle.trim() !== '') {
        platforms.push('Substack')
      }

      return {
        id: creator.creator_id,
        platforms,
        updatedAt: creator.updated_at,
      }
    }).filter(creator => creator.platforms.length > 0)

    console.log('✨ Transformed creators:', transformedCreators)
    return transformedCreators

  } catch (error) {
    console.error('Error in getCreatorsForSitemap:', error)
    return [] 
  }
}

export async function getXCreators(options?: FetchOptions) {
  // Only call noStore() if we're not using force-cache
  if (!options?.cache || options.cache === 'no-store') {
    noStore()
  }
  
  console.log('🔍 Fetching all X creators...')
  
  try {
    const { data: creators, error } = await supabaseAdmin
      .from('creators')
      .select('*')
      .not('x_handle', 'is', null)
      .order('name')

    if (error) {
      console.error('❌ Error fetching X creators:', error)
      return []
    }

    console.log('✅ Successfully fetched X creators:', creators.length)
    return creators
  } catch (error) {
    console.error('❌ Error fetching X creators:', error)
    return []
  }
} 