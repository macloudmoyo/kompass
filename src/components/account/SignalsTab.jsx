import { useState, useMemo } from 'react'
import { Sparkles, Eye } from 'lucide-react'
import { useToast } from '../ui/Toast'

const ROLES = ['champion', 'budgetHolder', 'blocker', 'technical']
const ROLE_LABELS_MAP = { champion: 'Champion', budgetHolder: 'Budget Holder', blocker: 'Blocker', technical: 'Technical' }

function getDetectedContacts(account) {
  const contacts = []
  for (const role of ROLES) {
    const member = account.committee[role]
    if (member && member.source === 'detected') {
      const signalCount = account.signals.filter(
        (s) => s.personName === member.name
      ).length
      contacts.push({
        ...member,
        role,
        roleLabel: ROLE_LABELS_MAP[role],
        signalCount,
      })
    }
  }
  return contacts
}

function getRelativeTime(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  return `${Math.floor(diffDays / 7)}w ago`
}

function SignalsTab({ account }) {
  const toast = useToast()
  const detectedContacts = useMemo(() => getDetectedContacts(account), [account])
  const [selectedName, setSelectedName] = useState(null)
  const [addedToCrm, setAddedToCrm] = useState({})

  const selected = detectedContacts.find((c) => c.name === selectedName)
  const selectedSignals = useMemo(() => {
    if (!selected) return []
    return account.signals.filter((s) => s.personName === selected.name)
  }, [selected, account.signals])

  const companyDomain = account.name.toLowerCase().replace(/[\s.]+/g, '') + '.com'

  if (detectedContacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-kompass-border bg-kompass-surface py-20">
        <Eye size={48} className="text-kompass-text-muted/40" />
        <p className="mt-4 font-medium text-kompass-text-muted">No detected contacts at this account</p>
        <p className="mt-1 text-sm text-kompass-text-muted">
          When contacts engage with your content outside your CRM, they'll appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      {/* Left panel — 40% */}
      <div className="w-2/5">
        <h3 className="mb-3 text-sm font-semibold text-white">Detected Contacts</h3>
        <div className="flex flex-col gap-2">
          {detectedContacts.map((contact) => {
            const isActive = contact.name === selectedName
            const initials = contact.name.split(' ').map((w) => w[0]).join('').toUpperCase()
            return (
              <button
                key={contact.name}
                onClick={() => setSelectedName(contact.name)}
                className={`cursor-pointer rounded-lg border p-3 text-left transition-all duration-150 ${
                  isActive
                    ? 'border-kompass-purple bg-kompass-purple/5'
                    : 'border-kompass-border bg-kompass-surface hover:border-kompass-purple'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-kompass-blue/30 to-kompass-purple/30 text-xs font-bold text-white">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">{contact.name}</p>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="rounded-full border border-kompass-purple/20 bg-kompass-purple/10 px-1.5 py-0.5 text-[10px] text-kompass-purple">
                        {contact.roleLabel}
                      </span>
                      <span className="text-xs text-kompass-text-muted">
                        {contact.signalCount} signals
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-kompass-text-muted">
                      Last seen {contact.lastSeen.daysAgo}d ago
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right panel — 60% */}
      <div className="w-3/5">
        {!selected ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-kompass-border bg-kompass-surface py-20">
            <Sparkles size={48} className="text-kompass-purple/40" />
            <p className="mt-4 text-sm text-kompass-text-muted">
              Select a detected contact to view their full signal history and enrichment data
            </p>
          </div>
        ) : (
          <div>
            {/* Contact header */}
            <div className="rounded-xl border border-kompass-border bg-kompass-surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-kompass-blue/30 to-kompass-purple/30 text-sm font-bold text-white">
                  {selected.name.split(' ').map((w) => w[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{selected.name}</p>
                  <p className="text-xs text-kompass-text-secondary">{selected.title}</p>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-kompass-purple/20 bg-kompass-purple/10 px-2 py-0.5 text-xs text-kompass-purple">
                    <Sparkles size={10} />
                    Detected — Not in CRM
                  </span>
                </div>
              </div>
            </div>

            {/* Signal history */}
            <h4 className="mt-4 mb-2 text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
              Signal History
            </h4>
            <div className="rounded-xl border border-kompass-border bg-kompass-surface">
              {selectedSignals.map((signal, i) => (
                <div
                  key={signal.id}
                  className={`flex items-center justify-between px-4 py-2.5 ${
                    i < selectedSignals.length - 1 ? 'border-b border-kompass-border' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm text-kompass-text-secondary">{signal.action}</p>
                    <p className="text-xs text-kompass-text-muted">{signal.channel} · {signal.date}</p>
                  </div>
                  <span className="text-xs text-kompass-text-muted">
                    {getRelativeTime(signal.date)}
                  </span>
                </div>
              ))}
            </div>

            {/* Enrichment card */}
            <div className="mt-4 rounded-lg border border-kompass-border bg-kompass-bg p-4">
              <h4 className="mb-3 text-sm font-semibold text-white">Apollo Enrichment Data</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-kompass-text-muted">Name</span>
                  <span className="text-kompass-text-primary">{selected.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kompass-text-muted">Title</span>
                  <span className="text-kompass-text-primary">{selected.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kompass-text-muted">LinkedIn</span>
                  <span className="text-kompass-blue">
                    linkedin.com/in/{selected.name.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kompass-text-muted">Email</span>
                  <span className="text-kompass-text-primary">
                    {selected.name.split(' ')[0].toLowerCase()[0]}.{selected.name.split(' ').slice(-1)[0].toLowerCase()}@{companyDomain}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setAddedToCrm((prev) => ({ ...prev, [selected.name]: true }))
                  toast('Added to HubSpot ✓', 'green')
                }}
                disabled={addedToCrm[selected.name]}
                className="mt-4 w-full rounded-md bg-kompass-blue px-3 py-2 text-sm font-medium text-white transition-all duration-150 hover:opacity-90 disabled:opacity-50"
              >
                {addedToCrm[selected.name] ? 'Added to CRM ✓' : 'Add to CRM'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignalsTab
