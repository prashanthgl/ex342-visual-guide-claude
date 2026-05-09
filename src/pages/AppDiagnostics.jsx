// AppDiagnostics.jsx — Application-level diagnostics: strace, ltrace, lsof,
// /proc, GDB, core dumps, sosreport, SystemTap, bpftrace, and library issues.
import { Bug } from 'lucide-react'
import PageHeader   from '../components/PageHeader'
import InfoBox      from '../components/InfoBox'
import CodeBlock    from '../components/CodeBlock'
import CommandTable from '../components/CommandTable'
import FlowDiagram  from '../components/FlowDiagram'

// ─── strace flag reference ────────────────────────────────────────────────────
const STRACE_FLAGS = [
  { cmd: 'strace command', desc: 'Launch command under strace — traces every syscall from exec', note: 'strace ls /etc' },
  { cmd: 'strace -p PID', desc: 'Attach to an already-running process by PID', note: 'strace -p 1234' },
  { cmd: '-e trace=file', desc: 'Filter: only file-related calls (open, read, write, stat…)', note: '-e trace=file,network' },
  { cmd: '-e trace=network', desc: 'Filter: only network calls (connect, bind, sendto, recvfrom…)', note: 'Combine with file: -e trace=file,network' },
  { cmd: '-e trace=process', desc: 'Filter: process lifecycle calls (fork, exec, wait, exit)', note: 'Useful for startup tracing' },
  { cmd: '-e trace=signal', desc: 'Filter: signal delivery and handling (kill, sigaction)', note: 'Diagnose signal-related hangs' },
  { cmd: '-c', desc: 'Summary mode — count calls, time, and errors. Print table on exit', note: 'Great for profiling hot paths' },
  { cmd: '-f', desc: 'Follow forks — trace child processes spawned during the run', note: 'Essential for multi-process apps' },
  { cmd: '-ff -o file', desc: 'Follow forks, write each PID\'s trace to file.PID separately', note: '-ff -o /tmp/trace' },
  { cmd: '-o file', desc: 'Write trace output to a file instead of stderr', note: '-o /tmp/app.trace' },
  { cmd: '-s 256', desc: 'Set max string length to display (default is 32 — too short!)', note: 'Increase to see full paths' },
  { cmd: '-T', desc: 'Print time spent inside each syscall in microseconds', note: 'Identifies slow I/O calls' },
  { cmd: '-t / -tt / -ttt', desc: 'Prepend wall-clock time / microseconds / epoch seconds to each line', note: '-tt for sub-second timestamps' },
  { cmd: '-v', desc: 'Verbose: print all fields of stat, termios, and similar structs', note: 'Use to inspect full stat output' },
  { cmd: '-x', desc: 'Print all non-ASCII strings in hex', note: 'Useful for binary protocol debugging' },
  { cmd: '-y', desc: 'Resolve file descriptor numbers to paths where possible', note: 'Makes fd output readable' },
  { cmd: '-z', desc: 'Print only successful calls (return value != -1)', note: 'Filter out error noise' },
  { cmd: '-Z', desc: 'Print only failed calls', note: 'Quickly find all errors' },
]

// ─── ltrace flag reference ────────────────────────────────────────────────────
const LTRACE_ROWS = [
  { cmd: 'ltrace command', desc: 'Trace all library calls made by command', note: 'ltrace /usr/bin/myapp' },
  { cmd: 'ltrace -p PID', desc: 'Attach to a running process', note: 'Root required for foreign PIDs' },
  { cmd: '-l libname', desc: 'Only trace calls from the specified library', note: '-l libssl.so' },
  { cmd: '-e func', desc: 'Trace only the named function(s)', note: '-e malloc+free' },
  { cmd: '-c', desc: 'Print a summary count of library calls on exit', note: 'Like strace -c but for libs' },
  { cmd: '-f', desc: 'Follow child processes (fork)', note: 'Multi-process apps' },
  { cmd: '-o file', desc: 'Write output to file', note: '-o /tmp/ltrace.out' },
  { cmd: '-S', desc: 'Also show syscalls (combines ltrace + strace output)', note: 'Verbose, but very informative' },
]

// ─── lsof reference ──────────────────────────────────────────────────────────
const LSOF_ROWS = [
  { cmd: 'lsof -p PID', desc: 'All files opened by the given process ID', note: 'lsof -p 1234' },
  { cmd: 'lsof -u username', desc: 'All files opened by a specific user', note: 'lsof -u apache' },
  { cmd: 'lsof -i :port', desc: 'Which process is listening on a TCP/UDP port', note: 'lsof -i :8080' },
  { cmd: 'lsof -i tcp', desc: 'All open TCP connections system-wide', note: 'Combine: -i tcp:443' },
  { cmd: 'lsof -i @host:port', desc: 'Connections to a specific remote host and port', note: 'lsof -i @db.local:5432' },
  { cmd: 'lsof +D /path', desc: 'All processes using files under a directory (recursive)', note: 'Use before unmount: lsof +D /mnt' },
  { cmd: 'lsof /path/file', desc: 'Which processes have a specific file open', note: 'lsof /var/log/app.log' },
  { cmd: 'lsof -n -P', desc: 'Disable hostname and port name resolution (much faster)', note: 'Always use -nP for speed' },
  { cmd: 'lsof | grep deleted', desc: 'Find deleted files still held open (eating disk space)', note: 'See disk recovery section' },
  { cmd: 'lsof -d fd', desc: 'Show open file descriptors — filter by FD type', note: 'lsof -d 0-2 (stdin/out/err)' },
]

