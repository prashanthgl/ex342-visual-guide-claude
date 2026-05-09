// FlowDiagram.jsx — renders a vertical sequence of steps connected by arrows.
// Each step can have sub-labels and an optional colour override.
// This is a pure React component using inline Tailwind — no external diagram library needed.

const COLORS = {
  default: { bg: 'bg-surface-2', border: 'border-border', text: 'text-gray-200', dot: 'bg-gray-500' },
  red:     { bg: 'bg-red-950/40', border: 'border-red-800', text: 'text-red-300', dot: 'bg-red-500' },
  blue:    { bg: 'bg-blue-950/40', border: 'border-blue-800', text: 'text-blue-300', dot: 'bg-blue-500' },
  green:   { bg: 'bg-green-950/40', border: 'border-green-800', text: 'text-green-300', dot: 'bg-green-500' },
  yellow:  { bg: 'bg-yellow-950/40', border: 'border-yellow-800', text: 'text-yellow-300', dot: 'bg-yellow-500' },
  purple:  { bg: 'bg-purple-950/40', border: 'border-purple-800', text: 'text-purple-300', dot: 'bg-purple-500' },
}

export function FlowStep({ label, sub, color = 'default', icon: Icon, side }) {
  const c = COLORS[color]
  return (
    <div className="flex items-start gap-4">
      {/* Left timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
      </div>
      {/* Card */}
      <div className={`flex-1 rounded-lg border ${c.border} ${c.bg} px-4 py-3 mb-1`}>
        <div className={`flex items-center gap-2 font-semibold text-sm ${c.text}`}>
          {Icon && <Icon size={14} />}
          {label}
        </div>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        {side && <div className="mt-1.5">{side}</div>}
      </div>
    </div>
  )
}

export default function FlowDiagram({ title, steps }) {
  return (
    <div className="my-6 rounded-xl border border-border bg-surface-1 p-5">
      {title && (
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">{title}</h3>
      )}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-rh-red via-border to-border" />
        <div className="space-y-3 pl-1">
          {steps.map((step, i) => (
            <FlowStep key={i} {...step} />
          ))}
        </div>
      </div>
    </div>
  )
}

// HorizontalFlow — for left-to-right sequences (e.g. BIOS→GRUB→Kernel)
export function HorizontalFlow({ steps }) {
  return (
    <div className="my-6 overflow-x-auto">
      <div className="flex items-center gap-0 min-w-max px-2">
        {steps.map((step, i) => {
          const c = COLORS[step.color || 'default']
          return (
            <div key={i} className="flex items-center">
              <div className={`rounded-lg border ${c.border} ${c.bg} px-3 py-2 text-center min-w-[90px]`}>
                <div className={`text-xs font-bold ${c.text}`}>{step.label}</div>
                {step.sub && <div className="text-[10px] text-gray-500 mt-0.5">{step.sub}</div>}
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center mx-1">
                  <div className="w-6 h-px bg-rh-red" />
                  <div className="border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-rh-red" style={{borderLeftWidth:8}} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
