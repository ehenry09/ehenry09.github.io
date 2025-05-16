import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elliot Henry - Data Science Professional',
  description: 'Personal website and blog of Elliot Henry, featuring data science projects, insights, and technical writing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.className} bg-cyber-black text-cyber-text-primary min-h-screen`}>
        <div className="min-h-screen flex flex-col relative bg-cyber-grid bg-[length:50px_50px]">
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-neon-pink/5 to-cyber-neon-blue/5 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
} 