// ─── /proc PID reference ─────────────────────────────────────────────────────
const PROC_ROWS = [
  { cmd: '/proc/PID/cmdline', desc: 'Full command line of the process (null-byte separated)', note: 'tr "\\0" " " < /proc/1/cmdline' },
  { cmd: '/proc/PID/exe', desc: 'Symlink to the executable binary', note: 'readlink /proc/1/exe' },
  { cmd: '/proc/PID/cwd', desc: 'Symlink to the process\'s current working directory', note: 'readlink /proc/1234/cwd' },
  { cmd: '/proc/PID/fd/', desc: 'Directory of symlinks — one per open file descriptor', note: 'ls -la /proc/1234/fd/' },
  { cmd: '/proc/PID/fdinfo/', desc: 'Detailed info per fd: position, flags, inode', note: 'cat /proc/1234/fdinfo/3' },
  { cmd: '/proc/PID/maps', desc: 'Memory map: virtual address ranges, permissions, mapped files', note: 'cat /proc/1234/maps' },
  { cmd: '/proc/PID/smaps', desc: 'Extended maps with per-region RSS, PSS, and swap usage', note: 'More detail than maps' },
  { cmd: '/proc/PID/status', desc: 'Human-readable process status: state, UID, memory, threads', note: 'cat /proc/1234/status' },
  { cmd: '/proc/PID/stat', desc: 'Machine-readable stat fields used by ps/top internally', note: 'Fields 14-17: CPU time' },
  { cmd: '/proc/PID/io', desc: 'I/O statistics: bytes read/written, syscall counts', note: 'cat /proc/1234/io' },
  { cmd: '/proc/PID/limits', desc: 'Current resource limits (ulimit values) for the process', note: 'RLIMIT_NOFILE, RLIMIT_CORE…' },
  { cmd: '/proc/PID/net/', desc: 'Network state visible to this process\'s network namespace', note: '/proc/PID/net/tcp6, /proc/PID/net/unix' },
  { cmd: '/proc/PID/environ', desc: 'Environment variables (null-byte separated)', note: 'tr "\\0" "\\n" < /proc/1234/environ' },
  { cmd: '/proc/PID/oom_score', desc: 'OOM killer score — higher = killed first under memory pressure', note: 'cat /proc/1234/oom_score' },
]

// ─── GDB reference ───────────────────────────────────────────────────────────
const GDB_ROWS = [
  { cmd: 'gdb -p PID', desc: 'Attach GDB to a running process (pauses it)', note: 'Requires ptrace permission' },
  { cmd: 'gdb binary core', desc: 'Load a core dump with the originating binary', note: 'gdb /usr/sbin/httpd core.1234' },
  { cmd: 'bt', desc: 'Print backtrace (call stack) of the current thread', note: 'Most important command in crash analysis' },
  { cmd: 'bt full', desc: 'Backtrace with local variables for every frame', note: 'Verbose but complete' },
  { cmd: 'info threads', desc: 'List all threads in the process', note: 'Shows thread IDs and current location' },
  { cmd: 'thread N', desc: 'Switch to thread N for inspection', note: 'thread 3 → then bt' },
  { cmd: 'frame N', desc: 'Select stack frame N for variable inspection', note: 'frame 0 = innermost' },
  { cmd: 'print var', desc: 'Print value of a variable in the current frame', note: 'print errno, print *ptr' },
  { cmd: 'info registers', desc: 'Dump CPU register values for current frame', note: 'Useful for crash at assembly level' },
  { cmd: 'list', desc: 'Show source code around current location (needs debuginfo)', note: 'Install debuginfo packages first' },
  { cmd: 'detach', desc: 'Detach from process without killing it', note: 'Process resumes normally' },
  { cmd: 'quit', desc: 'Exit GDB', note: 'q works too' },
]

// ─── core dump reference ─────────────────────────────────────────────────────
const COREDUMP_ROWS = [
  { cmd: 'ulimit -c unlimited', desc: 'Allow core dumps of unlimited size for the current shell', note: 'Shell-session only; add to /etc/security/limits.conf for persistence' },
  { cmd: '/proc/sys/kernel/core_pattern', desc: 'Kernel template for core dump filenames and location', note: 'Default: core or |/usr/lib/systemd/systemd-coredump' },
  { cmd: 'coredumpctl list', desc: 'List all core dumps recorded by systemd-coredump', note: 'Shows PID, timestamp, binary, signal' },
  { cmd: 'coredumpctl info PID', desc: 'Detailed metadata for a specific crash', note: 'Includes backtrace if debuginfo available' },
  { cmd: 'coredumpctl gdb PID', desc: 'Open core dump in GDB automatically', note: 'Best way to analyse systemd-managed crashes' },
  { cmd: 'coredumpctl dump -o core', desc: 'Extract the raw core dump file to disk', note: 'Then: gdb binary core' },
  { cmd: 'abrt-cli list', desc: 'List crashes detected by the ABRT daemon', note: 'ABRT = Automatic Bug Reporting Tool' },
  { cmd: 'abrt-cli info HASH', desc: 'Show detailed crash report for a problem hash', note: 'Includes bt, packages, SELinux context' },
  { cmd: '/var/spool/abrt/', desc: 'Directory containing ABRT crash directories', note: 'Each crash gets a subdirectory' },
]

// ─── sosreport reference ──────────────────────────────────────────────────────
const SOS_ROWS = [
  { cmd: 'sosreport', desc: 'Collect comprehensive system information into a tar.xz archive', note: 'Run as root; takes ~2-5 minutes' },
  { cmd: 'sosreport -o logs', desc: 'Include only the logs plugin (faster, narrower output)', note: 'Use -l to list available plugins' },
  { cmd: 'sosreport --batch', desc: 'Non-interactive mode — no prompts for name/case number', note: 'Good for scripted use' },
  { cmd: 'sosreport -z', desc: 'Use gzip compression instead of xz (faster but larger)', note: 'Useful when time is a constraint' },
  { cmd: 'sos collect', desc: 'Collect sosreports from multiple nodes in a cluster', note: 'For clustered / OpenShift environments' },
]

