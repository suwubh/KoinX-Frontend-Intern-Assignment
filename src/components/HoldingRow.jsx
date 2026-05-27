import { useApp } from '../context/AppContext'
import { fmtGain, fmtBalance, fmtHoldings, fmtPrice, fmtMarketValue } from '../utils/formatters'

export default function HoldingRow({ holding }) {
  const { selectedIds, toggleHolding } = useApp()
  const isSelected = selectedIds.has(holding.id)

  const totalValue = holding.totalHoldings * holding.currentPrice

  return (
    <tr
      className={`border-b border-gray-100 dark:border-gray-700/60 cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-50 dark:bg-blue-900/20'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
      }`}
      onClick={() => toggleHolding(holding.id)}
    >
      {/* Checkbox */}
      <td className="pl-4 pr-2 py-4 w-10">
        <input
          type="checkbox"
          className="harvest-checkbox"
          checked={isSelected}
          onChange={() => toggleHolding(holding.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </td>

      {/* Asset */}
      <td className="py-4 pr-4">
        <div className="flex items-center gap-3">
          <img
            src={holding.logo}
            alt={holding.coinName}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {holding.coinName}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{holding.coin}</div>
          </div>
        </div>
      </td>

      {/* Holdings / Current Market Rate */}
      <td className="py-4 pr-4 text-right">
        <div className="text-sm text-gray-800 dark:text-gray-200">
          {fmtHoldings(holding.totalHoldings, holding.coin)}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {fmtPrice(holding.currentPrice, holding.coin)}
        </div>
      </td>

      {/* Total Current Value */}
      <td className="py-4 pr-4 text-right">
        <span className="text-sm text-gray-800 dark:text-gray-200">
          {fmtMarketValue(totalValue)}
        </span>
      </td>

      {/* Short-term gain */}
      <td className="py-4 pr-4 text-right">
        <div
          className={`text-sm font-medium ${
            holding.stcg.gain >= 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-500 dark:text-red-400'
          }`}
        >
          {fmtGain(holding.stcg.gain)}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {fmtBalance(holding.stcg.balance, holding.coin)}
        </div>
      </td>

      {/* Long-term gain */}
      <td className="py-4 pr-4 text-right">
        <div
          className={`text-sm font-medium ${
            holding.ltcg.gain >= 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-500 dark:text-red-400'
          }`}
        >
          {fmtGain(holding.ltcg.gain)}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          {fmtBalance(holding.ltcg.balance, holding.coin)}
        </div>
      </td>

      {/* Amount to Sell */}
      <td className="py-4 pr-4 text-right">
        {isSelected ? (
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {fmtHoldings(holding.totalHoldings, holding.coin)}
          </span>
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-600">-</span>
        )}
      </td>
    </tr>
  )
}
