import { Activity } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import InfoBox from '../components/InfoBox'
import CodeBlock from '../components/CodeBlock'
import CommandTable from '../components/CommandTable'
import FlowDiagram from '../components/FlowDiagram'

export default function CPUPerformance() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <PageHeader
        icon={Activity}
        title="CPU & Performance"
        subtitle="Investigate CPU saturation, scheduler behaviour, CPU affinity, cgroup limits, perf profiling, frequency scaling, and context-switch overhead on RHEL systems."
        tags={['EX342', 'CPU', 'CFS Scheduler', 'cgroups v2', 'perf', 'sar', 'nice/renice']}
      />

      {/* ── 1. CPU Scheduler Overview ────────────────────────────────── */}
      <section>
        <h2 className="section-title">CPU Scheduler — CFS &amp; Load Average</h2>
        <p className="section-body mb-4">
          Linux uses the <strong>Completely Fair Scheduler (CFS)</strong> as the default scheduler for normal processes.
          CFS maintains a red-black tree of runnable tasks ordered by <em>virtual runtime</em> — the task that has run least gets scheduled next.
          Real-time processes (SCHED_FIFO, SCHED_RR) preempt CFS tasks entirely.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border border-border bg-surface-1 p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Load Average Explained</h3>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Load average represents the average number of processes in the run queue (runnable or waiting for I/O) over 1, 5, and 15 minutes.
              A load average equal to the number of CPU cores means 100% utilisation — <em>not</em> necessarily a problem.
            </p>
            <div className="space-y-2">
              {[
                { v: 'load avg = 1.0 on 4-core', status: 'Fine', color: 'text-green-300', note: '25% CPU utilised' },
                { v: 'load avg = 4.0 on 4-core', status: 'Saturated', color: 'text-yellow-300', note: '100% utilised, no queue' },
                { v: 'load avg = 8.0 on 4-core', status: 'Overloaded', color: 'text-red-300', note: '2× CPU — queuing/waiting' },
                { v: '1-min > 15-min', status: 'Spike', color: 'text-yellow-300', note: 'Recent burst of load' },
                { v: '1-min < 15-min', status: 'Recovering', color: 'text-green-300', note: 'Load is decreasing' },
              ].map(r => (
                <div key={r.v} className="flex items-start gap-2 rounded bg-surface-2 p-2">
                  <div className="font-mono text-xs text-gray-300 flex-1">{r.v}</div>
                  <div className={`text-xs font-semibold ${r.color} flex-shrink-0`}>{r.status}</div>
                  <div className="text-xs text-gray-500 flex-shrink-0">{r.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-1 p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">CPU State Breakdown (%)</h3>
            <div className="space-y-2">
              {[
                { s: 'us', name: 'user', color: 'text-blue-300', desc: 'User-space CPU time (applications)' },
                { s: 'sy', name: 'system', color: 'text-yellow-300', desc: 'Kernel CPU time (syscalls, IRQ handling)' },
                { s: 'ni', name: 'nice', color: 'text-purple-300', desc: 'User-space time for niced processes' },
                { s: 'id', name: 'idle', color: 'text-green-300', desc: 'CPU idle — nothing to do' },
                { s: 'wa', name: 'iowait', color: 'text-orange-300', desc: 'Idle while waiting for I/O to complete' },
                { s: 'hi', name: 'hardirq', color: 'text-red-300', desc: 'Hardware interrupt handler time' },
                { s: 'si', name: 'softirq', color: 'text-red-300', desc: 'Software interrupt handler time (e.g. network receive)' },
                { s: 'st', name: 'steal', color: 'text-rh-red', desc: 'Time stolen by hypervisor (VMs only)' },
              ].map(r => (
                <div key={r.s} className="flex items-baseline gap-2 text-xs">
                  <span className={`font-mono font-bold w-5 ${r.color}`}>{r.s}</span>
                  <span className="text-gray-500 w-14">{r.name}</span>
                  <span className="text-gray-400">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. top and htop ──────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">top and htop — Interactive Process Monitoring</h2>
        <CodeBlock
          language="bash"
          title="top — key columns and interactive commands"
          code={`$ top
top - 14:32:01 up 12 days,  4:21,  2 users,  load average: 2.45, 1.87, 1.23
Tasks: 345 total,   3 running, 342 sleeping,   0 stopped,   0 zombie
%Cpu(s): 38.2 us,  8.5 sy,  0.0 ni, 50.1 id,  2.8 wa,  0.2 hi,  0.2 si,  0.0 st
MiB Mem : 31768.0 total,   956.2 free, 18432.5 used, 12379.3 buff/cache
MiB Swap:  8192.0 total,  7803.5 free,   388.5 used. 11934.7 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
14523 appuser   20   0 4194304 3.0g   45312 R  98.3   9.7  45:12.44 java
 2341 mysql     20   0 2097152 1.2g   32768 S  12.4   3.9  12:34.21 mysqld

# Column meanings:
# PR     = scheduling priority (kernel-assigned, related to nice)
# NI     = nice value (-20 high priority to +19 low priority)
# VIRT   = virtual address space (includes mmap, shared libs — often huge)
# RES    = resident set size — actual physical RAM in use
# SHR    = shared memory (shared libs counted here)
# S      = process state: R=running, S=sleeping, D=unint.sleep, Z=zombie
# %CPU   = CPU % across all threads (can exceed 100% on multi-core)
# %MEM   = RES as % of total RAM

# Interactive keys:
# 1      = toggle per-CPU breakdown
# Shift+P = sort by CPU
# Shift+M = sort by MEM
# Shift+H = show threads
# k      = kill a process
# r      = renice
# f      = field selection
# u      = filter by user

# Batch mode (non-interactive, for scripts):
top -b -n 3 -d 2 | head -40`}
        />
        <CodeBlock
          language="bash"
          title="htop — additional features"
          code={`# Install htop
dnf install htop

# Key differences from top:
# F2/S  = Setup (columns, colours, meters)
# F5    = Tree view (show process hierarchy)
# F6    = Sort by column
# F9    = Send signal to process
# Space = Tag processes for bulk action
# t     = Tree/flat toggle
# H     = Hide/show user threads
# K     = Hide/show kernel threads
# Arrows + Enter = navigate and open process detail`}
        />
      </section>

      {/* ── 3. mpstat ────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">mpstat — Per-CPU Statistics</h2>
        <CodeBlock
          language="bash"
          title="mpstat — identify CPU hotspots"
          code={`# Install sysstat
dnf install sysstat

# All CPUs summary
mpstat 2 5

# Per-CPU breakdown (identify hot CPUs)
mpstat -P ALL 2 3
# 14:35:02  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
# 14:35:02  all   38.25    0.00    8.50    2.75    0.25    0.25    0.00    0.00    0.00   50.00
# 14:35:02    0   98.02    0.00   1.98    0.00    0.00    0.00    0.00    0.00    0.00    0.00
# 14:35:02    1    2.00    0.00    1.00    0.00    0.50    0.50    0.00    0.00    0.00   96.00
# 14:35:02    2    3.00    0.00    2.00   11.00    0.00    0.00    0.00    0.00    0.00   84.00
# 14:35:02    3    1.00    0.00    1.00    0.00    0.00    0.00    0.00    0.00    0.00   98.00
# CPU 0 is nearly saturated — single-threaded app or IRQ affinity issue

# Check IRQ distribution (if %irq is high on one CPU)
cat /proc/interrupts | head -5
# Rebalance IRQs
systemctl status irqbalance

# Interrupt affinity for a specific IRQ
cat /proc/irq/24/smp_affinity   # bitmask of CPUs`}
        />
        <InfoBox type="tip" title="Single-CPU Saturation">
          If <code className="code-inline">mpstat -P ALL</code> shows one CPU at 100% while others are idle, the workload is single-threaded or an IRQ is pinned to that CPU. Check <code className="code-inline">/proc/interrupts</code> and ensure <code className="code-inline">irqbalance</code> is running.
        </InfoBox>
      </section>

      {/* ── 4. sar -u ────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">sar -u — Historical CPU Data</h2>
        <CodeBlock
          language="bash"
          title="sar CPU utilisation — historical analysis"
          code={`# CPU usage today (10-minute intervals, default sysstat collection)
sar -u
sar -u ALL      # extended: %usr %nice %sys %iowait %steal %irq %soft %guest %idle

# Historical — specific date
sar -u -f /var/log/sa/sa08    # 8th of month

# Identify worst CPU period today
sar -u | sort -k5 -rn | head -5    # sort by %idle ascending (worst = lowest idle)

# Graph-friendly: output to CSV
sar -u -f /var/log/sa/sa$(date +%d) | grep -v "^$\|^Linux\|Average" \
  | awk '{print $1,$3,$4,$5,$6,$8}' > cpu_data.csv

# Real-time + history combined
sar -u 2 10   # every 2s, 10 samples

# CPU queue depths (runnable + blocked processes)
sar -q         # runq-sz, plist-sz, ldavg-1/5/15
sar -q | tail -3`}
        />
      </section>

      {/* ── 5. nice and renice ───────────────────────────────────────── */}
      <section>
        <h2 className="section-title">nice, renice, and ionice</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <CodeBlock
              language="bash"
              title="nice and renice"
              code={`# nice value range: -20 (highest priority) to +19 (lowest)
# Default nice value for new processes: 0

# Start a new process with lower priority (nice +10)
nice -n 10 ./mybuildscript.sh

# Start with high priority (requires root for negative nice)
nice -n -5 ./realtime-app    # root only

# Renice a running process
renice -n 15 -p 14523       # lower priority for PID 14523
renice -n -5 -p 14523       # boost priority (root only)

# Renice all processes of a user
renice -n 10 -u appuser

# Renice all processes in a process group
renice -n 5 -g 14520

# Verify the change
ps -o pid,ni,comm -p 14523
#   PID  NI COMMAND
# 14523  15 mybuildscript`}
            />
          </div>
          <div>
            <CodeBlock
              language="bash"
              title="ionice — I/O scheduling priority"
              code={`# ionice class:
# 0 = none (inherit from CFQ)
# 1 = real-time (rt)   — guaranteed I/O time
# 2 = best-effort (be) — default; 0-7 priority
# 3 = idle             — only when disk is otherwise idle

# Set a process to idle I/O class (backup jobs)
ionice -c 3 -p $(pgrep rsync)

# Start a new process with idle I/O
ionice -c 3 nice -n 19 tar czf /backup/home.tar.gz /home

# Best-effort class, priority 0 (highest in class)
ionice -c 2 -n 0 -p $(pgrep mysqld)

# View current I/O class for a process
ionice -p $(pgrep rsync)
# idle: prio 0

# ionice only works with CFQ/BFQ schedulers
cat /sys/block/sda/queue/scheduler
# [mq-deadline] kyber bfq none
# Switch to BFQ for ionice support:
echo bfq > /sys/block/sda/queue/scheduler`}
            />
          </div>
        </div>
        <InfoBox type="exam" title="Exam Tip — nice vs ionice">
          <code className="code-inline">nice</code>/<code className="code-inline">renice</code> affects CPU scheduling. <code className="code-inline">ionice</code> affects disk I/O scheduling. For a backup job that should not impact production, combine both: <code className="code-inline">ionice -c 3 nice -n 19 ./backup.sh</code>. Remember that only root can set negative nice values.
        </InfoBox>
      </section>

      {/* ── 6. taskset ───────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">CPU Affinity — taskset &amp; isolcpus</h2>
        <CodeBlock
          language="bash"
          title="taskset — bind processes to specific CPUs"
          code={`# View current CPU affinity mask for a PID
taskset -p 14523
# pid 14523's current affinity mask: ff  (all 8 CPUs on a hex mask)

# Set affinity to CPUs 0 and 1 only (hex mask: 0x3)
taskset -p 3 14523
# pid 14523's new affinity mask: 3

# Human-readable CPU list syntax
taskset -cp 0,1 14523          # pin to CPU 0 and 1
taskset -cp 2-5 14523          # pin to CPUs 2 through 5

# Launch a new process pinned to CPU 3
taskset -c 3 ./latency-app

# Verify with ps
ps -o pid,psr,comm -p 14523   # psr = CPU currently running on

# Persist CPU affinity in a systemd unit:
# CPUAffinity=0 1   (in [Service] section)

# isolcpus — kernel parameter to reserve CPUs for exclusive use
# Add to /etc/default/grub GRUB_CMDLINE_LINUX:
# isolcpus=4-7 nohz_full=4-7 rcu_nocbs=4-7
# Then: grub2-mkconfig -o /boot/grub2/grub.cfg && reboot

# Verify isolation
cat /sys/devices/system/cpu/isolated    # e.g. 4-7
# Move a process onto an isolated CPU
taskset -cp 4 $(pgrep latency-app)`}
        />
      </section>

      {/* ── 7. cgroups v2 ────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">cgroups v2 — Resource Limits</h2>
        <p className="section-body mb-4">
          Control groups v2 (unified hierarchy) is the default on RHEL 9. Limits are set via pseudo-files under
          <code className="code-inline">/sys/fs/cgroup/</code>. Systemd slice units are the recommended way to configure cgroups on RHEL.
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <CodeBlock
              language="bash"
              title="Inspecting cgroups v2"
              code={`# Check cgroup v2 is active
cat /proc/filesystems | grep cgroup
# nodev  cgroup2

mount | grep cgroup
# cgroup2 on /sys/fs/cgroup type cgroup2 (rw,nosuid,nodev,noexec)

# View a process's cgroup membership
cat /proc/14523/cgroup
# 0::/system.slice/myapp.service

# Inspect CPU limits for a service
systemctl show myapp.service | grep -E "CPU|Memory"
cat /sys/fs/cgroup/system.slice/myapp.service/cpu.max
# 200000 100000   ← 200ms per 100ms period = 2 CPUs max

# Current CPU usage
cat /sys/fs/cgroup/system.slice/myapp.service/cpu.stat
# usage_usec 45231000
# user_usec  38000000
# system_usec 7231000

# Real-time resource view
systemd-cgtop`}
            />
          </div>
          <div>
            <CodeBlock
              language="bash"
              title="Setting limits via systemd slice units"
              code={`# Create a slice for database workloads
# /etc/systemd/system/database.slice
[Unit]
Description=Database Workloads Slice

[Slice]
CPUWeight=500          # relative weight (default=100, range 1-10000)
CPUQuota=150%          # max 1.5 CPUs (150% of one core)
MemoryMax=4G           # hard memory limit
MemoryHigh=3G          # soft limit (throttle before hard)
MemorySwapMax=0        # disable swap for this slice
CPUAffinity=0-3        # bind to CPUs 0-3

# Assign a service to the slice:
# /etc/systemd/system/mysqld.service.d/override.conf
[Service]
Slice=database.slice

# Apply changes
systemctl daemon-reload
systemctl restart mysqld

# Direct cgroup manipulation (transient, testing only)
echo "200000 100000" > /sys/fs/cgroup/system.slice/mysqld.service/cpu.max
echo "4294967296"    > /sys/fs/cgroup/system.slice/mysqld.service/memory.max`}
            />
          </div>
        </div>
        <InfoBox type="warning" title="cgroups v1 vs v2">
          RHEL 8 defaults to cgroups v1 (multi-hierarchy). RHEL 9 defaults to cgroups v2 (unified hierarchy). The file names differ: v1 uses <code className="code-inline">cpu.cfs_quota_us</code> and <code className="code-inline">cpu.cfs_period_us</code>; v2 uses the combined <code className="code-inline">cpu.max</code>. Always check which version is mounted before writing cgroup files directly.
        </InfoBox>
      </section>

      {/* ── 8. perf ──────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">perf — Linux Performance Counters</h2>
        <CodeBlock
          language="bash"
          title="perf tool basics"
          code={`# Install perf (matches running kernel version)
dnf install perf

# perf stat — count hardware events for a command
perf stat ./mybenchmark
# Performance counter stats for './mybenchmark':
#      12,345,678      cycles
#       9,876,543      instructions              #    0.80  insn per cycle
#       1,234,567      cache-references
#          98,765      cache-misses              #    8.00% of all cache refs
#           2,345      branch-misses
#       0.523456789 seconds time elapsed

# perf top — live profiling (like top but for functions)
perf top                          # system-wide
perf top -p 14523                 # specific process
perf top -C 0,1                   # specific CPUs

# perf record — sample CPU at 99Hz for 30 seconds
perf record -F 99 -a -g -- sleep 30    # all CPUs, call graph
perf record -F 99 -p 14523 -g          # specific PID

# perf report — view recorded samples
perf report                  # interactive TUI
perf report --stdio          # plain text output
perf report --sort=dso       # sort by shared library

# perf annotate — show hottest source lines (needs debug symbols)
perf annotate -d mysqld

# Flame graph (requires brendangregg/FlameGraph scripts)
perf record -F 99 -a -g -- sleep 60
perf script | stackcollapse-perf.pl | flamegraph.pl > cpu-flame.svg

# perf stat — specific events
perf stat -e cache-misses,cache-references,instructions,cycles ./app`}
        />
        <InfoBox type="tip" title="perf and Kernel Symbols">
          For meaningful <code className="code-inline">perf report</code> output, install <code className="code-inline">kernel-debuginfo</code> and <code className="code-inline">kernel-debuginfo-common</code> matching your kernel version. Without symbols, you'll see raw addresses. Application profiling also benefits from <code className="code-inline">-g</code> (debug info) compile flag.
        </InfoBox>
      </section>

      {/* ── 9. turbostat and cpupower ────────────────────────────────── */}
      <section>
        <h2 className="section-title">Frequency Scaling — turbostat &amp; cpupower</h2>
        <CodeBlock
          language="bash"
          title="CPU frequency and power state inspection"
          code={`# Install tools
dnf install kernel-tools   # provides cpupower, turbostat

# turbostat — per-core frequency, C-states, temperature
turbostat --interval 5
# Core  CPU   Avg_MHz  Busy%  Bzy_MHz TSC_MHz   IRQ SMI  CPU%c1  CPU%c3  CPU%c6  CPU%c7  CoreTmp
#          -   1234.5   30.9   3990.2  3600.0  1234   0    15.2    1.2    52.6     0.0      58

# turbostat for a specific command
turbostat -- sleep 5
turbostat -s PkgTmp,Avg_MHz,Busy%,Bzy_MHz -- ./benchmark

# cpupower — CPU frequency governor
cpupower frequency-info
# current CPU frequency: 3.60 GHz (hardware limits: 400 MHz - 5.00 GHz)
# available cpufreq governors: performance powersave

cpupower frequency-info --governors

# Set performance governor (disables frequency scaling — use for benchmarks)
cpupower frequency-set -g performance

# Set powersave governor (default on most servers)
cpupower frequency-set -g powersave

# Force a specific frequency
cpupower frequency-set -f 3600MHz   # root only

# Check current scaling governor for each CPU
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# C-states (sleep states) — deeper = lower power but higher latency
cpupower idle-info
# Available idle states: POLL C1 C1E C3 C6 C7

# Disable deep C-states for latency-sensitive workloads
cpupower idle-set -D 3    # disable C-states deeper than C3`}
        />
        <InfoBox type="exam" title="Exam Tip — Performance Governor">
          If a benchmark shows unexpectedly low CPU performance, the frequency governor may be set to <code className="code-inline">powersave</code>. Switch to <code className="code-inline">performance</code> with <code className="code-inline">cpupower frequency-set -g performance</code>. To persist, use a udev rule or systemd service — the governor resets on reboot unless configured.
        </InfoBox>
      </section>

      {/* ── 10. Context Switches ─────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Context Switches — pidstat -w</h2>
        <CodeBlock
          language="bash"
          title="Measuring context switch rates"
          code={`# System-wide context switches (from vmstat)
vmstat 1 5
# cs column = context switches per second

# Per-process context switches with pidstat
pidstat -w 1 5
# 14:40:01    UID    PID   cswch/s nvcswch/s  Command
# 14:40:01      0      1      2.00      0.00  systemd
# 14:40:01   1000  14523    450.00    120.00  java
# 14:40:01    999   2341     85.00     12.00  mysqld

# cswch/s  = voluntary context switches per second
#            (process yielded CPU, e.g. waiting for I/O, sleep, mutex)
# nvcswch/s = non-voluntary context switches per second
#            (kernel preempted the process — running too long)

# High nvcswch/s → process is CPU-hungry, being preempted
# High cswch/s  → process does a lot of waiting (I/O, synchronisation)

# Thread-level context switches
pidstat -w -t -p 14523 1

# System-wide from /proc/stat
grep ctxt /proc/stat
# ctxt 1234567890   (cumulative since boot)

# Check per-process from /proc/[pid]/status
grep -E "voluntary|nonvoluntary" /proc/14523/status
# voluntary_ctxt_switches:        3456
# nonvoluntary_ctxt_switches:      789`}
        />
      </section>

      {/* ── 11. PCP ──────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Performance Co-Pilot (PCP)</h2>
        <CodeBlock
          language="bash"
          title="PCP — pmstat, pmrep, pcp-dstat"
          code={`# Install PCP
dnf install pcp pcp-system-tools pcp-doc

# Enable and start data collection daemon
systemctl enable --now pmcd pmlogger

# pmstat — like vmstat but with more detail
pmstat -s 5 -t 2sec    # 5 samples every 2 seconds

# pmrep — flexible reporting (CSV, columnar, metrics by name)
pmrep -s 5 kernel.all.cpu.user kernel.all.cpu.sys
pmrep -o csv -s 100 -t 5sec kernel.all.load > load.csv

# pcp-dstat (modern dstat replacement)
pcp dstat --cpu --mem --net --disk 2 5

# pminfo — explore available metrics
pminfo -d kernel.all.cpu
pminfo -t kernel.percpu.cpu.user   # with help text

# Live analysis
pcp atop           # like atop
pcp htop           # like htop backed by PCP

# Historical playback (pmlogger writes archives to /var/log/pcp/pmlogger/)
pmrep -a /var/log/pcp/pmlogger/$(hostname)/$(date +%Y%m%d) \
      kernel.all.load

# PCP web API (pmproxy)
systemctl enable --now pmproxy
# Access metrics: http://localhost:44322/metrics  (Prometheus format)`}
        />
      </section>

      {/* ── 12. stress and stress-ng ─────────────────────────────────── */}
      <section>
        <h2 className="section-title">Load Testing — stress &amp; stress-ng</h2>
        <CodeBlock
          language="bash"
          title="stress and stress-ng for controlled load generation"
          code={`# Install
dnf install stress stress-ng

# stress — simple load generator
stress --cpu 4                     # 4 CPU workers (infinite)
stress --cpu 2 --timeout 60        # 2 CPU workers for 60 seconds
stress --vm 2 --vm-bytes 512M      # 2 memory workers, 512 MiB each
stress --io 4 --hdd 2              # 4 I/O workers + 2 disk workers

# stress-ng — more powerful with hundreds of stressors
stress-ng --cpu 4 --timeout 30s --metrics-brief
# cpu 4 97.3% (bogo ops: 1234567)

# Memory pressure test
stress-ng --vm 2 --vm-bytes 75% --timeout 60s

# I/O stressor targeting specific filesystem
stress-ng --hdd 2 --hdd-opts sync --temp-path /tmp --timeout 30s

# All stressors sequentially (useful for burn-in)
stress-ng --class cpu --timeout 60s --metrics-brief

# Test specific CPU vulnerability mitigations
stress-ng --cpu 4 --cpu-method matrixprod --timeout 30s

# Test with thermal monitoring
stress-ng --cpu $(nproc) --timeout 60s & \
  watch -n 2 "sensors | grep -E 'Core|temp'"

# Limit stress-ng with cgroups
systemd-run --scope -p CPUQuota=50% stress-ng --cpu 4 --timeout 30s`}
        />
      </section>

      {/* ── 13. FlowDiagram ──────────────────────────────────────────── */}
      <FlowDiagram
        title="CPU Performance Investigation Workflow"
        steps={[
          { label: 'Check load average and CPU states', sub: 'uptime  •  top (1 key for per-CPU)  •  mpstat -P ALL 2 3', color: 'blue' },
          { label: 'Is CPU saturated or I/O-bound?', sub: 'If wa% > 10% → I/O issue, not CPU. If us%+sy% near 100% → CPU-bound.', color: 'default' },
          { label: 'Identify top CPU consumers', sub: 'top (Shift+P)  •  ps -eo pid,comm,%cpu --sort=-%cpu | head -10', color: 'yellow' },
          { label: 'Check for single-CPU hotspot', sub: 'mpstat -P ALL → one core at 100%?  •  Check irqbalance and IRQ affinity', color: 'yellow' },
          { label: 'Examine context switch rate', sub: 'vmstat cs column  •  pidstat -w 1 5 for per-process breakdown', color: 'default' },
          { label: 'Profile with perf', sub: 'perf top -p PID  •  perf record -F 99 -g; perf report for function-level detail', color: 'purple' },
          { label: 'Check CPU frequency / governor', sub: 'cpupower frequency-info  •  turbostat — is performance governor set?', color: 'default' },
          { label: 'Review cgroup/slice limits', sub: 'systemd-cgtop  •  cat /sys/fs/cgroup/.../cpu.max  •  systemctl show svc | grep CPU', color: 'default' },
          { label: 'Review historical patterns', sub: 'sar -u -f /var/log/sa/sa$(date +%d)  •  sar -q for run queue history', color: 'green' },
          { label: 'Tune and validate', sub: 'nice/renice, taskset CPU affinity, cgroup limits, governor; confirm with sar/perf', color: 'green' },
        ]}
      />

      {/* ── Command Table ─────────────────────────────────────────────── */}
      <CommandTable
        title="CPU & Performance — Quick Reference"
        rows={[
          { cmd: 'uptime', desc: 'Load averages for 1, 5, 15 minutes', note: 'Compare against CPU count for saturation check' },
          { cmd: 'top', desc: 'Interactive process/CPU monitor', note: '1=per-CPU, Shift+P=sort CPU, Shift+H=threads' },
          { cmd: 'mpstat -P ALL 2 3', desc: 'Per-CPU utilisation stats', note: 'Identify single-CPU hotspots or IRQ imbalance' },
          { cmd: 'sar -u ALL', desc: 'Historical CPU utilisation', note: '-f /var/log/sa/saDD for specific day' },
          { cmd: 'sar -q', desc: 'Run queue and load average history', note: 'runq-sz column shows scheduler queue depth' },
          { cmd: 'pidstat -u 1 5', desc: 'Per-process CPU utilisation', note: '-t for threads, -w for context switches' },
          { cmd: 'pidstat -w 1 5', desc: 'Voluntary/non-voluntary context switches', note: 'cswch/s and nvcswch/s per process' },
          { cmd: 'nice -n 10 cmd', desc: 'Start command with lower CPU priority', note: '-20 = max priority (root); +19 = min priority' },
          { cmd: 'renice -n 15 -p PID', desc: 'Adjust priority of running process', note: 'Negative values require root' },
          { cmd: 'ionice -c 3 -p PID', desc: 'Set idle I/O class for process', note: 'Only effective with CFQ/BFQ scheduler' },
          { cmd: 'taskset -cp 0,1 PID', desc: 'Pin process to CPUs 0 and 1', note: 'Use -c for CPU list, no -c for hex mask' },
          { cmd: 'perf top -p PID', desc: 'Live CPU profiling for a process', note: 'Shows hottest functions in real time' },
          { cmd: 'perf stat ./app', desc: 'Hardware counter stats for a command', note: 'Instructions, cycles, cache-misses, branches' },
          { cmd: 'perf record -F 99 -g -p PID', desc: 'Sample at 99Hz with call graphs', note: 'Follow with perf report' },
          { cmd: 'cpupower frequency-set -g performance', desc: 'Set CPU to performance frequency governor', note: 'Disables power saving for benchmarks' },
          { cmd: 'turbostat --interval 5', desc: 'Per-core frequency, C-states, temperature', note: 'Requires kernel-tools package' },
          { cmd: 'systemd-cgtop', desc: 'Live cgroup resource usage tree', note: 'Shows CPU and memory per slice/service' },
          { cmd: 'systemctl set-property svc CPUQuota=50%', desc: 'Limit a service to 50% of one CPU', note: 'Persists to /etc/systemd/system.control/' },
          { cmd: 'stress-ng --cpu 4 --timeout 30s', desc: 'Generate controlled CPU load for testing', note: '--metrics-brief for performance results' },
          { cmd: 'pcp dstat --cpu --mem 2 5', desc: 'PCP-backed dstat for CPU and memory', note: 'Requires pcp-system-tools package' },
        ]}
      />

      <InfoBox type="exam" title="Exam Tips — CPU Performance">
        <ul className="space-y-1.5 list-disc pl-4">
          <li>Load average above the number of CPUs means the system is overloaded. Always divide load by CPU count.</li>
          <li>High <code className="code-inline">wa%</code> (iowait) in <code className="code-inline">top</code> means the CPU is idle waiting for I/O — the bottleneck is disk/network, not CPU.</li>
          <li>High <code className="code-inline">st%</code> (steal) in a VM means the hypervisor host is CPU-contended — escalate to infrastructure team.</li>
          <li>To limit a systemd service's CPU: <code className="code-inline">systemctl set-property myservice.service CPUQuota=50%</code> or add <code className="code-inline">CPUQuota=50%</code> to the unit's <code className="code-inline">[Service]</code> section.</li>
          <li><code className="code-inline">perf</code> requires the <code className="code-inline">perf</code> package and often <code className="code-inline">kernel-debuginfo</code> for symbol resolution.</li>
          <li>For CPU affinity that survives restarts, use <code className="code-inline">CPUAffinity=</code> in the systemd unit <code className="code-inline">[Service]</code> section.</li>
          <li><code className="code-inline">sysstat</code> must be installed and <code className="code-inline">sysstat.service</code> (or timer) enabled for <code className="code-inline">sar</code> historical data to accumulate.</li>
        </ul>
      </InfoBox>
    </div>
  )
}
