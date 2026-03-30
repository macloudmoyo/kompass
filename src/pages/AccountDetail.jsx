import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeft,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'
import { getAccountById } from '../data/demoData'
import CommitteeMap from '../components/account/CommitteeMap'
import EngagementTimeline from '../components/account/EngagementTimeline'
import SignalsTab from '../components/account/SignalsTab'
import NotesTab from '../components/account/NotesTab'

const TABS = ['Committee Map', 'Engagement Timeline', 'Signals', 'Notes']

function ScoreDonut({ score }) {
  const r = 32
  const circumference = 2 * Math.PI * r
  const offset = circumference - (score / 100) * circumference
  const color =
    score < 30
      ? 'var(--color-kompass-red)'
      : score <= 60
        ? 'var(--color-kompass-amber)'
        : 'var(--color-kompass-green)'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={80} height={80} className="-rotate-90">
        <circle cx={40} cy={40} r={r} fill="none" stroke="var(--color-kompass-border)" strokeWidth={8} />
        <circle
          cx={40}
          cy={40}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute text-xl font-bold text-white">{score}%</span>
    </div>
  )
}

function SkeletonDetail() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-24 rounded bg-kompass-surface" />
      <div className="mt-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-kompass-surface" />
          <div>
            <div className="h-6 w-40 rounded bg-kompass-surface" />
            <div className="mt-2 h-4 w-28 rounded bg-kompass-surface" />
            <div className="mt-2 h-3 w-32 rounded bg-kompass-surface" />
          </div>
        </div>
        <div className="h-40 w-[180px] rounded-xl bg-kompass-surface" />
      </div>
      <div className="mt-6 flex gap-4 border-b border-kompass-border pb-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 w-24 rounded bg-kompass-surface" />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-52 rounded-xl bg-kompass-surface" />
        ))}
      </div>
    </div>
  )
}

function AccountDetail() {
  const { accountId } = useParams()
  const account = getAccountById(accountId)
  const [activeTab, setActiveTab] = useState('Committee Map')
  const [loading, setLoading] = useState(true)
  const [tabFade, setTabFade] = useState(true)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [accountId])

  const handleTabSwitch = (tab) => {
    setTabFade(false)
    setTimeout(() => {
      setActiveTab(tab)
      setTabFade(true)
    }, 50)
  }

  if (!account) {
    return (
      <div className="py-20 text-center">
        <p className="text-kompass-text-muted">Account not found.</p>
        <Link to="/accounts" className="mt-2 inline-block text-sm text-kompass-blue hover:underline">
          Back to accounts
        </Link>
      </div>
    )
  }

  if (loading) return <SkeletonDetail />

  const initials = account.name
    .split(/[\s.]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const momentumDelta = account.momentum === 'up' ? '+5' : account.momentum === 'down' ? '-3' : '0'

  return (
    <div>
      {/* Back link */}
      <Link
        to="/accounts"
        className="inline-flex items-center gap-1 text-sm text-kompass-text-muted transition-all duration-150 hover:text-kompass-text-secondary"
      >
        <ChevronLeft size={16} />
        All Accounts
      </Link>

      {/* Header */}
      <div className="mt-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kompass-blue/20 to-kompass-purple/20 text-lg font-bold text-white">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{account.name}</h1>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-block rounded-full bg-kompass-border/50 px-2 py-0.5 text-xs text-kompass-text-muted">
                {account.industry} · {account.segment}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-sm text-kompass-text-muted">
              {account.name.toLowerCase().replace(/[\s.]+/g, '')}.com
              <ExternalLink size={12} />
            </div>
          </div>
        </div>

        {/* Score panel */}
        <div className="min-w-[180px] rounded-xl border border-kompass-border bg-kompass-surface p-4 text-center">
          <p className="mb-2 text-xs uppercase tracking-wide text-kompass-text-muted">
            Committee Influence Score
          </p>
          <ScoreDonut score={account.penetrationScore} />
          <div className="mt-2 flex items-center justify-center gap-1">
            {account.momentum === 'up' && (
              <>
                <TrendingUp size={14} className="text-kompass-green" />
                <span className="text-xs text-kompass-green">{momentumDelta} pts this week</span>
              </>
            )}
            {account.momentum === 'flat' && (
              <>
                <Minus size={14} className="text-kompass-amber" />
                <span className="text-xs text-kompass-amber">No change this week</span>
              </>
            )}
            {account.momentum === 'down' && (
              <>
                <TrendingDown size={14} className="text-kompass-red" />
                <span className="text-xs text-kompass-red">{momentumDelta} pts this week</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="mt-6 flex border-b border-kompass-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabSwitch(tab)}
            className={`cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-150 ${
              activeTab === tab
                ? 'border-b-2 border-kompass-blue text-white'
                : 'text-kompass-text-muted hover:text-kompass-text-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content with fade */}
      <div className={`mt-6 transition-opacity duration-150 ${tabFade ? 'opacity-100' : 'opacity-0'}`}>
        {activeTab === 'Committee Map' && <CommitteeMap account={account} />}
        {activeTab === 'Engagement Timeline' && <EngagementTimeline account={account} />}
        {activeTab === 'Signals' && <SignalsTab account={account} />}
        {activeTab === 'Notes' && <NotesTab account={account} />}
      </div>
    </div>
  )
}

export default AccountDetail
