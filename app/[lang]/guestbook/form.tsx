'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { GithubLogo } from '@phosphor-icons/react'

import { Button } from '~/components/Button'

type FormData = {
  signature: string
}

export function Form({ authenticated }: { authenticated?: boolean }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data, e) => {
    e?.preventDefault()
    if (!authenticated) return

    console.log(data)
  })

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/auth/callback`,
      },
    })
    router.refresh()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    clearErrors()
    router.refresh()
  }

  return (
    <div className="flex max-w-[800px] flex-col gap-1">
      <form
        onSubmit={onSubmit}
        className="flex flex-1 items-center gap-1 rounded-xl bg-white/[0.06] p-1"
      >
        <input
          {...register('signature', {
            required: { value: true, message: 'This field is required' },
            maxLength: { value: 255, message: 'The message must be shorter than 255 carachters' },
          })}
          aria-invalid={errors.signature ? 'true' : 'false'}
          placeholder="Type here your message..."
          className="form-input flex-1 rounded-lg border border-white/[0.06] bg-transparent px-4 py-2 text-body text-light-he transition placeholder:text-light-me focus:border-yellow focus:ring-yellow"
        />

        {authenticated && (
          <Button type="submit" variant="primary">
            Sign
          </Button>
        )}
        {!authenticated && (
          <Button variant="secondary" type="button" onClick={handleSignIn}>
            <span>Sign in with GitHub</span>
            <span className="rounded-full bg-black p-2 text-white">
              <GithubLogo size={16} />
            </span>
          </Button>
        )}
      </form>
      <div className="flex flex-1 gap-2 text-label-md">
        {authenticated && (
          <button
            onClick={handleSignOut}
            className="bg-transparent text-light-me hover:text-light-he"
          >
            Sign out
          </button>
        )}
        {errors.signature && (
          <>
            <span className="text-light-le">·</span>
            <span className="text-tw-red">{errors.signature.message}</span>
          </>
        )}
      </div>
    </div>
  )
}