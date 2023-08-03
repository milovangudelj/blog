import { Locale } from '~/i18n.config';

import posts from '~/data/posts.json';

export async function generateStaticParams() {
	return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
	params: { slug, lang },
}: {
	params: { slug: string; lang: Locale };
}) {
	return <h1>{posts.find((post)=>post.slug === slug)?.title}</h1>
}