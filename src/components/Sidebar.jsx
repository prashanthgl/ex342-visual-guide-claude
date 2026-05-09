import { NavLink } from 'react-router-dom'
import {
  Home, Cpu, HardDrive, MemoryStick, Activity, Network,
  FileText, Shield, Layers, Bug, Server, X, ChevronRight
} from 'lucide-react'

const NAV = [
  { to: '/',        icon: Home,        label: 'Overview',              sub: 'Exam structure & tips' },
  { to: '/boot',    icon: Layers,      label: 'Boot Process',          sub: 'GRUB2, initramfs, systemd' },
  { to: '/kernel',  icon: Cpu,         label: 'Kernel Diagnostics',    sub: 'dmesg, sysctl, modules' },
  { to: '/storage', icon: HardDrive,   label: 'Storage',               sub: 'LVM, fsck, iostat' },
  { to: '/memory',  icon: MemoryStick, label: 'Memory',                sub: 'OOM, vmstat, swap' },
  { to: '/cpu',     icon: Activity,    label: 'CPU & Performance',     sub: 'sar, perf, cgroups' },
  { to: '/network', icon: Network,     label: 'Networking',            sub: 'ss, tcpdump, firewalld' },
  { to: '/logging', icon: FileText,    label: 'System Logging',        sub: 'journald, rsyslog, audit' },
  { to: '/selinux', icon: Shield,      label: 'SELinux',               sub: 'Contexts, AVCs, booleans' },
  { to: '/process', icon: Layers,      label: 'Process Management',    sub: 'Signals, ulimits, systemd' },
  { to: '/appdebug',icon: Bug,         label: 'App Diagnostics',       sub: 'strace, lsof, core dumps' },
  { to: '/hardware',icon: Server,      label: 'Hardware',              sub: 'lspci, dmidecode, SMART' },
]

export default function Sidebar({ onClose }) {
  return (
    <div className="h-full bg-surface-1 border-r border-border flex flex-col">
      {/* Brand */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rh-red animate-pulse" />
            <span className="font-bold text-white text-sm tracking-wide">EX342 Visual Guide</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 ml-4">Red Hat Linux Diagnostics</p>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 text-gray-500 hover:text-white">
          <X size={16} />
        </button>
      </div>

      {/* Badge */}
      <div className="mx-4 mt-3 mb-2 px-3 py-2 rounded bg-rh-red/10 border border-rh-red/30">
        <p className="text-xs text-rh-red font-semibold">RHCS Exam Prep</p>
        <p className="text-xs text-gray-400 mt-0.5">Linux Diagnostics & Troubleshooting</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label, sub }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors group
               ${isActive
                 ? 'bg-rh-red/15 text-rh-red border border-rh-red/30'
                 : 'text-gray-400 hover:text-gray-100 hover:bg-surface-3'
               }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-rh-red' : 'text-gray-500 group-hover:text-gray-300'}`} />
                <div className="min-w-0">
                  <div className="font-medium truncate">{label}</div>
                  <div className="text-xs text-gray-600 truncate">{sub}</div>
                </div>
                {isActive && <ChevronRight size={14} className="ml-auto text-rh-red flex-shrink-0" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <p className="text-xs text-gray-600">Red Hat Enterprise Linux 9</p>
        <p className="text-xs text-gray-700">EX342 Exam Prep Guide</p>
      </div>
    </div>
  )
}
