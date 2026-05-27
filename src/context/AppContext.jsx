import { createContext, useContext, useState, useEffect } from 'react'
import { fetchCapitalGains } from '../api/capitalGains'
import { fetchHoldings } from '../api/holdings'
import { computeAfterGains } from '../utils/calculations'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('koinx-theme') || 'light'
  })

  const [capitalGains, setCapitalGains] = useState(null)
  const [holdings, setHoldings] = useState([])
  const [selectedIds, setSelectedIds] = useState(new Set())

  const [loading, setLoading] = useState({ gains: true, holdings: true })
  const [error, setError] = useState({ gains: null, holdings: null })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('koinx-theme', theme)
  }, [theme])

  useEffect(() => {
    fetchCapitalGains()
      .then((data) => setCapitalGains(data.capitalGains))
      .catch((err) => setError((e) => ({ ...e, gains: err.message })))
      .finally(() => setLoading((l) => ({ ...l, gains: false })))

    fetchHoldings()
      .then((data) => setHoldings(data))
      .catch((err) => setError((e) => ({ ...e, holdings: err.message })))
      .finally(() => setLoading((l) => ({ ...l, holdings: false })))
  }, [])

  const afterGains = computeAfterGains(capitalGains, holdings, selectedIds)

  function toggleHolding(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll(rows) {
    const allSelected = rows.every((h) => selectedIds.has(h.id))
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        rows.forEach((h) => next.delete(h.id))
        return next
      })
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        rows.forEach((h) => next.add(h.id))
        return next
      })
    }
  }

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        capitalGains,
        afterGains,
        holdings,
        selectedIds,
        toggleHolding,
        toggleAll,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
