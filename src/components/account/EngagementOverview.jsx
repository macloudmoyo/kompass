import { useState, useMemo } from 'react'
import { Globe, Mail } from 'lucide-react'

function LinkedinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GoogleIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

const CHANNEL_FILTERS = ['All', 'LinkedIn', 'Google', 'Email', 'Website']

const ROLE_COLORS = {
  champion: 'bg-kompass-green',
  'budget-holder': 'bg-kompass-amber',
  blocker: 'bg-kompass-red',
  technical: 'bg-kompass-blue',
  unknown: 'bg-kompass-text-muted',
}

const ROLE_LABELS = {
  champion: 'Champion',
  'budget-holder': 'Budget Holder',
  blocker: 'Blocker',
  technical: 'Technical',
  unknown: 'Unknown',
}

function getChannelIcon(channel) {
  switch (channel) {
    case 'linkedin': return <LinkedinIcon size={12} />
    case 'google': return <GoogleIcon size={12} />
    case 'email': return <Mail size={12} className="text-kompass-amber" />
    case 'website': return <Globe size={12} className="text-kompass-green" />
    default: return <Globe size={12} className="text-kompass-text-muted" />
  }
}

function EngagementOverview({ account }) {
  const [channelFilter, setChannelFilter] = useState('All')
  const [hoveredSignal, setHoveredSignal] = useState(null)

  const signals = useMemo(() => {
    let list = [...account.signals]
    if (channelFilter !== 'All') {
      list = list.filter((s) => s.channel.toLowerCase() === channelFilter.toLowerCase())
    }
    return list
  }, [account.signals, channelFilter])

  const channelCounts = useMemo(() => {
    const counts = { linkedin: 0, google: 0, email: 0, website: 0 }
    for (const s of account.signals) {
      if (counts[s.channel] !== undefined) counts[s.channel]++
    }
    return counts
  }, [account.signals])

  const now = new Date()
  const ninetyDaysAgo = new Date(now)
  ninetyDaysAgo.setDate(now.getDate() - 90)
  const timeRange = now - ninetyDaysAgo

  const months = useMemo(() => {
    const labels = []
    const d = new Date(ninetyDaysAgo)
    while (d <= now) {
      labels.push({ label: d.toLocaleString('default', { month: 'short' }), position: ((d - ninetyDaysAgo) / timeRange) * 100 })
      d.setMonth(d.getMonth() + 1)
      d.setDate(1)
    }
    return labels
  }, [])

  return (
    <div className="mt-8">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">Account Engagement</h3>
          <p className="text-sm text-kompass-text-muted">All signals across channels at this account</p>
        </div>
        <div className="flex items-center gap-2">
          {CHANNEL_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setChannelFilter(f)}
              className={`rounded-full px-3 py-1 text-sm transition-all duration-150 ${
                channelFilter === f
                  ? 'bg-kompass-blue text-white'
                  : 'border border-kompass-border bg-kompass-surface text-kompass-text-secondary hover:border-kompass-blue'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-4 rounded-xl border border-kompass-border bg-kompass-surface p-4">
        {/* Timeline line */}
        <div className="relative h-20">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-kompass-border" />

          {/* Month labels */}
          {months.map((m, i) => (
            <div
              key={i}
              className="absolute bottom-0 text-xs text-kompass-text-muted"
              style={{ left: `${m.position}%` }}
            >
              {m.label}
            </div>
          ))}

          {/* Signal dots */}
          {signals.map((signal) => {
            const signalDate = new Date(signal.date)
            const position = Math.max(0, Math.min(100, ((signalDate - ninetyDaysAgo) / timeRange) * 100))
            const roleColor = ROLE_COLORS[signal.role] || ROLE_COLORS.unknown
            const isHovered = hoveredSignal === signal.id

            return (
              <div
                key={signal.id}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${position}%` }}
                onMouseEnter={() => setHoveredSignal(signal.id)}
                onMouseLeave={() => setHoveredSignal(null)}
              >
                <div className={`h-2.5 w-2.5 cursor-pointer rounded-full ${roleColor} transition-transform ${isHovered ? 'scale-150' : ''}`} />

                {isHovered && (
                  <div className="absolute bottom-6 left-1/2 z-50 w-56 -translate-x-1/2 rounded-lg border border-kompass-border bg-kompass-surface p-3 shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-block h-2 w-2 rounded-full ${roleColor}`} />
                      <span className="text-xs font-medium text-white">
                        {ROLE_LABELS[signal.role] || 'Unknown'}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-kompass-text-secondary">
                      {signal.personName}
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      {getChannelIcon(signal.channel)}
                      <span className="text-xs text-kompass-text-muted">{signal.action}</span>
                    </div>
                    <p className="mt-1 text-xs text-kompass-text-muted">{signal.date}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Channel summary pills */}
      <div className="mt-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-kompass-text-muted">
          <LinkedinIcon size={14} />
          LinkedIn · {channelCounts.linkedin} signals
        </div>
        <div className="flex items-center gap-1.5 text-sm text-kompass-text-muted">
          <GoogleIcon size={14} />
          Google · {channelCounts.google} signals
        </div>
        <div className="flex items-center gap-1.5 text-sm text-kompass-text-muted">
          <Mail size={14} className="text-kompass-amber" />
          Email · {channelCounts.email} signals
        </div>
        <div className="flex items-center gap-1.5 text-sm text-kompass-text-muted">
          <Globe size={14} className="text-kompass-green" />
          Website · {channelCounts.website} signals
        </div>
      </div>
    </div>
  )
}

export default EngagementOverview
