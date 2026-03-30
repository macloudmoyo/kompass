import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Upload,
  Plus,
  Building2,
  Target,
  Eye,
  AlertCircle,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  Globe,
  Mail,
} from 'lucide-react'
import { accounts } from '../data/demoData'

const ROLES = ['champion', 'budgetHolder', 'blocker', 'technical']
const ROLE_LABELS = { champion: 'Champion', budgetHolder: 'Budget Holder', blocker: 'Blocker', technical: 'Technical' }

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
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function getChannelIcon(channel) {
  switch (channel?.toLowerCase()) {
    case 'linkedin': return <LinkedinIcon />
    case 'google': return <GoogleIcon />
    case 'email': return <Mail size={14} className="text-kompass-amber" />
    case 'website': return <Globe size={14} className="text-kompass-green" />
    default: return <Globe size={14} className="text-kompass-text-muted" />
  }
}

function getRelativeTime(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  return `${Math.floor(diffDays / 30)} months ago`
}

function getAccountMeta(account) {
  const { committee } = account
  const filled = ROLES.filter((r) => committee[r] !== null).length
  const gaps = ROLES.filter((r) => committee[r] === null)
  const detected = ROLES.filter((r) => committee[r]?.source === 'detected').length
  const lastSignal = account.signals[0] || null
  const primaryGap = gaps.length > 0 ? ROLE_LABELS[gaps[0]] : null
  return { filled, gaps, detected, lastSignal, primaryGap }
}

function PenetrationRing({ score }) {
  const r = 18
  const circumference = 2 * Math.PI * r
  const offset = circumference - (score / 100) * circumference
  const color =
    score < 30 ? 'var(--color-kompass-red)' : score <= 60 ? 'var(--color-kompass-amber)' : 'var(--color-kompass-green)'
  const textClass =
    score < 30 ? 'text-kompass-red' : score <= 60 ? 'text-kompass-amber' : 'text-kompass-green'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={44} height={44} className="-rotate-90">
        <circle cx={22} cy={22} r={r} fill="none" stroke="var(--color-kompass-border)" strokeWidth={3} />
        <circle
          cx={22}
          cy={22}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={`absolute text-xs font-bold ${textClass}`}>{score}%</span>
    </div>
  )
}

function RoleDot({ member }) {
  if (!member) return <span className="h-2 w-2 rounded-full bg-kompass-red" />
  if (member.source === 'detected') return <span className="h-2 w-2 rounded-full bg-kompass-purple" />
  if (member.warmth === 'warm') return <span className="h-2 w-2 rounded-full bg-kompass-green" />
  return <span className="h-2 w-2 rounded-full bg-kompass-amber" />
}

function MomentumIcon({ momentum }) {
  if (momentum === 'up') return <TrendingUp size={16} className="text-kompass-green" />
  if (momentum === 'down') return <TrendingDown size={16} className="text-kompass-red" />
  return <Minus size={16} className="text-kompass-amber" />
}

const FILTERS = ['All', 'High Priority', 'Detected Signals', 'Critical Gaps']

