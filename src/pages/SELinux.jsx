import { Shield } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'
import FlowDiagram from '../components/FlowDiagram'
import CommandTable from '../components/CommandTable'

export default function SELinux() {
  return (
    <div>
      <PageHeader
        icon={Shield}
        title="SELinux"
        subtitle="Security-Enhanced Linux — the most critical EX342 topic. Covers MAC policy, security contexts, booleans, port labeling, AVC denial analysis, and policy module creation."
        tags={['SELinux', 'MAC', 'AVC denials', 'audit2allow', 'semanage', 'restorecon', 'sealert']}
      />

      <InfoBox type="danger" title="Highest-Weight Exam Topic">
        SELinux is consistently the most heavily tested area on the EX342 exam. You must be able to diagnose and
        resolve AVC denials under time pressure. Memorize the full AVC troubleshooting workflow: getenforce →
        ausearch → audit2why → fix (context / boolean / port / custom policy).
      </InfoBox>

      {/* ── 1. ARCHITECTURE ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          SELinux Architecture
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          SELinux implements Mandatory Access Control (MAC) enforced by the Linux kernel's Linux Security Module
          (LSM) framework. Unlike Discretionary Access Control (DAC — standard Unix permissions), MAC decisions
          cannot be overridden by the object owner. The policy is defined by the system administrator and
          enforced by the kernel even for the root user.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-lg border border-green-800 bg-green-950/30 p-4">
            <h3 className="text-green-300 font-semibold text-sm mb-2">DAC (Standard Unix)</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>Based on user/group ownership and rwx bits</li>
              <li>Owner controls permissions — root bypasses all</li>
              <li>Once a process is compromised, it has owner's full access</li>
              <li>No protection against privilege escalation within a user's domain</li>
            </ul>
          </div>
          <div className="rounded-lg border border-rh-red bg-rh-red/10 p-4">
            <h3 className="text-rh-red font-semibold text-sm mb-2">MAC (SELinux)</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>Based on security labels (contexts) on every object and subject</li>
              <li>Policy is system-defined — root cannot override MAC decisions</li>
              <li>Compromised process is confined to its domain (type)</li>
              <li>Principle of least privilege: deny everything not explicitly allowed</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface-1 p-4 text-xs text-gray-400">
          <h4 className="text-gray-300 font-semibold mb-3 text-sm">Access Control Decision Flow</h4>
          <div className="flex flex-wrap gap-2 items-center font-mono text-xs">
            <span className="bg-blue-900/50 border border-blue-700 px-2 py-1 rounded text-blue-300">Process (subject)</span>
            <span className="text-rh-red font-bold">→</span>
            <span className="bg-surface-2 border border-border px-2 py-1 rounded">syscall</span>
            <span className="text-rh-red font-bold">→</span>
            <span className="bg-yellow-900/50 border border-yellow-700 px-2 py-1 rounded text-yellow-300">DAC check (rwx)</span>
            <span className="text-rh-red font-bold">→</span>
            <span className="bg-rh-red/20 border border-rh-red/50 px-2 py-1 rounded text-rh-red">SELinux policy check</span>
            <span className="text-rh-red font-bold">→</span>
            <span className="bg-green-900/50 border border-green-700 px-2 py-1 rounded text-green-300">Object (file/socket/etc)</span>
          </div>
          <p className="mt-2 text-gray-500">Both DAC and MAC must ALLOW the access. A denial at either level blocks the operation.</p>
        </div>
      </section>

      {/* ── 2. MODES ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          SELinux Modes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="rounded-lg border border-red-800 bg-red-950/30 p-4">
            <h3 className="text-red-300 font-semibold text-sm mb-2">Enforcing</h3>
            <p className="text-xs text-gray-400">Policy is loaded and enforced. Violations are blocked and logged to audit.log.</p>
            <p className="text-xs text-green-400 mt-2 font-mono">Production — always use this</p>
          </div>
          <div className="rounded-lg border border-yellow-800 bg-yellow-950/30 p-4">
            <h3 className="text-yellow-300 font-semibold text-sm mb-2">Permissive</h3>
            <p className="text-xs text-gray-400">Policy loaded but NOT enforced. Violations are logged but not blocked. Used for troubleshooting.</p>
            <p className="text-xs text-yellow-400 mt-2 font-mono">Temporary debugging only</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h3 className="text-gray-400 font-semibold text-sm mb-2">Disabled</h3>
            <p className="text-xs text-gray-400">SELinux kernel support disabled. Files are not labeled. Re-enabling requires a full relabel (reboot + autorelabel).</p>
            <p className="text-xs text-red-400 mt-2 font-mono">Never disable — use Permissive</p>
          </div>
        </div>

        <CodeBlock
          language="bash"
          title="SELinux mode management"
          code={`# Check current mode
getenforce                          # outputs: Enforcing, Permissive, or Disabled

# Get detailed status including policy type
sestatus
sestatus -v                         # also shows contexts of key processes/files
sestatus -b                         # also shows boolean values

# Set mode temporarily (survives until reboot)
setenforce 1                        # → Enforcing
setenforce 0                        # → Permissive
setenforce Enforcing                # same as setenforce 1

# Permanent mode — edit /etc/selinux/config
# Change takes effect on NEXT BOOT
grep SELINUX /etc/selinux/config`}
        />

        <CodeBlock
          language="ini"
          title="/etc/selinux/config — permanent mode configuration"
          code={`# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing  - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled   - No SELinux policy is loaded.
SELINUX=enforcing

# SELINUXTYPE= can take one of these three values:
#     targeted - Targeted processes are protected (RHEL default)
#     minimum  - Modification of targeted policy — only selected processes
#     mls      - Multi Level Security protection
SELINUXTYPE=targeted`}
        />

        <InfoBox type="exam" title="setenforce vs /etc/selinux/config">
          <code className="font-mono text-xs">setenforce</code> changes the mode <strong>immediately</strong> but is
          <strong> not persistent</strong> across reboots. To make it permanent, edit
          <code className="font-mono text-xs"> /etc/selinux/config</code> and change the <code className="font-mono text-xs">SELINUX=</code> line.
          Both are often required in exam scenarios. Going from Disabled → Enforcing requires a reboot with
          <code className="font-mono text-xs"> /.autorelabel</code> file present to relabel the filesystem.
        </InfoBox>
      </section>

      {/* ── 3. SECURITY CONTEXTS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Security Contexts (Labels)
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          Every process and every file/socket/device in an SELinux system has a security context (label).
          The SELinux policy defines which contexts (domains) are allowed to access which objects.
        </p>

        <div className="rounded-lg border border-border bg-surface-1 p-4 mb-4">
          <h4 className="text-gray-300 font-semibold mb-3 text-sm">Context Format: user:role:type:level</h4>
          <div className="flex flex-wrap gap-3 font-mono text-sm">
            <div className="text-center">
              <div className="bg-blue-900/50 border border-blue-700 px-3 py-2 rounded text-blue-300">system_u</div>
              <div className="text-xs text-gray-500 mt-1">SELinux User</div>
            </div>
            <div className="text-gray-600 self-center text-lg">:</div>
            <div className="text-center">
              <div className="bg-purple-900/50 border border-purple-700 px-3 py-2 rounded text-purple-300">object_r</div>
              <div className="text-xs text-gray-500 mt-1">Role</div>
            </div>
            <div className="text-gray-600 self-center text-lg">:</div>
            <div className="text-center">
              <div className="bg-rh-red/20 border border-rh-red/50 px-3 py-2 rounded text-rh-red">httpd_sys_content_t</div>
              <div className="text-xs text-gray-500 mt-1">Type (most important)</div>
            </div>
            <div className="text-gray-600 self-center text-lg">:</div>
            <div className="text-center">
              <div className="bg-surface-2 border border-border px-3 py-2 rounded text-gray-400">s0</div>
              <div className="text-xs text-gray-500 mt-1">Level (MLS/MCS)</div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            In the <strong>targeted policy</strong>, the <strong>type</strong> field is what matters. Roles and
            users are mostly irrelevant. MLS/MCS level is only significant in MLS or multi-category deployments.
          </p>
        </div>

        <CodeBlock
          language="bash"
          title="Viewing security contexts"
          code={`# List file contexts (-Z flag)
ls -Z /var/www/html/
ls -lZ /etc/passwd
ls -laZ /home/

# List process contexts
ps -Z
ps auxZ
ps -eZ | grep httpd

# Show current user's context
id -Z

# Show context of a running process
ps -Z -p 1234

# Example output:
# system_u:object_r:httpd_sys_content_t:s0  /var/www/html/index.html
# system_u:system_r:httpd_t:s0              /usr/sbin/httpd`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-4">Common SELinux Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Process Types (Domains)</h4>
            <div className="text-xs font-mono text-gray-400 space-y-1">
              <div><span className="text-token-string">httpd_t</span> — Apache web server</div>
              <div><span className="text-token-string">sshd_t</span> — SSH daemon</div>
              <div><span className="text-token-string">named_t</span> — BIND DNS server</div>
              <div><span className="text-token-string">mysqld_t</span> — MySQL/MariaDB</div>
              <div><span className="text-token-string">postfix_t</span> — Postfix mail</div>
              <div><span className="text-token-string">vsftpd_t</span> — vsftpd FTP server</div>
              <div><span className="text-token-string">smbd_t</span> — Samba SMB</div>
              <div><span className="text-token-string">init_t</span> — systemd PID 1</div>
              <div><span className="text-token-string">unconfined_t</span> — unconfined processes</div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">File Types</h4>
            <div className="text-xs font-mono text-gray-400 space-y-1">
              <div><span className="text-token-string">httpd_sys_content_t</span> — web content</div>
              <div><span className="text-token-string">httpd_sys_rw_content_t</span> — writable web content</div>
              <div><span className="text-token-string">httpd_log_t</span> — web server logs</div>
              <div><span className="text-token-string">sshd_key_t</span> — SSH host keys</div>
              <div><span className="text-token-string">user_home_t</span> — user home files</div>
              <div><span className="text-token-string">etc_t</span> — /etc configuration</div>
              <div><span className="text-token-string">var_t</span> — /var generic</div>
              <div><span className="text-token-string">tmp_t</span> — /tmp files</div>
              <div><span className="text-token-string">bin_t</span> — system binaries</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CONTEXT MANAGEMENT ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Context Management
        </h2>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">chcon — Temporary Context Change</h3>
        <p className="text-gray-400 text-sm mb-3">
          <code className="font-mono text-xs text-token-string">chcon</code> changes the context of a file immediately.
          The change is <strong>temporary</strong> — it will be reverted if the filesystem is relabeled
          (<code className="font-mono text-xs">restorecon</code> or autorelabel on boot). Use <code className="font-mono text-xs">semanage fcontext</code>
          for permanent changes.
        </p>
        <CodeBlock
          language="bash"
          title="chcon — temporary context changes"
          code={`# Change file type context
chcon -t httpd_sys_content_t /var/mywebfiles/index.html

# Change recursively
chcon -R -t httpd_sys_content_t /var/mywebfiles/

# Change to match another file's context
chcon --reference=/var/www/html/index.html /var/mywebfiles/index.html

# Change user, role, and type
chcon -u system_u -r object_r -t httpd_sys_content_t /var/mywebfiles/

# Verify the change
ls -Z /var/mywebfiles/`}
        />

        <InfoBox type="warning" title="chcon is Temporary">
          Changes made with <code className="font-mono text-xs">chcon</code> are overwritten by
          <code className="font-mono text-xs"> restorecon</code> or a system relabel. On the exam, always use
          <code className="font-mono text-xs"> semanage fcontext</code> +  <code className="font-mono text-xs">restorecon</code>
          for changes that must survive a relabel.
        </InfoBox>

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">restorecon — Restore Default Context</h3>
        <CodeBlock
          language="bash"
          title="restorecon — restore contexts to policy default"
          code={`# Restore context of a file to policy default
restorecon /var/www/html/newfile.html

# Restore recursively (verbose)
restorecon -Rv /var/www/html/

# Verbose output shows what changed
restorecon -v /etc/myconfig

# Dry run — show what WOULD change without applying
restorecon -nv /var/mywebfiles/

# Restore entire filesystem (use after major changes or moving files)
restorecon -Rv /

# Triggered automatically at boot if /.autorelabel exists
touch /.autorelabel && reboot`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">semanage fcontext — Permanent Context Rules</h3>
        <p className="text-gray-400 text-sm mb-3">
          <code className="font-mono text-xs text-token-string">semanage fcontext</code> writes rules to the SELinux
          policy database. These rules survive relabels. After adding a rule, you must still run
          <code className="font-mono text-xs"> restorecon</code> to apply it to existing files.
        </p>
        <CodeBlock
          language="bash"
          title="semanage fcontext — permanent file context rules"
          code={`# Add a context rule for a specific path
semanage fcontext -a -t httpd_sys_content_t "/var/mywebfiles(/.*)?"

# The regex /var/mywebfiles(/.*)? matches:
#   /var/mywebfiles         (the directory itself)
#   /var/mywebfiles/*       (all files/dirs directly inside)
#   /var/mywebfiles/**/*    (all recursive content)

# After adding the rule — apply it to existing files
restorecon -Rv /var/mywebfiles/

# Delete a context rule
semanage fcontext -d "/var/mywebfiles(/.*)?"

# Modify an existing rule
semanage fcontext -m -t httpd_sys_rw_content_t "/var/mywebfiles/uploads(/.*)?"

# List all fcontext rules (very long)
semanage fcontext -l

# List only locally defined rules (rules you added)
semanage fcontext -l -C

# Equivalence mapping: treat /srv/www like /var/www/html
semanage fcontext -a -e /var/www/html /srv/www
restorecon -Rv /srv/www/

# Common exam pattern: custom web content directory
semanage fcontext -a -t httpd_sys_content_t "/webcontent(/.*)?"
restorecon -Rv /webcontent/
ls -Z /webcontent/`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">matchpathcon — Verify Expected Context</h3>
        <CodeBlock
          language="bash"
          title="matchpathcon — check what context a path should have"
          code={`# Check the expected context for a path according to policy
matchpathcon /var/www/html/index.html
# Output: /var/www/html/index.html  system_u:object_r:httpd_sys_content_t:s0

# Verify a file's actual vs expected context
matchpathcon -V /var/www/html/index.html
# Output: verified (or mismatch warning)

# Check multiple files
matchpathcon /etc/passwd /etc/shadow /var/log/messages`}
        />

        <InfoBox type="exam" title="The Two-Step Fix Pattern">
          The most common SELinux file context fix is always two commands:
          <br /><code className="font-mono text-xs">semanage fcontext -a -t TYPE "/path(/.*)?"</code>
          <br /><code className="font-mono text-xs">restorecon -Rv /path/</code>
          <br />Forgetting <code className="font-mono text-xs">restorecon</code> after <code className="font-mono text-xs">semanage fcontext</code>
          is the #1 student mistake. The rule is added to the policy database but existing files are not relabeled until
          <code className="font-mono text-xs"> restorecon</code> runs.
        </InfoBox>
      </section>

      {/* ── 5. BOOLEANS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Boolean Management
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          SELinux booleans are on/off switches that toggle pre-written policy rules. They are the easiest fix when
          a boolean exists for your use case. Always check for an appropriate boolean before writing custom policy.
        </p>

        <CodeBlock
          language="bash"
          title="Boolean management commands"
          code={`# List all booleans and their state
getsebool -a
getsebool -a | grep httpd        # filter for a subsystem
getsebool -a | grep ftp

# Get a specific boolean value
getsebool httpd_can_network_connect

# Set a boolean temporarily (reset on reboot)
setsebool httpd_can_network_connect on
setsebool httpd_can_network_connect off
setsebool httpd_can_network_connect 1    # 1=on, 0=off

# Set a boolean PERMANENTLY (-P flag — writes to policy database)
setsebool -P httpd_can_network_connect on
setsebool -P samba_enable_home_dirs on

# List booleans with descriptions (semanage)
semanage boolean -l
semanage boolean -l | grep httpd
semanage boolean -l -C            # only locally modified booleans`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-4">Critical Booleans to Know</h3>
        <div className="rounded-lg border border-border bg-surface-1 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-surface-2 border-b border-border">
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Boolean</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Purpose</th>
                <th className="text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide">Common Scenario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {[
                ['httpd_can_network_connect',      'Allow httpd to make outbound TCP connections',       'PHP apps connecting to remote APIs, proxying'],
                ['httpd_can_network_connect_db',   'Allow httpd to connect to remote databases',         'Web app with remote MySQL/PostgreSQL'],
                ['httpd_enable_homedirs',          'Allow httpd to serve files from home dirs',          'UserDir directive in Apache'],
                ['httpd_read_user_content',        'Allow httpd to read user content',                   'Serving ~/public_html'],
                ['httpd_use_nfs',                  'Allow httpd to use NFS-mounted content',             'Content on NFS share'],
                ['samba_enable_home_dirs',         'Allow Samba to share home directories',              'Samba share for /home'],
                ['samba_export_all_rw',            'Allow Samba to export any directory r/w',            'Custom Samba shares'],
                ['ftp_home_dir',                   'Allow FTP to read/write home directories',           'vsftpd with home directory access'],
                ['allow_ftpd_anon_write',          'Allow anonymous FTP uploads',                        'Anonymous FTP write access'],
                ['nfs_export_all_rw',              'Allow NFS to export all dirs read/write',            'Custom NFS exports'],
                ['ssh_sysadm_login',               'Allow sysadm_r role to SSH login',                   'Admin SSH with sysadm role'],
                ['use_nfs_home_dirs',              'Allow NFS-mounted home directories',                  'LDAP/NIS with NFS home dirs'],
                ['allow_user_exec_content',        'Allow users to execute content in home/tmp',         'Block user execution as security policy'],
                ['deny_ptrace',                    'Deny ptrace() to all confined domains',               'Hardening — prevents debugging confined processes'],
              ].map(([bool, purpose, scenario], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-surface-0' : 'bg-surface-1/40'}>
                  <td className="px-4 py-2 font-mono text-token-string whitespace-nowrap">{bool}</td>
                  <td className="px-4 py-2 text-gray-300">{purpose}</td>
                  <td className="px-4 py-2 text-gray-500">{scenario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InfoBox type="exam" title="setsebool -P is the Permanent Flag">
          Without <code className="font-mono text-xs">-P</code>, <code className="font-mono text-xs">setsebool</code> changes
          are lost on reboot. The <code className="font-mono text-xs">-P</code> flag writes the change to the SELinux
          policy database on disk. You can set multiple booleans in one command:
          <code className="font-mono text-xs"> setsebool -P httpd_can_network_connect on httpd_use_nfs on</code>.
        </InfoBox>
      </section>

      {/* ── 6. PORT LABELING ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Port Labeling
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          SELinux controls which ports services can bind to using port labels. If you configure a service to use
          a non-standard port, SELinux will block the bind unless you add a port label.
        </p>

        <CodeBlock
          language="bash"
          title="semanage port — port label management"
          code={`# List all port labels
semanage port -l

# List labels for a specific type
semanage port -l | grep http
semanage port -l | grep ssh

# Add a port label (allow httpd to bind on TCP 8080)
semanage port -a -t http_port_t -p tcp 8080

# Add a port label for SSH on non-standard port
semanage port -a -t ssh_port_t -p tcp 2222

# Modify an existing port label (change type for a port)
semanage port -m -t http_port_t -p tcp 8081

# Delete a port label
semanage port -d -t http_port_t -p tcp 8080

# Common port types and their default ports:
# http_port_t    : tcp 80, 443, 488, 8008, 8009, 8443
# ssh_port_t     : tcp 22
# ftp_port_t     : tcp 21
# smtp_port_t    : tcp 25, 465, 587
# dns_port_t     : tcp/udp 53
# mysqld_port_t  : tcp 3306
# postgresql_port_t : tcp 5432

# After adding a port label, restart the service
semanage port -a -t http_port_t -p tcp 8080
systemctl restart httpd`}
        />

        <InfoBox type="exam" title="Port Label is Not Enough — Check Firewall Too">
          On the exam, when a service fails to bind to a non-standard port, there are TWO required steps:
          (1) <code className="font-mono text-xs">semanage port -a -t TYPE -p tcp PORT</code> for SELinux, and
          (2) <code className="font-mono text-xs">firewall-cmd --add-port=PORT/tcp --permanent</code> for the firewall.
          Both must be done. Check SELinux first with <code className="font-mono text-xs">ausearch -m AVC</code>.
        </InfoBox>
      </section>

      {/* ── 7. AVC DENIALS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          AVC Denial Analysis
        </h2>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          AVC (Access Vector Cache) messages are the key output of SELinux enforcement. Reading them correctly
          is the foundation of all SELinux troubleshooting. Every denial tells you exactly what was blocked.
        </p>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">Anatomy of an AVC Message</h3>
        <CodeBlock
          language="bash"
          title="AVC message anatomy — /var/log/audit/audit.log"
          code={`# Raw AVC denial from audit.log:
type=AVC msg=audit(1705312800.123:456): avc:  denied  { read } for
  pid=1234 comm="httpd" name="secret.html" dev="sda1" ino=67890
  scontext=system_u:system_r:httpd_t:s0
  tcontext=system_u:object_r:admin_home_t:s0
  tclass=file permissive=0

# Breaking it down:
# avc: denied           → This was BLOCKED (in enforcing mode)
# { read }              → The PERMISSION that was denied
# pid=1234              → Process ID
# comm="httpd"          → Command name of the process
# name="secret.html"    → Name of the object being accessed
# scontext=...httpd_t   → SOURCE context (the process domain)
# tcontext=...admin_home_t → TARGET context (the file type)
# tclass=file           → Object class (file, dir, tcp_socket, etc.)
# permissive=0          → Mode: 0=enforcing (blocked), 1=permissive (logged only)

# Translation: httpd (httpd_t) was denied READ access to a file with type admin_home_t`}
        />

        <CodeBlock
          language="bash"
          title="Finding AVC denials"
          code={`# Search audit log for AVC denials
ausearch -m AVC
ausearch -m AVC,USER_AVC          # include user-space AVC messages
ausearch -m AVC --start recent    # last 10 minutes
ausearch -m AVC --start today     # today only

# Human-readable interpretation
ausearch -m AVC --interpret
ausearch -m AVC -i                # short form of --interpret

# Filter by process context (source type)
ausearch -m AVC -c httpd
ausearch -m AVC --comm httpd

# Check audit.log directly
grep "avc:  denied" /var/log/audit/audit.log
grep "avc:  denied" /var/log/audit/audit.log | tail -20`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">audit2why — Explain Denials</h3>
        <CodeBlock
          language="bash"
          title="audit2why — human-readable denial explanation"
          code={`# Pipe AVC messages to audit2why for explanation
ausearch -m AVC --raw | audit2why

# Example output:
# type=AVC msg=audit(...): avc:  denied  { read } ...
#         Was caused by:
#                 Missing type enforcement (TE) allow rule.
#
#                 You can use audit2allow to generate a loadable module to allow
#                 this access.
# OR:
#         Was caused by:
#                 The boolean httpd_enable_homedirs was set incorrectly.
#                 Description:
#                 Allow httpd to read home directory content
#                 Allow access by executing:
#                 # setsebool -P httpd_enable_homedirs 1

# audit2why tells you WHETHER the fix is a boolean, context, or new policy
ausearch -m AVC -i | audit2why`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">audit2allow — Create Policy Modules</h3>
        <CodeBlock
          language="bash"
          title="audit2allow — generate and load SELinux policy modules"
          code={`# Step 1: Generate the allow rules (review these!)
ausearch -m AVC --raw | audit2allow

# Step 2: Create a compilable module (-M gives it a name)
ausearch -m AVC --raw | audit2allow -M myhttpd

# This creates two files:
#   myhttpd.te  — Type Enforcement source (human-readable policy)
#   myhttpd.pp  — Policy Package (compiled binary)

# Review the .te file BEFORE loading
cat myhttpd.te

# Step 3: Load the module
semodule -i myhttpd.pp

# Verify the module is loaded
semodule -l | grep myhttpd

# Remove a module later
semodule -r myhttpd

# All-in-one from audit log file
audit2allow -a -M myhttpd         # -a reads /var/log/audit/audit.log directly
semodule -i myhttpd.pp

# Rebuild and reload an existing module (after editing .te)
checkmodule -M -m -o myhttpd.mod myhttpd.te
semodule_package -o myhttpd.pp -m myhttpd.mod
semodule -i myhttpd.pp`}
        />

        <CodeBlock
          language="bash"
          title="Example .te file generated by audit2allow"
          code={`module myhttpd 1.0;

require {
        type httpd_t;
        type admin_home_t;
        class file { read open getattr };
}

#============= httpd_t ==============
allow httpd_t admin_home_t:file { read open getattr };`}
        />

        <InfoBox type="warning" title="Always Review audit2allow Output">
          <code className="font-mono text-xs">audit2allow</code> generates the minimum permissions to allow
          what was denied — it does not assess <em>whether those permissions are appropriate</em>. Before loading
          any generated module, ask: "Does httpd really need access to admin_home_t?" If the answer involves a
          misconfigured file context, fix the context instead of loading policy.
        </InfoBox>
      </section>

      {/* ── 8. SETROUBLESHOOT ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          setroubleshootd and sealert
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          setroubleshootd runs as a daemon and listens for AVC denials, automatically analyzing them and generating
          human-readable recommendations. <code className="font-mono text-xs text-token-string">sealert</code> is the
          command-line client that formats these reports.
        </p>

        <CodeBlock
          language="bash"
          title="sealert — SELinux troubleshooting assistant"
          code={`# Install setroubleshoot-server if not present
dnf install setroubleshoot-server

# Analyze the audit log and show all alerts with recommendations
sealert -a /var/log/audit/audit.log

# Example sealert output:
# SELinux is preventing httpd from read access on the file secret.html.
#
# *****  Plugin restorecon (99.5 confidence) suggests  ***
# If you want to fix the label.
# /var/mywebfiles/secret.html default label should be httpd_sys_content_t.
# Then you can restorecon the mislabeled file(s).
# Do:  restorecon -v /var/mywebfiles/secret.html
#
# *****  Plugin catchall (1.49 confidence) suggests  ***
# ...
# Do:  ausearch -c 'httpd' --raw | audit2allow -M mypol
#      semodule -i mypol.pp

# Show a specific alert by ID
sealert -l <alert-uuid>

# setroubleshootd also writes to /var/log/messages:
grep "sealert" /var/log/messages`}
        />

        <InfoBox type="tip" title="sealert Confidence Scores">
          sealert ranks its suggestions by confidence percentage. A suggestion at 99.5% confidence
          (usually restorecon or setsebool) is almost always the right fix. The "catchall" suggestion
          (audit2allow custom policy) at ~1% confidence should be a last resort.
        </InfoBox>
      </section>

      {/* ── 9. MCS/MLS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          MCS and MLS (Overview)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h3 className="text-gray-300 font-semibold text-sm mb-2">MCS — Multi-Category Security</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Used with the <code className="font-mono">targeted</code> policy. Adds category labels
              (c0–c1023) to the level field (e.g., <code className="font-mono">s0:c0,c1</code>).
              Used by containers and virtual machines to isolate processes with the same type. Docker/Podman
              use MCS categories to prevent container escapes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface-1 p-4">
            <h3 className="text-gray-300 font-semibold text-sm mb-2">MLS — Multi-Level Security</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Used with the <code className="font-mono">mls</code> policy type. Implements Bell-LaPadula
              model with sensitivity levels (s0–s15: Unclassified, Confidential, Secret, Top Secret).
              Used in government/defense environments. Context level:
              <code className="font-mono"> s3-s3:c0.c1023</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ── 10. FLOW DIAGRAM ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          AVC Denial Troubleshooting Workflow
        </h2>
        <FlowDiagram
          title="SELinux AVC Denial — Full Resolution Workflow"
          steps={[
            {
              label: '1. Confirm symptom — service/application failing',
              sub: 'Operation fails with "Permission denied" but DAC permissions look correct',
              color: 'red',
            },
            {
              label: '2. Check SELinux mode',
              sub: 'getenforce — if Disabled, SELinux is not the cause; if Permissive, it logs but does not block',
              color: 'blue',
            },
            {
              label: '3. Find the AVC denial',
              sub: 'ausearch -m AVC --start recent --interpret — find denial messages',
              color: 'blue',
            },
            {
              label: '4. Get human-readable explanation',
              sub: 'ausearch -m AVC --raw | audit2why — identifies whether fix is boolean, context, or policy',
              color: 'yellow',
            },
            {
              label: '5a. Fix: Wrong file context (most common)',
              sub: 'semanage fcontext -a -t TYPE "/path(/.*)?" && restorecon -Rv /path/',
              color: 'green',
            },
            {
              label: '5b. Fix: Boolean needs enabling',
              sub: 'setsebool -P BOOLEAN_NAME on — check with: semanage boolean -l | grep KEYWORD',
              color: 'green',
            },
            {
              label: '5c. Fix: Non-standard port',
              sub: 'semanage port -a -t TYPE -p tcp PORT — allows service to bind on custom port',
              color: 'green',
            },
            {
              label: '5d. Fix: Custom policy module (last resort)',
              sub: 'ausearch -m AVC --raw | audit2allow -M modname && semodule -i modname.pp',
              color: 'yellow',
            },
            {
              label: '6. Verify fix in enforcing mode',
              sub: 'getenforce → Enforcing; restart service → systemctl status shows active',
              color: 'green',
            },
          ]}
        />
      </section>

      {/* ── 11. REALISTIC EXAMPLES ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Realistic Exam Scenarios
        </h2>

        <h3 className="text-lg font-semibold text-gray-200 mb-3">Scenario 1: Apache cannot serve files from /data/www</h3>
        <CodeBlock
          language="bash"
          title="Scenario 1: Wrong context on custom web root"
          code={`# Symptom: Apache returns 403 Forbidden for files in /data/www
# DAC check: ls -la /data/www shows apache user has read permissions

# Step 1: Find denial
ausearch -m AVC --start recent -i

# Output shows: httpd_t denied read access to var_t or default_t files
# scontext=httpd_t tcontext=var_t tclass=file

# Step 2: Check current context
ls -Z /data/www/

# Step 3: Fix — add permanent rule
semanage fcontext -a -t httpd_sys_content_t "/data/www(/.*)?"

# Step 4: Apply to existing files
restorecon -Rv /data/www/

# Step 5: Verify
ls -Z /data/www/
# Should show: system_u:object_r:httpd_sys_content_t:s0

# Step 6: Test
curl -I http://localhost/
systemctl status httpd`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Scenario 2: Apache cannot connect to database on remote host</h3>
        <CodeBlock
          language="bash"
          title="Scenario 2: Boolean needed for network connection"
          code={`# Symptom: PHP application gets connection refused to MySQL on 192.168.1.10:3306
# Network is fine, firewall allows it, but app still fails

# Step 1: Find denial
ausearch -m AVC --start recent --interpret

# Output: httpd_t denied name_connect to mysqld_port_t (tcp 3306)
# audit2why output: "boolean httpd_can_network_connect_db was set incorrectly"

# Step 2: Enable the boolean
setsebool -P httpd_can_network_connect_db on

# Or more broadly:
setsebool -P httpd_can_network_connect on

# Step 3: Verify
getsebool httpd_can_network_connect_db
# httpd_can_network_connect_db --> on

# Application should now connect`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Scenario 3: SSH on non-standard port 2222</h3>
        <CodeBlock
          language="bash"
          title="Scenario 3: Port label for non-standard SSH port"
          code={`# Symptom: sshd fails to start after changing Port to 2222 in sshd_config

# Step 1: Check journalctl
journalctl -u sshd.service -n 20

# Step 2: Find AVC denial
ausearch -m AVC --start recent -i

# Output: sshd_t denied name_bind on tcp port 2222 (unreserved_port_t)

# Step 3: Add port label
semanage port -a -t ssh_port_t -p tcp 2222

# Step 4: Verify
semanage port -l | grep ssh
# ssh_port_t    tcp    2222, 22

# Step 5: Restart sshd
systemctl restart sshd
systemctl status sshd

# Step 6: Also open firewall
firewall-cmd --add-port=2222/tcp --permanent
firewall-cmd --reload`}
        />

        <h3 className="text-lg font-semibold text-gray-200 mb-3 mt-6">Scenario 4: Custom application needs policy module</h3>
        <CodeBlock
          language="bash"
          title="Scenario 4: Custom policy for application without a boolean"
          code={`# Symptom: Custom daemon /usr/local/bin/myapp cannot write to /var/myapp/data/

# Step 1: Reproduce the denial in permissive mode to capture all denials at once
setenforce 0
# Trigger the application to exercise all code paths
systemctl restart myapp && sleep 5 && systemctl start myapp-test

# Step 2: Go back to enforcing
setenforce 1

# Step 3: Collect all denials related to this app
ausearch -m AVC -c myapp --raw | audit2allow -M myapppolicy

# Review the .te file
cat myapppolicy.te

# Step 4: Load the module
semodule -i myapppolicy.pp

# Step 5: Verify
semodule -l | grep myapp

# Step 6: Test
systemctl restart myapp
ausearch -m AVC -c myapp --start recent  # should be empty now`}
        />
      </section>

      {/* ── 12. COMMAND TABLE ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          SELinux Command Reference
        </h2>
        <CommandTable
          title="Complete SELinux Command Reference"
          rows={[
            { cmd: 'getenforce',                              desc: 'Show current SELinux mode',                         note: 'Enforcing / Permissive / Disabled' },
            { cmd: 'setenforce 1',                            desc: 'Set Enforcing mode (temporary)',                    note: 'setenforce 0 = Permissive' },
            { cmd: 'sestatus',                                desc: 'Detailed SELinux status',                           note: '-v contexts, -b booleans' },
            { cmd: 'ls -Z PATH',                              desc: 'Show file SELinux context',                         note: '-laZ for verbose listing' },
            { cmd: 'ps -Z',                                   desc: 'Show process SELinux context',                      note: 'ps auxZ for all processes' },
            { cmd: 'id -Z',                                   desc: "Show current user's SELinux context",               note: 'Includes role and level' },
            { cmd: 'chcon -t TYPE FILE',                      desc: 'Temporary context change',                          note: '-R recursive, lost on relabel' },
            { cmd: 'restorecon -Rv PATH',                     desc: 'Restore context to policy default',                 note: '-n dry-run, -v verbose' },
            { cmd: 'semanage fcontext -a -t TYPE "/path(/.*)?"', desc: 'Add permanent file context rule',               note: 'Must run restorecon after' },
            { cmd: 'semanage fcontext -l -C',                 desc: 'List locally defined context rules',                note: '-l all rules (very long)' },
            { cmd: 'semanage fcontext -d "/path(/.*)?"',      desc: 'Delete a file context rule',                       note: 'Run restorecon after' },
            { cmd: 'matchpathcon PATH',                       desc: 'Show expected context for path',                    note: '-V verifies actual vs expected' },
            { cmd: 'getsebool -a',                            desc: 'List all booleans and state',                       note: 'Pipe to grep to filter' },
            { cmd: 'setsebool -P BOOL on',                    desc: 'Set boolean permanently',                           note: 'Without -P: temporary' },
            { cmd: 'semanage boolean -l',                     desc: 'List booleans with descriptions',                   note: '-C shows locally modified' },
            { cmd: 'semanage port -l',                        desc: 'List all port labels',                              note: 'grep http / ssh to filter' },
            { cmd: 'semanage port -a -t TYPE -p tcp PORT',    desc: 'Add port label',                                    note: '-m to modify, -d to delete' },
            { cmd: 'ausearch -m AVC --start recent',          desc: 'Find recent AVC denials',                           note: '--interpret for readable output' },
            { cmd: 'ausearch -m AVC --raw | audit2why',       desc: 'Explain why denial occurred',                       note: 'Identifies fix type' },
            { cmd: 'ausearch -m AVC --raw | audit2allow',     desc: 'Generate allow rules from denials',                 note: '-M name creates module' },
            { cmd: 'audit2allow -a -M modname',               desc: 'Create module from entire audit.log',               note: 'Then: semodule -i modname.pp' },
            { cmd: 'semodule -i MODULE.pp',                   desc: 'Load a compiled policy module',                     note: '-r to remove, -l to list' },
            { cmd: 'semodule -l',                             desc: 'List loaded policy modules',                        note: 'grep for specific module' },
            { cmd: 'sealert -a /var/log/audit/audit.log',     desc: 'Analyze audit log with setroubleshootd',            note: 'Provides ranked fix suggestions' },
            { cmd: 'touch /.autorelabel && reboot',           desc: 'Trigger full filesystem relabel on boot',           note: 'Required after disabled→enabled' },
          ]}
        />
      </section>

      {/* ── EXAM TIPS ── */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-rh-red rounded-full inline-block" />
          Top 5 Exam Scenarios
        </h2>
        <InfoBox type="exam" title="Scenario 1: File in Wrong Location">
          Files moved with <code className="font-mono text-xs">mv</code> retain their original SELinux context.
          Files copied with <code className="font-mono text-xs">cp</code> inherit the destination directory's policy context.
          When a service cannot read a file that has correct DAC permissions, always check
          <code className="font-mono text-xs"> ls -Z</code> first. Fix with:
          <code className="font-mono text-xs"> semanage fcontext -a -t TYPE "/path(/.*)?"</code> then
          <code className="font-mono text-xs"> restorecon -Rv /path/</code>.
        </InfoBox>
        <InfoBox type="exam" title="Scenario 2: Service Cannot Make Network Connections">
          If a web application cannot connect to a database or remote API, check booleans first.
          <code className="font-mono text-xs"> getsebool -a | grep httpd</code> shows all HTTP-related booleans.
          Common fixes: <code className="font-mono text-xs">setsebool -P httpd_can_network_connect on</code> or
          <code className="font-mono text-xs"> httpd_can_network_connect_db on</code>. Use
          <code className="font-mono text-xs"> audit2why</code> to confirm the boolean suggestion.
        </InfoBox>
        <InfoBox type="exam" title="Scenario 3: Service Fails to Start on Non-Standard Port">
          Port binding failures due to SELinux are common. Check
          <code className="font-mono text-xs"> ausearch -m AVC -c servicename --start recent</code>. If you see
          <code className="font-mono text-xs"> name_bind</code> denied, add the port:
          <code className="font-mono text-xs"> semanage port -a -t http_port_t -p tcp 8080</code>. Also open
          the firewall with <code className="font-mono text-xs">firewall-cmd --add-port=8080/tcp --permanent</code>.
        </InfoBox>
        <InfoBox type="exam" title="Scenario 4: Permissive Mode for Diagnosis">
          If you need to run an application through all its code paths to capture ALL denials at once (not just
          the first one), temporarily: <code className="font-mono text-xs">setenforce 0</code>, exercise the app,
          then <code className="font-mono text-xs">setenforce 1</code>, and process all collected denials together
          with <code className="font-mono text-xs">ausearch -m AVC --raw | audit2allow -M appmod</code>.
          This saves time vs fixing one denial at a time.
        </InfoBox>
        <InfoBox type="exam" title="Scenario 5: semanage vs chcon">
          The exam will test whether you know the difference. <code className="font-mono text-xs">chcon</code> is
          temporary (reverted by restorecon or relabel). <code className="font-mono text-xs">semanage fcontext</code>
          is permanent (survives relabels). On the exam, if the question says "permanently" or "survives reboot/relabel",
          you MUST use <code className="font-mono text-xs">semanage fcontext</code> + <code className="font-mono text-xs">restorecon</code>.
          If the question just says "fix the access", either works but semanage is the professional answer.
        </InfoBox>
      </section>
    </div>
  )
}
