import { Link } from '@tanstack/react-router'
import { Zap, Twitter, Linkedin, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Nexus<span className="text-violet-400">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The AI toolkit that helps businesses create content 10x faster. Trusted by 50,000+ creators worldwide.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">AI Tools</h4>
            <ul className="space-y-3">
              {[
                { to: '/tools/blog-writer', label: 'Blog Writer' },
                { to: '/tools/social-media', label: 'Social Media' },
                { to: '/tools/email-writer', label: 'Email Writer' },
                { to: '/tools/ad-copy', label: 'Ad Copy' },
                { to: '/tools/seo-optimizer', label: 'SEO Optimizer' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to as any} className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us' },
                { label: 'Blog' },
                { label: 'Careers' },
                { label: 'Contact' },
                { label: 'Affiliates' },
              ].map(({ label }) => (
                <li key={label}>
                  <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Refund Policy'].map((label) => (
                <li key={label}>
                  <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2025 NexusAI. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Built with ❤️ for creators worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}
