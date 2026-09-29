import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AddTaskForm } from './AddTaskForm'

describe('AddTaskForm component', () => {
  it('renders input field and submit button', () => {
    render(<AddTaskForm onAddTask={vi.fn()} />)

    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('shows error when submitting empty input', () => {
    const handleAddTask = vi.fn()
    render(<AddTaskForm onAddTask={handleAddTask} />)

    const submitBtn = screen.getByRole('button', { name: /add/i })
    fireEvent.click(submitBtn)

    expect(screen.getByText(/task title cannot be empty/i)).toBeInTheDocument()
    expect(handleAddTask).not.toHaveBeenCalled()
  })

  it('submits valid task and clears the input field', () => {
    const handleAddTask = vi.fn()
    render(<AddTaskForm onAddTask={handleAddTask} />)

    const input = screen.getByPlaceholderText(
      /add a new task/i,
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Master Vitest in React' } })

    const submitBtn = screen.getByRole('button', { name: /add/i })
    fireEvent.click(submitBtn)

    expect(handleAddTask).toHaveBeenCalledWith('Master Vitest in React')
    expect(input.value).toBe('')
  })
})
