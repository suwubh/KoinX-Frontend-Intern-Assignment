import { useEffect, useRef, useState } from 'react'

export default function HowItWorksPopover() {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef(null)

  useEffect(() => {
    function handlePointerDown(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400 whitespace-nowrap"
        aria-expanded={open}
      >
        How it works?
      </button>

      {open && (
        <div
          className={[
            'absolute top-7 z-30',
            'left-0',
            'w-72 max-w-[calc(100vw-2rem)]',
            'rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600',
            'shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300',
          ].join(' ')}
          style={{ right: 'auto' }}
        >
          <div className="absolute -top-2 left-4 h-4 w-4 rotate-45 border-l border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 hidden sm:block" />

          <ul className="relative list-disc space-y-2 pl-4">
            <li>See your capital gains for FY 2024-25 in the left card.</li>
            <li>Select assets you plan to sell to reduce your tax liability.</li>
            <li>Watch the after-harvesting card update instantly.</li>
          </ul>

          <p className="relative mt-3 border-t border-gray-100 pt-3 dark:border-gray-700">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Pro tip:</span>{' '}
            Try different holding combinations to optimize your tax liability.
          </p>
        </div>
      )}
    </div>
  )
}