import { describe, it, expect } from 'vitest'
import { taskReducer, type TaskAction } from './taskReducer'
import type { Task } from '../types/task'

describe('taskReducer', () => {
  const initialTasks: Task[] = [
    { id: '1', title: 'Task One', completed: false },
    { id: '2', title: 'Task Two', completed: true },
  ]

  it('should handle ADD_TASK by prepending a new task', () => {
    const action: TaskAction = {
      type: 'ADD_TASK',
      payload: { title: 'New Task' },
    }
    const state = taskReducer(initialTasks, action)

    expect(state).toHaveLength(3)
    expect(state[0].title).toBe('New Task')
    expect(state[0].completed).toBe(false)
    expect(state[0].id).toBeDefined()
  })

  it('should handle TOGGLE_TASK by inverting completed status', () => {
    const action: TaskAction = {
      type: 'TOGGLE_TASK',
      payload: { id: '1' },
    }
    const state = taskReducer(initialTasks, action)

    expect(state.find((t) => t.id === '1')?.completed).toBe(true)
    expect(state.find((t) => t.id === '2')?.completed).toBe(true)
  })

  it('should handle DELETE_TASK by removing the task with matching id', () => {
    const action: TaskAction = {
      type: 'DELETE_TASK',
      payload: { id: '1' },
    }
    const state = taskReducer(initialTasks, action)

    expect(state).toHaveLength(1)
    expect(state.find((t) => t.id === '1')).toBeUndefined()
    expect(state[0].id).toBe('2')
  })

  it('should handle CLEAR_COMPLETED by filtering out all completed tasks', () => {
    const action: TaskAction = {
      type: 'CLEAR_COMPLETED',
    }
    const state = taskReducer(initialTasks, action)

    expect(state).toHaveLength(1)
    expect(state[0].id).toBe('1')
    expect(state.every((t) => !t.completed)).toBe(true)
  })

  it('should handle SET_TASKS by replacing the entire task array', () => {
    const replacement: Task[] = [
      { id: '99', title: 'Replaced Task', completed: false },
    ]
    const action: TaskAction = {
      type: 'SET_TASKS',
      payload: { tasks: replacement },
    }
    const state = taskReducer(initialTasks, action)

    expect(state).toEqual(replacement)
  })
})
