// Home.jsx — Dashboard / landing page for the EX342 Visual Guide
import { Link } from 'react-router-dom'
import {
  Layers, Cpu, HardDrive, MemoryStick, Activity,
  Network, FileText, Shield, Bug, Server,
  BookOpen, Clock, Target, CheckCircle2, ChevronRight,
  Zap, AlertTriangle, Info,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import InfoBox from '../components/InfoBox'

// ─── Topic card data ────────────────────────────────────────────────────────
const TOPICS = [
  {
    path: '/boot',
    icon: Layers,
    title: 'Boot Process',
    desc: 'Trace the full boot sequence from BIOS/UEFI through GRUB2, initramfs, and systemd target activation.',
    color: 'blue',
    tags: ['GRUB2', 'systemd', 'initramfs'],
  },
  {
    path: '/kernel',
    icon: Cpu,
    title: 'Kernel Diagnostics',
    desc: 'Inspect kernel messages, modules, parameters, and oops/panic analysis with dmesg and sysfs.',
    color: 'purple',
    tags: ['dmesg', 'sysfs', 'modules'],
  },
  {
    path: '/storage',
    icon: HardDrive,
    title: 'Storage',
    desc: 'Diagnose block devices, LVM, filesystem corruption, I/O errors, and mount failures.',
    color: 'yellow',
    tags: ['LVM', 'XFS', 'fsck'],
  },
  {
    path: '/memory',
    icon: MemoryStick,
    title: 'Memory',
    desc: 'Identify memory leaks, OOM killer events, swap exhaustion, and NUMA topology issues.',
    color: 'red',
    tags: ['OOM', 'vmstat', 'swap'],
  },
  {
    path: '/cpu',
    icon: Activity,
    title: 'CPU & Performance',
    desc: 'Profile CPU utilisation, scheduling latency, load averages, and performance bottlenecks.',
    color: 'green',
    tags: ['perf', 'top', 'sar'],
  },
  {
    path: '/network',
    icon: Network,
    title: 'Networking',
    desc: 'Troubleshoot connectivity, routing, firewall rules, DNS, and interface configuration.',
    color: 'blue',
    tags: ['ss', 'tcpdump', 'nftables'],
  },
  {
    path: '/logging',
    icon: FileText,
    title: 'System Logging',
    desc: 'Navigate journald, rsyslog, log filtering, persistent journals, and remote log forwarding.',
    color: 'yellow',
    tags: ['journald', 'rsyslog', 'audit'],
  },
  {
    path: '/selinux',
    icon: Shield,
    title: 'SELinux',
    desc: 'Interpret AVC denials, write custom policy modules, and manage file/process contexts.',
    color: 'red',
    tags: ['AVC', 'audit2allow', 'contexts'],
  },
  {
    path: '/process',
    icon: Layers,
    title: 'Process Management',
    desc: 'Investigate hung processes, zombie states, signal handling, namespaces, and cgroups v2.',
    color: 'purple',
    tags: ['cgroups', 'strace', 'signals'],
  },
  {
    path: '/appdebug',
    icon: Bug,
    title: 'App Diagnostics',
    desc: 'Use strace, ltrace, core dumps, GDB, and Valgrind to diagnose misbehaving applications.',
    color: 'green',
    tags: ['strace', 'GDB', 'coredump'],
  },
  {
    path: '/hardware',
    icon: Server,
    title: 'Hardware',
    desc: 'Detect hardware faults via EDAC, IPMI, smartmontools, and MCE log analysis.',
    color: 'yellow',
    tags: ['IPMI', 'SMART', 'EDAC'],
  },
]

// colour → Tailwind class mapping (kept explicit so Tailwind can scan them)
const CARD_COLORS = {
  blue:   { border: 'border-blue-800/60',   bg: 'bg-blue-950/20',   icon: 'bg-blue-900/50 text-blue-300',   tag: 'pill-blue' },
  purple: { border: 'border-purple-800/60', bg: 'bg-purple-950/20', icon: 'bg-purple-900/50 text-purple-300', tag: 'pill-blue' },
  yellow: { border: 'border-yellow-800/60', bg: 'bg-yellow-950/20', icon: 'bg-yellow-900/50 text-yellow-300', tag: 'pill-yellow' },
  red:    { border: 'border-red-800/60',    bg: 'bg-red-950/20',    icon: 'bg-red-900/50 text-red-300',     tag: 'pill-red' },
  green:  { border: 'border-green-800/60',  bg: 'bg-green-950/20',  icon: 'bg-green-900/50 text-green-300', tag: 'pill-green' },
}

// ─── Linux layers data ───────────────────────────────────────────────────────
const LINUX_LAYERS = [
  {
    label: 'User Space',
    desc: 'Applications, shells, daemons, and libraries that run in unprivileged mode.',
    examples: 'bash, sshd, httpd, glibc, systemd user units',
    color: 'bg-green-950/50 border-green-800/60 text-green-200',
    dot: 'bg-green-500',
  },
  {
    label: 'C Library (glibc)',
    desc: 'Translates high-level C function calls into raw system call numbers the kernel understands.',
    examples: 'open(), read(), write(), malloc(), pthread_create()',
    color: 'bg-blue-950/50 border-blue-800/60 text-blue-200',
    dot: 'bg-blue-500',
  },
  {
    label: 'System Calls (syscall ABI)',
    desc: 'The formal boundary between user space and kernel space — entry via syscall/sysenter instruction.',
    examples: 'read(2), write(2), mmap(2), clone(2), execve(2)',
    color: 'bg-yellow-950/50 border-yellow-800/60 text-yellow-200',
    dot: 'bg-yellow-500',
  },
  {
    label: 'Kernel Space',
    desc: 'Schedulers, VFS, TCP/IP stack, device drivers, memory manager, SELinux LSM hooks — all run with full privilege.',
    examples: 'CFS scheduler, XFS driver, NIC drivers, eBPF programs',
    color: 'bg-red-950/50 border-red-800/60 text-red-200',
    dot: 'bg-red-500',
  },
  {
    label: 'Hardware',
    desc: 'Physical CPU, RAM, storage devices, NICs, and peripheral buses exposed to the kernel via firmware interfaces.',
    examples: 'x86-64 CPU, DDR5 RAM, NVMe SSD, PCIe bus, ACPI tables',
    color: 'bg-surface-3 border-border text-gray-300',
    dot: 'bg-gray-500',
  },
]

// ─── Exam meta ───────────────────────────────────────────────────────────────
const EXAM_META = [
  { icon: Clock,        label: 'Duration',      value: '2.5 hours (150 minutes)' },
  { icon: Target,       label: 'Format',        value: 'Hands-on performance-based lab' },
  { icon: Server,       label: 'Platform',      value: 'Red Hat Enterprise Linux 9' },
  { icon: CheckCircle2, label: 'Passing Score', value: 'Not published (internally ~70%)' },
  { icon: BookOpen,     label: 'Prerequisite',  value: 'RHCSA (EX200) recommended' },
  { icon: Zap,          label: 'Objective',     value: 'Diagnose & troubleshoot live Linux systems' },
]

// ─── How-to-use steps ────────────────────────────────────────────────────────
const HOW_TO_USE = [
  { n: '1', title: 'Read the concept sections', body: 'Each page opens with a visual flow diagram and plain-English explanations of how the subsystem works before diving into commands.' },
  { n: '2', title: 'Study the command tables', body: 'Command tables list every relevant tool, its flags, and concise notes. Focus on commands you cannot easily guess — the exam is open-man-page but time is tight.' },
  { n: '3', title: 'Copy and run every code block', body: 'All code blocks are copy-paste ready. Spin up a RHEL 9 VM and reproduce each example. Muscle memory matters on exam day.' },
  { n: '4', title: 'Check the Exam Tip boxes', body: 'Red "Exam Tip" boxes call out the exact scenarios Red Hat examiners are known to test — prioritise these.' },
  { n: '5', title: 'Simulate failures', body: 'Deliberately break things in your VM: corrupt GRUB, fill a filesystem, trigger OOM, set wrong SELinux contexts. Recovering from real failures builds real skill.' },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="space-y-12">

      {/* ── Page header ── */}
      <PageHeader
        icon={BookOpen}
        title="EX342 Visual Guide"
        subtitle="A comprehensive visual reference for the Red Hat Certified Specialist in Linux Diagnostics and Troubleshooting exam. Every subsystem explained with flow diagrams, annotated commands, and exam-focused tips."
        tags={['EX342', 'RHEL 9', 'Diagnostics', 'Troubleshooting']}
      />

      {/* ── Exam overview ── */}
      <section>
        <h2 className="section-title">
          <Target size={22} className="text-rh-red" />
          Exam Overview
        </h2>
        <p className="section-body mb-4">
          EX342 tests your ability to diagnose and resolve real-world problems on a live RHEL 9 system
          under time pressure. There are no multiple-choice questions — every task requires you to
          actually fix a broken system component and leave it in a working, persistent state.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXAM_META.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3 rounded-xl border border-border bg-surface-1 px-4 py-3">
              <div className="p-2 rounded-lg bg-rh-red/10 border border-rh-red/20 flex-shrink-0">
                <Icon size={16} className="text-rh-red" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-sm text-gray-200 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Topic grid ── */}
      <section>
        <h2 className="section-title">
          <Layers size={22} className="text-rh-red" />
          Exam Topics
        </h2>
        <p className="section-body mb-5">
          The exam covers eleven major subsystems. Select any topic to access its full visual
          reference, command tables, and exam tips.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map(({ path, icon: Icon, title, desc, color, tags }) => {
            const c = CARD_COLORS[color]
            return (
              <Link
                key={path}
                to={path}
                className={`group block rounded-xl border ${c.border} ${c.bg} p-4 hover:bg-surface-2/60 transition-all duration-200 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5`}
              >
                {/* Icon + arrow */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${c.icon} border border-white/10`}>
                    <Icon size={18} />
                  </div>
                  <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all mt-1" />
                </div>

                {/* Title + desc */}
                <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tags.map(tag => (
                    <span key={tag} className={`pill ${c.tag} text-[10px]`}>{tag}</span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Linux Internals Layers ── */}
      <section>
        <h2 className="section-title">
          <Cpu size={22} className="text-rh-red" />
          Linux System Architecture
        </h2>
        <p className="section-body mb-5">
          Effective troubleshooting requires understanding which layer a problem lives in. A
          segfault in user space has a different resolution path than a kernel NULL pointer
          dereference or a hardware memory error. The five layers below form the mental model
          behind every diagnostic technique in this guide.
        </p>

        {/* Stacked layers — top = user space, bottom = hardware */}
        <div className="rounded-xl border border-border bg-surface-1 p-5 space-y-1">
          {LINUX_LAYERS.map((layer, i) => (
            <div key={layer.label}>
              <div className={`rounded-lg border px-4 py-3 ${layer.color}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${layer.dot}`} />
                  <span className="text-sm font-bold">{layer.label}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-80 ml-4">{layer.desc}</p>
                <p className="text-[11px] font-mono opacity-60 mt-1 ml-4">{layer.examples}</p>
              </div>
              {/* Downward arrow between layers */}
              {i < LINUX_LAYERS.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="opacity-40">
                    <path d="M7 0v12M1 8l6 7 6-7" stroke="#EE0000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
          When a process calls <code className="code-inline">write()</code>, execution crosses from
          user space into the kernel via a syscall trap, traverses the VFS layer, reaches a
          device driver, and eventually talks to hardware — all in microseconds.
          Knowing this path tells you exactly which tool to use at each layer.
        </p>
      </section>

      {/* ── How to use ── */}
      <section>
        <h2 className="section-title">
          <Info size={22} className="text-rh-red" />
          How to Use This Guide
        </h2>

        <div className="space-y-3">
          {HOW_TO_USE.map(({ n, title, body }) => (
            <div key={n} className="flex gap-4 rounded-xl border border-border bg-surface-1 px-4 py-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-rh-red/20 border border-rh-red/40 flex items-center justify-center">
                <span className="text-xs font-bold text-rh-red">{n}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Study timeline ── */}
      <section>
        <h2 className="section-title">
          <Clock size={22} className="text-rh-red" />
          Study Plan &amp; Exam Day Tips
        </h2>

        <InfoBox type="tip" title="Recommended Study Timeline (4-week plan)">
          <ul className="space-y-1 mt-1">
            <li><span className="text-green-200 font-semibold">Week 1:</span> Boot process, kernel diagnostics, system logging. Set up a RHEL 9 VM and deliberately break/fix each subsystem.</li>
            <li><span className="text-green-200 font-semibold">Week 2:</span> Storage, memory, CPU performance. Practice LVM recovery, OOM analysis, and perf profiling.</li>
            <li><span className="text-green-200 font-semibold">Week 3:</span> Networking, SELinux, process management. Generate and fix AVC denials; use strace on real service failures.</li>
            <li><span className="text-green-200 font-semibold">Week 4:</span> Application debugging, hardware diagnostics, full mock exam simulation (timed, no notes).</li>
          </ul>
        </InfoBox>

        <InfoBox type="exam" title="Exam Day Strategy">
          <ul className="space-y-1 mt-1">
            <li><span className="font-semibold">Read all tasks first</span> — scan every question before starting so you can sequence easy wins and flag complex tasks.</li>
            <li><span className="font-semibold">Verify persistence</span> — most fixes must survive a reboot. Always run <code className="code-inline">systemctl enable</code>, write config files, and reboot to confirm before moving on.</li>
            <li><span className="font-semibold">Use man pages</span> — the exam is open-man-page. If you forget a flag, <code className="code-inline">man 8 dracut</code> is faster than guessing.</li>
            <li><span className="font-semibold">Don't skip broken tasks</span> — partial credit is awarded. Implement what you can and leave the system in a better state than you found it.</li>
            <li><span className="font-semibold">Watch the clock</span> — aim to spend no more than 15 minutes per task. If you're stuck, move on and return.</li>
          </ul>
        </InfoBox>

        <InfoBox type="warning" title="Common Exam Pitfalls">
          <ul className="space-y-1 mt-1">
            <li>Forgetting to run <code className="code-inline">grub2-mkconfig -o /boot/grub2/grub.cfg</code> after editing <code className="code-inline">/etc/default/grub</code>.</li>
            <li>Setting SELinux to permissive mode instead of actually fixing the AVC denial — examiners check the mode.</li>
            <li>Fixing a service but not enabling it, so it fails after the mandatory reboot.</li>
            <li>Using <code className="code-inline">ip</code> commands (runtime-only) instead of <code className="code-inline">nmcli</code> / connection files for persistent network changes.</li>
            <li>Overlooking <code className="code-inline">restorecon -Rv</code> after moving files to fix SELinux context mismatches.</li>
          </ul>
        </InfoBox>
      </section>

      {/* ── Footer divider ── */}
      <div className="border-t border-border pt-6 text-center">
        <p className="text-xs text-gray-600">
          EX342 Visual Guide &bull; Based on Red Hat Enterprise Linux 9 &bull; Not affiliated with Red Hat, Inc.
        </p>
      </div>

    </div>
  )
}
