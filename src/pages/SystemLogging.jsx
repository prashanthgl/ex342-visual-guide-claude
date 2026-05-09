import { FileText } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'
import FlowDiagram from '../components/FlowDiagram'
import CommandTable from '../components/CommandTable'

export default function SystemLogging() {
  return (
    <div>
      <PageHeader
        icon={FileText}
        title="System Logging"
        subtitle="Comprehensive coverage of journald, rsyslog, auditd, and log analysis tools for the EX342 exam. Logging is the first line of diagnosis for any system issue."
        tags={['journald', 'rsyslog', 'auditd', 'logrotate', 'ausearch', 'aureport']}
      />

      {/* ── 1. LOGGING ARCHITECTURE ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Logging Architecture Overview
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          Red Hat Enterprise Linux uses a layered logging architecture. The kernel writes messages to a ring buffer
          readable via <code className="text-token-string font-mono text-xs">dmesg</code>. Userspace processes write
          to the systemd journal (journald) via the journal socket or syslog. rsyslog reads from both sources and
          routes messages to files. auditd handles security audit events on a separate, privileged channel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="rounded-lg border border-blue-800 bg-blue-950/30 p-4">
            <h3 className="text-blue-300 font-semibold text-sm mb-2">Kernel Space</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="font-mono">printk() → ring buffer</li>
              <li className="font-mono">dmesg / /dev/kmsg</li>
              <li className="font-mono">audit netlink socket</li>
            </ul>
          </div>
          <div className="rounded-lg border border-yellow-800 bg-yellow-950/30 p-4">
            <h3 className="text-yellow-300 font-semibold text-sm mb-2">Userspace Daemons</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="font-mono">systemd-journald</li>
              <li className="font-mono">rsyslog (reads journal)</li>
              <li className="font-mono">auditd</li>
            </ul>
          </div>
          <div className="rounded-lg border border-green-800 bg-green-950/30 p-4">
            <h3 className="text-green-300 font-semibold text-sm mb-2">Log Destinations</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li className="font-mono">/var/log/journal/</li>
              <li className="font-mono">/var/log/messages</li>
              <li className="font-mono">/var/log/audit/audit.log</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface-1 p-4 text-xs font-mono text-gray-400">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="bg-blue-900/50 border border-blue-700 px-2 py-1 rounded text-blue-300">Kernel (printk)</span>
            <span className="text-rh-red">→</span>
            <span className="bg-surface-2 border border-border px-2 py-1 rounded">/dev/kmsg</span>
            <span className="text-rh-red">→</span>
            <span className="bg-yellow-900/50 border border-yellow-700 px-2 py-1 rounded text-yellow-300">journald</span>
            <span className="text-rh-red">→</span>
            <span className="bg-yellow-900/50 border border-yellow-700 px-2 py-1 rounded text-yellow-300">rsyslog</span>
            <span className="text-rh-red">→</span>
            <span className="bg-green-900/50 border border-green-700 px-2 py-1 rounded text-green-300">/var/log/*</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 items-center">
            <span className="bg-red-900/50 border border-red-700 px-2 py-1 rounded text-red-300">Kernel Audit</span>
            <span className="text-rh-red">→</span>
            <span className="bg-surface-2 border border-border px-2 py-1 rounded">netlink</span>
            <span className="text-rh-red">→</span>
            <span className="bg-red-900/50 border border-red-700 px-2 py-1 rounded text-red-300">auditd</span>
            <span className="text-rh-red">→</span>
            <span className="bg-green-900/50 border border-green-700 px-2 py-1 rounded text-green-300">/var/log/audit/audit.log</span>
          </div>
        </div>
      </section>

      {/* ── 2. JOURNALD ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          systemd-journald
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          <code className="text-token-string font-mono text-xs">systemd-journald</code> collects and stores structured
          log data. By default it stores logs in memory (<code className="font-mono text-xs text-token-string">/run/log/journal/</code>).
          Configuring persistent storage writes to <code className="font-mono text-xs text-token-string">/var/log/journal/</code>.
        </p>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">journald.conf Configuration</h3>
        <CodeBlock
          language="ini"
          title="/etc/systemd/journald.conf"
          code={`[Journal]
# Storage: auto (default) = persistent if /var/log/journal exists, else volatile
# volatile = RAM only (/run/log/journal/)
# persistent = disk always (/var/log/journal/)
# none = discard all
Storage=persistent

# Compress log data with LZ4 (recommended)
Compress=yes

# Maximum time to store entries from a single boot
MaxFileSec=1month

# Maximum disk space the journal can use on /var/log/journal
SystemMaxUse=500M

# Maximum disk space for /run/log/journal (volatile)
RuntimeMaxUse=100M

# Throttle: max burst of messages per time interval
RateLimitBurst=10000
RateLimitIntervalSec=30s

# Maximum size of a single journal file
SystemMaxFileSize=50M

# Keep at least this much disk space free
SystemKeepFree=1G

# Forward high-priority messages to /dev/console (useful for debugging)
ForwardToConsole=no

# Forward to syslog socket (rsyslog reads this)
ForwardToSyslog=yes`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Enabling Persistent Journal</h3>
        <CodeBlock
          language="bash"
          title="Persistent journal setup"
          code={`# Create the directory — journald detects this on next start
mkdir -p /var/log/journal

# Optionally set group and permissions
systemd-tmpfiles --create --prefix /var/log/journal

# Restart journald to apply
systemctl restart systemd-journald

# Verify — should show a machine-ID subdirectory
ls /var/log/journal/`}
        />

        <InfoBox type="info" title="Storage=auto Behavior">
          With <code className="font-mono text-xs">Storage=auto</code> (the default), journald uses persistent
          storage only if <code className="font-mono text-xs">/var/log/journal/</code> already exists. Creating
          that directory is all that is needed — no conf file change required.
        </InfoBox>

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">journalctl — Essential Usage</h3>

        <CodeBlock
          language="bash"
          title="journalctl — common options"
          code={`# Show all logs (newest last)
journalctl

# Follow live log output (like tail -f)
journalctl -f

# Show logs from the current boot
journalctl -b

# Show logs from the previous boot (boot offset -1)
journalctl -b -1

# List all recorded boots
journalctl --list-boots

# Filter by systemd unit
journalctl -u sshd.service
journalctl -u nginx.service -f        # follow a unit

# Filter by priority (0=emerg, 1=alert, 2=crit, 3=err, 4=warning, 5=notice, 6=info, 7=debug)
journalctl -p err                     # errors and above
journalctl -p 3                       # same as above
journalctl -p warning..crit           # range

# Filter by time
journalctl --since "2024-01-15 09:00:00"
journalctl --since "1 hour ago"
journalctl --until "2024-01-15 10:00:00"
journalctl --since yesterday
journalctl --since today

# Show only kernel messages (equivalent to dmesg)
journalctl -k
journalctl -k -b                      # kernel messages from current boot

# Augment with catalog explanations (human-readable context)
journalctl -x
journalctl -xe                        # -e jumps to end, -x adds explanations

# Disable pager (pipe-friendly)
journalctl --no-pager
journalctl --no-pager -u sshd | grep "Failed"

# Output formats
journalctl -o json                    # JSON, one entry per line
journalctl -o json-pretty             # pretty-printed JSON
journalctl -o verbose                 # all fields
journalctl -o short-precise           # microsecond timestamps
journalctl -o cat                     # message only, no metadata

# Field matches (journal fields as filters)
journalctl _PID=1234
journalctl _UID=0
journalctl _SYSTEMD_UNIT=httpd.service
journalctl _COMM=sshd                 # by executable name
journalctl PRIORITY=3                 # error priority

# Combine filters (AND within same invocation, OR on separate -u)
journalctl _UID=48 _COMM=php-fpm      # AND: UID=48 AND comm=php-fpm
journalctl -u sshd -u httpd           # OR: sshd OR httpd logs

# Disk usage
journalctl --disk-usage

# Vacuum old journal entries
journalctl --vacuum-time=2weeks
journalctl --vacuum-size=500M

# Verify journal integrity
journalctl --verify`}
        />

        <InfoBox type="exam" title="Exam: journalctl Priority Levels">
          Priority numbers map to syslog severity: <strong>0=emerg, 1=alert, 2=crit, 3=err, 4=warning, 5=notice, 6=info, 7=debug</strong>.
          Using <code className="font-mono text-xs">-p err</code> shows err and all more severe levels (emerg, alert, crit, err).
          The <code className="font-mono text-xs">-b</code> flag without a number means <em>current</em> boot; <code className="font-mono text-xs">-b -1</code>
          is the previous boot.
        </InfoBox>
      </section>

      {/* ── 3. RSYSLOG ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          rsyslog
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          rsyslog is the high-performance syslog daemon on RHEL. It reads from journald's syslog socket and
          routes messages based on facility.severity rules to files, remote hosts, or databases.
        </p>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">rsyslog.conf Structure</h3>
        <CodeBlock
          language="bash"
          title="/etc/rsyslog.conf — annotated"
          code={`#### MODULES ####
# Load the imjournal module (reads from systemd journal)
module(load="imjournal" StateFile="imjournal.state")

# Load imuxsock for local syslog socket
module(load="imuxsock")

# For remote logging (receiving):
#module(load="imtcp")   # TCP input
#module(load="imudp")   # UDP input

#### GLOBAL SETTINGS ####
global(
    workDirectory="/var/lib/rsyslog"
)

# Include drop-in config files
include(file="/etc/rsyslog.d/*.conf" mode="optional")

#### RULES ####
# Format: facility.severity    destination
# Facilities: kern, user, mail, daemon, auth, syslog, lpr, news,
#             uucp, cron, authpriv, ftp, local0-local7

# All facilities, informational and above → /var/log/messages
*.info;mail.none;authpriv.none;cron.none    /var/log/messages

# Auth/authpriv → /var/log/secure
authpriv.*                                  /var/log/secure

# Mail → /var/log/maillog (- prefix = async write)
mail.*                                      -/var/log/maillog

# Cron → /var/log/cron
cron.*                                      /var/log/cron

# Emergency messages → all logged-in users
*.emerg                                     :omusrmsg:*

# Debug of specific facility
#uucp,news.crit                             /var/log/spooler

# Boot messages
local7.*                                    /var/log/boot.log`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Facility.Severity Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Facilities</h4>
            <div className="text-xs font-mono text-gray-400 space-y-1">
              <div><span className="text-token-string">kern</span> — kernel messages</div>
              <div><span className="text-token-string">user</span> — user-level messages</div>
              <div><span className="text-token-string">daemon</span> — system daemons</div>
              <div><span className="text-token-string">auth / authpriv</span> — security/auth</div>
              <div><span className="text-token-string">cron</span> — cron daemon</div>
              <div><span className="text-token-string">mail</span> — mail system</div>
              <div><span className="text-token-string">local0–local7</span> — custom use</div>
              <div><span className="text-token-string">*</span> — all facilities</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Severities (high → low)</h4>
            <div className="text-xs font-mono text-gray-400 space-y-1">
              <div><span className="text-red-400">emerg (0)</span> — system unusable</div>
              <div><span className="text-red-400">alert (1)</span> — immediate action needed</div>
              <div><span className="text-red-400">crit (2)</span> — critical condition</div>
              <div><span className="text-orange-400">err (3)</span> — error condition</div>
              <div><span className="text-yellow-400">warning (4)</span> — warning</div>
              <div><span className="text-blue-400">notice (5)</span> — normal but significant</div>
              <div><span className="text-gray-400">info (6)</span> — informational</div>
              <div><span className="text-gray-500">debug (7)</span> — debug level</div>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Remote Logging Configuration</h3>
        <CodeBlock
          language="bash"
          title="/etc/rsyslog.d/remote.conf — forwarding to remote syslog"
          code={`# Forward ALL messages to remote host via UDP (unreliable, but lower overhead)
*.* @192.168.1.100:514

# Forward via TCP (reliable, use @@ prefix)
*.* @@logserver.example.com:514

# Forward only critical errors via TCP with TLS (production-grade)
*.crit @@logserver.example.com:6514

# Receiving side — enable in /etc/rsyslog.conf:
module(load="imtcp")
input(type="imtcp" port="514")

# Or UDP:
module(load="imudp")
input(type="imudp" port="514")

# Allow connections from specific subnet (add to receiving server)
$AllowedSender TCP, 192.168.1.0/24`}
        />

        <CodeBlock
          language="bash"
          title="rsyslog templates — custom log formatting"
          code={`# Define a custom template
$template MyFormat,"%timegenerated% %HOSTNAME% %syslogtag%%msg%\n"

# JSON template for log aggregators
$template JSON,"{\"time\":\"%timereported:::date-rfc3339%\",\"host\":\"%HOSTNAME%\",\"program\":\"%programname%\",\"msg\":\"%msg:::json%\"}\n"

# Use template in a rule
*.* /var/log/custom.log;MyFormat

# Template for remote forwarding with hostname
$template RemoteLogs,"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log"
*.* ?RemoteLogs`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">logrotate</h3>
        <p className="text-gray-400 text-sm mb-3">
          logrotate manages rotation, compression, and deletion of log files. It runs daily via cron/systemd timer.
        </p>
        <CodeBlock
          language="bash"
          title="/etc/logrotate.conf — global defaults"
          code={`# Rotate weekly
weekly

# Keep 4 weeks of backlogs
rotate 4

# Create new log files after rotating
create

# Compress rotated logs with gzip
compress

# Don't compress the most recently rotated file (allows processes to finish)
delaycompress

# Use date as suffix instead of number (e.g. messages-20240115)
dateext

# Include per-package config in /etc/logrotate.d/
include /etc/logrotate.d`}
        />

        <CodeBlock
          language="bash"
          title="/etc/logrotate.d/myapp — per-application config"
          code={`/var/log/myapp/*.log {
    # Rotate daily
    daily

    # Keep 30 days
    rotate 30

    # Compress rotated files
    compress
    delaycompress

    # Use date-based names
    dateext
    dateformat -%Y%m%d

    # Don't error if log file is missing
    missingok

    # Don't rotate if empty
    notifempty

    # Create new file with permissions: mode owner group
    create 0640 myapp adm

    # Run this after rotation — send HUP to reload log file handles
    postrotate
        /bin/kill -HUP $(cat /var/run/myapp.pid 2>/dev/null) 2>/dev/null || true
    endscript

    # Or use sharedscripts so postrotate runs once for all matching logs
    sharedscripts
}

# Test rotation manually (dry run)
# logrotate -d /etc/logrotate.d/myapp

# Force rotation now
# logrotate -f /etc/logrotate.d/myapp`}
        />

        <InfoBox type="tip" title="logrotate Debugging">
          Use <code className="font-mono text-xs">logrotate -d /etc/logrotate.conf</code> for a dry-run that shows
          what would happen without making changes. Use <code className="font-mono text-xs">logrotate -vf</code> to
          force rotation with verbose output.
        </InfoBox>
      </section>

      {/* ── 4. AUDITD ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          auditd — Linux Audit Framework
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          The Linux Audit Framework provides a comprehensive security audit trail. auditd records system calls,
          file accesses, and user actions to <code className="font-mono text-xs text-token-string">/var/log/audit/audit.log</code>.
          It operates independently of syslog — even if syslog is compromised, the audit trail remains.
        </p>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">auditd.conf</h3>
        <CodeBlock
          language="ini"
          title="/etc/audit/auditd.conf"
          code={`# Log file location
log_file = /var/log/audit/audit.log

# Maximum log file size in MB
max_log_file = 50

# What to do when max_log_file is hit: ROTATE, IGNORE, SYSLOG, SUSPEND, KEEP_LOGS, HALT
max_log_file_action = ROTATE

# Number of rotated logs to keep
num_logs = 5

# What to do when disk space runs low: IGNORE, SYSLOG, ROTATE, SUSPEND, SINGLE, HALT
disk_full_action = SUSPEND
disk_error_action = SUSPEND

# Space left warning threshold
space_left = 75
space_left_action = SYSLOG

# Admin space left — more aggressive action
admin_space_left = 50
admin_space_left_action = SUSPEND

# Write logs locally (default)
write_logs = yes

# Log format: RAW or ENRICHED (enriched includes translated IDs)
log_format = ENRICHED`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Audit Rules</h3>
        <CodeBlock
          language="bash"
          title="auditctl — runtime audit rules"
          code={`# Watch a file for all access types (r=read, w=write, x=execute, a=attribute change)
auditctl -w /etc/passwd -p wa -k identity-change

# Watch a directory recursively
auditctl -w /etc/sudoers.d/ -p wa -k sudo-config

# Watch for privilege escalation (execve syscall by root)
auditctl -a always,exit -F arch=b64 -S execve -F uid=0 -k root-commands

# Watch for failed file access (EACCES = permission denied, EPERM = not permitted)
auditctl -a always,exit -F arch=b64 -S open,openat -F exit=-EACCES -k access-denied
auditctl -a always,exit -F arch=b64 -S open,openat -F exit=-EPERM  -k access-denied

# Watch for user authentication
auditctl -w /var/log/lastlog -p wa -k logins
auditctl -w /var/run/faillock -p wa -k logins

# Delete all rules
auditctl -D

# List current rules
auditctl -l

# Show audit status
auditctl -s`}
        />

        <CodeBlock
          language="ini"
          title="/etc/audit/rules.d/audit.rules — persistent rules"
          code={`# This file is compiled by augenrules into /etc/audit/audit.rules

# Delete all previous rules
-D

# Set buffer size (increase if getting "backlog limit exceeded")
-b 8192

# Failure mode: 0=silent, 1=printk, 2=panic
-f 1

## Identity-related files
-w /etc/group -p wa -k identity
-w /etc/passwd -p wa -k identity
-w /etc/gshadow -p wa -k identity
-w /etc/shadow -p wa -k identity

## Privilege escalation
-w /bin/su -p x -k priv-esc
-w /usr/bin/sudo -p x -k priv-esc
-w /etc/sudoers -p wa -k sudo-config

## Network configuration changes
-w /etc/sysconfig/network -p wa -k network-config
-w /etc/hosts -p wa -k network-config

## Kernel module loading
-w /sbin/insmod -p x -k modules
-w /sbin/rmmod -p x -k modules
-w /sbin/modprobe -p x -k modules
-a always,exit -F arch=b64 -S init_module,delete_module -k modules

## Login/logout
-w /var/log/faillog -p wa -k login
-w /var/log/lastlog -p wa -k login`}
        />

        <CodeBlock
          language="bash"
          title="augenrules — compile persistent rules"
          code={`# Compile all *.rules files in /etc/audit/rules.d/ into /etc/audit/audit.rules
augenrules --load

# Check compiled rule file
cat /etc/audit/audit.rules`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">ausearch and aureport</h3>
        <CodeBlock
          language="bash"
          title="ausearch — search audit logs"
          code={`# Search by key (label set with -k)
ausearch -k identity-change
ausearch -k sudo-config --interpret     # human-readable translation

# Search by login user
ausearch -ua root
ausearch -ul john                       # by login name

# Search by process ID
ausearch -p 1234

# Search by system call
ausearch -sc openat

# Search by date/time
ausearch --start 01/15/2024 09:00:00
ausearch --start recent                 # last 10 minutes

# Search for failed events
ausearch --success no

# Search for specific file access
ausearch -f /etc/passwd

# Format output as interpreted (translate UIDs, syscall names etc.)
ausearch -k identity --interpret

# Raw output (useful for piping to audit2allow)
ausearch -m AVC --raw`}
        />

        <CodeBlock
          language="bash"
          title="aureport — summary reports"
          code={`# Summary report (audit statistics)
aureport

# Authentication report (login attempts)
aureport -au
aureport --auth

# Failed events report
aureport --failed
aureport -au --failed              # failed logins

# Executable usage report
aureport -x
aureport --executable

# File access report
aureport -f

# Account modifications
aureport -m

# SELinux AVC report
aureport --avc

# Report for specific time window
aureport --start 01/15/2024 00:00:00 --end 01/15/2024 23:59:59 --summary`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">audit2allow — SELinux Connection</h3>
        <CodeBlock
          language="bash"
          title="audit2allow — generate SELinux policy from denials"
          code={`# Generate allow rules from audit log AVC denials
ausearch -m AVC --raw | audit2allow

# Create a loadable SELinux module from denials
ausearch -m AVC --raw | audit2allow -M mypolicy

# Load the generated module
semodule -i mypolicy.pp

# Or in one step from the audit log file
audit2allow -a -M mypolicy             # -a reads from /var/log/audit/audit.log`}
        />

        <InfoBox type="warning" title="audit2allow Risk">
          <code className="font-mono text-xs">audit2allow</code> grants exactly the permissions that were denied —
          it does not evaluate whether those permissions <em>should</em> be granted. Always review the generated
          .te file before loading. Prefer fixing file contexts or enabling booleans when possible.
        </InfoBox>
      </section>

      {/* ── 5. LOG ANALYSIS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Log Analysis Commands
        </h2>

        <CodeBlock
          language="bash"
          title="grep — filtering log files"
          code={`# Case-insensitive search
grep -i "error" /var/log/messages

# Show context around matches (3 lines before/after)
grep -B3 -A3 "segfault" /var/log/messages

# Count occurrences
grep -c "Failed password" /var/log/secure

# Search multiple files
grep "OOM" /var/log/messages /var/log/kern.log

# Extended regex (ERE) — match multiple patterns
grep -E "error|failed|critical" /var/log/messages

# Show only matching file names
grep -l "kernel panic" /var/log/*

# Exclude pattern
grep -v "debug" /var/log/messages

# Show line numbers
grep -n "authentication failure" /var/log/secure

# Recursive search through directory
grep -r "Connection refused" /var/log/

# Only show SSH failures from today
grep "$(date '+%b %e')" /var/log/secure | grep "Failed password"`}
        />

        <CodeBlock
          language="bash"
          title="awk — log parsing and field extraction"
          code={`# Print specific fields (syslog: $1=Month $2=Day $3=Time $4=Host $5=Program)
awk '{print $1, $2, $3, $5, $NF}' /var/log/messages

# Count events per hour from auth log
awk '{print $3}' /var/log/secure | cut -d: -f1 | sort | uniq -c | sort -rn

# Count failed SSH logins per IP
awk '/Failed password/{print $(NF-3)}' /var/log/secure | sort | uniq -c | sort -rn | head -20

# Extract process names causing errors
awk '/error/{print $5}' /var/log/messages | sort | uniq -c | sort -rn

# Average response time from Apache access log
awk '{sum+=$NF; count++} END {print "avg:", sum/count "ms"}' /var/log/httpd/access_log

# Print lines where CPU usage > 90% (from sar output)
awk '$NF > 90 {print}' /var/log/sa/saXX`}
        />

        <CodeBlock
          language="bash"
          title="tail and multitail — live monitoring"
          code={`# Follow a single log
tail -f /var/log/messages

# Follow with last 100 lines
tail -100f /var/log/secure

# Follow multiple files (shows filename headers)
tail -f /var/log/messages /var/log/secure

# Monitor all log files matching pattern
tail -f /var/log/*.log

# multitail — monitor multiple logs in split-screen (install if needed)
multitail /var/log/messages /var/log/secure

# Monitor with filtering (only show ERROR lines in pane 2)
multitail /var/log/messages -I /var/log/myapp.log -e ERROR`}
        />
      </section>

      {/* ── 6. FLOW DIAGRAM ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Log Investigation Workflow
        </h2>
        <FlowDiagram
          title="Failed Service — Log Investigation Workflow"
          steps={[
            {
              label: '1. Check service status',
              sub: 'systemctl status servicename.service — shows last log lines and exit code',
              color: 'blue',
            },
            {
              label: '2. Read journal for the unit',
              sub: 'journalctl -u servicename.service -n 100 --no-pager — last 100 lines without pager',
              color: 'blue',
            },
            {
              label: '3. Check current boot errors',
              sub: 'journalctl -b -p err --no-pager — all errors since last boot',
              color: 'yellow',
            },
            {
              label: '4. Check kernel messages',
              sub: 'journalctl -k -b | grep -i "error\\|fail\\|oom" — kernel-level issues',
              color: 'yellow',
            },
            {
              label: '5. Check /var/log/messages',
              sub: 'grep -i servicename /var/log/messages | tail -50 — traditional syslog output',
              color: 'yellow',
            },
            {
              label: '6. Check application-specific logs',
              sub: 'ls /var/log/servicename/ — app logs may be separate from syslog',
              color: 'purple',
            },
            {
              label: '7. Check audit log for permission issues',
              sub: 'ausearch -m AVC,USER_AVC --start recent — SELinux denials in last 10 min',
              color: 'red',
            },
            {
              label: '8. Correlate timestamps across logs',
              sub: 'Use --since/--until or grep for timestamps to find related events',
              color: 'green',
            },
            {
              label: '9. Resolve and verify',
              sub: 'systemctl start servicename && journalctl -u servicename -f',
              color: 'green',
            },
          ]}
        />
      </section>

      {/* ── 7. COMMAND TABLE ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Command Reference
        </h2>
        <CommandTable
          title="System Logging Commands"
          rows={[
            { cmd: 'journalctl -b',              desc: 'Show logs from current boot',                         note: '-b -1 = previous boot' },
            { cmd: 'journalctl -u UNIT',         desc: 'Show logs for a specific systemd unit',               note: '-u sshd.service -f (follow)' },
            { cmd: 'journalctl -p err',          desc: 'Show error priority and above',                       note: '0=emerg … 7=debug' },
            { cmd: 'journalctl -f',              desc: 'Follow journal in real time',                         note: 'Like tail -f for systemd' },
            { cmd: 'journalctl -k',              desc: 'Show kernel messages only',                           note: 'Equivalent to dmesg' },
            { cmd: 'journalctl -x',              desc: 'Add catalog explanations',                            note: '-xe: jump to end + explain' },
            { cmd: 'journalctl --since "1h ago"',desc: 'Filter by time window',                              note: '--since / --until accept many formats' },
            { cmd: 'journalctl -o json',         desc: 'JSON output format',                                  note: '-o verbose shows all fields' },
            { cmd: 'journalctl --disk-usage',    desc: 'Show journal disk usage',                             note: 'Followed by --vacuum-size=Xm' },
            { cmd: 'journalctl _PID=1234',       desc: 'Filter by journal field',                             note: '_UID= _COMM= _SYSTEMD_UNIT= etc.' },
            { cmd: 'systemctl restart rsyslog',  desc: 'Restart rsyslog after config change',                 note: 'rsyslogd -N1 to test config' },
            { cmd: 'rsyslogd -N1',               desc: 'Validate rsyslog configuration',                      note: 'Returns 0 if config is valid' },
            { cmd: 'logger -p auth.info "msg"',  desc: 'Send a test message to syslog',                       note: '-t TAG -p facility.severity' },
            { cmd: 'logrotate -d /etc/logrotate.conf', desc: 'Dry-run logrotate (no changes)',               note: '-v for verbose, -f to force' },
            { cmd: 'auditctl -l',                desc: 'List current audit rules',                            note: 'auditctl -s = status' },
            { cmd: 'auditctl -w FILE -p wa -k KEY', desc: 'Watch file for writes/attrib changes',            note: 'r=read w=write x=exec a=attr' },
            { cmd: 'auditctl -D',                desc: 'Delete all audit rules',                              note: 'Temporary — rules.d persist' },
            { cmd: 'augenrules --load',          desc: 'Compile and load rules from rules.d/',                note: 'Preferred over editing audit.rules' },
            { cmd: 'ausearch -k KEY',            desc: 'Search audit log by key label',                       note: '--interpret for human-readable' },
            { cmd: 'ausearch -f FILE',           desc: 'Search by file path',                                 note: '-m TYPE for record type' },
            { cmd: 'ausearch --start recent',    desc: 'Search last 10 minutes of audit log',                 note: '--start MM/DD/YYYY HH:MM:SS' },
            { cmd: 'aureport --summary',         desc: 'Overall audit event summary',                         note: '-au auth, -f files, -x execs' },
            { cmd: 'aureport --failed',          desc: 'Report of all failed events',                         note: 'Combine: -au --failed' },
            { cmd: 'audit2allow -a -M mymod',    desc: 'Generate SELinux module from audit denials',          note: 'Then: semodule -i mymod.pp' },
          ]}
        />
      </section>

      {/* ── EXAM TIPS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Exam Tips
        </h2>
        <InfoBox type="exam" title="Persistent Journal — Most Common Task">
          To enable persistent journal: <code className="font-mono text-xs">mkdir -p /var/log/journal</code> then
          <code className="font-mono text-xs"> systemctl restart systemd-journald</code>. With <code className="font-mono text-xs">Storage=auto</code>
          (default), just creating the directory is enough. No journald.conf edit required unless you also need to
          set size limits.
        </InfoBox>
        <InfoBox type="exam" title="journalctl Time Filters">
          Relative time: <code className="font-mono text-xs">--since "2 hours ago"</code>,
          <code className="font-mono text-xs"> --since today</code>, <code className="font-mono text-xs">--since yesterday</code>.
          Absolute time: <code className="font-mono text-xs">--since "2024-01-15 09:00:00"</code>.
          Always use <code className="font-mono text-xs">--no-pager</code> when piping output.
        </InfoBox>
        <InfoBox type="exam" title="rsyslog Remote Logging">
          Single <code className="font-mono text-xs">@</code> = UDP (unreliable).
          Double <code className="font-mono text-xs">@@</code> = TCP (reliable). To receive logs,
          load the <code className="font-mono text-xs">imtcp</code> or <code className="font-mono text-xs">imudp</code> module
          and add an <code className="font-mono text-xs">input()</code> stanza. Drop config in
          <code className="font-mono text-xs"> /etc/rsyslog.d/</code> and restart rsyslog.
        </InfoBox>
        <InfoBox type="exam" title="Audit Rule Persistence">
          Rules added with <code className="font-mono text-xs">auditctl</code> are temporary (lost on reboot).
          Persist rules by placing <code className="font-mono text-xs">*.rules</code> files in
          <code className="font-mono text-xs"> /etc/audit/rules.d/</code> and running
          <code className="font-mono text-xs"> augenrules --load</code>. Do NOT edit
          <code className="font-mono text-xs"> /etc/audit/audit.rules</code> directly — it is auto-generated.
        </InfoBox>
        <InfoBox type="warning" title="logrotate postrotate">
          After rotating, applications holding the old file descriptor still write to the rotated file until
          they reload. The <code className="font-mono text-xs">postrotate</code> script must send a signal
          (HUP or USR1) to the daemon to reopen log files. Use <code className="font-mono text-xs">copytruncate</code>
          as a fallback for apps that cannot be signaled.
        </InfoBox>
      </section>
    </div>
  )
}
