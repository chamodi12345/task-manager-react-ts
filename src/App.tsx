import { AddTaskForm } from './components/AddTaskForm'
import { TaskFilter } from './components/TaskFilter'
import { TaskList } from './components/TaskList'
import { TaskStats } from './components/TaskStats'
import { TaskProvider } from './context/TaskProvider'
import { useTasks } from './hooks/useTasks'

function TaskManagerContent() {
  const {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    counts,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  } = useTasks()

  return (
    <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          Feature 8: React Context API
        </div>
        <span className="text-xs text-slate-500 font-mono">
          useTasks() Hook
        </span>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Context-Powered Tasks
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Global state without prop drilling using{' '}
          <code className="text-indigo-400 font-mono text-xs">
            createContext
          </code>{' '}
          & custom{' '}
          <code className="text-indigo-400 font-mono text-xs">useTasks()</code>.
        </p>
      </div>

      <AddTaskForm onAddTask={addTask} />

      <TaskStats tasks={tasks} onClearCompleted={clearCompleted} />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
      />

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-indigo-500 selection:text-white">
        <TaskManagerContent />
      </div>
    </TaskProvider>
  )
}

export default App
