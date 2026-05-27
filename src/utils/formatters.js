// Formats a dollar amount for the gains cards: "$ 1,540" / "- $ 743"
export function fmtCardValue(amount) {
  const abs = Math.abs(amount)
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return amount < 0 ? `- $ ${formatted}` : `$ ${formatted}`
}

// Formats large amounts for the "Realised/Effective Capital Gains" line
export function fmtTotal(amount) {
  const abs = Math.abs(amount)
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return amount < 0 ? `- $${formatted}` : `$${formatted}`
}

// Formats gain/loss for table cells: "+$2,400" / "-$1,200"
export function fmtGain(amount) {
  const abs = Math.abs(amount)
  const formatted = abs.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return amount < 0 ? `-$${formatted}` : `+$${formatted}`
}

// Formats coin balance for table sub-text: "0.338 BTC"
export function fmtBalance(amount, coin) {
  const decimals = amount >= 100 ? 2 : amount >= 1 ? 4 : 6
  return `${parseFloat(amount.toFixed(decimals))} ${coin}`
}

// Formats holdings amount for the holdings column
export function fmtHoldings(amount, coin) {
  const decimals = amount >= 1000 ? 2 : amount >= 1 ? 4 : 6
  return `${parseFloat(amount.toFixed(decimals))} ${coin}`
}

// Formats price per coin: "$85,320.15/BTC"
export function fmtPrice(price, coin) {
  const formatted = price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `$ ${formatted}/${coin}`
}

// Formats total market value: "$55,320.15"
export function fmtMarketValue(value) {
  return `$ ${value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
