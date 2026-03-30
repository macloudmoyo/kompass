import { useState } from 'react'
import {
  Database,
  Sparkles,
  TrendingUp,
  RefreshCw,
} from 'lucide-react'

const LOG_ENTRIES = [
  { icon: Database, text: 'CRM sync completed — 3 contacts mapped', time: '2 hours ago' },
  { icon: Sparkles, text: 'New signal detected — Budget Holder engaged with LinkedIn Ad', time: '5 hours ago' },
  { icon: Sparkles, text: 'Enrichment completed — 1 contact found', time: '1 day ago' },
  { icon: TrendingUp, text: 'Penetration score updated: 47% → 55%', time: '2 days ago' },
  { icon: RefreshCw, text: 'Website engagement data refreshed', time: '3 days ago' },
  { icon: Database, text: 'CRM sync completed — deal stage updated', time: '5 days ago' },
]

function NotesTab() {
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (note.trim()) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="flex gap-6">
      {/* Left — Notes 60% */}
      <div className="w-3/5">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add notes about this account..."
          className="min-h-32 w-full rounded-lg border border-kompass-border bg-kompass-surface p-3 text-sm text-kompass-text-primary placeholder-kompass-text-muted outline-none transition-colors focus:ring-2 focus:ring-kompass-blue"
        />
        <button
          onClick={handleSave}
          className="mt-3 rounded-lg bg-kompass-blue px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:opacity-90"
        >
          {saved ? 'Saved ✓' : 'Save Note'}
        </button>
      </div>

      {/* Right — Activity Log 40% */}
      <div className="w-2/5">
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-kompass-text-muted">
          Activity Log
        </h3>
        <div className="flex flex-col gap-0">
          {LOG_ENTRIES.map((entry, i) => {
            const Icon = entry.icon
            return (
              <div
                key={i}
                className={`flex items-start gap-3 py-3 ${
                  i < LOG_ENTRIES.length - 1 ? 'border-b border-kompass-border' : ''
                }`}
              >
                <Icon size={14} className="mt-0.5 shrink-0 text-kompass-text-muted" />
                <div>
                  <p className="text-sm text-kompass-text-secondary">{entry.text}</p>
                  <p className="text-xs text-kompass-text-muted">{entry.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NotesTab
