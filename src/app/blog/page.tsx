'use client'

import Link from 'next/link'
import { FaCalendar, FaTag } from 'react-icons/fa'
import { useState, useMemo } from 'react'
import BlogFilters from '@/components/BlogFilters'
import { getAllPosts } from '@/lib/posts'

// Helper function to extract preview from content
function getContentPreview(content: string, maxLength: number = 150): string {
  // Strip markdown and extra whitespace
  const cleanContent = content
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/#{1,6}\s?/g, '')
    .replace(/\[|\]|\(|\)/g, '')
    .replace(/\`\`\`[\s\S]*?\`\`\`/g, '')
    .trim()
  
  return cleanContent.length > maxLength
    ? cleanContent.substring(0, maxLength) + '...'
    : cleanContent
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const posts = getAllPosts()
  
  // Get unique tags from all posts
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [posts])

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by selected tags
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => post.tags.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [posts, searchQuery, selectedTags])

  // Sort posts by date in descending order
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [filteredPosts])

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-cyber-neon-pink">[</span>
          <span className="text-cyber-text-primary">BLOG</span>
          <span className="text-cyber-neon-pink">]</span>
        </h1>
        <p className="text-cyber-text-secondary">
          <span className="text-cyber-neon-blue">{'>'}</span> Thoughts on data science, machine learning, and technology
        </p>
        <div className="h-1 w-24 bg-cyber-neon-blue mx-auto mt-6 rounded animate-pulse"></div>
      </div>

      {/* Filters */}
      <BlogFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        availableTags={availableTags}
      />

      {/* Blog Posts */}
      <div className="space-y-8">
        {sortedPosts.length === 0 ? (
          <div className="text-center text-cyber-text-secondary py-8">
            <p className="text-xl mb-2">No posts found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          sortedPosts.map((post) => (
            <article 
              key={post.slug}
              className="backdrop-blur-sm bg-cyber-darker/50 p-6 rounded-lg border border-cyber-neon-blue/20 
                       hover:border-cyber-neon-blue/50 transition-all duration-300 group"
            >
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-cyber-neon-pink transition-colors duration-300">
                  <span className="text-cyber-neon-blue">{'> '}</span>
                  {post.title}
                </h2>
              </Link>
              
              <div className="flex items-center space-x-4 mb-4 text-sm text-cyber-text-secondary">
                <div className="flex items-center">
                  <FaCalendar className="w-4 h-4 mr-2 text-cyber-neon-yellow" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <FaTag className="w-4 h-4 mr-2 text-cyber-neon-pink" />
                  {post.tags.join(', ')}
                </div>
              </div>
              
              <p className="text-cyber-text-secondary">
                {getContentPreview(post.content)}
              </p>
              
              <div className="mt-4">
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-cyber-neon-blue hover:text-cyber-neon-pink transition-colors duration-300"
                >
                  Read More 
                  <span className="ml-1 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
} 