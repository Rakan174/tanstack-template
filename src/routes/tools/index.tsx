import { createFileRoute, Link } from '@tanstack/react-router'
import { Search, ChevronRight, Zap } from 'lucide-react'
import { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { tools, categories } from '../../utils/tools'

function ToolsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered = tools.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            All AI Tools
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            8 Tools. Infinite Content.
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            Choose the right AI tool for your task. Each one is powered by Claude and optimized for maximum quality.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap justify-center">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/30'
                  : 'bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg">No tools found for "{search}"</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All') }}
                className="mt-4 text-violet-400 hover:text-violet-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((tool) => (
                <Link
                  key={tool.id}
                  to="/tools/$toolId"
                  params={{ toolId: tool.id }}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] transition-all hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5"
                >
                  {/* Category badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.06] text-gray-400">
                      {tool.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-5 group-hover:scale-105 transition-transform shadow-lg`}>
                    {tool.iconEmoji}
                  </div>

                  {/* Content */}
                  <h3 className="text-white font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">{tool.description}</p>

                  {/* CTA */}
                  <div className="flex items-center gap-1 text-violet-400 text-sm font-medium group-hover:gap-2 transition-all">
                    Use this tool
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 border-t border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Need a custom AI solution?
          </h2>
          <p className="text-gray-400 mb-6">
            Talk to our AI directly in chat mode for any task not covered by the tools above.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Open AI Chat
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export const Route = createFileRoute('/tools/')({
  component: ToolsPage,
})
