import { createContext } from 'react'
import type { TaskAction } from '../reducers/taskReducer'
import type { FilterStatus, Task } from '../types/task'

export interface TaskContextType {
  tasks: Task[]
  filteredTasks: Task[]
  filter: FilterStatus
  setFilter: (filter: FilterStatus) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  counts: {
    all: number
    active: number
    completed: number
  }
  dispatch: React.ActionDispatch<[action: TaskAction]>
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  clearCompleted: () => void
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)
