import { useReducer, useEffect, useState } from 'react'
import { AddTaskForm } from './components/AddTaskForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskList } from './components/TaskList'
import { TaskStats } from './components/TaskStats'
import { taskReducer } from './reducers/taskReducer'
import type { FilterStatus, Task } from './types/task'

const STORAGE_KEY = 'task-manager-tasks-reducer'

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
    title: 'Add search filter and union type tabs',
    completed: true,
  },
  {
    id: '6',
    title: 'Extract useLocalStorage generic custom hook',
    completed: true,
  },
  {
    id: '7',
    title: 'Refactor to useReducer with typed discriminated union actions',
    completed: false,
  },
]

// Lazy initializer for useReducer
function initTasks(defaultTasks: Task[]): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Task[]) : defaultTasks
  } catch {
    return defaultTasks
  }
}

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, INITIAL_TASKS, initTasks)
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Sync reducer state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (e) {
      console.warn('Could not save to localStorage', e)
    }
  }, [tasks])

  const handleAddTask = (title: string) => {
    dispatch({ type: 'ADD_TASK', payload: { title } })
  }

  const handleToggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { id } })
  }

  const handleDeleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } })
  }

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' })
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
            Feature 7: useReducer + Actions
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Discriminated Unions
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Task Reducer Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Predictable state updates with{' '}
            <code className="text-indigo-400 font-mono text-xs">
              useReducer
            </code>{' '}
            and typed{' '}
            <code className="text-indigo-400 font-mono text-xs">
              TaskAction
            </code>{' '}
            unions.
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
