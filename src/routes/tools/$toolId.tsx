import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useCallback } from 'react'
import { ArrowLeft, Copy, Check, Zap, RotateCcw, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { toolsById, tools } from '../../utils/tools'
import { genAITool } from '../../utils/ai'

function ToolPage() {
  const { toolId } = Route.useParams()
  const tool = toolsById[toolId]

  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [output, setOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState(0)

  const handleGenerate = useCallback(async () => {
    if (!tool) return
    const missingRequired = tool.inputs.filter((i) => i.required && !inputs[i.id]?.trim())
    if (missingRequired.length > 0) {
      setError(`Please fill in: ${missingRequired.map((i) => i.label).join(', ')}`)
      return
    }

    setIsGenerating(true)
    setOutput('')
    setWordCount(0)
    setError(null)

    try {
      const userPrompt = tool.buildPrompt(inputs)
      const response = await genAITool({
        data: { systemPrompt: tool.systemPrompt, userPrompt },
      })

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let fullText = ''
      let buffer = ''
      let done = false

      while (!done) {
        const { value, done: streamDone } = await reader.read()
        done = streamDone
        if (value) {
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            if (line.trim()) {
              try {
                const json = JSON.parse(line)
                if (json.type === 'content_block_delta' && json.delta?.text) {
                  fullText += json.delta.text
                  setOutput(fullText)
                  setWordCount(fullText.trim().split(/\s+/).filter(Boolean).length)
                }
              } catch (_) {}
            }
          }
        }
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError('Failed to generate content. Please check your API key is configured.')
    } finally {
      setIsGenerating(false)
    }
  }, [tool, inputs])

  const handleCopy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const handleReset = useCallback(() => {
    setOutput('')
    setInputs({})
    setError(null)
    setWordCount(0)
  }, [])

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-white mb-2">Tool not found</h1>
          <p className="text-gray-400 mb-6">The tool you're looking for doesn't exist.</p>
          <Link to="/tools" className="text-violet-400 hover:text-violet-300 transition-colors">
            ← Back to Tools
          </Link>
        </div>
      </div>
    )
  }

  const otherTools = tools.filter((t) => t.id !== toolId).slice(0, 4)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/tools" className="hover:text-gray-300 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              All Tools
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">{tool.name}</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
            {/* Left: Input Panel */}
            <div>
              {/* Tool Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                  {tool.iconEmoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/[0.06] text-gray-400">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-gray-400">{tool.longDescription}</p>
                </div>
              </div>

              {/* Input Form */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">
                <h2 className="text-white font-semibold text-lg">Configure your content</h2>

                {tool.inputs.map((input) => (
                  <div key={input.id}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {input.label}
                      {input.required && <span className="text-violet-400 ml-1">*</span>}
                    </label>

                    {input.type === 'select' ? (
                      <select
                        value={inputs[input.id] || ''}
                        onChange={(e) => setInputs((prev) => ({ ...prev, [input.id]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-800">Select an option...</option>
                        {input.options?.map((opt) => (
                          <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                        ))}
                      </select>
                    ) : input.type === 'textarea' ? (
                      <textarea
                        rows={input.rows || 3}
                        placeholder={input.placeholder}
                        value={inputs[input.id] || ''}
                        onChange={(e) => setInputs((prev) => ({ ...prev, [input.id]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        placeholder={input.placeholder}
                        value={inputs[input.id] || ''}
                        onChange={(e) => setInputs((prev) => ({ ...prev, [input.id]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.08] transition-all"
                      />
                    )}
                  </div>
                ))}

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-900/30"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Generate Content
                    </>
                  )}
                </button>
              </div>

              {/* Other tools */}
              <div className="mt-8">
                <h3 className="text-gray-400 text-sm font-medium mb-3">Try other tools</h3>
                <div className="grid grid-cols-2 gap-3">
                  {otherTools.map((t) => (
                    <Link
                      key={t.id}
                      to="/tools/$toolId"
                      params={{ toolId: t.id }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/15 hover:bg-white/[0.06] transition-all group"
                    >
                      <span className="text-xl">{t.iconEmoji}</span>
                      <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{t.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Output Panel */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                {/* Output header */}
                <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <h2 className="text-white font-semibold">Generated Content</h2>
                    {wordCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs">
                        {wordCount} words
                      </span>
                    )}
                    {isGenerating && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {output && !isGenerating && (
                      <button
                        onClick={handleReset}
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/[0.06] transition-all"
                        title="Reset"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={handleCopy}
                      disabled={!output}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-gray-300 text-sm hover:bg-white/[0.1] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Output content */}
                <div className="min-h-96 max-h-[700px] overflow-y-auto p-6">
                  {!output && !isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-80 text-center">
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-4xl mb-5 opacity-40`}>
                        {tool.iconEmoji}
                      </div>
                      <p className="text-gray-500 text-lg font-medium">Your content will appear here</p>
                      <p className="text-gray-600 text-sm mt-2">Fill in the form and click Generate</p>
                    </div>
                  ) : isGenerating && !output ? (
                    <div className="flex items-center justify-center h-80">
                      <div className="text-center">
                        <div className="w-12 h-12 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-gray-400">Generating your content...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none text-gray-300">
                      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                        {output}
                      </ReactMarkdown>
                      {isGenerating && (
                        <span className="inline-block w-2 h-5 bg-violet-400 ml-1 animate-pulse rounded-sm" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export const Route = createFileRoute('/tools/$toolId')({
  component: ToolPage,
})
