import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TaskItem } from './TaskItem'
import type { Task } from '../types/task'

describe('TaskItem component', () => {
  const mockTask: Task = {
    id: 'test-1',
    title: 'Write automated tests with Vitest',
    completed: false,
  }

  it('renders task title and pending badge', () => {
    render(<TaskItem task={mockTask} />)

    expect(
      screen.getByText('Write automated tests with Vitest'),
    ).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('calls onToggle when checkbox is clicked', () => {
    const handleToggle = vi.fn()
    render(<TaskItem task={mockTask} onToggle={handleToggle} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(handleToggle).toHaveBeenCalledWith('test-1')
  })

  it('calls onDelete when delete button is clicked', () => {
    const handleDelete = vi.fn()
    render(<TaskItem task={mockTask} onDelete={handleDelete} />)

    const deleteBtn = screen.getByRole('button', { name: /delete task/i })
    fireEvent.click(deleteBtn)

    expect(handleDelete).toHaveBeenCalledWith('test-1')
  })

  it('displays completed styling and badge when task is completed', () => {
    const completedTask: Task = { ...mockTask, completed: true }
    render(<TaskItem task={completedTask} />)

    expect(screen.getByText('Completed')).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })
})
