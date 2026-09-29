import type { Task } from '../types/task'

export interface TaskItemProps {
  task: Task
  onToggle?: (id: string) => void
  onDelete?: (id: string) => void
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-900/40 border-slate-850 opacity-75'
          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-indigo-500/5'
      }`}
    >
      <div className="flex items-center gap-3.5 flex-1 min-w-0">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle?.(task.id)}
            className="peer sr-only"
          />
          <div className="w-5 h-5 rounded-md border-2 border-slate-600 peer-checked:border-indigo-500 peer-checked:bg-indigo-600 transition-all flex items-center justify-center">
            {task.completed && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </label>

        <span
          className={`text-sm font-medium transition-all truncate select-none ${
            task.completed
              ? 'line-through text-slate-500'
              : 'text-slate-200 group-hover:text-white'
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium border ${
            task.completed
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </span>

        {onDelete && (
          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
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
          </button>
        )}
      </div>
    </div>
  )
}
