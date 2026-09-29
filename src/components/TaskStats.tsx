import type { Task } from '../types/task'

export interface TaskStatsProps {
  tasks: Task[]
  onClearCompleted: () => void
}

export const TaskStats = ({ tasks, onClearCompleted }: TaskStatsProps) => {
  const total = tasks.length
  const completed = tasks.filter((t) => t.completed).length
  const pending = total - completed
  const progressPercent =
    total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Progress</span>
          <span className="font-semibold text-indigo-400">
            {progressPercent}%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            Pending:{' '}
            <strong className="text-amber-400 font-semibold">{pending}</strong>
          </span>
          <span className="text-slate-400">
            Completed:{' '}
            <strong className="text-emerald-400 font-semibold">
              {completed}
            </strong>
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {completed > 0 && (
        <div className="flex justify-end pt-1">
          <button
            onClick={onClearCompleted}
            className="text-xs text-rose-400 hover:text-rose-300 hover:underline transition-colors flex items-center gap-1 cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear completed ({completed})
          </button>
        </div>
      )}
    </div>
  )
}
