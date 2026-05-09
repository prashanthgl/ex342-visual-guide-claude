import{j as e,P as l,C as s,I as t,F as d,a as i}from"./pages-core-CbZcPoq3.js";import{d as p,g as u,S as h}from"./vendor-ui-CobY6wdR.js";function G(){return e.jsxs("div",{children:[e.jsx(l,{icon:p,title:"Process Management",subtitle:"Deep coverage of process lifecycle, signals, zombie processes, resource limits, cgroups v2, systemd service management, and core dump analysis for EX342.",tags:["processes","signals","cgroups","systemd","ulimits","coredump","zombie"]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Process Lifecycle: fork/exec Model"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:["Every Linux process is created by ",e.jsx("code",{className:"font-mono text-xs text-token-string",children:"fork()"})," — a system call that creates an exact copy of the parent process. The child then calls",e.jsx("code",{className:"font-mono text-xs text-token-string",children:" exec()"})," to replace its memory image with a new program. This fork/exec model means every process has a parent (PPID), and the entire process tree is rooted at PID 1 (systemd)."]}),e.jsx("div",{className:"rounded-lg border border-border bg-surface-1 p-4 mb-4 font-mono text-xs text-gray-400",children:e.jsxs("div",{className:"flex flex-wrap gap-3 items-center",children:[e.jsxs("div",{className:"bg-purple-900/50 border border-purple-700 px-3 py-2 rounded text-center",children:[e.jsx("div",{className:"text-purple-300 font-bold",children:"systemd"}),e.jsx("div",{className:"text-gray-500",children:"PID 1"})]}),e.jsx("span",{className:"text-rh-red",children:"fork()→"}),e.jsxs("div",{className:"bg-blue-900/50 border border-blue-700 px-3 py-2 rounded text-center",children:[e.jsx("div",{className:"text-blue-300 font-bold",children:"child (copy)"}),e.jsx("div",{className:"text-gray-500",children:"PPID=1, PID=N"})]}),e.jsx("span",{className:"text-rh-red",children:"exec()→"}),e.jsxs("div",{className:"bg-green-900/50 border border-green-700 px-3 py-2 rounded text-center",children:[e.jsx("div",{className:"text-green-300 font-bold",children:"new program"}),e.jsx("div",{className:"text-gray-500",children:"same PID=N"})]}),e.jsx("span",{className:"text-rh-red",children:"exit()→"}),e.jsxs("div",{className:"bg-yellow-900/50 border border-yellow-700 px-3 py-2 rounded text-center",children:[e.jsx("div",{className:"text-yellow-300 font-bold",children:"zombie"}),e.jsx("div",{className:"text-gray-500",children:"until parent wait()"})]})]})}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"/proc/[pid]/ — Process Information Filesystem"}),e.jsx(s,{language:"bash",title:"/proc/[pid]/ — key files",code:`# Every running process has a directory under /proc/
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
cat /proc/1234/cgroup`})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Process States"]}),e.jsx("div",{className:"rounded-lg border border-border bg-surface-1 overflow-hidden mb-4",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-2 border-b border-border",children:[e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide w-12",children:"Code"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"State"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Description"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Diagnosis"})]})}),e.jsx("tbody",{className:"divide-y divide-border/50",children:[["R","Running","On CPU or in run queue ready to run","Normal — high R count means CPU saturation"],["S","Sleeping (interruptible)","Waiting for event (I/O, timer, signal). Can be woken by signal","Normal for most processes"],["D","Sleeping (uninterruptible)","Waiting for I/O — CANNOT be interrupted. Cannot be killed with SIGKILL","D state processes indicate storage/NFS issues"],["Z","Zombie","Exited but parent has not called wait() — entry kept in process table","Fix: kill parent or inspect parent for wait() bug"],["T","Stopped","Process suspended by SIGSTOP or job control (Ctrl+Z)","Resume with SIGCONT, or kill with SIGKILL"],["t","Traced/stopped","Stopped by debugger (ptrace)","Process under gdb or strace"],["W","Paging","Paging out to swap (obsolete in kernels >= 2.6)","Rare — indicates memory pressure"],["X","Dead","Should never be seen — process completely gone","Transient state"],["I","Idle","Kernel idle thread","Normal for kernel threads"]].map(([r,o,a,n],c)=>e.jsxs("tr",{className:c%2===0?"bg-surface-0":"bg-surface-1/40",children:[e.jsx("td",{className:"px-4 py-2 font-mono text-rh-red font-bold text-sm",children:r}),e.jsx("td",{className:"px-4 py-2 text-gray-300 font-medium",children:o}),e.jsx("td",{className:"px-4 py-2 text-gray-400",children:a}),e.jsx("td",{className:"px-4 py-2 text-gray-500",children:n})]},c))})]})}),e.jsx(s,{language:"bash",title:"Checking process states",code:`# Show all processes with state
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
cat /proc/<PID>/wchan    # kernel function where process is blocked`}),e.jsxs(t,{type:"warning",title:"D-State Processes Cannot Be Killed",children:["A process in D (uninterruptible sleep) state is waiting for a kernel I/O operation to complete. It ",e.jsx("strong",{children:"cannot"})," be killed with ",e.jsx("code",{className:"font-mono text-xs",children:"kill -9"}),". The only resolution is to fix the underlying I/O issue (unmount hung NFS, fix storage hardware, or reboot). A high count of D-state processes typically indicates storage or NFS problems."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Signals"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4",children:"Signals are asynchronous notifications sent to processes. Each signal has a default action (terminate, ignore, stop, core dump) that can be overridden by the process."}),e.jsx("div",{className:"rounded-lg border border-border bg-surface-1 overflow-hidden mb-4",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-2 border-b border-border",children:[e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Signal"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Number"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Default Action"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Use Case"})]})}),e.jsx("tbody",{className:"divide-y divide-border/50",children:[["SIGHUP","1","Terminate","Reload config (most daemons catch this). Terminal hangup."],["SIGINT","2","Terminate","Keyboard interrupt (Ctrl+C). Graceful termination."],["SIGQUIT","3","Core dump","Quit with core dump (Ctrl+\\)"],["SIGKILL","9","Terminate","CANNOT be caught/ignored. Immediate OS-level kill. Last resort."],["SIGTERM","15","Terminate","Default kill signal. Process can catch it for graceful shutdown."],["SIGSTOP","19","Stop","CANNOT be caught. Suspends process. Resume with SIGCONT."],["SIGTSTP","20","Stop","Keyboard stop (Ctrl+Z). Can be caught (unlike SIGSTOP)."],["SIGCONT","18","Continue","Resume a stopped/suspended process."],["SIGCHLD","17","Ignore","Sent to parent when child terminates/stops. Used for reaping."],["SIGUSR1","10","Terminate","User-defined. Many apps use to trigger actions (e.g., nginx reload)."],["SIGUSR2","12","Terminate","User-defined. App-specific behavior."],["SIGSEGV","11","Core dump","Segmentation fault — invalid memory access."],["SIGBUS","7","Core dump","Bus error — misaligned memory access."],["SIGABRT","6","Core dump","Abort — raised by abort() or assertion failure."],["SIGALRM","14","Terminate","Timer alarm — set by alarm() syscall."],["SIGPIPE","13","Terminate","Broken pipe — write to a pipe with no readers."]].map(([r,o,a,n],c)=>e.jsxs("tr",{className:c%2===0?"bg-surface-0":"bg-surface-1/40",children:[e.jsx("td",{className:"px-4 py-2 font-mono text-token-string font-bold",children:r}),e.jsx("td",{className:"px-4 py-2 font-mono text-token-number text-center",children:o}),e.jsx("td",{className:"px-4 py-2 text-gray-300",children:a}),e.jsx("td",{className:"px-4 py-2 text-gray-400",children:n})]},c))})]})}),e.jsx(s,{language:"bash",title:"kill, pkill, killall, pgrep — sending signals",code:`# Send SIGTERM (15) to a PID — graceful shutdown (default)
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
kill $(pgrep httpd)          # kill all httpd by PID`}),e.jsx(s,{language:"bash",title:"Signal trapping in shell scripts",code:`#!/bin/bash
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
# trap '' SIGTERM   # ignore a signal (not recommended for SIGTERM)`})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Zombie Processes"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:["A zombie process is one that has exited but whose parent has not yet called",e.jsx("code",{className:"font-mono text-xs text-token-string",children:" wait()"})," to collect its exit status. The process entry remains in the process table (consuming a PID and a small amount of kernel memory) until the parent reaps it. A few zombies are normal; hundreds indicate a programming bug."]}),e.jsx(s,{language:"bash",title:"Identifying zombie processes",code:`# Find zombies — look for 'Z' in STAT or 'defunct' in command
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
ps -eo ppid,stat | awk '$1==PARENTPID && $2~/Z/{count++} END{print count}' PARENTPID=1234`}),e.jsx(s,{language:"bash",title:"Resolving zombie processes",code:`# Zombies consume almost no resources — they just hold a PID
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
# p.wait()        # ← this reaps the zombie`}),e.jsxs(t,{type:"info",title:"Zombies Are Symptoms, Not Bugs Themselves",children:["You cannot kill a zombie process directly — it is already dead. Killing the parent is the resolution. A large number of zombies always indicates a bug in the parent process (not calling",e.jsx("code",{className:"font-mono text-xs",children:" wait()"}),"). On the exam, if asked to resolve zombies, find the PPID with ",e.jsx("code",{className:"font-mono text-xs",children:"ps -eo pid,ppid,stat"})," and kill the parent."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Resource Limits (ulimits)"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4",children:["Resource limits (ulimits) constrain resource usage per process/user. There are two types:",e.jsx("strong",{className:"text-gray-200",children:" soft limits"})," (current enforced limit, changeable by user up to hard limit) and",e.jsx("strong",{className:"text-gray-200",children:" hard limits"})," (ceiling — only root can raise)."]}),e.jsx(s,{language:"bash",title:"ulimit — viewing and setting limits",code:`# Show all current limits for the shell
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
ulimit -c 0`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"limits.conf — Persistent Limits"}),e.jsx(s,{language:"ini",title:"/etc/security/limits.conf — PAM-based persistent limits",code:`# Format: <domain> <type> <item> <value>
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
root            hard    nofile      65535`}),e.jsx(s,{language:"bash",title:"/etc/security/limits.d/ — drop-in limit files",code:`# Drop-in files in /etc/security/limits.d/ override /etc/security/limits.conf
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
cat /proc/<PID>/limits`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"systemd Unit Limits"}),e.jsx(s,{language:"ini",title:"systemd unit file — resource limits",code:`# In a service unit file, limits are set in the [Service] section
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
systemctl restart myapp`}),e.jsxs(t,{type:"exam",title:"limits.conf Requires Re-Login",children:["Changes to ",e.jsx("code",{className:"font-mono text-xs",children:"/etc/security/limits.conf"})," take effect only when the user logs in anew (PAM applies limits at session start). They do NOT apply to already-running processes. For a running service, either restart it or use systemd unit limit overrides. Verify with ",e.jsx("code",{className:"font-mono text-xs",children:"cat /proc/PID/limits"}),"."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"cgroups v2 Deep Dive"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:"Control groups (cgroups) are a kernel feature that hierarchically organizes processes and limits their resource consumption. RHEL 9 uses cgroups v2 exclusively. cgroups v2 uses a unified hierarchy (single tree) vs cgroups v1 which had per-controller hierarchies."}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"Hierarchy and Structure"}),e.jsx(s,{language:"bash",title:"cgroups v2 filesystem layout",code:`# cgroups v2 mount point
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
# └── machine.slice/              ← VMs and containers`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"cgroup Controllers"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"cpu controller"}),e.jsxs("div",{className:"text-xs text-gray-400 space-y-2",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"cpu.weight"})," — relative CPU share (1–10000, default 100)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"cpu.max"})," — hard limit: ",e.jsx("code",{children:"QUOTA PERIOD"})," (e.g., 50000 100000 = 50% of one CPU)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"cpu.stat"})," — usage statistics"]})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"memory controller"}),e.jsxs("div",{className:"text-xs text-gray-400 space-y-2",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"memory.max"})," — hard limit (bytes, or max)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"memory.high"})," — throttling threshold (soft limit)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"memory.current"})," — current usage"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"memory.oom_group"})," — kill all procs in group on OOM"]})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"io controller"}),e.jsxs("div",{className:"text-xs text-gray-400 space-y-2",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"io.weight"})," — relative I/O priority"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"io.max"})," — I/O rate limit (rbps, wbps, riops, wiops)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"io.stat"})," — I/O statistics per block device"]})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"pids controller"}),e.jsxs("div",{className:"text-xs text-gray-400 space-y-2",children:[e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"pids.max"})," — max number of PIDs in this cgroup"]}),e.jsxs("div",{children:[e.jsx("span",{className:"font-mono text-token-string",children:"pids.current"})," — current PID count"]}),e.jsx("div",{children:"Prevents fork bombs within a cgroup"})]})]})]}),e.jsx(s,{language:"bash",title:"Creating and managing cgroups manually",code:`# Create a new cgroup (just create a directory)
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
rmdir /sys/fs/cgroup/myapp`}),e.jsx(s,{language:"bash",title:"systemd-cgls and systemd-cgtop — cgroup monitoring",code:`# Show the cgroup hierarchy as a tree
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
cat /sys/fs/cgroup/system.slice/httpd.service/memory.current`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Slices, Scopes, and Services"}),e.jsx(s,{language:"bash",title:"systemd cgroup unit types",code:`# systemd organizes processes into three cgroup unit types:
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
systemctl revert httpd.service`})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"systemd Service Management"]}),e.jsx(s,{language:"bash",title:"systemctl — essential commands",code:`# Basic service operations
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
systemctl daemon-reload`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Service Unit File Anatomy"}),e.jsx(s,{language:"ini",title:"/etc/systemd/system/myapp.service — complete unit file",code:`[Unit]
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
WantedBy=multi-user.target`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Restart Policies Compared"}),e.jsx("div",{className:"rounded-lg border border-border bg-surface-1 overflow-hidden mb-4",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-2 border-b border-border",children:[e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold",children:"Restart="}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold",children:"Clean exit (0)"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold",children:"Non-zero exit"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold",children:"Signal (crash)"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold",children:"systemctl stop"})]})}),e.jsx("tbody",{className:"divide-y divide-border/50",children:[["no","—","—","—","—"],["always","✓","✓","✓","—"],["on-failure","—","✓","✓","—"],["on-abnormal","—","—","✓","—"],["on-abort","—","—","only unclean signal","—"],["on-success","✓","—","—","—"]].map(([r,o,a,n,c],m)=>e.jsxs("tr",{className:m%2===0?"bg-surface-0":"bg-surface-1/40",children:[e.jsx("td",{className:"px-4 py-2 font-mono text-token-string",children:r}),e.jsx("td",{className:`px-4 py-2 ${o==="✓"?"text-green-400":"text-gray-600"}`,children:o}),e.jsx("td",{className:`px-4 py-2 ${a==="✓"?"text-green-400":"text-gray-600"}`,children:a}),e.jsx("td",{className:`px-4 py-2 ${n==="✓"?"text-green-400":n.includes("only")?"text-yellow-400":"text-gray-600"}`,children:n}),e.jsx("td",{className:"px-4 py-2 text-gray-600",children:c})]},m))})]})}),e.jsx(s,{language:"bash",title:"Creating and editing unit files",code:`# Create a new unit file
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
journalctl -xe -u myapp.service`})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Core Dumps"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4",children:["A core dump is a snapshot of a process's memory written to disk when it crashes (SIGSEGV, SIGABRT, etc.). On RHEL systems with systemd, ",e.jsx("code",{className:"font-mono text-xs text-token-string",children:"systemd-coredump"}),"intercepts and manages core dumps."]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"core_pattern and ulimit -c"}),e.jsx(s,{language:"bash",title:"Core dump configuration",code:`# Check current core_pattern (where core dumps go)
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
# int *p = NULL; *p = 0;  // segfault`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"coredumpctl — Managing Core Dumps"}),e.jsx(s,{language:"bash",title:"coredumpctl — systemd-coredump management",code:`# List all recorded core dumps
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
cat /etc/systemd/coredump.conf`}),e.jsx(s,{language:"ini",title:"/etc/systemd/coredump.conf — coredump configuration",code:`[Coredump]
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
# systemctl restart systemd-coredump`}),e.jsxs(t,{type:"tip",title:"Debug Symbols Required for Useful Backtraces",children:["To get human-readable function names in GDB backtraces, you need debug symbols. On RHEL: ",e.jsx("code",{className:"font-mono text-xs",children:"dnf debuginfo-install httpd"})," or",e.jsx("code",{className:"font-mono text-xs",children:" dnf install httpd-debuginfo"}),". Without debug symbols, GDB shows only memory addresses. The",e.jsx("code",{className:"font-mono text-xs",children:" debuginfo-install"})," command requires the debuginfo repos to be enabled."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Hung Process Investigation Workflow"]}),e.jsx(d,{title:"Hung / Unresponsive Process — Investigation Workflow",steps:[{label:"1. Identify the process state",sub:"ps -eo pid,ppid,stat,comm,wchan — look for D, Z, or T state",color:"blue"},{label:"2. Check resource consumption",sub:"top / htop — is it consuming CPU? Memory? Or completely idle?",color:"blue"},{label:"3. Check open files and connections",sub:"lsof -p PID — open files, sockets, pipes; strace -p PID — active syscalls",color:"yellow"},{label:"4. Check if waiting on I/O (D state)",sub:"cat /proc/PID/wchan — kernel function; check iostat, dmesg for storage errors",color:"red"},{label:"5. Check if waiting on network",sub:"ss -tp | grep PID — TCP sockets; check if remote host is reachable",color:"yellow"},{label:"6. Check resource limits",sub:"cat /proc/PID/limits — is nofile, nproc, or memory limit hit?",color:"yellow"},{label:"7. Attempt graceful termination",sub:"kill -TERM PID — sends SIGTERM, allows graceful shutdown",color:"purple"},{label:"8. Force kill if SIGTERM fails",sub:"kill -9 PID — SIGKILL cannot be ignored (except D-state processes)",color:"red"},{label:"9. Collect post-mortem data if crash occurs",sub:"coredumpctl list; coredumpctl gdb PROGRAM — analyze the crash",color:"green"},{label:"10. Fix root cause and restart",sub:"Fix config, limits, storage, or code bug; then: systemctl start servicename",color:"green"}]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Command Reference"]}),e.jsx(i,{title:"Process Management Commands",rows:[{cmd:"ps aux",desc:"Show all processes (BSD format)",note:"ps -ef (POSIX format), ps -eo for custom output"},{cmd:"ps -eo pid,ppid,stat,comm",desc:"Custom output columns",note:"wchan=kernel function blocking process"},{cmd:`ps aux | awk '$8=="D"'`,desc:"Find D-state (uninterruptible) processes",note:"High D count = storage/NFS issue"},{cmd:"ps -eo pid,ppid,stat | grep Z",desc:"Find zombie processes",note:"Kill parent to reap zombies"},{cmd:"pgrep -l NAME",desc:"Find PIDs by process name",note:"-a shows full cmdline, -P parent PID"},{cmd:"pkill -TERM NAME",desc:"Send signal to processes by name",note:"-f match full cmdline, -u match by user"},{cmd:"kill -l",desc:"List all signal names and numbers",note:"kill -9 PID = SIGKILL (cannot be caught)"},{cmd:"kill -HUP PID",desc:"Send SIGHUP — usually triggers config reload",note:"kill -STOP/CONT for suspend/resume"},{cmd:"ulimit -a",desc:"Show all resource limits for current shell",note:"-Hn hard, -Sn soft, -n open files"},{cmd:"ulimit -c unlimited",desc:"Enable core dumps in current session",note:"Must also set kernel.core_pattern"},{cmd:"cat /proc/PID/limits",desc:"Show effective limits for a running process",note:"More reliable than ulimit for services"},{cmd:"cat /proc/PID/status",desc:"Process status, state, UIDs, memory",note:"VmRSS=resident, VmSwap=swapped"},{cmd:"cat /proc/PID/cgroup",desc:"Show cgroup membership for process",note:"Shows all controller paths"},{cmd:"cat /proc/PID/wchan",desc:"Kernel function where process is blocked",note:"Useful for diagnosing D-state"},{cmd:"systemd-cgls",desc:"Show cgroup hierarchy as tree",note:"systemd-cgtop for resource usage"},{cmd:"systemd-cgtop",desc:"Top-like view of cgroup resource usage",note:"-d 2 = 2 second interval"},{cmd:"systemd-run --scope CMD",desc:"Run command in a transient cgroup scope",note:"-p MemoryMax=512M -p CPUQuota=50%"},{cmd:"systemctl set-property",desc:"Set cgroup resource limits for a service",note:"systemctl set-property httpd MemoryMax=1G"},{cmd:"systemctl edit UNIT",desc:"Create override file for a unit",note:"Preferred over editing unit file directly"},{cmd:"systemctl daemon-reload",desc:"Reload unit files after changes",note:"Required after any .service file edit"},{cmd:"systemctl reset-failed",desc:"Clear failed state of a unit",note:"After fixing the underlying issue"},{cmd:"journalctl -u UNIT -f",desc:"Follow logs for a specific unit",note:"-n 100 for last 100 lines"},{cmd:"coredumpctl list",desc:"List all recorded core dumps",note:"coredumpctl list PROGNAME to filter"},{cmd:"coredumpctl info",desc:"Show details of most recent core dump",note:"coredumpctl info PID for specific"},{cmd:"coredumpctl gdb PROGNAME",desc:"Open core dump in GDB",note:'Run "bt" in GDB for backtrace'},{cmd:"cat /proc/sys/kernel/core_pattern",desc:"Show core dump destination",note:"| prefix = pipe to program"},{cmd:"strace -p PID",desc:"Trace syscalls of a running process",note:"-e trace=open,read for filtering"},{cmd:"lsof -p PID",desc:"List all files opened by a process",note:"lsof -i :80 for port-based lookup"}]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Exam Tips"]}),e.jsxs(t,{type:"exam",title:"D-State Processes Cannot Be Killed",children:["Processes in D (uninterruptible sleep) state are waiting for I/O in kernel space.",e.jsx("code",{className:"font-mono text-xs",children:" kill -9"})," has no effect on them. Check ",e.jsx("code",{className:"font-mono text-xs",children:"cat /proc/PID/wchan"})," to see what kernel function they are blocking in. On the exam, if a process won't die, check its state with",e.jsx("code",{className:"font-mono text-xs",children:" ps -eo pid,stat,comm"})," first."]}),e.jsxs(t,{type:"exam",title:"ulimit vs limits.conf vs systemd Unit",children:["Three places to set resource limits — understand scope: (1) ",e.jsx("code",{className:"font-mono text-xs",children:"ulimit"}),"affects current shell and its children, (2) ",e.jsx("code",{className:"font-mono text-xs",children:"/etc/security/limits.conf"}),"applies to new PAM-authenticated sessions, (3) systemd unit ",e.jsx("code",{className:"font-mono text-xs",children:"LimitNOFILE="}),"applies to the specific service regardless of PAM. Verify the running limit with",e.jsx("code",{className:"font-mono text-xs",children:" cat /proc/PID/limits"}),"."]}),e.jsxs(t,{type:"exam",title:"Zombie Processes — Kill the Parent",children:["You cannot kill zombie processes directly. Find the parent:",e.jsx("code",{className:"font-mono text-xs",children:" ps -eo pid,ppid,stat,comm | awk '$3~/Z/'"}),". Then send SIGCHLD to the parent to trigger reaping, or kill the parent and let systemd (PID 1) reap the orphaned zombies automatically."]}),e.jsxs(t,{type:"exam",title:"systemctl enable --now",children:[e.jsx("code",{className:"font-mono text-xs",children:"systemctl enable --now UNIT"})," is the single command that both enables (start at boot) AND starts the service immediately. This is almost always what you want in exam tasks. Similarly, ",e.jsx("code",{className:"font-mono text-xs",children:"systemctl disable --now"})," stops and disables in one step."]}),e.jsxs(t,{type:"warning",title:"Restart= Does Not Override StartLimitBurst",children:["If a service restarts too many times too fast, systemd stops trying and puts it in the",e.jsx("code",{className:"font-mono text-xs",children:" failed"})," state even with ",e.jsx("code",{className:"font-mono text-xs",children:"Restart=always"}),". Check with ",e.jsx("code",{className:"font-mono text-xs",children:"systemctl status"}),` — you'll see "Start request repeated too quickly". Fix the underlying issue then run `,e.jsx("code",{className:"font-mono text-xs",children:"systemctl reset-failed UNIT && systemctl start UNIT"}),". To be more tolerant, increase ",e.jsx("code",{className:"font-mono text-xs",children:"StartLimitBurst="})," or",e.jsx("code",{className:"font-mono text-xs",children:" StartLimitIntervalSec="})," in the unit file."]})]})]})}const f=[{cmd:"strace command",desc:"Launch command under strace — traces every syscall from exec",note:"strace ls /etc"},{cmd:"strace -p PID",desc:"Attach to an already-running process by PID",note:"strace -p 1234"},{cmd:"-e trace=file",desc:"Filter: only file-related calls (open, read, write, stat…)",note:"-e trace=file,network"},{cmd:"-e trace=network",desc:"Filter: only network calls (connect, bind, sendto, recvfrom…)",note:"Combine with file: -e trace=file,network"},{cmd:"-e trace=process",desc:"Filter: process lifecycle calls (fork, exec, wait, exit)",note:"Useful for startup tracing"},{cmd:"-e trace=signal",desc:"Filter: signal delivery and handling (kill, sigaction)",note:"Diagnose signal-related hangs"},{cmd:"-c",desc:"Summary mode — count calls, time, and errors. Print table on exit",note:"Great for profiling hot paths"},{cmd:"-f",desc:"Follow forks — trace child processes spawned during the run",note:"Essential for multi-process apps"},{cmd:"-ff -o file",desc:"Follow forks, write each PID's trace to file.PID separately",note:"-ff -o /tmp/trace"},{cmd:"-o file",desc:"Write trace output to a file instead of stderr",note:"-o /tmp/app.trace"},{cmd:"-s 256",desc:"Set max string length to display (default is 32 — too short!)",note:"Increase to see full paths"},{cmd:"-T",desc:"Print time spent inside each syscall in microseconds",note:"Identifies slow I/O calls"},{cmd:"-t / -tt / -ttt",desc:"Prepend wall-clock time / microseconds / epoch seconds to each line",note:"-tt for sub-second timestamps"},{cmd:"-v",desc:"Verbose: print all fields of stat, termios, and similar structs",note:"Use to inspect full stat output"},{cmd:"-x",desc:"Print all non-ASCII strings in hex",note:"Useful for binary protocol debugging"},{cmd:"-y",desc:"Resolve file descriptor numbers to paths where possible",note:"Makes fd output readable"},{cmd:"-z",desc:"Print only successful calls (return value != -1)",note:"Filter out error noise"},{cmd:"-Z",desc:"Print only failed calls",note:"Quickly find all errors"}],g=[{cmd:"ltrace command",desc:"Trace all library calls made by command",note:"ltrace /usr/bin/myapp"},{cmd:"ltrace -p PID",desc:"Attach to a running process",note:"Root required for foreign PIDs"},{cmd:"-l libname",desc:"Only trace calls from the specified library",note:"-l libssl.so"},{cmd:"-e func",desc:"Trace only the named function(s)",note:"-e malloc+free"},{cmd:"-c",desc:"Print a summary count of library calls on exit",note:"Like strace -c but for libs"},{cmd:"-f",desc:"Follow child processes (fork)",note:"Multi-process apps"},{cmd:"-o file",desc:"Write output to file",note:"-o /tmp/ltrace.out"},{cmd:"-S",desc:"Also show syscalls (combines ltrace + strace output)",note:"Verbose, but very informative"}],b=[{cmd:"lsof -p PID",desc:"All files opened by the given process ID",note:"lsof -p 1234"},{cmd:"lsof -u username",desc:"All files opened by a specific user",note:"lsof -u apache"},{cmd:"lsof -i :port",desc:"Which process is listening on a TCP/UDP port",note:"lsof -i :8080"},{cmd:"lsof -i tcp",desc:"All open TCP connections system-wide",note:"Combine: -i tcp:443"},{cmd:"lsof -i @host:port",desc:"Connections to a specific remote host and port",note:"lsof -i @db.local:5432"},{cmd:"lsof +D /path",desc:"All processes using files under a directory (recursive)",note:"Use before unmount: lsof +D /mnt"},{cmd:"lsof /path/file",desc:"Which processes have a specific file open",note:"lsof /var/log/app.log"},{cmd:"lsof -n -P",desc:"Disable hostname and port name resolution (much faster)",note:"Always use -nP for speed"},{cmd:"lsof | grep deleted",desc:"Find deleted files still held open (eating disk space)",note:"See disk recovery section"},{cmd:"lsof -d fd",desc:"Show open file descriptors — filter by FD type",note:"lsof -d 0-2 (stdin/out/err)"}],y=[{cmd:"/proc/PID/cmdline",desc:"Full command line of the process (null-byte separated)",note:'tr "\\0" " " < /proc/1/cmdline'},{cmd:"/proc/PID/exe",desc:"Symlink to the executable binary",note:"readlink /proc/1/exe"},{cmd:"/proc/PID/cwd",desc:"Symlink to the process's current working directory",note:"readlink /proc/1234/cwd"},{cmd:"/proc/PID/fd/",desc:"Directory of symlinks — one per open file descriptor",note:"ls -la /proc/1234/fd/"},{cmd:"/proc/PID/fdinfo/",desc:"Detailed info per fd: position, flags, inode",note:"cat /proc/1234/fdinfo/3"},{cmd:"/proc/PID/maps",desc:"Memory map: virtual address ranges, permissions, mapped files",note:"cat /proc/1234/maps"},{cmd:"/proc/PID/smaps",desc:"Extended maps with per-region RSS, PSS, and swap usage",note:"More detail than maps"},{cmd:"/proc/PID/status",desc:"Human-readable process status: state, UID, memory, threads",note:"cat /proc/1234/status"},{cmd:"/proc/PID/stat",desc:"Machine-readable stat fields used by ps/top internally",note:"Fields 14-17: CPU time"},{cmd:"/proc/PID/io",desc:"I/O statistics: bytes read/written, syscall counts",note:"cat /proc/1234/io"},{cmd:"/proc/PID/limits",desc:"Current resource limits (ulimit values) for the process",note:"RLIMIT_NOFILE, RLIMIT_CORE…"},{cmd:"/proc/PID/net/",desc:"Network state visible to this process's network namespace",note:"/proc/PID/net/tcp6, /proc/PID/net/unix"},{cmd:"/proc/PID/environ",desc:"Environment variables (null-byte separated)",note:'tr "\\0" "\\n" < /proc/1234/environ'},{cmd:"/proc/PID/oom_score",desc:"OOM killer score — higher = killed first under memory pressure",note:"cat /proc/1234/oom_score"}],x=[{cmd:"gdb -p PID",desc:"Attach GDB to a running process (pauses it)",note:"Requires ptrace permission"},{cmd:"gdb binary core",desc:"Load a core dump with the originating binary",note:"gdb /usr/sbin/httpd core.1234"},{cmd:"bt",desc:"Print backtrace (call stack) of the current thread",note:"Most important command in crash analysis"},{cmd:"bt full",desc:"Backtrace with local variables for every frame",note:"Verbose but complete"},{cmd:"info threads",desc:"List all threads in the process",note:"Shows thread IDs and current location"},{cmd:"thread N",desc:"Switch to thread N for inspection",note:"thread 3 → then bt"},{cmd:"frame N",desc:"Select stack frame N for variable inspection",note:"frame 0 = innermost"},{cmd:"print var",desc:"Print value of a variable in the current frame",note:"print errno, print *ptr"},{cmd:"info registers",desc:"Dump CPU register values for current frame",note:"Useful for crash at assembly level"},{cmd:"list",desc:"Show source code around current location (needs debuginfo)",note:"Install debuginfo packages first"},{cmd:"detach",desc:"Detach from process without killing it",note:"Process resumes normally"},{cmd:"quit",desc:"Exit GDB",note:"q works too"}],v=[{cmd:"ulimit -c unlimited",desc:"Allow core dumps of unlimited size for the current shell",note:"Shell-session only; add to /etc/security/limits.conf for persistence"},{cmd:"/proc/sys/kernel/core_pattern",desc:"Kernel template for core dump filenames and location",note:"Default: core or |/usr/lib/systemd/systemd-coredump"},{cmd:"coredumpctl list",desc:"List all core dumps recorded by systemd-coredump",note:"Shows PID, timestamp, binary, signal"},{cmd:"coredumpctl info PID",desc:"Detailed metadata for a specific crash",note:"Includes backtrace if debuginfo available"},{cmd:"coredumpctl gdb PID",desc:"Open core dump in GDB automatically",note:"Best way to analyse systemd-managed crashes"},{cmd:"coredumpctl dump -o core",desc:"Extract the raw core dump file to disk",note:"Then: gdb binary core"},{cmd:"abrt-cli list",desc:"List crashes detected by the ABRT daemon",note:"ABRT = Automatic Bug Reporting Tool"},{cmd:"abrt-cli info HASH",desc:"Show detailed crash report for a problem hash",note:"Includes bt, packages, SELinux context"},{cmd:"/var/spool/abrt/",desc:"Directory containing ABRT crash directories",note:"Each crash gets a subdirectory"}],w=[{cmd:"sosreport",desc:"Collect comprehensive system information into a tar.xz archive",note:"Run as root; takes ~2-5 minutes"},{cmd:"sosreport -o logs",desc:"Include only the logs plugin (faster, narrower output)",note:"Use -l to list available plugins"},{cmd:"sosreport --batch",desc:"Non-interactive mode — no prompts for name/case number",note:"Good for scripted use"},{cmd:"sosreport -z",desc:"Use gzip compression instead of xz (faster but larger)",note:"Useful when time is a constraint"},{cmd:"sos collect",desc:"Collect sosreports from multiple nodes in a cluster",note:"For clustered / OpenShift environments"}],j=[{cmd:"stap -e 'probe syscall.open { ... }'",desc:"SystemTap one-liner: run a probe on the open() syscall",note:"Requires kernel-devel + systemtap packages"},{cmd:"stap script.stp",desc:"Run a SystemTap script file",note:".stp scripts use C-like syntax"},{cmd:"bpftrace -l 'tracepoint:syscalls:*'",desc:"List all available tracepoint probes",note:"Requires kernel 4.9+ with BPF support"},{cmd:`bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf("%s\\n", comm); }'`,desc:"Print the process name on every openat() call",note:"eBPF — no kernel module needed"},{cmd:`bpftrace -e 'kprobe:do_sys_open { printf("%d %s\\n", pid, str(arg1)); }'`,desc:"Trace kernel open function with PID and filename",note:""}],k=[{cmd:"ldd /path/to/binary",desc:"List all shared library dependencies and their resolved paths",note:"ldd /usr/sbin/httpd"},{cmd:"ldd -v binary",desc:"Verbose: show full symbol version requirements",note:"Reveals GLIBC version requirements"},{cmd:"ldconfig",desc:"Rebuild the shared library cache (/etc/ld.so.cache)",note:"Run after installing libs in /usr/local/lib"},{cmd:"ldconfig -p",desc:"Print all cached library paths",note:"ldconfig -p | grep libssl"},{cmd:"ldconfig -v",desc:"Verbose rebuild — shows which directories are scanned",note:"Diagnose missing lib directories"},{cmd:"/etc/ld.so.conf",desc:"Main config file listing library search directories",note:"Include /etc/ld.so.conf.d/*.conf snippets"},{cmd:"LD_LIBRARY_PATH=/path",desc:"Override library search path at runtime (env var)",note:"Do NOT use in prod — use ldconfig instead"},{cmd:"LD_DEBUG=libs binary",desc:"Print detailed library loading debug output at runtime",note:"LD_DEBUG=all for maximum verbosity"},{cmd:"objdump -p binary | grep NEEDED",desc:"Low-level: list required shared objects from ELF header",note:"Does not resolve paths like ldd does"},{cmd:"readelf -d binary | grep NEEDED",desc:"Alternative to objdump for listing ELF dependencies",note:"readelf -d /usr/bin/ls"}],N=[{cmd:"strace -p PID",desc:"Attach strace to a running process",note:"SIGSTOP while attached"},{cmd:"strace -e trace=file cmd",desc:"Trace only file-related syscalls",note:"open, read, write, stat…"},{cmd:"strace -c cmd",desc:"Count syscalls and print summary table",note:"Shows slowest calls"},{cmd:"strace -f -o out.txt cmd",desc:"Follow forks and write to file",note:"Use -ff for per-PID files"},{cmd:"strace -s 256 -y -Z cmd",desc:"Long strings + fd→path + only failed calls",note:"Best all-purpose debug combo"},{cmd:"ltrace -p PID",desc:"Attach ltrace to running process (library calls)",note:"Complements strace"},{cmd:"ltrace -e malloc+free cmd",desc:"Trace only malloc/free library calls",note:"Memory leak hunting"},{cmd:"lsof -p PID",desc:"All open files for a process",note:""},{cmd:"lsof -i :8080",desc:"Process listening on port 8080",note:""},{cmd:"lsof +D /var/run",desc:"All processes with files under a directory",note:"Pre-unmount check"},{cmd:"lsof | grep deleted",desc:"Files deleted but still held open",note:"Disk space recovery"},{cmd:"cat /proc/PID/maps",desc:"Memory map of a process",note:""},{cmd:"ls -la /proc/PID/fd/",desc:"All open file descriptors with resolved paths",note:""},{cmd:"cat /proc/PID/status",desc:"Human-readable process state and memory",note:""},{cmd:"gdb -p PID",desc:"Attach GDB to live process",note:"Then: bt, info threads"},{cmd:"gdb binary core",desc:"Analyse core dump",note:"Install debuginfo first"},{cmd:"coredumpctl gdb PID",desc:"GDB session from systemd-coredump store",note:"Easiest core dump workflow"},{cmd:"coredumpctl list",desc:"List all recorded crash dumps",note:""},{cmd:"ulimit -c unlimited",desc:"Enable core dumps for current shell session",note:""},{cmd:"abrt-cli list",desc:"List crashes detected by ABRT",note:"/var/spool/abrt/"},{cmd:"sosreport",desc:"Collect full system diagnostic tarball",note:"Run as root"},{cmd:"ldd /path/binary",desc:"List shared library dependencies",note:'Check for "not found"'},{cmd:"ldconfig",desc:"Rebuild shared library cache",note:"After adding libs"},{cmd:"LD_DEBUG=libs binary",desc:"Debug library load process at runtime",note:""}],I=[{label:"Application crash / misbehaviour reported",sub:"Gather: PID, binary path, any error messages seen by users.",color:"red"},{label:"Check systemd journal for crash messages",sub:"journalctl -u servicename -n 100 --no-pager  |  journalctl _PID=1234",color:"yellow"},{label:"Attach strace / re-run under strace",sub:`strace -f -s 256 -y -Z -o /tmp/trace.txt /path/to/binary
Look for ENOENT (missing files), EACCES (permission), ECONNREFUSED (network).`,color:"blue"},{label:"Use lsof to inspect open resources",sub:"lsof -p PID  →  check for missing files, unexpected sockets, deleted inodes still held open.",color:"blue"},{label:"Inspect /proc/PID for deep process state",sub:"/proc/PID/maps  (memory layout),  /proc/PID/limits  (resource caps),  /proc/PID/environ  (env vars)",color:"purple"},{label:"Collect and analyse core dump with GDB",sub:"coredumpctl gdb PID  →  bt full  →  info threads  →  thread N  →  bt",color:"yellow"},{label:"Verify library dependencies",sub:'ldd binary  →  look for "not found".  ldconfig -v  →  check paths.  LD_DEBUG=libs binary for runtime detail.',color:"green"},{label:"Escalate with sosreport if needed",sub:"sosreport — creates a tarball for Red Hat support that includes journal, sysctl, loaded modules, and more.",color:"default"}];function H(){return e.jsxs("div",{className:"space-y-12",children:[e.jsx(l,{icon:u,title:"Application Diagnostics",subtitle:"Diagnose misbehaving applications using system call tracing, library tracing, open-file inspection, /proc deep-dives, GDB core dump analysis, and dynamic instrumentation. These techniques work on any ELF binary without source code.",tags:["strace","ltrace","lsof","/proc","GDB","coredump","sosreport","bpftrace"]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"System Call Tracing with strace"}),e.jsxs("p",{className:"section-body",children:["Every interaction a user-space process has with the kernel — opening files, creating sockets, allocating memory, spawning children — happens through a ",e.jsx("em",{children:"system call"}),".",e.jsx("code",{className:"code-inline",children:"strace"})," intercepts every syscall made by a process (using the ",e.jsx("code",{className:"code-inline",children:"ptrace()"})," mechanism) and prints the call name, arguments, return value, and optionally timing information. No source code or special build flags are required; strace works on any compiled binary."]}),e.jsxs("div",{className:"mt-4 rounded-xl border border-border bg-surface-1 p-5",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3",children:"Anatomy of strace output"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-5 gap-2 text-xs font-mono",children:[{part:"openat",color:"text-token-fn",label:"syscall name"},{part:'(AT_FDCWD, "/etc/app.conf", O_RDONLY)',color:"text-token-string",label:"arguments"},{part:"=",color:"text-gray-400",label:"separator"},{part:"-1",color:"text-token-keyword",label:"return value"},{part:"ENOENT (No such file or directory)",color:"text-yellow-300",label:"error name + description"}].map(({part:r,color:o,label:a})=>e.jsxs("div",{className:"rounded-lg bg-surface-2 border border-border px-3 py-2 text-center",children:[e.jsx("div",{className:`font-bold ${o}`,children:r}),e.jsx("div",{className:"text-gray-500 text-[10px] mt-1",children:a})]},a))}),e.jsxs("p",{className:"text-xs text-gray-400 mt-3",children:["A return value of ",e.jsx("code",{className:"code-inline",children:"-1"})," indicates an error. The errno name (e.g. ",e.jsx("code",{className:"code-inline",children:"ENOENT"}),") tells you exactly what went wrong. A non-negative return is a success — for"," ",e.jsx("code",{className:"code-inline",children:"open()"}),", it is the new file descriptor number."]})]}),e.jsx("h3",{className:"text-base font-semibold text-gray-200 mt-6 mb-2",children:"Common invocations"}),e.jsx(s,{language:"bash",title:"strace — attaching to a running process",code:`# Attach to PID 4521, show only failed calls, expand string length, resolve fd→path
strace -p 4521 -Z -s 256 -y

# Detach cleanly with Ctrl-C — process continues running`}),e.jsx(s,{language:"bash",title:"strace — diagnosing a service that can't find its config file",code:`# Run the binary under strace, filter to file ops, write to a file
strace -e trace=file -s 256 -o /tmp/myapp.trace /usr/bin/myapp

# In a second terminal, review the trace looking for ENOENT
grep ENOENT /tmp/myapp.trace

# Example output:
# openat(AT_FDCWD, "/etc/myapp/myapp.conf", O_RDONLY) = -1 ENOENT (No such file or directory)
# openat(AT_FDCWD, "/usr/share/myapp/myapp.conf", O_RDONLY) = -1 ENOENT (No such file or directory)
# The app is searching two locations — neither exists. Create the file in the first path.`}),e.jsx(s,{language:"bash",title:"strace — syscall count summary (profiling)",code:`# Run command and print a summary table of syscall counts, errors, and timing
strace -c ls /var/log

# % time     seconds  usecs/call     calls    errors syscall
# ------ ----------- ----------- --------- --------- ----------------
#  52.31    0.000423          21        20           getdents64
#  18.42    0.000149          14        11           openat
#  ...
#
# High time in read/write → I/O bound. High count in getdents → directory traversal.`}),e.jsx(s,{language:"bash",title:"strace — follow forks (multi-process application)",code:`# -f follows child processes; -ff writes per-PID trace files
strace -ff -s 256 -o /tmp/myapp /usr/sbin/httpd -DFOREGROUND

# Creates files: /tmp/myapp.12345  /tmp/myapp.12346  /tmp/myapp.12347 ...
# Inspect the worker that crashed:
grep 'SIGSEGV|killed|EACCES' /tmp/myapp.*`}),e.jsxs(t,{type:"exam",title:"Exam Tip: strace for SELinux vs Permission Errors",children:[e.jsx("code",{className:"code-inline",children:"strace"})," distinguishes between a DAC (file permission) failure and a system call that succeeded at the kernel level but was denied by SELinux. If you see ",e.jsx("code",{className:"code-inline",children:"EACCES"})," in strace output, check both"," ",e.jsx("code",{className:"code-inline",children:"ls -l"})," and"," ",e.jsx("code",{className:"code-inline",children:"ausearch -m avc"}),". SELinux denials often appear as EACCES in strace even though the UNIX permissions look correct."]}),e.jsx("h3",{className:"text-base font-semibold text-gray-200 mt-6 mb-2",children:"Common strace error patterns to recognise"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3",children:[{errno:"ENOENT",meaning:"No such file or directory",implication:"Missing config, binary, or shared library. Check the path searched."},{errno:"EACCES",meaning:"Permission denied",implication:"DAC or SELinux denial. Check file mode bits and SELinux context."},{errno:"ECONNREFUSED",meaning:"Connection refused",implication:"Target port not listening. Service down or firewall blocking."},{errno:"ETIMEDOUT",meaning:"Connection timed out",implication:"Network unreachable or firewall silently dropping packets."},{errno:"EADDRINUSE",meaning:"Address already in use",implication:"Port conflict — another process owns the socket."},{errno:"ENOMEM",meaning:"Out of memory",implication:"malloc failed; system under memory pressure."},{errno:"EMFILE",meaning:"Too many open files",implication:"Process hit its RLIMIT_NOFILE. Increase via limits.conf."},{errno:"EAGAIN / EWOULDBLOCK",meaning:"Try again (non-blocking I/O)",implication:"Normally harmless; excessive counts indicate a tight busy-wait loop."}].map(({errno:r,meaning:o,implication:a})=>e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 px-4 py-3",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[e.jsx("code",{className:"text-xs font-mono font-bold text-token-keyword",children:r}),e.jsxs("span",{className:"text-xs text-gray-400",children:["— ",o]})]}),e.jsx("p",{className:"text-xs text-gray-400 leading-relaxed",children:a})]},r))}),e.jsx(i,{title:"strace Flag Reference",rows:f})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Library Call Tracing with ltrace"}),e.jsxs("p",{className:"section-body",children:["While ",e.jsx("code",{className:"code-inline",children:"strace"})," intercepts calls at the syscall boundary (kernel interface), ",e.jsx("code",{className:"code-inline",children:"ltrace"})," intercepts calls at the shared library boundary — calls like ",e.jsx("code",{className:"code-inline",children:"fopen()"}),","," ",e.jsx("code",{className:"code-inline",children:"malloc()"}),","," ",e.jsx("code",{className:"code-inline",children:"SSL_connect()"}),", and any function exported by a shared library. Use ltrace when the problem is in library logic rather than in a failed kernel operation."]}),e.jsxs("div",{className:"rounded-xl border border-yellow-800/60 bg-yellow-950/20 p-4 my-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-yellow-300 mb-2",children:"strace vs ltrace — choosing the right tool"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-3 text-xs",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-surface-2 p-3",children:[e.jsx("div",{className:"font-bold text-blue-300 mb-1",children:"strace"}),e.jsxs("ul",{className:"space-y-1 text-gray-400 list-disc list-inside",children:[e.jsx("li",{children:"Intercepts at the kernel boundary"}),e.jsxs("li",{children:["Works on ",e.jsx("em",{children:"all"})," processes including static binaries"]}),e.jsxs("li",{children:["Uses ",e.jsx("code",{className:"code-inline",children:"ptrace(PTRACE_SYSCALL)"})]}),e.jsx("li",{children:"Best for: file I/O, network, process, signal issues"})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-2 p-3",children:[e.jsx("div",{className:"font-bold text-purple-300 mb-1",children:"ltrace"}),e.jsxs("ul",{className:"space-y-1 text-gray-400 list-disc list-inside",children:[e.jsx("li",{children:"Intercepts at the PLT (Procedure Linkage Table)"}),e.jsx("li",{children:"Only works on dynamically-linked binaries"}),e.jsx("li",{children:"Can show return values of library functions"}),e.jsx("li",{children:"Best for: crypto errors, parsing failures, library bugs"})]})]})]})]}),e.jsx(s,{language:"bash",title:"ltrace — trace SSL/TLS library calls",code:`# Trace only OpenSSL-related calls to diagnose TLS handshake failures
ltrace -l libssl.so -s 256 /usr/bin/curl https://example.com 2>&1 | head -40

# Trace malloc/free to find memory allocation patterns
ltrace -e 'malloc+free+realloc' -c /usr/bin/myapp`}),e.jsx(i,{title:"ltrace Flag Reference",rows:g}),e.jsxs(t,{type:"tip",title:"ltrace and PIE Binaries",children:["Modern RHEL 9 binaries are compiled as Position-Independent Executables (PIE). If ltrace shows no output or crashes immediately, the binary may use symbol interposition techniques that conflict with ltrace. In this case, fall back to strace with"," ",e.jsx("code",{className:"code-inline",children:"-e trace=read,write"})," or use bpftrace uprobes for user-space function tracing."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"lsof — List Open Files"}),e.jsxs("p",{className:"section-body",children:["In Linux, ",e.jsx("em",{children:"everything is a file"})," — regular files, directories, sockets, pipes, devices, and more are all represented as file descriptors. ",e.jsx("code",{className:"code-inline",children:"lsof"})," ","(List Open Files) shows every file descriptor held by every process on the system, making it invaluable for diagnosing permission issues, port conflicts, resource leaks, and disk space problems caused by deleted-but-open files."]}),e.jsx(s,{language:"bash",title:"lsof — practical diagnostic examples",code:`# Show all open files for a specific process
lsof -p 4521 -n -P

# Which process is using port 8080? (no DNS lookup, no port name lookup)
lsof -i :8080 -n -P

# Find a process using a specific file
lsof /var/lock/app.lock

# List all open TCP connections (no reverse DNS for speed)
lsof -i tcp -n -P

# Check what has files open under /mnt before unmounting
lsof +D /mnt/data

# Find deleted files still holding disk space
lsof | grep '(deleted)'
# Example output:
# httpd   4521  apache  10u  REG  8,1  104857600  deleted  /var/log/httpd/access_log (deleted)
# This means /var/log/httpd/access_log was deleted but httpd still holds it open.
# The disk space will not be freed until httpd is restarted or the fd is closed.
# To recover without restarting: truncate the fd in-place:
# > /proc/4521/fd/10`}),e.jsxs(t,{type:"exam",title:"Exam Tip: Recovering Disk Space from Deleted Open Files",children:["A very common exam scenario: a filesystem is full (100%), but you cannot find any large files. Run ",e.jsx("code",{className:"code-inline",children:"lsof | grep deleted"}),". If a running process has a deleted file descriptor, the inode (and disk blocks) are retained until the fd is closed. Restart the process or truncate the fd via"," ",e.jsxs("code",{className:"code-inline",children:[">"," /proc/PID/fd/FD_NUM"]})," to immediately free the space without stopping the service."]}),e.jsx(s,{language:"bash",title:"lsof — network-focused usage",code:`# All connections to a specific remote host on port 5432 (PostgreSQL)
lsof -i @10.0.0.5:5432 -n -P

# All UDP sockets system-wide
lsof -i udp -n -P

# Connections by a specific user (e.g., apache)
lsof -u apache -i -n -P

# lsof output columns explained:
# COMMAND  PID   USER   FD  TYPE  DEVICE  SIZE/OFF  NODE  NAME
# httpd    4521  apache 10u  REG   8,1    2048      1234  /var/log/httpd/error_log
# FD: 10u = fd 10, open for reading/writing (u=rw, r=read, w=write, cwd=CWD, txt=executable)`}),e.jsx(i,{title:"lsof Quick Reference",rows:b})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"/proc/[pid]/ — Process Information Filesystem"}),e.jsxs("p",{className:"section-body",children:["The ",e.jsx("code",{className:"code-inline",children:"/proc"})," virtual filesystem exposes live kernel data structures as browsable files. Each running process gets its own directory at"," ",e.jsx("code",{className:"code-inline",children:"/proc/PID/"})," containing dozens of files that reveal its memory layout, open file descriptors, environment, CPU and I/O statistics, and resource limits — all without requiring any special tools."]}),e.jsx(s,{language:"bash",title:"/proc/PID — essential inspection commands",code:`PID=4521

# Full command line (null-byte separated → use tr to make readable)
tr '\0' ' ' < /proc/$PID/cmdline; echo

# What binary is running? (even if it has been replaced on disk)
readlink /proc/$PID/exe

# Current working directory of the process
readlink /proc/$PID/cwd

# All open file descriptors with their target paths
ls -la /proc/$PID/fd/
# lrwx------ 1 root root 64 Jan  1 12:00 0 -> /dev/null
# lrwx------ 1 root root 64 Jan  1 12:00 1 -> pipe:[123456]
# lr-x------ 1 root root 64 Jan  1 12:00 3 -> /etc/myapp/config.yaml
# lrwx------ 1 root root 64 Jan  1 12:00 4 -> socket:[789012]

# Memory map — address ranges, permissions, mapped files
cat /proc/$PID/maps
# 7f2a3b000000-7f2a3b200000 r-xp 00000000 08:01 123456 /usr/lib64/libc-2.34.so
# Address range  Perms  Offset   Dev     Inode  Pathname
# r=read x=execute p=private (COW) s=shared

# Process status: state, memory usage, UIDs, threads
cat /proc/$PID/status

# I/O statistics: bytes read/written, syscall counts
cat /proc/$PID/io

# Current resource limits
cat /proc/$PID/limits

# Environment variables (raw, null-separated)
tr '\0' '
' < /proc/$PID/environ | grep -E 'HOME|PATH|LD_'`}),e.jsxs("div",{className:"rounded-xl border border-purple-800/60 bg-purple-950/20 p-4 my-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-purple-300 mb-3",children:"Reading /proc/PID/maps"}),e.jsx("div",{className:"font-mono text-xs text-gray-300 bg-surface-2 rounded-lg p-3 overflow-x-auto",children:e.jsx("div",{className:"grid gap-1",children:[{line:"55f1a2000000-55f1a2001000",perms:"r--p",info:"ELF header of binary (read-only)"},{line:"55f1a2001000-55f1a2010000",perms:"r-xp",info:"Text segment — executable code (read+execute, COW private)"},{line:"55f1a2010000-55f1a2012000",perms:"r--p",info:"Read-only data (.rodata)"},{line:"55f1a2013000-55f1a2014000",perms:"rw-p",info:"Writable data (.bss, .data)"},{line:"7f2a40000000-7f2a40200000",perms:"rw-p",info:"Heap (anonymous mmap)"},{line:"7ffc3ab00000-7ffc3ab21000",perms:"rw-p",info:"Stack (grows down)"}].map(({line:r,perms:o,info:a})=>e.jsxs("div",{className:"flex gap-3 items-start",children:[e.jsx("span",{className:"text-token-number flex-shrink-0",children:r}),e.jsx("span",{className:`flex-shrink-0 ${o.includes("x")?"text-token-keyword":"text-gray-400"}`,children:o}),e.jsx("span",{className:"text-gray-500",children:a})]},r))})}),e.jsxs("p",{className:"text-xs text-gray-400 mt-2",children:["Permissions: ",e.jsx("code",{className:"code-inline",children:"r"}),"=read,"," ",e.jsx("code",{className:"code-inline",children:"w"}),"=write,"," ",e.jsx("code",{className:"code-inline",children:"x"}),"=execute,"," ",e.jsx("code",{className:"code-inline",children:"p"}),"=private (copy-on-write),"," ",e.jsx("code",{className:"code-inline",children:"s"}),"=shared. Unexpected ",e.jsx("code",{className:"code-inline",children:"rwxp"})," ","anonymous mappings can indicate shellcode injection."]})]}),e.jsxs(t,{type:"tip",title:"Quick FD Recovery Trick",children:["If a process holds a file descriptor to a file that was deleted (e.g. a log rotator removed it), you can recover the file content via"," ",e.jsx("code",{className:"code-inline",children:"cp /proc/PID/fd/N /tmp/recovered_file"})," — the kernel still has the data in memory even though the directory entry is gone."]}),e.jsx(i,{title:"/proc/PID Reference",rows:y})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"GDB — GNU Debugger for System Engineers"}),e.jsxs("p",{className:"section-body",children:["GDB (GNU Debugger) is the standard debugger for C/C++ programs on Linux. As a system engineer you will primarily use it to inspect crash sites via core dumps and to take a live backtrace from a hung or crashing process. You rarely need to step through code interactively — understanding ",e.jsx("code",{className:"code-inline",children:"bt"}),","," ",e.jsx("code",{className:"code-inline",children:"info threads"}),", and"," ",e.jsx("code",{className:"code-inline",children:"frame"})," takes you 90% of the way."]}),e.jsxs(t,{type:"warning",title:"Install debuginfo Packages First",children:["Without debug symbols, GDB backtraces show only memory addresses (",e.jsx("code",{className:"code-inline",children:"??"}),") with no function names or line numbers. Install symbols with:"," ",e.jsx("code",{className:"code-inline",children:"dnf debuginfo-install packagename"})," or"," ",e.jsx("code",{className:"code-inline",children:"debuginfo-install -y packagename"}),". The debuginfo-install command requires the"," ",e.jsx("code",{className:"code-inline",children:"rhel-debuginfo"})," repository to be enabled."]}),e.jsx(s,{language:"bash",title:"GDB — install debug symbols and attach to a running process",code:`# Install debug info for a running service
dnf debuginfo-install -y httpd glibc

# Attach GDB to a running process (it will pause while attached)
gdb -p $(pgrep -x httpd | head -1)

# Inside GDB:
(gdb) bt               # backtrace current thread
(gdb) info threads     # list all threads
(gdb) thread 3         # switch to thread 3
(gdb) bt full          # full backtrace with local vars
(gdb) frame 2          # go to frame 2
(gdb) print errno      # print the errno value
(gdb) info locals      # print all local variables
(gdb) detach           # resume process and detach
(gdb) quit`}),e.jsx(s,{language:"bash",title:"GDB — analysing a core dump",code:`# Core dump was left at /var/lib/systemd/coredump/core.myapp.1234
# Load it with the original binary for symbol resolution
gdb /usr/bin/myapp /var/lib/systemd/coredump/core.myapp.1234

# Alternatively use coredumpctl (preferred on RHEL 9):
coredumpctl gdb 1234

# Inside GDB:
(gdb) bt               # see where it crashed
# #0  0x00007f2a3b1a2c34 in __memcpy_avx_unaligned ()
# #1  0x0000563b12345678 in process_request (req=0x0) at request.c:142
#     ^^^^ NULL pointer dereference — req was never initialised

(gdb) frame 1          # go to the application code frame
(gdb) print req        # should show 0x0 = NULL
(gdb) list             # show source (if debuginfo available)
(gdb) info registers   # dump CPU registers at crash site
(gdb) x/16xb $rsp      # hexdump 16 bytes of the stack`}),e.jsx(i,{title:"GDB Command Reference",rows:x})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Core Dump Analysis"}),e.jsxs("p",{className:"section-body",children:["A core dump is a snapshot of a process's memory at the moment of a fatal signal (SIGSEGV, SIGABRT, SIGFPE). It captures the full virtual address space, CPU register state, and open file descriptor list, enabling post-mortem debugging. On RHEL 9,",e.jsx("code",{className:"code-inline",children:"systemd-coredump"})," intercepts and stores core dumps automatically; older systems may use ABRT."]}),e.jsx(s,{language:"bash",title:"Enabling and verifying core dump collection",code:`# Check current core pattern — if it starts with | it goes to a helper
cat /proc/sys/kernel/core_pattern
# Default RHEL 9: |/usr/lib/systemd/systemd-coredump %P %u %g %s %t %c %h

# For manual cores (not systemd-coredump), enable in the shell:
ulimit -c unlimited

# Persist in /etc/security/limits.conf:
echo "* soft core unlimited" >> /etc/security/limits.conf

# Set a custom pattern (write core.PID in /tmp):
echo "/tmp/core.%p" > /proc/sys/kernel/core_pattern

# Persist via sysctl:
echo "kernel.core_pattern = /tmp/core.%p" >> /etc/sysctl.d/50-coredump.conf
sysctl -p /etc/sysctl.d/50-coredump.conf`}),e.jsx(s,{language:"bash",title:"systemd-coredump — the recommended RHEL 9 workflow",code:`# List all recorded crash dumps
coredumpctl list
# TIME                            PID   UID   GID SIG COREFILE EXE
# Fri 2025-01-10 14:22:33 UTC    4521  1000     0  11 present  /usr/bin/myapp

# Detailed metadata for a specific crash (also shows a brief backtrace if debuginfo available)
coredumpctl info 4521

# Open the core dump directly in GDB (best practice)
coredumpctl gdb 4521

# Export core to a file for offline analysis
coredumpctl dump 4521 -o /tmp/myapp.core
gdb /usr/bin/myapp /tmp/myapp.core

# Filter by executable name
coredumpctl list /usr/bin/myapp`}),e.jsx(s,{language:"bash",title:"ABRT — Automatic Bug Reporting Tool",code:`# List problems detected by ABRT (daemon must be running)
abrt-cli list

# Show detailed report for a specific problem
abrt-cli info /var/spool/abrt/ccpp-2025-01-10-14:22:33-4521-1

# Key files inside each ABRT problem directory:
ls /var/spool/abrt/ccpp-*/
# backtrace       — GDB backtrace
# coredump        — the raw core dump
# executable      — path to the binary
# os_info         — OS version info
# pkg_name        — RPM package that owns the binary
# reason          — one-line crash reason
# uid             — user ID that ran the process

# Ensure ABRT daemon is running and enabled
systemctl enable --now abrtd abrt-ccpp`}),e.jsxs(t,{type:"exam",title:"Exam Tip: systemd-coredump vs ulimit",children:["On RHEL 9 with the default ",e.jsx("code",{className:"code-inline",children:"systemd-coredump"})," pipe pattern, ",e.jsx("code",{className:"code-inline",children:"ulimit -c unlimited"})," has no effect — the kernel passes the core to systemd-coredump regardless of the shell limit. Use ",e.jsx("code",{className:"code-inline",children:"coredumpctl list"})," to find recent crashes. Only change ",e.jsx("code",{className:"code-inline",children:"core_pattern"})," and set the ulimit if the task specifically requires manual core files."]}),e.jsx(i,{title:"Core Dump Command Reference",rows:v})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"sosreport — System Diagnostic Collector"}),e.jsxs("p",{className:"section-body",children:[e.jsx("code",{className:"code-inline",children:"sosreport"})," (now also called"," ",e.jsx("code",{className:"code-inline",children:"sos report"}),") collects a comprehensive snapshot of a running system into a single compressed tarball. It gathers journal logs, sysctl values, RPM package list, network configuration, block device info, loaded kernel modules, SELinux policy, hardware info, and much more — everything Red Hat support needs to diagnose a problem remotely. For the exam, know how to run it and what it collects."]}),e.jsx(s,{language:"bash",title:"sosreport — running and locating output",code:`# Run a full sosreport (interactive: asks for name and case number)
sosreport

# Non-interactive (useful in scripts)
sosreport --batch --label myserver_jan2025

# Collect only specific plugins (faster)
sosreport -o logs,networking,kernel --batch

# List all available plugins
sosreport -l | grep -v "not available"

# Output is written to /var/tmp/ by default:
# /var/tmp/sosreport-myserver-2025-01-10-abcdef.tar.xz
# /var/tmp/sosreport-myserver-2025-01-10-abcdef.tar.xz.md5

# Key content inside the sosreport archive:
# sos_commands/       — output of hundreds of diagnostic commands
# var/log/            — system logs
# etc/                — config files (passwords stripped)
# proc/               — /proc snapshots
# sys/                — /sys snapshots`}),e.jsx(t,{type:"info",title:"What sosreport Collects",children:"A typical sosreport tarball includes: full journal output, dmesg, running process list, network configuration, firewall rules, storage and LVM layout, loaded modules, kernel parameters, installed RPMs, SELinux status, and the output of over 500 diagnostic commands — all captured in a single reproducible snapshot in about 2-5 minutes."}),e.jsx(i,{title:"sosreport Reference",rows:w})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Dynamic Instrumentation — SystemTap & bpftrace"}),e.jsxs("p",{className:"section-body",children:["For diagnostics that require kernel-level visibility without rebooting or recompiling kernels, Linux offers two primary dynamic instrumentation frameworks."," ",e.jsx("strong",{className:"text-gray-200",children:"SystemTap"})," uses kernel modules (requires kernel-devel) and a C-like scripting language to probe kernel functions."," ",e.jsx("strong",{className:"text-gray-200",children:"bpftrace"})," uses eBPF (extended Berkeley Packet Filter) — compiled to safe bytecode verified by the kernel — with a simpler awk-like syntax and no kernel module requirement."]}),e.jsx(s,{language:"bash",title:"bpftrace one-liners for application diagnostics",code:`# List all available syscall tracepoints
bpftrace -l 'tracepoint:syscalls:*'

# Trace every openat() call — print PID, process name, and filename
bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf("%d %-16s %s
", pid, comm, str(args->filename)); }'

# Count syscalls by process name (hit Ctrl-C to print histogram)
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @[comm] = count(); }'

# Profile CPU usage by stack (flame graph data)
bpftrace -e 'profile:99 { @[comm, ustack] = count(); }'

# Trace slow read() calls (> 1ms) by process
bpftrace -e '
tracepoint:syscalls:sys_enter_read  { @start[tid] = nsecs; }
tracepoint:syscalls:sys_exit_read   /(@start[tid] > 0) && (nsecs - @start[tid]) > 1000000/
{ printf("PID %d %s read latency: %d ms
", pid, comm, (nsecs - @start[tid]) / 1000000); delete(@start[tid]); }'`}),e.jsx(s,{language:"bash",title:"SystemTap basics",code:`# Probe all open() syscall entries — print PID and filename
stap -e 'probe syscall.open { printf("%d %s\\n", pid(), filename) }'

# Profile CPU time by function (requires kernel debuginfo)
stap -e 'probe kernel.function("*@net/socket.c").call { printf("%s\\n", probefunc()) }'

# Run a SystemTap script file
stap myscript.stp

# Install required packages:
dnf install -y systemtap systemtap-runtime kernel-devel-$(uname -r)
dnf debuginfo-install -y kernel`}),e.jsx(i,{title:"Dynamic Instrumentation Reference",rows:j})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Library Dependency Diagnostics"}),e.jsxs("p",{className:"section-body",children:['"error while loading shared libraries: libfoo.so.1: cannot open shared object file" is one of the most common application errors on Linux. The dynamic linker (',e.jsx("code",{className:"code-inline",children:"ld.so"}),") searches a fixed set of directories at runtime; if the required library is missing or not in the search path, the binary refuses to start. Diagnosing and fixing these issues requires understanding the linker's search order."]}),e.jsxs("div",{className:"rounded-xl border border-border bg-surface-1 p-5 my-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3",children:"Dynamic linker search order"}),e.jsx("div",{className:"space-y-2",children:[{n:"1",label:"RPATH in ELF header",desc:"Hard-coded paths compiled into the binary (rare; bad practice)",color:"text-yellow-300"},{n:"2",label:"LD_LIBRARY_PATH",desc:"Environment variable — overrides everything else (do NOT use in production)",color:"text-red-300"},{n:"3",label:"RUNPATH in ELF header",desc:"Like RPATH but honoured after LD_LIBRARY_PATH",color:"text-yellow-300"},{n:"4",label:"/etc/ld.so.cache",desc:"Pre-built cache from ldconfig — the standard search mechanism",color:"text-green-300"},{n:"5",label:"/lib64 and /usr/lib64",desc:"Default system library directories (always searched last)",color:"text-blue-300"}].map(({n:r,label:o,desc:a,color:n})=>e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"flex-shrink-0 w-6 h-6 rounded-full bg-surface-3 border border-border flex items-center justify-center text-xs font-bold text-gray-400",children:r}),e.jsxs("div",{children:[e.jsx("span",{className:`text-sm font-semibold ${n}`,children:o}),e.jsx("p",{className:"text-xs text-gray-400 mt-0.5",children:a})]})]},r))})]}),e.jsx(s,{language:"bash",title:"Diagnosing 'library not found' errors",code:`# Step 1: Check all library dependencies and their resolved paths
ldd /usr/bin/myapp
# linux-vdso.so.1 (0x00007ffd5a9b7000)
# libfoo.so.1 => not found                   ← problem here
# libc.so.6 => /lib64/libc.so.6 (0x00007f...)

# Step 2: Find where the library actually lives on the system
find /usr /lib /lib64 -name 'libfoo.so*' 2>/dev/null
ldconfig -p | grep libfoo

# Step 3: If the library is there but not in the cache, add its directory
echo "/opt/myapp/lib" > /etc/ld.so.conf.d/myapp.conf
ldconfig              # rebuild the cache
ldconfig -p | grep libfoo   # verify it's now found

# Step 4: Check if ldd now resolves it
ldd /usr/bin/myapp

# Debug the entire load process at runtime:
LD_DEBUG=libs /usr/bin/myapp 2>&1 | head -40
# Shows: search paths tried, library found at, version check, etc.

# If library is in a non-standard path and you can't modify ldconfig:
export LD_LIBRARY_PATH=/opt/myapp/lib:$LD_LIBRARY_PATH
/usr/bin/myapp   # runtime-only fix — not persistent, not suitable for services`}),e.jsxs(t,{type:"warning",title:"Never Use LD_LIBRARY_PATH for Services",children:["Setting ",e.jsx("code",{className:"code-inline",children:"LD_LIBRARY_PATH"})," in a systemd unit file's",e.jsx("code",{className:"code-inline",children:"Environment="})," is a common workaround but a bad practice — it can cause unexpected library version conflicts. The correct fix is to add the library directory to ",e.jsx("code",{className:"code-inline",children:"/etc/ld.so.conf.d/"})," and run ",e.jsx("code",{className:"code-inline",children:"ldconfig"}),". If the library came from an RPM, installing the package properly will handle this automatically."]}),e.jsx(i,{title:"Library Dependency Reference",rows:k})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Application Crash Investigation Workflow"}),e.jsx("p",{className:"section-body",children:"When an application crashes or misbehaves, follow this systematic workflow to move from symptom to root cause efficiently."}),e.jsx(d,{title:"Application Crash Investigation Flow",steps:I})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Complete Command Reference"}),e.jsx(i,{title:"Application Diagnostics — Full Command Reference",rows:N})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Exam Tips"}),e.jsx(t,{type:"exam",title:"Key strace Scenarios to Know",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Missing config file:"})," ",e.jsx("code",{className:"code-inline",children:"strace -e trace=file -s 256 binary"})," → grep ENOENT. The first ENOENT path is usually the expected config location."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Port binding failure:"})," ",e.jsx("code",{className:"code-inline",children:"strace -e trace=network binary"})," → look for bind() returning EADDRINUSE or EACCES (for ports below 1024)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Library not found at runtime:"})," ",e.jsx("code",{className:"code-inline",children:"strace -e trace=file binary"})," → look for open() of .so file returning ENOENT."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Slow startup:"})," ",e.jsx("code",{className:"code-inline",children:"strace -T -c binary"})," → the summary table reveals which syscall is consuming the most time."]})]})}),e.jsx(t,{type:"exam",title:"Core Dump Exam Scenarios",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:["Always run ",e.jsx("code",{className:"code-inline",children:"coredumpctl list"})," first — it gives PID, signal, and binary immediately."]}),e.jsxs("li",{children:["Install debuginfo before loading core: ",e.jsx("code",{className:"code-inline",children:"dnf debuginfo-install -y $(rpm -qf /usr/bin/binary)"}),"."]}),e.jsxs("li",{children:["The most important GDB command sequence: ",e.jsx("code",{className:"code-inline",children:"bt"})," → ",e.jsx("code",{className:"code-inline",children:"info threads"})," → ",e.jsx("code",{className:"code-inline",children:"thread N"})," → ",e.jsx("code",{className:"code-inline",children:"bt full"}),"."]}),e.jsx("li",{children:"Signal 11 = SIGSEGV (segfault), Signal 6 = SIGABRT (abort/assert), Signal 4 = SIGILL (illegal instruction)."})]})}),e.jsxs(t,{type:"exam",title:"lsof Disk Space Recovery Pattern",children:["If a filesystem shows 100% used but ",e.jsx("code",{className:"code-inline",children:"du -sh /*"}),"cannot account for the space, the answer is almost certainly deleted-but-open files. Run ",e.jsx("code",{className:"code-inline",children:"lsof | grep deleted"}),", identify the PID and FD number, then truncate: ",e.jsx("code",{className:"code-inline",children:"> /proc/PID/fd/FD"}),". This is a guaranteed exam scenario."]}),e.jsxs(t,{type:"exam",title:"sosreport for Exam Evidence",children:['If the exam asks you to "collect system diagnostics for Red Hat support" or "generate a support bundle", the answer is ',e.jsx("code",{className:"code-inline",children:"sosreport"}),". Run it as root, note the output path in"," ",e.jsx("code",{className:"code-inline",children:"/var/tmp/"}),", and optionally verify the MD5 checksum file alongside it."]}),e.jsx(t,{type:"tip",title:"Process Inspection Quick Reference",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"cat /proc/PID/cmdline | tr '\\0' ' '"})," — full command line"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"readlink /proc/PID/exe"})," — binary path (even if replaced)"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"ls -la /proc/PID/fd/ | wc -l"})," — count open file descriptors"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"cat /proc/PID/limits | grep 'open files'"})," — check fd limit"]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"cat /proc/PID/io"})," — I/O bytes (rchar, wchar, read_bytes, write_bytes)"]})]})})]})]})}const S=[{cmd:"lspci",desc:"List all PCI devices with short description",note:"Quick inventory"},{cmd:"lspci -v",desc:"Verbose: subsystem IDs, capabilities, BAR addresses",note:""},{cmd:"lspci -vv",desc:"Very verbose: full capability registers",note:"Rarely needed; huge output"},{cmd:"lspci -k",desc:"Show kernel driver in use and available kernel modules",note:"Most useful for driver issues"},{cmd:"lspci -nn",desc:"Include vendor:device IDs in brackets [8086:1521]",note:"Use IDs with modinfo or lwn"},{cmd:"lspci -t",desc:"Show PCI device topology as a tree",note:"Visualise bus hierarchy"},{cmd:"lspci -s 00:1f.2",desc:"Show only device at bus:slot.function address",note:"Filter to specific device"},{cmd:"lspci -d 8086:",desc:"Show only Intel devices (filter by vendor ID)",note:"lspci -d :1521 for any vendor"}],P=[{cmd:"lsusb",desc:"List all USB devices with vendor:product IDs",note:""},{cmd:"lsusb -v",desc:"Verbose: full USB descriptor tree",note:"Very long output"},{cmd:"lsusb -t",desc:"Tree view showing hub topology and bus speed",note:"Shows USB 2.0 vs 3.0 assignment"},{cmd:"lsusb -d 045e:",desc:"Filter by vendor ID (0x045e = Microsoft)",note:""},{cmd:"usb-devices",desc:"Detailed per-device info in a readable format",note:"From usbutils package"}],D=[{cmd:"udevadm monitor",desc:"Live stream of udev events (plug/unplug to see events)",note:"Ctrl-C to stop"},{cmd:"udevadm monitor --kernel",desc:"Show only kernel uevent messages",note:""},{cmd:"udevadm monitor --udev",desc:"Show only processed udev events",note:""},{cmd:"udevadm info /dev/sda",desc:"Show all udev attributes for a device",note:"Use for writing rules"},{cmd:"udevadm info -a /dev/sda",desc:"Show device + all parent attributes (full chain)",note:"Essential for rules writing"},{cmd:"udevadm test /sys/class/net/eth0",desc:"Simulate udev rule processing for a device (dry-run)",note:"Debug rules without rebooting"},{cmd:"udevadm trigger",desc:"Re-trigger udev events for all devices",note:"After adding new rules"},{cmd:"udevadm trigger --action=add",desc:"Re-trigger only add events",note:""},{cmd:"udevadm settle",desc:"Wait for udev to finish processing all events",note:"Use in scripts after trigger"},{cmd:"udevadm control --reload",desc:"Reload udev rules from disk without restart",note:"After editing /etc/udev/rules.d/"}],C=[{cmd:"dmidecode",desc:"Print all SMBIOS/DMI tables (very verbose)",note:"Root required"},{cmd:"dmidecode -t 0",desc:"BIOS/UEFI information: version, release date, vendor",note:""},{cmd:"dmidecode -t 1",desc:"System info: manufacturer, model, serial, UUID",note:"Useful for asset tracking"},{cmd:"dmidecode -t 2",desc:"Baseboard (motherboard) info",note:""},{cmd:"dmidecode -t 4",desc:"Processor info: socket, speed, cores, flags",note:""},{cmd:"dmidecode -t 17",desc:"Memory device info: slot, size, speed, type, bank",note:"Find empty vs populated slots"},{cmd:"dmidecode -s system-product-name",desc:"Print only the system product name",note:"Scripting-friendly -s flag"},{cmd:"dmidecode -s bios-version",desc:"Print BIOS version string only",note:""}],R=[{cmd:"lshw -short",desc:"Compact one-line-per-device hardware summary",note:"Best overview command"},{cmd:"lshw -c network",desc:"Detailed info for network interfaces only",note:"Shows MAC, speed, driver"},{cmd:"lshw -c storage",desc:"Storage controllers and disk drives",note:""},{cmd:"lshw -c display",desc:"GPU and display controllers",note:""},{cmd:"lshw -c memory",desc:"RAM banks and cache hierarchy",note:""},{cmd:"lshw -html",desc:"Generate HTML report (write to file)",note:"lshw -html > hw.html"},{cmd:"hwinfo --short",desc:"Short hardware inventory (hwinfo package)",note:"Alternative to lshw"},{cmd:"hwinfo --network",desc:"Detailed network interface info from hwinfo",note:""}],E=[{cmd:"smartctl -a /dev/sda",desc:"Full SMART data: attributes, health, test history",note:"Most useful command"},{cmd:"smartctl -H /dev/sda",desc:"Quick health check: PASSED or FAILED",note:"Use in monitoring"},{cmd:"smartctl -i /dev/sda",desc:"Device identity: model, serial, firmware",note:""},{cmd:"smartctl -t short /dev/sda",desc:"Start a short self-test (~2 min)",note:"Drive stays online"},{cmd:"smartctl -t long /dev/sda",desc:"Start an extended self-test (~hours)",note:"More thorough scan"},{cmd:"smartctl -t conveyance /dev/sda",desc:"Conveyance test (post-shipping damage check)",note:"Only on ATA drives"},{cmd:"smartctl -l selftest /dev/sda",desc:"Show self-test log with results and timestamps",note:""},{cmd:"smartctl -l error /dev/sda",desc:"Show error log (last 5 errors by default)",note:"Critical for diagnosis"},{cmd:"smartctl -A /dev/sda",desc:"Show SMART attribute table only",note:"-A = attributes"},{cmd:"smartctl -d sat /dev/sda",desc:"Force SAT translation (for SATA-behind-SAS HBA)",note:""},{cmd:"smartctl -a /dev/nvme0",desc:"SMART data for NVMe drives",note:"NVMe uses different attrs"}],T=[{cmd:"lscpu",desc:"CPU architecture, topology, speed, flags",note:"NUMA, sockets, cores, threads"},{cmd:"lscpu --extended",desc:"Per-CPU details: CPU, CORE, SOCKET, NUMA node",note:"Topology mapping"},{cmd:"cat /proc/cpuinfo",desc:"Raw per-logical-CPU info including all flags",note:"grep for specific flags"},{cmd:"grep -m1 flags /proc/cpuinfo",desc:"Show CPU feature flags from first CPU",note:"Check for vmx/svm, avx, aes…"},{cmd:"x86info -a",desc:"Detailed x86 CPU info including cache details",note:"Requires x86info package"},{cmd:"cpupower frequency-info",desc:"CPU frequency scaling: current speed, governor",note:"From kernel-tools package"},{cmd:"cpupower idle-info",desc:"CPU idle state (C-state) configuration",note:""}],A=[{cmd:"lsmod",desc:"List all currently loaded kernel modules",note:""},{cmd:"modinfo module_name",desc:"Module metadata: author, description, parameters",note:"modinfo bnx2"},{cmd:"modprobe module_name",desc:"Load a module and its dependencies",note:"Preferred over insmod"},{cmd:"modprobe -r module_name",desc:"Remove a module (and unused dependencies)",note:"modprobe -r e1000"},{cmd:"rmmod module_name",desc:"Remove a module (no dependency handling)",note:"Use modprobe -r instead"},{cmd:"dmesg | grep -i driver",desc:"Find driver load/unload messages in kernel ring",note:"Also grep: error, fail, NVRM"},{cmd:"ls /sys/bus/pci/drivers/",desc:"List all bound PCI drivers",note:""},{cmd:"ls /sys/bus/pci/devices/",desc:"All PCI devices by domain:bus:slot.fn",note:""},{cmd:"cat /sys/bus/pci/devices/0000:00:1f.2/driver/module/version",desc:"Driver version for a specific device",note:""},{cmd:"/etc/modprobe.d/blacklist.conf",desc:"Blacklist file — prevents modules from auto-loading",note:"blacklist nouveau"},{cmd:"echo blacklist nouveau > /etc/modprobe.d/blacklist-nouveau.conf",desc:"Blacklist the nouveau driver",note:"Then: dracut -f"}],M=[{cmd:"ipmitool chassis status",desc:"System power state, chassis intrusion, fault LEDs",note:""},{cmd:"ipmitool sensor list",desc:"All sensor readings: temp, fan, voltage, power",note:"Filter: | grep -i temp"},{cmd:'ipmitool sensor get "CPU Temp"',desc:"Reading for a specific named sensor",note:"Sensor names vary by vendor"},{cmd:"ipmitool sel list",desc:"System Event Log — hardware fault history",note:"Most important for diagnosis"},{cmd:"ipmitool sel clear",desc:"Clear the System Event Log",note:"Root + IPMI access required"},{cmd:"ipmitool sdr list",desc:"Sensor Data Repository — all sensor definitions",note:""},{cmd:"ipmitool fru list",desc:"Field Replaceable Unit inventory (serial numbers)",note:"Board, PSU, drive cage"},{cmd:"ipmitool mc info",desc:"BMC firmware version and manufacturer",note:""},{cmd:"ipmitool -I lanplus -H BMC_IP -U admin chassis status",desc:"Remote IPMI over network (IPMI-over-LAN)",note:"-I lanplus for IPMI v2"},{cmd:"ipmitool power reset",desc:"Hard reset the server (immediate, no OS shutdown)",note:"Use with caution"}],L=[{cmd:"cat /proc/interrupts",desc:"IRQ table: per-CPU counts, type, and device name",note:"Refresh with watch -n1"},{cmd:"cat /proc/irq/N/smp_affinity",desc:"CPU affinity bitmask for IRQ N (hex)",note:"ff = all CPUs; 01 = CPU0 only"},{cmd:"echo 6 > /proc/irq/N/smp_affinity",desc:"Set IRQ N to CPUs 1 and 2 (binary 0110)",note:"Runtime only; use irqbalance.conf to persist"},{cmd:"cat /proc/irq/N/smp_affinity_list",desc:"CPU affinity in human-readable list format",note:"e.g. 2-3 for CPUs 2 and 3"},{cmd:"systemctl status irqbalance",desc:"Check irqbalance daemon status",note:"Distributes IRQs across CPUs"},{cmd:"systemctl disable irqbalance",desc:"Disable automatic IRQ balancing for manual tuning",note:"Required for latency tuning"}],U=[{cmd:"sensors",desc:"Current temperatures, fan speeds, voltages",note:"lm-sensors package"},{cmd:"sensors-detect",desc:"Auto-detect hardware monitoring chips",note:"Run once on new hardware"},{cmd:"cat /sys/class/thermal/thermal_zone*/temp",desc:"Raw thermal zone temperatures (millidegrees C)",note:"Divide by 1000 for °C"},{cmd:"cat /sys/class/thermal/thermal_zone0/type",desc:"Name/type of thermal zone 0",note:"e.g. x86_pkg_temp"},{cmd:"watch -n2 sensors",desc:"Live temperature monitoring (updates every 2s)",note:""},{cmd:"powerstat",desc:"Per-process power consumption and system stats",note:"powerstat package; needs root"},{cmd:"powertop",desc:"Detailed power usage: processes, devices, tuning tips",note:"ncurses TUI; needs root"},{cmd:"powertop --auto-tune",desc:"Apply all recommended power management settings",note:"Not persistent; good for testing"},{cmd:"turbostat",desc:"Per-CPU C-states, P-states, power, and temperature",note:"kernel-tools package"}],O=[{cmd:"lspci -k",desc:"PCI devices with kernel driver",note:"Most useful for driver issues"},{cmd:"lspci -nn",desc:"PCI devices with vendor:device IDs",note:"Use IDs to look up drivers"},{cmd:"lsusb -t",desc:"USB device tree with bus speeds",note:""},{cmd:"udevadm info -a /dev/sda",desc:"Device + parent attributes",note:"Needed for writing udev rules"},{cmd:"udevadm monitor",desc:"Live udev event stream",note:"Plug/unplug to see events"},{cmd:"dmidecode -t 17",desc:"Memory slot information from BIOS",note:""},{cmd:"dmidecode -t 1",desc:"System product, manufacturer, serial",note:""},{cmd:"lshw -short",desc:"Compact hardware summary",note:""},{cmd:"lshw -c network",desc:"Network device details (driver, speed)",note:""},{cmd:"smartctl -H /dev/sda",desc:"Quick SMART health check",note:"PASSED or FAILED"},{cmd:"smartctl -a /dev/sda",desc:"Full SMART attributes and test history",note:""},{cmd:"smartctl -t short /dev/sda",desc:"Run short self-test",note:"~2 minutes"},{cmd:"smartctl -l error /dev/sda",desc:"Show drive error log",note:""},{cmd:"lscpu",desc:"CPU topology, speed, and flags",note:""},{cmd:"grep vmx /proc/cpuinfo",desc:"Check Intel virtualisation support",note:"svm for AMD"},{cmd:"modprobe module",desc:"Load a kernel module",note:""},{cmd:"modprobe -r module",desc:"Unload a module",note:""},{cmd:"dmesg | grep -i error",desc:"Kernel error messages",note:""},{cmd:"ipmitool sel list",desc:"Hardware event log (System Event Log)",note:"Most important IPMI command"},{cmd:"ipmitool sensor list",desc:"All sensor readings",note:""},{cmd:"ipmitool chassis status",desc:"Server power and chassis state",note:""},{cmd:"cat /proc/interrupts",desc:"IRQ table with per-CPU counts",note:"watch -n1 for live view"},{cmd:"cat /proc/irq/N/smp_affinity",desc:"CPU affinity for IRQ N",note:"Hex bitmask"},{cmd:"sensors",desc:"Temperature, fan speed, voltage",note:"lm-sensors package"},{cmd:"cat /sys/class/thermal/thermal_zone*/temp",desc:"Kernel thermal readings",note:"Divide by 1000 = °C"}],_=[{label:"Symptom reported — identify category",sub:"System crash (MCE/kernel panic)?  Disk errors (I/O errors in dmesg)?  Network failure?  USB device not detected?  High temperature?",color:"red"},{label:"Check dmesg and journal for hardware errors",sub:`dmesg -T | grep -iE "error|fail|warn|mce|edac|ata|usb"
journalctl -k --since "1 hour ago" | grep -i error`,color:"yellow"},{label:"Identify affected device with lspci / lsusb / lshw",sub:`lspci -k  (PCI devices + drivers)
lsusb -t  (USB topology)
lshw -short  (full inventory)`,color:"blue"},{label:"Check device driver binding and status",sub:`lspci -k  →  "Kernel driver in use:"
ls /sys/bus/pci/drivers/
dmesg | grep <module_name>`,color:"blue"},{label:"Run SMART diagnostics for storage devices",sub:`smartctl -H /dev/sdX  →  quick health
smartctl -a /dev/sdX  →  attributes (check attrs 5, 187, 197, 198)
smartctl -t short /dev/sdX  →  self-test`,color:"purple"},{label:"Check IPMI / BMC for hardware events",sub:`ipmitool sel list  →  System Event Log (hardware fault history)
ipmitool sensor list | grep -i temp  →  check for thermal events`,color:"yellow"},{label:"Review thermal state and power",sub:`sensors  →  temperatures, fans
cat /sys/class/thermal/thermal_zone*/temp  →  kernel view
Check for throttling: dmesg | grep -i throttl`,color:"green"},{label:"Collect sosreport for escalation",sub:"sosreport  →  provides hardware inventory, dmesg, SMART data, and IPMI SEL to Red Hat support.",color:"default"}];function q(){return e.jsxs("div",{className:"space-y-12",children:[e.jsx(l,{icon:h,title:"Hardware Diagnostics",subtitle:"Detect and diagnose hardware faults using PCI/USB enumeration, udev rules, DMI tables, SMART disk analysis, driver inspection, IPMI out-of-band management, IRQ affinity, and thermal monitoring.",tags:["lspci","SMART","IPMI","udev","dmidecode","lshw","lm-sensors","IRQ"]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Hardware Discovery Architecture"}),e.jsxs("p",{className:"section-body",children:["Hardware visibility in Linux is built from several cooperating layers, each responsible for a specific level of abstraction — from firmware tables to device files in"," ",e.jsx("code",{className:"code-inline",children:"/dev"}),". Understanding this stack tells you exactly where in the chain a failure is occurring."]}),e.jsx("div",{className:"my-5 rounded-xl border border-border bg-surface-1 p-5 space-y-1",children:[{label:"BIOS / UEFI Firmware",desc:"Initialises physical hardware, performs POST, builds ACPI and SMBIOS tables in memory.",tools:"dmidecode (reads SMBIOS), efibootmgr",color:"bg-red-950/40 border-red-800/60 text-red-200",dot:"bg-red-500"},{label:"ACPI (Advanced Config & Power Interface)",desc:"Describes hardware topology, power states, and device capabilities to the OS via AML bytecode tables.",tools:"acpidump, acpixtract, /sys/firmware/acpi/",color:"bg-orange-950/40 border-orange-800/60 text-orange-200",dot:"bg-orange-500"},{label:"Linux Kernel — Device Drivers",desc:"Matches hardware via PCI/USB IDs, loads the correct driver, initialises the device, publishes events via uevent.",tools:"lsmod, modprobe, dmesg, /sys/bus/*/",color:"bg-yellow-950/40 border-yellow-800/60 text-yellow-200",dot:"bg-yellow-500"},{label:"udev (Userspace Device Manager)",desc:"Listens to kernel uevent messages, applies rules from /etc/udev/rules.d/, creates and names device nodes.",tools:"udevadm monitor, udevadm info, udevadm trigger",color:"bg-blue-950/40 border-blue-800/60 text-blue-200",dot:"bg-blue-500"},{label:"Device Files (/dev/) and sysfs (/sys/)",desc:"Character/block device nodes exposed to user space. /sys/ exposes every device attribute as a file.",tools:"ls /dev/, ls /sys/class/, ls /sys/bus/",color:"bg-green-950/40 border-green-800/60 text-green-200",dot:"bg-green-500"},{label:"User Space Tools",desc:"lspci, lsusb, lshw, dmidecode, smartctl, sensors — query /sys/, /proc/, and device-specific interfaces.",tools:"lspci, lsusb, lshw, smartctl, ipmitool",color:"bg-surface-3 border-border text-gray-200",dot:"bg-gray-400"}].map((r,o,a)=>e.jsxs("div",{children:[e.jsxs("div",{className:`rounded-lg border px-4 py-3 ${r.color}`,children:[e.jsxs("div",{className:"flex items-center gap-2 mb-0.5",children:[e.jsx("div",{className:`w-2.5 h-2.5 rounded-full flex-shrink-0 ${r.dot}`}),e.jsx("span",{className:"text-sm font-bold",children:r.label})]}),e.jsx("p",{className:"text-xs leading-relaxed opacity-80 ml-4",children:r.desc}),e.jsx("p",{className:"text-[11px] font-mono opacity-60 mt-1 ml-4",children:r.tools})]}),o<a.length-1&&e.jsx("div",{className:"flex justify-center py-0.5",children:e.jsx("svg",{width:"14",height:"16",viewBox:"0 0 14 16",fill:"none",className:"opacity-40",children:e.jsx("path",{d:"M7 0v12M1 8l6 7 6-7",stroke:"#EE0000",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})})]},r.label))}),e.jsx(t,{type:"tip",title:"Diagnostic Layer Selection Guide",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Device not visible in lspci/lsusb:"})," hardware or BIOS/PCIe slot issue."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Device in lspci but no driver:"})," missing kernel module or driver not bound."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Driver loaded but /dev node missing:"})," udev rule issue or udevd problem."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Device works but misbehaves:"})," driver bug, firmware issue, or overheating."]})]})})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"PCI Device Enumeration with lspci"}),e.jsxs("p",{className:"section-body",children:[e.jsx("code",{className:"code-inline",children:"lspci"})," reads the PCI configuration space of all devices on the system and reports their class, vendor, device ID, and driver binding. PCI addresses use the ",e.jsx("em",{children:"domain:bus:slot.function"})," notation — e.g. ",e.jsx("code",{className:"code-inline",children:"0000:00:1f.2"})," means domain 0, bus 0, slot 31 (0x1f), function 2. Most systems have a single domain (0000)."]}),e.jsx(s,{language:"bash",title:"lspci — practical diagnostic examples",code:`# Overview of all PCI devices
lspci

# Most useful: show which kernel driver is bound to each device
lspci -k
# 00:1f.2 SATA controller: Intel Corporation 8 Series SATA Controller (rev 04)
#         Subsystem: Dell Inc. Device 0612
#         Kernel driver in use: ahci          ← driver loaded and bound
#         Kernel modules: ahci               ← available module

# Find devices with NO driver loaded (potential problem):
lspci -k | grep -A2 "no driver"

# Include vendor:device IDs (useful for hardware database lookups):
lspci -nn
# 0000:02:00.0 Ethernet controller [0200]: Intel Corporation I350 Gigabit [8086:1521]
#                                                                   ^^^^^^^^^^^^^^^^^^
# Use these IDs with: modinfo -F alias | grep "8086:1521" to find the right driver

# Show PCIe device topology (which devices are behind which bridges)
lspci -t

# Filter to a specific device for detailed inspection
lspci -vvv -s 0000:02:00.0

# Paths in /sys for PCI device inspection:
ls /sys/bus/pci/devices/0000:02:00.0/
cat /sys/bus/pci/devices/0000:02:00.0/vendor   # e.g. 0x8086
cat /sys/bus/pci/devices/0000:02:00.0/class    # e.g. 0x020000 (Ethernet)
ls /sys/bus/pci/devices/0000:02:00.0/driver/   # symlink to bound driver`}),e.jsxs(t,{type:"exam",title:"Exam Tip: lspci -k is Your First Driver Diagnostic",children:["When a NIC, HBA, or other PCI device is not working, run"," ",e.jsx("code",{className:"code-inline",children:"lspci -k"}),' first. If you see "Kernel driver in use:" the driver is bound. If there is no "Kernel driver in use:" line, the driver is not loaded. Then run ',e.jsx("code",{className:"code-inline",children:"modprobe <module>"})," to load it manually or add it to ",e.jsx("code",{className:"code-inline",children:"/etc/modules-load.d/"})," for persistence."]}),e.jsx(i,{title:"lspci Reference",rows:S})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"USB Devices and udev Rules"}),e.jsx("h3",{className:"text-base font-semibold text-gray-200 mb-2 mt-4",children:"USB Enumeration with lsusb"}),e.jsxs("p",{className:"section-body",children:[e.jsx("code",{className:"code-inline",children:"lsusb"})," enumerates USB devices attached to all hubs. USB devices are identified by a vendor:product ID pair (e.g."," ",e.jsx("code",{className:"code-inline",children:"0951:1666"})," = Kingston DataTraveler). The tree view (",e.jsx("code",{className:"code-inline",children:"-t"}),") reveals whether a device is connected at USB 2.0 (480 Mbit/s) or USB 3.0 (5 Gbit/s) speeds."]}),e.jsx(s,{language:"bash",title:"lsusb — discovering and analysing USB devices",code:`# List all USB devices
lsusb
# Bus 002 Device 003: ID 0951:1666 Kingston Technology DataTraveler 100 G3
# Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub

# Tree view — shows which hub each device is attached to and bus speed
lsusb -t
# /:  Bus 02.Port 1: Dev 1, Class=root_hub, Driver=xhci_hcd/6p, 5000M
#     |__ Port 3: Dev 3, If 0, Class=Mass Storage, Driver=usb-storage, 5000M

# Verbose info for a specific device (use Bus + Device from lsusb output)
lsusb -v -d 0951:1666

# Monitor USB events in real time (plug in a device to see events)
udevadm monitor --subsystem-match=usb`}),e.jsx("h3",{className:"text-base font-semibold text-gray-200 mb-2 mt-6",children:"udev Rules"}),e.jsxs("p",{className:"section-body",children:[e.jsx("code",{className:"code-inline",children:"udev"})," is the Linux device manager that runs in user space. When the kernel detects a new device, it sends a uevent message to udevd, which evaluates rules in ",e.jsx("code",{className:"code-inline",children:"/etc/udev/rules.d/"})," (local, highest priority) and ",e.jsx("code",{className:"code-inline",children:"/usr/lib/udev/rules.d/"}),"(package-provided). Rules are processed in filename alphanumeric order."]}),e.jsxs("div",{className:"rounded-xl border border-blue-800/60 bg-blue-950/20 p-4 my-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-blue-300 mb-3",children:"udev Rule Syntax"}),e.jsxs("div",{className:"font-mono text-xs text-gray-300 bg-surface-2 rounded-lg p-3 overflow-x-auto mb-3",children:[e.jsx("span",{className:"text-token-keyword",children:"SUBSYSTEM"}),e.jsx("span",{className:"text-gray-500",children:"=="}),e.jsx("span",{className:"text-token-string",children:'"usb"'}),e.jsx("span",{className:"text-gray-500",children:", "}),e.jsx("span",{className:"text-token-keyword",children:"ATTR{idVendor}"}),e.jsx("span",{className:"text-gray-500",children:"=="}),e.jsx("span",{className:"text-token-string",children:'"0951"'}),e.jsx("span",{className:"text-gray-500",children:", "}),e.jsx("span",{className:"text-token-keyword",children:"ATTR{idProduct}"}),e.jsx("span",{className:"text-gray-500",children:"=="}),e.jsx("span",{className:"text-token-string",children:'"1666"'}),e.jsx("span",{className:"text-gray-500",children:", "}),e.jsx("span",{className:"text-token-fn",children:"SYMLINK"}),e.jsx("span",{className:"text-gray-500",children:"+="}),e.jsx("span",{className:"text-token-string",children:'"kingston_dt"'})]}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2 text-xs",children:[{key:"SUBSYSTEM",desc:'Device subsystem: "usb", "block", "net", "pci"'},{key:"ATTR{name}",desc:"Match device attribute from /sys/ (e.g. idVendor, manufacturer)"},{key:"ATTRS{name}",desc:"Match attribute of device OR any parent (use for USB)"},{key:"ACTION",desc:'"add" | "remove" | "change" — the event type to match'},{key:"KERNEL",desc:'Match kernel device name (e.g. "sd*", "eth*")'},{key:"ENV{var}",desc:'Match environment variable (e.g. ENV{ID_TYPE}=="disk")'},{key:"NAME=",desc:'Set the device node name (e.g. NAME="mydevice")'},{key:"SYMLINK+=",desc:"Create an additional symlink in /dev/"},{key:"MODE=",desc:'Set device file permissions (e.g. MODE="0660")'},{key:"OWNER= / GROUP=",desc:"Set device file owner and group"},{key:"RUN+=",desc:"Execute a command when the rule matches"},{key:"LABEL= / GOTO=",desc:"Jump to a label (skip rules) for efficient matching"}].map(({key:r,desc:o})=>e.jsxs("div",{className:"rounded bg-surface-3 border border-border px-3 py-2",children:[e.jsx("code",{className:"text-token-operator font-bold",children:r}),e.jsx("span",{className:"text-gray-400 ml-2",children:o})]},r))}),e.jsxs("p",{className:"text-xs text-gray-400 mt-3",children:["Rule operators: ",e.jsx("code",{className:"code-inline",children:"=="})," (match),"," ",e.jsx("code",{className:"code-inline",children:"!="})," (not match),"," ",e.jsx("code",{className:"code-inline",children:"="})," (assign),"," ",e.jsx("code",{className:"code-inline",children:"+="})," (append to list),"," ",e.jsx("code",{className:"code-inline",children:":="})," (assign and lock — prevents later changes)."]})]}),e.jsx(s,{language:"bash",title:"udev — writing and testing rules",code:`# Step 1: Find all attributes for the device you want to match
udevadm info -a /dev/sdb
# Examining device '/devices/pci0000:00/0000:00:14.0/usb2/2-3/2-3:1.0/host3/...'
# ATTRS{idVendor}=="0951"
# ATTRS{idProduct}=="1666"
# ATTRS{manufacturer}=="Kingston"

# Step 2: Write the rule
cat > /etc/udev/rules.d/99-kingston.rules << 'EOF'
SUBSYSTEM=="block", ATTRS{idVendor}=="0951", ATTRS{idProduct}=="1666",   SYMLINK+="kingston_dt", MODE="0660", GROUP="storage"
EOF

# Step 3: Test the rule without rebooting
udevadm test $(udevadm info -q path /dev/sdb)

# Step 4: Reload rules and trigger events
udevadm control --reload
udevadm trigger --action=add --subsystem-match=block

# Verify the symlink was created:
ls -la /dev/kingston_dt`}),e.jsx(i,{title:"lsusb Reference",rows:P}),e.jsx(i,{title:"udevadm Reference",rows:D})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"DMI / BIOS Information with dmidecode"}),e.jsxs("p",{className:"section-body",children:[e.jsx("code",{className:"code-inline",children:"dmidecode"})," reads the Desktop Management Interface (DMI) / SMBIOS tables that the BIOS/UEFI firmware writes into memory during POST. These tables contain structured information about every hardware component: system model, serial number, processor socket count, RAM slot count and speed, BIOS version, and much more — all without needing to open the chassis."]}),e.jsx(s,{language:"bash",title:"dmidecode — practical examples",code:`# Full DMI dump (very long — pipe to less)
dmidecode | less

# System model, serial number, and UUID (useful for support tickets / asset tracking)
dmidecode -t 1
# System Information
#         Manufacturer: Dell Inc.
#         Product Name: PowerEdge R650
#         Serial Number: ABC1234
#         UUID: 4c4c4544-0052-5810-8057-b8c04f383331

# BIOS version and release date
dmidecode -t 0
# BIOS Information
#         Vendor: Dell Inc.
#         Version: 1.5.1
#         Release Date: 11/12/2023

# Memory slot inventory — how many slots, size, speed, type of each DIMM
dmidecode -t 17
# Memory Device
#         Bank Locator: NODE 1
#         Locator: DIMM_A1
#         Size: 32 GB
#         Type: DDR4
#         Speed: 3200 MT/s
#         Manufacturer: Samsung
#         Serial Number: ...
#         --- (repeat for each slot; "No Module Installed" = empty slot)

# Processor information — socket, core count, max speed
dmidecode -t 4

# Quick script-friendly output:
dmidecode -s system-product-name     # Dell PowerEdge R650
dmidecode -s system-serial-number    # ABC1234
dmidecode -s bios-version            # 1.5.1
dmidecode -s processor-version       # Intel Xeon Gold 6338`}),e.jsxs(t,{type:"tip",title:"Counting Memory Slots and Finding Empty DIMMs",children:[e.jsx("code",{className:"code-inline",children:'dmidecode -t 17 | grep -c "Memory Device"'})," gives the total slot count. Pipe through"," ",e.jsx("code",{className:"code-inline",children:'grep -A10 "Memory Device" | grep "Size:"'}),' to see which are populated. "No Module Installed" entries are empty slots — useful when planning memory upgrades without physical access.']}),e.jsx(i,{title:"dmidecode Reference",rows:C})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Hardware Inventory with lshw"}),e.jsxs("p",{className:"section-body",children:[e.jsx("code",{className:"code-inline",children:"lshw"})," (List Hardware) aggregates data from multiple sources — DMI tables, ",e.jsx("code",{className:"code-inline",children:"/proc"}),","," ",e.jsx("code",{className:"code-inline",children:"/sys"}),", and PCI/USB enumeration — into a single structured view of the entire hardware inventory. The"," ",e.jsx("code",{className:"code-inline",children:"-short"})," output is the fastest way to get an overview."]}),e.jsx(s,{language:"bash",title:"lshw — hardware inventory examples",code:`# Compact one-line summary of all hardware classes
lshw -short
# H/W path        Device       Class       Description
# =======================================================================
# /0                           bus         Z590 AORUS ELITE AX
# /0/0                         memory      64KiB BIOS
# /0/4                         processor   Intel(R) Core(TM) i9-11900K
# /0/4/5                       memory      256KiB L1 cache
# /0/100                       bridge      Intel Corporation Device 9a09
# /0/100/2        /dev/fb0     display     Iris Xe Graphics
# /0/100/17       /dev/sda     disk        1TB Samsung 980 PRO
# /0/100/14.0     usb1         bus         Tiger Lake-H USB 3.2
# /0/1            /dev/eth0    network     Intel I225-V Gigabit

# Detailed NIC info (driver, speed, negotiated rate, MAC, firmware)
lshw -c network
# *-network
#      description: Ethernet interface
#      logical name: eno1
#      serial: 00:11:22:33:44:55       ← MAC address
#      capacity: 1Gbit/s
#      configuration: driver=e1000e driverversion=3.8 firmware=0.13-4 speed=1Gbit/s

# Detailed storage controller and disk info
lshw -c storage -c disk`}),e.jsx(i,{title:"lshw / hwinfo Reference",rows:R})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"SMART Disk Diagnostics with smartctl"}),e.jsxs("p",{className:"section-body",children:["S.M.A.R.T. (Self-Monitoring Analysis and Reporting Technology) is a firmware feature built into ATA, SATA, SAS, and NVMe drives that continuously monitors drive health internally. ",e.jsx("code",{className:"code-inline",children:"smartctl"})," from the"," ",e.jsx("code",{className:"code-inline",children:"smartmontools"})," package reads and interprets this data. Learning to read the attribute table is essential — several attributes are direct predictors of imminent drive failure."]}),e.jsx("h3",{className:"text-base font-semibold text-gray-200 mb-2 mt-4",children:"Critical SMART Attributes to Monitor"}),e.jsxs("div",{className:"rounded-xl overflow-hidden border border-border my-4",children:[e.jsx("div",{className:"px-4 py-2.5 bg-surface-2 border-b border-border",children:e.jsx("h3",{className:"text-sm font-semibold text-gray-300",children:"Key SMART Attribute Reference"})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-2/80 border-b border-border",children:[e.jsx("th",{className:"text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide",children:"ID"}),e.jsx("th",{className:"text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide",children:"Attribute Name"}),e.jsx("th",{className:"text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide",children:"Severity"}),e.jsx("th",{className:"text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide",children:"What it means"})]})}),e.jsx("tbody",{children:[{id:"1",name:"Raw Read Error Rate",sev:"warning",sevColor:"text-yellow-300",desc:"Rate of hardware read errors. Increasing trend = disk surface degradation."},{id:"5",name:"Reallocated Sector Count",sev:"critical",sevColor:"text-red-300",desc:"Sectors with errors remapped to spare area. ANY non-zero value is a warning; large values = replace drive."},{id:"9",name:"Power On Hours",sev:"info",sevColor:"text-blue-300",desc:"Total power-on time. Consumer drives rated 3-5 years; enterprise 5-10 years."},{id:"187",name:"Reported Uncorrectable Errors",sev:"critical",sevColor:"text-red-300",desc:"Errors not correctable by hardware ECC. Non-zero = data has been lost. Replace drive."},{id:"188",name:"Command Timeout",sev:"warning",sevColor:"text-yellow-300",desc:"Commands that timed out. Increasing counts suggest SATA cable or controller issues."},{id:"197",name:"Current Pending Sector Count",sev:"critical",sevColor:"text-red-300",desc:"Sectors waiting to be remapped (read errors, not yet written). Increasing = drive failure imminent."},{id:"198",name:"Offline Uncorrectable",sev:"critical",sevColor:"text-red-300",desc:"Sectors found uncorrectable during offline scan. Direct evidence of bad blocks."},{id:"199",name:"UDMA CRC Error Count",sev:"warning",sevColor:"text-yellow-300",desc:"CRC errors on the SATA/ATA interface. Increasing = bad cable or connector."}].map(({id:r,name:o,sev:a,sevColor:n,desc:c})=>e.jsxs("tr",{className:"border-b border-border/50 last:border-0 odd:bg-surface-0 even:bg-surface-1/40",children:[e.jsx("td",{className:"px-4 py-2.5 font-mono font-bold text-token-number",children:r}),e.jsx("td",{className:"px-4 py-2.5 font-semibold text-gray-200",children:o}),e.jsx("td",{className:`px-4 py-2.5 font-semibold ${n}`,children:a.toUpperCase()}),e.jsx("td",{className:"px-4 py-2.5 text-gray-400",children:c})]},r))})]})})]}),e.jsx(s,{language:"bash",title:"smartctl — full diagnostic workflow",code:`# 1. Quick health check (PASSED or FAILED)
smartctl -H /dev/sda
# === START OF READ SMART DATA SECTION ===
# SMART overall-health self-assessment test result: PASSED

# 2. Full attribute table (the critical information)
smartctl -A /dev/sda
# ID# ATTRIBUTE_NAME          FLAG  VALUE WORST THRESH FAIL RAW_VALUE
#   1 Raw_Read_Error_Rate     0x000f  100   100   006    -    0
#   5 Reallocated_Sector_Ct   0x0033  100   100   036    -    0      ← 0 = healthy
# 197 Current_Pending_Sector  0x0012  100   100   000    -    3      ← 3 = BAD!
# The VALUE/WORST decrease toward THRESH as the drive degrades.

# 3. Start a short self-test (non-destructive, drive stays online)
smartctl -t short /dev/sda
# Testing has begun. Please wait 2 minutes for test to complete.

# 4. Check test results
smartctl -l selftest /dev/sda
# SMART Self-test log structure
# Num  Test_Description  Status                  Remaining  LifeTime  LBA_of_first_error
# # 1  Short offline      Completed without error  00%         9842    -

# 5. Check error log
smartctl -l error /dev/sda

# 6. Full output (all of the above in one command)
smartctl -a /dev/sda

# For NVMe drives:
smartctl -a /dev/nvme0

# Enable SMART on a drive that has it disabled:
smartctl -s on /dev/sda`}),e.jsx(s,{language:"bash",title:"smartd — automated SMART monitoring",code:`# /etc/smartd.conf — example configuration
# Monitor all drives with 30-day short test, 365-day long test, email on failure
DEVICESCAN -a -o on -S on -s (S/../.././02|L/../../6/03) -m root -M exec /usr/libexec/smartmontools/smartd-runner

# Monitor specific drive with specific attributes to watch
/dev/sda -a -W 4,45,50 -I 194 -m admin@example.com

# Enable and start:
systemctl enable --now smartd

# Test email notification config:
smartctl --test=email /dev/sda`}),e.jsxs(t,{type:"exam",title:"Exam Tip: SMART Attribute Thresholds",children:["The ",e.jsx("em",{children:"VALUE"})," column starts at 100 (or higher) and counts down. The"," ",e.jsx("em",{children:"THRESH"}),' column is the threshold below which the attribute is considered failed. When VALUE falls below THRESH, the FAIL column shows "NOW" or "PAST". For exam purposes: ',e.jsx("strong",{children:"any non-zero value in attributes 5, 187, 197, or 198 indicates a drive with existing or likely imminent data loss."})," Recommend replacement."]}),e.jsx(i,{title:"smartctl Reference",rows:E})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"CPU Information and Feature Detection"}),e.jsxs("p",{className:"section-body",children:[e.jsx("code",{className:"code-inline",children:"lscpu"})," provides a structured summary of CPU topology, architecture, and capabilities. The raw per-CPU data lives in"," ",e.jsx("code",{className:"code-inline",children:"/proc/cpuinfo"})," and includes the full feature flag list — critical for verifying virtualisation support and hardware-accelerated cryptography availability."]}),e.jsx(s,{language:"bash",title:"CPU feature flag reference",code:`# Full topology overview
lscpu
# Architecture:        x86_64
# CPU(s):              32
# Thread(s) per core:  2        ← HyperThreading enabled
# Core(s) per socket:  8
# Socket(s):           2
# NUMA node(s):        2
# NUMA node0 CPU(s):   0-7,16-23
# NUMA node1 CPU(s):   8-15,24-31
# CPU MHz:             3400.000
# CPU max MHz:         5000.0000

# Check for virtualisation support:
grep -m1 "vmx|svm" /proc/cpuinfo | grep -o "vmx|svm"
# vmx = Intel VT-x (hardware virtualisation)
# svm = AMD-V (hardware virtualisation)

# Key CPU flags to know:
# vmx/svm  → hardware virtualisation (KVM/QEMU requires this)
# sse4_2   → SSE 4.2 SIMD instructions (needed by many databases)
# avx/avx2 → Advanced Vector Extensions (machine learning, video encoding)
# avx512f  → AVX-512 Foundation (heavy numerical compute)
# aes      → AES-NI hardware encryption acceleration
# sha_ni   → SHA hardware acceleration
# rdrand   → Hardware random number generator
# tsc_deadline_timer → accurate timer for KVM guests
# x2apic   → Extended APIC for >256 CPU systems

# Check NUMA topology:
lscpu --extended
numactl --hardware

# Per-CPU info including all flags (very long):
cat /proc/cpuinfo`}),e.jsxs(t,{type:"tip",title:"Checking Virtualisation Support Before KVM Install",children:["Before installing KVM/libvirt, always verify hardware virtualisation is available and enabled in BIOS: ",e.jsx("code",{className:"code-inline",children:'grep -E "vmx|svm" /proc/cpuinfo'}),". If the output is empty, virtualisation is either disabled in BIOS (Intel VT-x / AMD-V setting) or the CPU does not support it. No output from this grep is a common exam trap."]}),e.jsx(i,{title:"CPU Information Reference",rows:T})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Memory Hardware Diagnostics"}),e.jsxs("p",{className:"section-body",children:["Memory hardware faults manifest as random crashes, bit flips in data, or correctable ECC errors silently logged by the EDAC (Error Detection And Correction) kernel subsystem. DMI tables describe the physical memory configuration; the kernel tracks ECC error counts in ",e.jsx("code",{className:"code-inline",children:"/sys/devices/system/edac/"}),"."]}),e.jsx(s,{language:"bash",title:"Memory hardware inspection",code:`# Physical memory layout from BIOS: slots, sizes, speeds, types
dmidecode -t 17 | grep -E "Locator|Size|Speed|Type|Manufacturer"
# Locator: DIMM_A1          Speed: 3200 MT/s
# Size: 32 GB               Type: DDR4
# Manufacturer: Samsung

# Count installed vs total DIMM slots
dmidecode -t 17 | grep "Size:" | sort | uniq -c
#  2 Size: 32 GB
#  6 Size: No Module Installed    ← 6 empty slots

# EDAC (ECC) error monitoring via sysfs
ls /sys/devices/system/edac/mc/
# mc0/  (memory controller 0)

# Check correctable (CE) and uncorrectable (UE) error counts
cat /sys/devices/system/edac/mc/mc0/ce_count      # correctable errors total
cat /sys/devices/system/edac/mc/mc0/ue_count      # uncorrectable errors total
cat /sys/devices/system/edac/mc/mc0/csrow0/ce_count  # per-DIMM correctable errors

# EDAC errors also appear in dmesg and journal
dmesg | grep -i "edac|mce|DIMM|corrected"
journalctl -k | grep -i "edac|memory error"

# Machine Check Exceptions (MCE) — hardware error events
dmesg | grep -i "mce:"
mcelog   # decode MCE log if mcelog daemon is installed
# Or use rasdaemon (preferred on RHEL 9):
systemctl status rasdaemon
ras-mc-ctl --summary`}),e.jsxs(t,{type:"warning",title:"ECC vs Non-ECC Memory Errors",children:["ECC memory corrects single-bit errors silently and reports them via EDAC.",e.jsx("em",{children:"Correctable errors (CE)"})," in small numbers are normal but a rapidly increasing CE count indicates a failing DIMM that will eventually produce an uncorrectable error.",e.jsx("em",{children:"Uncorrectable errors (UE)"}),' cause immediate kernel panic with a "Machine Check Exception" — any UE count greater than zero requires immediate DIMM replacement.']})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Device Driver Diagnostics and Management"}),e.jsxs("p",{className:"section-body",children:["Kernel modules (drivers) are loaded automatically by udev when a matching device is detected. Driver issues commonly manifest as devices present in"," ",e.jsx("code",{className:"code-inline",children:"lspci"})," but non-functional, error messages in",e.jsx("code",{className:"code-inline",children:"dmesg"})," at boot, or unwanted drivers binding to devices (requiring blacklisting)."]}),e.jsx(s,{language:"bash",title:"Driver loading, unloading, and blacklisting",code:`# Check what module is bound to a PCI device
lspci -k -s 0000:02:00.0
# Kernel driver in use: e1000e
# Kernel modules: e1000e

# Load a module manually
modprobe e1000e

# Show module info: parameters, dependencies, aliases
modinfo e1000e
modinfo -F parm e1000e    # just show parameters

# Load module with a parameter
modprobe e1000e InterruptThrottleRate=3000

# Make module parameter persistent:
echo "options e1000e InterruptThrottleRate=3000" > /etc/modprobe.d/e1000e.conf

# Unload a module (fails if in use)
modprobe -r e1000e

# BLACKLISTING — prevent a module from loading automatically
# Example: prevent the open-source nouveau driver so Nvidia's binary driver can load
echo "blacklist nouveau" > /etc/modprobe.d/blacklist-nouveau.conf
echo "options nouveau modeset=0" >> /etc/modprobe.d/blacklist-nouveau.conf
# Regenerate initramfs to apply at boot:
dracut --force

# Load modules at boot (persistent):
echo "e1000e" > /etc/modules-load.d/e1000e.conf

# Verify module is loaded:
lsmod | grep e1000e

# Find module by PCI vendor:device ID:
modprobe --resolve-alias 'pci:v00008086d00001521*'

# Force a device to rebind to a different driver:
echo 0000:02:00.0 > /sys/bus/pci/drivers/e1000e/unbind
echo 0000:02:00.0 > /sys/bus/pci/drivers/igb/bind`}),e.jsxs(t,{type:"exam",title:"Exam Tip: Persistent Module Loading",children:[e.jsx("code",{className:"code-inline",children:"modprobe"})," changes are runtime-only. For persistence: module load → ",e.jsx("code",{className:"code-inline",children:"/etc/modules-load.d/module.conf"}),". Module parameters → ",e.jsx("code",{className:"code-inline",children:"/etc/modprobe.d/module.conf"}),". Blacklist → ",e.jsx("code",{className:"code-inline",children:"/etc/modprobe.d/blacklist.conf"}),". After blacklisting, always rebuild initramfs with"," ",e.jsx("code",{className:"code-inline",children:"dracut --force"})," so the change takes effect at boot."]}),e.jsx(i,{title:"Driver Management Reference",rows:A})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"IPMI / BMC Out-of-Band Diagnostics"}),e.jsx("p",{className:"section-body",children:"IPMI (Intelligent Platform Management Interface) is a standardised interface to the BMC (Baseboard Management Controller) — a dedicated microcontroller on server motherboards that operates independently of the main CPU and OS. It provides out-of-band access to sensors, power control, and the System Event Log (SEL) even when the server is off or the OS has crashed."}),e.jsx(s,{language:"bash",title:"ipmitool — local and remote diagnostics",code:`# Local access (requires ipmi_devintf kernel module loaded):
modprobe ipmi_devintf ipmi_si
ipmitool chassis status
# System Power         : on
# Power Overload       : false
# Chassis Intrusion    : inactive
# Front-Panel Lockout  : inactive

# Sensor readings — all sensors (temperature, fan speed, voltage, power)
ipmitool sensor list | column -t

# Filter to temperature sensors only
ipmitool sensor list | grep -i temp

# System Event Log — hardware fault history (most important for diagnosis)
ipmitool sel list
# 1 | 01/10/2025 | 14:22:33 | Memory | Correctable ECC | Asserted
# 2 | 01/10/2025 | 14:22:45 | Processor | IERR | Asserted
# Common SEL events: ECC errors, fan failures, voltage out of range, POST errors

# Detailed SEL info
ipmitool sel elist    # extended list with sensor name

# Field Replaceable Unit inventory (serial numbers, part numbers)
ipmitool fru list

# BMC firmware version
ipmitool mc info

# Remote access over network (IPMI v2.0 / RMCP+):
ipmitool -I lanplus -H 10.0.0.100 -U admin -P password sensor list
ipmitool -I lanplus -H 10.0.0.100 -U admin -P password sel list
ipmitool -I lanplus -H 10.0.0.100 -U admin -P password chassis status

# Configure BMC network interface:
ipmitool lan set 1 ipsrc static
ipmitool lan set 1 ipaddr 10.0.0.100
ipmitool lan set 1 netmask 255.255.255.0`}),e.jsxs(t,{type:"info",title:"IPMI / BMC Setup on RHEL 9",children:["Install: ",e.jsx("code",{className:"code-inline",children:"dnf install -y ipmitool OpenIPMI"}),". Load modules: ",e.jsx("code",{className:"code-inline",children:"modprobe ipmi_devintf ipmi_si"}),". Enable persistent loading:"," ",e.jsxs("code",{className:"code-inline",children:['echo -e "ipmi_devintf\\nipmi_si" ',">"," /etc/modules-load.d/ipmi.conf"]}),". Enable the service:"," ",e.jsx("code",{className:"code-inline",children:"systemctl enable --now ipmi"}),". You may also use ",e.jsx("code",{className:"code-inline",children:"ipmitool"})," without the service if the ",e.jsx("code",{className:"code-inline",children:"ipmi_devintf"})," module is loaded."]}),e.jsx(i,{title:"ipmitool Reference",rows:M})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"IRQ and Interrupt Management"}),e.jsxs("p",{className:"section-body",children:["Hardware devices signal the CPU using interrupts (IRQs). The"," ",e.jsx("code",{className:"code-inline",children:"/proc/interrupts"})," file shows the interrupt vector table with per-CPU hit counts, making it easy to identify which CPUs are handling which devices. On multi-CPU systems, concentrating high-rate interrupts on a single CPU causes latency; spreading them with IRQ affinity tuning improves throughput."]}),e.jsx(s,{language:"bash",title:"Inspecting and tuning IRQ affinity",code:`# View the interrupt table (one row per IRQ, columns = CPUs)
cat /proc/interrupts
#            CPU0   CPU1   CPU2   CPU3
#  16:    410523  12344   9871   8821   PCI-MSI 524288-edge    xhci_hcd
#  19:  14821034  14532  14821  14323   PCI-MSI 32768-edge     ahci
# 120:         0  98432       0      0  PCI-MSI 3145728-edge   eno1

# A high count concentrated on CPU0 for eno1 suggests an affinity issue

# IRQ affinity is stored as a hex bitmask — each bit = one CPU
# CPU 0 = bit 0 = 0x01, CPU 1 = bit 1 = 0x02, CPUs 0+1 = 0x03, all 4 CPUs = 0x0f

# Check current affinity for IRQ 120
cat /proc/irq/120/smp_affinity        # e.g. 01 = CPU0 only
cat /proc/irq/120/smp_affinity_list   # human-readable: "0" or "2-3"

# Set IRQ 120 to CPU 2 (bitmask 0x04 = binary 0100 = CPU 2)
echo 4 > /proc/irq/120/smp_affinity

# Set IRQ 120 to CPUs 2 and 3 (bitmask 0x0c = binary 1100)
echo c > /proc/irq/120/smp_affinity

# Use the list format instead:
echo "2-3" > /proc/irq/120/smp_affinity_list

# Watch interrupts update in real time
watch -n1 cat /proc/interrupts

# irqbalance daemon automatically distributes IRQs
systemctl status irqbalance
# Hint file to exclude specific CPUs from irqbalance distribution:
echo "IRQBALANCE_BANNED_CPUS=0xf0" >> /etc/sysconfig/irqbalance
systemctl restart irqbalance`}),e.jsx(i,{title:"IRQ and Interrupt Reference",rows:L})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Thermal and Power Monitoring"}),e.jsxs("p",{className:"section-body",children:["Excessive CPU temperatures trigger thermal throttling — the kernel automatically reduces CPU frequency to prevent damage, causing unexplained performance degradation. Fan failures and inadequate cooling in data centres are common causes of thermal issues. Linux exposes thermal data via"," ",e.jsx("code",{className:"code-inline",children:"/sys/class/thermal/"})," and hardware monitoring chips via the ",e.jsx("code",{className:"code-inline",children:"lm-sensors"})," package."]}),e.jsx(s,{language:"bash",title:"Thermal monitoring and throttle detection",code:`# Install and configure lm-sensors
dnf install -y lm_sensors
sensors-detect   # auto-detect hardware monitoring chips (run once)
systemctl enable --now lm_sensors

# Read current temperatures, fan speeds, and voltages
sensors
# coretemp-isa-0000
# Adapter: ISA adapter
# Package id 0:  +48.0°C  (high = +80.0°C, crit = +100.0°C)
# Core 0:        +45.0°C  (high = +80.0°C, crit = +100.0°C)
# Core 1:        +48.0°C
# ...
# nct6775-isa-0290
# CPU Fan:      1200 RPM  (min =  600 RPM)

# Direct sysfs thermal access (no lm-sensors needed):
for zone in /sys/class/thermal/thermal_zone*/; do
  type=$(cat $zone/type)
  temp=$(cat $zone/temp)
  echo "$type: $(( temp / 1000 ))°C"
done

# Check for thermal throttling in kernel log:
dmesg -T | grep -i "throttl|thermal|temp|overheat"
journalctl -k | grep -i "throttl|thermal"

# CPU frequency scaling (check if throttled):
cpupower frequency-info
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq   # in kHz

# Power consumption analysis:
powertop               # interactive ncurses TUI
powerstat -R 1 30      # 30 samples every 1 second (tabular output)
turbostat              # per-CPU C-states, P-states, temperature, power`}),e.jsxs(t,{type:"warning",title:"Thermal Throttling and Performance Issues",children:["If an application suddenly runs much slower at a predictable time of day (often peak load when ambient temperature is highest), check for thermal throttling.",e.jsx("code",{className:"code-inline",children:"dmesg | grep -i throttl"})," and the current CPU frequency via ",e.jsx("code",{className:"code-inline",children:"cpupower frequency-info"})," should confirm it. Solutions: clean dust filters, check fan RPMs via"," ",e.jsx("code",{className:"code-inline",children:"ipmitool sensor list"}),", verify cooling infrastructure, and check BIOS thermal management settings."]}),e.jsx(i,{title:"Thermal and Power Reference",rows:U})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Hardware Failure Investigation Workflow"}),e.jsx("p",{className:"section-body",children:"Follow this systematic approach when investigating suspected hardware failures — from initial symptom to root cause identification."}),e.jsx(d,{title:"Hardware Failure Investigation Flow",steps:_})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Complete Command Reference"}),e.jsx(i,{title:"Hardware Diagnostics — Full Command Reference",rows:O})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Exam Tips"}),e.jsx(t,{type:"exam",title:"PCI and Driver Exam Scenarios",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Device present but not working:"})," ",e.jsx("code",{className:"code-inline",children:"lspci -k"}),' — no "Kernel driver in use" line → ',e.jsx("code",{className:"code-inline",children:"modprobe <module>"}),"."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Make module persistent:"})," ",e.jsxs("code",{className:"code-inline",children:["echo module ",">"," /etc/modules-load.d/module.conf"]})," — not just modprobe."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Blacklist a driver:"})," Write to ",e.jsx("code",{className:"code-inline",children:"/etc/modprobe.d/blacklist.conf"}),", then ",e.jsx("code",{className:"code-inline",children:"dracut --force"})," to rebuild initramfs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Find correct driver for unknown device:"})," ",e.jsx("code",{className:"code-inline",children:"lspci -nn"})," gives [vendor:device], then search modinfo aliases."]})]})}),e.jsx(t,{type:"exam",title:"SMART Disk Diagnostics — What to Know",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"smartctl -H /dev/sdX"})," — PASSED/FAILED status. This is the first check."]}),e.jsx("li",{children:"Attributes 5, 187, 197, 198 with non-zero RAW_VALUE → recommend drive replacement in your answer."}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"smartctl -t short /dev/sdX"})," starts a test; ",e.jsx("code",{className:"code-inline",children:"smartctl -l selftest"})," reads results."]}),e.jsxs("li",{children:["Enable automated monitoring: configure ",e.jsx("code",{className:"code-inline",children:"/etc/smartd.conf"})," and ",e.jsx("code",{className:"code-inline",children:"systemctl enable --now smartd"}),"."]})]})}),e.jsx(t,{type:"exam",title:"IPMI / Hardware Fault Investigation",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"ipmitool sel list"})," is the first command to run for any unexplained hardware issue — it gives a timestamped hardware event history."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"ipmitool sensor list | grep -i temp"})," — check for temperature threshold crossings."]}),e.jsxs("li",{children:["IPMI works out-of-band — you can access it even when the OS is down (",e.jsx("code",{className:"code-inline",children:"-I lanplus -H BMC_IP"}),")."]}),e.jsxs("li",{children:["Load modules for local IPMI access: ",e.jsx("code",{className:"code-inline",children:"modprobe ipmi_devintf ipmi_si"}),"."]})]})}),e.jsx(t,{type:"exam",title:"udev Rules — Quick Reference",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:["Get attributes for rule writing: ",e.jsx("code",{className:"code-inline",children:"udevadm info -a /dev/sdX"})," (use ATTRS for USB — matches parent)."]}),e.jsxs("li",{children:["Test rules without reboot: ",e.jsx("code",{className:"code-inline",children:"udevadm test $(udevadm info -q path /dev/sdX)"}),"."]}),e.jsxs("li",{children:["Apply rules: ",e.jsx("code",{className:"code-inline",children:"udevadm control --reload && udevadm trigger"}),"."]}),e.jsxs("li",{children:["Rules files go in ",e.jsx("code",{className:"code-inline",children:"/etc/udev/rules.d/"})," with numeric prefix (higher number = later, wins on conflicts)."]})]})}),e.jsxs(t,{type:"tip",title:"dmesg First, Always",children:["For any hardware problem, ",e.jsx("code",{className:"code-inline",children:"dmesg -T | tail -50"})," and"," ",e.jsx("code",{className:"code-inline",children:'dmesg -T | grep -iE "error|fail|warn|ata|usb|pcie"'})," ","should always be your first commands. The kernel logs driver probe failures, I/O errors, thermal events, MCE hardware errors, and USB disconnect events with precise timestamps that pinpoint when a hardware failure started."]})]})]})}export{H as A,q as H,G as P};
