// InfoBox.jsx — coloured callout boxes for tips, warnings, notes and danger notices.
import { AlertTriangle, Info, Lightbulb, Zap, CheckCircle } from 'lucide-react'

const VARIANTS = {
  info:    { icon: Info,          border: 'border-blue-700',   bg: 'bg-blue-950/40',   text: 'text-blue-300',   title: 'Info' },
  tip:     { icon: Lightbulb,     border: 'border-green-700',  bg: 'bg-green-950/40',  text: 'text-green-300',  title: 'Tip' },
  warning: { icon: AlertTriangle, border: 'border-yellow-700', bg: 'bg-yellow-950/40', text: 'text-yellow-300', title: 'Warning' },
  danger:  { icon: Zap,           border: 'border-red-700',    bg: 'bg-red-950/40',    text: 'text-red-300',    title: 'Danger' },
  exam:    { icon: CheckCircle,   border: 'border-rh-red',     bg: 'bg-rh-red/10',     text: 'text-rh-red',     title: 'Exam Tip' },
}

export default function InfoBox({ type = 'info', title, children }) {
  const v = VARIANTS[type]
  const Icon = v.icon
  return (
    <div className={`rounded-lg border ${v.border} ${v.bg} px-4 py-3 my-4`}>
      <div className={`flex items-center gap-2 font-semibold text-sm mb-1.5 ${v.text}`}>
        <Icon size={15} />
        <span>{title || v.title}</span>
      </div>
      <div className="text-sm text-gray-300 leading-relaxed">{children}</div>
    </div>
  )
}
