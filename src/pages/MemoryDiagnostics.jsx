import { MemoryStick } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import InfoBox from '../components/InfoBox'
import CodeBlock from '../components/CodeBlock'
import CommandTable from '../components/CommandTable'
import FlowDiagram from '../components/FlowDiagram'

export default function MemoryDiagnostics() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <PageHeader
        icon={MemoryStick}
        title="Memory Diagnostics"
        subtitle="Investigate memory pressure, OOM kills, swap usage, huge pages, NUMA topology, and slab caches on Red Hat Enterprise Linux systems."
        tags={['EX342', 'Memory', 'OOM Killer', 'vmstat', 'Swap', 'NUMA', 'Huge Pages']}
      />

      {/* ── 1. Linux Memory Architecture ─────────────────────────────── */}
      <section>
        <h2 className="section-title">Linux Memory Architecture</h2>
        <p className="section-body mb-4">
          Linux uses a virtual memory model: every process sees a flat 64-bit address space backed by the kernel's page tables.
          Physical memory is divided into pages (typically 4 KiB) and organised into zones so that hardware constraints are respected.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl border border-border bg-surface-1 p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Memory Zones</h3>
            <div className="space-y-2">
              {[
                { zone: 'ZONE_DMA', range: '0 – 16 MiB', desc: 'Legacy ISA DMA devices; very limited, avoid allocation here.', color: 'text-red-300' },
                { zone: 'ZONE_DMA32', range: '0 – 4 GiB', desc: '32-bit PCI DMA; present on x86-64 kernels.', color: 'text-yellow-300' },
                { zone: 'ZONE_NORMAL', range: '16 MiB – (varies)', desc: 'Main zone for kernel and user allocations.', color: 'text-green-300' },
                { zone: 'ZONE_HIGHMEM', range: 'Above NORMAL (32-bit only)', desc: 'Only on 32-bit kernels; not present on x86-64.', color: 'text-blue-300' },
              ].map(z => (
                <div key={z.zone} className="rounded bg-surface-2 p-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className={`font-mono text-xs font-bold ${z.color}`}>{z.zone}</span>
                    <span className="text-xs text-gray-500">{z.range}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{z.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-1 p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Key Concepts</h3>
            <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
              <div className="rounded bg-surface-2 p-2.5">
                <span className="font-semibold text-blue-300">Page Cache</span> — Disk data cached in RAM to speed I/O. Reclaimable under memory pressure. Shown as "Cached" in <code className="code-inline">free</code>.
              </div>
              <div className="rounded bg-surface-2 p-2.5">
                <span className="font-semibold text-yellow-300">Buffers</span> — Kernel buffer cache (block device metadata, e.g. filesystem superblocks). Usually small (a few hundred MiB).
              </div>
              <div className="rounded bg-surface-2 p-2.5">
                <span className="font-semibold text-green-300">Anonymous Memory</span> — Pages not backed by a file (heap, stack, mmap(MAP_ANONYMOUS)). Must be swapped out if reclamation is needed.
              </div>
              <div className="rounded bg-surface-2 p-2.5">
                <span className="font-semibold text-purple-300">Slab Cache</span> — Kernel object allocator. Caches frequently-used kernel structures (dentries, inodes, socket buffers).
              </div>
              <div className="rounded bg-surface-2 p-2.5">
                <span className="font-semibold text-rh-red">Virtual vs Physical</span> — A process's virtual address is mapped to a physical frame by the MMU via page tables. <code className="code-inline">/proc/[pid]/maps</code> shows virtual regions; <code className="code-inline">VmRSS</code> in status shows physical pages.
              </div>
            </div>
          </div>
        </div>

        <InfoBox type="tip" title="MemAvailable vs MemFree">
          <code className="code-inline">MemFree</code> is completely unused RAM. <code className="code-inline">MemAvailable</code> is the kernel's estimate of memory available for new allocations without swapping — it includes reclaimable page cache and slab. Always use <code className="code-inline">MemAvailable</code> to judge whether the system has enough free memory for a new workload.
        </InfoBox>
      </section>

      {/* ── 2. /proc/meminfo ─────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">/proc/meminfo — Field Reference</h2>
        <CodeBlock
          language="bash"
          title="cat /proc/meminfo (annotated sample)"
          code={`MemTotal:       32768000 kB  # Total usable RAM (excludes hardware reserved)
MemFree:         1024000 kB  # Completely unused RAM
MemAvailable:   12288000 kB  # Estimated RAM for new processes (key metric)
Buffers:          512000 kB  # Block device buffers
Cached:          8192000 kB  # Page cache (file-backed pages)
SwapCached:        32000 kB  # Data in swap that's also still in RAM
Active:         10240000 kB  # Recently used pages (harder to reclaim)
Inactive:        6144000 kB  # Older pages, candidates for reclaim
Active(anon):    3072000 kB  # Active anonymous pages
Inactive(anon):  1024000 kB  # Inactive anonymous pages
Active(file):    7168000 kB  # Active file-backed pages
Inactive(file):  5120000 kB  # Inactive file-backed pages
Unevictable:       16000 kB  # Locked pages (mlock, shm, etc.)
Mlocked:            8000 kB  # Pages locked via mlock(2)
SwapTotal:       8388608 kB  # Total swap space
SwapFree:        8000000 kB  # Unused swap space
Dirty:             12800 kB  # Pages waiting to be written to disk
Writeback:             0 kB  # Pages currently being written back
AnonPages:       4096000 kB  # Non-file-backed pages in use
Mapped:          2048000 kB  # Pages mapped into process address spaces
Shmem:            128000 kB  # Shared memory (tmpfs, SysV shm)
KReclaimable:    1024000 kB  # Kernel memory reclaimable under pressure
Slab:            2048000 kB  # Total kernel slab cache
SReclaimable:    1024000 kB  # Reclaimable slab (e.g. dentries, inode cache)
SUnreclaim:      1024000 kB  # Unreclaimable slab (in-use kernel structs)
KernelStack:       32000 kB  # Kernel stacks for each thread
PageTables:        64000 kB  # Page table memory overhead
CommitLimit:    24772608 kB  # Max total allocatable memory (see overcommit)
Committed_AS:   16384000 kB  # Total committed virtual memory
VmallocTotal:   34359738367 kB  # Total vmalloc address space
VmallocUsed:      512000 kB  # Used vmalloc space
HugePages_Total:       0     # Static hugepages configured
HugePages_Free:        0     # Unused static hugepages
Hugepagesize:       2048 kB  # Size of each hugepage (usually 2 MiB)
DirectMap4k:      524288 kB  # 4K-mapped physical pages (TLB entries)
DirectMap2M:    31457280 kB  # 2M-mapped physical pages`}
        />
      </section>

      {/* ── 3. free -h output ────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Interpreting free -h</h2>
        <CodeBlock
          language="bash"
          title="free -h output with column explanations"
          code={`$ free -h
               total        used        free      shared  buff/cache   available
Mem:            31Gi        18Gi       980Mi       122Mi        12Gi        12Gi
Swap:          8.0Gi       388Mi       7.6Gi

# total       = MemTotal — total installed RAM
# used        = total - free - buff/cache
# free        = MemFree — completely unused
# shared      = Shmem — shared memory (tmpfs etc.)
# buff/cache  = Buffers + Cached + SReclaimable (reclaimable)
# available   = MemAvailable — what the kernel thinks is safely usable

# Quick health check:
# If 'available' < 10% of 'total' → memory pressure likely
# If Swap 'used' > 0              → anonymous pages were paged out
# If Swap 'used' growing          → active memory pressure`}
        />

        <div className="grid md:grid-cols-3 gap-3 mt-2">
          {[
            { label: 'Healthy', desc: 'available ≥ 20% total, swap used ≈ 0', color: 'border-green-700 bg-green-950/30 text-green-300' },
            { label: 'Watch', desc: 'available 5–20%, swap in active use', color: 'border-yellow-700 bg-yellow-950/30 text-yellow-300' },
            { label: 'Critical', desc: 'available < 5%, OOM events likely', color: 'border-red-700 bg-red-950/30 text-red-300' },
          ].map(s => (
            <div key={s.label} className={`rounded-lg border p-3 ${s.color}`}>
              <div className="font-bold text-sm">{s.label}</div>
              <div className="text-xs mt-1 opacity-80">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. vmstat ────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">vmstat — Virtual Memory Statistics</h2>
        <CodeBlock
          language="bash"
          title="vmstat 2 5  (sample 5 times every 2 seconds)"
          code={`$ vmstat 2 5
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0 397312 985440 512000 12288000    0    0     8    24  450  900 15  5 78  2  0
 3  1 397312 950000 512000 12288000    2    0   128   256  890 1800 45 12 38  5  0
 1  0 397312 960000 512000 12288000    0    0     0    48  500  950 20  6 72  2  0`}
        />

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="text-left px-3 py-2 text-gray-400 uppercase tracking-wide">Column</th>
                <th className="text-left px-3 py-2 text-gray-400 uppercase tracking-wide">Group</th>
                <th className="text-left px-3 py-2 text-gray-400 uppercase tracking-wide">Meaning</th>
                <th className="text-left px-3 py-2 text-gray-400 uppercase tracking-wide">Alarm threshold</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['r', 'procs', 'Processes in run queue (runnable)', '> # of CPUs = CPU saturated'],
                ['b', 'procs', 'Processes blocked in uninterruptible sleep (I/O wait)', '> 2–3 sustained = I/O bottleneck'],
                ['swpd', 'memory', 'Total swap in use (kB)', 'Non-zero = memory was tight'],
                ['free', 'memory', 'Idle (unused) RAM (kB)', 'Very low alone is OK; check available'],
                ['buff', 'memory', 'Kernel buffer cache (kB)', 'Informational'],
                ['cache', 'memory', 'Page cache size (kB)', 'High is normal; released under pressure'],
                ['si', 'swap', 'Swap-IN rate (kB/s) — pages read from swap', '> 0 sustained = memory pressure'],
                ['so', 'swap', 'Swap-OUT rate (kB/s) — pages written to swap', '> 0 sustained = memory pressure'],
                ['bi', 'io', 'Blocks read from block devices (blocks/s)', 'Baseline-dependent'],
                ['bo', 'io', 'Blocks written to block devices (blocks/s)', 'Sustained high = disk write pressure'],
                ['in', 'system', 'Interrupts per second', 'Very high may indicate driver issue'],
                ['cs', 'system', 'Context switches per second', 'Very high (>100k) may indicate thrashing'],
                ['us', 'cpu', 'User CPU time %', '> 70% sustained = CPU-bound userspace'],
                ['sy', 'cpu', 'System (kernel) CPU time %', '> 20% = kernel overhead (syscalls, etc.)'],
                ['id', 'cpu', 'Idle CPU time %', '< 10% = saturated'],
                ['wa', 'cpu', 'I/O wait CPU time %', '> 10% sustained = I/O bottleneck'],
                ['st', 'cpu', 'Stolen CPU time (VM hypervisor took it) %', '> 5% = hypervisor contention'],
              ].map(([col, grp, meaning, alarm], i) => (
                <tr key={col} className={`border-b border-border/50 ${i % 2 === 0 ? 'bg-surface-0' : 'bg-surface-1/40'}`}>
                  <td className="px-3 py-2 font-mono text-token-string">{col}</td>
                  <td className="px-3 py-2 text-gray-500">{grp}</td>
                  <td className="px-3 py-2 text-gray-300">{meaning}</td>
                  <td className="px-3 py-2 text-yellow-400/80">{alarm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 5. OOM Killer ────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">OOM Killer</h2>
        <p className="section-body mb-4">
          When the kernel cannot satisfy a memory allocation request and reclaim is exhausted, it invokes the Out-of-Memory killer.
          The OOM killer selects a victim process using an <em>oom_score</em> and terminates it to free memory.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <CodeBlock
              language="bash"
              title="Reading OOM kills from journals"
              code={`# Most recent OOM kill events
journalctl -k --grep="Out of memory" | tail -20

# From dmesg (ring buffer — may roll off after reboot)
dmesg | grep -E "oom_kill|Out of memory|Killed process"

# Sample OOM kill in dmesg:
# [2847315.123456] Out of memory: Kill process 14523 (java)
#   score 842 or sacrifice child
# [2847315.124000] Killed process 14523 (java)
#   total-vm:4194304kB, anon-rss:3145728kB,
#   file-rss:0kB, shmem-rss:0kB

# Persistent across reboots via journald:
journalctl -k -b -1 --grep="Killed process"`}
            />
          </div>

          <div>
            <CodeBlock
              language="bash"
              title="oom_score and oom_score_adj"
              code={`# View OOM score for a process (higher = more likely to be killed)
cat /proc/14523/oom_score       # e.g. 842 (0-1000 scale)

# Adjust OOM score  (-1000 = never kill, +1000 = kill first)
cat /proc/14523/oom_score_adj   # e.g. 0 (default)

# Make a process OOM-immune (run as root)
echo -1000 > /proc/$(pgrep sshd)/oom_score_adj

# Make a process high-priority OOM victim
echo 500 > /proc/$(pgrep mybadapp)/oom_score_adj

# Persist via systemd unit:
# OOMScoreAdjust=-1000   (in [Service] section)

# Via sysctl — global overcommit behaviour
sysctl vm.overcommit_memory    # 0=heuristic,1=always,2=never
sysctl vm.overcommit_ratio     # % of RAM+swap for overcommit=2
sysctl -w vm.overcommit_memory=2  # disable overcommit`}
            />
          </div>
        </div>

        <InfoBox type="warning" title="vm.overcommit_memory Values">
          <strong>0 (default)</strong> — Heuristic: kernel allows reasonable overcommit.<br />
          <strong>1</strong> — Always allow: any allocation succeeds (dangerous; OOM more likely).<br />
          <strong>2</strong> — Never overcommit: total committed memory cannot exceed <code className="code-inline">overcommit_ratio</code>% of RAM + swap. Most conservative; may cause allocation failures rather than OOM kills.
        </InfoBox>

        <InfoBox type="exam" title="Exam Tip — OOM">
          The exam often asks you to prevent a specific daemon from being OOM-killed. Set <code className="code-inline">OOMScoreAdjust=-1000</code> in the systemd unit file's <code className="code-inline">[Service]</code> section, then <code className="code-inline">systemctl daemon-reload</code> and restart the service.
        </InfoBox>
      </section>

      {/* ── 6. Memory Leak Detection ─────────────────────────────────── */}
      <section>
        <h2 className="section-title">Memory Leak Detection</h2>
        <CodeBlock
          language="bash"
          title="Watching VmRSS growth over time"
          code={`# /proc/[pid]/status contains per-process memory fields
grep -E "VmRSS|VmSize|VmSwap" /proc/14523/status
# VmSize:  4194304 kB  (virtual address space)
# VmRSS:   3145728 kB  (resident set — actual physical pages)
# VmSwap:    65536 kB  (swapped-out pages)

# Poll VmRSS every 5 seconds to spot a leak
while true; do
  echo "$(date +%T) RSS=$(grep VmRSS /proc/$(pgrep myapp)/status | awk '{print $2}') kB"
  sleep 5
done

# Or use watch
watch -n 5 "grep VmRSS /proc/\$(pgrep myapp)/status"

# smaps_rollup gives a richer breakdown (kernel ≥ 4.14)
cat /proc/14523/smaps_rollup

# ps one-liner to track top RSS consumers
ps -eo pid,comm,rss --sort=-rss | head -15`}
        />
        <CodeBlock
          language="bash"
          title="Valgrind — heap memory leak check"
          code={`# Install valgrind
dnf install valgrind

# Run program under valgrind's memcheck tool
valgrind --tool=memcheck --leak-check=full --show-leak-kinds=all \
         --track-origins=yes --log-file=valgrind.log ./myapp

# Key output sections:
# LEAK SUMMARY:
#    definitely lost: 4,096 bytes in 1 blocks   ← definite leak
#    indirectly lost: 0 bytes in 0 blocks
#      possibly lost: 0 bytes in 0 blocks
#    still reachable: 2,048 bytes in 3 blocks   ← probably OK
#         suppressed: 0 bytes in 0 blocks

# Address sanitizer (faster, needs recompile):
gcc -fsanitize=address -g -o myapp myapp.c
./myapp   # ASan reports at runtime`}
        />
      </section>

      {/* ── 7. Swap ──────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Swap Management</h2>
        <CodeBlock
          language="bash"
          title="Swap setup and management"
          code={`# View current swap usage
swapon --show          # NAME, TYPE, SIZE, USED, PRIO
swapon -s              # legacy equivalent

# Create a swap file (useful on VMs)
dd if=/dev/zero of=/swapfile bs=1M count=4096   # 4 GiB
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile

# Create swap on a block device / LVM LV
mkswap /dev/vg0/swap
swapon /dev/vg0/swap

# Persist in /etc/fstab:
# /swapfile   none   swap   sw,pri=10   0 0

# Swap priority (higher = used first, same = striped for perf)
swapon -p 10 /dev/sdb1   # priority 10

# Disable swap (can fail if swap is in use)
swapoff /swapfile
swapoff -a              # disable all swap

# Tuning — swappiness (0–200, default 60)
# Lower = kernel prefers to reclaim file cache over anonymous pages
sysctl vm.swappiness
sysctl -w vm.swappiness=10   # reduce swap aggressiveness
# Persist: echo 'vm.swappiness=10' >> /etc/sysctl.d/99-memory.conf`}
        />
        <InfoBox type="tip" title="vm.swappiness on Servers">
          For database servers (e.g. MySQL, PostgreSQL) set <code className="code-inline">vm.swappiness=1</code> — this avoids swapping the buffer pool while still allowing emergency swapping. Red Hat recommends <code className="code-inline">vm.swappiness=10</code> for most production servers.
        </InfoBox>
      </section>

      {/* ── 8. Huge Pages ────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Huge Pages</h2>
        <p className="section-body mb-4">
          Standard pages are 4 KiB. Huge pages (2 MiB on x86-64) reduce TLB pressure for memory-intensive workloads.
          Linux provides two mechanisms: <strong>static huge pages</strong> (pre-allocated at boot) and
          <strong>Transparent Huge Pages (THP)</strong> (kernel auto-promotes pages).
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <CodeBlock
              language="bash"
              title="Static Huge Pages"
              code={`# Check current status
cat /proc/meminfo | grep -i huge
# HugePages_Total:    1024
# HugePages_Free:      980
# HugePages_Rsvd:        8
# HugePages_Surp:        0
# Hugepagesize:       2048 kB
# Hugetlb:         2097152 kB

# See available hugepage sizes on the system
ls /sys/kernel/mm/hugepages/
# hugepages-1048576kB   (1 GiB)
# hugepages-2048kB      (2 MiB)

# Allocate 512 x 2MiB huge pages
echo 512 > /sys/kernel/mm/hugepages/hugepages-2048kB/nr_hugepages

# Persist via sysctl
sysctl -w vm.nr_hugepages=512
echo 'vm.nr_hugepages=512' > /etc/sysctl.d/99-hugepages.conf

# Mount hugetlbfs for mmap use
mkdir /dev/hugepages
mount -t hugetlbfs none /dev/hugepages`}
            />
          </div>
          <div>
            <CodeBlock
              language="bash"
              title="Transparent Huge Pages (THP)"
              code={`# View THP setting (always/madvise/never)
cat /sys/kernel/mm/transparent_hugepage/enabled
# [always] madvise never

# Disable THP (recommended for databases, Redis, latency-sensitive)
echo never > /sys/kernel/mm/transparent_hugepage/enabled
echo never > /sys/kernel/mm/transparent_hugepage/defrag

# Enable only when application opts-in (madvise)
echo madvise > /sys/kernel/mm/transparent_hugepage/enabled

# Persist via systemd (rc.local is deprecated):
# Create /etc/systemd/system/disable-thp.service
# [Service]
# Type=oneshot
# ExecStart=/bin/sh -c 'echo never > /sys/kernel/mm/transparent_hugepage/enabled'
# ExecStart=/bin/sh -c 'echo never > /sys/kernel/mm/transparent_hugepage/defrag'

# Check THP stats
grep -i AnonHuge /proc/meminfo
# AnonHugePages:    614400 kB  (2MB pages used for anon memory)

cat /sys/kernel/mm/transparent_hugepage/khugepaged/pages_collapsed`}
            />
          </div>
        </div>

        <InfoBox type="exam" title="Exam Tip — THP and Databases">
          Oracle, MySQL, MongoDB, and Redis all recommend disabling THP. If a service is performing poorly and THP is <code className="code-inline">always</code>, disabling it (and confirming via <code className="code-inline">cat /sys/kernel/mm/transparent_hugepage/enabled</code>) is a common exam task.
        </InfoBox>
      </section>

      {/* ── 9. NUMA ──────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">NUMA Topology</h2>
        <CodeBlock
          language="bash"
          title="NUMA diagnostics with numactl and numastat"
          code={`# Show NUMA topology
numactl --hardware
# available: 2 nodes (0-1)
# node 0 cpus: 0 1 2 3 4 5 6 7
# node 0 size: 16384 MB
# node 0 free: 5120 MB
# node 1 cpus: 8 9 10 11 12 13 14 15
# node 1 size: 16384 MB
# node 1 free: 6144 MB
# node distances:
# node   0   1
#   0:  10  21
#   1:  21  10

# Per-node memory statistics (hit/miss ratio)
numastat
# Per-node numastat:          node0       node1
# numa_hit              1234567890   987654321  ← allocations from local node
# numa_miss               12345678    98765432  ← allocated on remote node (slow)
# numa_foreign            98765432    12345678
# interleave_hit               123         456
# local_node            1234567890   987654321
# other_node              12345678    98765432

# High numa_miss / numa_foreign ratio → consider pinning processes

# Run a process on a specific NUMA node
numactl --cpunodebind=0 --membind=0 myapp

# Bind a process to node 0's CPUs and node 1's memory (testing)
numactl --cpunodebind=0 --membind=1 myapp

# Auto NUMA balancing (kernel migrates pages toward the NUMA node that uses them)
sysctl kernel.numa_balancing          # 1 = enabled
sysctl -w kernel.numa_balancing=0    # disable if causing overhead

# Per-process NUMA stats
numastat -p $(pgrep java) | head -20`}
        />
      </section>

      {/* ── 10. Slab Cache ───────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Slab Cache — slabtop &amp; /proc/slabinfo</h2>
        <CodeBlock
          language="bash"
          title="Slab cache investigation"
          code={`# Interactive slab top (like top for slab caches)
slabtop
# Sort by size: press 's' then 's' again

# One-shot sorted output (by cache size)
slabtop -o -s c | head -25
# Active / Total Objects (% used)    : 4567890 / 5012345 (91.1%)
# Active / Total Slabs (% used)      :   98765 / 102345  (96.5%)
# Active / Total Caches (% used)     :     134 / 189     (70.9%)
# Active / Total Size (% used)       : 1024.00K / 1100.00K (93.1%)
# Minimum / Average / Maximum Object : 8 / 268 / 131072
#  OBJS ACTIVE  USE OBJ SIZE  SLABS OBJ/SLAB CACHE SIZE NAME
# 524288 512000  97%    0.19K  13107       40     52428K dentry
# 360000 355000  98%    0.62K  12000       30     96000K inode_cache
# 262144 260000  99%    0.10K   3277       80     13108K kmalloc-96

# Raw data from /proc/slabinfo
cat /proc/slabinfo | head -5

# Identify top slab consumers
cat /proc/slabinfo | awk 'NR>2 {print $1, $3*$4}' | sort -k2 -rn | head -10

# Drop reclaimable slab caches (non-destructive)
echo 2 > /proc/sys/vm/drop_caches   # pagecache + slab
echo 3 > /proc/sys/vm/drop_caches   # pagecache + slab + dentries

# WARNING: drop_caches causes cache misses — avoid on production`}
        />
        <InfoBox type="warning" title="SUnreclaim Growing">
          If <code className="code-inline">SUnreclaim</code> in <code className="code-inline">/proc/meminfo</code> grows continuously without bound, it may indicate a kernel memory leak (e.g. a driver not freeing socket buffers). Compare with <code className="code-inline">slabtop -o -s c</code> to identify which cache is growing.
        </InfoBox>
      </section>

      {/* ── 11. sar -r ───────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Historical Memory Data — sar -r</h2>
        <CodeBlock
          language="bash"
          title="sar memory reporting"
          code={`# Memory utilisation for today (requires sysstat package)
sar -r 1 5          # sample every 1s, 5 times
sar -r ALL          # extended fields (dirty, commit, etc.)

# Historical data for a specific day
sar -r -f /var/log/sa/sa$(date +%d)     # today
sar -r -f /var/log/sa/sa08              # 8th of month

# Sample sar -r output:
# 14:00:01  kbmemfree kbavail kbmemused %memused kbbuffers  kbcached  kbcommit   %commit  kbactive   kbinact   kbdirty
# 14:00:01    953440 12222352  19595812    59.81    512000   8192000 16777216     34.21  10240000   6144000     12800
# 14:10:01    920000 11950000  19628000    59.91    512000   8100000 16900000     34.45  10300000   6200000     18000

# Swap stats
sar -S 1 5
# kbswpfree kbswpused %swpused  kbswpcad   %swpcad
#   8000000    388608      4.63    32000       8.25

# Generate HTML report from all today's data
sar -A -f /var/log/sa/sa$(date +%d) | grep -A 5 "Memory"

# Enable sysstat data collection (runs every 10 min via cron/timer)
systemctl enable --now sysstat`}
        />
      </section>

      {/* ── 12. FlowDiagram ──────────────────────────────────────────── */}
      <FlowDiagram
        title="Memory Pressure Investigation Workflow"
        steps={[
          { label: 'Check overall memory state', sub: 'free -h → is MemAvailable critically low? Is swap in use?', color: 'blue' },
          { label: 'Identify memory consumers', sub: 'ps -eo pid,comm,rss --sort=-rss | head -15  •  smem -r | head', color: 'default' },
          { label: 'Check for active swapping', sub: 'vmstat 2 5 → si/so columns non-zero?  •  sar -S for history', color: 'yellow' },
          { label: 'Look for OOM kills', sub: 'journalctl -k --grep="Out of memory"  •  dmesg | grep oom_kill', color: 'red' },
          { label: 'Examine slab caches', sub: 'slabtop -o -s c | head -20  •  check SUnreclaim in /proc/meminfo', color: 'default' },
          { label: 'Check for memory leaks', sub: 'Watch VmRSS in /proc/[pid]/status over time for the suspect process', color: 'yellow' },
          { label: 'Check THP / huge page config', sub: 'cat /sys/kernel/mm/transparent_hugepage/enabled  •  /proc/meminfo Huge*', color: 'default' },
          { label: 'Review NUMA distribution', sub: 'numastat → high numa_miss?  •  numactl --hardware for topology', color: 'purple' },
          { label: 'Tune and validate', sub: 'Adjust vm.swappiness, vm.nr_hugepages, OOMScoreAdjust, THP; re-check sar -r', color: 'green' },
        ]}
      />

      {/* ── 13. Command Table ────────────────────────────────────────── */}
      <CommandTable
        title="Memory Diagnostics — Quick Reference"
        rows={[
          { cmd: 'free -h', desc: 'Human-readable overview of RAM and swap', note: '-w for wider columns showing buff and cache separately' },
          { cmd: 'cat /proc/meminfo', desc: 'Full kernel memory statistics', note: 'Watch MemAvailable, Slab, SUnreclaim, Committed_AS' },
          { cmd: 'vmstat 2 5', desc: 'VM stats every 2s, 5 iterations', note: 'si/so = swap in/out; r = run queue depth' },
          { cmd: 'vmstat -s', desc: 'Summary memory event counters', note: 'Cumulative since boot' },
          { cmd: 'sar -r 1 5', desc: 'Historical memory utilisation (sysstat)', note: '-r ALL for extended fields; -S for swap' },
          { cmd: 'ps -eo pid,comm,rss --sort=-rss', desc: 'Processes sorted by RSS (physical memory)', note: 'RSS in KiB; use head -15' },
          { cmd: 'cat /proc/[pid]/status', desc: 'Per-process memory details', note: 'VmRSS, VmSize, VmSwap, VmPeak' },
          { cmd: 'cat /proc/[pid]/smaps_rollup', desc: 'Detailed memory map rollup for a process', note: 'Shows Private_Dirty (actual RAM use)' },
          { cmd: 'slabtop -o -s c', desc: 'Snapshot of kernel slab caches sorted by size', note: 'Identify kernel memory consumers' },
          { cmd: 'numactl --hardware', desc: 'Display NUMA node topology and sizes', note: 'Shows distances between NUMA nodes' },
          { cmd: 'numastat', desc: 'Per-node allocation hit/miss counters', note: 'High numa_miss = remote allocations (slow)' },
          { cmd: 'swapon --show', desc: 'List active swap areas', note: 'NAME, TYPE, SIZE, USED, PRIO columns' },
          { cmd: 'mkswap /dev/vg0/swap', desc: 'Initialise a swap area', note: 'Must be run before swapon' },
          { cmd: 'sysctl vm.swappiness', desc: 'Query/set swap aggressiveness (0–200)', note: 'Default 60; set 1–10 for databases' },
          { cmd: 'sysctl vm.nr_hugepages', desc: 'Number of pre-allocated static huge pages', note: 'Set at boot or via sysctl.d' },
          { cmd: 'echo never > /sys/kernel/mm/transparent_hugepage/enabled', desc: 'Disable THP', note: 'Always persist via systemd service' },
          { cmd: 'echo -1000 > /proc/[pid]/oom_score_adj', desc: 'Make a process immune to OOM killer', note: 'Range -1000 to +1000' },
          { cmd: 'journalctl -k --grep="Out of memory"', desc: 'Find OOM kill events', note: '-b -1 for previous boot' },
          { cmd: 'valgrind --leak-check=full ./app', desc: 'Detect memory leaks in an application', note: 'Requires debug symbols for best output' },
          { cmd: 'echo 3 > /proc/sys/vm/drop_caches', desc: 'Drop page cache and slab cache', note: 'Non-destructive but causes cache misses — avoid in production' },
        ]}
      />

      <InfoBox type="exam" title="Exam Tips — Memory">
        <ul className="space-y-1.5 list-disc pl-4">
          <li>When asked "why is the system swapping?", check <code className="code-inline">vmstat 2 5</code> (si/so columns) and <code className="code-inline">sar -r</code> for historical context.</li>
          <li>To prevent a daemon from being OOM-killed: set <code className="code-inline">OOMScoreAdjust=-1000</code> in its systemd unit <code className="code-inline">[Service]</code> section.</li>
          <li>Databases reporting latency spikes → check THP: <code className="code-inline">cat /sys/kernel/mm/transparent_hugepage/enabled</code>. If it shows <code className="code-inline">[always]</code>, set to <code className="code-inline">never</code>.</li>
          <li><code className="code-inline">MemAvailable</code> (not <code className="code-inline">MemFree</code>) is the right field to monitor for "is there memory for new workloads".</li>
          <li>Static huge pages for Oracle/HugeSQL: set <code className="code-inline">vm.nr_hugepages</code> via sysctl and persist in <code className="code-inline">/etc/sysctl.d/</code>.</li>
          <li><code className="code-inline">sysstat</code> package must be installed and <code className="code-inline">sysstat.service</code> enabled for <code className="code-inline">sar</code> historical data to exist.</li>
        </ul>
      </InfoBox>
    </div>
  )
}
