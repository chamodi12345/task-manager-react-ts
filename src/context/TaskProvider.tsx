import { useReducer, useEffect, useState, type ReactNode } from 'react'
import { taskReducer } from '../reducers/taskReducer'
import type { FilterStatus, Task } from '../types/task'
import { TaskContext, type TaskContextType } from './TaskContext'

const STORAGE_KEY = 'task-manager-tasks-context'

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
    completed: true,
  },
  {
    id: '8',
    title: 'Implement React Context API to avoid prop drilling',
    completed: false,
  },
]

function initTasks(defaultTasks: Task[]): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Task[]) : defaultTasks
  } catch {
    return defaultTasks
  }
}

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, dispatch] = useReducer(taskReducer, INITIAL_TASKS, initTasks)
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (e) {
      console.warn('Could not save to localStorage', e)
    }
  }, [tasks])

  const addTask = (title: string) => {
    dispatch({ type: 'ADD_TASK', payload: { title } })
  }

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { id } })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } })
  }

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' })
  }

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

  const value: TaskContextType = {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    counts,
    dispatch,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
