import { useState } from 'react'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskList } from './components/TaskList'
import { TaskStats } from './components/TaskStats'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { FilterStatus, Task } from './types/task'

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
    title: 'Lift state up and handle toggle and delete',
    completed: true,
  },
  {
    id: '5',
    title: 'Add search filter and union type tabs (all/active/completed)',
    completed: true,
  },
  {
    id: '6',
    title: 'Extract useLocalStorage<T> generic hook and persist tasks',
    completed: false,
  },
]

function App() {
  // Use our custom generic useLocalStorage hook
  const [tasks, setTasks] = useLocalStorage<Task[]>(
    'task-manager-tasks',
    INITIAL_TASKS,
  )
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

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

  // Filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'active'
          ? !task.completed
          : task.completed
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim())
    return matchesFilter && matchesSearch
  })

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Feature 6: Custom Hook & Persistence
          </div>
          <span className="text-xs text-slate-500 font-mono">
            useLocalStorage&lt;T&gt;
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Task Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Persisted in localStorage with generic custom hook (
            <code className="text-indigo-400 font-mono text-xs">
              useLocalStorage&lt;Task[]&gt;
            </code>
            ).
          </p>
        </div>

        <AddTaskForm onAddTask={handleAddTask} />

        <TaskStats tasks={tasks} onClearCompleted={handleClearCompleted} />

        <TaskFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  )
}

export default App
