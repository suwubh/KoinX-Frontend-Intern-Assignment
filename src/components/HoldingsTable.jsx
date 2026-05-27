import { useState, useRef, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import HoldingRow from './HoldingRow'
import Spinner from './Spinner'

const DEFAULT_VISIBLE = 4

export default function HoldingsTable() {
  const { holdings, selectedIds, toggleAll, loading, error } = useApp()
  const [showAll, setShowAll] = useState(false)

  const visibleHoldings = showAll ? holdings : holdings.slice(0, DEFAULT_VISIBLE)
  const hasMore = holdings.length > DEFAULT_VISIBLE

  // figure out header checkbox state
  const allVisibleSelected =
    visibleHoldings.length > 0 && visibleHoldings.every((h) => selectedIds.has(h.id))
  const someVisibleSelected =
    !allVisibleSelected && visibleHoldings.some((h) => selectedIds.has(h.id))

  const headerCheckboxRef = useRef(null)
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someVisibleSelected
    }
  }, [someVisibleSelected])

  return (
    <div className="bg-white dark:bg-[#1a2438] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="text-base font-bold text-gray-900 dark:text-white">Holdings</h2>
      </div>

      {loading.holdings ? (
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      ) : error.holdings ? (
        <div className="flex items-center justify-center py-16">
          <p className="text-red-500 text-sm">Failed to load holdings.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700/60">
                  <th className="pl-4 pr-2 py-3 w-10">
                    <input
                      ref={headerCheckboxRef}
                      type="checkbox"
                      className="harvest-checkbox"
                      checked={allVisibleSelected}
                      onChange={() => toggleAll(visibleHoldings)}
                    />
                  </th>
                  <th className="py-3 pr-4 text-left">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Asset
                    </span>
                  </th>
                  <th className="py-3 pr-4 text-right">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Holdings
                    </div>
                    <div className="text-[10px] font-normal text-gray-400 dark:text-gray-500 normal-case tracking-normal">
                      Current Market Rate
                    </div>
                  </th>
                  <th className="py-3 pr-4 text-right">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Total Current Value
                    </span>
                  </th>
                  <th className="py-3 pr-4 text-right">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Short-term
                    </span>
                  </th>
                  <th className="py-3 pr-4 text-right">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Long-Term
                    </span>
                  </th>
                  <th className="py-3 pr-4 text-right">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Amount to Sell
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleHoldings.map((holding) => (
                  <HoldingRow key={holding.id} holding={holding} />
                ))}
              </tbody>
            </table>
          </div>

          {hasMore && (
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700/60">
              <button
                onClick={() => setShowAll((s) => !s)}
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                {showAll ? 'View less' : 'View all'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
