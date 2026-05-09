// BootProcess.jsx — Deep-dive into the RHEL 9 boot sequence for EX342 exam prep
import { Layers } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import InfoBox from '../components/InfoBox'
import CodeBlock from '../components/CodeBlock'
import CommandTable from '../components/CommandTable'
import FlowDiagram, { HorizontalFlow } from '../components/FlowDiagram'

// ─── Data ────────────────────────────────────────────────────────────────────

const BOOT_SEQUENCE_STEPS = [
  { label: 'BIOS / UEFI',         sub: 'Firmware initialises hardware (POST), locates boot device via boot order',              color: 'purple' },
  { label: 'MBR / GPT',           sub: 'First-stage bootloader code (MBR: 446 bytes) or GPT ESP partition read',                color: 'blue'   },
  { label: 'GRUB2 Bootloader',    sub: 'Loads kernel image (vmlinuz) and initramfs, presents boot menu, applies cmdline params', color: 'blue'   },
  { label: 'Kernel Loading',      sub: 'Kernel decompresses itself, initialises CPU, memory, subsystems; mounts initramfs as /', color: 'yellow' },
  { label: 'initramfs / dracut',  sub: 'Temporary root FS; discovers & mounts real root, handles dm-crypt/LVM/network boot',    color: 'yellow' },
  { label: 'systemd (PID 1)',     sub: 'Mounts real root FS, starts units in dependency order toward the default target',       color: 'green'  },
  { label: 'Default Target',      sub: 'multi-user.target or graphical.target — all services running, login prompt available',  color: 'green'  },
]

const HORIZONTAL_STEPS = [
  { label: 'BIOS/UEFI',   sub: 'POST & boot order',   color: 'purple' },
  { label: 'MBR/GPT',     sub: 'Stage-1 loader',       color: 'blue'   },
  { label: 'GRUB2',       sub: 'Load kernel + initrd', color: 'blue'   },
  { label: 'Kernel',      sub: 'Init + decompression', color: 'yellow' },
  { label: 'initramfs',   sub: 'Pivot to real root',   color: 'yellow' },
  { label: 'systemd',     sub: 'PID 1 / units',        color: 'green'  },
  { label: 'Target',      sub: 'multi-user / graphical',color: 'green' },
]

const BOOT_FAILURE_FLOW = [
  {
    label: 'Observe symptoms',
    sub: 'Black screen, kernel panic, "failed to mount", dracut shell, systemd unit failures',
    color: 'red',
  },
  {
    label: 'Is GRUB menu visible?',
    sub: 'Yes → BIOS/MBR is OK, problem is kernel or later.  No → reinstall GRUB2 (grub2-install)',
    color: 'yellow',
  },
  {
    label: 'Check kernel parameters',
    sub: 'Boot with rd.break or init=/bin/bash to drop to a shell before systemd starts',
    color: 'blue',
  },
  {
    label: 'Check initramfs',
    sub: 'Rebuild with dracut -f; check lsinitrd output; confirm necessary modules are included',
    color: 'blue',
  },
  {
    label: 'Check root filesystem',
    sub: 'Boot into rescue.target; run fsck on unmounted partitions; verify /etc/fstab UUIDs',
    color: 'yellow',
  },
  {
    label: 'Check systemd units',
    sub: 'journalctl -b -1 -p err; systemctl list-units --failed; inspect unit file dependencies',
    color: 'purple',
  },
  {
    label: 'System recovers',
    sub: 'Fix persisted, reboot verified; document root cause',
    color: 'green',
  },
]

const GRUB_PARAMS = [
  {
    label: 'rd.break',
    sub: 'Drops to a dracut shell immediately before pivoting to the real root. Useful for resetting root password or inspecting initramfs environment.',
    color: 'red',
  },
  {
    label: 'rd.break=switch_root',
    sub: 'Breaks just after the real root is mounted but before executing /sbin/init — allows chroot-style edits.',
    color: 'yellow',
  },
  {
    label: 'init=/bin/bash',
    sub: 'Kernel spawns a raw bash shell as PID 1 instead of systemd. Filesystem is mounted read-only; remount rw before making changes.',
    color: 'yellow',
  },
  {
    label: 'ro / rw',
    sub: 'Controls whether the root filesystem is mounted read-only (default) or read-write at boot time.',
    color: 'blue',
  },
  {
    label: 'quiet',
    sub: 'Suppresses most kernel boot messages. Remove during troubleshooting to see full kernel output.',
    color: 'default',
  },
  {
    label: 'rd.lvm.lv=vg/lv',
    sub: 'Forces dracut to activate a specific LVM logical volume — useful when auto-detection fails.',
    color: 'purple',
  },
  {
    label: 'systemd.unit=rescue.target',
    sub: 'Equivalent to appending "1" or "single" — boots to rescue mode with minimal services.',
    color: 'green',
  },
  {
    label: 'nomodeset',
    sub: 'Disables kernel mode-setting for the GPU; useful when a driver bug prevents the framebuffer from initialising.',
    color: 'default',
  },
]

