# Ideas Site Design

**Date:** 2026-03-29
**Status:** Approved

## Overview

A personal site for capturing ideas, thoughts, and reviews (books, movies, etc.) as Markdown files organised into category folders. Built with Astro, deployable to GitHub Pages or Netlify.

## Tech Stack

- **SSG:** Astro (Content Collections for typed, folder-based content)
- **Styling:** Plain CSS, no framework dependency
- **Hosting:** GitHub Pages (via `gh-pages` branch) or Netlify (`netlify.toml`)
- **Node:** pinned via `.nvmrc`

## Repo Name

`ideas`

## Repository Structure

```
ideas/
├── src/
│   ├── content/
│   │   ├── books/              # book reviews
│   │   ├── movies/             # movie reviews
│   │   ├── thoughts/           # ideas, essays, misc
│   │   └── config.ts           # Astro content collection schemas
│   ├── pages/
│   │   ├── index.astro         # home — recent entries across all categories
│   │   ├── [category]/
│   │   │   └── index.astro     # listing per category
│   │   └── [category]/[slug].astro  # individual post
│   └── layouts/
│       └── Post.astro          # shared post layout
├── public/                     # static assets (favicon, etc.)
├── .github/
│   └── workflows/
│       └── deploy.yml          # build + deploy to gh-pages branch
├── netlify.toml                # Netlify deploy config
├── .nvmrc                      # pinned Node version
├── astro.config.mjs
└── package.json
```

## Content Format

Each Markdown file uses this frontmatter schema:

```yaml
---
title: "The Remains of the Day"
date: 2026-03-29
tags: [fiction, booker-prize]
rating: 5              # optional, 1–5
---
Content here...
```

- `title` — required string
- `date` — required date
- `tags` — optional string array
- `rating` — optional integer 1–5 (rendered as stars where present)

The category is derived from the folder name, not stored in frontmatter.

## Pages & Routing

| Route | Description |
|---|---|
| `/` | Home — latest 10 entries across all categories, with category badge |
| `/books` | All book entries, sorted by date descending |
| `/movies` | All movie entries, sorted by date descending |
| `/thoughts` | All thought entries, sorted by date descending |
| `/books/[slug]` | Individual book post |
| `/movies/[slug]` | Individual movie post |
| `/thoughts/[slug]` | Individual thought post |

New categories are added by: (1) creating a new folder under `src/content/`, (2) adding a collection definition to `config.ts`, and (3) adding the collection name to the `CATEGORIES` constant used by `getStaticPaths` in the category listing and post pages. This is a ~3-line change per new category.

## Site Behaviour

- **Home page** lists recent entries across all categories with date, category badge, and title
- **Category pages** show full listing for that category
- **Post pages** show: title, date, tags, optional star rating, Markdown body
- No client-side JavaScript shipped to the browser
- No search at launch (Pagefind can be added later with minimal effort)

## Deployment

### GitHub Pages
- GitHub Actions workflow on push to `main`: builds Astro, pushes dist to `gh-pages` branch
- GitHub Pages configured to serve from `gh-pages` branch

### Netlify
- `netlify.toml` sets build command (`astro build`) and publish dir (`dist`)
- Connect repo in Netlify UI; auto-deploys on push to `main`

Both configs are included. Use whichever platform is preferred — they are not mutually exclusive.

## Adding Content

To add a new entry:

```bash
# Book review
touch src/content/books/remains-of-the-day.md

# Movie review
touch src/content/movies/the-zone-of-interest.md
```

Frontmatter is validated at build time via the Astro content collection schema.

## Out of Scope (can be added later)

- Full-text search (Pagefind)
- RSS feed
- Comments
- Dark mode toggle
- Pagination (listing pages show all entries for now)
