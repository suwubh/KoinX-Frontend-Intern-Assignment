import Header from './components/Header'
import DisclaimerAccordion from './components/DisclaimerAccordion'
import PreHarvestingCard from './components/PreHarvestingCard'
import AfterHarvestingCard from './components/AfterHarvestingCard'
import HoldingsTable from './components/HoldingsTable'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0d1421] transition-colors">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tax Harvesting</h1>
          <a
            href="#"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            How it works?
          </a>
        </div>

        {/* Disclaimer accordion */}
        <div className="mb-6">
          <DisclaimerAccordion />
        </div>

        {/* Capital gains cards — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PreHarvestingCard />
          <AfterHarvestingCard />
        </div>

        {/* Holdings table */}
        <HoldingsTable />
      </main>
    </div>
  )
}