const SYSTEMD_TARGETS = [
  {
    label: 'poweroff.target',
    sub: 'Equivalent to old runlevel 0 — shuts down the system',
    color: 'red',
  },
  {
    label: 'rescue.target',
    sub: 'Runlevel 1 / single-user — root shell, minimal services, local filesystems mounted',
    color: 'yellow',
  },
  {
    label: 'emergency.target',
    sub: 'Even more minimal than rescue — read-only root, no services. Use for severe filesystem issues.',
    color: 'red',
  },
  {
    label: 'multi-user.target',
    sub: 'Runlevel 3 — full multi-user CLI environment, all services, no GUI',
    color: 'blue',
  },
  {
    label: 'graphical.target',
    sub: 'Runlevel 5 — multi-user.target + display manager (GDM/SDDM)',
    color: 'purple',
  },
  {
    label: 'reboot.target',
    sub: 'Runlevel 6 — cleanly reboots the system',
    color: 'green',
  },
]

const BOOT_COMMANDS = [
  { cmd: 'grub2-install /dev/sda',               desc: 'Install GRUB2 bootloader to MBR of /dev/sda',                         note: 'BIOS systems. Use --target=x86_64-efi for UEFI.' },
  { cmd: 'grub2-mkconfig -o /boot/grub2/grub.cfg', desc: 'Regenerate grub.cfg from /etc/default/grub and /etc/grub.d/ scripts', note: 'Always run after editing /etc/default/grub' },
  { cmd: 'grubby --default-kernel',              desc: 'Print the path to the current default kernel',                        note: 'Reads from /boot/loader/entries/' },
  { cmd: 'grubby --set-default /boot/vmlinuz-…', desc: 'Set a specific kernel as the default',                               note: 'Persists across reboots' },
  { cmd: 'grubby --update-kernel=ALL --args="…"',desc: 'Add kernel cmdline args to all installed kernels',                    note: 'e.g. --args="quiet splash"' },
  { cmd: 'grubby --update-kernel=ALL --remove-args="…"', desc: 'Remove kernel cmdline arguments from all kernels',           note: 'e.g. --remove-args="rhgb quiet"' },
  { cmd: 'grubby --info=ALL',                    desc: 'Show current kernel entries and their cmdline arguments',             note: 'Useful for auditing boot options' },
  { cmd: 'dracut -f',                            desc: 'Rebuild initramfs for the currently running kernel',                  note: 'Overwrites existing initramfs' },
  { cmd: 'dracut -f /boot/initramfs-$(uname -r).img $(uname -r)', desc: 'Explicitly rebuild initramfs for running kernel',   note: 'Explicit paths avoid ambiguity' },
  { cmd: 'dracut --add "lvm dm-crypt" -f',       desc: 'Rebuild initramfs with additional dracut modules',                   note: 'Modules: lvm, dm-crypt, network, nfs…' },
  { cmd: 'lsinitrd',                             desc: 'List contents of the default initramfs image',                       note: 'lsinitrd /boot/initramfs-<ver>.img for specific' },
  { cmd: 'lsinitrd -f /etc/dracut.conf',         desc: 'Extract and print a specific file from the initramfs',               note: 'Good for verifying config is baked in' },
  { cmd: 'journalctl -b',                        desc: 'Show all log messages from the current boot',                        note: '-b -1 for previous boot, -b -2 two boots ago' },
  { cmd: 'journalctl -b -p err',                 desc: 'Show only error-level messages from current boot',                   note: 'Levels: emerg crit err warning notice info debug' },
  { cmd: 'journalctl -b -1',                     desc: 'Show logs from the previous boot (useful after a crash)',            note: 'Requires persistent journal storage' },
  { cmd: 'systemctl list-units --failed',        desc: 'List all units that failed to start at last boot',                   note: 'Also: systemctl --failed' },
  { cmd: 'systemctl isolate rescue.target',      desc: 'Switch running system into rescue mode immediately',                 note: 'Equivalent to telinit 1' },
  { cmd: 'systemctl isolate emergency.target',   desc: 'Switch into emergency mode (read-only root, no services)',           note: 'For serious filesystem/dependency issues' },
  { cmd: 'systemctl get-default',                desc: 'Show the current default boot target',                               note: 'Returns e.g. multi-user.target' },
  { cmd: 'systemctl set-default graphical.target',desc: 'Set graphical.target as the default boot target',                  note: 'Creates symlink at /etc/systemd/system/default.target' },
  { cmd: 'systemctl reboot',                     desc: 'Cleanly reboot the system via systemd',                              note: 'Equivalent to reboot(8)' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function BootProcess() {
  return (
    <div className="space-y-12">

      {/* ── Header ── */}
      <PageHeader
        icon={Layers}
        title="Boot Process"
        subtitle="Master the full RHEL 9 boot sequence — from firmware initialisation through GRUB2, initramfs, and systemd target activation — with recovery techniques for every failure mode."
        tags={['GRUB2', 'initramfs', 'dracut', 'systemd', 'rd.break', 'EX342']}
      />

      {/* ── Overview flow ── */}
      <section>
        <h2 className="section-title">
          <Layers size={20} className="text-rh-red" />
          Boot Sequence at a Glance
        </h2>
        <p className="section-body mb-4">
          Every Linux boot passes through the same seven stages in sequence. A failure at any
          stage produces distinctive symptoms that point you directly to the right tool.
          The horizontal flow shows the high-level progression; the detailed flow below
          expands each stage with diagnostic context.
        </p>

        <HorizontalFlow steps={HORIZONTAL_STEPS} />

        <FlowDiagram
          title="Detailed Boot Stages"
          steps={BOOT_SEQUENCE_STEPS}
        />
      </section>

      {/* ── BIOS / UEFI ── */}
      <section>
        <h2 className="section-title">Stage 1 — BIOS / UEFI Firmware</h2>
        <p className="section-body">
          When the machine is powered on, the CPU begins executing firmware code stored in flash
          memory. BIOS (Basic Input/Output System) is the legacy interface; UEFI (Unified
          Extensible Firmware Interface) is its modern replacement found on all current hardware.
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-gray-300">
          <li><span className="text-yellow-300 font-semibold">POST (Power-On Self Test):</span> Firmware tests CPU, RAM, and storage controllers. Errors are reported via beep codes or on-screen messages.</li>
          <li><span className="text-yellow-300 font-semibold">Boot device selection:</span> Firmware scans configured boot order (NVMe, SATA, USB, PXE) and loads the first-stage bootloader from the first bootable device.</li>
          <li><span className="text-yellow-300 font-semibold">BIOS vs UEFI:</span> BIOS reads the 512-byte MBR from the disk; UEFI reads EFI executables from the EFI System Partition (ESP), typically <code className="code-inline">/boot/efi/</code> formatted as FAT32.</li>
          <li><span className="text-yellow-300 font-semibold">Secure Boot (UEFI):</span> UEFI Secure Boot verifies each bootloader/kernel binary against an allowlist of cryptographic signatures before executing it.</li>
        </ul>

        <InfoBox type="tip" title="Diagnosing Firmware-Level Issues">
          Firmware failures rarely manifest as Linux problems — the system either won't POST, won't
          find a boot device, or displays a firmware-specific error screen. If the GRUB menu
          never appears, check: (1) boot order in UEFI setup, (2) whether the ESP partition exists
          and is flagged as boot/esp in <code className="code-inline">parted</code>, and
          (3) whether the GRUB EFI binary exists at <code className="code-inline">/boot/efi/EFI/redhat/grubx64.efi</code>.
        </InfoBox>
      </section>

      {/* ── GRUB2 ── */}
      <section>
        <h2 className="section-title">Stage 2 — GRUB2 Bootloader</h2>
        <p className="section-body">
          GRUB2 (GRand Unified Bootloader version 2) is the standard bootloader for RHEL 9.
          It presents a boot menu, loads the kernel image (<code className="code-inline">vmlinuz</code>)
          and initial RAM filesystem (<code className="code-inline">initramfs</code>) into memory,
          and passes the kernel command line to the kernel.
        </p>

        <h3 className="text-base font-semibold text-white mt-5 mb-2">Key Configuration Files</h3>
        <ul className="space-y-1.5 text-sm text-gray-300">
          <li><code className="code-inline">/etc/default/grub</code> — Human-editable defaults (timeout, cmdline, theme). <strong className="text-white">Never edit <code className="code-inline">/boot/grub2/grub.cfg</code> directly.</strong></li>
          <li><code className="code-inline">/etc/grub.d/</code> — Shell scripts that generate grub.cfg sections (10_linux generates kernel entries, 40_custom for hand-written entries).</li>
          <li><code className="code-inline">/boot/grub2/grub.cfg</code> — Auto-generated final config (BIOS systems).</li>
          <li><code className="code-inline">/boot/efi/EFI/redhat/grub.cfg</code> — Auto-generated final config (UEFI systems).</li>
          <li><code className="code-inline">/boot/loader/entries/*.conf</code> — BLS (Boot Loader Specification) entries used by grubby and the kernel management tools.</li>
        </ul>

        <CodeBlock
          language="bash"
          title="/etc/default/grub — key variables"
          code={`# /etc/default/grub
GRUB_TIMEOUT=5                        # seconds to show menu before booting default
GRUB_DEFAULT=saved                    # 'saved' = use grubenv; 0 = first entry
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap rhgb quiet"
# 'rhgb' = Red Hat Graphical Boot (Plymouth splash screen)
# 'quiet' = suppress kernel messages during boot
# Remove 'rhgb quiet' to see full boot messages for troubleshooting

GRUB_DISABLE_RECOVERY="true"          # Set to false to show recovery entries`}
        />

        <CodeBlock
          language="bash"
          title="Regenerate grub.cfg after editing /etc/default/grub"
          code={`# BIOS / Legacy systems
grub2-mkconfig -o /boot/grub2/grub.cfg

# UEFI systems
grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg

# Verify the output — check GRUB_CMDLINE_LINUX is present:
grep -i cmdline /boot/grub2/grub.cfg`}
        />

        <CodeBlock
          language="bash"
          title="grubby — manage kernel entries without editing files"
          code={`# List all installed kernels and their options
grubby --info=ALL

# Show current default kernel
grubby --default-kernel

# Set a specific kernel as default
grubby --set-default /boot/vmlinuz-5.14.0-362.8.1.el9_3.x86_64

# Add a kernel parameter to ALL installed kernels
grubby --update-kernel=ALL --args="console=ttyS0,115200n8"

# Add parameter to a specific kernel only
grubby --update-kernel=/boot/vmlinuz-5.14.0-362.8.1.el9_3.x86_64 --args="nomodeset"

# Remove a parameter from all kernels
grubby --update-kernel=ALL --remove-args="rhgb quiet"

# Verify — print updated info for default kernel
grubby --info=DEFAULT`}
        />

        <InfoBox type="exam" title="Exam Tip — GRUB2 Changes">
          The most common exam mistake is editing <code className="code-inline">/etc/default/grub</code> and
          forgetting to regenerate <code className="code-inline">grub.cfg</code>. Always follow an edit with
          the appropriate <code className="code-inline">grub2-mkconfig</code> command.
          On UEFI systems, the output path is different — check with{' '}
          <code className="code-inline">ls /boot/efi/EFI/redhat/</code> to confirm.
          Use <code className="code-inline">grubby</code> when you only need to change kernel parameters,
          as it directly modifies BLS entries without requiring a config regeneration.
        </InfoBox>
      </section>

      {/* ── Boot Parameters ── */}
      <section>
        <h2 className="section-title">Kernel Command-Line Parameters</h2>
        <p className="section-body mb-4">
          Boot parameters are passed from GRUB2 to the kernel at boot time. They control everything
          from root device selection to dracut module behaviour and emergency console access.
          During troubleshooting, parameters can be injected one-time at the GRUB menu by pressing
          <kbd className="mx-1 px-1.5 py-0.5 rounded border border-border bg-surface-2 text-xs font-mono">e</kbd>
          to edit the current entry and
          <kbd className="mx-1 px-1.5 py-0.5 rounded border border-border bg-surface-2 text-xs font-mono">Ctrl+X</kbd>
          to boot.
        </p>

        <FlowDiagram
          title="Important Boot Parameters for Troubleshooting"
          steps={GRUB_PARAMS}
        />

        <CodeBlock
          language="bash"
          title="One-time boot parameter injection at GRUB menu"
          code={`# At the GRUB menu:
# 1. Select the kernel entry
# 2. Press 'e' to edit
# 3. Find the line starting with 'linux' (contains vmlinuz path + cmdline)
# 4. Append your parameter(s) at the END of the linux line, e.g.:
#       ... rhgb quiet rd.break
# 5. Press Ctrl+X or F10 to boot with the modified parameters

# This is TEMPORARY — the edit is discarded after boot.
# To make permanent: edit /etc/default/grub, then run grub2-mkconfig`}
        />
      </section>

      {/* ── initramfs ── */}
      <section>
        <h2 className="section-title">Stage 3 — initramfs &amp; dracut</h2>
        <p className="section-body">
          The initramfs (initial RAM filesystem) is a compressed cpio archive that the kernel
          unpacks into a tmpfs at boot time and uses as its temporary root filesystem. On RHEL 9
          it is built by <strong className="text-white">dracut</strong>.
          Its job is to do whatever early work is required before the real root filesystem can be
          mounted — typically LVM assembly, dm-crypt decryption, or iSCSI/NFS discovery.
        </p>

        <h3 className="text-base font-semibold text-white mt-5 mb-2">How initramfs Works</h3>
        <ol className="space-y-1.5 text-sm text-gray-300 list-decimal list-inside">
          <li>Kernel decompresses the initramfs cpio archive into an anonymous tmpfs and chroots into it.</li>
          <li>Kernel executes <code className="code-inline">/init</code> inside the initramfs (a dracut-generated shell script).</li>
          <li>dracut's init discovers storage devices, decrypts volumes, assembles LVM/RAID, and runs udev.</li>
          <li>dracut mounts the real root filesystem at <code className="code-inline">/sysroot</code>.</li>
          <li>dracut executes <code className="code-inline">switch_root /sysroot /sbin/init</code> — pivoting to the real root and handing off to systemd.</li>
        </ol>

        <CodeBlock
          language="bash"
          title="Inspect initramfs contents"
          code={`# List all files in the default initramfs
lsinitrd

# List files in a specific initramfs image
lsinitrd /boot/initramfs-5.14.0-362.8.1.el9_3.x86_64.img

# Extract and view a specific file from initramfs
lsinitrd -f /etc/dracut.conf
lsinitrd -f /usr/lib/systemd/systemd

# Check which dracut modules are included
lsinitrd | grep -E "^dracut|lib/dracut"

# Verify a specific kernel module is present
lsinitrd | grep dm_crypt`}
        />

        <CodeBlock
          language="bash"
          title="Rebuild initramfs with dracut"
          code={`# Rebuild for the currently running kernel (simplest form)
dracut -f

# Explicit rebuild — specify output image and kernel version
dracut -f /boot/initramfs-$(uname -r).img $(uname -r)

# Add specific modules (e.g., ensure LVM and dm-crypt are included)
dracut --add "lvm dm-crypt" -f /boot/initramfs-$(uname -r).img $(uname -r)

# Add a kernel module to initramfs
dracut --add-drivers "xfs btrfs" -f

# Verbose output — useful to verify what's being included
dracut -f -v 2>&1 | head -50

# Rebuild initramfs for ALL installed kernels at once
for kv in $(ls /lib/modules/); do
  dracut -f /boot/initramfs-\${kv}.img \${kv}
done`}
        />

        <CodeBlock
          language="bash"
          title="dracut configuration files"
          code={`# System-wide dracut configuration
cat /etc/dracut.conf

# Drop-in config files (preferred for customisation)
ls /etc/dracut.conf.d/

# Example drop-in: always include LVM and dm-crypt modules
cat > /etc/dracut.conf.d/custom.conf << 'EOF'
add_dracutmodules+=" lvm dm-crypt "
add_drivers+=" dm-thin-pool "
omit_dracutmodules+=" plymouth "
EOF

# After editing, rebuild initramfs
dracut -f`}
        />

        <InfoBox type="warning" title="initramfs Corruption">
          A corrupted or missing initramfs causes a kernel panic with the message
          <code className="code-inline">VFS: Unable to mount root fs</code> or drops to a dracut
          emergency shell. Recovery: boot from an older kernel (GRUB menu), or boot from installation
          media, mount the existing OS, and run <code className="code-inline">dracut -f</code> in a chroot.
        </InfoBox>

        <InfoBox type="exam" title="Exam Tip — rd.break for Root Password Reset">
          Resetting a forgotten root password is a classic exam scenario. The canonical RHEL 9 method
          uses <code className="code-inline">rd.break</code> at the GRUB2 prompt — see the full walkthrough
          in the code example below. Key detail: after <code className="code-inline">chroot /sysroot</code>
          you must run <code className="code-inline">touch /.autorelabel</code> (or pass
          <code className="code-inline">enforcing=0</code> at boot) so SELinux relabels the
          <code className="code-inline">/etc/shadow</code> file with the correct context.
        </InfoBox>
      </section>

      {/* ── Root password reset walkthrough ── */}
      <section>
        <h2 className="section-title">Root Password Reset via rd.break</h2>
        <p className="section-body mb-4">
          This is one of the most tested boot-recovery procedures. The entire workflow must be
          completed without rebooting until the final step.
        </p>

        <CodeBlock
          language="bash"
          title="Step-by-step root password reset — rd.break method"
          code={`# ─── At the GRUB menu ───────────────────────────────────────────────────────
# 1. Highlight the boot entry and press 'e' to edit
# 2. Find the line beginning with 'linux'
# 3. Append rd.break at the END of that line
#    Before: ... rhgb quiet
#    After:  ... rhgb quiet rd.break
# 4. Press Ctrl+X to boot into the dracut emergency shell

# ─── Inside the dracut shell (/ = initramfs root) ───────────────────────────
# The real root is mounted READ-ONLY at /sysroot
# Remount it read-write:
mount -o remount,rw /sysroot

# Chroot into the real root so commands act on the real OS:
chroot /sysroot

# Now change the root password:
passwd root
# (enter new password twice)

# Create the SELinux relabel marker — CRITICAL on SELinux-enabled systems.
# Without this, /etc/shadow will have the wrong SELinux context and PAM
# will refuse to use it, locking root out again.
touch /.autorelabel

# Exit the chroot and the dracut shell:
exit
exit
# The system will reboot, relabel all files (takes ~1–2 minutes), then reboot again.

# ─── Alternative: pass enforcing=0 as boot parameter ───────────────────────
# Append enforcing=0 alongside rd.break to avoid the relabel:
#   ... rd.break enforcing=0
# This is faster but leaves SELinux in permissive mode until you re-enable it.`}
        />
      </section>

      {/* ── Booting into emergency / rescue ── */}
      <section>
        <h2 className="section-title">Emergency &amp; Rescue Mode</h2>
        <p className="section-body mb-3">
          Both rescue.target and emergency.target provide a root shell for recovery work.
          Emergency is more stripped-down — it mounts the root filesystem read-only and starts
          virtually nothing, making it the right choice when systemd unit failures prevent even
          rescue mode from completing.
        </p>

        <CodeBlock
          language="bash"
          title="Booting into rescue.target and emergency.target"
          code={`# ─── METHOD 1: kernel parameter at GRUB menu ────────────────────────────────
# Append one of the following to the 'linux' line:
#   systemd.unit=rescue.target     ← rescue mode (root shell + local FSes)
#   systemd.unit=emergency.target  ← emergency mode (read-only root, bare minimum)
#   1  or  single                  ← legacy aliases for rescue.target
#   rd.break                       ← drops to dracut shell (before systemd)

# ─── METHOD 2: from a running system ────────────────────────────────────────
# Switch to rescue mode immediately (drops non-essential services):
systemctl isolate rescue.target

# Switch to emergency mode immediately:
systemctl isolate emergency.target

# ─── Inside rescue.target shell ─────────────────────────────────────────────
# Filesystems are mounted, networking may be available.
# Useful for: fixing unit files, fstab errors, package operations.

# Remount root read-write if it was mounted read-only:
mount -o remount,rw /

# After fixing the issue, continue to the default target:
systemctl default
# Or reboot cleanly:
systemctl reboot`}
        />

        <InfoBox type="tip" title="Rescue vs Emergency — when to use which">
          <strong className="text-green-200">rescue.target</strong> mounts all local filesystems and
          starts a small set of services including networking (depending on config). Use it for
          general system recovery, fixing bad unit files, or running <code className="code-inline">fsck</code>
          on secondary filesystems.<br /><br />
          <strong className="text-green-200">emergency.target</strong> is the last resort — it mounts
          only the root filesystem (read-only) and provides a bare root shell. Use it when
          a required filesystem listed in <code className="code-inline">/etc/fstab</code> is missing
          or corrupt and prevents even rescue.target from completing.
        </InfoBox>
      </section>

      {/* ── systemd targets ── */}
      <section>
        <h2 className="section-title">Stage 4 — systemd Targets</h2>
        <p className="section-body mb-4">
          systemd uses <em>targets</em> to group units and define a desired system state, replacing
          the SysV concept of runlevels. Targets can have dependencies on other targets
          (<code className="code-inline">Wants=</code>, <code className="code-inline">Requires=</code>),
          forming a dependency graph that systemd resolves at boot. The default target is a symlink
          at <code className="code-inline">/etc/systemd/system/default.target</code>.
        </p>

        <FlowDiagram
          title="systemd Targets (lowest to highest activation)"
          steps={SYSTEMD_TARGETS}
        />

        {/* Runlevel comparison table */}
        <div className="mt-5 rounded-xl overflow-hidden border border-border">
          <div className="px-4 py-2.5 bg-surface-2 border-b border-border">
            <h3 className="text-sm font-semibold text-gray-300">SysV Runlevel → systemd Target Mapping</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-surface-2/80 border-b border-border">
                  <th className="text-left px-4 py-2.5 text-gray-400 uppercase tracking-wide font-semibold">SysV Runlevel</th>
                  <th className="text-left px-4 py-2.5 text-gray-400 uppercase tracking-wide font-semibold">systemd Target</th>
                  <th className="text-left px-4 py-2.5 text-gray-400 uppercase tracking-wide font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['0', 'poweroff.target',   'Halt / power off'],
                  ['1', 'rescue.target',     'Single-user / maintenance'],
                  ['2, 3, 4', 'multi-user.target', 'Multi-user CLI (no GUI)'],
                  ['5', 'graphical.target',  'Multi-user with GUI'],
                  ['6', 'reboot.target',     'Reboot'],
                ].map(([rl, tgt, desc], i) => (
                  <tr key={i} className={`border-b border-border/50 last:border-0 ${i % 2 === 0 ? 'bg-surface-0' : 'bg-surface-1/40'}`}>
                    <td className="px-4 py-2.5 font-mono text-token-string">{rl}</td>
                    <td className="px-4 py-2.5 font-mono text-yellow-300">{tgt}</td>
                    <td className="px-4 py-2.5 text-gray-300">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <CodeBlock
          language="bash"
          title="Working with systemd targets"
          code={`# Show the current default target
systemctl get-default

# Change the default target (persists across reboots)
systemctl set-default multi-user.target
systemctl set-default graphical.target

# What does set-default actually do? It creates a symlink:
ls -la /etc/systemd/system/default.target

# Switch to a different target RIGHT NOW (without reboot)
systemctl isolate multi-user.target
systemctl isolate graphical.target
systemctl isolate rescue.target

# List all available targets on the system
systemctl list-units --type=target --all

# Show dependencies of a target
systemctl list-dependencies multi-user.target

# Show what a target pulls in
systemctl cat multi-user.target`}
        />

        <InfoBox type="exam" title="Exam Tip — Targets and Persistence">
          The exam may require you to both fix a broken target and ensure the system boots to the
          correct target permanently. Always use <code className="code-inline">systemctl set-default</code>
          to persist the target — runtime <code className="code-inline">isolate</code> does not
          survive reboot. Remember that <code className="code-inline">rescue.target</code> requires
          the root password by default; if root is locked, boot with
          <code className="code-inline">systemd.unit=emergency.target</code> and reset the password first.
        </InfoBox>
      </section>

      {/* ── Boot log analysis ── */}
      <section>
        <h2 className="section-title">Analysing Boot Logs with journalctl</h2>
        <p className="section-body mb-4">
          journald captures all kernel and service messages from boot. By default on RHEL 9,
          the journal is stored persistently in <code className="code-inline">/var/log/journal/</code>
          (created automatically if it exists), enabling post-mortem analysis of previous boot
          failures — invaluable for diagnosing intermittent problems or panic-induced reboots.
        </p>

        <CodeBlock
          language="bash"
          title="Boot log analysis with journalctl"
          code={`# ─── Current boot ───────────────────────────────────────────────────────────
journalctl -b               # All messages from current boot
journalctl -b -p err        # Only error+ messages (err, crit, alert, emerg)
journalctl -b -p warning    # Warning and above
journalctl -b -u sshd       # Messages from sshd unit this boot

# ─── Previous boots ─────────────────────────────────────────────────────────
journalctl --list-boots      # List all stored boot sessions with IDs
journalctl -b -1             # Previous boot (useful after a crash or panic)
journalctl -b -2             # Two boots ago
journalctl -b <boot-ID>      # Specific boot by its ID from --list-boots

# ─── Enable persistent journal (if not already enabled) ─────────────────────
mkdir -p /var/log/journal
systemd-tmpfiles --create --prefix /var/log/journal
# Or set Storage=persistent in /etc/systemd/journald.conf, then:
systemctl restart systemd-journald

# ─── Kernel messages only ───────────────────────────────────────────────────
journalctl -b -k            # Kernel messages only (equivalent to dmesg)
journalctl -b -k -p err     # Kernel errors this boot

# ─── Time-based filtering ───────────────────────────────────────────────────
journalctl --since "2024-01-15 08:00:00" --until "2024-01-15 09:00:00"
journalctl --since "1 hour ago"

# ─── Output formats ─────────────────────────────────────────────────────────
journalctl -b -o short-iso  # ISO timestamp (good for correlation)
journalctl -b -o json-pretty | head -40   # Full structured data`}
        />

        <InfoBox type="tip" title="Reading a Kernel Panic from journalctl">
          After an unexpected reboot, run <code className="code-inline">journalctl -b -1 -p err</code> to
          see the previous boot's errors. A kernel panic will show the call stack and
          <code className="code-inline">RIP:</code> / <code className="code-inline">Call Trace:</code>
          lines. The function name just above <code className="code-inline">panic()</code> in the trace
          is usually the culprit. If the panic was caused by a module, remove or update it.
          If caused by hardware, check MCE logs with <code className="code-inline">mcelog</code> or
          <code className="code-inline">rasdaemon</code>.
        </InfoBox>
      </section>

      {/* ── Failure diagnosis flow ── */}
      <section>
        <h2 className="section-title">Boot Failure Diagnosis Workflow</h2>
        <p className="section-body mb-4">
          When a system fails to boot, work through this decision tree systematically.
          Each stage has a definitive symptom that tells you where to look next.
        </p>

        <FlowDiagram
          title="Boot Failure Recovery Workflow"
          steps={BOOT_FAILURE_FLOW}
        />

        <CodeBlock
          language="bash"
          title="Common boot failure diagnostics"
          code={`# ─── GRUB2 not installed / MBR corrupt ─────────────────────────────────────
# Boot from RHEL 9 installation media → Troubleshooting → Rescue
# Then reinstall GRUB2:
chroot /mnt/sysimage
grub2-install /dev/sda                              # BIOS
# or for UEFI:
dnf reinstall grub2-efi grub2-efi-modules shim
grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg

# ─── /etc/fstab errors causing emergency shell ──────────────────────────────
# The classic "Give root password for maintenance" prompt
# Boot with systemd.unit=emergency.target, then:
mount -o remount,rw /
vi /etc/fstab                # Fix bad UUID or missing device
# Comment out suspect entries temporarily with '#'
# Then verify with:
mount -a                     # Attempt to mount all fstab entries
# Reboot after fixing

# ─── Verify UUIDs in /etc/fstab match actual devices ───────────────────────
blkid                        # Show UUIDs for all block devices
cat /etc/fstab               # Compare UUIDs
lsblk -f                     # Tree view with filesystem info

# ─── Filesystem corruption (XFS) ────────────────────────────────────────────
# Boot into rescue/emergency, unmount the filesystem, then:
xfs_repair /dev/sda1         # Repair XFS filesystem
# If xfs_repair can't mount: try with -L (zero the log — LAST RESORT)
xfs_repair -L /dev/sda1

# ─── Filesystem corruption (ext4) ───────────────────────────────────────────
fsck.ext4 -y /dev/sda1       # -y = answer yes to all repair questions`}
        />
      </section>

      {/* ── GRUB2 reinstall (rescue media) ── */}
      <section>
        <h2 className="section-title">GRUB2 Reinstallation from Rescue Media</h2>
        <p className="section-body mb-4">
          When GRUB2 is completely absent or the MBR is overwritten, you must boot from RHEL 9
          installation media and use the rescue environment to reinstall it.
        </p>

        <CodeBlock
          language="bash"
          title="Full GRUB2 reinstall workflow from rescue media"
          code={`# Boot from RHEL 9 ISO → Troubleshooting → Rescue a Red Hat system
# The rescue system mounts your existing OS under /mnt/sysimage

# ─── Chroot into the existing OS ────────────────────────────────────────────
chroot /mnt/sysimage

# ─── Verify boot environment ─────────────────────────────────────────────────
ls /boot/grub2/          # Should contain grubenv and fonts/
ls /boot/efi/EFI/        # UEFI: should contain 'redhat' directory

# ─── BIOS reinstall ──────────────────────────────────────────────────────────
grub2-install /dev/sda
grub2-mkconfig -o /boot/grub2/grub.cfg

# ─── UEFI reinstall ──────────────────────────────────────────────────────────
# Ensure EFI variables are accessible (mounted by rescue)
ls /sys/firmware/efi/efivars     # Must be populated for UEFI operations

dnf reinstall grub2-efi-x64 grub2-efi-x64-modules shim-x64
grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg

# Verify the EFI boot entry was created:
efibootmgr -v | grep -i red

# ─── Exit chroot and reboot ──────────────────────────────────────────────────
exit
reboot`}
        />
      </section>

      {/* ── Command reference table ── */}
      <section>
        <h2 className="section-title">Boot Command Reference</h2>
        <CommandTable
          title="Complete Boot Process Command Reference"
          rows={BOOT_COMMANDS}
        />
      </section>

      {/* ── Exam tips summary ── */}
      <section>
        <h2 className="section-title">Exam Scenarios &amp; Tips</h2>

        <InfoBox type="exam" title="Top Boot-Related Exam Scenarios">
          <ul className="space-y-1.5 mt-1">
            <li><span className="font-semibold text-rh-red">Root password reset:</span> Use rd.break → chroot → passwd → touch /.autorelabel → exit × 2 → reboot.</li>
            <li><span className="font-semibold text-rh-red">Boot into specific target:</span> Append systemd.unit=rescue.target to GRUB cmdline or use systemctl set-default.</li>
            <li><span className="font-semibold text-rh-red">Add persistent kernel parameter:</span> Edit /etc/default/grub GRUB_CMDLINE_LINUX, then grub2-mkconfig. Or use grubby --update-kernel=ALL --args.</li>
            <li><span className="font-semibold text-rh-red">Fix broken fstab:</span> Boot emergency.target, remount rw, fix UUIDs with blkid, test with mount -a.</li>
            <li><span className="font-semibold text-rh-red">Rebuild initramfs:</span> dracut -f — usually needed after adding dm-crypt or LVM to a system.</li>
            <li><span className="font-semibold text-rh-red">Analyse previous boot failure:</span> journalctl -b -1 -p err to read crash logs from the last failed boot.</li>
          </ul>
        </InfoBox>

        <InfoBox type="warning" title="Critical Details That Cost Marks">
          <ul className="space-y-1.5 mt-1">
            <li>After <code className="code-inline">rd.break</code>, the filesystem at <code className="code-inline">/sysroot</code> is read-only by default — always <code className="code-inline">mount -o remount,rw /sysroot</code> before making changes.</li>
            <li>Inside the <code className="code-inline">rd.break</code> chroot, <code className="code-inline">touch /.autorelabel</code> is mandatory if SELinux is enforcing — without it the relabelled <code className="code-inline">/etc/shadow</code> will be denied and the password change is useless.</li>
            <li><code className="code-inline">grub2-mkconfig</code> output path differs between BIOS (<code className="code-inline">/boot/grub2/grub.cfg</code>) and UEFI (<code className="code-inline">/boot/efi/EFI/redhat/grub.cfg</code>) — use the wrong path and GRUB ignores your changes.</li>
            <li><code className="code-inline">systemctl isolate</code> takes effect immediately but is not persistent — use <code className="code-inline">systemctl set-default</code> to persist across reboots.</li>
            <li>Never edit <code className="code-inline">/boot/grub2/grub.cfg</code> directly — it is auto-generated and changes are lost on the next <code className="code-inline">grub2-mkconfig</code> or kernel update.</li>
          </ul>
        </InfoBox>

        <InfoBox type="danger" title="Destructive Operations — Think Before Running">
          <ul className="space-y-1 mt-1">
            <li><code className="code-inline">grub2-install</code> writes to the MBR — on the wrong disk this destroys another OS's bootloader.</li>
            <li><code className="code-inline">xfs_repair -L</code> zeroes the log, which can cause data loss — only use if normal xfs_repair fails.</li>
            <li><code className="code-inline">dracut -f</code> overwrites the existing initramfs — if it fails partway through you may be left with no initramfs. Back up first: <code className="code-inline">cp /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak</code></li>
          </ul>
        </InfoBox>
      </section>

    </div>
  )
}
