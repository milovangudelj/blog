import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Container } from '~/components/Container'
import { Section } from '~/components/Section'
import { Form } from './form'
import Image from 'next/image'
import { Database } from '~/types/supabase'

export const dynamic = 'force-dynamic'

const entries_old = [
  {
    id: 1,
    name: 'Tony Stark',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message: 'Meh, I could have done it blindfolded when I was 5...',
    username: 'tonystark',
  },
  {
    id: 2,
    name: 'Jane Foster',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message: "It's... nice. Lacks a bit of space.",
    username: 'janefoster',
  },
  {
    id: 3,
    name: 'Steve Rogers',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message: 'I like it. It reminds me of the 40s.',
    username: 'steverogers',
  },
  {
    id: 4,
    name: 'Bruce Banner',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message: 'I prefer the other one.',
    username: 'brucebanner',
  },
  {
    id: 5,
    name: 'Thor Odinson',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message:
      'Our websites looked like this fifty thousand years ago. Then we stopped using the internet. Too antiquated.',
    username: 'thorodinson',
  },
  {
    id: 6,
    name: 'Peter Parker',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message: 'Coool! * insert a pop culture reference here *',
    username: 'peterparker',
  },
]

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
            {entries ? (
              entries.map(({ id, created_by, author_pfp, body }) => (
                <li
                  key={id}
                  className="relative flex w-fit flex-col items-center overflow-hidden rounded-lg border border-white/[0.16] bg-black/20 md:flex-row"
                >
                  <div className="flex-none self-stretch bg-black/40 px-4 py-2">
                    <div className="flex items-center gap-3">
                      <Image
                        src={author_pfp}
                        alt={created_by}
                        sizes="64px"
                        width={460}
                        height={460}
                        className="h-8 w-8 rounded-full border border-white/[0.06]"
                      />
                      <span className="text-body text-light-me">{created_by}</span>
                    </div>
                  </div>
                  <p className="relative flex items-center self-stretch border-white/[0.06] px-4 py-2 text-body text-light-he max-md:border-t md:border-l">
                    {body}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-body text-light-me">
                No entries yet. You might be the first one...
              </p>
            )}
          </ul>
        </Container>
      </Section>
    </>
  )
}
