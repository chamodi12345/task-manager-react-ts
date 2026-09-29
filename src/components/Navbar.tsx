import { NavLink } from 'react-router-dom'
import { useTasks } from '../hooks/useTasks'

export const Navbar = () => {
  const { counts } = useTasks()

  const navItems = [
    { to: '/', label: 'Tasks', badge: counts.all },
    { to: '/analytics', label: 'Analytics' },
    { to: '/about', label: 'About' },
  ]

  return (
    <header className="w-full max-w-lg mb-6">
      <nav className="flex items-center justify-between p-2 bg-slate-900/80 border border-slate-800 rounded-2xl backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-2 pl-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <span className="font-bold text-sm text-white tracking-tight">
            TaskFlow
          </span>
        </div>

        <div className="flex items-center gap-1">
          {navItems.map(({ to, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <span>{label}</span>
              {typeof badge === 'number' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-950/60 text-indigo-200">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
