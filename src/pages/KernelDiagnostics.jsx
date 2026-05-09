// KernelDiagnostics.jsx — EX342 Kernel Diagnostics & Troubleshooting reference page
import { Cpu } from 'lucide-react'
import PageHeader   from '../components/PageHeader'
import CodeBlock    from '../components/CodeBlock'
import InfoBox      from '../components/InfoBox'
import FlowDiagram  from '../components/FlowDiagram'
import CommandTable from '../components/CommandTable'

// ─── inline helpers ──────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <h2 className="section-title mt-10 mb-3">
      <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
      {children}
    </h2>
  )
}

function SubTitle({ children }) {
  return <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-2">{children}</h3>
}

// ─── Kernel Architecture Visual ──────────────────────────────────────────────
function KernelArchDiagram() {
  const layers = [
    { label: 'User Space',             sub: 'Applications, daemons, shells, libraries (glibc)',  color: 'bg-green-950/50 border-green-800',  text: 'text-green-300' },
    { label: 'System Call Interface',  sub: 'read(), write(), open(), mmap(), ioctl() — the ABI boundary',  color: 'bg-blue-950/50 border-blue-800',    text: 'text-blue-300' },
    { label: 'Kernel Core',            sub: 'Process scheduler, memory manager, VFS, networking stack, IPC', color: 'bg-purple-950/50 border-purple-800', text: 'text-purple-300' },
    { label: 'Device Drivers',         sub: 'Block, char, network, platform, USB — compiled-in or modules (.ko)', color: 'bg-yellow-950/50 border-yellow-800', text: 'text-yellow-300' },
    { label: 'Hardware',               sub: 'CPU, RAM, NIC, storage controllers, buses (PCIe, USB, I2C)',  color: 'bg-red-950/50 border-red-800',      text: 'text-red-300' },
  ]
  return (
    <div className="my-6 rounded-xl border border-border bg-surface-1 p-5">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Linux Kernel Architecture
      </h3>
      <div className="space-y-1">
        {layers.map((l, i) => (
          <div key={i}>
            <div className={`rounded-lg border ${l.color} px-5 py-3`}>
              <div className={`font-semibold text-sm ${l.text}`}>{l.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{l.sub}</div>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center my-1">
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-px h-3 bg-rh-red" />
                  <div className="border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rh-red" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────
const kernelCrashFlow = [
  { label: 'Symptom detected',              sub: 'Machine hangs, unexpected reboot, "Oops:" in logs, services crash',     color: 'red' },
  { label: 'Check system journal',          sub: 'journalctl -k -b -1 — previous boot kernel messages; look for Oops/BUG/panic', color: 'yellow' },
  { label: 'Check dmesg for Oops',          sub: 'dmesg -T | grep -E "Oops|BUG|Call Trace|RIP|RSP|panic"',                color: 'yellow' },
  { label: 'Decode call trace',             sub: 'Use addr2line, objdump, or scripts/decode_stacktrace.sh with vmlinux',  color: 'blue' },
  { label: 'Check kdump vmcore',            sub: '/var/crash/$(date)/vmcore — analyze with crash utility; check /proc/sys/kernel/panic', color: 'purple' },
  { label: 'Identify responsible module',   sub: 'lsmod; modinfo <mod>; dmesg | grep <mod>; check /var/log/messages',     color: 'blue' },
  { label: 'Reproduce on isolated system',  sub: 'Disable suspect module (blacklist), apply upstream fix, test kernel',   color: 'green' },
  { label: 'File RCA',                      sub: 'Red Hat support sosreport + vmcore; reference kbase article',           color: 'green' },
]

const kernelCmdRows = [
  { cmd: 'dmesg -T',                           desc: 'Print kernel ring buffer with human-readable timestamps',          note: '-T converts syslog timestamps' },
  { cmd: 'dmesg -l err,warn',                  desc: 'Filter ring buffer to error and warning level messages only',      note: 'Levels: emerg,alert,crit,err,warn,notice,info,debug' },
  { cmd: 'dmesg -w',                           desc: 'Watch ring buffer live (follow mode)',                             note: 'Like tail -f for kernel messages' },
  { cmd: 'dmesg --clear',                      desc: 'Clear the kernel ring buffer',                                    note: 'Requires CAP_SYS_ADMIN; use with care' },
  { cmd: 'journalctl -k',                      desc: 'Show kernel messages from current boot via systemd journal',       note: '-k = --dmesg; -b -1 for previous boot' },
  { cmd: 'lsmod',                              desc: 'List currently loaded kernel modules',                             note: 'Shows module, size, used-by count' },
  { cmd: 'modinfo <module>',                   desc: 'Show metadata: filename, license, depends, params, description',   note: 'modinfo -p shows parameters only' },
  { cmd: 'modprobe <module>',                  desc: 'Load module and its dependencies',                                 note: '-r to remove; --show-depends to list deps' },
  { cmd: 'modprobe -r <module>',               desc: 'Unload module (and unused deps)',                                  note: 'Fails if module is in use' },
  { cmd: 'rmmod <module>',                     desc: 'Remove a single module without removing deps',                     note: 'Lower-level than modprobe -r' },
  { cmd: 'sysctl -a',                          desc: 'Print all kernel tunables',                                        note: 'Grep with: sysctl -a | grep net.ipv4' },
  { cmd: 'sysctl -w key=val',                  desc: 'Set a kernel parameter at runtime (temporary)',                    note: 'e.g. sysctl -w vm.swappiness=10' },
  { cmd: 'sysctl -p /etc/sysctl.d/99-x.conf',  desc: 'Load parameter file permanently',                                  note: '-p with no arg loads /etc/sysctl.conf' },
  { cmd: 'cat /proc/sys/<path>',               desc: 'Read a sysctl parameter directly via /proc',                       note: 'echo value > /proc/sys/... writes it' },
  { cmd: 'crash /usr/lib/debug/vmlinux vmcore', desc: 'Open kdump vmcore for post-mortem analysis',                     note: 'bt = backtrace, ps = process list inside crash' },
  { cmd: 'kdumpctl status',                    desc: 'Check kdump service readiness',                                    note: 'Must be "ready"; requires crashkernel= in cmdline' },
  { cmd: 'uname -r',                           desc: 'Print running kernel version string',                              note: '-a for full info including machine type' },
  { cmd: 'cat /proc/version',                  desc: 'Kernel version + GCC compiler version used to build it',           note: 'Also shows build date/host' },
  { cmd: 'cat /proc/cmdline',                  desc: 'Show kernel command-line passed by bootloader',                    note: 'Useful to verify crashkernel, selinux, quiet' },
  { cmd: 'cat /proc/interrupts',               desc: 'Per-CPU IRQ counters for all active interrupts',                   note: 'Watch with: watch -d cat /proc/interrupts' },
  { cmd: 'cat /proc/softirqs',                 desc: 'Software interrupt statistics per CPU',                            note: 'High NET_RX can indicate NIC driver issues' },
  { cmd: 'cat /proc/slabinfo',                 desc: 'Kernel SLAB/SLUB allocator cache statistics',                      note: 'slabtop gives a live top-like view' },
  { cmd: 'slabtop',                            desc: 'Interactive SLAB cache usage (like top for kernel memory)',         note: 'Spot kmalloc-4096 bloat' },
  { cmd: 'cat /proc/buddyinfo',                desc: 'Buddy allocator free memory per order per zone',                   note: 'Fragmentation visible here' },
  { cmd: 'perf list',                          desc: 'List all available performance events',                             note: 'Hardware PMU, software, tracepoints, probes' },
  { cmd: 'perf stat -p <pid>',                 desc: 'Collect hardware counters for a running process',                  note: 'Shows IPC, cache-misses, branch-misses' },
]

// ─── Code snippets ───────────────────────────────────────────────────────────
const dmsgBasic = `# Basic ring buffer reading
dmesg                             # raw, default format
dmesg -T                          # human-readable timestamps
dmesg -H                          # human-friendly (colored, paged)
dmesg -x                          # show facility and level prefix

# Filter by severity
dmesg -l err                      # errors only
dmesg -l err,warn                 # errors and warnings
dmesg -l crit,alert,emerg         # critical and above

# Filter by facility
dmesg -f kern                     # kernel messages only
dmesg -f daemon                   # daemon messages

# Live watching
dmesg -w                          # follow mode (Ctrl-C to stop)
dmesg -wT                         # follow with timestamps

# Combined useful filters
dmesg -T | grep -i "error\|fail\|warn\|oom\|killed"
dmesg --since "1 hour ago"        # requires util-linux >= 2.32

# Previous boot (via journal — dmesg only covers current boot)
journalctl -k -b -1               # kernel messages, previous boot
journalctl -k -b -2               # two boots ago`

const dmsgSeverity = `# Severity levels (syslog-compatible)
# 0 emerg   — system is unusable
# 1 alert   — action must be taken immediately
# 2 crit    — critical conditions (hardware failure)
# 3 err     — error conditions
# 4 warn    — warning conditions
# 5 notice  — normal but significant condition
# 6 info    — informational messages
# 7 debug   — debug-level messages

# Set console log level (messages at level <= this go to console)
dmesg -n 3                        # only show crit/alert/emerg on console
echo 7 > /proc/sys/kernel/printk  # same, persistent only until reboot

# /proc/sys/kernel/printk contains 4 values:
cat /proc/sys/kernel/printk
# 4  4  1  7
# ^  ^  ^  ^
# |  |  |  +-- boot default
# |  |  +-- minimum level that can be set
# |  +-- default message level
# +-- current console log level`

const procFilesystem = `# /proc — virtual filesystem exposing kernel state (tmpfs-backed)

## CPU information
cat /proc/cpuinfo
# processor   : 0
# vendor_id   : GenuineIntel
# cpu MHz     : 3600.000
# cache size  : 8192 KB
# physical id : 0
# siblings    : 8
# core id     : 0
# cpu cores   : 4
# flags       : fpu vme de pse ... sse4_2 hypervisor

# Count physical cores (not hyperthreads)
grep "^cpu cores" /proc/cpuinfo | uniq

## Memory information
cat /proc/meminfo
# MemTotal:       16319668 kB
# MemFree:         1023416 kB
# MemAvailable:    8423112 kB   <-- usable without swapping
# Buffers:          512308 kB
# Cached:          6128348 kB
# SwapCached:            0 kB
# Active:          4512880 kB
# Inactive:        3891120 kB
# Dirty:             12416 kB   <-- pages waiting to be written
# Writeback:             0 kB
# AnonPages:       2839244 kB
# Mapped:           723540 kB
# Shmem:            298144 kB
# Slab:             512308 kB   <-- kernel slab caches
# SReclaimable:     389044 kB
# SUnreclaim:       123264 kB
# HugePages_Total:       0
# HugePages_Free:        0

## Process information (replace 1234 with PID)
ls /proc/1234/
# cmdline  cwd  environ  exe  fd/  fdinfo/  maps  mem
# mountinfo  net/  ns/  oom_score_adj  smaps  stat  status

cat /proc/1234/status          # human-readable process state
cat /proc/1234/maps            # memory-mapped regions
cat /proc/1234/smaps           # detailed per-mapping stats (includes PSS)
cat /proc/1234/limits          # resource limits (ulimit)
ls -la /proc/1234/fd/          # open file descriptors
ls -la /proc/1234/ns/          # namespaces (ipc,mnt,net,pid,user,uts)

## Network statistics
cat /proc/net/dev               # per-interface RX/TX byte/packet counters
cat /proc/net/sockstat          # socket summary by type
cat /proc/net/tcp               # TCP socket table (hex addresses)
cat /proc/net/tcp6
cat /proc/net/udp
ss -s                           # summary from /proc/net/*

## Interrupt accounting
cat /proc/interrupts
# CPU0  CPU1  CPU2  CPU3
#   0:  84921     0     0     0  IO-APIC  2-edge  timer
#   1:    780     0     0     0  IO-APIC  1-edge  i8042
#  16:    212     0     0     0  IO-APIC 16-fasteoi  ehci_hcd:usb1
# LOC: 1948221 1820433 1699122 1601881  Local timer interrupts
# RES: 423121   412345   398231   387123  Rescheduling interrupts

## Other useful /proc files
cat /proc/loadavg               # 1/5/15-min load + running/total procs + last PID
cat /proc/uptime                # seconds up, seconds idle
cat /proc/vmstat                # detailed VM statistics
cat /proc/diskstats             # block device I/O statistics
cat /proc/mounts                # currently mounted filesystems
cat /proc/modules               # same as lsmod but raw
cat /proc/slabinfo              # kernel slab allocator stats`

const procSys = `# /proc/sys — live kernel tunables (mirrors sysctl namespace)

## Kernel parameters
cat /proc/sys/kernel/hostname
cat /proc/sys/kernel/pid_max          # max PID number (default 32768)
cat /proc/sys/kernel/threads-max      # max threads system-wide
cat /proc/sys/kernel/dmesg_restrict   # 0=all, 1=root only
cat /proc/sys/kernel/perf_event_paranoid  # -1=all, 0=measured, 1=no-kernel, 2=no-user
cat /proc/sys/kernel/panic            # seconds before reboot on panic (0=no auto reboot)
cat /proc/sys/kernel/panic_on_oops    # 1=panic (not just oops) on kernel oops
cat /proc/sys/kernel/sysrq            # SysRq key functionality bitmask
cat /proc/sys/kernel/ngroups_max      # max supplementary groups per user

## VM tuning
cat /proc/sys/vm/swappiness           # 0-200, tendency to use swap (default 60)
cat /proc/sys/vm/dirty_ratio          # % RAM dirty pages before synchronous writeback
cat /proc/sys/vm/dirty_background_ratio  # % RAM that triggers background writeback
cat /proc/sys/vm/overcommit_memory    # 0=heuristic, 1=always allow, 2=strict
cat /proc/sys/vm/drop_caches          # write 1/2/3 to drop page/slab/both caches
cat /proc/sys/vm/min_free_kbytes      # watermark; kernel tries to keep this free
cat /proc/sys/vm/oom_kill_allocating_task  # 1=kill task triggering OOM first

## Network tuning
cat /proc/sys/net/ipv4/ip_forward     # 1=routing enabled
cat /proc/sys/net/ipv4/tcp_syncookies # SYN-flood protection
cat /proc/sys/net/core/somaxconn      # max listen() backlog
cat /proc/sys/net/core/rmem_max       # max socket receive buffer
cat /proc/sys/net/core/wmem_max       # max socket send buffer

## Writing a tunable (takes effect immediately, lost on reboot)
echo 10 > /proc/sys/vm/swappiness
# Equivalent via sysctl:
sysctl -w vm.swappiness=10`

const sysfsSection = `# /sys — sysfs: structured view of kernel device model
# Populated by udev/systemd-udevd from kernel kobjects

## Navigate device hierarchy
ls /sys/devices/                      # physical device tree
ls /sys/bus/                          # buses: pci, usb, platform, i2c, spi
ls /sys/class/                        # device classes: block, net, tty, input
ls /sys/block/                        # block devices (links into /sys/devices/)
ls /sys/module/                       # loaded modules + their parameters

## Read device attributes
cat /sys/block/sda/size               # size in 512-byte sectors
cat /sys/block/sda/queue/scheduler    # I/O scheduler: [mq-deadline] kyber bfq none
cat /sys/block/sda/queue/rotational   # 0 = SSD, 1 = spinning disk
cat /sys/block/sda/queue/nr_requests  # I/O queue depth
cat /sys/block/sda/stat               # I/O statistics

## Change I/O scheduler at runtime
echo mq-deadline > /sys/block/sda/queue/scheduler
echo none > /sys/block/nvme0n1/queue/scheduler   # for NVMe: none is often best

## Network device attributes
cat /sys/class/net/eth0/speed         # link speed in Mbit/s
cat /sys/class/net/eth0/duplex        # half / full
cat /sys/class/net/eth0/operstate     # up / down / unknown
cat /sys/class/net/eth0/statistics/rx_errors
cat /sys/class/net/eth0/statistics/tx_dropped

## CPU topology
cat /sys/devices/system/cpu/cpu0/topology/core_id
cat /sys/devices/system/cpu/cpu0/topology/physical_package_id
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor  # performance|powersave
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq

## Power management
cat /sys/class/power_supply/BAT0/capacity   # battery percentage (laptops)
cat /sys/class/thermal/thermal_zone0/temp   # CPU temperature (millidegrees Celsius)

## udev integration
udevadm info /sys/block/sda           # udev properties for a device
udevadm info -a /sys/block/sda        # full attribute hierarchy
udevadm monitor                       # watch udev events in real time
udevadm trigger                       # re-play add events (reload rules)
udevadm control --reload-rules        # reload udev rules without reboot`

const kernelModules = `# ─── Listing modules ───────────────────────────────────────────────────────
lsmod
# Module                  Size  Used by
# xfs                  1564672  1
# libcrc32c              16384  1 xfs
# sr_mod                 28672  0
# cdrom                  69632  1 sr_mod
# e1000                 155648  0

lsmod | grep -i nvidia            # check for a specific module

# ─── Module metadata ────────────────────────────────────────────────────────
modinfo xfs
# filename:       /lib/modules/5.14.0-427.el9.x86_64/kernel/fs/xfs/xfs.ko.xz
# license:        GPL
# description:    SGI XFS with ACLs, security labels, no debug enabled
# alias:          fs-xfs
# depends:        libcrc32c
# retpoline:      Y
# rhelversion:    9.4
# intree:         Y
# vermagic:       5.14.0-427.el9.x86_64 SMP preempt mod_unload modversions

modinfo -p dm_mod                  # show module parameters and their descriptions

# ─── Loading and unloading ──────────────────────────────────────────────────
modprobe dm_mod                    # load with dependencies
modprobe -r dm_mod                 # unload (if not in use)
modprobe --show-depends xfs        # show what would be loaded
modprobe -v vboxdrv                # verbose output during load

rmmod <module>                     # low-level remove (no dep tracking)
insmod /path/to/module.ko          # low-level load from explicit path

# ─── Persistent module loading ──────────────────────────────────────────────
# Files in /etc/modules-load.d/ are processed by systemd-modules-load.service
# at boot time. One module name per line.
cat /etc/modules-load.d/virtio.conf
# virtio_net
# virtio_blk
# virtio_scsi

echo "br_netfilter" > /etc/modules-load.d/k8s.conf

# ─── Blacklisting modules ───────────────────────────────────────────────────
# /etc/modprobe.d/*.conf — options, aliases, blacklists
cat /etc/modprobe.d/blacklist.conf
# blacklist nouveau
# blacklist pcspkr

# install with /bin/false prevents even manual load:
echo "install pcspkr /bin/false" > /etc/modprobe.d/no-pcspkr.conf

# Verify blacklist is active
modprobe -n pcspkr            # -n = dry run; "install /bin/false" means blocked

# ─── Module parameters ──────────────────────────────────────────────────────
# Set parameter at load time:
modprobe e1000 InterruptThrottleRate=3000

# Set parameter persistently:
echo "options e1000 InterruptThrottleRate=3000" > /etc/modprobe.d/e1000.conf

# Read current parameter value:
cat /sys/module/e1000/parameters/InterruptThrottleRate`

const sysctlSection = `# ─── Reading parameters ────────────────────────────────────────────────────
sysctl kernel.hostname             # read one parameter
sysctl -a                          # read all parameters
sysctl -a --deprecated             # include deprecated parameters
sysctl -a 2>/dev/null | grep vm    # filter by namespace
sysctl net.ipv4.tcp_keepalive_time
# net.ipv4.tcp_keepalive_time = 7200

# ─── Setting parameters (temporary — lost on reboot) ────────────────────────
sysctl -w vm.swappiness=10
sysctl -w net.ipv4.ip_forward=1
sysctl -w kernel.panic=30          # auto-reboot 30s after kernel panic
sysctl -w kernel.panic_on_oops=1   # treat oops as panic (reboot)

# ─── Making parameters permanent ────────────────────────────────────────────
# /etc/sysctl.conf — legacy location (still works)
# /etc/sysctl.d/*.conf — preferred drop-in directory
# /usr/lib/sysctl.d/*.conf — vendor/package defaults (don't edit)
# /run/sysctl.d/*.conf — runtime overrides

# Precedence: /etc/sysctl.d/ > /etc/sysctl.conf > /usr/lib/sysctl.d/
# Last file wins for duplicate keys; files read in lexicographic order

cat /etc/sysctl.d/99-performance.conf
# # Reduce swap tendency
# vm.swappiness = 10
#
# # Enable IP forwarding for routing/k8s
# net.ipv4.ip_forward = 1
#
# # Increase file descriptor limits
# fs.file-max = 2097152
#
# # Kernel panic handling
# kernel.panic = 30
# kernel.panic_on_oops = 1
#
# # Network performance
# net.core.somaxconn = 65535
# net.ipv4.tcp_rmem = 4096 87380 16777216
# net.ipv4.tcp_wmem = 4096 65536 16777216

# Apply immediately without reboot:
sysctl -p /etc/sysctl.d/99-performance.conf
# Or reload all:
sysctl --system

# ─── Key exam parameters to know ────────────────────────────────────────────
# kernel.pid_max          default 32768; increase on busy servers: 4194304
# kernel.dmesg_restrict   1 = non-root cannot read dmesg
# kernel.perf_event_paranoid  1 = default safe; -1 = allow all
# vm.overcommit_memory    0=heuristic, 1=always, 2=strict (OOM-safe DB use)
# vm.drop_caches          echo 3 drops pagecache + slab (safely)
# vm.dirty_ratio          20 = start sync writeback at 20% dirty pages
# net.ipv4.tcp_syncookies 1 = SYN flood protection
# net.ipv6.conf.all.disable_ipv6 = 1  — disable IPv6`

const kernelOops = `# ─── Sample kernel Oops output ─────────────────────────────────────────────
# BUG: kernel NULL pointer dereference, address: 0000000000000008
# #PF: supervisor read access in kernel mode
# #PF: error_code(0x0000) - not-present page
# PGD 0 P4D 0
# Oops: 0000 [#1] SMP PTI
# CPU: 3 PID: 8421 Comm: bash Tainted: G           OE     5.14.0-427.el9.x86_64 #1
# Hardware name: VMware, Inc. VMware Virtual Platform/440BX Desktop Reference Platform
# RIP: 0010:bad_module_function+0x14/0x30 [bad_module]
# Code: 48 8b 47 08 48 85 c0 74 0a 48 8b 00 48 89 c7 e8 b3 ff ff ff ...
# RSP: 0018:ffffa4f380de3d48 EFLAGS: 00010246
# RAX: 0000000000000000 RBX: ffff8f1c40f78000 RCX: 0000000000000000
# RDX: 0000000000000000 RSI: 0000000000000000 RDI: 0000000000000000
# ...
# Call Trace:
#  <TASK>
#  do_init_module+0x4d/0x230
#  load_module+0xd3b/0xf40
#  __do_sys_finit_module+0xb6/0x110
#  do_syscall_64+0x5b/0x80
#  entry_SYSCALL_64_after_hwframe+0x6e/0xd8
# RIP: 0033:0x7f9a1b2c3d4e

# ─── Reading a Kernel Oops ───────────────────────────────────────────────────
# 1. "Tainted:" field — kernel state:
#    G = tainted by proprietary module (G = all GPL modules; no G = out-of-tree)
#    E = unsigned module loaded
#    O = out-of-tree (not upstream) module
#    W = taint by warning
#    U = user asked to taint kernel (unreliable core dump)
#
# 2. RIP (64-bit) or EIP (32-bit) — the instruction pointer at crash time
#    Format: segment:function+offset/size [module]
#    bad_module_function+0x14/0x30 [bad_module]
#    Offset 0x14 into a 0x30-byte function in the bad_module.ko module
#
# 3. Call Trace — backtrace of active stack frames (most recent first)
#
# 4. Decode with:
grep "bad_module" /proc/modules    # confirm module is loaded
addr2line -e /path/to/bad_module.ko 0x14    # map offset to source line
# Or use kernel script:
scripts/decode_stacktrace.sh vmlinux < oops.txt`

const kdumpSetup = `# ─── kdump — capture kernel vmcore on panic ─────────────────────────────────

# 1. Install kdump
dnf install kexec-tools crash kernel-debuginfo

# 2. Reserve crash kernel memory in GRUB
# Add crashkernel=auto (or crashkernel=256M) to kernel command line
vi /etc/default/grub
# GRUB_CMDLINE_LINUX="... crashkernel=auto"
grub2-mkconfig -o /boot/grub2/grub.cfg

# 3. Configure kdump target (default: local /var/crash)
cat /etc/kdump.conf
# path /var/crash
# core_collector makedumpfile -l --message-level 1 -d 31

# Other targets:
# nfs my-nfs-server.example.com:/kdump/saves
# ssh user@crash-server.example.com

# 4. Enable and start
systemctl enable --now kdump
kdumpctl status
# Kdump is operational

# 5. Test (WARNING: forces a crash — only on non-production)
echo 1 > /proc/sysrq-trigger      # manual SysRq
echo c > /proc/sysrq-trigger      # ONLY if kernel.sysrq allows it (unsafe!)

# 6. Analyze the vmcore
ls /var/crash/
# 2024-01-15-14:23:05/vmcore
# 2024-01-15-14:23:05/vmcore-dmesg.txt

crash /usr/lib/debug/lib/modules/$(uname -r)/vmlinux \\
      /var/crash/2024-01-15-14:23:05/vmcore

# Inside crash:
# crash> bt           -- backtrace of crashing process
# crash> ps           -- process list at time of crash
# crash> log          -- kernel message buffer at time of crash
# crash> vm           -- virtual memory info
# crash> files        -- open files of current process
# crash> sys          -- system information
# crash> quit

# kdump sysctl parameters:
sysctl kernel.panic          # 0 = hang on panic (for debugging)
sysctl kernel.panic_on_oops  # 1 = panic (and kdump) on Oops`

const kprobesDebug = `# ─── Dynamic debugging — zero-overhead tracing ──────────────────────────────

# Enable pr_debug() messages for a specific module/file at runtime
# (no recompile needed — uses jump_label patching)
echo "module xfs +p" > /sys/kernel/debug/dynamic_debug/control
echo "file fs/xfs/xfs_iops.c +p" > /sys/kernel/debug/dynamic_debug/control
# +p = enable print; -p = disable; +f = add function name; +l = add line number

# View all enabled debug points
cat /sys/kernel/debug/dynamic_debug/control | grep "=p"

# ─── kprobes — instrument any kernel instruction ─────────────────────────────
# kprobe: break at function entry/arbitrary address
# kretprobe: intercept function return value
# Used by BPF, SystemTap, ftrace

# Via ftrace (no kernel recompile)
cd /sys/kernel/debug/tracing
echo "p:myprobe tcp_connect" > kprobe_events   # probe tcp_connect entry
echo 1 > events/kprobes/myprobe/enable
cat trace                                       # read trace output
echo 0 > events/kprobes/myprobe/enable         # disable
echo > kprobe_events                            # remove probe

# ─── ftrace — built-in function tracer ──────────────────────────────────────
cat /sys/kernel/debug/tracing/available_tracers
# blk function_graph function nop

echo function_graph > /sys/kernel/debug/tracing/current_tracer
echo tcp_sendmsg > /sys/kernel/debug/tracing/set_graph_function
echo 1 > /sys/kernel/debug/tracing/tracing_on
# ... run workload ...
echo 0 > /sys/kernel/debug/tracing/tracing_on
cat /sys/kernel/debug/tracing/trace | head -50`

// ─── Component ───────────────────────────────────────────────────────────────
export default function KernelDiagnostics() {
  return (
    <div>
      <PageHeader
        icon={Cpu}
        title="Kernel Diagnostics"
        subtitle="Deep dive into the Linux kernel: dmesg, /proc, /sys, kernel modules, sysctl tuning, Oops decoding, and kdump — everything you need for EX342 kernel troubleshooting questions."
        tags={['dmesg', '/proc', '/sys', 'sysctl', 'modules', 'kdump', 'oops', 'kprobes']}
      />

      {/* ── 1. Architecture ── */}
      <SectionTitle>Linux Kernel Architecture</SectionTitle>
      <p className="section-body mb-2">
        The Linux kernel is a monolithic kernel with modular capabilities. User-space programs
        interact exclusively through the <span className="code-inline">system call interface</span>.
        Device drivers can be compiled into the kernel image or loaded dynamically as
        <span className="code-inline">.ko</span> modules.
      </p>
      <KernelArchDiagram />
      <InfoBox type="exam" title="Architecture Exam Points">
        The kernel ring buffer (accessed via <span className="code-inline">dmesg</span>) has limited
        size — on busy systems early boot messages may be overwritten. Use
        <span className="code-inline">journalctl -k</span> to access persistent kernel logs from
        previous boots. Know the difference: dmesg is volatile in RAM; the journal persists to disk.
      </InfoBox>

      {/* ── 2. dmesg ── */}
      <SectionTitle>dmesg — Kernel Ring Buffer</SectionTitle>
      <p className="section-body mb-2">
        <span className="code-inline">dmesg</span> reads the kernel's circular ring buffer
        (<span className="code-inline">/dev/kmsg</span> internally). All kernel subsystems write
        here using <code className="code-inline">printk()</code>. Size is typically 512 KB but
        configurable at compile time via <span className="code-inline">CONFIG_LOG_BUF_SHIFT</span>.
      </p>
      <CodeBlock title="dmesg — basic usage and severity filtering" code={dmsgBasic} />
      <CodeBlock title="dmesg severity levels and console log level" code={dmsgSeverity} />
      <InfoBox type="tip" title="Quick triage one-liner">
        <span className="code-inline">dmesg -T | grep -Ei "(error|fail|warn|oom|killed|i/o error|hardware error|mce|edac)"</span>
        — covers the most common hardware and software fault indicators in a single pass.
      </InfoBox>
      <InfoBox type="warning" title="Ring Buffer Wrap-Around">
        On high-throughput systems the ring buffer can wrap, discarding old messages before you read
        them. Increase the buffer at boot: add <span className="code-inline">log_buf_len=16M</span>
        to the kernel command line in <span className="code-inline">/etc/default/grub</span>, then
        run <span className="code-inline">grub2-mkconfig</span>.
      </InfoBox>

      {/* ── 3. /proc ── */}
      <SectionTitle>/proc Filesystem — Kernel Data Structures</SectionTitle>
      <p className="section-body mb-2">
        <span className="code-inline">/proc</span> is a pseudo-filesystem (type <em>proc</em>)
        mounted at boot. It exposes kernel data structures as files — reading them calls kernel
        functions; writing to them changes kernel state. It is the primary diagnostic interface
        for process inspection, memory, networking, and hardware status.
      </p>
      <CodeBlock title="/proc — CPU, memory, process, network, and interrupt info" code={procFilesystem} />

      <SubTitle>/proc/sys — Kernel Tunables via sysctl</SubTitle>
      <p className="section-body mb-2">
        The <span className="code-inline">/proc/sys/</span> subtree maps one-to-one onto sysctl
        namespaces. Writing to these files changes kernel behavior immediately (no reboot). Use
        dots vs. slashes: <span className="code-inline">vm.swappiness</span> maps to
        <span className="code-inline">/proc/sys/vm/swappiness</span>.
      </p>
      <CodeBlock title="/proc/sys — important tunables" code={procSys} />
      <InfoBox type="exam" title="/proc Exam Essentials">
        <ul className="list-disc pl-4 space-y-1">
          <li><span className="code-inline">/proc/meminfo</span> — MemAvailable is the field that matters for "how much memory can be used without swapping"</li>
          <li><span className="code-inline">/proc/[pid]/fd/</span> — shows open file descriptors; useful for "what files does this process have open"</li>
          <li><span className="code-inline">/proc/[pid]/limits</span> — current ulimits; compare with <span className="code-inline">ulimit -a</span></li>
          <li><span className="code-inline">/proc/sys/vm/drop_caches</span> — write 3 to free page cache + slab (safe, no data loss)</li>
          <li><span className="code-inline">/proc/sys/kernel/panic_on_oops</span> — set to 1 on production to get kdump on any Oops</li>
        </ul>
      </InfoBox>

      {/* ── 4. /sys ── */}
      <SectionTitle>/sys Filesystem — sysfs and Device Model</SectionTitle>
      <p className="section-body mb-2">
        <span className="code-inline">/sys</span> (sysfs) was introduced to move device-specific
        information out of <span className="code-inline">/proc</span>. It reflects the kernel's
        internal kobject hierarchy — every bus, device, driver, and module is represented.
        <span className="code-inline">udev</span> (now part of systemd) watches sysfs events to
        create/remove device nodes in <span className="code-inline">/dev</span>.
      </p>
      <CodeBlock title="sysfs — device attributes, I/O scheduler, udev" code={sysfsSection} />
      <InfoBox type="tip" title="I/O Scheduler Tuning">
        For NVMe SSDs: set scheduler to <span className="code-inline">none</span>. For SATA SSDs:
        <span className="code-inline">mq-deadline</span>. For HDDs:
        <span className="code-inline">bfq</span> (good for desktops) or
        <span className="code-inline">mq-deadline</span> (servers). Persistent tuning via udev rule:
        <span className="code-inline">ACTION=="add", SUBSYSTEM=="block", KERNEL=="nvme*", ATTR{"{"}queue/scheduler{"}"} ="none"</span>
        in <span className="code-inline">/etc/udev/rules.d/60-io-scheduler.rules</span>.
      </InfoBox>

      {/* ── 5. Kernel Modules ── */}
      <SectionTitle>Kernel Modules</SectionTitle>
      <p className="section-body mb-2">
        Kernel modules (<span className="code-inline">.ko</span> files) extend the kernel at
        runtime without rebooting. They live in
        <span className="code-inline">/lib/modules/$(uname -r)/</span>. The
        <span className="code-inline">depmod</span> utility builds
        <span className="code-inline">modules.dep</span> which <span className="code-inline">modprobe</span>
        uses to resolve dependencies automatically.
      </p>
      <CodeBlock title="Kernel module management — lsmod, modprobe, blacklisting" code={kernelModules} />
      <InfoBox type="exam" title="Module Exam Tips">
        <ul className="list-disc pl-4 space-y-1">
          <li>Blacklisting with <span className="code-inline">blacklist</span> prevents auto-loading; use <span className="code-inline">install module /bin/false</span> to block manual load too</li>
          <li><span className="code-inline">modprobe -r</span> removes a module AND unused dependencies; <span className="code-inline">rmmod</span> removes only the named module</li>
          <li>Modules loaded via <span className="code-inline">/etc/modules-load.d/</span> are loaded by <span className="code-inline">systemd-modules-load.service</span> — check with <span className="code-inline">systemctl status systemd-modules-load</span></li>
          <li>Signing enforcement: <span className="code-inline">CONFIG_MODULE_SIG_FORCE</span> — on secure boot systems, unsigned modules will refuse to load</li>
        </ul>
      </InfoBox>

      {/* ── 6. sysctl ── */}
      <SectionTitle>sysctl — Kernel Parameter Tuning</SectionTitle>
      <p className="section-body mb-2">
        sysctl provides a stable interface for reading and writing kernel parameters. Files in
        <span className="code-inline">/etc/sysctl.d/</span> are processed at boot in alphabetical
        order; higher-numbered files (e.g. <span className="code-inline">99-custom.conf</span>)
        override lower-numbered ones. Changes via <span className="code-inline">sysctl -w</span>
        are immediate but volatile.
      </p>
      <CodeBlock title="sysctl — reading, writing, persistent configuration" code={sysctlSection} />
      <InfoBox type="warning" title="sysctl -p vs --system">
        <span className="code-inline">sysctl -p</span> without arguments only loads
        <span className="code-inline">/etc/sysctl.conf</span> — it does NOT read
        <span className="code-inline">/etc/sysctl.d/</span>. Use
        <span className="code-inline">sysctl --system</span> to load ALL configuration files in
        the correct precedence order.
      </InfoBox>
      <InfoBox type="exam" title="Critical sysctl Parameters for the Exam">
        <div className="space-y-1">
          <div><span className="code-inline">kernel.panic=30</span> — reboot 30s after panic (0=hang forever)</div>
          <div><span className="code-inline">kernel.panic_on_oops=1</span> — treat any Oops as a panic (enables kdump capture)</div>
          <div><span className="code-inline">vm.swappiness=10</span> — reduces swap activity; 0 means swap only when out of memory</div>
          <div><span className="code-inline">vm.overcommit_memory=2</span> — strict mode; OOM less likely; used for databases</div>
          <div><span className="code-inline">net.ipv4.ip_forward=1</span> — enables IP routing (required for NAT/routing)</div>
          <div><span className="code-inline">net.ipv4.tcp_syncookies=1</span> — SYN-flood mitigation</div>
        </div>
      </InfoBox>

      {/* ── 7. Kernel Oops & Panics ── */}
      <SectionTitle>Kernel Oops and Panics</SectionTitle>
      <p className="section-body mb-2">
        A <strong className="text-gray-200">Kernel Oops</strong> is a non-fatal error detected by
        the kernel (null pointer dereference, bad memory access in kernel context). The kernel prints
        diagnostics and may continue. A <strong className="text-gray-200">Kernel Panic</strong> is
        fatal — the kernel cannot safely continue and halts (or reboots if
        <span className="code-inline">kernel.panic</span> &gt; 0).
      </p>
      <CodeBlock title="Kernel Oops — reading and decoding" code={kernelOops} />
      <CodeBlock title="kdump setup — capture vmcore for post-mortem analysis" code={kdumpSetup} />
      <InfoBox type="danger" title="Production Systems — Oops vs Panic">
        On production systems set <span className="code-inline">kernel.panic_on_oops=1</span> and
        <span className="code-inline">kernel.panic=30</span>. This ensures: (1) a vmcore is captured
        by kdump, (2) the system reboots automatically within 30 seconds. Without this, an Oops may
        leave the system in a degraded but running state, masking data corruption.
      </InfoBox>
      <InfoBox type="exam" title="kdump Exam Requirements">
        <ul className="list-disc pl-4 space-y-1">
          <li>Requires <span className="code-inline">crashkernel=auto</span> (or explicit size like <span className="code-inline">256M</span>) in the kernel command line — must reboot after adding</li>
          <li>Package: <span className="code-inline">kexec-tools</span>; analysis: <span className="code-inline">crash</span> + <span className="code-inline">kernel-debuginfo</span></li>
          <li>vmcore stored in <span className="code-inline">/var/crash/</span> by default</li>
          <li>Check readiness: <span className="code-inline">kdumpctl status</span> must say "operational"</li>
          <li>The <span className="code-inline">crash</span> tool commands: <span className="code-inline">bt</span>, <span className="code-inline">log</span>, <span className="code-inline">ps</span>, <span className="code-inline">vm</span></li>
        </ul>
      </InfoBox>

      {/* ── 8. kprobes ── */}
      <SectionTitle>kprobes and Dynamic Debugging</SectionTitle>
      <p className="section-body mb-2">
        Dynamic debug allows enabling <span className="code-inline">pr_debug()</span> /
        <span className="code-inline">dev_dbg()</span> messages without recompiling the kernel.
        kprobes insert breakpoints at any kernel instruction at runtime, enabling tracing tools
        like BPF, SystemTap, and ftrace.
      </p>
      <CodeBlock title="Dynamic debug, kprobes, and ftrace" code={kprobesDebug} />
      <InfoBox type="info" title="BPF and the Modern Tracing Stack">
        For EX342, focus on <span className="code-inline">dmesg</span>, <span className="code-inline">ftrace</span>,
        and <span className="code-inline">perf</span>. BPF tools (bpftrace, BCC/bpfcc-tools) are
        increasingly common on RHEL 9 but are more relevant to advanced performance analysis than
        exam scenarios. Know that <span className="code-inline">perf record / perf report</span>
        captures CPU performance events.
      </InfoBox>

      {/* ── 9. Crash Investigation Flow ── */}
      <SectionTitle>Kernel Crash Investigation Workflow</SectionTitle>
      <FlowDiagram
        title="Kernel Crash Investigation Workflow"
        steps={kernelCrashFlow}
      />

      {/* ── 10. Command Reference ── */}
      <SectionTitle>Kernel Diagnostics Command Reference</SectionTitle>
      <CommandTable
        title="All Kernel Diagnostic Commands"
        rows={kernelCmdRows}
      />

      <InfoBox type="exam" title="Final Exam Checklist — Kernel">
        <ul className="list-disc pl-4 space-y-1">
          <li>Know <span className="code-inline">dmesg -l err,warn</span> and <span className="code-inline">journalctl -k -b -1</span> for post-reboot analysis</li>
          <li>Navigate <span className="code-inline">/proc/sys/</span> and map to <span className="code-inline">sysctl</span> dot-notation</li>
          <li>Make sysctl changes permanent via <span className="code-inline">/etc/sysctl.d/</span> and apply with <span className="code-inline">sysctl --system</span></li>
          <li>Blacklist modules with <span className="code-inline">/etc/modprobe.d/</span>; auto-load with <span className="code-inline">/etc/modules-load.d/</span></li>
          <li>kdump: <span className="code-inline">crashkernel=auto</span>, <span className="code-inline">kexec-tools</span>, <span className="code-inline">kdumpctl status</span>, vmcore in <span className="code-inline">/var/crash/</span></li>
          <li>Taint flags in Oops output: G/E/O/W indicate module trustworthiness</li>
        </ul>
      </InfoBox>
    </div>
  )
}
