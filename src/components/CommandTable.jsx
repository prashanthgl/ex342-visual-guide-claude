// CommandTable.jsx — renders a tidy reference table of commands with descriptions.
// columns: [{ label: 'Command', key: 'cmd' }, { label: 'What it does', key: 'desc' }]
export default function CommandTable({ title, rows, columns }) {
  const cols = columns || [
    { label: 'Command', key: 'cmd' },
    { label: 'Description', key: 'desc' },
    { label: 'Example / Notes', key: 'note' },
  ]

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-border">
      {title && (
        <div className="px-4 py-2.5 bg-surface-2 border-b border-border">
          <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-surface-2/80">
              {cols.map(c => (
                <th key={c.key} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-border">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? 'bg-surface-0' : 'bg-surface-1/40'} hover:bg-surface-2/60 transition-colors`}>
                {cols.map(c => (
                  <td key={c.key} className={`px-4 py-2.5 ${c.key === 'cmd' ? 'font-mono text-token-string text-xs whitespace-nowrap' : 'text-gray-300 text-xs'}`}>
                    {row[c.key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
