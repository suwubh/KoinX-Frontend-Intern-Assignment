// Simulates a network call. The shape here matches what a real API would return.
const data = {
  capitalGains: {
    stcg: { profits: 1540, losses: 753 },
    ltcg: { profits: 1200, losses: 650 },
  },
}

export function fetchCapitalGains() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 800)
  })
}
