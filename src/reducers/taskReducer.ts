import type { Task } from '../types/task'

export type TaskAction =
  | { type: 'ADD_TASK'; payload: { title: string } }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_TASKS'; payload: { tasks: Task[] } }

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        completed: false,
      }
      return [newTask, ...state]
    }

    case 'TOGGLE_TASK': {
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task,
      )
    }

    case 'DELETE_TASK': {
      return state.filter((task) => task.id !== action.payload.id)
    }

    case 'CLEAR_COMPLETED': {
      return state.filter((task) => !task.completed)
    }

    case 'SET_TASKS': {
      return action.payload.tasks
    }

    default:
      return state
  }
}
