import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Container } from '~/components/Container'
import { Section } from '~/components/Section'
import { Form } from './form'
import Image from 'next/image'
import { Database } from '~/types/supabase'
import { Entries } from './entries'
import { Suspense } from 'react'
import { EntriesBones } from './entries_bones'

export const dynamic = 'force-dynamic'

export default async function GuestbookPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: entries } = await supabase
    .from('guestbook')
    .select()
    .order('created_at', { ascending: false })

  return (
    <>
      <Section>
        <Container>
          <h1 className="mb-16 text-h1-mobile md:text-d1-mobile 2xl:text-d1">Sign the guestbook</h1>
          <Form authenticated={session ? true : false} />
        </Container>
      </Section>
      <Section>
        <Container>
          <ul className="flex max-w-[800px] flex-col gap-8">
            <Suspense fallback={<EntriesBones entries={entries ?? []} />}>
              <Entries entries={entries ?? []} />
            </Suspense>
          </ul>
        </Container>
      </Section>
    </>
  )
}
