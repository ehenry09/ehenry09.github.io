import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-cyber-darker/80 backdrop-blur-sm border-t border-cyber-neon-pink/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-cyber-text-secondary">
            <span className="text-cyber-neon-blue">{'>'}</span> © {new Date().getFullYear()} <span className="text-cyber-neon-pink">ELLIOT.HENRY</span>
          </p>
          <div className="flex space-x-6">
            <a
              href="https://github.com/ehenry09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-text-secondary hover:text-cyber-neon-blue transition-colors duration-300"
            >
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/elliothenry"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-text-secondary hover:text-cyber-neon-pink transition-colors duration-300"
            >
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:elliot.s.henry@gmail.com"
              className="text-cyber-text-secondary hover:text-cyber-neon-yellow transition-colors duration-300"
            >
              <span className="sr-only">Email</span>
              <FaEnvelope className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 