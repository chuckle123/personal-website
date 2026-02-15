# camspencer.com

Personal portfolio site. Static Next.js export deployed to GitHub Pages.

## Stack

- Next.js 15 (App Router, static export)
- Tailwind CSS
- GitHub Actions → GitHub Pages

## Development

```bash
npm install
npm run dev
```

## Deploy

Push to `main`. GitHub Actions builds and deploys automatically.

## Structure

```
app/
├── page.tsx              # Home — project highlights
├── projects/page.tsx     # All projects
├── experience/page.tsx   # Career timeline
├── about/page.tsx        # Bio
├── contact/page.tsx      # Links
├── layout.tsx            # Root layout with nav + footer
└── globals.css           # Design system CSS variables
components/
├── Navigation.tsx        # Top nav with / separators
└── Footer.tsx            # Contact links
```
