/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages - use your GitHub username/repository name
  basePath: '/ehenry09.github.io',
  // Disable server-side features since we're exporting static HTML
  trailingSlash: true,
}

module.exports = nextConfig