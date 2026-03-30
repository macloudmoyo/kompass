import { Compass, Bell } from 'lucide-react'

function TopBar() {
  return (
    <header className="fixed left-16 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-kompass-border bg-kompass-surface px-6">
      <div className="flex items-center gap-2">
        <Compass size={22} className="text-kompass-blue" />
        <span className="text-lg font-bold text-white">Kompass</span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-kompass-text-secondary transition-colors hover:text-kompass-text-primary">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-kompass-purple ring-2 ring-kompass-surface" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-kompass-blue text-xs font-semibold text-white">
          MM
        </div>
      </div>
    </header>
  )
}

export default TopBar
