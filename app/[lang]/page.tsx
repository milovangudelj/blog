import { Section } from '~components/Section'
import { Container } from '~components/Container'

import { getDictionary } from '~utils/getDictionary'
import { Locale } from '~/i18n.config'
import Image from 'next/image'
import Link from 'next/link'

import posts from '~/data/posts.json'

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
  const dictionary = await getDictionary(lang)

  return (
    <>
      <Section className="relative text-white lg:h-[var(--mobile-nav-height)]">
        <Container as="main" className="relative">
          <h1 className="mb-16 max-w-[600px] text-h1-mobile md:text-d1-mobile 2xl:text-d1">
            {dictionary.Home.heroTitle}
          </h1>
          <p className="max-w-[500px] text-sub-heading-mobile md:text-sub-heading">
            {dictionary.Home.heroParagraph}
          </p>
          <Image
            src="/images/icedcoffee.webp"
            sizes="1200px"
            width={600}
            height={400}
            alt="A picture of a mug of iced coffee as seen from above."
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl border border-white/[0.06] object-cover shadow-2xl"
          />
        </Container>
      </Section>
      <Section>
        <Container>
          <h2 className="mb-16 text-h2-mobile xl:text-h2">Latest posts</h2>
          <ol className="flex justify-between">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug} className="">
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
    </>
  )
}

export default Home
