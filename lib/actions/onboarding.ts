'use server'

import { auth, clerkClient, type EmailAddress } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import type { Platform } from '@/types/user';

export async function updatePlatformPreference(platform: Platform) {
  try {
    const session = await auth();
    const userId = session.userId;
    if (!userId) {
      throw new Error('No user found');
    }

    // Get current metadata to preserve other fields
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const currentMetadata = user.publicMetadata;

    // Update Clerk metadata
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        ...currentMetadata,
        platform_preference: platform,
      },
    });

    // Try to sync with Supabase
    try {
      await syncUserToSupabase(userId);
    } catch (error) {
      console.error('Failed to sync with Supabase:', error);
      // Don't throw here, as Clerk update was successful
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating platform preference:', error);
    return { success: false, error };
  }
}

export async function updateNewsletterPreference(optIn: boolean) {
  try {
    const session = await auth();
    const userId = session.userId;
    if (!userId) {
      throw new Error('No user found');
    }

    // Get current metadata to preserve other fields
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const currentMetadata = user.publicMetadata;

    // Update Clerk metadata
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        ...currentMetadata,
        opt_in_newsletter: optIn,
        is_confirmed: true,
      },
    });

    // Try to sync with Supabase
    try {
      await syncUserToSupabase(userId);
    } catch (error) {
      console.error('Failed to sync with Supabase:', error);
      // Don't throw here, as Clerk update was successful
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating newsletter preference:', error);
    return { success: false, error };
  }
}

// Helper function to sync user data from Clerk to Supabase
async function syncUserToSupabase(userId: string) {
  const clerk = await clerkClient();
  const user = await clerk.users.getUser(userId);
  const metadata = user.publicMetadata;
  const primaryEmail = user.emailAddresses.find(
    (email: EmailAddress) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  if (!primaryEmail) {
    throw new Error('No primary email found');
  }

  const { data: existingUser, error: fetchError } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (existingUser) {
    // Update existing user
    const { error } = await supabaseAdmin
      .from('users')
      .update({
        email: primaryEmail,
        platform_preference: metadata.platform_preference as Platform | null,
        opt_in_newsletter: metadata.opt_in_newsletter as boolean,
        is_confirmed: metadata.is_confirmed as boolean,
      })
      .eq('id', userId);

    if (error) throw error;
  } else {
    // Create new user
    const { error } = await supabaseAdmin
      .from('users')
      .insert({
        id: userId,
        email: primaryEmail,
        join_date: new Date().toISOString(),
        platform_preference: metadata.platform_preference as Platform | null,
        opt_in_newsletter: metadata.opt_in_newsletter as boolean || false,
        is_confirmed: metadata.is_confirmed as boolean || false,
      });

    if (error) throw error;
  }
} 