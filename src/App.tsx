import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { TaskProvider } from './context/TaskProvider'
import { AboutPage } from './pages/AboutPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { TasksPage } from './pages/TasksPage'

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 selection:bg-indigo-500 selection:text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
