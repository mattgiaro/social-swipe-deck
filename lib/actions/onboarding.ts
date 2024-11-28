'use server'

import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Platform } from '@/types/user';

export async function updatePlatformPreference(platform: Platform) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('No user found');
    }

    const { error } = await supabaseAdmin
      .from('users')
      .update({ platform_preference: platform })
      .eq('id', userId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating platform preference:', error);
    return { success: false, error };
  }
}

export async function updateNewsletterPreference(optIn: boolean) {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error('No user found');
    }

    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        opt_in_newsletter: optIn,
        is_confirmed: true 
      })
      .eq('id', userId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error updating newsletter preference:', error);
    return { success: false, error };
  }
} 