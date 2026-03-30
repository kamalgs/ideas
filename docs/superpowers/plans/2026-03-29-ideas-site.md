# Ideas Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal Astro site that renders Markdown files from category folders into a navigable static website deployable to GitHub Pages or Netlify.

**Architecture:** Astro Content Collections map directly to content folders (`books/`, `movies/`, `thoughts/`). A shared `CATEGORIES` constant drives `getStaticPaths` in all page templates. All routes are statically generated — zero client-side JS.

**Tech Stack:** Astro 4, TypeScript (strict), plain CSS, GitHub Actions (gh-pages deploy), Netlify (netlify.toml)

---

## File Map

| File | Purpose |
|---|---|
| `package.json` | Project metadata + scripts |
| `tsconfig.json` | TypeScript config (extends Astro strict) |
| `.nvmrc` | Pin Node 20 |
| `astro.config.mjs` | Astro static output config |
| `src/content/config.ts` | Content collection schemas (books, movies, thoughts) |
| `src/lib/categories.ts` | Shared `CATEGORIES` constant + `Category` type |
| `src/styles/global.css` | Site-wide styles |
| `src/layouts/Post.astro` | Shared layout for individual post pages |
| `src/pages/index.astro` | Home page — latest 10 entries across all categories |
| `src/pages/[category]/index.astro` | Category listing page |
| `src/pages/[category]/[slug].astro` | Individual post page |
| `src/content/books/the-remains-of-the-day.md` | Sample book entry |
| `src/content/movies/the-zone-of-interest.md` | Sample movie entry |
| `src/content/thoughts/on-note-taking.md` | Sample thought entry |
| `.github/workflows/deploy.yml` | GitHub Actions: build + push to gh-pages |
| `netlify.toml` | Netlify build config |

---

### Task 1: Project scaffold

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.nvmrc`
- Create: `astro.config.mjs`
- Create: `public/.gitkeep`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "ideas",
  "type": "module",
  "version": "0.1.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^4.16.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 3: Write `.nvmrc`**

```
20
```

- [ ] **Step 4: Write `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Uncomment and set for GitHub Pages subdirectory deploys:
  // site: 'https://YOUR-USERNAME.github.io',
  // base: '/ideas',
});
```

- [ ] **Step 5: Create `public/.gitkeep`** (empty file — keeps the directory tracked by git)

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 7: Commit**

```bash
git init
git add package.json tsconfig.json .nvmrc astro.config.mjs public/.gitkeep
git commit -m "chore: scaffold Astro project"
```

---

### Task 2: Content collection schema + shared constants

**Files:**
- Create: `src/content/config.ts`
- Create: `src/lib/categories.ts`

- [ ] **Step 1: Write `src/lib/categories.ts`**

```typescript
export const CATEGORIES = ['books', 'movies', 'thoughts'] as const;
export type Category = (typeof CATEGORIES)[number];
```

- [ ] **Step 2: Write `src/content/config.ts`**

```typescript
import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).optional().default([]),
  rating: z.number().int().min(1).max(5).optional(),
});

export const collections = {
  books: defineCollection({ type: 'content', schema: postSchema }),
  movies: defineCollection({ type: 'content', schema: postSchema }),
  thoughts: defineCollection({ type: 'content', schema: postSchema }),
};
```

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: `astro check` exits 0, no type errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/lib/categories.ts
git commit -m "feat: add content collection schemas and categories constant"
```

---

### Task 3: Sample content files

**Files:**
- Create: `src/content/books/the-remains-of-the-day.md`
- Create: `src/content/movies/the-zone-of-interest.md`
- Create: `src/content/thoughts/on-note-taking.md`

These give the build something to render and validate the schema works.

- [ ] **Step 1: Write `src/content/books/the-remains-of-the-day.md`**

```markdown
---
title: "The Remains of the Day"
date: 2026-03-29
tags: [fiction, booker-prize, kazuo-ishiguro]
rating: 5
---

A quietly devastating novel about regret, duty, and the English butler Stevens — who has spent his life in service to a lord whose sympathies, it slowly emerges, lay with the Nazis. Ishiguro never raises his voice. The horror sneaks up on you.

The unreliable narrator is deployed with absolute precision. Stevens genuinely believes he acted with dignity; the reader can see he threw his life away.
```

