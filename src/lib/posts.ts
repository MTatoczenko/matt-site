import { type CollectionEntry, getCollection } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;

/**
 * Blog posts, newest first. Drafts (files in src/content/blog/drafts/) are only loaded
 * by `npm run dev`; see src/content.config.ts.
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
	const posts = await getCollection('blog');
	return posts.sort((a, b) => {
		const byDate = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
		// Same-day posts fall back to file name so the order is stable between builds.
		return byDate !== 0 ? byDate : a.id.localeCompare(b.id);
	});
}

/** True for posts in the drafts/ folder. These only exist in `npm run dev`. */
export function isDraft(post: BlogPost): boolean {
	// Check the file path, not the id: a frontmatter `slug` would replace the id.
	const filePath = (post.filePath ?? '').replaceAll('\\', '/');
	return filePath.includes('/blog/drafts/');
}

/** The site-relative URL of a post's page. */
export function getPostUrl(post: BlogPost): string {
	return `/blog/${post.id}/`;
}
