import { useApp } from '../context/AppContext'
import { fmtTotal } from '../utils/formatters'
import { getNetGains } from '../utils/calculations'
import { GainsTable } from './PreHarvestingCard'
import Spinner from './Spinner'

export default function AfterHarvestingCard() {
  const { capitalGains, afterGains, loading, error } = useApp()

  if (loading.gains) {
    return (
      <div className="bg-[#2563EB] rounded-2xl p-6 flex items-center justify-center min-h-[220px]">
        <Spinner light />
      </div>
    )
  }

  if (error.gains) {
    return (
      <div className="bg-[#2563EB] rounded-2xl p-6 flex items-center justify-center min-h-[220px]">
        <p className="text-white/80 text-sm">Failed to load data.</p>
      </div>
    )
  }

  // falls back to base gains when nothing is selected
  const displayGains = afterGains || capitalGains
  const preNet = getNetGains(capitalGains)
  const afterNet = getNetGains(displayGains)

  const saved = preNet.total - afterNet.total
  const showSavings = saved > 0

  return (
    <div className="bg-[#2563EB] rounded-2xl p-6 shadow-sm">
      <h2 className="text-base font-bold text-white mb-5">After Harvesting</h2>

      <GainsTable gains={displayGains} dark />

      <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Effective Capital Gains:</span>
        <span className="text-2xl font-bold text-white">{fmtTotal(afterNet.total)}</span>
      </div>

      {showSavings && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-base">🎉</span>
          <p className="text-sm text-white">
            You are going to save upto{' '}
            <span className="font-semibold">{fmtTotal(saved)}</span>
          </p>
        </div>
      )}
    </div>
  )
}