- [ ] **Step 2: Write `src/content/movies/the-zone-of-interest.md`**

```markdown
---
title: "The Zone of Interest"
date: 2026-03-29
tags: [film, jonathan-glazer, holocaust, 2023]
rating: 5
---

Jonathan Glazer's film shows the family of Auschwitz commandant Rudolf Höss living an ordinary, pleasant suburban life beside the camp walls. We never see inside. We only hear.

The banality is the point, and it is unbearable. One of the most formally rigorous films in years.
```

- [ ] **Step 3: Write `src/content/thoughts/on-note-taking.md`**

```markdown
---
title: "On Note-Taking"
date: 2026-03-29
tags: [productivity, writing, thinking]
---

The value of a note is not in the capturing but in the returning. Most note-taking systems are elaborate ways to avoid thinking.

A note that you never re-read is a thought that you flushed with extra steps. Write less, revisit more.
```

- [ ] **Step 4: Run type check**

```bash
npm run check
```

Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: add sample content for books, movies, and thoughts"
```

---

### Task 4: Global styles + Post layout

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/Post.astro`

- [ ] **Step 1: Write `src/styles/global.css`**

```css
*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --max-width: 720px;
  --color-text: #1a1a1a;
  --color-muted: #666;
  --color-accent: #2563eb;
  --color-bg: #fff;
  --color-badge-bg: #f0f4ff;
  --color-badge-text: #2563eb;
}

body {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text);
  background: var(--color-bg);
  margin: 0;
  padding: 0 1rem;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

header {
  max-width: var(--max-width);
  margin: 2rem auto 3rem;
  display: flex;
  align-items: baseline;
  gap: 2rem;
}

header h1 {
  margin: 0;
  font-size: 1.5rem;
}

header h1 a {
  color: var(--color-text);
}

nav {
  display: flex;
  gap: 1.25rem;
}

nav a {
  color: var(--color-muted);
  font-size: 1rem;
  font-family: system-ui, sans-serif;
  text-transform: capitalize;
}

nav a:hover {
  color: var(--color-accent);
  text-decoration: none;
}

main {
  max-width: var(--max-width);
  margin: 0 auto 4rem;
}

.entry-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.entry-list li {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.entry-list li a {
  flex: 1;
}

.category-badge {
  font-family: system-ui, sans-serif;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 99px;
  background: var(--color-badge-bg);
  color: var(--color-badge-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

time {
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  color: var(--color-muted);
  white-space: nowrap;
}

.post-header {
  margin-bottom: 2rem;
}

.post-header h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  color: var(--color-muted);
}

.tags {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.tag {
  background: #f5f5f5;
  padding: 0.1rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.rating {
  color: #f59e0b;
  letter-spacing: 0.1em;
}

.prose {
  font-size: 1.125rem;
  line-height: 1.8;
}

.prose h2 { font-size: 1.4rem; margin-top: 2rem; }
.prose h3 { font-size: 1.2rem; margin-top: 1.5rem; }
.prose p  { margin: 1rem 0; }
.prose blockquote {
  border-left: 3px solid #ddd;
  margin: 1.5rem 0;
  padding: 0.25rem 1.25rem;
  color: var(--color-muted);
  font-style: italic;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  color: var(--color-muted);
}
```

- [ ] **Step 2: Write `src/layouts/Post.astro`**

