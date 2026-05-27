import { useState } from 'react'

const disclaimers = [
  'Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.',
  'Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.',
  'Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.',
  'Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.',
  'Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.',
]

export default function DisclaimerAccordion() {
  const [open, setOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="border border-blue-400 dark:border-blue-500 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-white dark:bg-[#1a2438] text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2.5">
          {/* Info icon with tooltip */}
          <div
            className="relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-500 text-xs font-bold leading-none">i</span>
            </div>

            {showTooltip && (
              <div className="absolute left-7 top-1/2 -translate-y-1/2 z-20 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-sm text-gray-600 dark:text-gray-300">
                Tax loss harvesting lets you sell assets at a loss to offset capital gains and reduce your tax bill.{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Know More
                </a>
              </div>
            )}
          </div>

          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Important Notes & Disclaimers
          </span>
        </div>

        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="px-5 pb-4 pt-1 bg-white dark:bg-[#1a2438]">
          <ul className="space-y-2">
            {disclaimers.map((text, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}
