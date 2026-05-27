import { useApp } from '../context/AppContext'
import { fmtTotal } from '../utils/formatters'
import { getNetGains } from '../utils/calculations'
import { GainsTable } from './GainsTable'
import Spinner from './Spinner'

export default function PreHarvestingCard() {
  const { capitalGains, loading, error } = useApp()

  if (loading.gains) {
    return (
      <div className="bg-white dark:bg-[#171f2f] rounded-2xl p-6 flex items-center justify-center min-h-[220px] min-w-0">
        <Spinner />
      </div>
    )
  }

  if (error.gains) {
    return (
      <div className="bg-white dark:bg-[#171f2f] rounded-2xl p-6 flex items-center justify-center min-h-[220px] min-w-0">
        <p className="text-red-500 text-sm">Failed to load capital gains data.</p>
      </div>
    )
  }

  const { total } = getNetGains(capitalGains)

  return (
    <div className="bg-white dark:bg-[#171f2f] rounded-2xl p-5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
      <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Pre Harvesting</h2>

      <GainsTable gains={capitalGains} />

      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/20 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-white">
          Realised Capital Gains:
        </span>
        <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-right">
          {fmtTotal(total)}
        </span>
      </div>
    </div>
  )
}