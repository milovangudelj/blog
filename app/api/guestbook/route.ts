import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '~/types/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return new NextResponse('Unauthorized! Please log in to sign the guestbook.', {
      status: 401,
    })
  }

  const { signature } = await request.json()

  if (!signature) {
    return new NextResponse('Bad Request: missing signature body...', {
      status: 400,
    })
  }

  // TODO: add profanity censoring for signature (bad-words + chat-gpt-3.5-turbo)

  await supabase.from('guestbook').insert({
    body: signature,
    author_pfp: session.user!.user_metadata.avatar_url,
    created_by: session.user!.user_metadata.name,
  })

  return NextResponse.json({ success: true })
}
