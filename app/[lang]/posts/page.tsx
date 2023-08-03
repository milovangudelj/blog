import Image from 'next/image'
import Link from 'next/link'

import { Container, Section } from '~/components'

import posts from '~/data/posts.json'

export default async function PostsPage() {
  return (
    <>
      <Section>
        <Container>
          <h1 className="mb-16 text-h1-mobile md:text-d1-mobile 2xl:text-d1">Latest posts</h1>
          <ol className="flex justify-between">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <Image
                  src={post.image}
                  sizes="768px"
                  width={384}
                  height={(384 / 16) * 9}
                  alt=""
                  className="mb-8 aspect-video w-[384px] rounded-2xl border border-white/[0.06] object-cover shadow-2xl"
                />
                <div className="flex flex-col">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group w-fit text-sub-heading-mobile font-medium md:text-sub-heading"
                  >
                    {post.title}{' '}
                    <span className="inline-block text-white transition will-change-transform group-hover:translate-x-1 group-hover:text-yellow">
                      →
                    </span>
                  </Link>
                  <span className="inline-block max-w-full truncate text-label-md text-light-me">
                    {post.views} views
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="mb-16 text-h2-mobile md:text-h2">All posts</h2>
          <ol>
            {posts.slice(3).map((post) => (
              <li key={post.slug} className="mb-16 flex gap-16 last:mb-0">
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="group w-fit text-sub-heading-mobile font-medium md:text-sub-heading"
                  >
                    {post.title}{' '}
                    <span className="inline-block text-white transition will-change-transform group-hover:translate-x-1 group-hover:text-yellow">
                      →
                    </span>
                  </Link>
                  <span className="inline-block max-w-full truncate text-label-md text-light-me">
                    {post.views} views
                  </span>
                  <p className="mt-8 line-clamp-3 text-light-me">
                    Lorem ipsum is placeholder text commonly used in the graphic, print, and
                    publishing industries for previewing layouts and visual mockups. Lorem ipsum is
                    placeholder text commonly used in the graphic, print, and publishing industries
                    for previewing layouts and visual mockups.
                  </p>
                </div>
                <Image
                  src={post.image}
                  sizes="900px"
                  width={450}
                  height={(450 / 16) * 9}
                  alt=""
                  className="aspect-video w-[450px] rounded-2xl border border-white/[0.06] object-cover shadow-2xl"
                />
              </li>
            ))}
          </ol>
        </Container>
      </Section>
    </>
  )
}
