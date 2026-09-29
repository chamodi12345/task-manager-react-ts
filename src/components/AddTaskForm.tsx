import { useState, type ChangeEvent, type FormEvent } from 'react'

export interface AddTaskFormProps {
  onAddTask: (title: string) => void
}

export const AddTaskForm = ({ onAddTask }: AddTaskFormProps) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (error) setError('')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      setError('Task title cannot be empty.')
      return
    }

    onAddTask(trimmedTitle)
    setTitle('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="Add a new task..."
            className={`w-full px-4 py-2.5 bg-slate-950/80 border rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none transition-all ${
              error
                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm flex items-center gap-1.5 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer select-none"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add</span>
        </button>
      </div>

      {error && (
        <p className="text-xs text-rose-400 pl-1 font-medium animate-fadeIn">
          {error}
        </p>
      )}
    </form>
  )
}
