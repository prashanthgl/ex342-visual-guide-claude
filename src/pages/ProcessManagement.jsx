import { Layers } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'
import FlowDiagram from '../components/FlowDiagram'
import CommandTable from '../components/CommandTable'

export default function ProcessManagement() {
  return (
    <div>
      <PageHeader
        icon={Layers}
        title="Process Management"
        subtitle="Deep coverage of process lifecycle, signals, zombie processes, resource limits, cgroups v2, systemd service management, and core dump analysis for EX342."
        tags={['processes', 'signals', 'cgroups', 'systemd', 'ulimits', 'coredump', 'zombie']}
      />

      {/* ── 1. PROCESS LIFECYCLE ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Process Lifecycle: fork/exec Model
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          Every Linux process is created by <code className="font-mono text-xs text-token-string">fork()</code> — a system call
          that creates an exact copy of the parent process. The child then calls
          <code className="font-mono text-xs text-token-string"> exec()</code> to replace its memory image with a new program.
          This fork/exec model means every process has a parent (PPID), and the entire process tree is rooted at PID 1 (systemd).
        </p>

        <div className="rounded-lg border border-border bg-surface-1 p-4 mb-4 font-mono text-xs text-gray-400">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="bg-purple-900/50 border border-purple-700 px-3 py-2 rounded text-center">
              <div className="text-purple-300 font-bold">systemd</div>
              <div className="text-gray-500">PID 1</div>
            </div>
            <span className="text-rh-red">fork()→</span>
            <div className="bg-blue-900/50 border border-blue-700 px-3 py-2 rounded text-center">
              <div className="text-blue-300 font-bold">child (copy)</div>
              <div className="text-gray-500">PPID=1, PID=N</div>
            </div>
            <span className="text-rh-red">exec()→</span>
            <div className="bg-green-900/50 border border-green-700 px-3 py-2 rounded text-center">
              <div className="text-green-300 font-bold">new program</div>
              <div className="text-gray-500">same PID=N</div>
            </div>
            <span className="text-rh-red">exit()→</span>
            <div className="bg-yellow-900/50 border border-yellow-700 px-3 py-2 rounded text-center">
              <div className="text-yellow-300 font-bold">zombie</div>
              <div className="text-gray-500">until parent wait()</div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">/proc/[pid]/ — Process Information Filesystem</h3>
        <CodeBlock
          language="bash"
          title="/proc/[pid]/ — key files"
          code={`# Every running process has a directory under /proc/
ls /proc/1234/

# Key files:
# cmdline    — full command line (null-delimited)
# status     — human-readable process info (name, state, PID, PPID, UIDs, memory)
# stat       — machine-readable stats (used by ps, top)
# maps       — memory mappings (virtual address space)
# fd/        — directory of open file descriptors (symlinks to files)
# fdinfo/    — file descriptor flags and positions
# environ    — environment variables (null-delimited)
# limits     — current resource limits
# cgroup     — cgroup membership
# oom_score  — OOM killer score (higher = more likely to be killed)
# oom_score_adj — manual OOM score adjustment (-1000 to +1000)
# io         — I/O statistics (read_bytes, write_bytes)
# net/       — network stats for this process's namespace
# ns/        — namespaces (mnt, uts, ipc, net, pid, user)

# Read process status
cat /proc/1234/status

# See open files (like lsof for one PID)
ls -la /proc/1234/fd/

# Read command line
tr '\0' ' ' < /proc/1234/cmdline

# Check current limits
cat /proc/1234/limits

# Check cgroup membership
cat /proc/1234/cgroup`}
        />
      </section>

      {/* ── 2. PROCESS STATES ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Process States
        </h2>

        <div className="rounded-lg border border-border bg-surface-1 overflow-hidden mb-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide w-12">Code</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">State</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Description</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Diagnosis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                ['R', 'Running', 'On CPU or in run queue ready to run', 'Normal — high R count means CPU saturation'],
                ['S', 'Sleeping (interruptible)', 'Waiting for event (I/O, timer, signal). Can be woken by signal', 'Normal for most processes'],
                ['D', 'Sleeping (uninterruptible)', 'Waiting for I/O — CANNOT be interrupted. Cannot be killed with SIGKILL', 'D state processes indicate storage/NFS issues'],
                ['Z', 'Zombie', 'Exited but parent has not called wait() — entry kept in process table', 'Fix: kill parent or inspect parent for wait() bug'],
                ['T', 'Stopped', 'Process suspended by SIGSTOP or job control (Ctrl+Z)', 'Resume with SIGCONT, or kill with SIGKILL'],
                ['t', 'Traced/stopped', 'Stopped by debugger (ptrace)', 'Process under gdb or strace'],
                ['W', 'Paging', 'Paging out to swap (obsolete in kernels >= 2.6)', 'Rare — indicates memory pressure'],
                ['X', 'Dead', 'Should never be seen — process completely gone', 'Transient state'],
                ['I', 'Idle', 'Kernel idle thread', 'Normal for kernel threads'],
              ].map(([code, state, desc, diag], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-surface-0' : 'bg-surface-1/40'}>
                  <td className="px-4 py-2 font-mono text-rh-red font-bold text-sm">{code}</td>
                  <td className="px-4 py-2 text-gray-300 font-medium">{state}</td>
                  <td className="px-4 py-2 text-gray-400">{desc}</td>
                  <td className="px-4 py-2 text-gray-500">{diag}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          language="bash"
          title="Checking process states"
          code={`# Show all processes with state
ps aux                    # STAT column shows state
ps -eo pid,ppid,stat,comm,wchan

# Count by state
ps -eo stat | grep -c "^R"   # running
ps -eo stat | grep -c "^D"   # uninterruptible sleep (D-state problem)
ps -eo stat | grep -c "^Z"   # zombies

# Find D-state processes (hung on I/O)
ps aux | awk '$8 == "D" {print}'
ps -eo pid,ppid,stat,comm | grep "^[0-9].* D"

# Find zombie processes
ps aux | grep "defunct"
ps -eo pid,ppid,stat,comm | grep " Z"

# What is a D-state process waiting for (kernel function)
cat /proc/<PID>/wchan    # kernel function where process is blocked`}
        />

        <InfoBox type="warning" title="D-State Processes Cannot Be Killed">
          A process in D (uninterruptible sleep) state is waiting for a kernel I/O operation to complete.
          It <strong>cannot</strong> be killed with <code className="font-mono text-xs">kill -9</code>. The only
          resolution is to fix the underlying I/O issue (unmount hung NFS, fix storage hardware, or reboot).
          A high count of D-state processes typically indicates storage or NFS problems.
        </InfoBox>
      </section>

      {/* ── 3. SIGNALS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Signals
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Signals are asynchronous notifications sent to processes. Each signal has a default action
          (terminate, ignore, stop, core dump) that can be overridden by the process.
        </p>

        <div className="rounded-lg border border-border bg-surface-1 overflow-hidden mb-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Signal</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Number</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Default Action</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                ['SIGHUP',  '1',  'Terminate',    'Reload config (most daemons catch this). Terminal hangup.'],
                ['SIGINT',  '2',  'Terminate',    'Keyboard interrupt (Ctrl+C). Graceful termination.'],
                ['SIGQUIT', '3',  'Core dump',    'Quit with core dump (Ctrl+\\)'],
                ['SIGKILL', '9',  'Terminate',    'CANNOT be caught/ignored. Immediate OS-level kill. Last resort.'],
                ['SIGTERM', '15', 'Terminate',    'Default kill signal. Process can catch it for graceful shutdown.'],
                ['SIGSTOP', '19', 'Stop',         'CANNOT be caught. Suspends process. Resume with SIGCONT.'],
                ['SIGTSTP', '20', 'Stop',         'Keyboard stop (Ctrl+Z). Can be caught (unlike SIGSTOP).'],
                ['SIGCONT', '18', 'Continue',     'Resume a stopped/suspended process.'],
                ['SIGCHLD', '17', 'Ignore',       'Sent to parent when child terminates/stops. Used for reaping.'],
                ['SIGUSR1', '10', 'Terminate',    'User-defined. Many apps use to trigger actions (e.g., nginx reload).'],
                ['SIGUSR2', '12', 'Terminate',    'User-defined. App-specific behavior.'],
                ['SIGSEGV', '11', 'Core dump',    'Segmentation fault — invalid memory access.'],
                ['SIGBUS',  '7',  'Core dump',    'Bus error — misaligned memory access.'],
                ['SIGABRT', '6',  'Core dump',    'Abort — raised by abort() or assertion failure.'],
                ['SIGALRM', '14', 'Terminate',    'Timer alarm — set by alarm() syscall.'],
                ['SIGPIPE', '13', 'Terminate',    'Broken pipe — write to a pipe with no readers.'],
              ].map(([sig, num, action, use], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-surface-0' : 'bg-surface-1/40'}>
                  <td className="px-4 py-2 font-mono text-token-string font-bold">{sig}</td>
                  <td className="px-4 py-2 font-mono text-token-number text-center">{num}</td>
                  <td className="px-4 py-2 text-gray-300">{action}</td>
                  <td className="px-4 py-2 text-gray-400">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          language="bash"
          title="kill, pkill, killall, pgrep — sending signals"
          code={`# Send SIGTERM (15) to a PID — graceful shutdown (default)
kill 1234
kill -15 1234
kill -TERM 1234

# Send SIGKILL (9) — force kill (cannot be caught)
kill -9 1234
kill -KILL 1234

# Send SIGHUP (1) — reload config
kill -HUP 1234
kill -1 1234

# Send SIGSTOP / SIGCONT
kill -STOP 1234       # suspend
kill -CONT 1234       # resume

# List all signals
kill -l

# pkill — kill by process name (more convenient than kill)
pkill httpd                  # send SIGTERM to all httpd processes
pkill -9 httpd               # SIGKILL all httpd processes
pkill -HUP sshd              # send SIGHUP (reload) to sshd
pkill -u username            # kill all processes by user
pkill -G groupname           # kill by group
pkill -t pts/1               # kill all processes on terminal pts/1
pkill -f "python script.py"  # match full command line (not just process name)

# killall — similar to pkill
killall httpd
killall -9 httpd
killall -HUP rsyslog

# pgrep — find PIDs without killing
pgrep httpd                  # list PIDs matching name
pgrep -l httpd               # list PID and name
pgrep -u root                # list PIDs by user
pgrep -a httpd               # show full command line
pgrep -P 1234                # list children of PID 1234

# Combined usage:
kill $(pgrep httpd)          # kill all httpd by PID`}
        />

        <CodeBlock
          language="bash"
          title="Signal trapping in shell scripts"
          code={`#!/bin/bash
# Trap signals for graceful shutdown

# Function called on SIGTERM or SIGINT
cleanup() {
    echo "$(date): Caught signal — cleaning up..."
    rm -f /var/run/myscript.pid
    # Close connections, flush buffers, etc.
    exit 0
}

# Register signal handlers
trap cleanup SIGTERM SIGINT SIGHUP

# Write PID file
echo $$ > /var/run/myscript.pid

echo "Script running as PID $$"
while true; do
    # Main work loop
    do_work
    sleep 10
done

# Note: SIGKILL (9) and SIGSTOP (19) CANNOT be trapped
# trap '' SIGTERM   # ignore a signal (not recommended for SIGTERM)`}
        />
      </section>

      {/* ── 4. ZOMBIE PROCESSES ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Zombie Processes
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          A zombie process is one that has exited but whose parent has not yet called
          <code className="font-mono text-xs text-token-string"> wait()</code> to collect its exit status.
          The process entry remains in the process table (consuming a PID and a small amount of kernel memory)
          until the parent reaps it. A few zombies are normal; hundreds indicate a programming bug.
        </p>

        <CodeBlock
          language="bash"
          title="Identifying zombie processes"
          code={`# Find zombies — look for 'Z' in STAT or 'defunct' in command
ps aux | grep Z
ps aux | grep defunct

# More precise — only show zombies
ps -eo pid,ppid,stat,comm | awk '$3 ~ /^Z/ {print}'

# Show zombie with parent info
ps -eo pid,ppid,stat,comm | grep "Z" | while read pid ppid stat comm; do
    echo "Zombie PID=$pid PPID=$ppid CMD=$comm"
    echo "  Parent: $(ps -p $ppid -o comm=)"
done

# Count total zombies
ps -eo stat | grep -c "Z"

# Check if a specific process has zombie children
ps -eo ppid,stat | awk '$1==PARENTPID && $2~/Z/{count++} END{print count}' PARENTPID=1234`}
        />

        <CodeBlock
          language="bash"
          title="Resolving zombie processes"
          code={`# Zombies consume almost no resources — they just hold a PID
# The correct fix is for the parent to call wait()

# Option 1: Send SIGCHLD to parent — may cause parent to reap children
kill -SIGCHLD <PARENT_PID>

# Option 2: Kill the parent process — zombie will be reparented to init (PID 1)
# systemd (PID 1) automatically reaps all orphaned zombies
kill -TERM <PARENT_PID>

# Option 3: If parent is hung, force kill it
kill -9 <PARENT_PID>
# Once parent dies, zombies become children of init and are immediately reaped

# Verify zombies are gone
ps aux | grep defunct

# Python example of what causes zombies:
# import subprocess
# p = subprocess.Popen(['sleep', '5'])
# time.sleep(60)  # ← p has exited but we never called p.wait() → zombie
# p.wait()        # ← this reaps the zombie`}
        />

        <InfoBox type="info" title="Zombies Are Symptoms, Not Bugs Themselves">
          You cannot kill a zombie process directly — it is already dead. Killing the parent is the resolution.
          A large number of zombies always indicates a bug in the parent process (not calling
          <code className="font-mono text-xs"> wait()</code>). On the exam, if asked to resolve zombies, find the
          PPID with <code className="font-mono text-xs">ps -eo pid,ppid,stat</code> and kill the parent.
        </InfoBox>
      </section>

      {/* ── 5. RESOURCE LIMITS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Resource Limits (ulimits)
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Resource limits (ulimits) constrain resource usage per process/user. There are two types:
          <strong className="text-gray-200"> soft limits</strong> (current enforced limit, changeable by user up to hard limit) and
          <strong className="text-gray-200"> hard limits</strong> (ceiling — only root can raise).
        </p>

        <CodeBlock
          language="bash"
          title="ulimit — viewing and setting limits"
          code={`# Show all current limits for the shell
ulimit -a

# Key limits:
# -c  core file size (blocks)         — 0 = no core dumps
# -d  data seg size (kbytes)
# -f  file size (blocks)
# -l  locked-in-memory size (kbytes)  — for mlockall() (e.g., databases)
# -m  max resident set size (kbytes)  — RSS limit
# -n  open files                      — CRITICAL for high-connection apps
# -p  pipe size (512-byte blocks)
# -s  stack size (kbytes)
# -t  CPU time (seconds)
# -u  max user processes              — fork bomb protection
# -v  virtual memory (kbytes)

# Show specific limit
ulimit -n          # open files (soft)
ulimit -Hn         # open files (hard)
ulimit -Sn         # open files (soft)

# Set soft limit (in current shell session only)
ulimit -n 65535

# Set hard limit (root only)
ulimit -Hn 100000

# Set both soft and hard at once
ulimit -Hn 100000 && ulimit -Sn 100000

# Enable core dumps for debugging (unlimited size)
ulimit -c unlimited

# Disable core dumps
ulimit -c 0`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">limits.conf — Persistent Limits</h3>
        <CodeBlock
          language="ini"
          title="/etc/security/limits.conf — PAM-based persistent limits"
          code={`# Format: <domain> <type> <item> <value>
#
# domain:
#   username        — specific user
#   @groupname      — all members of a group
#   *               — all users (except root)
#   root            — the root user
#
# type:
#   soft    — default limit (user can raise up to hard)
#   hard    — ceiling limit (only root can raise)
#   -       — both soft and hard simultaneously
#
# item:
#   nofile      — max open file descriptors
#   nproc       — max number of processes
#   stack       — max stack size (kbytes)
#   core        — max core dump size (kbytes), 0=disabled, unlimited
#   memlock     — max locked memory (kbytes)
#   fsize       — max file size (kbytes)
#   cpu         — max CPU time (minutes)
#   as          — max virtual memory (address space, kbytes)
#   rss         — max resident set size (kbytes)
#   locks       — max file locks
#   sigpending  — max pending signals
#   msgqueue    — max POSIX message queue size (bytes)
#   nice        — max nice priority (negative = higher priority)
#   rtprio      — max real-time priority
#   chroot      — chroot for this user

# Increase file descriptors for app user
appuser         soft    nofile      65535
appuser         hard    nofile      100000

# Limit max processes for all users (fork bomb protection)
*               hard    nproc       4096

# Allow app user unlimited core dumps
appuser         soft    core        unlimited
appuser         hard    core        unlimited

# Database user needs large locked memory
dbuser          soft    memlock     unlimited
dbuser          hard    memlock     unlimited

# Elastic/Java app needs large virtual memory
elastic         soft    memlock     unlimited
elastic         hard    memlock     unlimited
elastic         -       nofile      65535

# Root has its own entry (not covered by *)
root            soft    nofile      65535
root            hard    nofile      65535`}
        />

        <CodeBlock
          language="bash"
          title="/etc/security/limits.d/ — drop-in limit files"
          code={`# Drop-in files in /etc/security/limits.d/ override /etc/security/limits.conf
# Files are processed alphabetically — 90-* values override earlier files

ls /etc/security/limits.d/
# Example: /etc/security/limits.d/20-nproc.conf
# 20-nproc.conf sets default nproc limits

# Create a drop-in for a specific service
cat > /etc/security/limits.d/99-myapp.conf << 'EOF'
myapp   soft    nofile  65535
myapp   hard    nofile  100000
myapp   soft    nproc   32768
myapp   hard    nproc   32768
EOF

# Verify limits take effect after user logs in
su - myapp -c "ulimit -a"

# Check effective limits for a running process
cat /proc/<PID>/limits`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">systemd Unit Limits</h3>
        <CodeBlock
          language="ini"
          title="systemd unit file — resource limits"
          code={`# In a service unit file, limits are set in the [Service] section
# These override /etc/security/limits.conf for the service

[Service]
# Max open file descriptors
LimitNOFILE=65535

# Max processes/threads
LimitNPROC=4096

# Stack size (bytes — or use K/M/G suffix)
LimitSTACK=8M

# Enable core dumps for this service
LimitCORE=infinity

# Max locked memory (for databases, realtime apps)
LimitMEMLOCK=infinity

# Apply to override an existing unit:
# systemctl edit servicename.service  (creates override in /etc/systemd/system/)

# Or create /etc/systemd/system/servicename.service.d/limits.conf:
mkdir -p /etc/systemd/system/myapp.service.d/
cat > /etc/systemd/system/myapp.service.d/limits.conf << 'EOF'
[Service]
LimitNOFILE=65535
LimitNPROC=4096
EOF

systemctl daemon-reload
systemctl restart myapp`}
        />

        <InfoBox type="exam" title="limits.conf Requires Re-Login">
          Changes to <code className="font-mono text-xs">/etc/security/limits.conf</code> take effect only when
          the user logs in anew (PAM applies limits at session start). They do NOT apply to already-running
          processes. For a running service, either restart it or use systemd unit limit overrides.
          Verify with <code className="font-mono text-xs">cat /proc/PID/limits</code>.
        </InfoBox>
      </section>

      {/* ── 6. CGROUPS V2 ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          cgroups v2 Deep Dive
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          Control groups (cgroups) are a kernel feature that hierarchically organizes processes and limits their
          resource consumption. RHEL 9 uses cgroups v2 exclusively. cgroups v2 uses a unified hierarchy
          (single tree) vs cgroups v1 which had per-controller hierarchies.
        </p>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">Hierarchy and Structure</h3>
        <CodeBlock
          language="bash"
          title="cgroups v2 filesystem layout"
          code={`# cgroups v2 mount point
mount | grep cgroup2
# cgroup2 on /sys/fs/cgroup type cgroup2 (rw,nosuid,nodev,noexec,relatime,nsdelegate,memory_recursiveprot)

# Root cgroup
ls /sys/fs/cgroup/
# cgroup.controllers    — controllers enabled at root
# cgroup.procs          — PIDs in root cgroup
# cgroup.subtree_control — controllers delegated to children
# cpu.stat              — CPU statistics for this cgroup
# memory.current        — current memory usage
# memory.max            — memory limit (max = unlimited)
# io.stat               — I/O statistics

# Available controllers
cat /sys/fs/cgroup/cgroup.controllers
# cpuset cpu io memory hugetlb pids rdma misc

# systemd creates a tree like:
# /sys/fs/cgroup/
# ├── system.slice/               ← system services
# │   ├── sshd.service/
# │   ├── httpd.service/
# │   └── ...
# ├── user.slice/                 ← user sessions
# │   └── user-1000.slice/
# │       └── session-1.scope/
# └── machine.slice/              ← VMs and containers`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">cgroup Controllers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">cpu controller</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <div><span className="font-mono text-token-string">cpu.weight</span> — relative CPU share (1–10000, default 100)</div>
              <div><span className="font-mono text-token-string">cpu.max</span> — hard limit: <code>QUOTA PERIOD</code> (e.g., 50000 100000 = 50% of one CPU)</div>
              <div><span className="font-mono text-token-string">cpu.stat</span> — usage statistics</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">memory controller</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <div><span className="font-mono text-token-string">memory.max</span> — hard limit (bytes, or max)</div>
              <div><span className="font-mono text-token-string">memory.high</span> — throttling threshold (soft limit)</div>
              <div><span className="font-mono text-token-string">memory.current</span> — current usage</div>
              <div><span className="font-mono text-token-string">memory.oom_group</span> — kill all procs in group on OOM</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">io controller</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <div><span className="font-mono text-token-string">io.weight</span> — relative I/O priority</div>
              <div><span className="font-mono text-token-string">io.max</span> — I/O rate limit (rbps, wbps, riops, wiops)</div>
              <div><span className="font-mono text-token-string">io.stat</span> — I/O statistics per block device</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">pids controller</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <div><span className="font-mono text-token-string">pids.max</span> — max number of PIDs in this cgroup</div>
              <div><span className="font-mono text-token-string">pids.current</span> — current PID count</div>
              <div>Prevents fork bombs within a cgroup</div>
            </div>
          </div>
        </div>

        <CodeBlock
          language="bash"
          title="Creating and managing cgroups manually"
          code={`# Create a new cgroup (just create a directory)
mkdir /sys/fs/cgroup/myapp

# Enable specific controllers for this cgroup
echo "+cpu +memory +pids" > /sys/fs/cgroup/cgroup.subtree_control

# Set memory limit (500MB)
echo "524288000" > /sys/fs/cgroup/myapp/memory.max

# Set CPU limit (50% of one CPU: 50000 microseconds per 100000 period)
echo "50000 100000" > /sys/fs/cgroup/myapp/cpu.max

# Set CPU weight (relative share, default is 100)
echo "200" > /sys/fs/cgroup/myapp/cpu.weight

# Set PID limit
echo "1000" > /sys/fs/cgroup/myapp/pids.max

# Add a process to the cgroup (write PID to cgroup.procs)
echo <PID> > /sys/fs/cgroup/myapp/cgroup.procs

# Verify
cat /sys/fs/cgroup/myapp/cgroup.procs
cat /proc/<PID>/cgroup

# Delete a cgroup (must be empty — no processes, no child cgroups)
rmdir /sys/fs/cgroup/myapp`}
        />

        <CodeBlock
          language="bash"
          title="systemd-cgls and systemd-cgtop — cgroup monitoring"
          code={`# Show the cgroup hierarchy as a tree
systemd-cgls
systemd-cgls /system.slice
systemd-cgls /user.slice/user-1000.slice

# Show resource usage by cgroup (like top for cgroups)
systemd-cgtop
systemd-cgtop -d 2         # update every 2 seconds
systemd-cgtop -n 1 -b      # batch mode, 1 iteration (for scripting)
systemd-cgtop --depth=3    # limit tree depth

# Check a specific unit's cgroup path
systemctl status httpd.service | grep CGroup:
# CGroup: /system.slice/httpd.service
#         ├─1234 /usr/sbin/httpd -DFOREGROUND
#         └─...

# Check resource limits for a service's cgroup
cat /sys/fs/cgroup/system.slice/httpd.service/memory.max
cat /sys/fs/cgroup/system.slice/httpd.service/cpu.max

# View memory usage of a service
cat /sys/fs/cgroup/system.slice/httpd.service/memory.current`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Slices, Scopes, and Services</h3>
        <CodeBlock
          language="bash"
          title="systemd cgroup unit types"
          code={`# systemd organizes processes into three cgroup unit types:
# service (.service)  — managed processes started by systemd
# scope (.scope)      — externally created processes registered with systemd (e.g., user sessions)
# slice (.slice)      — hierarchical grouping of services/scopes

# List all slices
systemctl list-units --type=slice
# system.slice  — all system services
# user.slice    — all user sessions
# machine.slice — VMs and containers (libvirt, nspawn, podman)

# Run a process in a specific slice (transient cgroup)
systemd-run --slice=myapp.slice --unit=myapp-job mycommand

# Run with resource limits (transient scope)
systemd-run --scope -p MemoryMax=512M -p CPUQuota=50% mycommand

# Configure resource limits in a unit file
cat /etc/systemd/system/myapp.service

# Set cgroup limits for a service via systemd
systemctl set-property httpd.service MemoryMax=1G
systemctl set-property httpd.service CPUQuota=50%
# These are written to: /etc/systemd/system.control/httpd.service.d/

# Reset to default
systemctl revert httpd.service`}
        />
      </section>

      {/* ── 7. SYSTEMD SERVICE MANAGEMENT ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          systemd Service Management
        </h2>

        <CodeBlock
          language="bash"
          title="systemctl — essential commands"
          code={`# Basic service operations
systemctl start httpd.service
systemctl stop httpd.service
systemctl restart httpd.service        # stop then start
systemctl reload httpd.service         # reload config without restart (if supported)
systemctl reload-or-restart httpd      # reload if supported, otherwise restart
systemctl condrestart httpd            # restart only if already running

# Status and inspection
systemctl status httpd.service
systemctl status httpd -l              # full output (no truncation)
systemctl is-active httpd              # active/inactive/failed
systemctl is-enabled httpd             # enabled/disabled/static
systemctl is-failed httpd              # true if in failed state

# Enable/disable (start at boot)
systemctl enable httpd.service
systemctl disable httpd.service
systemctl enable --now httpd           # enable AND start immediately
systemctl disable --now httpd          # disable AND stop immediately

# Masking — prevent a service from being started (even manually)
systemctl mask httpd.service           # creates symlink to /dev/null
systemctl unmask httpd.service

# List units
systemctl list-units --type=service
systemctl list-units --type=service --state=failed
systemctl list-units --type=service --state=running
systemctl list-unit-files --type=service  # shows enable/disable state

# Reset failed state (after fixing the underlying issue)
systemctl reset-failed httpd.service

# Reload systemd daemon after unit file changes
systemctl daemon-reload`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Service Unit File Anatomy</h3>
        <CodeBlock
          language="ini"
          title="/etc/systemd/system/myapp.service — complete unit file"
          code={`[Unit]
# Human-readable description
Description=My Application Server

# Documentation (man pages, URLs, info pages)
Documentation=https://example.com/docs man:myapp(8)

# Start after these units are active
After=network.target network-online.target mysql.service

# Require these units to be running (if they fail, this unit fails)
Requires=mysql.service

# Soft dependency — start after if available, but don't require
Wants=redis.service

# This service conflicts with these units
Conflicts=httpd.service

[Service]
# Service type:
# simple    — process started with ExecStart is the main process (default)
# forking   — process forks, parent exits. Use PIDFile= to track child
# oneshot   — process runs and exits; systemd waits for it to finish
# notify    — process sends sd_notify() when ready (most reliable)
# dbus      — ready when D-Bus name acquired
# idle      — like simple but waits for job queue to clear
Type=notify

# Run as this user/group
User=myapp
Group=myapp

# Working directory
WorkingDirectory=/opt/myapp

# Environment variables
Environment=NODE_ENV=production PORT=3000
EnvironmentFile=/etc/myapp/env   # load from file

# PID file location (required for Type=forking)
PIDFile=/var/run/myapp/myapp.pid

# Pre/Post execution hooks
ExecStartPre=/usr/bin/myapp --check-config
ExecStart=/usr/bin/myapp --config /etc/myapp/config.yaml
ExecStartPost=/usr/bin/myapp-healthcheck
ExecStop=/bin/kill -SIGTERM $MAINPID
ExecStopPost=/bin/rm -f /var/run/myapp/myapp.pid
ExecReload=/bin/kill -SIGHUP $MAINPID

# Restart behavior
# no         — never restart (default)
# always     — always restart
# on-failure — restart on non-zero exit, signal, timeout
# on-abnormal — restart on signal, watchdog timeout
# on-abort   — restart only on unclean signal
# on-success — restart on clean exit (unusual)
Restart=on-failure
RestartSec=5s              # wait before restarting
StartLimitBurst=5          # max restarts within StartLimitIntervalSec
StartLimitIntervalSec=60s  # interval for burst counting

# Timeout settings
TimeoutStartSec=30s
TimeoutStopSec=30s
TimeoutSec=30s             # sets both start and stop

# Resource limits (override /etc/security/limits.conf)
LimitNOFILE=65535
LimitNPROC=4096
LimitCORE=infinity

# Security hardening (optional but recommended)
ProtectSystem=full         # /usr, /boot, /etc read-only
ProtectHome=yes            # /home, /root, /run/user inaccessible
NoNewPrivileges=yes        # cannot gain privileges via setuid
PrivateTmp=yes             # isolated /tmp
PrivateDevices=yes         # limited device access

# Logging
StandardOutput=journal     # stdout → journal
StandardError=journal      # stderr → journal
SyslogIdentifier=myapp     # log identifier prefix

[Install]
# Which target to install this unit under (analogous to runlevel)
WantedBy=multi-user.target`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Restart Policies Compared</h3>
        <div className="rounded-lg border border-border bg-surface-1 overflow-hidden mb-4">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="text-left px-4 py-2 text-gray-400 font-semibold">Restart=</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold">Clean exit (0)</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold">Non-zero exit</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold">Signal (crash)</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold">systemctl stop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                ['no',          '—', '—', '—', '—'],
                ['always',      '✓', '✓', '✓', '—'],
                ['on-failure',  '—', '✓', '✓', '—'],
                ['on-abnormal', '—', '—', '✓', '—'],
                ['on-abort',    '—', '—', 'only unclean signal', '—'],
                ['on-success',  '✓', '—', '—', '—'],
              ].map(([policy, clean, nonzero, signal, stop], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-surface-0' : 'bg-surface-1/40'}>
                  <td className="px-4 py-2 font-mono text-token-string">{policy}</td>
                  <td className={`px-4 py-2 ${clean === '✓' ? 'text-green-400' : 'text-gray-600'}`}>{clean}</td>
                  <td className={`px-4 py-2 ${nonzero === '✓' ? 'text-green-400' : 'text-gray-600'}`}>{nonzero}</td>
                  <td className={`px-4 py-2 ${signal === '✓' ? 'text-green-400' : signal.includes('only') ? 'text-yellow-400' : 'text-gray-600'}`}>{signal}</td>
                  <td className="px-4 py-2 text-gray-600">{stop}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CodeBlock
          language="bash"
          title="Creating and editing unit files"
          code={`# Create a new unit file
vim /etc/systemd/system/myapp.service

# Override specific settings of an existing unit (without replacing it)
# Creates /etc/systemd/system/httpd.service.d/override.conf
systemctl edit httpd.service

# View effective (merged) unit file
systemctl cat httpd.service

# Show all properties of a unit
systemctl show httpd.service
systemctl show httpd.service --property=Restart,RestartSec

# After any unit file change
systemctl daemon-reload

# Follow logs for a unit
journalctl -u myapp.service -f
journalctl -u myapp.service -n 50 --no-pager    # last 50 lines
journalctl -u myapp.service --since "1 hour ago"

# Show why a unit failed
systemctl status myapp.service --no-pager
journalctl -xe -u myapp.service`}
        />
      </section>

      {/* ── 8. CORE DUMPS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Core Dumps
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          A core dump is a snapshot of a process's memory written to disk when it crashes (SIGSEGV, SIGABRT, etc.).
          On RHEL systems with systemd, <code className="font-mono text-xs text-token-string">systemd-coredump</code>
          intercepts and manages core dumps.
        </p>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">core_pattern and ulimit -c</h3>
        <CodeBlock
          language="bash"
          title="Core dump configuration"
          code={`# Check current core_pattern (where core dumps go)
cat /proc/sys/kernel/core_pattern

# Default on systemd systems:
# |/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h
# The | means "pipe to this program" rather than writing to a file

# Traditional core dump to file (disable systemd-coredump interception)
# %e = executable name, %p = PID, %t = timestamp
echo "/tmp/core.%e.%p.%t" > /proc/sys/kernel/core_pattern

# Make it persistent via sysctl
echo "kernel.core_pattern = /var/crash/core.%e.%p.%t" >> /etc/sysctl.conf
sysctl -p

# Enable core dumps in current shell
ulimit -c unlimited

# Verify
ulimit -c

# Enable core dumps for a service in systemd
systemctl edit myapp.service
# Add:
# [Service]
# LimitCORE=infinity

# Trigger a crash for testing
kill -SIGSEGV $$   # will crash current shell (use with caution)
# Or in a test program:
# int *p = NULL; *p = 0;  // segfault`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">coredumpctl — Managing Core Dumps</h3>
        <CodeBlock
          language="bash"
          title="coredumpctl — systemd-coredump management"
          code={`# List all recorded core dumps
coredumpctl list

# List core dumps filtered by executable
coredumpctl list httpd
coredumpctl list /usr/sbin/httpd

# Show detailed info about the most recent core dump
coredumpctl info
coredumpctl info httpd

# Show info about a specific dump (by PID or MESSAGE_ID)
coredumpctl info <PID>

# Example coredumpctl info output:
#          PID: 1234 (httpd)
#          UID: 48 (apache)
#          GID: 48 (apache)
#       Signal: 11 (SEGV)
#    Timestamp: Mon 2024-01-15 10:30:00 EST
# Command Line: /usr/sbin/httpd -DFOREGROUND
#     Exe: /usr/sbin/httpd
#  CoreFile: /var/lib/systemd/coredump/core.httpd.48.abc123.1234567890.zst

# Dump core to stdout (or to a file for analysis)
coredumpctl dump httpd > /tmp/httpd.core
coredumpctl dump -o /tmp/httpd.core httpd

# Open core dump in GDB directly (most useful!)
coredumpctl gdb httpd
coredumpctl gdb <PID>

# In GDB, useful commands:
# (gdb) bt          — backtrace (show call stack)
# (gdb) bt full     — full backtrace with local variables
# (gdb) info threads — list all threads
# (gdb) thread 2    — switch to thread 2
# (gdb) frame 3     — select stack frame 3
# (gdb) list        — show source code at current location
# (gdb) quit        — exit

# Core dump storage location
ls /var/lib/systemd/coredump/

# Configure coredump storage in /etc/systemd/coredump.conf
cat /etc/systemd/coredump.conf`}
        />

        <CodeBlock
          language="ini"
          title="/etc/systemd/coredump.conf — coredump configuration"
          code={`[Coredump]
# Storage: none, external, journal, both
Storage=external

# Compress core dumps (with zstd)
Compress=yes

# Maximum size per core dump (default 2G)
ProcessSizeMax=2G

# Maximum total disk space for all core dumps
MaxUse=

# Keep at least this much free
KeepFree=1G

# After changing, reload:
# systemctl restart systemd-coredump`}
        />

        <InfoBox type="tip" title="Debug Symbols Required for Useful Backtraces">
          To get human-readable function names in GDB backtraces, you need debug symbols.
          On RHEL: <code className="font-mono text-xs">dnf debuginfo-install httpd</code> or
          <code className="font-mono text-xs"> dnf install httpd-debuginfo</code>. Without debug symbols,
          GDB shows only memory addresses. The
          <code className="font-mono text-xs"> debuginfo-install</code> command requires the debuginfo repos to be enabled.
        </InfoBox>
      </section>

      {/* ── 9. FLOW DIAGRAM ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Hung Process Investigation Workflow
        </h2>
        <FlowDiagram
          title="Hung / Unresponsive Process — Investigation Workflow"
          steps={[
            {
              label: '1. Identify the process state',
              sub: 'ps -eo pid,ppid,stat,comm,wchan — look for D, Z, or T state',
              color: 'blue',
            },
            {
              label: '2. Check resource consumption',
              sub: 'top / htop — is it consuming CPU? Memory? Or completely idle?',
              color: 'blue',
            },
            {
              label: '3. Check open files and connections',
              sub: 'lsof -p PID — open files, sockets, pipes; strace -p PID — active syscalls',
              color: 'yellow',
            },
            {
              label: '4. Check if waiting on I/O (D state)',
              sub: 'cat /proc/PID/wchan — kernel function; check iostat, dmesg for storage errors',
              color: 'red',
            },
            {
              label: '5. Check if waiting on network',
              sub: 'ss -tp | grep PID — TCP sockets; check if remote host is reachable',
              color: 'yellow',
            },
            {
              label: '6. Check resource limits',
              sub: 'cat /proc/PID/limits — is nofile, nproc, or memory limit hit?',
              color: 'yellow',
            },
            {
              label: '7. Attempt graceful termination',
              sub: 'kill -TERM PID — sends SIGTERM, allows graceful shutdown',
              color: 'purple',
            },
            {
              label: '8. Force kill if SIGTERM fails',
              sub: 'kill -9 PID — SIGKILL cannot be ignored (except D-state processes)',
              color: 'red',
            },
            {
              label: '9. Collect post-mortem data if crash occurs',
              sub: 'coredumpctl list; coredumpctl gdb PROGRAM — analyze the crash',
              color: 'green',
            },
            {
              label: '10. Fix root cause and restart',
              sub: 'Fix config, limits, storage, or code bug; then: systemctl start servicename',
              color: 'green',
            },
          ]}
        />
      </section>

      {/* ── 10. COMMAND TABLE ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Command Reference
        </h2>
        <CommandTable
          title="Process Management Commands"
          rows={[
            { cmd: 'ps aux',                    desc: 'Show all processes (BSD format)',                    note: 'ps -ef (POSIX format), ps -eo for custom output' },
            { cmd: 'ps -eo pid,ppid,stat,comm', desc: 'Custom output columns',                             note: 'wchan=kernel function blocking process' },
            { cmd: 'ps aux | awk \'$8=="D"\'',  desc: 'Find D-state (uninterruptible) processes',          note: 'High D count = storage/NFS issue' },
            { cmd: 'ps -eo pid,ppid,stat | grep Z', desc: 'Find zombie processes',                         note: 'Kill parent to reap zombies' },
            { cmd: 'pgrep -l NAME',             desc: 'Find PIDs by process name',                         note: '-a shows full cmdline, -P parent PID' },
            { cmd: 'pkill -TERM NAME',          desc: 'Send signal to processes by name',                  note: '-f match full cmdline, -u match by user' },
            { cmd: 'kill -l',                   desc: 'List all signal names and numbers',                  note: 'kill -9 PID = SIGKILL (cannot be caught)' },
            { cmd: 'kill -HUP PID',             desc: 'Send SIGHUP — usually triggers config reload',      note: 'kill -STOP/CONT for suspend/resume' },
            { cmd: 'ulimit -a',                 desc: 'Show all resource limits for current shell',        note: '-Hn hard, -Sn soft, -n open files' },
            { cmd: 'ulimit -c unlimited',       desc: 'Enable core dumps in current session',              note: 'Must also set kernel.core_pattern' },
            { cmd: 'cat /proc/PID/limits',      desc: 'Show effective limits for a running process',       note: 'More reliable than ulimit for services' },
            { cmd: 'cat /proc/PID/status',      desc: 'Process status, state, UIDs, memory',              note: 'VmRSS=resident, VmSwap=swapped' },
            { cmd: 'cat /proc/PID/cgroup',      desc: 'Show cgroup membership for process',               note: 'Shows all controller paths' },
            { cmd: 'cat /proc/PID/wchan',       desc: 'Kernel function where process is blocked',         note: 'Useful for diagnosing D-state' },
            { cmd: 'systemd-cgls',              desc: 'Show cgroup hierarchy as tree',                     note: 'systemd-cgtop for resource usage' },
            { cmd: 'systemd-cgtop',             desc: 'Top-like view of cgroup resource usage',            note: '-d 2 = 2 second interval' },
            { cmd: 'systemd-run --scope CMD',   desc: 'Run command in a transient cgroup scope',           note: '-p MemoryMax=512M -p CPUQuota=50%' },
            { cmd: 'systemctl set-property',    desc: 'Set cgroup resource limits for a service',          note: 'systemctl set-property httpd MemoryMax=1G' },
            { cmd: 'systemctl edit UNIT',       desc: 'Create override file for a unit',                   note: 'Preferred over editing unit file directly' },
            { cmd: 'systemctl daemon-reload',   desc: 'Reload unit files after changes',                   note: 'Required after any .service file edit' },
            { cmd: 'systemctl reset-failed',    desc: 'Clear failed state of a unit',                      note: 'After fixing the underlying issue' },
            { cmd: 'journalctl -u UNIT -f',     desc: 'Follow logs for a specific unit',                   note: '-n 100 for last 100 lines' },
            { cmd: 'coredumpctl list',          desc: 'List all recorded core dumps',                      note: 'coredumpctl list PROGNAME to filter' },
            { cmd: 'coredumpctl info',          desc: 'Show details of most recent core dump',             note: 'coredumpctl info PID for specific' },
            { cmd: 'coredumpctl gdb PROGNAME',  desc: 'Open core dump in GDB',                             note: 'Run "bt" in GDB for backtrace' },
            { cmd: 'cat /proc/sys/kernel/core_pattern', desc: 'Show core dump destination',               note: '| prefix = pipe to program' },
            { cmd: 'strace -p PID',             desc: 'Trace syscalls of a running process',              note: '-e trace=open,read for filtering' },
            { cmd: 'lsof -p PID',               desc: 'List all files opened by a process',               note: 'lsof -i :80 for port-based lookup' },
          ]}
        />
      </section>

      {/* ── EXAM TIPS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Exam Tips
        </h2>
        <InfoBox type="exam" title="D-State Processes Cannot Be Killed">
          Processes in D (uninterruptible sleep) state are waiting for I/O in kernel space.
          <code className="font-mono text-xs"> kill -9</code> has no effect on them.
          Check <code className="font-mono text-xs">cat /proc/PID/wchan</code> to see what kernel function they are
          blocking in. On the exam, if a process won't die, check its state with
          <code className="font-mono text-xs"> ps -eo pid,stat,comm</code> first.
        </InfoBox>
        <InfoBox type="exam" title="ulimit vs limits.conf vs systemd Unit">
          Three places to set resource limits — understand scope: (1) <code className="font-mono text-xs">ulimit</code>
          affects current shell and its children, (2) <code className="font-mono text-xs">/etc/security/limits.conf</code>
          applies to new PAM-authenticated sessions, (3) systemd unit <code className="font-mono text-xs">LimitNOFILE=</code>
          applies to the specific service regardless of PAM. Verify the running limit with
          <code className="font-mono text-xs"> cat /proc/PID/limits</code>.
        </InfoBox>
        <InfoBox type="exam" title="Zombie Processes — Kill the Parent">
          You cannot kill zombie processes directly. Find the parent:
          <code className="font-mono text-xs"> ps -eo pid,ppid,stat,comm | awk '$3~/Z/'</code>.
          Then send SIGCHLD to the parent to trigger reaping, or kill the parent and let systemd (PID 1) reap
          the orphaned zombies automatically.
        </InfoBox>
        <InfoBox type="exam" title="systemctl enable --now">
          <code className="font-mono text-xs">systemctl enable --now UNIT</code> is the single command that both
          enables (start at boot) AND starts the service immediately. This is almost always what you want in
          exam tasks. Similarly, <code className="font-mono text-xs">systemctl disable --now</code> stops and
          disables in one step.
        </InfoBox>
        <InfoBox type="warning" title="Restart= Does Not Override StartLimitBurst">
          If a service restarts too many times too fast, systemd stops trying and puts it in the
          <code className="font-mono text-xs"> failed</code> state even with <code className="font-mono text-xs">Restart=always</code>.
          Check with <code className="font-mono text-xs">systemctl status</code> — you'll see "Start request repeated too quickly".
          Fix the underlying issue then run <code className="font-mono text-xs">systemctl reset-failed UNIT && systemctl start UNIT</code>.
          To be more tolerant, increase <code className="font-mono text-xs">StartLimitBurst=</code> or
          <code className="font-mono text-xs"> StartLimitIntervalSec=</code> in the unit file.
        </InfoBox>
      </section>
    </div>
  )
}
