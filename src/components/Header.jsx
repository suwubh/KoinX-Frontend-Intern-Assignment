import { useApp } from '../context/AppContext'

export default function Header() {
  const { theme, toggleTheme } = useApp()

  return (
    <header className="bg-white dark:bg-[#0d1421] border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <KoinXLogo />

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5">
            <span className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300" />
            <span className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300" />
            <span className="w-5 h-0.5 bg-gray-600 dark:bg-gray-300" />
          </button>
        </div>
      </div>
    </header>
  )
}

function KoinXLogo() {
  return (
    <div className="flex items-center">
      <span className="text-[#1341F0] font-bold text-xl tracking-tight">Koin</span>
      <span className="relative">
        {/* The X with overlapping style */}
        <span className="text-[#F7931A] font-bold text-xl">X</span>
        <sup className="text-[#F7931A] text-[9px] font-semibold -top-2 relative">®</sup>
      </span>
    </div>
  )
}
