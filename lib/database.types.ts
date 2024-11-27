export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Platform = 'X' | 'LinkedIn' | 'Substack'

export interface Database {
  public: {
    Tables: {
      creators: {
        Row: {
          creator_id: string
          name: string
          bio: string | null
          profile_picture: string | null
          x_handle: string | null
          substack_handle: string | null
          linkedin_handle: string | null
        }
        Insert: {
          creator_id: string
          name: string
          bio?: string | null
          profile_picture?: string | null
          x_handle?: string | null
          substack_handle?: string | null
          linkedin_handle?: string | null
        }
        Update: {
          creator_id?: string
          name?: string
          bio?: string | null
          profile_picture?: string | null
          x_handle?: string | null
          substack_handle?: string | null
          linkedin_handle?: string | null
        }
      }
      posts: {
        Row: {
          post_id: string
          creator_id: string
          platform: Platform
          content: string
          likes: number
          comments: number
          shares: number
          date_published: string
          post_url: string
          image: string | null
          is_featured: boolean
          explanation: string | null
          category: string
          type: string
          home_featured: boolean
        }
        Insert: {
          post_id: string
          creator_id: string
          platform: Platform
          content: string
          likes: number
          comments: number
          shares: number
          date_published: string
          post_url: string
          image?: string | null
          is_featured: boolean
          explanation?: string | null
          category: string
          type: string
          home_featured: boolean
        }
        Update: {
          post_id?: string
          creator_id?: string
          platform?: Platform
          content?: string
          likes?: number
          comments?: number
          shares?: number
          date_published?: string
          post_url?: string
          image?: string | null
          is_featured?: boolean
          explanation?: string | null
          category?: string
          type?: string
          home_featured?: boolean
        }
      }
      users: {
        Row: {
          id: string
          email: string
          platform_preference: Platform | null
          opt_in_newsletter: boolean
          join_date: string
          is_confirmed: boolean
          convertkit_id: string | null
        }
        Insert: {
          id: string
          email: string
          platform_preference?: Platform | null
          opt_in_newsletter?: boolean
          join_date?: string
          is_confirmed?: boolean
          convertkit_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          platform_preference?: Platform | null
          opt_in_newsletter?: boolean
          join_date?: string
          is_confirmed?: boolean
          convertkit_id?: string | null
        }
      }
    }
  }
} 