import { FaSearch, FaTimes } from 'react-icons/fa'

interface BlogFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  availableTags: string[]
}

export default function BlogFilters({
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  availableTags,
}: BlogFiltersProps) {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-cyber-darker/50 border border-cyber-neon-blue/20 rounded-lg px-4 py-2 pl-10
                   text-cyber-text-primary placeholder-cyber-text-secondary/50
                   focus:outline-none focus:border-cyber-neon-blue/50 focus:ring-1 focus:ring-cyber-neon-blue/50"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-text-secondary" />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
              selectedTags.includes(tag)
                ? 'bg-cyber-neon-blue text-cyber-darker'
                : 'bg-cyber-darker/50 text-cyber-text-secondary border border-cyber-neon-blue/20 hover:border-cyber-neon-blue/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Clear Filters */}
      {(searchQuery || selectedTags.length > 0) && (
        <button
          onClick={clearFilters}
          className="flex items-center text-cyber-neon-pink hover:text-cyber-neon-blue transition-colors duration-300"
        >
          <FaTimes className="mr-2" />
          Clear filters
        </button>
      )}
    </div>
  )
} 