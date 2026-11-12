import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Every .md or .mdx file in src/content/blog/ becomes a post at /blog/<file-name>/.
	// Files in src/content/blog/drafts/ are loaded only by `npm run dev`. Production builds
	// never load them, so nothing from a draft (including its images) is published.
	loader: glob({
		base: './src/content/blog',
		pattern: import.meta.env.DEV ? '**/*.{md,mdx}' : ['**/*.{md,mdx}', '!drafts/**'],
	}),
	// Frontmatter is validated against this schema at build time.
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog };

