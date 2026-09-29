export const AboutPage = () => {
  const stack = [
    { name: 'React 19', desc: 'Latest concurrent rendering & hooks' },
    { name: 'TypeScript', desc: 'Strict interfaces, unions & generics' },
    { name: 'Tailwind CSS v4', desc: 'Modern styling & fluid design system' },
    { name: 'Vite 8', desc: 'Lightning-fast ES modules bundler' },
    { name: 'React Router 7', desc: 'Client-side SPA navigation' },
    { name: 'Context + Reducer', desc: 'Scalable predictable state' },
  ]

  return (
    <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          About Project
        </div>
        <span className="text-xs text-slate-500 font-mono">Architecture</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          About TaskFlow
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          A production-ready React + TypeScript single-page application built
          step-by-step.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Technologies & Patterns
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {stack.map(({ name, desc }) => (
            <div
              key={name}
              className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1"
            >
              <h4 className="text-xs font-bold text-slate-100">{name}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-2">
        <h4 className="text-xs font-bold text-indigo-300">
          🚀 Ready for Vitest & CI/CD
        </h4>
        <p className="text-xs text-indigo-200/80 leading-relaxed">
          The codebase is structured into modular components, custom hooks,
          typed reducers, and routing for easy unit and integration testing.
        </p>
      </div>
    </div>
  )
}
