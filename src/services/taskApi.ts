import type { Task } from '../types/task'

export interface ApiTodo {
  userId: number
  id: number
  title: string
  completed: boolean
}

/**
 * Fetches sample tasks from JSONPlaceholder and adapts them to our Task interface.
 */
export async function fetchRemoteTasks(limit: number = 5): Promise<Task[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`,
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch tasks: ${response.status} ${response.statusText}`,
    )
  }

  const data = (await response.json()) as ApiTodo[]

  // Map ApiTodo to our app's Task interface
  return data.map((todo) => ({
    id: `remote-${todo.id}`,
    title: todo.title.charAt(0).toUpperCase() + todo.title.slice(1),
    completed: todo.completed,
  }))
}
