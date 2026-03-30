import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Building2, Activity, Settings, LogOut } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/accounts' },
  { icon: Building2, label: 'Accounts', to: '/accounts' },
  { icon: Activity, label: 'Signals', to: '#' },
  { icon: Settings, label: 'Settings', to: '#' },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center border-r border-kompass-border bg-kompass-surface py-4">
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map(({ icon: Icon, label, to }) => {
          const isActive = to !== '#' && location.pathname.startsWith(to)
          return (
            <NavLink
              key={label}
              to={to}
              className="group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors"
              style={{
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : undefined,
              }}
            >
              <Icon
                size={20}
                className={
                  isActive
                    ? 'text-kompass-blue'
                    : 'text-kompass-text-muted group-hover:text-kompass-text-secondary'
                }
              />
              <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-kompass-surface px-2 py-1 text-xs text-kompass-text-primary opacity-0 shadow-lg ring-1 ring-kompass-border transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </NavLink>
          )
        })}
      </nav>

      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-kompass-blue text-xs font-semibold text-white cursor-pointer">
          MM
          <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-kompass-surface px-2 py-1 text-xs text-kompass-text-primary opacity-0 shadow-lg ring-1 ring-kompass-border transition-opacity group-hover:opacity-100">
            Macloud Moyo
          </span>
        </div>
        <button className="group relative flex h-10 w-10 items-center justify-center rounded-lg text-kompass-text-muted transition-colors hover:text-kompass-text-secondary">
          <LogOut size={18} />
          <span className="pointer-events-none absolute left-14 z-50 whitespace-nowrap rounded-md bg-kompass-surface px-2 py-1 text-xs text-kompass-text-primary opacity-0 shadow-lg ring-1 ring-kompass-border transition-opacity group-hover:opacity-100">
            Sign out
          </span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
