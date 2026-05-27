import Header from './components/Header'
import DisclaimerAccordion from './components/DisclaimerAccordion'
import PreHarvestingCard from './components/PreHarvestingCard'
import AfterHarvestingCard from './components/AfterHarvestingCard'
import HoldingsTable from './components/HoldingsTable'
import HowItWorksPopover from './components/HowItWorksPopover'

export default function App() {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-[#f0f4ff] dark:bg-[#0d1421] transition-colors">
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-x-hidden">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tax Harvesting</h1>
          <HowItWorksPopover />
        </div>

        <div className="mb-6">
          <DisclaimerAccordion />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <PreHarvestingCard />
          <AfterHarvestingCard />
        </div>

        <HoldingsTable />
      </main>
    </div>
  )
}
