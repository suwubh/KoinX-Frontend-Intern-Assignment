export default function Spinner({ light = false }) {
  return (
    <div
      className={`w-7 h-7 rounded-full border-2 border-t-transparent animate-spin ${
        light ? 'border-white/50' : 'border-blue-500 dark:border-blue-400'
      }`}
    />
  )
}