```astro
---
import type { Category } from '../lib/categories';
import '../styles/global.css';

interface Props {
  title: string;
  date: Date;
  tags: string[];
  rating?: number;
  category: Category;
}

const { title, date, tags, rating, category } = Astro.props;

const stars = rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : null;
const dateStr = date.toLocaleDateString('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} — Ideas</title>
</head>
<body>
  <header>
    <h1><a href="/">Ideas</a></h1>
    <nav>
      <a href="/books">books</a>
      <a href="/movies">movies</a>
      <a href="/thoughts">thoughts</a>
    </nav>
  </header>
  <main>
    <a class="back-link" href={`/${category}`}>← {category}</a>
    <article>
      <div class="post-header">
        <h1>{title}</h1>
        <div class="post-meta">
          <span class="category-badge">{category}</span>
          <time datetime={date.toISOString()}>{dateStr}</time>
          {stars && <span class="rating">{stars}</span>}
          {tags.length > 0 && (
            <div class="tags">
              {tags.map(tag => <span class="tag">{tag}</span>)}
            </div>
          )}
        </div>
      </div>
      <div class="prose">
        <slot />
      </div>
    </article>
  </main>
</body>
</html>
```

- [ ] **Step 3: Run type check**

```bash
npm run check
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/Post.astro
git commit -m "feat: add global styles and Post layout"
```

---

### Task 5: Home page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Write `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import { CATEGORIES } from '../lib/categories';
import type { Category } from '../lib/categories';
import '../styles/global.css';

type Entry = {
  slug: string;
  data: { title: string; date: Date; tags: string[]; rating?: number };
  category: Category;
};

const all: Entry[] = [];

for (const category of CATEGORIES) {
  const entries = await getCollection(category);
  for (const entry of entries) {
    all.push({ slug: entry.slug, data: entry.data, category });
  }
}

const recent = all
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 10);
---
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ideas</title>
</head>
<body>
  <header>
    <h1>Ideas</h1>
    <nav>
      {CATEGORIES.map(cat => <a href={`/${cat}`}>{cat}</a>)}
    </nav>
  </header>
  <main>
    <ul class="entry-list">
      {recent.map(entry => (
        <li>
          <span class="category-badge">{entry.category}</span>
          <a href={`/${entry.category}/${entry.slug}`}>{entry.data.title}</a>
          <time datetime={entry.data.date.toISOString()}>
            {entry.data.date.toLocaleDateString('en-GB', {
              year: 'numeric', month: 'short', day: 'numeric'
            })}
          </time>
        </li>
      ))}
    </ul>
  </main>
</body>
</html>
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: exits 0.

- [ ] **Step 3: Run dev server and verify home page loads**

```bash
npm run dev
```

Open `http://localhost:4321` — expect to see three entries listed with category badges.

Stop the server (Ctrl+C).

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add home page with recent entries"
```

---

### Task 6: Category listing page

**Files:**
- Create: `src/pages/[category]/index.astro`

- [ ] **Step 1: Write `src/pages/[category]/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import { CATEGORIES } from '../../lib/categories';
import type { Category } from '../../lib/categories';
import '../../styles/global.css';

export async function getStaticPaths() {
  return CATEGORIES.map(category => ({ params: { category } }));
}

const category = Astro.params.category as Category;
const entries = await getCollection(category);
const sorted = entries.sort(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);
---
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{category} — Ideas</title>
</head>
<body>
  <header>
    <h1><a href="/">Ideas</a></h1>
    <nav>
      {CATEGORIES.map(cat => <a href={`/${cat}`}>{cat}</a>)}
    </nav>
  </header>
  <main>
    <h2 style="font-size:1.25rem; margin-bottom:1.5rem; text-transform:capitalize;">{category}</h2>
    {sorted.length === 0 && <p style="color:#666;">No entries yet.</p>}
    <ul class="entry-list">
      {sorted.map(entry => (
        <li>
          <a href={`/${category}/${entry.slug}`}>{entry.data.title}</a>
          <time datetime={entry.data.date.toISOString()}>
            {entry.data.date.toLocaleDateString('en-GB', {
              year: 'numeric', month: 'short', day: 'numeric'
            })}
          </time>
        </li>
      ))}
    </ul>
  </main>
</body>
</html>
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: exits 0.

- [ ] **Step 3: Verify in dev server**

```bash
npm run dev
```

Open `http://localhost:4321/books` — expect "The Remains of the Day" listed.
Open `http://localhost:4321/movies` — expect "The Zone of Interest" listed.
Open `http://localhost:4321/thoughts` — expect "On Note-Taking" listed.

