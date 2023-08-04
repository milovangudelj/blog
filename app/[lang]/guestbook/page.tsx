import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { Container } from '~/components/Container'
import { Section } from '~/components/Section'
import { Form } from './form'
import Image from 'next/image'

const entries = [
  {
    id: 1,
    name: 'John Doe',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message: 'Hi Milo!',
    username: 'milovangudelj',
  },
  {
    id: 2,
    name: 'John Doe',
    picture: 'https://avatars.githubusercontent.com/u/49202538?v=4',
    message: 'Hi Milo!',
    username: 'milovangudelj',
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
          <h1 className="mb-16 text-h1">Sign the guestbook</h1>
          <Form authenticated={session ? true : false} />
        </Container>
      </Section>
      <Section>
        <Container>
          <ul className="flex flex-col gap-8">
            {entries.map(({ id, name, picture, message, username }) => (
              <li
                key={id}
                className="relative flex w-fit items-center overflow-hidden rounded-lg border border-white/[0.16] bg-black before:pointer-events-none before:absolute before:inset-0 before:block before:bg-noise before:bg-repeat before:opacity-80 before:[background-size:100px]"
              >
                <div className="relative flex items-center gap-3 border-r border-white/[0.16] bg-black px-4 py-2 before:pointer-events-none before:absolute before:inset-0 before:block before:bg-noise before:bg-repeat before:opacity-60 before:[background-size:100px]">
                  <Image
                    src={picture}
                    alt={name}
                    width={460}
                    height={460}
                    className="h-10 w-10 rounded-full border border-white/[0.06]"
                  />
                  <div className="flex flex-col">
                    <span className="text-body font-medium text-light-me">{name}</span>
                  </div>
                </div>
                <p className="px-4 py-2 text-body text-light-he">{message}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  )
}
