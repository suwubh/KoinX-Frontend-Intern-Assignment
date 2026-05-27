import { useApp } from '../context/AppContext'
import { fmtCardValue, fmtTotal } from '../utils/formatters'
import { getNetGains } from '../utils/calculations'
import Spinner from './Spinner'

export default function PreHarvestingCard() {
  const { capitalGains, loading, error } = useApp()

  if (loading.gains) {
    return (
      <div className="bg-[#171f2f] rounded-2xl p-6 flex items-center justify-center min-h-[220px] min-w-0">
        <Spinner light />
      </div>
    )
  }

  if (error.gains) {
    return (
      <div className="bg-[#171f2f] rounded-2xl p-6 flex items-center justify-center min-h-[220px] min-w-0">
        <p className="text-white/80 text-sm">Failed to load capital gains data.</p>
      </div>
    )
  }

  const { total } = getNetGains(capitalGains)

  return (
    <div className="bg-[#171f2f] rounded-2xl p-5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
      <h2 className="text-base font-bold text-white mb-5">Pre Harvesting</h2>

      <GainsTable gains={capitalGains} dark />

      <div className="mt-5 pt-4 border-t border-white/20 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-white">
          Realised Capital Gains:
        </span>
        <span className="text-xl sm:text-2xl font-bold text-white text-right">
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
      <div className="space-y-4 sm:hidden">
        <MobileGainGroup
          title="Short-term"
          labelClass={labelClass}
          textClass={textClass}
          valueClass={valueClass}
          netClass={netClass}
          profits={gains.stcg.profits}
          losses={gains.stcg.losses}
          net={stcgNet}
        />
        <MobileGainGroup
          title="Long-term"
          labelClass={labelClass}
          textClass={textClass}
          valueClass={valueClass}
          netClass={netClass}
          profits={gains.ltcg.profits}
          losses={gains.ltcg.losses}
          net={ltcgNet}
        />
      </div>

      <div className="hidden sm:block">
        <div className="grid grid-cols-3 mb-2">
          <div />
          <div className={`text-xs font-medium text-right ${textClass}`}>Short-term</div>
          <div className={`text-xs font-medium text-right ${textClass}`}>Long-term</div>
        </div>

        <div className="grid grid-cols-3 py-2">
          <span className={`text-sm ${labelClass}`}>Profits</span>
          <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(gains.stcg.profits)}</span>
          <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(gains.ltcg.profits)}</span>
        </div>

        <div className="grid grid-cols-3 py-2">
          <span className={`text-sm ${labelClass}`}>Losses</span>
          <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(-gains.stcg.losses)}</span>
          <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(-gains.ltcg.losses)}</span>
        </div>

        <div className="grid grid-cols-3 py-2">
          <span className={`text-sm ${labelClass}`}>Net Capital Gains</span>
          <span className={`text-sm text-right ${netClass}`}>{fmtCardValue(stcgNet)}</span>
          <span className={`text-sm text-right ${netClass}`}>{fmtCardValue(ltcgNet)}</span>
        </div>
      </div>
    </div>
  )
}

function MobileGainGroup({ title, labelClass, textClass, valueClass, netClass, profits, losses, net }) {
  return (
    <div>
      <div className={`text-xs font-medium ${textClass}`}>{title}</div>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <span className={`text-sm ${labelClass}`}>Profits</span>
          <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(profits)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className={`text-sm ${labelClass}`}>Losses</span>
          <span className={`text-sm text-right ${valueClass}`}>{fmtCardValue(-losses)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className={`text-sm ${labelClass}`}>Net Capital Gains</span>
          <span className={`text-sm text-right ${netClass}`}>{fmtCardValue(net)}</span>
        </div>
      </div>
    </div>
  )
}
