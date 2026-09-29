import { useTasks } from '../hooks/useTasks'

export const AnalyticsPage = () => {
  const { tasks, counts } = useTasks()
  const completionRate =
    counts.all === 0 ? 0 : Math.round((counts.completed / counts.all) * 100)

  return (
    <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          Analytics & Metrics
        </div>
        <span className="text-xs text-slate-500 font-mono">Live Insights</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Productivity Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Detailed metrics and breakdown of your task workflow.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <span className="text-xs text-slate-400 font-medium">Total</span>
          <div className="text-2xl font-extrabold text-white mt-1">
            {counts.all}
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <span className="text-xs text-amber-400 font-medium">Active</span>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">
            {counts.active}
          </div>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-center">
          <span className="text-xs text-emerald-400 font-medium">Done</span>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">
            {counts.completed}
          </div>
        </div>
      </div>

      {/* Completion Rate Card */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-950/80 border border-indigo-500/20 rounded-xl p-5 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Completion Rate
          </span>
          <h3 className="text-3xl font-black text-white mt-1">
            {completionRate}%
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {counts.completed} out of {counts.all} tasks finished
          </p>
        </div>

        <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-indigo-500 border-r-purple-500 flex items-center justify-center font-mono font-bold text-xs text-indigo-300">
          {completionRate}%
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Task Distribution
        </h4>
        <div className="space-y-2">
          {tasks.slice(0, 4).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800/60 text-xs"
            >
              <span className="text-slate-300 truncate max-w-[260px]">
                {task.title}
              </span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  task.completed
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
