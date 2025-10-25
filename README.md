# Personal Website

A Next.js personal website deployed to GitHub Pages.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

Build the static site:

```bash
npm run build
```

This will generate static files in the `out` directory.

## Deployment

This site is automatically deployed to GitHub Pages when you push to the `main` branch.

### Deployment Process

1. Push changes to the `main` branch
2. GitHub Actions workflow (`.github/workflows/nextjs.yml`) automatically:
   - Detects your package manager
   - Installs dependencies
   - Builds the Next.js site with static export
   - Deploys to GitHub Pages

### Manual Deployment

You can also trigger a deployment manually:

1. Go to the "Actions" tab in your GitHub repository
2. Select "Deploy Next.js site to Pages"
3. Click "Run workflow"

## Configuration

### GitHub Pages Setup

1. Go to your repository Settings
2. Navigate to "Pages" section
3. Under "Build and deployment":
   - Source: GitHub Actions

### Next.js Configuration

The site uses static export (`next.config.js`):
- `output: 'export'` - Generates static HTML files
- `images.unoptimized: true` - Required for static export

## Project Structure

```
personal-website/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── .github/
│   └── workflows/
│       └── nextjs.yml  # Deployment workflow
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies
└── README.md
```

## Technologies

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [GitHub Pages](https://pages.github.com/) - Static hosting
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## License

This project is open source and available under the MIT License.
