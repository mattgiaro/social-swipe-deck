import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

type UserWebhookEvent = {
  data: {
    id: string;
    email_addresses: Array<{ email_address: string }>;
    [key: string]: any;
  };
  type: string;
};

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: UserWebhookEvent;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as UserWebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  const { id, email_addresses, ...attributes } = evt.data;

  if (eventType === 'user.created') {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        id: id,
        email: email_addresses[0]?.email_address,
        join_date: new Date().toISOString(),
        is_confirmed: false,
        opt_in_newsletter: false
      });

    if (error) {
      console.error('Error inserting user:', error);
      return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
}

// Disable body parsing, need raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}; 