import { useMemo } from 'react'
import { Globe, Mail } from 'lucide-react'

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GoogleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

const CHANNEL_STYLES = {
  linkedin: { bg: 'bg-blue-500/10', Icon: LinkedinIcon, textCls: 'text-blue-400' },
  google: { bg: 'bg-red-500/10', Icon: GoogleIcon, textCls: 'text-red-400' },
  email: { bg: 'bg-kompass-amber/10', Icon: Mail, textCls: 'text-kompass-amber' },
  website: { bg: 'bg-kompass-green/10', Icon: Globe, textCls: 'text-kompass-green' },
}

const ROLE_COLORS = {
  champion: 'bg-kompass-green',
  'budget-holder': 'bg-kompass-amber',
  blocker: 'bg-kompass-red',
  technical: 'bg-kompass-blue',
  unknown: 'bg-kompass-text-muted',
}

function getRelativeTime(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  return `${Math.floor(diffDays / 30)} months ago`
}

function groupSignals(signals) {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)
  const monthAgo = new Date(today)
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const groups = { Today: [], 'This Week': [], 'Last Month': [], Earlier: [] }

  for (const s of signals) {
    const d = new Date(s.date)
    if (d >= today) groups['Today'].push(s)
    else if (d >= weekAgo) groups['This Week'].push(s)
    else if (d >= monthAgo) groups['Last Month'].push(s)
    else groups['Earlier'].push(s)
  }

  return Object.entries(groups).filter(([, items]) => items.length > 0)
}

function EngagementTimeline({ account }) {
  const grouped = useMemo(() => groupSignals(account.signals), [account.signals])

  return (
    <div>
      {grouped.map(([label, signals]) => (
        <div key={label} className="mb-6">
          <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
            {label}
          </h3>
          <div className="overflow-hidden rounded-xl border border-kompass-border bg-kompass-surface">
            {signals.map((signal, i) => {
              const style = CHANNEL_STYLES[signal.channel] || CHANNEL_STYLES.website
              const IconComp = style.Icon
              const roleDotColor = ROLE_COLORS[signal.role] || ROLE_COLORS.unknown

              return (
                <div
                  key={signal.id}
                  className={`flex items-center gap-4 px-4 py-3 transition-colors hover:bg-kompass-bg/50 ${
                    i < signals.length - 1 ? 'border-b border-kompass-border' : ''
                  }`}
                >
                  {/* Channel icon */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.bg}`}>
                    <IconComp size={16} className={style.textCls} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${roleDotColor}`} />
                      <span className="text-sm font-medium text-white">
                        {signal.personName === 'Unknown Visitor'
                          ? `Unknown — ${account.name}`
                          : signal.personName}
                      </span>
                      {signal.isDetected && (
                        <span className="rounded-full border border-kompass-purple/20 bg-kompass-purple/10 px-1.5 py-0.5 text-[10px] text-kompass-purple">
                          Detected
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-kompass-text-secondary">
                      {signal.action}
                    </p>
                  </div>

                  {/* Time */}
                  <span className="shrink-0 text-xs text-kompass-text-muted">
                    {getRelativeTime(signal.date)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EngagementTimeline
