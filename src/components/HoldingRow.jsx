import { useApp } from '../context/AppContext'
import {
  fmtBalance,
  fmtCompactCurrency,
  fmtFullCurrency,
  fmtFullPrice,
  fmtFullTokenAmount,
  fmtGain,
  fmtHoldings,
  fmtPrice,
} from '../utils/formatters'
import Tooltip from './Tooltip'

export default function HoldingRow({ holding }) {
  const { selectedIds, toggleHolding } = useApp()
  const isSelected = selectedIds.has(holding.id)
  const totalHoldings = holding.totalHoldings ?? holding.totalHolding

  return (
    <tr
      className={`border-b border-gray-100 dark:border-gray-700/60 cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-50 dark:bg-blue-900/20'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
      }`}
      onClick={() => toggleHolding(holding.id)}
    >
      <td className="pl-4 pr-2 py-4 w-10">
        <input
          type="checkbox"
          className="harvest-checkbox"
          checked={isSelected}
          onChange={() => toggleHolding(holding.id)}
          onClick={(event) => event.stopPropagation()}
        />
      </td>

      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 flex-shrink-0">
            <img
              src={holding.logo}
              alt={holding.coinName}
              className="h-8 w-8 rounded-full object-cover"
              onError={(event) => {
                event.currentTarget.classList.add('hidden')
                event.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
            <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-200">
              {holding.coin.replace('$', '').charAt(0)}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {holding.coinName}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{holding.coin}</div>
          </div>
        </div>
      </td>

      <td className="py-4 pr-4 text-right">
        <div className="text-sm text-gray-800 dark:text-gray-200">
          <Tooltip content={fmtFullTokenAmount(totalHoldings, holding.coin)} align="right">
            <span>{fmtHoldings(totalHoldings, holding.coin)}</span>
          </Tooltip>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          <Tooltip content={fmtFullCurrency(holding.averageBuyPrice)} align="right">
            <span>Avg {fmtCompactCurrency(holding.averageBuyPrice)}</span>
          </Tooltip>
        </div>
      </td>

      <td className="py-4 pr-4 text-right">
        <Tooltip content={fmtFullPrice(holding.currentPrice, holding.coin)} align="right">
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {fmtPrice(holding.currentPrice, holding.coin)}
          </span>
        </Tooltip>
      </td>

      <td className="py-4 pr-4 text-right">
        <GainValue value={holding.stcg.gain} />
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          <Tooltip content={fmtFullTokenAmount(holding.stcg.balance, holding.coin)} align="right">
            <span>{fmtBalance(holding.stcg.balance, holding.coin)}</span>
          </Tooltip>
        </div>
      </td>

      <td className="py-4 pr-4 text-right">
        <GainValue value={holding.ltcg.gain} />
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          <Tooltip content={fmtFullTokenAmount(holding.ltcg.balance, holding.coin)} align="right">
            <span>{fmtBalance(holding.ltcg.balance, holding.coin)}</span>
          </Tooltip>
        </div>
      </td>

      <td className="py-4 pr-4 text-right">
        {isSelected ? (
          <Tooltip content={fmtFullTokenAmount(totalHoldings, holding.coin)} align="right">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {fmtHoldings(totalHoldings, holding.coin)}
            </span>
          </Tooltip>
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-600">-</span>
        )}
      </td>
    </tr>
  )
}

function GainValue({ value }) {
  const colorClass =
    value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'

  return (
    <div className={`text-sm font-medium ${colorClass}`}>
      <Tooltip content={fmtFullCurrency(value, { showPositive: true })} align="right">
        <span>{fmtGain(value)}</span>
      </Tooltip>
    </div>
  )
}
