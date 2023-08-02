
import { Section } from "~components/Section";
import { Container } from "~components/Container";

import { getDictionary } from "~utils/getDictionary";
import { Locale } from "~/i18n.config";

const Home = async ({ params: { lang } }: { params: { lang: Locale } }) => {
	const dictionary = await getDictionary(lang);

	return (
		<>
			<Section className="relative text-white lg:h-[var(--mobile-nav-height)]">
				<Container as="main">
					<h1 className="mb-16 text-h1-mobile md:text-d1-mobile 2xl:text-d1 max-w-[600px]">
						{dictionary.Home.heroTitle}
					</h1>
					<p className="max-w-[500px] text-sub-heading-mobile md:text-sub-heading">
						{dictionary.Home.heroParagraph}
					</p>
				</Container>
			</Section>
		</>
	);
};

export default Home;
