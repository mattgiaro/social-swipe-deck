export type Platform = "X" | "LinkedIn" | "Substack"

export interface User {
  id: string
  email: string
  platform_preference?: Platform
  opt_in_newsletter: boolean
  join_date: string
  is_confirmed: boolean
  convertkit_id?: string | null
} 