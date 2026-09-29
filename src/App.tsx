import { useState } from 'react'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskList } from './components/TaskList'
import { TaskStats } from './components/TaskStats'
import type { Task } from './types/task'

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Learn React + TypeScript basics',
    completed: true,
  },
  {
    id: '2',
    title: 'Render lists with .map() and unique keys',
    completed: true,
  },
  {
    id: '3',
    title: 'Build task creation form and type event handlers',
    completed: true,
  },
  {
    id: '4',
    title: 'Lift state up and handle toggle, delete, and bulk actions',
    completed: false,
  },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Feature 4: Toggle, Delete & Stats
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Lifting State
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Task Operations
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Lifting state up, handling callbacks as props, and bulk actions.
          </p>
        </div>

        <AddTaskForm onAddTask={handleAddTask} />

        <TaskStats tasks={tasks} onClearCompleted={handleClearCompleted} />

        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  )
}

export default App
