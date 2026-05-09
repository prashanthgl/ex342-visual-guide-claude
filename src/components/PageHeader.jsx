export default function PageHeader({ icon: Icon, title, subtitle, tags = [] }) {
  return (
    <div className="mb-8 pb-6 border-b border-border">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 rounded-xl bg-rh-red/10 border border-rh-red/30">
            <Icon size={28} className="text-rh-red" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-gray-400 text-sm leading-relaxed max-w-2xl">{subtitle}</p>}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map(t => (
                <span key={t} className="pill-red">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
