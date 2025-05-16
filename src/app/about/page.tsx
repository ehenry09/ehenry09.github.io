import { FaCode, FaChartBar, FaGamepad } from 'react-icons/fa'

export default function About() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-cyber-neon-blue">{'<'}</span>
          <span className="text-cyber-text-primary">ABOUT</span>
          <span className="text-cyber-neon-blue">{'/>'}</span>
        </h1>
        <div className="h-1 w-24 bg-cyber-neon-pink mx-auto rounded animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Bio Section */}
        <section className="backdrop-blur-sm bg-cyber-darker/50 p-8 rounded-lg border border-cyber-neon-blue/20">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-cyber-neon-pink">{'// '}</span>
            <span className="text-cyber-neon-blue">BIO.init()</span>
          </h2>
          <p className="text-cyber-text-secondary leading-relaxed mb-6">
            I am a data science professional with experience in operations, digital marketing, and retail. 
            My educational background and work experience have allowed me to develop a diverse range of data 
            analysis, machine learning, and data visualization skills.
          </p>
          <p className="text-cyber-text-secondary leading-relaxed">
            I tend to use R and Python in my projects, but am always looking to expand my toolkit. 
            When I'm not diving into data, you can find me snowboarding, playing overly complicated 
            board games, or exploring new technologies.
          </p>
        </section>

        {/* Skills Section */}
        <section className="backdrop-blur-sm bg-cyber-darker/50 p-8 rounded-lg border border-cyber-neon-pink/20">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-cyber-neon-pink">{'// '}</span>
            <span className="text-cyber-neon-blue">SKILLS.map()</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-cyber-neon-yellow font-semibold">Programming</h3>
              <ul className="space-y-2 text-cyber-text-secondary">
                <li className="flex items-center">
                  <span className="text-cyber-neon-pink mr-2">→</span> Python
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-neon-pink mr-2">→</span> R
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-neon-pink mr-2">→</span> SQL
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-cyber-neon-yellow font-semibold">Data Science</h3>
              <ul className="space-y-2 text-cyber-text-secondary">
                <li className="flex items-center">
                  <span className="text-cyber-neon-pink mr-2">→</span> Machine Learning
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-neon-pink mr-2">→</span> Data Visualization
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-neon-pink mr-2">→</span> Statistical Analysis
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section className="backdrop-blur-sm bg-cyber-darker/50 p-8 rounded-lg border border-cyber-neon-yellow/20">
          <h2 className="text-2xl font-bold mb-6">
            <span className="text-cyber-neon-pink">{'// '}</span>
            <span className="text-cyber-neon-blue">INTERESTS.forEach()</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <FaCode className="w-8 h-8 text-cyber-neon-pink mx-auto mb-4" />
              <h3 className="text-cyber-neon-blue font-semibold mb-2">Coding</h3>
              <p className="text-cyber-text-secondary text-sm">Always learning new technologies and frameworks</p>
            </div>
            <div className="text-center">
              <FaChartBar className="w-8 h-8 text-cyber-neon-yellow mx-auto mb-4" />
              <h3 className="text-cyber-neon-blue font-semibold mb-2">Data Analysis</h3>
              <p className="text-cyber-text-secondary text-sm">Finding patterns in complex datasets</p>
            </div>
            <div className="text-center">
              <FaGamepad className="w-8 h-8 text-cyber-neon-blue mx-auto mb-4" />
              <h3 className="text-cyber-neon-blue font-semibold mb-2">Gaming</h3>
              <p className="text-cyber-text-secondary text-sm">Strategy and board games enthusiast</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 