import { createFileRoute, Link } from '@tanstack/react-router'
import { Zap, ArrowRight, Check, Star, TrendingUp, Clock, Users, ChevronRight } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { tools } from '../utils/tools'

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute top-60 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
                <Zap className="w-3.5 h-3.5" />
                8 Powerful AI Tools in One Platform
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                <span className="text-white">10x Your</span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Content Output
                </span>
                <br />
                <span className="text-white">with AI</span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-xl">
                Stop spending hours writing. NexusAI generates professional blogs, ads, emails,
                social posts, and more in seconds — ready to publish.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/tools"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 hover:scale-[1.02]"
                >
                  Start Creating Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/[0.06] border border-white/10 text-white font-semibold text-lg hover:bg-white/[0.1] transition-all"
                >
                  View Pricing
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['bg-violet-500', 'bg-pink-500', 'bg-indigo-500', 'bg-amber-500', 'bg-emerald-500'].map((color, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-slate-950 flex items-center justify-center text-xs font-bold text-white`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-white font-semibold text-sm ml-1">4.9/5</span>
                  </div>
                  <p className="text-gray-500 text-sm">Loved by 50,000+ creators</p>
                </div>
              </div>
            </div>

            {/* Right: Live demo card */}
            <div className="relative hidden lg:block">
              <div className="relative bg-slate-900/80 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-lg">
                    ✍️
                  </div>
                  <div>
                    <div className="text-white font-semibold">Blog Writer</div>
                    <div className="text-gray-500 text-sm">AI-powered content</div>
                  </div>
                  <div className="ml-auto px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    Live
                  </div>
                </div>

                {/* Output preview */}
                <div className="space-y-3">
                  <div className="h-3 bg-gradient-to-r from-violet-500/30 to-indigo-500/30 rounded-full w-4/5 animate-pulse" />
                  <div className="space-y-2">
                    {[1, 0.9, 0.7, 0.95, 0.6].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 bg-white/[0.06] rounded-full"
                        style={{ width: `${w * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="pt-2 space-y-2">
                    <div className="h-2 bg-violet-500/20 rounded-full w-2/3" />
                    {[0.85, 0.75, 0.9].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 bg-white/[0.06] rounded-full"
                        style={{ width: `${w * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-4">
                  {[
                    { label: 'Words', value: '1,247' },
                    { label: 'Generated', value: '4.2s' },
                    { label: 'SEO Score', value: '98/100' },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <div className="text-white font-bold text-lg">{value}</div>
                      <div className="text-gray-500 text-xs">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                ✓ Published
              </div>
              <div className="absolute -bottom-4 -left-4 bg-violet-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Generated in 4s
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-10 border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '50,000+', label: 'Active Users' },
              { icon: TrendingUp, value: '10M+', label: 'Pieces Generated' },
              { icon: Clock, value: '2M+', label: 'Hours Saved' },
              { icon: Star, value: '4.9 / 5', label: 'Average Rating' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-violet-400" />
                  <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
                </div>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
              Why NexusAI
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything you need to create
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                content that converts
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built for marketers, founders, and creators who need professional content without the agency price tag.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: '⚡',
                title: 'Lightning Fast',
                description: 'Generate 2000-word blog posts in under 10 seconds. Stop waiting, start publishing.',
                gradient: 'from-amber-500/10 to-orange-500/10',
                border: 'border-amber-500/20',
              },
              {
                emoji: '🎯',
                title: '8 Specialized Tools',
                description: 'Every content type covered — blogs, ads, emails, social posts, scripts, and more.',
                gradient: 'from-violet-500/10 to-purple-500/10',
                border: 'border-violet-500/20',
              },
              {
                emoji: '🔍',
                title: 'SEO Built-in',
                description: 'Every piece of content is optimized for search engines by default. Rank faster.',
                gradient: 'from-emerald-500/10 to-teal-500/10',
                border: 'border-emerald-500/20',
              },
              {
                emoji: '🎭',
                title: 'Your Brand Voice',
                description: 'Choose from 10+ tones and styles. Content that sounds like you, not a robot.',
                gradient: 'from-pink-500/10 to-rose-500/10',
                border: 'border-pink-500/20',
              },
              {
                emoji: '📊',
                title: 'Track Performance',
                description: 'See how your AI-generated content performs. Optimize what works, cut what doesn\'t.',
                gradient: 'from-blue-500/10 to-cyan-500/10',
                border: 'border-blue-500/20',
              },
              {
                emoji: '🔒',
                title: 'Your Content, Yours',
                description: 'Full ownership of everything you create. GDPR compliant. No training on your data.',
                gradient: 'from-slate-500/10 to-gray-500/10',
                border: 'border-slate-500/20',
              },
            ].map(({ emoji, title, description, gradient, border }) => (
              <div
                key={title}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${gradient} border ${border} hover:scale-[1.02] transition-transform`}
              >
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section className="py-24 px-4 bg-white/[0.01] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              8 AI Tools, Infinite Possibilities
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Pick the right tool for the job. Each one is trained on millions of high-performing examples.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                to="/tools/$toolId"
                params={{ toolId: tool.id }}
                className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.06] transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {tool.iconEmoji}
                </div>
                <h3 className="text-white font-semibold mb-1">{tool.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{tool.description}</p>
                <div className="flex items-center gap-1 text-violet-400 text-sm font-medium">
                  Try it free
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              From idea to published in 3 steps
            </h2>
            <p className="text-gray-400 text-lg">No learning curve. No complexity. Just results.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-violet-500/50 to-indigo-500/50" />

            {[
              {
                step: '01',
                title: 'Choose Your Tool',
                description: 'Pick from 8 specialized AI tools. Blog writer, social media, email, ads — whatever you need.',
                emoji: '🎯',
              },
              {
                step: '02',
                title: 'Enter Your Details',
                description: 'Fill in a simple form with your topic, tone, and requirements. Takes 30 seconds.',
                emoji: '✏️',
              },
              {
                step: '03',
                title: 'Generate & Publish',
                description: 'Get professional, ready-to-use content in seconds. Copy, edit, and publish instantly.',
                emoji: '🚀',
              },
            ].map(({ step, title, description, emoji }) => (
              <div key={step} className="relative text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center text-4xl relative">
                  {emoji}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                    {step}
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white/[0.01] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Creators love NexusAI
            </h2>
            <p className="text-gray-400 text-lg">Real results from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Marketing Director, TechFlow',
                avatar: 'SM',
                color: 'bg-violet-600',
                quote: 'NexusAI cut our content production time by 80%. We went from publishing 2 blogs per week to 10. Our organic traffic tripled in 3 months.',
                rating: 5,
              },
              {
                name: 'James Rodriguez',
                role: 'E-commerce Founder',
                avatar: 'JR',
                color: 'bg-indigo-600',
                quote: 'The product descriptions alone paid for the subscription in week one. My conversion rate went up 34% after switching to NexusAI copy.',
                rating: 5,
              },
              {
                name: 'Priya Sharma',
                role: 'Content Creator, 500K Followers',
                avatar: 'PS',
                color: 'bg-pink-600',
                quote: 'I used to spend 3 hours on Instagram captions. Now it takes 5 minutes. The engagement on my AI-assisted posts is actually higher than my old ones.',
                rating: 5,
              },
            ].map(({ name, role, avatar, color, quote, rating }) => (
              <div key={name} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-sm font-bold text-white`}>
                    {avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{name}</div>
                    <div className="text-gray-500 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-400 text-lg">Start free. Upgrade when you need more.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Free',
                price: '£0',
                period: 'forever',
                description: 'Perfect for trying out NexusAI',
                features: ['10 generations per day', '3 AI Tools', 'Standard quality', 'Community support'],
                cta: 'Start Free',
                highlighted: false,
              },
              {
                name: 'Pro',
                price: '£29',
                period: '/month',
                description: 'For creators and small businesses',
                features: ['Unlimited generations', 'All 8 AI Tools', 'Priority generation', 'Email support', 'Export to all formats', 'Custom tones'],
                cta: 'Start Pro Trial',
                highlighted: true,
              },
              {
                name: 'Business',
                price: '£79',
                period: '/month',
                description: 'For teams and agencies',
                features: ['Everything in Pro', 'Team workspace', 'Brand voice profiles', 'API access', 'Priority support', 'Custom integrations'],
                cta: 'Start Business',
                highlighted: false,
              },
            ].map(({ name, price, period, description, features, cta, highlighted }) => (
              <div
                key={name}
                className={`relative p-6 rounded-2xl border transition-all ${
                  highlighted
                    ? 'bg-gradient-to-b from-violet-600/20 to-indigo-600/10 border-violet-500/50 shadow-lg shadow-violet-900/30'
                    : 'bg-white/[0.03] border-white/[0.06]'
                }`}
              >
                {highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-white font-bold text-xl mb-1">{name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{description}</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-white">{price}</span>
                    <span className="text-gray-400 mb-1">{period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${highlighted ? 'text-violet-400' : 'text-emerald-400'}`} />
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/pricing"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    highlighted
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-violet-900/30'
                      : 'bg-white/[0.06] border border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border border-violet-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Ready to make history?
              </h2>
              <p className="text-gray-400 text-xl mb-10">
                Join 50,000+ creators who are already using AI to produce better content faster.
                <br />
                <span className="text-violet-400 font-medium">No credit card required. Free forever plan available.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/tools"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-violet-900/40"
                >
                  Start Creating Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/chat"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/[0.06] border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-all"
                >
                  Try AI Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: LandingPage,
})
