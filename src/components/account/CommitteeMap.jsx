import { useState } from 'react'
import {
  Star,
  DollarSign,
  Shield,
  Code2,
  Database,
  Sparkles,
  UserX,
  Search,
  Loader2,
  Globe,
  Mail,
} from 'lucide-react'
import { useToast } from '../ui/Toast'
import EngagementOverview from './EngagementOverview'

function LinkedinSmall({ size = 12, lit = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={lit ? 'text-[#0A66C2]' : 'text-kompass-border'}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GoogleSmall({ size = 12, lit = false }) {
  if (!lit) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="text-kompass-border">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

const ROLE_CONFIG = {
  champion: { icon: Star, label: 'Champion', gapDesc: 'The internal advocate who champions your solution and rallies support across the buying committee.' },
  budgetHolder: { icon: DollarSign, label: 'Budget Holder', gapDesc: 'The economic buyer who controls budget approval and signs off on vendor decisions.' },
  blocker: { icon: Shield, label: 'Blocker', gapDesc: 'The stakeholder most likely to raise objections or slow down the deal — legal, compliance, or procurement.' },
  technical: { icon: Code2, label: 'Technical', gapDesc: 'The technical evaluator who assesses product fit, integrations, and implementation feasibility.' },
}

const ENRICHMENT_CONTACTS = {
  champion: { name: 'Victoria Lane', title: 'VP of Marketing', email: 'v.lane' },
  budgetHolder: { name: 'Andrew Whitfield', title: 'CFO', email: 'a.whitfield' },
  blocker: { name: 'Karen Mitchell', title: 'Head of Legal', email: 'k.mitchell' },
  technical: { name: 'Daniel Reeves', title: 'VP Engineering', email: 'd.reeves' },
}

function getContactChannels(account, personName) {
  const channels = new Set()
  for (const s of account.signals) {
    if (s.personName === personName) channels.add(s.channel)
  }
  return channels
}

function getEngagementLevel(member) {
  if (!member) return 0
  if (member.warmth === 'warm' && member.source === 'detected') return 85
  if (member.warmth === 'warm') return 70
  if (member.source === 'detected') return 60
  return 20
}

function getStatusBadge(member) {
  if (!member) return { label: 'Gap', cls: 'border-kompass-red/20 bg-kompass-red/10 text-kompass-red' }
  if (member.source === 'detected') return { label: 'Detected', cls: 'border-kompass-purple/20 bg-kompass-purple/10 text-kompass-purple' }
  if (member.warmth === 'cold') return { label: 'Cold', cls: 'border-kompass-amber/20 bg-kompass-amber/10 text-kompass-amber' }
  return { label: 'Covered ✓', cls: 'border-kompass-green/20 bg-kompass-green/10 text-kompass-green' }
}

function ContactCard({ member, account }) {
  const toast = useToast()
  const [addedToCrm, setAddedToCrm] = useState(false)
  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
  const channels = getContactChannels(account, member.name)
  const engagement = getEngagementLevel(member)
  const isDetected = member.source === 'detected'

  return (
    <div className={`flex flex-col items-center text-center ${isDetected ? 'animate-pulse-slow rounded-lg border-l-[3px] border-l-kompass-purple bg-kompass-purple/5 p-3' : ''}`}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-kompass-blue/30 to-kompass-purple/30 text-sm font-bold text-white">
        {initials}
      </div>
      <p className="mt-2 text-sm font-medium text-white">{member.name}</p>
      <p className="text-xs text-kompass-text-secondary">{member.title}</p>

      {isDetected ? (
        <>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-kompass-purple/20 bg-kompass-purple/10 px-2 py-0.5 text-xs text-kompass-purple">
            <Sparkles size={10} />
            Detected — Not in CRM
          </span>
          <p className="mt-1 text-xs italic text-kompass-text-muted">
            Engaging with your content but not in your CRM
          </p>
        </>
      ) : (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-kompass-border/50 px-2 py-0.5 text-xs text-kompass-text-muted">
          <Database size={10} />
          In CRM
        </span>
      )}

      {/* Engagement bar */}
      <div className="mt-3 w-full">
        <p className="mb-1 text-left text-xs text-kompass-text-muted">Engagement</p>
        <div className="h-1.5 w-full rounded-full bg-kompass-border">
          <div
            className="h-full rounded-full"
            style={{
              width: `${engagement}%`,
              background: engagement <= 20
                ? 'var(--color-kompass-amber)'
                : `linear-gradient(to right, var(--color-kompass-amber), var(--color-kompass-green))`,
            }}
          />
        </div>
      </div>

      {/* Last touchpoint */}
      <p className="mt-2 text-xs text-kompass-text-muted">
        Last seen: {member.lastSeen.daysAgo}d ago — {member.lastSeen.channel}
      </p>

      {/* Channel icons */}
      <div className="mt-2 flex items-center gap-2">
        <LinkedinSmall lit={channels.has('linkedin')} />
        <GoogleSmall lit={channels.has('google')} />
        <Mail size={12} className={channels.has('email') ? 'text-kompass-amber' : 'text-kompass-border'} />
        <Globe size={12} className={channels.has('website') ? 'text-kompass-green' : 'text-kompass-border'} />
      </div>

      {/* Detected CTA buttons */}
      {isDetected && (
        <div className="mt-3 flex w-full gap-2">
          <button
            onClick={() => {
              setAddedToCrm(true)
              toast('Added to HubSpot ✓', 'green')
            }}
            disabled={addedToCrm}
            className="flex-1 rounded-md bg-kompass-blue px-2 py-1.5 text-xs font-medium text-white transition-all duration-150 hover:opacity-90 disabled:opacity-50"
          >
            {addedToCrm ? 'Added ✓' : 'Add to CRM'}
          </button>
          <button className="flex-1 rounded-md border border-kompass-border px-2 py-1.5 text-xs text-kompass-text-secondary transition-all duration-150 hover:border-kompass-blue hover:text-kompass-blue">
            View Signals
          </button>
        </div>
      )}
    </div>
  )
}

function GapCard({ role, account }) {
  const toast = useToast()
  const [searching, setSearching] = useState(false)
  const [enriched, setEnriched] = useState(null)
  const [addedToCrm, setAddedToCrm] = useState(false)
  const config = ROLE_CONFIG[role]
  const companyDomain = account.name.toLowerCase().replace(/[\s.]+/g, '') + '.com'

  const handleSearch = () => {
    setSearching(true)
    setTimeout(() => {
      const contact = ENRICHMENT_CONTACTS[role]
      setEnriched({
        name: contact.name,
        title: contact.title,
        source: 'detected',
        warmth: 'warm',
        lastSeen: { channel: 'LinkedIn', daysAgo: 3 },
        email: `${contact.email}@${companyDomain}`,
      })
      setSearching(false)
      toast('Contact found via enrichment', 'purple')
    }, 1500)
  }

  if (enriched) {
    const initials = enriched.name.split(' ').map((w) => w[0]).join('').toUpperCase()
    return (
      <div className="flex flex-col items-center rounded-lg border-l-[3px] border-l-kompass-purple bg-kompass-purple/5 p-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-kompass-blue/30 to-kompass-purple/30 text-sm font-bold text-white">
          {initials}
        </div>
        <p className="mt-2 text-sm font-medium text-white">{enriched.name}</p>
        <p className="text-xs text-kompass-text-secondary">{enriched.title}</p>
        <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-kompass-purple/20 bg-kompass-purple/10 px-2 py-0.5 text-xs text-kompass-purple">
          <Sparkles size={10} />
          Found via Enrichment
        </span>
        <div className="mt-3 flex w-full gap-2">
          <button
            onClick={() => {
              setAddedToCrm(true)
              toast('Added to HubSpot ✓', 'green')
            }}
            disabled={addedToCrm}
            className="flex-1 rounded-md bg-kompass-blue px-2 py-1.5 text-xs font-medium text-white transition-all duration-150 hover:opacity-90 disabled:opacity-50"
          >
            {addedToCrm ? 'Added ✓' : 'Add to CRM'}
          </button>
          <button className="flex-1 rounded-md border border-kompass-border px-2 py-1.5 text-xs text-kompass-text-secondary transition-all duration-150 hover:border-kompass-blue hover:text-kompass-blue">
            View Signals
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-kompass-red/40 bg-kompass-red/5 p-4 text-center">
      <UserX size={32} className="text-kompass-red/40" />
      <p className="mt-3 text-sm font-medium text-kompass-text-muted">No contact identified</p>
      <p className="mt-1 text-xs text-kompass-text-muted">{config.gapDesc}</p>
      <button
        onClick={handleSearch}
        disabled={searching}
        className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-kompass-blue px-3 py-1.5 text-xs font-medium text-white transition-all duration-150 hover:opacity-90 disabled:opacity-70"
      >
        {searching ? (
          <>
            <Loader2 size={12} className="animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search size={12} />
            Find This Person
          </>
        )}
      </button>
      <button className="mt-2 w-full rounded-md border border-kompass-border px-3 py-1.5 text-xs text-kompass-text-secondary transition-all duration-150 hover:border-kompass-blue hover:text-kompass-blue">
        Add Manually
      </button>
    </div>
  )
}

function QuadrantCard({ role, member, account }) {
  const config = ROLE_CONFIG[role]
  const Icon = config.icon
  const status = getStatusBadge(member)

  return (
    <div className="relative min-h-[200px] rounded-xl border border-kompass-border bg-kompass-surface p-5 transition-colors hover:border-kompass-border/80">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-kompass-text-muted" />
          <span className="text-xs uppercase tracking-wider text-kompass-text-muted">
            {config.label}
          </span>
        </div>
        <span className={`rounded-full border px-2 py-1 text-xs ${status.cls}`}>
          {status.label}
        </span>
      </div>

      {member ? (
        <ContactCard member={member} account={account} />
      ) : (
        <GapCard role={role} account={account} />
      )}
    </div>
  )
}

function CommitteeMap({ account }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <QuadrantCard role="champion" member={account.committee.champion} account={account} />
        <QuadrantCard role="budgetHolder" member={account.committee.budgetHolder} account={account} />
        <QuadrantCard role="blocker" member={account.committee.blocker} account={account} />
        <QuadrantCard role="technical" member={account.committee.technical} account={account} />
      </div>
      <EngagementOverview account={account} />
    </>
  )
}

export default CommitteeMap
