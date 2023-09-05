import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import Filter from 'bad-words'
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai-edge'

import { Database } from '~/types/supabase'

const openAIConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(openAIConfig)

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

  const filter = new Filter()
  const cl1_signature = filter.clean(signature) // 1st level cleanup filter

  const response = (await (
    await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      stream: false,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: `Censor the following message. Use asterisks to censor only profane words. \n\nSignature: "Holy shit that's crazy!"\nCensored Signature: Holy **** tat's crazy!\n\nSignature: "This website looks like 5hiet..."\nCensored Signature: This website looks like *****...\n\nSignature: "${cl1_signature}"\n\nCensored Signature:`,
        },
      ],
    })
  ).json()) as CreateChatCompletionResponse

  const cl2_signature = response.choices[0].message?.content // 2nd level cleanup flter

  const { status, statusText } = await supabase.from('guestbook').insert({
    body: cl2_signature ?? cl1_signature,
    uncensored_body: signature,
    author_pfp: session.user!.user_metadata.avatar_url,
    created_by: session.user!.user_metadata.name,
    is_published: true,
  })

  return NextResponse.json({ status, statusText })
}

export async function PATCH(request: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || session.user.id !== process.env.SUPABASE_OWNER_ID) {
    return new NextResponse('Unauthorized! Please log in as the owner to update the guestbook.', {
      status: 401,
    })
  }

  const { entry_id, entry_is_published } = await request.json()

  if (!entry_id || entry_is_published === undefined || entry_is_published === null) {
    return new NextResponse('Bad Request: missing signature body...', {
      status: 400,
    })
  }

  const { status, statusText, error } = await supabase
    .from('guestbook')
    .update({ is_published: entry_is_published })
    .eq('id', entry_id)

  return NextResponse.json({ status, statusText })
}