// ─── dynamic instrumentation ──────────────────────────────────────────────────
const DYNINST_ROWS = [
  { cmd: 'stap -e \'probe syscall.open { ... }\'', desc: 'SystemTap one-liner: run a probe on the open() syscall', note: 'Requires kernel-devel + systemtap packages' },
  { cmd: 'stap script.stp', desc: 'Run a SystemTap script file', note: '.stp scripts use C-like syntax' },
  { cmd: 'bpftrace -l \'tracepoint:syscalls:*\'', desc: 'List all available tracepoint probes', note: 'Requires kernel 4.9+ with BPF support' },
  { cmd: 'bpftrace -e \'tracepoint:syscalls:sys_enter_openat { printf("%s\\n", comm); }\'', desc: 'Print the process name on every openat() call', note: 'eBPF — no kernel module needed' },
  { cmd: 'bpftrace -e \'kprobe:do_sys_open { printf("%d %s\\n", pid, str(arg1)); }\'', desc: 'Trace kernel open function with PID and filename', note: '' },
]

// ─── library dependency reference ────────────────────────────────────────────
const LIB_ROWS = [
  { cmd: 'ldd /path/to/binary', desc: 'List all shared library dependencies and their resolved paths', note: 'ldd /usr/sbin/httpd' },
  { cmd: 'ldd -v binary', desc: 'Verbose: show full symbol version requirements', note: 'Reveals GLIBC version requirements' },
  { cmd: 'ldconfig', desc: 'Rebuild the shared library cache (/etc/ld.so.cache)', note: 'Run after installing libs in /usr/local/lib' },
  { cmd: 'ldconfig -p', desc: 'Print all cached library paths', note: 'ldconfig -p | grep libssl' },
  { cmd: 'ldconfig -v', desc: 'Verbose rebuild — shows which directories are scanned', note: 'Diagnose missing lib directories' },
  { cmd: '/etc/ld.so.conf', desc: 'Main config file listing library search directories', note: 'Include /etc/ld.so.conf.d/*.conf snippets' },
  { cmd: 'LD_LIBRARY_PATH=/path', desc: 'Override library search path at runtime (env var)', note: 'Do NOT use in prod — use ldconfig instead' },
  { cmd: 'LD_DEBUG=libs binary', desc: 'Print detailed library loading debug output at runtime', note: 'LD_DEBUG=all for maximum verbosity' },
  { cmd: 'objdump -p binary | grep NEEDED', desc: 'Low-level: list required shared objects from ELF header', note: 'Does not resolve paths like ldd does' },
  { cmd: 'readelf -d binary | grep NEEDED', desc: 'Alternative to objdump for listing ELF dependencies', note: 'readelf -d /usr/bin/ls' },
]

// ─── combined command table ───────────────────────────────────────────────────
const ALL_CMDS = [
  // strace
  { cmd: 'strace -p PID',             desc: 'Attach strace to a running process',                    note: 'SIGSTOP while attached' },
  { cmd: 'strace -e trace=file cmd',  desc: 'Trace only file-related syscalls',                      note: 'open, read, write, stat…' },
  { cmd: 'strace -c cmd',             desc: 'Count syscalls and print summary table',                 note: 'Shows slowest calls' },
  { cmd: 'strace -f -o out.txt cmd',  desc: 'Follow forks and write to file',                        note: 'Use -ff for per-PID files' },
  { cmd: 'strace -s 256 -y -Z cmd',   desc: 'Long strings + fd→path + only failed calls',            note: 'Best all-purpose debug combo' },
  // ltrace
  { cmd: 'ltrace -p PID',             desc: 'Attach ltrace to running process (library calls)',       note: 'Complements strace' },
  { cmd: 'ltrace -e malloc+free cmd', desc: 'Trace only malloc/free library calls',                  note: 'Memory leak hunting' },
  // lsof
  { cmd: 'lsof -p PID',              desc: 'All open files for a process',                           note: '' },
  { cmd: 'lsof -i :8080',            desc: 'Process listening on port 8080',                         note: '' },
  { cmd: 'lsof +D /var/run',         desc: 'All processes with files under a directory',             note: 'Pre-unmount check' },
  { cmd: 'lsof | grep deleted',      desc: 'Files deleted but still held open',                      note: 'Disk space recovery' },
  // /proc
  { cmd: 'cat /proc/PID/maps',       desc: 'Memory map of a process',                                note: '' },
  { cmd: 'ls -la /proc/PID/fd/',     desc: 'All open file descriptors with resolved paths',          note: '' },
  { cmd: 'cat /proc/PID/status',     desc: 'Human-readable process state and memory',                note: '' },
  // GDB
  { cmd: 'gdb -p PID',               desc: 'Attach GDB to live process',                             note: 'Then: bt, info threads' },
  { cmd: 'gdb binary core',          desc: 'Analyse core dump',                                      note: 'Install debuginfo first' },
  { cmd: 'coredumpctl gdb PID',      desc: 'GDB session from systemd-coredump store',                note: 'Easiest core dump workflow' },
  // core dumps
  { cmd: 'coredumpctl list',         desc: 'List all recorded crash dumps',                          note: '' },
  { cmd: 'ulimit -c unlimited',      desc: 'Enable core dumps for current shell session',            note: '' },
  // abrt
  { cmd: 'abrt-cli list',            desc: 'List crashes detected by ABRT',                          note: '/var/spool/abrt/' },
  // sosreport
  { cmd: 'sosreport',                desc: 'Collect full system diagnostic tarball',                  note: 'Run as root' },
  // library
  { cmd: 'ldd /path/binary',         desc: 'List shared library dependencies',                       note: 'Check for "not found"' },
  { cmd: 'ldconfig',                 desc: 'Rebuild shared library cache',                            note: 'After adding libs' },
  { cmd: 'LD_DEBUG=libs binary',     desc: 'Debug library load process at runtime',                  note: '' },
]

