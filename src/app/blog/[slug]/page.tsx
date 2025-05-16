import { getPost, getAllPosts } from '@/lib/posts'
import { FaCalendar, FaTag, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

// Add this function to tell Next.js what pages to generate during build
export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-cyber-neon-blue hover:text-cyber-neon-pink transition-colors duration-300 group"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="backdrop-blur-sm bg-cyber-darker/50 p-8 rounded-lg border border-cyber-neon-blue/20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-cyber-neon-blue">{'> '}</span>
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-cyber-text-secondary">
            <div className="flex items-center">
              <FaCalendar className="w-4 h-4 mr-2 text-cyber-neon-yellow" />
              {post.date}
            </div>
            <div className="flex items-center">
              <FaTag className="w-4 h-4 mr-2 text-cyber-neon-pink" />
              {post.tags.join(', ')}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose-custom">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4 text-cyber-neon-pink">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-3 text-cyber-neon-blue">
                  <span className="text-cyber-neon-pink">{'// '}</span>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mb-2 text-cyber-neon-yellow">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-cyber-text-secondary">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 text-cyber-text-secondary">
                  {children}
                </ul>
              ),
              li: ({ children }) => (
                <li className="mb-2">
                  <span className="text-cyber-neon-pink">→</span> {children}
                </li>
              ),
              code: ({ children }) => (
                <code className="bg-cyber-dark px-2 py-1 rounded text-cyber-neon-blue">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-cyber-dark p-4 rounded-lg overflow-x-auto mb-4 border border-cyber-neon-blue/20">
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
} 