function AccountsList() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy] = useState('penetration-desc')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAccounts = useMemo(() => {
    let list = [...accounts]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.segment.toLowerCase().includes(q)
      )
    }

    if (activeFilter === 'High Priority') {
      list = list.filter((a) => a.penetrationScore < 40 || a.momentum === 'down')
    } else if (activeFilter === 'Detected Signals') {
      list = list.filter((a) =>
        ROLES.some((r) => a.committee[r]?.source === 'detected')
      )
    } else if (activeFilter === 'Critical Gaps') {
      list = list.filter((a) => {
        const gaps = ROLES.filter((r) => a.committee[r] === null)
        return gaps.length >= 2
      })
    }

    if (sortBy === 'penetration-desc') list.sort((a, b) => b.penetrationScore - a.penetrationScore)
    else if (sortBy === 'penetration-asc') list.sort((a, b) => a.penetrationScore - b.penetrationScore)
    else if (sortBy === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name))

    return list
  }, [activeFilter, sortBy, searchQuery])

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Target Accounts</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-kompass-border px-4 py-2 text-sm text-kompass-text-secondary transition-colors hover:border-kompass-blue hover:text-kompass-blue">
            <Upload size={16} />
            Import Accounts
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-kompass-blue px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            <Plus size={16} />
            Add Account
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-kompass-border bg-kompass-surface p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-kompass-text-muted">Accounts Tracked</p>
              <p className="mt-1 text-3xl font-bold text-white">24</p>
              <p className="mt-1 text-xs text-kompass-text-muted">Active target accounts</p>
            </div>
            <Building2 size={20} className="text-kompass-text-muted" />
          </div>
        </div>
        <div className="rounded-xl border border-kompass-border bg-kompass-surface p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-kompass-text-muted">Avg. Penetration Score</p>
              <p className="mt-1 text-3xl font-bold text-kompass-amber">47%</p>
              <p className="mt-1 text-xs text-kompass-text-muted">Across all accounts</p>
            </div>
            <Target size={20} className="text-kompass-amber opacity-60" />
          </div>
        </div>
        <div
          className="rounded-xl border border-kompass-border bg-kompass-surface p-4"
          style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-kompass-text-muted">Detected — Not in CRM</p>
              <p className="mt-1 text-3xl font-bold text-kompass-purple">7</p>
              <p className="mt-1 text-xs text-kompass-text-muted">Contacts found outside CRM</p>
            </div>
            <Eye size={20} className="text-kompass-purple opacity-60" />
          </div>
        </div>
        <div className="rounded-xl border border-kompass-border bg-kompass-surface p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-kompass-text-muted">Critical Gaps</p>
              <p className="mt-1 text-3xl font-bold text-kompass-red">12</p>
              <p className="mt-1 text-xs text-kompass-text-muted">Missing key committee roles</p>
            </div>
            <AlertCircle size={20} className="text-kompass-red opacity-60" />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-3 py-1 text-sm transition-colors ${
                activeFilter === filter
                  ? 'bg-kompass-blue text-white'
                  : 'border border-kompass-border bg-kompass-surface text-kompass-text-secondary hover:border-kompass-blue'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-48 appearance-none rounded-lg border border-kompass-border bg-kompass-bg px-3 py-1.5 text-sm text-kompass-text-primary outline-none focus:ring-2 focus:ring-kompass-blue"
          >
            <option value="penetration-desc">Score: High → Low</option>
            <option value="penetration-asc">Score: Low → High</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-kompass-text-muted"
            />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-kompass-border bg-kompass-bg py-1.5 pl-9 pr-3 text-sm text-kompass-text-primary placeholder-kompass-text-muted outline-none focus:ring-2 focus:ring-kompass-blue"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-kompass-border bg-kompass-surface">
        <table className="w-full">
          <thead>
            <tr className="border-b border-kompass-border bg-kompass-bg">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
                Company
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
                Penetration Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
                Committee Coverage
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
                Detected
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
                Last Signal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
                Momentum
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
                Primary Gap
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, idx) => {
              const meta = getAccountMeta(account)
              const initials = account.name
                .split(/[\s.]+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase()

              return (
                <tr
                  key={account.id}
                  onClick={() => navigate(`/accounts/${account.id}`)}
                  className={`cursor-pointer border-b border-kompass-border transition-colors hover:bg-kompass-bg/50 ${
                    idx === filteredAccounts.length - 1 ? 'border-0' : ''
                  }`}
                >
                  {/* Company */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kompass-blue/20 to-kompass-purple/20 text-sm font-bold text-white">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {account.name}
                        </p>
                        <span className="inline-block rounded-full bg-kompass-border/50 px-2 py-0.5 text-xs text-kompass-text-muted">
                          {account.industry} · {account.segment}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Penetration Score */}
                  <td className="px-4 py-3">
                    <PenetrationRing score={account.penetrationScore} />
                  </td>

                  {/* Committee Coverage */}
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-white">
                      {meta.filled} / 4
                    </p>
                    <div className="mt-1 flex items-center gap-1">
                      {ROLES.map((role) => (
                        <RoleDot key={role} member={account.committee[role]} />
                      ))}
                    </div>
                  </td>

                  {/* Detected */}
                  <td className="px-4 py-3">
                    {meta.detected > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-kompass-purple/20 bg-kompass-purple/10 px-2 py-1 text-xs text-kompass-purple">
                        <Eye size={12} />
                        {meta.detected} detected
                      </span>
                    ) : (
                      <span className="text-kompass-text-muted">—</span>
                    )}
                  </td>

                  {/* Last Signal */}
                  <td className="px-4 py-3">
                    {meta.lastSignal ? (
                      <div className="flex items-center gap-1.5">
                        {getChannelIcon(meta.lastSignal.channel)}
                        <span className="text-sm text-kompass-text-secondary">
                          {getRelativeTime(meta.lastSignal.date)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-kompass-text-muted">—</span>
                    )}
                  </td>

                  {/* Momentum */}
                  <td className="px-4 py-3">
                    <MomentumIcon momentum={account.momentum} />
                  </td>

                  {/* Primary Gap */}
                  <td className="px-4 py-3">
                    {meta.primaryGap ? (
                      <span className="inline-block rounded-full border border-kompass-red/20 bg-kompass-red/10 px-2 py-1 text-xs text-kompass-red">
                        {meta.primaryGap}
                      </span>
                    ) : (
                      <span className="inline-block rounded-full border border-kompass-green/20 bg-kompass-green/10 px-2 py-1 text-xs text-kompass-green">
                        Complete
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm text-kompass-blue hover:underline">
                      View Account
                      <ChevronRight size={14} />
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AccountsList