Stop the server.

- [ ] **Step 4: Commit**

```bash
git add src/pages/
git commit -m "feat: add category listing page"
```

---

### Task 7: Individual post page

**Files:**
- Create: `src/pages/[category]/[slug].astro`

- [ ] **Step 1: Write `src/pages/[category]/[slug].astro`**

```astro
---
import { getCollection } from 'astro:content';
import { CATEGORIES } from '../../lib/categories';
import type { Category } from '../../lib/categories';
import Post from '../../layouts/Post.astro';

export async function getStaticPaths() {
  const paths = [];
  for (const category of CATEGORIES) {
    const entries = await getCollection(category);
    for (const entry of entries) {
      paths.push({
        params: { category, slug: entry.slug },
        props: { entry, category },
      });
    }
  }
  return paths;
}

const { entry, category } = Astro.props as {
  entry: Awaited<ReturnType<typeof getCollection<Category>>>[number];
  category: Category;
};

const { Content } = await entry.render();
---
<Post
  title={entry.data.title}
  date={entry.data.date}
  tags={entry.data.tags}
  rating={entry.data.rating}
  category={category}
>
  <Content />
</Post>
```

- [ ] **Step 2: Run type check**

```bash
npm run check
```

Expected: exits 0.

- [ ] **Step 3: Run full build to verify all pages generate**

```bash
npm run build
```

Expected: exits 0. Check `dist/` contains:
- `dist/index.html`
- `dist/books/index.html`
- `dist/books/the-remains-of-the-day/index.html`
- `dist/movies/index.html`
- `dist/movies/the-zone-of-interest/index.html`
- `dist/thoughts/index.html`
- `dist/thoughts/on-note-taking/index.html`

- [ ] **Step 4: Spot-check the preview**

```bash
npm run preview
```

Open `http://localhost:4321` — click through home → category → post, verify all three categories work. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/[category]/
git commit -m "feat: add individual post page — site fully functional"
```

---

### Task 8: Deployment configs

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `netlify.toml`

- [ ] **Step 1: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

> **Note:** After pushing to GitHub, go to repo Settings → Pages → set Source to "Deploy from branch" → branch `gh-pages`, folder `/`. If the repo is at `username.github.io/ideas` (not a root user/org page), also add `base: '/ideas'` to `astro.config.mjs` and re-deploy.

- [ ] **Step 2: Write `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

> **Note for Netlify:** Connect the repo in the Netlify UI (Add new site → Import from Git). No `base` config needed if using a Netlify subdomain or custom root domain.

- [ ] **Step 3: Write `.gitignore`**

```
node_modules/
dist/
.astro/
```

- [ ] **Step 4: Run final build to confirm nothing is broken**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 5: Commit everything**

```bash
git add .github/ netlify.toml .gitignore
git commit -m "chore: add GitHub Actions and Netlify deployment configs"
```

---

### Task 9: Push to GitHub

- [ ] **Step 1: Create the GitHub repo**

```bash
gh repo create ideas --public --source=. --remote=origin --push
```

If `gh` is not authenticated, run `gh auth login` first.

Expected: repo created at `github.com/YOUR-USERNAME/ideas`, all commits pushed to `main`.

- [ ] **Step 2: Verify GitHub Actions triggered**

```bash
gh run list --limit 5
```

Expected: a workflow run named "Deploy to GitHub Pages" appears with status `in_progress` or `success`.

- [ ] **Step 3: Check the run succeeds**

```bash
gh run watch
```

Wait for green. If it fails, check with `gh run view --log-failed`.

---

## Adding a New Category Later

1. Create `src/content/<new-category>/` folder
2. Add to `src/content/config.ts`:
   ```typescript
   <new-category>: defineCollection({ type: 'content', schema: postSchema }),
   ```
3. Add `'<new-category>'` to the `CATEGORIES` array in `src/lib/categories.ts`
4. That's it — listing page and post routes are generated automatically.
