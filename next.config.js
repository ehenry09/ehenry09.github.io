/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Set basePath conditionally based on environment
  basePath: process.env.GITHUB_ACTIONS ? '/ehenry09.github.io' : '',
  // Disable server-side features since we're exporting static HTML
  trailingSlash: true,
}

module.exports = nextConfig