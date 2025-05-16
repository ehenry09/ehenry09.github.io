'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-cyber-darker/80 backdrop-blur-sm border-b border-cyber-neon-pink/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link 
                href="/" 
                className="text-xl font-bold text-cyber-text-primary hover:text-cyber-neon-pink transition-colors duration-300 animate-glow"
              >
                ELLIOT.HENRY
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-all duration-300 ${
                    pathname === item.href
                      ? 'border-cyber-neon-blue text-cyber-neon-blue animate-flicker'
                      : 'border-transparent text-cyber-text-secondary hover:text-cyber-neon-pink hover:border-cyber-neon-pink/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-cyber-text-secondary hover:bg-cyber-dark hover:text-cyber-neon-pink transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block border-l-4 py-2 pl-3 pr-4 text-base font-medium transition-all duration-300 ${
                pathname === item.href
                  ? 'bg-cyber-dark border-cyber-neon-blue text-cyber-neon-blue'
                  : 'border-transparent text-cyber-text-secondary hover:bg-cyber-dark hover:border-cyber-neon-pink hover:text-cyber-neon-pink'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 