import { useState } from 'react'
import { TaskItem } from './components/TaskItem'
import type { Task } from './types/task'

function App() {
  const [sampleTask, setSampleTask] = useState<Task>({
    id: '1',
    title: 'Learn TypeScript interfaces and React component props',
    completed: false,
  })

  const [completedTask, setCompletedTask] = useState<Task>({
    id: '2',
    title: 'Setup Vite + React + Tailwind v4 project',
    completed: true,
  })

  const handleToggleSample = () => {
    setSampleTask((prev) => ({ ...prev, completed: !prev.completed }))
  }

  const handleToggleCompleted = () => {
    setCompletedTask((prev) => ({ ...prev, completed: !prev.completed }))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            Feature 1: TaskItem Component
          </div>
          <span className="text-xs text-slate-500 font-mono">React + TS</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Task Item Component
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Component with strongly typed props (
            <code className="text-indigo-400 font-mono text-xs">
              TaskItemProps
            </code>
            ).
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <TaskItem
            task={sampleTask}
            onToggle={handleToggleSample}
            onDelete={() => alert('Delete clicked for: ' + sampleTask.title)}
          />
          <TaskItem
            task={completedTask}
            onToggle={handleToggleCompleted}
            onDelete={() => alert('Delete clicked for: ' + completedTask.title)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
