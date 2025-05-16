import Link from 'next/link'
import { FaArrowRight, FaCode, FaDatabase, FaBrain } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl py-12 sm:py-16">
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-2 animate-glow">
              <span className="text-cyber-neon-pink">[</span>
              DATA SCIENCE
              <span className="text-cyber-neon-pink">]</span>
            </h1>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl animate-flicker">
              <span className="text-cyber-neon-blue">&lt;</span>
              PROFESSIONAL
              <span className="text-cyber-neon-blue">/&gt;</span>
            </h2>
          </div>
          
          <p className="mt-6 text-lg leading-8 text-cyber-text-secondary">
            <span className="text-cyber-neon-yellow">{'>'}</span> Hi, I'm Elliot Henry. I specialize in data science, machine learning, and analytics.
            With experience in operations, digital marketing, and retail, I transform complex data into actionable insights.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blog"
              className="rounded bg-cyber-neon-pink px-4 py-2.5 text-sm font-semibold text-cyber-black shadow-[0_0_20px_rgba(255,46,99,0.5)] hover:shadow-[0_0_25px_rgba(255,46,99,0.7)] transition-all duration-300"
            >
              Read My Blog
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-semibold leading-6 text-cyber-text-primary hover:text-cyber-neon-blue transition-colors duration-300 group"
            >
              Learn More <FaArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-cyber-neon-blue animate-pulse">FEATURED_WORK</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-cyber-text-primary sm:text-4xl">
            <span className="text-cyber-neon-pink">{'//'}</span> Recent Projects & Posts
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {/* Card 1 */}
            <div className="group relative backdrop-blur-sm bg-cyber-darker/50 p-6 rounded-lg border border-cyber-neon-pink/20 hover:border-cyber-neon-pink/50 transition-all duration-300">
              <dt className="text-base font-semibold leading-7 text-cyber-neon-blue">
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-dark">
                  <FaCode className="h-6 w-6 text-cyber-neon-pink" />
                </div>
                <div className="ml-16">Data Engineering</div>
              </dt>
              <dd className="mt-2 ml-16 text-base leading-7 text-cyber-text-secondary">
                Building scalable data pipelines and infrastructure for efficient data processing and analysis.
              </dd>
            </div>

            {/* Card 2 */}
            <div className="group relative backdrop-blur-sm bg-cyber-darker/50 p-6 rounded-lg border border-cyber-neon-blue/20 hover:border-cyber-neon-blue/50 transition-all duration-300">
              <dt className="text-base font-semibold leading-7 text-cyber-neon-pink">
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-dark">
                  <FaDatabase className="h-6 w-6 text-cyber-neon-blue" />
                </div>
                <div className="ml-16">Data Analysis</div>
              </dt>
              <dd className="mt-2 ml-16 text-base leading-7 text-cyber-text-secondary">
                Transforming raw data into meaningful insights through statistical analysis and visualization.
              </dd>
            </div>

            {/* Card 3 */}
            <div className="group relative backdrop-blur-sm bg-cyber-darker/50 p-6 rounded-lg border border-cyber-neon-yellow/20 hover:border-cyber-neon-yellow/50 transition-all duration-300">
              <dt className="text-base font-semibold leading-7 text-cyber-neon-yellow">
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-dark">
                  <FaBrain className="h-6 w-6 text-cyber-neon-yellow" />
                </div>
                <div className="ml-16">Machine Learning</div>
              </dt>
              <dd className="mt-2 ml-16 text-base leading-7 text-cyber-text-secondary">
                Developing and deploying machine learning models for predictive analytics and automation.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
} 