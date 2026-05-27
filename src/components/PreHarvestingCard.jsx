import { useApp } from '../context/AppContext'
import { fmtCardValue, fmtTotal } from '../utils/formatters'
import { getNetGains } from '../utils/calculations'
import Spinner from './Spinner'

export default function PreHarvestingCard() {
  const { capitalGains, loading, error } = useApp()

  if (loading.gains) {
    return (
      <div className="bg-white dark:bg-[#1a2438] rounded-2xl p-6 flex items-center justify-center min-h-[220px]">
        <Spinner />
      </div>
    )
  }

  if (error.gains) {
    return (
      <div className="bg-white dark:bg-[#1a2438] rounded-2xl p-6 flex items-center justify-center min-h-[220px]">
        <p className="text-red-500 text-sm">Failed to load capital gains data.</p>
      </div>
    )
  }

  const { stcgNet, ltcgNet, total } = getNetGains(capitalGains)

  return (
    <div className="bg-white dark:bg-[#1a2438] rounded-2xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Pre Harvesting</h2>

      <GainsTable gains={capitalGains} />

      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Realised Capital Gains:
        </span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {fmtTotal(total)}
        </span>
      </div>
    </div>
  )
}

export function GainsTable({ gains, dark = false }) {
  const { stcgNet, ltcgNet } = getNetGains(gains)

  const textClass = dark ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
  const labelClass = dark ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'
  const valueClass = dark ? 'text-white' : 'text-gray-900 dark:text-white'
  const netClass = dark ? 'text-white font-semibold' : 'text-gray-900 dark:text-white font-semibold'

  return (
    <div>
      {/* column headers */}
      <div className="grid grid-cols-3 mb-2">
        <div />
        <div className={`text-xs font-medium text-right ${textClass}`}>Short-term</div>
        <div className={`text-xs font-medium text-right ${textClass}`}>Long-term</div>
      </div>

      {/* Profits row */}
      <div className="grid grid-cols-3 py-2">
        <span className={`text-sm ${labelClass}`}>Profits</span>
        <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(gains.stcg.profits)}</span>
        <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(gains.ltcg.profits)}</span>
      </div>

      {/* Losses row */}
      <div className="grid grid-cols-3 py-2">
        <span className={`text-sm ${labelClass}`}>Losses</span>
        <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(-gains.stcg.losses)}</span>
        <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(-gains.ltcg.losses)}</span>
      </div>

      {/* Net Capital Gains row */}
      <div className="grid grid-cols-3 py-2">
        <span className={`text-sm ${labelClass}`}>Net Capital Gains</span>
        <span className={`text-sm text-right ${netClass}`}>{fmtCardValue(stcgNet)}</span>
        <span className={`text-sm text-right ${netClass}`}>{fmtCardValue(ltcgNet)}</span>
      </div>
    </div>
  )
}
