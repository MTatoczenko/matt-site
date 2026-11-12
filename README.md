# matt.tatoczenko.com

Matt Tatoczenko's personal website, built with [Astro](https://astro.build/) and deployed to GitHub Pages.

## Local development

Requires Node.js 22.23.4 or newer.

```sh
npm install      # first time only
npm run dev      # dev server at http://localhost:4321 (includes drafts)
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Writing a blog post

1. Create a Markdown file in `src/content/blog/drafts/`. The file name becomes the URL:
   `my-first-trip.md` → `https://matt.tatoczenko.com/blog/my-first-trip/`.
2. Start it with frontmatter:

   ```md
   ---
   title: 'My first trip'
   description: 'One-line summary used on the blog list and in link previews.'
   pubDate: '2026-11-11'
   ---

   Post content in Markdown...
   ```

3. Preview it with `npm run dev`. Drafts show up with a "Draft" badge.
4. When it's ready, move the file up into `src/content/blog/`, then commit and push to `main`.
   GitHub Actions builds and deploys the site in a minute or two.

Files in `drafts/` are never loaded by production builds, so nothing from a draft (text or
images) ends up on the live site. **They are still visible in the repo on GitHub**, though, since
the repo is public. Keep anything private out of commits until you're ready to publish.

Optional frontmatter: `updatedDate`, and `heroImage` (a path to an image relative to the post,
e.g. `'./my-image.jpg'` with the image next to the post). Use `.mdx` instead of `.md` to embed
Astro components in a post.

You can also add or edit posts straight from github.com (**Add file → Create new file** in
`src/content/blog/`). Committing there to `main` deploys just the same.

## Project layout

```
src/
  consts.ts           Site title, description, social links
  content/blog/       Blog posts (.md / .mdx); drafts/ holds unpublished ones
  layouts/            BaseLayout (page shell) and BlogPost
  lib/posts.ts        Post listing and URL helpers
  components/         Header, footer, <head> tags
  pages/              One file per route (index, about, blog, rss.xml, 404)
  styles/global.css   Global styles and light/dark color tokens
public/               Copied as-is (favicon)
```

## Deployment

`.github/workflows/deploy.yml` type-checks, builds, and deploys on every push to `main`.

This site lives at the `matt.tatoczenko.com` subdomain. The apex domain, `tatoczenko.com`, is
reserved for a separate landing-page site in its own repo.

One-time setup, in this order:

1. Create the GitHub repo. In **Settings → Pages → Build and deployment → Source**, pick
   **GitHub Actions**. (Done for `MTatoczenko/matt-site`.)
2. Push this repo. (If the first workflow run failed because step 1 wasn't done yet, re-run it
   from **Actions → Deploy to GitHub Pages → Run workflow**.) Until the custom domain is set up,
   the site is served at `https://mtatoczenko.github.io/matt-site/`, where it will look broken:
   links and styles assume the site lives at the domain root. Use `npm run preview` to check it
   locally instead.
3. Verify `tatoczenko.com` in the GitHub **account** settings that own the repo
   (**Settings → Pages → Add a domain**). It gives you a `TXT` record to add in Squarespace.
   Verifying the apex domain also covers its subdomains, and stops anyone else from claiming
   them for their own Pages sites. If the repos move to a GitHub organization later, verify the
   domain on the organization instead.
4. In Squarespace (**Domains → tatoczenko.com → DNS**), add:
   - `CNAME` `matt` → `mtatoczenko.github.io`

   Leave the apex (`@`) and `www` records alone. They belong to the landing-page site.
5. In the repo's **Settings → Pages**, set the custom domain to `matt.tatoczenko.com`. Enable
   **Enforce HTTPS** once the certificate is issued.

The custom domain is stored in the repo's Pages settings. With Actions-based deploys, GitHub
does not read a `CNAME` file from the build output.
