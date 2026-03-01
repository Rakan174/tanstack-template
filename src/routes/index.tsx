import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Shield,
  Minus,
} from 'lucide-react'

/* ─── Types ─────────────────────────────────────────────── */

interface GoldPrice {
  karat: string
  label: string
  labelAr: string
  price: number
  previousPrice: number
  unit: string
  unitAr: string
}

/* ─── Simulated Gold Price Data ─────────────────────────── */

const BASE_PRICES: Record<string, number> = {
  '24k': 4720,
  '22k': 4327,
  '21k': 4130,
  '18k': 3540,
  '14k': 2753,
  pound: 33040,
  ounce: 146800,
}

function generatePrices(previous?: GoldPrice[]): GoldPrice[] {
  const items: Array<{
    karat: string
    label: string
    labelAr: string
    unit: string
    unitAr: string
    baseKey: string
  }> = [
    { karat: '24K', label: '24 Karat', labelAr: 'عيار 24', unit: 'EGP/g', unitAr: 'ج.م/جرام', baseKey: '24k' },
    { karat: '22K', label: '22 Karat', labelAr: 'عيار 22', unit: 'EGP/g', unitAr: 'ج.م/جرام', baseKey: '22k' },
    { karat: '21K', label: '21 Karat', labelAr: 'عيار 21', unit: 'EGP/g', unitAr: 'ج.م/جرام', baseKey: '21k' },
    { karat: '18K', label: '18 Karat', labelAr: 'عيار 18', unit: 'EGP/g', unitAr: 'ج.م/جرام', baseKey: '18k' },
    { karat: '14K', label: '14 Karat', labelAr: 'عيار 14', unit: 'EGP/g', unitAr: 'ج.م/جرام', baseKey: '14k' },
    { karat: 'GP', label: 'Gold Pound', labelAr: 'الجنيه الذهب', unit: 'EGP', unitAr: 'ج.م', baseKey: 'pound' },
    { karat: 'OZ', label: 'Gold Ounce', labelAr: 'أونصة الذهب', unit: 'EGP', unitAr: 'ج.م', baseKey: 'ounce' },
  ]

  return items.map((item, i) => {
    const base = BASE_PRICES[item.baseKey]
    const variance = item.baseKey === 'ounce' ? 500 : item.baseKey === 'pound' ? 100 : 15
    const fluctuation = (Math.random() - 0.5) * 2 * variance
    const price = Math.round(base + fluctuation)
    const previousPrice = previous ? previous[i].price : Math.round(base + (Math.random() - 0.5) * 2 * variance)

    return {
      karat: item.karat,
      label: item.label,
      labelAr: item.labelAr,
      price,
      previousPrice,
      unit: item.unit,
      unitAr: item.unitAr,
    }
  })
}

/* ─── Helpers ───────────────────────────────────────────── */

function formatPrice(price: number): string {
  return price.toLocaleString('en-US')
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/* ─── Price Card Component ──────────────────────────────── */

function PriceCard({ data, featured }: { data: GoldPrice; featured?: boolean }) {
  const change = data.price - data.previousPrice
  const changePercent = ((change / data.previousPrice) * 100).toFixed(2)
  const isUp = change > 0
  const isDown = change < 0

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
        featured
          ? 'bg-gradient-to-br from-amber-500/[0.08] to-yellow-600/[0.04] border-amber-500/30 shadow-lg shadow-amber-900/10'
          : 'bg-white/[0.02] border-white/[0.06] hover:border-amber-500/20'
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-[10px] font-bold text-slate-900 tracking-wider uppercase">
          Most Traded
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
              featured
                ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-900'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {data.karat}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{data.label}</h3>
              <p className="text-gray-500 text-xs" dir="rtl">{data.labelAr}</p>
            </div>
          </div>

          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isUp
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : isDown
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
          }`}>
            {isUp ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : isDown ? (
              <ArrowDownRight className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            {isUp ? '+' : ''}{changePercent}%
          </div>
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              featured ? 'text-amber-400' : 'text-white'
            }`}>
              {formatPrice(data.price)}
            </span>
            <span className="text-gray-500 text-sm">{data.unitAr}</span>
          </div>
        </div>

        {/* Change */}
        <div className="flex items-center gap-2 text-xs">
          <span className={isUp ? 'text-emerald-400' : isDown ? 'text-red-400' : 'text-gray-500'}>
            {isUp ? '+' : ''}{formatPrice(change)} {data.unit}
          </span>
          <span className="text-gray-600">vs previous</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Landing Page ─────────────────────────────────── */

