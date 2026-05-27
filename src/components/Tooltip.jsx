import { useState } from 'react'

export default function Tooltip({ content, children, align = 'center' }) {
  const [visible, setVisible] = useState(false)

  const alignmentClass =
    align === 'right'
      ? 'right-0'
      : align === 'left'
        ? 'left-0'
        : 'left-1/2 -translate-x-1/2'

  return (
    <span
      className="relative inline-flex cursor-default"
      tabIndex={0}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onClick={(event) => {
        event.stopPropagation()
        setVisible((value) => !value)
      }}
    >
      {children}
      {visible && (
        <span
          className={`absolute bottom-full ${alignmentClass} z-40 mb-1.5 rounded-lg bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg whitespace-nowrap pointer-events-none dark:bg-gray-100 dark:text-gray-900`}
        >
          {content}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
        </span>
      )}
    </span>
  )
}
