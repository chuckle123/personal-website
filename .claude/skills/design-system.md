# Personal Website Design System

This skill defines the UX and visual design system for Cameron Spencer's personal website (camspencer.com). All UI work on this site MUST follow these guidelines.

## Design Philosophy

**Retro-modern minimalism.** The site should feel like a well-made 2000s personal homepage — simple, text-forward, no-nonsense — but with modern layout, spacing, and responsiveness. Think early Blogger/academic sites crossed with contemporary typographic design. Nothing flashy. Let the work speak.

## Color System

### Palette

The site uses a strict **two-tone palette**: off-black and off-white. No accent colors. No gradients. Contrast and typography do all the work.

| Token               | Light Mode   | Dark Mode    |
|----------------------|-------------|-------------|
| `--bg`              | `#f5f1eb`   | `#1a1a1a`   |
| `--fg`              | `#1a1a1a`   | `#f5f1eb`   |
| `--bg-secondary`    | `#e8e4de`   | `#252525`   |
| `--fg-muted`        | `#555555`   | `#999999`   |
| `--border`          | `#d0ccc6`   | `#333333`   |
| `--link`            | `#1a1a1a`   | `#f5f1eb`   |
| `--link-hover`      | `#555555`   | `#cccccc`   |

The off-white (`#f5f1eb`) has a warm, slightly parchment-like tone — not sterile pure white. The off-black (`#1a1a1a`) is soft, not harsh.

### Color Mode

- **System-adaptive by default** — follows `prefers-color-scheme`
- No manual toggle required (but can be added later)
- Both modes must be equally well-designed, not an afterthought

## Typography

### Font Stack

The site uses system and web-safe fonts reminiscent of the 2000s web, slightly modernized:

- **Headings:** `Georgia, 'Times New Roman', serif` — classic editorial feel
- **Body:** `Verdana, Geneva, Tahoma, sans-serif` — the quintessential 2000s web font, highly legible
- **Code/mono:** `'Courier New', Courier, monospace` — for any technical snippets

Do NOT use custom web fonts (no Google Fonts, no font CDNs). The site should load instantly with zero font requests.

### Type Scale

Keep it simple. Use a modest scale with clear hierarchy:

| Element        | Size       | Weight    | Style         |
|----------------|-----------|-----------|---------------|
| Page title     | `1.75rem` | `700`     | Georgia       |
| Section heading| `1.25rem` | `700`     | Georgia       |
| Subheading     | `1rem`    | `700`     | Georgia       |
| Body text      | `0.875rem`| `400`     | Verdana       |
| Small/meta     | `0.75rem` | `400`     | Verdana       |
| Nav links      | `0.875rem`| `400`     | Verdana       |

### Text Rules

- Line height: `1.6` for body text, `1.3` for headings
- Max content width: `640px` — classic readable measure
- Paragraphs: margin-bottom of `1rem`, no first-line indent
- Links: **underlined by default**, no underline on hover (2000s convention)
- No uppercase transforms or letter-spacing tricks

## Layout

### Structure

- **Single-column layout** — content centered, max-width `640px`
- **Simple top navigation** — horizontal list of text links, no hamburger menu on mobile (stack vertically instead)
- **No sidebar, no footer widgets** — just a minimal footer with contact links
- Page padding: `1.5rem` horizontal, `2rem` vertical

### Navigation

- Flat horizontal list: `Home / Projects / Experience / About / Contact`
- Placed at the top of every page
- Current page indicated with **bold text** (not color, not underline)
- Separator between items: ` / ` (forward slash with spaces) — a 2000s classic
- On mobile: wraps naturally, no special mobile nav treatment

### Grid & Cards

When displaying projects or experience items:

- Use a **simple vertical list**, not a grid of cards
- Each item: title (linked), one-line description, tech tags as plain text
- Divider between items: a thin `1px` `var(--border)` line
- No box shadows, no rounded cards, no hover lifts

## Components

### Links

```
Default: underlined, same color as text
Hover: underline removed, color shifts to muted
Active/visited: no special treatment
```

### Buttons

Avoid buttons where possible. Use text links. If a button is absolutely needed:

```
Border: 1px solid var(--fg)
Background: transparent
Padding: 0.5rem 1rem
Font: inherit (Verdana)
Hover: background fills with var(--fg), text becomes var(--bg)
```

### Tags / Tech Stack Labels

For listing technologies on project cards:

```
Display: inline, comma-separated plain text
Font: small/meta size (0.75rem)
Color: var(--fg-muted)
No pills, no badges, no colored chips
```

Example: `TypeScript, Next.js, MCP, Claude API`

### Dividers

```
1px solid var(--border)
Full width of content area
Margin: 1.5rem 0
```

## Animation & Interactivity

### Motion

- **Minimal.** No scroll-triggered animations, no parallax, no typing effects.
- Page transitions: simple fade (`opacity 0 -> 1`, `150ms ease`)
- Link hover: `color` transition, `150ms ease`
- That's it. Nothing else moves.

### JavaScript

- Zero client-side JavaScript required for core content viewing
- No analytics scripts, no tracking pixels
- Next.js static export means pages work without JS enabled

## Content Tone

### Voice

- **First person, casual but competent.** Not corporate, not try-hard.
- Short paragraphs. Direct sentences.
- Show impact with numbers, not adjectives.
- It's okay to have personality — mention the movie role, the ticket scraper, the real stuff.

### Page Content Guidelines

| Page         | Content Approach                                                |
|-------------|----------------------------------------------------------------|
| **Home**     | Name, one-line title, then jump straight into project highlights. No long bio on the homepage. |
| **Projects** | 4-6 projects. Each: title, 2-3 sentence description, tech used, link if available. Lead with the most impressive AI work. |
| **Experience**| Reverse-chronological career timeline. Company, role, dates, 2-3 bullet points max per role. Metrics over descriptions. |
| **About**    | 2-3 paragraphs. Your story, what you care about, what you're looking for. Human, not a LinkedIn summary. |
| **Contact**  | Email, GitHub, LinkedIn. One line: "Want to build something? Reach out." |

## Anti-Patterns (Do NOT Do These)

- No hero images or banner photos
- No gradient backgrounds
- No colored accent buttons
- No card grids with shadows and rounded corners
- No hamburger menus
- No "above the fold" optimization tricks
- No testimonials or social proof sections
- No "services offered" or consulting pitches
- No stock icons (Heroicons, FontAwesome, etc.)
- No loading spinners or skeleton screens
- No cookie banners or popups
- No scroll-to-top buttons

## Technical Constraints

- **Framework:** Next.js with static export (`output: 'export'`)
- **Styling:** Tailwind CSS — use utility classes, avoid `@apply` except in `globals.css` for base styles
- **Deployment:** GitHub Pages (static files only, no server-side rendering, no API routes)
- **Performance target:** Perfect Lighthouse score. Zero external requests. No images unless absolutely necessary.
- **Accessibility:** Semantic HTML, proper heading hierarchy, sufficient contrast ratios, keyboard navigable

## Tailwind Configuration Notes

- Extend Tailwind theme with the CSS custom properties defined above
- Use `prose` class sparingly — only for long-form content blocks
- Prefer explicit utility classes over `@apply`
- Dark mode strategy: `media` (system preference based)

## File/Folder Conventions

- Pages live in `app/` using Next.js App Router
- Shared components in `components/` at root level
- All styles via Tailwind utilities + `globals.css` for CSS variables
- Content can be stored as markdown files in a `content/` directory or hardcoded — keep it simple
