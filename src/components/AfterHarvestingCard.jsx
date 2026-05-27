import { useApp } from '../context/AppContext'
import { fmtTotal } from '../utils/formatters'
import { getNetGains } from '../utils/calculations'
import { GainsTable } from './GainsTable'
import Spinner from './Spinner'

export default function AfterHarvestingCard() {
  const { capitalGains, afterGains, loading, error } = useApp()

  if (loading.gains) {
    return (
      <div className="bg-[#2563EB] rounded-2xl p-6 flex items-center justify-center min-h-[220px] min-w-0">
        <Spinner light />
      </div>
    )
  }

  if (error.gains) {
    return (
      <div className="bg-[#2563EB] rounded-2xl p-6 flex items-center justify-center min-h-[220px] min-w-0">
        <p className="text-white/80 text-sm">Failed to load data.</p>
      </div>
    )
  }

  if (!capitalGains || !afterGains) return null

  const preNet = getNetGains(capitalGains)
  const afterNet = getNetGains(afterGains)
  const saved = preNet.total - afterNet.total
  const showSavings = saved > 0

  return (
    <div className="bg-[#2563EB] rounded-2xl p-5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
      <h2 className="text-base font-bold text-white mb-5">After Harvesting</h2>

      <GainsTable gains={afterGains} dark />

      <div className="mt-5 pt-4 border-t border-white/20 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-white">Effective Capital Gains:</span>
        <span className="text-xl sm:text-2xl font-bold text-white text-right">
          {fmtTotal(afterNet.total)}
        </span>
      </div>

      {showSavings && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base leading-none">🎉</span>
          <p className="text-sm text-white">
            You are going to save upto{' '}
            <span className="font-semibold">{fmtTotal(saved)}</span>
          </p>
        </div>
      )}
    </div>
  )
}