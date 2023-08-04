import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Container } from '~/components/Container'
import { Section } from '~/components/Section'
import { Form } from './form'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

const entries = [
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
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

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
            {entries.map(({ id, name, picture, message, username }) => (
              <li
                key={id}
                className="relative flex w-fit flex-col items-center overflow-hidden rounded-lg border border-white/[0.16] bg-black before:pointer-events-none before:absolute before:inset-0 before:block before:bg-noise before:bg-repeat before:opacity-60 before:[background-size:100px] md:flex-row"
              >
                <div className="flex-none self-stretch px-4 py-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={picture}
                      alt={name}
                      sizes="64px"
                      width={460}
                      height={460}
                      className="h-8 w-8 rounded-full border border-white/[0.06]"
                    />
                    <span className="text-body text-light-me">{name}</span>
                  </div>
                </div>
                <p className="relative flex items-center self-stretch border-white/[0.16] bg-black px-4 py-2 text-body text-light-he before:pointer-events-none before:absolute before:inset-0 before:block before:bg-noise before:bg-repeat before:opacity-80 before:[background-size:100px] max-md:border-t md:border-l">
                  {message}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
