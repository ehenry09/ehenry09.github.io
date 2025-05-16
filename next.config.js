/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Custom domain (blog.elliothenry.com) means we don't need a basePath
  basePath: '',
  // Disable server-side features since we're exporting static HTML
  trailingSlash: true,
}

module.exports = nextConfig