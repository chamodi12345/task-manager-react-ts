import { AddTaskForm } from '../components/AddTaskForm'
import { TaskFilter } from '../components/TaskFilter'
import { TaskList } from '../components/TaskList'
import { TaskStats } from '../components/TaskStats'
import { useTasks } from '../hooks/useTasks'

export const TasksPage = () => {
  const {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    counts,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    loadRemoteTasks,
  } = useTasks()

  return (
    <div className="w-full max-w-lg bg-slate-900/60 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          Feature 10: React Router
        </div>

        <button
          onClick={loadRemoteTasks}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-0.5 w-3.5 h-3.5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Fetching...</span>
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span>Fetch Demo Tasks</span>
            </>
          )}
        </button>
      </div>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Task Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your day-to-day tasks with real-time filtering and status
          tracking.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button
            onClick={loadRemoteTasks}
            className="underline font-semibold hover:text-rose-300"
          >
            Retry
          </button>
        </div>
      )}

      <AddTaskForm onAddTask={addTask} />

      <TaskStats tasks={tasks} onClearCompleted={clearCompleted} />

      <TaskFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
      />

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 animate-pulse flex items-center justify-between"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-5 h-5 bg-slate-800 rounded-md" />
                <div className="h-4 bg-slate-800 rounded w-2/3" />
              </div>
              <div className="w-16 h-5 bg-slate-800 rounded-full" />
            </div>
          ))}
        </div>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      )}
    </div>
  )
}
