import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// Route Segment Config
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    console.log('📥 Received Clerk webhook');
    
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('❌ Missing Svix headers:', { svix_id, svix_timestamp, svix_signature });
      return new Response('Error occurred -- no svix headers', {
        status: 400
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the webhook
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
      console.log('✅ Webhook verified');
    } catch (err) {
      console.error('❌ Error verifying webhook:', err);
      return new Response('Error occurred', {
        status: 400
      });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    console.log('📝 Processing event:', { eventType, id });

    if (eventType === 'user.created') {
      console.log('👤 Creating new user in Supabase');
      
      // Get the user's email
      const emailObject = evt.data.email_addresses?.[0];
      const email = emailObject?.email_address;

      if (!email) {
        console.error('❌ No email found in user data');
        return NextResponse.json({ error: 'No email found' }, { status: 400 });
      }

      try {
        const { error } = await supabaseAdmin
          .from('users')
          .insert({
            id: id,
            email: email,
            join_date: new Date().toISOString(),
            is_confirmed: false,
            opt_in_newsletter: false,
            platform_preference: null
          });

        if (error) {
          console.error('❌ Error inserting user:', error);
          throw error;
        }

        console.log('✅ User created successfully in Supabase');
        return NextResponse.json({ success: true });
        
      } catch (error) {
        console.error('❌ Error creating user:', error);
        return NextResponse.json(
          { error: 'Error creating user' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Unhandled error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
 