// ─── crash investigation flow ────────────────────────────────────────────────
const CRASH_FLOW = [
  {
    label: 'Application crash / misbehaviour reported',
    sub: 'Gather: PID, binary path, any error messages seen by users.',
    color: 'red',
  },
  {
    label: 'Check systemd journal for crash messages',
    sub: 'journalctl -u servicename -n 100 --no-pager  |  journalctl _PID=1234',
    color: 'yellow',
  },
  {
    label: 'Attach strace / re-run under strace',
    sub: 'strace -f -s 256 -y -Z -o /tmp/trace.txt /path/to/binary\nLook for ENOENT (missing files), EACCES (permission), ECONNREFUSED (network).',
    color: 'blue',
  },
  {
    label: 'Use lsof to inspect open resources',
    sub: 'lsof -p PID  →  check for missing files, unexpected sockets, deleted inodes still held open.',
    color: 'blue',
  },
  {
    label: 'Inspect /proc/PID for deep process state',
    sub: '/proc/PID/maps  (memory layout),  /proc/PID/limits  (resource caps),  /proc/PID/environ  (env vars)',
    color: 'purple',
  },
  {
    label: 'Collect and analyse core dump with GDB',
    sub: 'coredumpctl gdb PID  →  bt full  →  info threads  →  thread N  →  bt',
    color: 'yellow',
  },
  {
    label: 'Verify library dependencies',
    sub: 'ldd binary  →  look for "not found".  ldconfig -v  →  check paths.  LD_DEBUG=libs binary for runtime detail.',
    color: 'green',
  },
  {
    label: 'Escalate with sosreport if needed',
    sub: 'sosreport — creates a tarball for Red Hat support that includes journal, sysctl, loaded modules, and more.',
    color: 'default',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function AppDiagnostics() {
  return (
    <div className="space-y-12">

      <PageHeader
        icon={Bug}
        title="Application Diagnostics"
        subtitle="Diagnose misbehaving applications using system call tracing, library tracing, open-file inspection, /proc deep-dives, GDB core dump analysis, and dynamic instrumentation. These techniques work on any ELF binary without source code."
        tags={['strace', 'ltrace', 'lsof', '/proc', 'GDB', 'coredump', 'sosreport', 'bpftrace']}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          1. SYSTEM CALL TRACING WITH STRACE
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">System Call Tracing with strace</h2>
        <p className="section-body">
          Every interaction a user-space process has with the kernel — opening files, creating
          sockets, allocating memory, spawning children — happens through a <em>system call</em>.
          <code className="code-inline">strace</code> intercepts every syscall made by a process
          (using the <code className="code-inline">ptrace()</code> mechanism) and prints the call
          name, arguments, return value, and optionally timing information. No source code or
          special build flags are required; strace works on any compiled binary.
        </p>

        <div className="mt-4 rounded-xl border border-border bg-surface-1 p-5">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Anatomy of strace output
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs font-mono">
            {[
              { part: 'openat', color: 'text-token-fn',      label: 'syscall name' },
              { part: '(AT_FDCWD, "/etc/app.conf", O_RDONLY)', color: 'text-token-string', label: 'arguments' },
              { part: '=',      color: 'text-gray-400',      label: 'separator' },
              { part: '-1',     color: 'text-token-keyword', label: 'return value' },
              { part: 'ENOENT (No such file or directory)', color: 'text-yellow-300', label: 'error name + description' },
            ].map(({ part, color, label }) => (
              <div key={label} className="rounded-lg bg-surface-2 border border-border px-3 py-2 text-center">
                <div className={`font-bold ${color}`}>{part}</div>
                <div className="text-gray-500 text-[10px] mt-1">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            A return value of <code className="code-inline">-1</code> indicates an error. The
            errno name (e.g. <code className="code-inline">ENOENT</code>) tells you exactly what
            went wrong. A non-negative return is a success — for{' '}
            <code className="code-inline">open()</code>, it is the new file descriptor number.
          </p>
        </div>

        <h3 className="text-base font-semibold text-gray-200 mt-6 mb-2">Common invocations</h3>

        <CodeBlock
          language="bash"
          title="strace — attaching to a running process"
          code={`# Attach to PID 4521, show only failed calls, expand string length, resolve fd→path
strace -p 4521 -Z -s 256 -y

# Detach cleanly with Ctrl-C — process continues running`}
        />

        <CodeBlock
          language="bash"
          title="strace — diagnosing a service that can't find its config file"
          code={`# Run the binary under strace, filter to file ops, write to a file
strace -e trace=file -s 256 -o /tmp/myapp.trace /usr/bin/myapp

# In a second terminal, review the trace looking for ENOENT
grep ENOENT /tmp/myapp.trace

# Example output:
# openat(AT_FDCWD, "/etc/myapp/myapp.conf", O_RDONLY) = -1 ENOENT (No such file or directory)
# openat(AT_FDCWD, "/usr/share/myapp/myapp.conf", O_RDONLY) = -1 ENOENT (No such file or directory)
# The app is searching two locations — neither exists. Create the file in the first path.`}
        />

        <CodeBlock
          language="bash"
          title="strace — syscall count summary (profiling)"
          code={`# Run command and print a summary table of syscall counts, errors, and timing
strace -c ls /var/log

# % time     seconds  usecs/call     calls    errors syscall
# ------ ----------- ----------- --------- --------- ----------------
#  52.31    0.000423          21        20           getdents64
#  18.42    0.000149          14        11           openat
#  ...
#
# High time in read/write → I/O bound. High count in getdents → directory traversal.`}
        />

        <CodeBlock
          language="bash"
          title="strace — follow forks (multi-process application)"
          code={`# -f follows child processes; -ff writes per-PID trace files
strace -ff -s 256 -o /tmp/myapp /usr/sbin/httpd -DFOREGROUND

# Creates files: /tmp/myapp.12345  /tmp/myapp.12346  /tmp/myapp.12347 ...
# Inspect the worker that crashed:
grep 'SIGSEGV\|killed\|EACCES' /tmp/myapp.*`}
        />

        <InfoBox type="exam" title="Exam Tip: strace for SELinux vs Permission Errors">
          <code className="code-inline">strace</code> distinguishes between a DAC (file permission)
          failure and a system call that succeeded at the kernel level but was denied by SELinux.
          If you see <code className="code-inline">EACCES</code> in strace output, check both{' '}
          <code className="code-inline">ls -l</code> and{' '}
          <code className="code-inline">ausearch -m avc</code>. SELinux denials often appear as
          EACCES in strace even though the UNIX permissions look correct.
        </InfoBox>

        <h3 className="text-base font-semibold text-gray-200 mt-6 mb-2">
          Common strace error patterns to recognise
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { errno: 'ENOENT', meaning: 'No such file or directory', implication: 'Missing config, binary, or shared library. Check the path searched.' },
            { errno: 'EACCES', meaning: 'Permission denied', implication: 'DAC or SELinux denial. Check file mode bits and SELinux context.' },
            { errno: 'ECONNREFUSED', meaning: 'Connection refused', implication: 'Target port not listening. Service down or firewall blocking.' },
            { errno: 'ETIMEDOUT', meaning: 'Connection timed out', implication: 'Network unreachable or firewall silently dropping packets.' },
            { errno: 'EADDRINUSE', meaning: 'Address already in use', implication: 'Port conflict — another process owns the socket.' },
            { errno: 'ENOMEM', meaning: 'Out of memory', implication: 'malloc failed; system under memory pressure.' },
            { errno: 'EMFILE', meaning: 'Too many open files', implication: 'Process hit its RLIMIT_NOFILE. Increase via limits.conf.' },
            { errno: 'EAGAIN / EWOULDBLOCK', meaning: 'Try again (non-blocking I/O)', implication: 'Normally harmless; excessive counts indicate a tight busy-wait loop.' },
          ].map(({ errno, meaning, implication }) => (
            <div key={errno} className="rounded-lg border border-border bg-surface-1 px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <code className="text-xs font-mono font-bold text-token-keyword">{errno}</code>
                <span className="text-xs text-gray-400">— {meaning}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">{implication}</p>
            </div>
          ))}
        </div>

        <CommandTable title="strace Flag Reference" rows={STRACE_FLAGS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. LIBRARY CALL TRACING WITH LTRACE
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Library Call Tracing with ltrace</h2>
        <p className="section-body">
          While <code className="code-inline">strace</code> intercepts calls at the syscall boundary
          (kernel interface), <code className="code-inline">ltrace</code> intercepts calls at the
          shared library boundary — calls like <code className="code-inline">fopen()</code>,{' '}
          <code className="code-inline">malloc()</code>,{' '}
          <code className="code-inline">SSL_connect()</code>, and any function exported by a
          shared library. Use ltrace when the problem is in library logic rather than in a
          failed kernel operation.
        </p>

        <div className="rounded-xl border border-yellow-800/60 bg-yellow-950/20 p-4 my-4">
          <h3 className="text-sm font-semibold text-yellow-300 mb-2">strace vs ltrace — choosing the right tool</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-border bg-surface-2 p-3">
              <div className="font-bold text-blue-300 mb-1">strace</div>
              <ul className="space-y-1 text-gray-400 list-disc list-inside">
                <li>Intercepts at the kernel boundary</li>
                <li>Works on <em>all</em> processes including static binaries</li>
                <li>Uses <code className="code-inline">ptrace(PTRACE_SYSCALL)</code></li>
                <li>Best for: file I/O, network, process, signal issues</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-3">
              <div className="font-bold text-purple-300 mb-1">ltrace</div>
              <ul className="space-y-1 text-gray-400 list-disc list-inside">
                <li>Intercepts at the PLT (Procedure Linkage Table)</li>
                <li>Only works on dynamically-linked binaries</li>
                <li>Can show return values of library functions</li>
                <li>Best for: crypto errors, parsing failures, library bugs</li>
              </ul>
            </div>
          </div>
        </div>

        <CodeBlock
          language="bash"
          title="ltrace — trace SSL/TLS library calls"
          code={`# Trace only OpenSSL-related calls to diagnose TLS handshake failures
ltrace -l libssl.so -s 256 /usr/bin/curl https://example.com 2>&1 | head -40

# Trace malloc/free to find memory allocation patterns
ltrace -e 'malloc+free+realloc' -c /usr/bin/myapp`}
        />

        <CommandTable title="ltrace Flag Reference" rows={LTRACE_ROWS} />

        <InfoBox type="tip" title="ltrace and PIE Binaries">
          Modern RHEL 9 binaries are compiled as Position-Independent Executables (PIE). If ltrace
          shows no output or crashes immediately, the binary may use symbol interposition
          techniques that conflict with ltrace. In this case, fall back to strace with{' '}
          <code className="code-inline">-e trace=read,write</code> or use bpftrace uprobes for
          user-space function tracing.
        </InfoBox>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. LSOF — LIST OPEN FILES
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">lsof — List Open Files</h2>
        <p className="section-body">
          In Linux, <em>everything is a file</em> — regular files, directories, sockets,
          pipes, devices, and more are all represented as file descriptors. <code className="code-inline">lsof</code>{' '}
          (List Open Files) shows every file descriptor held by every process on the system,
          making it invaluable for diagnosing permission issues, port conflicts, resource leaks,
          and disk space problems caused by deleted-but-open files.
        </p>

        <CodeBlock
          language="bash"
          title="lsof — practical diagnostic examples"
          code={`# Show all open files for a specific process
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
# > /proc/4521/fd/10`}
        />

        <InfoBox type="exam" title="Exam Tip: Recovering Disk Space from Deleted Open Files">
          A very common exam scenario: a filesystem is full (100%), but you cannot find any large
          files. Run <code className="code-inline">lsof | grep deleted</code>. If a running process
          has a deleted file descriptor, the inode (and disk blocks) are retained until the fd is
          closed. Restart the process or truncate the fd via{' '}
          <code className="code-inline">{'>'} /proc/PID/fd/FD_NUM</code> to immediately free the
          space without stopping the service.
        </InfoBox>

        <CodeBlock
          language="bash"
          title="lsof — network-focused usage"
          code={`# All connections to a specific remote host on port 5432 (PostgreSQL)
lsof -i @10.0.0.5:5432 -n -P

# All UDP sockets system-wide
lsof -i udp -n -P

# Connections by a specific user (e.g., apache)
lsof -u apache -i -n -P

# lsof output columns explained:
# COMMAND  PID   USER   FD  TYPE  DEVICE  SIZE/OFF  NODE  NAME
# httpd    4521  apache 10u  REG   8,1    2048      1234  /var/log/httpd/error_log
# FD: 10u = fd 10, open for reading/writing (u=rw, r=read, w=write, cwd=CWD, txt=executable)`}
        />

        <CommandTable title="lsof Quick Reference" rows={LSOF_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. /PROC/[PID]/ DEEP DIVE
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">/proc/[pid]/ — Process Information Filesystem</h2>
        <p className="section-body">
          The <code className="code-inline">/proc</code> virtual filesystem exposes live kernel
          data structures as browsable files. Each running process gets its own directory at{' '}
          <code className="code-inline">/proc/PID/</code> containing dozens of files that reveal
          its memory layout, open file descriptors, environment, CPU and I/O statistics, and
          resource limits — all without requiring any special tools.
        </p>

        <CodeBlock
          language="bash"
          title="/proc/PID — essential inspection commands"
          code={`PID=4521

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
tr '\0' '\n' < /proc/$PID/environ | grep -E 'HOME|PATH|LD_'`}
        />

        <div className="rounded-xl border border-purple-800/60 bg-purple-950/20 p-4 my-4">
          <h3 className="text-sm font-semibold text-purple-300 mb-3">Reading /proc/PID/maps</h3>
          <div className="font-mono text-xs text-gray-300 bg-surface-2 rounded-lg p-3 overflow-x-auto">
            <div className="grid gap-1">
              {[
                { line: '55f1a2000000-55f1a2001000', perms: 'r--p', info: 'ELF header of binary (read-only)' },
                { line: '55f1a2001000-55f1a2010000', perms: 'r-xp', info: 'Text segment — executable code (read+execute, COW private)' },
                { line: '55f1a2010000-55f1a2012000', perms: 'r--p', info: 'Read-only data (.rodata)' },
                { line: '55f1a2013000-55f1a2014000', perms: 'rw-p', info: 'Writable data (.bss, .data)' },
                { line: '7f2a40000000-7f2a40200000', perms: 'rw-p', info: 'Heap (anonymous mmap)' },
                { line: '7ffc3ab00000-7ffc3ab21000', perms: 'rw-p', info: 'Stack (grows down)' },
              ].map(({ line, perms, info }) => (
                <div key={line} className="flex gap-3 items-start">
                  <span className="text-token-number flex-shrink-0">{line}</span>
                  <span className={`flex-shrink-0 ${perms.includes('x') ? 'text-token-keyword' : 'text-gray-400'}`}>{perms}</span>
                  <span className="text-gray-500">{info}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Permissions: <code className="code-inline">r</code>=read,{' '}
            <code className="code-inline">w</code>=write,{' '}
            <code className="code-inline">x</code>=execute,{' '}
            <code className="code-inline">p</code>=private (copy-on-write),{' '}
            <code className="code-inline">s</code>=shared. Unexpected <code className="code-inline">rwxp</code>{' '}
            anonymous mappings can indicate shellcode injection.
          </p>
        </div>

        <InfoBox type="tip" title="Quick FD Recovery Trick">
          If a process holds a file descriptor to a file that was deleted (e.g. a log rotator
          removed it), you can recover the file content via{' '}
          <code className="code-inline">cp /proc/PID/fd/N /tmp/recovered_file</code> — the kernel
          still has the data in memory even though the directory entry is gone.
        </InfoBox>

        <CommandTable title="/proc/PID Reference" rows={PROC_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. GDB BASICS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">GDB — GNU Debugger for System Engineers</h2>
        <p className="section-body">
          GDB (GNU Debugger) is the standard debugger for C/C++ programs on Linux. As a system
          engineer you will primarily use it to inspect crash sites via core dumps and to take
          a live backtrace from a hung or crashing process. You rarely need to step through code
          interactively — understanding <code className="code-inline">bt</code>,{' '}
          <code className="code-inline">info threads</code>, and{' '}
          <code className="code-inline">frame</code> takes you 90% of the way.
        </p>

        <InfoBox type="warning" title="Install debuginfo Packages First">
          Without debug symbols, GDB backtraces show only memory addresses (
          <code className="code-inline">??</code>) with no function names or line numbers.
          Install symbols with:{' '}
          <code className="code-inline">dnf debuginfo-install packagename</code> or{' '}
          <code className="code-inline">debuginfo-install -y packagename</code>. The
          debuginfo-install command requires the{' '}
          <code className="code-inline">rhel-debuginfo</code> repository to be enabled.
        </InfoBox>

        <CodeBlock
          language="bash"
          title="GDB — install debug symbols and attach to a running process"
          code={`# Install debug info for a running service
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
(gdb) quit`}
        />

        <CodeBlock
          language="bash"
          title="GDB — analysing a core dump"
          code={`# Core dump was left at /var/lib/systemd/coredump/core.myapp.1234
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
(gdb) x/16xb $rsp      # hexdump 16 bytes of the stack`}
        />

        <CommandTable title="GDB Command Reference" rows={GDB_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. CORE DUMP ANALYSIS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Core Dump Analysis</h2>
        <p className="section-body">
          A core dump is a snapshot of a process's memory at the moment of a fatal signal
          (SIGSEGV, SIGABRT, SIGFPE). It captures the full virtual address space, CPU register
          state, and open file descriptor list, enabling post-mortem debugging. On RHEL 9,
          <code className="code-inline">systemd-coredump</code> intercepts and stores core dumps
          automatically; older systems may use ABRT.
        </p>

        <CodeBlock
          language="bash"
          title="Enabling and verifying core dump collection"
          code={`# Check current core pattern — if it starts with | it goes to a helper
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
sysctl -p /etc/sysctl.d/50-coredump.conf`}
        />

        <CodeBlock
          language="bash"
          title="systemd-coredump — the recommended RHEL 9 workflow"
          code={`# List all recorded crash dumps
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
coredumpctl list /usr/bin/myapp`}
        />

        <CodeBlock
          language="bash"
          title="ABRT — Automatic Bug Reporting Tool"
          code={`# List problems detected by ABRT (daemon must be running)
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
systemctl enable --now abrtd abrt-ccpp`}
        />

        <InfoBox type="exam" title="Exam Tip: systemd-coredump vs ulimit">
          On RHEL 9 with the default <code className="code-inline">systemd-coredump</code> pipe
          pattern, <code className="code-inline">ulimit -c unlimited</code> has no effect —
          the kernel passes the core to systemd-coredump regardless of the shell limit.
          Use <code className="code-inline">coredumpctl list</code> to find recent crashes.
          Only change <code className="code-inline">core_pattern</code> and set the ulimit
          if the task specifically requires manual core files.
        </InfoBox>

        <CommandTable title="Core Dump Command Reference" rows={COREDUMP_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. SOSREPORT
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">sosreport — System Diagnostic Collector</h2>
        <p className="section-body">
          <code className="code-inline">sosreport</code> (now also called{' '}
          <code className="code-inline">sos report</code>) collects a comprehensive snapshot
          of a running system into a single compressed tarball. It gathers journal logs,
          sysctl values, RPM package list, network configuration, block device info, loaded
          kernel modules, SELinux policy, hardware info, and much more — everything Red Hat
          support needs to diagnose a problem remotely. For the exam, know how to run it and
          what it collects.
        </p>

        <CodeBlock
          language="bash"
          title="sosreport — running and locating output"
          code={`# Run a full sosreport (interactive: asks for name and case number)
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
# sys/                — /sys snapshots`}
        />

        <InfoBox type="info" title="What sosreport Collects">
          A typical sosreport tarball includes: full journal output, dmesg, running process list,
          network configuration, firewall rules, storage and LVM layout, loaded modules, kernel
          parameters, installed RPMs, SELinux status, and the output of over 500 diagnostic
          commands — all captured in a single reproducible snapshot in about 2-5 minutes.
        </InfoBox>

        <CommandTable title="sosreport Reference" rows={SOS_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. DYNAMIC INSTRUMENTATION
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Dynamic Instrumentation — SystemTap &amp; bpftrace</h2>
        <p className="section-body">
          For diagnostics that require kernel-level visibility without rebooting or recompiling
          kernels, Linux offers two primary dynamic instrumentation frameworks.{' '}
          <strong className="text-gray-200">SystemTap</strong> uses kernel modules (requires
          kernel-devel) and a C-like scripting language to probe kernel functions.{' '}
          <strong className="text-gray-200">bpftrace</strong> uses eBPF (extended Berkeley
          Packet Filter) — compiled to safe bytecode verified by the kernel — with a simpler
          awk-like syntax and no kernel module requirement.
        </p>

        <CodeBlock
          language="bash"
          title="bpftrace one-liners for application diagnostics"
          code={`# List all available syscall tracepoints
bpftrace -l 'tracepoint:syscalls:*'

# Trace every openat() call — print PID, process name, and filename
bpftrace -e 'tracepoint:syscalls:sys_enter_openat { printf("%d %-16s %s\n", pid, comm, str(args->filename)); }'

# Count syscalls by process name (hit Ctrl-C to print histogram)
bpftrace -e 'tracepoint:raw_syscalls:sys_enter { @[comm] = count(); }'

# Profile CPU usage by stack (flame graph data)
bpftrace -e 'profile:99 { @[comm, ustack] = count(); }'

# Trace slow read() calls (> 1ms) by process
bpftrace -e '
tracepoint:syscalls:sys_enter_read  { @start[tid] = nsecs; }
tracepoint:syscalls:sys_exit_read   /(@start[tid] > 0) && (nsecs - @start[tid]) > 1000000/
{ printf("PID %d %s read latency: %d ms\n", pid, comm, (nsecs - @start[tid]) / 1000000); delete(@start[tid]); }'`}
        />

        <CodeBlock
          language="bash"
          title="SystemTap basics"
          code={`# Probe all open() syscall entries — print PID and filename
stap -e 'probe syscall.open { printf("%d %s\\n", pid(), filename) }'

# Profile CPU time by function (requires kernel debuginfo)
stap -e 'probe kernel.function("*@net/socket.c").call { printf("%s\\n", probefunc()) }'

# Run a SystemTap script file
stap myscript.stp

# Install required packages:
dnf install -y systemtap systemtap-runtime kernel-devel-$(uname -r)
dnf debuginfo-install -y kernel`}
        />

        <CommandTable title="Dynamic Instrumentation Reference" rows={DYNINST_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. LIBRARY DEPENDENCY ISSUES
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Library Dependency Diagnostics</h2>
        <p className="section-body">
          "error while loading shared libraries: libfoo.so.1: cannot open shared object file"
          is one of the most common application errors on Linux. The dynamic linker
          (<code className="code-inline">ld.so</code>) searches a fixed set of directories at
          runtime; if the required library is missing or not in the search path, the binary
          refuses to start. Diagnosing and fixing these issues requires understanding the
          linker's search order.
        </p>

        <div className="rounded-xl border border-border bg-surface-1 p-5 my-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Dynamic linker search order
          </h3>
          <div className="space-y-2">
            {[
              { n: '1', label: 'RPATH in ELF header', desc: 'Hard-coded paths compiled into the binary (rare; bad practice)', color: 'text-yellow-300' },
              { n: '2', label: 'LD_LIBRARY_PATH', desc: 'Environment variable — overrides everything else (do NOT use in production)', color: 'text-red-300' },
              { n: '3', label: 'RUNPATH in ELF header', desc: 'Like RPATH but honoured after LD_LIBRARY_PATH', color: 'text-yellow-300' },
              { n: '4', label: '/etc/ld.so.cache', desc: 'Pre-built cache from ldconfig — the standard search mechanism', color: 'text-green-300' },
              { n: '5', label: '/lib64 and /usr/lib64', desc: 'Default system library directories (always searched last)', color: 'text-blue-300' },
            ].map(({ n, label, desc, color }) => (
              <div key={n} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-3 border border-border flex items-center justify-center text-xs font-bold text-gray-400">{n}</div>
                <div>
                  <span className={`text-sm font-semibold ${color}`}>{label}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CodeBlock
          language="bash"
          title="Diagnosing 'library not found' errors"
          code={`# Step 1: Check all library dependencies and their resolved paths
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
/usr/bin/myapp   # runtime-only fix — not persistent, not suitable for services`}
        />

        <InfoBox type="warning" title="Never Use LD_LIBRARY_PATH for Services">
          Setting <code className="code-inline">LD_LIBRARY_PATH</code> in a systemd unit file's
          <code className="code-inline">Environment=</code> is a common workaround but a bad
          practice — it can cause unexpected library version conflicts. The correct fix is to add
          the library directory to <code className="code-inline">/etc/ld.so.conf.d/</code> and
          run <code className="code-inline">ldconfig</code>. If the library came from an RPM,
          installing the package properly will handle this automatically.
        </InfoBox>

        <CommandTable title="Library Dependency Reference" rows={LIB_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. CRASH INVESTIGATION FLOW DIAGRAM
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Application Crash Investigation Workflow</h2>
        <p className="section-body">
          When an application crashes or misbehaves, follow this systematic workflow to
          move from symptom to root cause efficiently.
        </p>
        <FlowDiagram
          title="Application Crash Investigation Flow"
          steps={CRASH_FLOW}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          11. FULL COMMAND REFERENCE TABLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Complete Command Reference</h2>
        <CommandTable
          title="Application Diagnostics — Full Command Reference"
          rows={ALL_CMDS}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          12. EXAM TIPS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Exam Tips</h2>

        <InfoBox type="exam" title="Key strace Scenarios to Know">
          <ul className="space-y-1 mt-1">
            <li><strong>Missing config file:</strong> <code className="code-inline">strace -e trace=file -s 256 binary</code> → grep ENOENT. The first ENOENT path is usually the expected config location.</li>
            <li><strong>Port binding failure:</strong> <code className="code-inline">strace -e trace=network binary</code> → look for bind() returning EADDRINUSE or EACCES (for ports below 1024).</li>
            <li><strong>Library not found at runtime:</strong> <code className="code-inline">strace -e trace=file binary</code> → look for open() of .so file returning ENOENT.</li>
            <li><strong>Slow startup:</strong> <code className="code-inline">strace -T -c binary</code> → the summary table reveals which syscall is consuming the most time.</li>
          </ul>
        </InfoBox>

        <InfoBox type="exam" title="Core Dump Exam Scenarios">
          <ul className="space-y-1 mt-1">
            <li>Always run <code className="code-inline">coredumpctl list</code> first — it gives PID, signal, and binary immediately.</li>
            <li>Install debuginfo before loading core: <code className="code-inline">dnf debuginfo-install -y $(rpm -qf /usr/bin/binary)</code>.</li>
            <li>The most important GDB command sequence: <code className="code-inline">bt</code> → <code className="code-inline">info threads</code> → <code className="code-inline">thread N</code> → <code className="code-inline">bt full</code>.</li>
            <li>Signal 11 = SIGSEGV (segfault), Signal 6 = SIGABRT (abort/assert), Signal 4 = SIGILL (illegal instruction).</li>
          </ul>
        </InfoBox>

        <InfoBox type="exam" title="lsof Disk Space Recovery Pattern">
          If a filesystem shows 100% used but <code className="code-inline">du -sh /*</code>
          cannot account for the space, the answer is almost certainly deleted-but-open files.
          Run <code className="code-inline">lsof | grep deleted</code>, identify the PID and
          FD number, then truncate: <code className="code-inline">{'> /proc/PID/fd/FD'}</code>.
          This is a guaranteed exam scenario.
        </InfoBox>

        <InfoBox type="exam" title="sosreport for Exam Evidence">
          If the exam asks you to "collect system diagnostics for Red Hat support" or
          "generate a support bundle", the answer is <code className="code-inline">sosreport</code>.
          Run it as root, note the output path in{' '}
          <code className="code-inline">/var/tmp/</code>, and optionally verify the MD5
          checksum file alongside it.
        </InfoBox>

        <InfoBox type="tip" title="Process Inspection Quick Reference">
          <ul className="space-y-1 mt-1">
            <li><code className="code-inline">cat /proc/PID/cmdline | tr '\0' ' '</code> — full command line</li>
            <li><code className="code-inline">readlink /proc/PID/exe</code> — binary path (even if replaced)</li>
            <li><code className="code-inline">ls -la /proc/PID/fd/ | wc -l</code> — count open file descriptors</li>
            <li><code className="code-inline">cat /proc/PID/limits | grep 'open files'</code> — check fd limit</li>
            <li><code className="code-inline">cat /proc/PID/io</code> — I/O bytes (rchar, wchar, read_bytes, write_bytes)</li>
          </ul>
        </InfoBox>
      </section>

    </div>
  )
}
