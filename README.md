# Personal Website - Elliot Henry

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design with dark mode support
- ⚡ Built with Next.js 14 for optimal performance
- 🎯 TypeScript for type safety
- 💅 Tailwind CSS for styling
- 📱 Mobile-first approach
- 📝 Blog support with MDX
- 🔍 SEO optimized

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/ehenry09/ehenry09.github.io.git
   cd ehenry09.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

### Testing Production Build Locally

```bash
npm run build && npm run start
```

## Deployment

This site is configured for deployment to GitHub Pages. The deployment is automated through GitHub Actions.

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy the site
3. Your site will be available at https://ehenry09.github.io

## Blog System

The blog supports:
- Full-text search
- Tag filtering
- Markdown content with code highlighting
- Responsive design for all devices

To add a new blog post, update the `src/lib/posts.ts` file with your new post data.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
