// Site-wide values. Import these anywhere instead of hard-coding them.

export const SITE_TITLE = 'Matt Tatoczenko';
export const SITE_DESCRIPTION =
	'Software engineer in the Seattle area. Projects, experiments, and the occasional blog post.';

export interface SocialLink {
	label: string;
	href: string;
}

// Shown in the footer and on the About page. Add or remove entries here.
export const SOCIAL_LINKS: SocialLink[] = [
	{ label: 'GitHub', href: 'https://github.com/MTatoczenko' },
	// TODO: Replace with your LinkedIn profile URL.
	// { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle/' },
];
