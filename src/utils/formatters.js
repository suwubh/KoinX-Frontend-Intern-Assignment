const CURRENCY = '\u20B9'

function signedPrefix(amount, showPositive = false) {
  if (amount < 0) return '-'
  return showPositive && amount > 0 ? '+' : ''
}

function formatNumber(value, options = {}) {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: options.minimumFractionDigits ?? 2,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  })
}

export function fmtCardValue(amount) {
  const abs = Math.abs(amount)
  const formatted = formatNumber(abs, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  return amount < 0 ? `- ${CURRENCY} ${formatted}` : `${CURRENCY} ${formatted}`
}

export function fmtTotal(amount) {
  const abs = Math.abs(amount)
  const formatted = formatNumber(abs, { minimumFractionDigits: 0, maximumFractionDigits: 2 })
  return amount < 0 ? `-${CURRENCY}${formatted}` : `${CURRENCY}${formatted}`
}

export function fmtCompactCurrency(amount, { showPositive = false } = {}) {
  const abs = Math.abs(amount)
  const prefix = signedPrefix(amount, showPositive)

  if (abs >= 1_000_000_000) {
    return `${prefix}${CURRENCY}${(abs / 1_000_000_000).toFixed(2)}B`
  }

  if (abs >= 1_000_000) {
    return `${prefix}${CURRENCY}${(abs / 1_000_000).toFixed(2)}M`
  }

  if (abs >= 1_000) {
    return `${prefix}${CURRENCY}${(abs / 1_000).toFixed(2)}K`
  }

  if (abs > 0 && abs < 0.01) {
    return `${prefix}< ${CURRENCY}0.01`
  }

  return `${prefix}${CURRENCY}${formatNumber(abs)}`
}

export function fmtFullCurrency(amount, { showPositive = false } = {}) {
  const prefix = signedPrefix(amount, showPositive)
  const abs = Math.abs(amount)
  const maxDecimals = abs > 0 && abs < 1 ? 18 : 2
  const minDecimals = abs === 0 || abs >= 1 ? 2 : 0

  return `${prefix}${CURRENCY}${formatNumber(abs, {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  })}`
}

export function fmtGain(amount) {
  return fmtCompactCurrency(amount, { showPositive: true })
}

function fmtTokenAmount(amount, coin) {
  const abs = Math.abs(amount)
  const decimals = abs >= 1000 ? 2 : abs >= 1 ? 4 : 6
  const rounded = Number(amount.toFixed(decimals))

  if (abs > 0 && Math.abs(rounded) === 0) {
    return `< ${Math.pow(10, -decimals)} ${coin}`
  }

  return `${parseFloat(rounded.toFixed(decimals))} ${coin}`
}

export function fmtFullTokenAmount(amount, coin) {
  return `${amount.toLocaleString('en-US', { maximumFractionDigits: 18 })} ${coin}`
}

export function fmtBalance(amount, coin) {
  return fmtTokenAmount(amount, coin)
}

export function fmtHoldings(amount, coin) {
  return fmtTokenAmount(amount, coin)
}

export function fmtPrice(price, coin) {
  return `${fmtCompactCurrency(price)}/${coin}`
}

export function fmtFullPrice(price, coin) {
  return `${fmtFullCurrency(price)}/${coin}`
}
