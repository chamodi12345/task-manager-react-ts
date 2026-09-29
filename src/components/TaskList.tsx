import type { Task } from '../types/task'
import { TaskItem } from './TaskItem'

export interface TaskListProps {
  tasks: Task[]
  onToggle?: (id: string) => void
  onDelete?: (id: string) => void
}

export const TaskList = ({ tasks, onToggle, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed border-slate-800 rounded-2xl bg-slate-900/30 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 mb-3">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-slate-300">No tasks found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          Your list is clear. Add new tasks or check back later!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
