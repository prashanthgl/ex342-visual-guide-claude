// Layout.jsx — the shell that every page shares.
// Outlet is a React Router v6 concept: it renders whichever child route matches.
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Menu, X } from 'lucide-react'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-surface-0">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed z-30 inset-y-0 left-0 w-72 flex-shrink-0 transform transition-transform duration-200
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar (mobile only) */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-surface-1">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded hover:bg-surface-3 text-gray-400"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold text-rh-red text-sm tracking-wide">EX342 Visual Guide</span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
