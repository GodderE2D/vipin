import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = 'vipin ─ hacker';
	const description = "Hey 👋🏾 I'm Vipin, a hacker";

	return {
		title,
		description,
		canonical: `https://vipinb.xyz/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'vipin',
			url: `https://vipinb.xyz${router.asPath}`,
			type: 'website',
			images: [
				{
					url: 'https://vipinb.xyz/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@qvipinb',
			site: '@qvipinb',
		},
		...props,
	};
}
