import { useEffect, useMemo, useRef, useState } from 'react'
import { useApp } from '../context/AppContext'
import HoldingRow from './HoldingRow'
import Spinner from './Spinner'

const DEFAULT_VISIBLE = 4

export default function HoldingsTable() {
  const { holdings, selectedIds, toggleAll, loading, error } = useApp()
  const [showAll, setShowAll] = useState(false)
  const [sortKey, setSortKey] = useState('impact')
  const [sortDir, setSortDir] = useState('desc')

  const sortedHoldings = useMemo(() => {
    return [...holdings].sort((a, b) => {
      const aValue = getSortValue(a, sortKey)
      const bValue = getSortValue(b, sortKey)
      const diff = aValue - bValue

      return sortDir === 'desc' ? -diff : diff
    })
  }, [holdings, sortDir, sortKey])

  const visibleHoldings = showAll ? sortedHoldings : sortedHoldings.slice(0, DEFAULT_VISIBLE)
  const hasMore = sortedHoldings.length > DEFAULT_VISIBLE

  const allSelected =
    sortedHoldings.length > 0 && sortedHoldings.every((h) => selectedIds.has(h.id))
  const someSelected =
    !allSelected && sortedHoldings.some((h) => selectedIds.has(h.id))

  const headerCheckboxRef = useRef(null)
  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = someSelected
    }
  }, [someSelected])

  function handleSort(key) {
    if (sortKey === key) {
      setSortDir((direction) => (direction === 'desc' ? 'asc' : 'desc'))
      return
    }

    setSortKey(key)
    setSortDir('desc')
  }

  return (
    <div className="w-full min-w-0 bg-white dark:bg-[#1a2438] rounded-2xl shadow-sm overflow-hidden">
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
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700/60">
                  <th className="pl-4 pr-2 py-3 w-10">
                    <input
                      ref={headerCheckboxRef}
                      type="checkbox"
                      className="harvest-checkbox"
                      checked={allSelected}
                      onChange={() => toggleAll(sortedHoldings)}
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
                      Avg Buy Price
                    </div>
                  </th>
                  <th className="py-3 pr-4 text-right">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Current Price
                    </span>
                  </th>
                  <SortableHeader
                    active={sortKey === 'stcg'}
                    direction={sortDir}
                    label="Short-term"
                    onClick={() => handleSort('stcg')}
                  />
                  <SortableHeader
                    active={sortKey === 'ltcg'}
                    direction={sortDir}
                    label="Long-term"
                    onClick={() => handleSort('ltcg')}
                  />
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
                type="button"
                onClick={() => setShowAll((value) => !value)}
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

function getSortValue(holding, sortKey) {
  if (sortKey === 'stcg') return holding.stcg.gain
  if (sortKey === 'ltcg') return holding.ltcg.gain

  return Math.abs(holding.stcg.gain) + Math.abs(holding.ltcg.gain)
}

function SortableHeader({ active, direction, label, onClick }) {
  return (
    <th className="py-3 pr-4 text-right">
      <button
        type="button"
        onClick={onClick}
        className="ml-auto flex items-center justify-end gap-1 text-xs font-semibold text-gray-500 uppercase tracking-wide transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon active={active} direction={direction} />
      </button>
    </th>
  )
}

function SortIcon({ active, direction }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      className={active ? 'text-blue-500' : 'text-gray-400'}
      stroke="currentColor"
      strokeWidth={2}
    >
      {active && direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      )}
    </svg>
  )
}
