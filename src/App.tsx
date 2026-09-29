import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          Phase 1: Foundations
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          React + TypeScript + Tailwind
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed">
          Tailwind v4 is successfully configured with Vite and React 19!
        </p>

        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-6 py-2.5 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 active:scale-95 transition-all duration-150 shadow-lg shadow-indigo-500/25 text-white cursor-pointer"
        >
          Count is:{' '}
          <span className="font-mono font-bold text-yellow-300 ml-1">
            {count}
          </span>
        </button>
      </div>
    </div>
  )
}

export default App
