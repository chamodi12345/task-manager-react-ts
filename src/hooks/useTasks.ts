import { useContext } from 'react'
import { TaskContext, type TaskContextType } from '../context/TaskContext'

/**
 * Custom hook to safely consume the TaskContext
 */
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}
