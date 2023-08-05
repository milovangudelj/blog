'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Database } from '~/types/supabase'

type GuestbookEntry = Database['public']['Tables']['guestbook']['Row']

export const Entries = ({ entries: initialEntries }: { entries: GuestbookEntry[] }) => {
  const [entries, setEntries] = useState(initialEntries)
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    setEntries(initialEntries)
  }, [initialEntries])

  useEffect(() => {
    const channel = supabase
      .channel('Realtime guestbook')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guestbook',
        },
        (payload) => {
          setEntries((entries) => [payload.new as GuestbookEntry, ...entries])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setEntries, entries])

  return (
    <>
      {entries.length !== 0 ? (
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
            <p className="relative flex items-center self-stretch break-words border-white/[0.06] px-4 py-2 text-body text-light-he max-md:border-t md:border-l lg:line-clamp-3">
              {body}
            </p>
          </li>
        ))
      ) : (
        <p className="text-body text-light-me">No entries yet. You might be the first one...</p>
      )}
    </>
  )
}
