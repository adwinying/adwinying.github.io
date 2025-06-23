# Agent Development Guidelines

## Directory Structure
```
src/
├── assets/           # Static images and files
├── components/       # Reusable Astro components
│   └── icons/        # Icon components
├── content/          # Content collections (Markdown)
│   ├── posts/        # Blog posts
│   └── talks/        # Talk metadata (YAML)
├── features/         # Feature-specific components
│   ├── blog/         # Blog-related components
│   ├── landing/      # Landing page sections
│   └── talks/        # Talk-related components
├── layouts/          # Page layout templates
├── pages/            # Astro pages (file-based routing)
├── styles/           # Global CSS
└── utils/            # Utility functions
```

## Build/Lint/Test Commands
- `npm run build` - Build the Astro site
- `npm run dev` - Start development server
- `npm run lint` - Lint all JS/TS/Astro files with ESLint
- `npm run tsc` - Type check with Astro check and TypeScript
- `npm run preview` - Preview built site
- `npm run talks:sync` - Sync presentation files
- `npm run talks:build` - Build presentations
- `npm run build:all` - Complete build including talks

## Code Style Guidelines
- **Framework**: Astro with TypeScript (strict mode)
- **Imports**: Use `@/*` path mapping for src files, absolute imports preferred
- **Formatting**: Prettier with trailing commas, Tailwind CSS plugin. Always add an empty line at the end of a file.
- **Linting**: ESLint with Airbnb TypeScript config, Astro plugin
- **Types**: Strict TypeScript, use Zod schemas for content collections
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error Handling**: Use TypeScript strict mode, avoid `@ts-ignore` (use sparingly with comments)
- **CSS**: Tailwind CSS with `clsx`/`twMerge` utility (see `src/utils/css.ts`)
- **Comments**: Use ESLint disable comments when necessary with explanations