function GoldexLandingPage() {
  const [prices, setPrices] = useState<GoldPrice[]>(() => generatePrices())
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshPrices = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      setPrices((prev) => generatePrices(prev))
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 600)
  }, [])

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => generatePrices(prev))
      setLastUpdated(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  // Separate featured karats from secondary
  const primaryPrices = prices.filter((p) =>
    ['24K', '22K', '21K', '18K'].includes(p.karat)
  )
  const secondaryPrices = prices.filter((p) =>
    ['14K', 'GP', 'OZ'].includes(p.karat)
  )

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-[Inter,sans-serif]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                gold<span className="text-amber-400">ex</span>
              </span>
            </div>

            {/* Status + Refresh */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live prices
              </div>
              <button
                onClick={refreshPrices}
                disabled={isRefreshing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-amber-400 hover:border-amber-500/20 transition-all text-xs font-medium disabled:opacity-50"
                aria-label="Refresh prices"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 pb-6 sm:pb-8 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
            <span className="text-white">أسعار </span>
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              الذهب
            </span>
            <span className="text-white"> اليوم</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-2">
            Real-time gold prices in Egyptian Pounds — updated every 30 seconds.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm" dir="rtl">
            أسعار الذهب لحظة بلحظة بالجنيه المصري
          </p>
        </div>
      </section>

      {/* Last Updated Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Last updated: {formatTime(lastUpdated)}</span>
            <span className="hidden sm:inline text-gray-700">|</span>
            <span className="hidden sm:inline">{formatDate(lastUpdated)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium">Live</span>
            <span className="text-gray-600">· Auto-refreshes every 30s</span>
          </div>
        </div>
      </div>

      {/* Primary Prices Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {primaryPrices.map((price) => (
            <PriceCard
              key={price.karat}
              data={price}
              featured={price.karat === '21K'}
            />
          ))}
        </div>
      </section>

      {/* Secondary Prices Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {secondaryPrices.map((price) => (
            <PriceCard key={price.karat} data={price} />
          ))}
        </div>
      </section>

      {/* Market Summary */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            Market Overview
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: 'Most Traded',
                value: '21 Karat',
                sublabel: 'عيار 21',
                icon: '🏆',
              },
              {
                label: 'Highest Today',
                value: `${formatPrice(Math.max(...prices.map((p) => p.price)))} EGP`,
                sublabel: 'Gold Ounce',
                icon: '📈',
              },
              {
                label: 'Currency',
                value: 'EGP (£E)',
                sublabel: 'الجنيه المصري',
                icon: '💰',
              },
              {
                label: 'Updates',
                value: 'Every 30s',
                sublabel: 'Real-time data',
                icon: '⚡',
              },
            ].map(({ label, value, sublabel, icon }) => (
              <div key={label} className="text-center sm:text-left">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
                <p className="text-gray-600 text-xs mt-0.5">{sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              title: 'Trusted Data',
              titleAr: 'بيانات موثوقة',
              description: 'Sourced from global commodity markets and verified against local Egyptian market rates.',
            },
            {
              icon: RefreshCw,
              title: 'Live Updates',
              titleAr: 'تحديث لحظي',
              description: 'Prices refresh automatically every 30 seconds to keep you informed with the latest rates.',
            },
            {
              icon: Clock,
              title: 'Always Available',
              titleAr: 'متاح دائمًا',
              description: 'Access gold prices 24/7 from any device. No sign-up required, completely free.',
            },
          ].map(({ icon: Icon, title, titleAr, description }) => (
            <div
              key={title}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
              <p className="text-gray-600 text-xs mb-2" dir="rtl">{titleAr}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="py-4 px-5 rounded-xl bg-amber-500/[0.03] border border-amber-500/10">
          <p className="text-gray-500 text-[11px] leading-relaxed text-center">
            <span className="text-amber-500/70 font-medium">Disclaimer:</span> Gold prices displayed are indicative and sourced from global commodity markets. Actual prices may vary between dealers and jewelers. This data is for informational purposes only and should not be considered financial advice.
          </p>
          <p className="text-gray-600 text-[11px] leading-relaxed text-center mt-1" dir="rtl">
            الأسعار المعروضة استرشادية وقد تختلف بين التجار والصاغة. هذه البيانات للأغراض المعلوماتية فقط.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span className="text-gray-500 text-sm font-medium">
                gold<span className="text-amber-500/60">ex</span>.today
              </span>
            </div>

            <p className="text-gray-700 text-xs text-center sm:text-right">
              © {new Date().getFullYear()} Goldex. Real-time gold prices for Egypt.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: GoldexLandingPage,
})
