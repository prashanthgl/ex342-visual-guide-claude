// HardwareDiagnostics.jsx — Hardware fault detection and analysis:
// PCI, USB, udev, DMI, SMART, CPU, memory, drivers, IPMI, IRQ, thermal.
import { Server } from 'lucide-react'
import PageHeader   from '../components/PageHeader'
import InfoBox      from '../components/InfoBox'
import CodeBlock    from '../components/CodeBlock'
import CommandTable from '../components/CommandTable'
import FlowDiagram  from '../components/FlowDiagram'

// ─── PCI reference ────────────────────────────────────────────────────────────
const LSPCI_ROWS = [
  { cmd: 'lspci',           desc: 'List all PCI devices with short description',               note: 'Quick inventory' },
  { cmd: 'lspci -v',        desc: 'Verbose: subsystem IDs, capabilities, BAR addresses',       note: '' },
  { cmd: 'lspci -vv',       desc: 'Very verbose: full capability registers',                   note: 'Rarely needed; huge output' },
  { cmd: 'lspci -k',        desc: 'Show kernel driver in use and available kernel modules',    note: 'Most useful for driver issues' },
  { cmd: 'lspci -nn',       desc: 'Include vendor:device IDs in brackets [8086:1521]',         note: 'Use IDs with modinfo or lwn' },
  { cmd: 'lspci -t',        desc: 'Show PCI device topology as a tree',                        note: 'Visualise bus hierarchy' },
  { cmd: 'lspci -s 00:1f.2',desc: 'Show only device at bus:slot.function address',             note: 'Filter to specific device' },
  { cmd: 'lspci -d 8086:',  desc: 'Show only Intel devices (filter by vendor ID)',             note: 'lspci -d :1521 for any vendor' },
]

// ─── USB reference ────────────────────────────────────────────────────────────
const LSUSB_ROWS = [
  { cmd: 'lsusb',           desc: 'List all USB devices with vendor:product IDs',              note: '' },
  { cmd: 'lsusb -v',        desc: 'Verbose: full USB descriptor tree',                         note: 'Very long output' },
  { cmd: 'lsusb -t',        desc: 'Tree view showing hub topology and bus speed',              note: 'Shows USB 2.0 vs 3.0 assignment' },
  { cmd: 'lsusb -d 045e:',  desc: 'Filter by vendor ID (0x045e = Microsoft)',                 note: '' },
  { cmd: 'usb-devices',     desc: 'Detailed per-device info in a readable format',             note: 'From usbutils package' },
]

// ─── udev reference ───────────────────────────────────────────────────────────
const UDEV_ROWS = [
  { cmd: 'udevadm monitor',             desc: 'Live stream of udev events (plug/unplug to see events)',   note: 'Ctrl-C to stop' },
  { cmd: 'udevadm monitor --kernel',    desc: 'Show only kernel uevent messages',                         note: '' },
  { cmd: 'udevadm monitor --udev',      desc: 'Show only processed udev events',                          note: '' },
  { cmd: 'udevadm info /dev/sda',       desc: 'Show all udev attributes for a device',                    note: 'Use for writing rules' },
  { cmd: 'udevadm info -a /dev/sda',    desc: 'Show device + all parent attributes (full chain)',         note: 'Essential for rules writing' },
  { cmd: 'udevadm test /sys/class/net/eth0', desc: 'Simulate udev rule processing for a device (dry-run)', note: 'Debug rules without rebooting' },
  { cmd: 'udevadm trigger',             desc: 'Re-trigger udev events for all devices',                   note: 'After adding new rules' },
  { cmd: 'udevadm trigger --action=add', desc: 'Re-trigger only add events',                              note: '' },
  { cmd: 'udevadm settle',              desc: 'Wait for udev to finish processing all events',             note: 'Use in scripts after trigger' },
  { cmd: 'udevadm control --reload',    desc: 'Reload udev rules from disk without restart',              note: 'After editing /etc/udev/rules.d/' },
]

// ─── dmidecode reference ──────────────────────────────────────────────────────
const DMI_ROWS = [
  { cmd: 'dmidecode',        desc: 'Print all SMBIOS/DMI tables (very verbose)',                note: 'Root required' },
  { cmd: 'dmidecode -t 0',   desc: 'BIOS/UEFI information: version, release date, vendor',     note: '' },
  { cmd: 'dmidecode -t 1',   desc: 'System info: manufacturer, model, serial, UUID',           note: 'Useful for asset tracking' },
  { cmd: 'dmidecode -t 2',   desc: 'Baseboard (motherboard) info',                             note: '' },
  { cmd: 'dmidecode -t 4',   desc: 'Processor info: socket, speed, cores, flags',              note: '' },
  { cmd: 'dmidecode -t 17',  desc: 'Memory device info: slot, size, speed, type, bank',        note: 'Find empty vs populated slots' },
  { cmd: 'dmidecode -s system-product-name', desc: 'Print only the system product name',       note: 'Scripting-friendly -s flag' },
  { cmd: 'dmidecode -s bios-version',        desc: 'Print BIOS version string only',           note: '' },
]

// ─── hardware inventory reference ─────────────────────────────────────────────
const LSHW_ROWS = [
  { cmd: 'lshw -short',      desc: 'Compact one-line-per-device hardware summary',             note: 'Best overview command' },
  { cmd: 'lshw -c network',  desc: 'Detailed info for network interfaces only',               note: 'Shows MAC, speed, driver' },
  { cmd: 'lshw -c storage',  desc: 'Storage controllers and disk drives',                     note: '' },
  { cmd: 'lshw -c display',  desc: 'GPU and display controllers',                             note: '' },
  { cmd: 'lshw -c memory',   desc: 'RAM banks and cache hierarchy',                           note: '' },
  { cmd: 'lshw -html',       desc: 'Generate HTML report (write to file)',                    note: 'lshw -html > hw.html' },
  { cmd: 'hwinfo --short',   desc: 'Short hardware inventory (hwinfo package)',               note: 'Alternative to lshw' },
  { cmd: 'hwinfo --network', desc: 'Detailed network interface info from hwinfo',             note: '' },
]

// ─── SMART reference ──────────────────────────────────────────────────────────
const SMART_ROWS = [
  { cmd: 'smartctl -a /dev/sda',             desc: 'Full SMART data: attributes, health, test history',    note: 'Most useful command' },
  { cmd: 'smartctl -H /dev/sda',             desc: 'Quick health check: PASSED or FAILED',                 note: 'Use in monitoring' },
  { cmd: 'smartctl -i /dev/sda',             desc: 'Device identity: model, serial, firmware',             note: '' },
  { cmd: 'smartctl -t short /dev/sda',       desc: 'Start a short self-test (~2 min)',                     note: 'Drive stays online' },
  { cmd: 'smartctl -t long /dev/sda',        desc: 'Start an extended self-test (~hours)',                 note: 'More thorough scan' },
  { cmd: 'smartctl -t conveyance /dev/sda',  desc: 'Conveyance test (post-shipping damage check)',         note: 'Only on ATA drives' },
  { cmd: 'smartctl -l selftest /dev/sda',    desc: 'Show self-test log with results and timestamps',       note: '' },
  { cmd: 'smartctl -l error /dev/sda',       desc: 'Show error log (last 5 errors by default)',            note: 'Critical for diagnosis' },
  { cmd: 'smartctl -A /dev/sda',             desc: 'Show SMART attribute table only',                      note: '-A = attributes' },
  { cmd: 'smartctl -d sat /dev/sda',         desc: 'Force SAT translation (for SATA-behind-SAS HBA)',      note: '' },
  { cmd: 'smartctl -a /dev/nvme0',           desc: 'SMART data for NVMe drives',                          note: 'NVMe uses different attrs' },
]

// ─── CPU reference ────────────────────────────────────────────────────────────
const CPU_ROWS = [
  { cmd: 'lscpu',                    desc: 'CPU architecture, topology, speed, flags',             note: 'NUMA, sockets, cores, threads' },
  { cmd: 'lscpu --extended',         desc: 'Per-CPU details: CPU, CORE, SOCKET, NUMA node',       note: 'Topology mapping' },
  { cmd: 'cat /proc/cpuinfo',        desc: 'Raw per-logical-CPU info including all flags',         note: 'grep for specific flags' },
  { cmd: 'grep -m1 flags /proc/cpuinfo', desc: 'Show CPU feature flags from first CPU',           note: 'Check for vmx/svm, avx, aes…' },
  { cmd: 'x86info -a',               desc: 'Detailed x86 CPU info including cache details',       note: 'Requires x86info package' },
  { cmd: 'cpupower frequency-info',  desc: 'CPU frequency scaling: current speed, governor',      note: 'From kernel-tools package' },
  { cmd: 'cpupower idle-info',       desc: 'CPU idle state (C-state) configuration',              note: '' },
]

// ─── driver reference ─────────────────────────────────────────────────────────
const DRIVER_ROWS = [
  { cmd: 'lsmod',                      desc: 'List all currently loaded kernel modules',           note: '' },
  { cmd: 'modinfo module_name',        desc: 'Module metadata: author, description, parameters',  note: 'modinfo bnx2' },
  { cmd: 'modprobe module_name',       desc: 'Load a module and its dependencies',                note: 'Preferred over insmod' },
  { cmd: 'modprobe -r module_name',    desc: 'Remove a module (and unused dependencies)',         note: 'modprobe -r e1000' },
  { cmd: 'rmmod module_name',          desc: 'Remove a module (no dependency handling)',          note: 'Use modprobe -r instead' },
  { cmd: 'dmesg | grep -i driver',     desc: 'Find driver load/unload messages in kernel ring',   note: 'Also grep: error, fail, NVRM' },
  { cmd: 'ls /sys/bus/pci/drivers/',   desc: 'List all bound PCI drivers',                       note: '' },
  { cmd: 'ls /sys/bus/pci/devices/',   desc: 'All PCI devices by domain:bus:slot.fn',            note: '' },
  { cmd: 'cat /sys/bus/pci/devices/0000:00:1f.2/driver/module/version', desc: 'Driver version for a specific device', note: '' },
  { cmd: '/etc/modprobe.d/blacklist.conf', desc: 'Blacklist file — prevents modules from auto-loading', note: 'blacklist nouveau' },
  { cmd: 'echo blacklist nouveau > /etc/modprobe.d/blacklist-nouveau.conf', desc: 'Blacklist the nouveau driver',    note: 'Then: dracut -f' },
]

// ─── IPMI reference ───────────────────────────────────────────────────────────
const IPMI_ROWS = [
  { cmd: 'ipmitool chassis status',      desc: 'System power state, chassis intrusion, fault LEDs', note: '' },
  { cmd: 'ipmitool sensor list',         desc: 'All sensor readings: temp, fan, voltage, power',   note: 'Filter: | grep -i temp' },
  { cmd: 'ipmitool sensor get "CPU Temp"', desc: 'Reading for a specific named sensor',            note: 'Sensor names vary by vendor' },
  { cmd: 'ipmitool sel list',            desc: 'System Event Log — hardware fault history',        note: 'Most important for diagnosis' },
  { cmd: 'ipmitool sel clear',           desc: 'Clear the System Event Log',                       note: 'Root + IPMI access required' },
  { cmd: 'ipmitool sdr list',            desc: 'Sensor Data Repository — all sensor definitions',  note: '' },
  { cmd: 'ipmitool fru list',            desc: 'Field Replaceable Unit inventory (serial numbers)', note: 'Board, PSU, drive cage' },
  { cmd: 'ipmitool mc info',             desc: 'BMC firmware version and manufacturer',            note: '' },
  { cmd: 'ipmitool -I lanplus -H BMC_IP -U admin chassis status', desc: 'Remote IPMI over network (IPMI-over-LAN)', note: '-I lanplus for IPMI v2' },
  { cmd: 'ipmitool power reset',         desc: 'Hard reset the server (immediate, no OS shutdown)', note: 'Use with caution' },
]

// ─── IRQ reference ────────────────────────────────────────────────────────────
const IRQ_ROWS = [
  { cmd: 'cat /proc/interrupts',          desc: 'IRQ table: per-CPU counts, type, and device name',   note: 'Refresh with watch -n1' },
  { cmd: 'cat /proc/irq/N/smp_affinity', desc: 'CPU affinity bitmask for IRQ N (hex)',                note: 'ff = all CPUs; 01 = CPU0 only' },
  { cmd: 'echo 6 > /proc/irq/N/smp_affinity', desc: 'Set IRQ N to CPUs 1 and 2 (binary 0110)',       note: 'Runtime only; use irqbalance.conf to persist' },
  { cmd: 'cat /proc/irq/N/smp_affinity_list', desc: 'CPU affinity in human-readable list format',    note: 'e.g. 2-3 for CPUs 2 and 3' },
  { cmd: 'systemctl status irqbalance',   desc: 'Check irqbalance daemon status',                      note: 'Distributes IRQs across CPUs' },
  { cmd: 'systemctl disable irqbalance',  desc: 'Disable automatic IRQ balancing for manual tuning',  note: 'Required for latency tuning' },
]

// ─── thermal reference ────────────────────────────────────────────────────────
const THERMAL_ROWS = [
  { cmd: 'sensors',                          desc: 'Current temperatures, fan speeds, voltages',             note: 'lm-sensors package' },
  { cmd: 'sensors-detect',                   desc: 'Auto-detect hardware monitoring chips',                  note: 'Run once on new hardware' },
  { cmd: 'cat /sys/class/thermal/thermal_zone*/temp', desc: 'Raw thermal zone temperatures (millidegrees C)', note: 'Divide by 1000 for °C' },
  { cmd: 'cat /sys/class/thermal/thermal_zone0/type', desc: 'Name/type of thermal zone 0',                  note: 'e.g. x86_pkg_temp' },
  { cmd: 'watch -n2 sensors',               desc: 'Live temperature monitoring (updates every 2s)',          note: '' },
  { cmd: 'powerstat',                        desc: 'Per-process power consumption and system stats',         note: 'powerstat package; needs root' },
  { cmd: 'powertop',                         desc: 'Detailed power usage: processes, devices, tuning tips',  note: 'ncurses TUI; needs root' },
  { cmd: 'powertop --auto-tune',             desc: 'Apply all recommended power management settings',        note: 'Not persistent; good for testing' },
  { cmd: 'turbostat',                        desc: 'Per-CPU C-states, P-states, power, and temperature',     note: 'kernel-tools package' },
]

// ─── combined full command reference ──────────────────────────────────────────
const ALL_CMDS = [
  // PCI
  { cmd: 'lspci -k',            desc: 'PCI devices with kernel driver',            note: 'Most useful for driver issues' },
  { cmd: 'lspci -nn',           desc: 'PCI devices with vendor:device IDs',        note: 'Use IDs to look up drivers' },
  // USB + udev
  { cmd: 'lsusb -t',            desc: 'USB device tree with bus speeds',           note: '' },
  { cmd: 'udevadm info -a /dev/sda', desc: 'Device + parent attributes',           note: 'Needed for writing udev rules' },
  { cmd: 'udevadm monitor',     desc: 'Live udev event stream',                    note: 'Plug/unplug to see events' },
  // DMI
  { cmd: 'dmidecode -t 17',     desc: 'Memory slot information from BIOS',         note: '' },
  { cmd: 'dmidecode -t 1',      desc: 'System product, manufacturer, serial',      note: '' },
  // hardware inventory
  { cmd: 'lshw -short',         desc: 'Compact hardware summary',                  note: '' },
  { cmd: 'lshw -c network',     desc: 'Network device details (driver, speed)',    note: '' },
  // SMART
  { cmd: 'smartctl -H /dev/sda', desc: 'Quick SMART health check',                note: 'PASSED or FAILED' },
  { cmd: 'smartctl -a /dev/sda', desc: 'Full SMART attributes and test history',   note: '' },
  { cmd: 'smartctl -t short /dev/sda', desc: 'Run short self-test',               note: '~2 minutes' },
  { cmd: 'smartctl -l error /dev/sda', desc: 'Show drive error log',              note: '' },
  // CPU
  { cmd: 'lscpu',               desc: 'CPU topology, speed, and flags',            note: '' },
  { cmd: 'grep vmx /proc/cpuinfo', desc: 'Check Intel virtualisation support',    note: 'svm for AMD' },
  // drivers
  { cmd: 'modprobe module',     desc: 'Load a kernel module',                      note: '' },
  { cmd: 'modprobe -r module',  desc: 'Unload a module',                           note: '' },
  { cmd: 'dmesg | grep -i error', desc: 'Kernel error messages',                  note: '' },
  // IPMI
  { cmd: 'ipmitool sel list',   desc: 'Hardware event log (System Event Log)',     note: 'Most important IPMI command' },
  { cmd: 'ipmitool sensor list', desc: 'All sensor readings',                      note: '' },
  { cmd: 'ipmitool chassis status', desc: 'Server power and chassis state',       note: '' },
  // IRQ
  { cmd: 'cat /proc/interrupts', desc: 'IRQ table with per-CPU counts',           note: 'watch -n1 for live view' },
  { cmd: 'cat /proc/irq/N/smp_affinity', desc: 'CPU affinity for IRQ N',         note: 'Hex bitmask' },
  // thermal
  { cmd: 'sensors',             desc: 'Temperature, fan speed, voltage',           note: 'lm-sensors package' },
  { cmd: 'cat /sys/class/thermal/thermal_zone*/temp', desc: 'Kernel thermal readings', note: 'Divide by 1000 = °C' },
]

// ─── hardware investigation flow ──────────────────────────────────────────────
const HW_FLOW = [
  {
    label: 'Symptom reported — identify category',
    sub: 'System crash (MCE/kernel panic)?  Disk errors (I/O errors in dmesg)?  Network failure?  USB device not detected?  High temperature?',
    color: 'red',
  },
  {
    label: 'Check dmesg and journal for hardware errors',
    sub: 'dmesg -T | grep -iE "error|fail|warn|mce|edac|ata|usb"\njournalctl -k --since "1 hour ago" | grep -i error',
    color: 'yellow',
  },
  {
    label: 'Identify affected device with lspci / lsusb / lshw',
    sub: 'lspci -k  (PCI devices + drivers)\nlsusb -t  (USB topology)\nlshw -short  (full inventory)',
    color: 'blue',
  },
  {
    label: 'Check device driver binding and status',
    sub: 'lspci -k  →  "Kernel driver in use:"\nls /sys/bus/pci/drivers/\ndmesg | grep <module_name>',
    color: 'blue',
  },
  {
    label: 'Run SMART diagnostics for storage devices',
    sub: 'smartctl -H /dev/sdX  →  quick health\nsmartctl -a /dev/sdX  →  attributes (check attrs 5, 187, 197, 198)\nsmartctl -t short /dev/sdX  →  self-test',
    color: 'purple',
  },
  {
    label: 'Check IPMI / BMC for hardware events',
    sub: 'ipmitool sel list  →  System Event Log (hardware fault history)\nipmitool sensor list | grep -i temp  →  check for thermal events',
    color: 'yellow',
  },
  {
    label: 'Review thermal state and power',
    sub: 'sensors  →  temperatures, fans\ncat /sys/class/thermal/thermal_zone*/temp  →  kernel view\nCheck for throttling: dmesg | grep -i throttl',
    color: 'green',
  },
  {
    label: 'Collect sosreport for escalation',
    sub: 'sosreport  →  provides hardware inventory, dmesg, SMART data, and IPMI SEL to Red Hat support.',
    color: 'default',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function HardwareDiagnostics() {
  return (
    <div className="space-y-12">

      <PageHeader
        icon={Server}
        title="Hardware Diagnostics"
        subtitle="Detect and diagnose hardware faults using PCI/USB enumeration, udev rules, DMI tables, SMART disk analysis, driver inspection, IPMI out-of-band management, IRQ affinity, and thermal monitoring."
        tags={['lspci', 'SMART', 'IPMI', 'udev', 'dmidecode', 'lshw', 'lm-sensors', 'IRQ']}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          1. HARDWARE DISCOVERY LAYER
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Hardware Discovery Architecture</h2>
        <p className="section-body">
          Hardware visibility in Linux is built from several cooperating layers, each responsible
          for a specific level of abstraction — from firmware tables to device files in{' '}
          <code className="code-inline">/dev</code>. Understanding this stack tells you exactly
          where in the chain a failure is occurring.
        </p>

        {/* Hardware discovery layer stack */}
        <div className="my-5 rounded-xl border border-border bg-surface-1 p-5 space-y-1">
          {[
            {
              label: 'BIOS / UEFI Firmware',
              desc: 'Initialises physical hardware, performs POST, builds ACPI and SMBIOS tables in memory.',
              tools: 'dmidecode (reads SMBIOS), efibootmgr',
              color: 'bg-red-950/40 border-red-800/60 text-red-200',
              dot: 'bg-red-500',
            },
            {
              label: 'ACPI (Advanced Config & Power Interface)',
              desc: 'Describes hardware topology, power states, and device capabilities to the OS via AML bytecode tables.',
              tools: 'acpidump, acpixtract, /sys/firmware/acpi/',
              color: 'bg-orange-950/40 border-orange-800/60 text-orange-200',
              dot: 'bg-orange-500',
            },
            {
              label: 'Linux Kernel — Device Drivers',
              desc: 'Matches hardware via PCI/USB IDs, loads the correct driver, initialises the device, publishes events via uevent.',
              tools: 'lsmod, modprobe, dmesg, /sys/bus/*/',
              color: 'bg-yellow-950/40 border-yellow-800/60 text-yellow-200',
              dot: 'bg-yellow-500',
            },
            {
              label: 'udev (Userspace Device Manager)',
              desc: 'Listens to kernel uevent messages, applies rules from /etc/udev/rules.d/, creates and names device nodes.',
              tools: 'udevadm monitor, udevadm info, udevadm trigger',
              color: 'bg-blue-950/40 border-blue-800/60 text-blue-200',
              dot: 'bg-blue-500',
            },
            {
              label: 'Device Files (/dev/) and sysfs (/sys/)',
              desc: 'Character/block device nodes exposed to user space. /sys/ exposes every device attribute as a file.',
              tools: 'ls /dev/, ls /sys/class/, ls /sys/bus/',
              color: 'bg-green-950/40 border-green-800/60 text-green-200',
              dot: 'bg-green-500',
            },
            {
              label: 'User Space Tools',
              desc: 'lspci, lsusb, lshw, dmidecode, smartctl, sensors — query /sys/, /proc/, and device-specific interfaces.',
              tools: 'lspci, lsusb, lshw, smartctl, ipmitool',
              color: 'bg-surface-3 border-border text-gray-200',
              dot: 'bg-gray-400',
            },
          ].map((layer, i, arr) => (
            <div key={layer.label}>
              <div className={`rounded-lg border px-4 py-3 ${layer.color}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${layer.dot}`} />
                  <span className="text-sm font-bold">{layer.label}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-80 ml-4">{layer.desc}</p>
                <p className="text-[11px] font-mono opacity-60 mt-1 ml-4">{layer.tools}</p>
              </div>
              {i < arr.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none" className="opacity-40">
                    <path d="M7 0v12M1 8l6 7 6-7" stroke="#EE0000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <InfoBox type="tip" title="Diagnostic Layer Selection Guide">
          <ul className="space-y-1 mt-1">
            <li><strong>Device not visible in lspci/lsusb:</strong> hardware or BIOS/PCIe slot issue.</li>
            <li><strong>Device in lspci but no driver:</strong> missing kernel module or driver not bound.</li>
            <li><strong>Driver loaded but /dev node missing:</strong> udev rule issue or udevd problem.</li>
            <li><strong>Device works but misbehaves:</strong> driver bug, firmware issue, or overheating.</li>
          </ul>
        </InfoBox>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. PCI DEVICES
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">PCI Device Enumeration with lspci</h2>
        <p className="section-body">
          <code className="code-inline">lspci</code> reads the PCI configuration space of all
          devices on the system and reports their class, vendor, device ID, and driver binding.
          PCI addresses use the <em>domain:bus:slot.function</em> notation —
          e.g. <code className="code-inline">0000:00:1f.2</code> means domain 0, bus 0,
          slot 31 (0x1f), function 2. Most systems have a single domain (0000).
        </p>

        <CodeBlock
          language="bash"
          title="lspci — practical diagnostic examples"
          code={`# Overview of all PCI devices
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
ls /sys/bus/pci/devices/0000:02:00.0/driver/   # symlink to bound driver`}
        />

        <InfoBox type="exam" title="Exam Tip: lspci -k is Your First Driver Diagnostic">
          When a NIC, HBA, or other PCI device is not working, run{' '}
          <code className="code-inline">lspci -k</code> first. If you see "Kernel driver in use:"
          the driver is bound. If there is no "Kernel driver in use:" line, the driver is not
          loaded. Then run <code className="code-inline">modprobe &lt;module&gt;</code> to load it
          manually or add it to <code className="code-inline">/etc/modules-load.d/</code> for
          persistence.
        </InfoBox>

        <CommandTable title="lspci Reference" rows={LSPCI_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. USB DEVICES & UDEV
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">USB Devices and udev Rules</h2>

        <h3 className="text-base font-semibold text-gray-200 mb-2 mt-4">USB Enumeration with lsusb</h3>
        <p className="section-body">
          <code className="code-inline">lsusb</code> enumerates USB devices attached to all hubs.
          USB devices are identified by a vendor:product ID pair (e.g.{' '}
          <code className="code-inline">0951:1666</code> = Kingston DataTraveler).
          The tree view (<code className="code-inline">-t</code>) reveals whether a device is
          connected at USB 2.0 (480 Mbit/s) or USB 3.0 (5 Gbit/s) speeds.
        </p>

        <CodeBlock
          language="bash"
          title="lsusb — discovering and analysing USB devices"
          code={`# List all USB devices
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
udevadm monitor --subsystem-match=usb`}
        />

        <h3 className="text-base font-semibold text-gray-200 mb-2 mt-6">udev Rules</h3>
        <p className="section-body">
          <code className="code-inline">udev</code> is the Linux device manager that runs in user
          space. When the kernel detects a new device, it sends a uevent message to udevd, which
          evaluates rules in <code className="code-inline">/etc/udev/rules.d/</code> (local,
          highest priority) and <code className="code-inline">/usr/lib/udev/rules.d/</code>
          (package-provided). Rules are processed in filename alphanumeric order.
        </p>

        <div className="rounded-xl border border-blue-800/60 bg-blue-950/20 p-4 my-4">
          <h3 className="text-sm font-semibold text-blue-300 mb-3">udev Rule Syntax</h3>
          <div className="font-mono text-xs text-gray-300 bg-surface-2 rounded-lg p-3 overflow-x-auto mb-3">
            <span className="text-token-keyword">SUBSYSTEM</span>
            <span className="text-gray-500">==</span>
            <span className="text-token-string">"usb"</span>
            <span className="text-gray-500">, </span>
            <span className="text-token-keyword">ATTR&#123;idVendor&#125;</span>
            <span className="text-gray-500">==</span>
            <span className="text-token-string">"0951"</span>
            <span className="text-gray-500">, </span>
            <span className="text-token-keyword">ATTR&#123;idProduct&#125;</span>
            <span className="text-gray-500">==</span>
            <span className="text-token-string">"1666"</span>
            <span className="text-gray-500">, </span>
            <span className="text-token-fn">SYMLINK</span>
            <span className="text-gray-500">+=</span>
            <span className="text-token-string">"kingston_dt"</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {[
              { key: 'SUBSYSTEM', desc: 'Device subsystem: "usb", "block", "net", "pci"' },
              { key: 'ATTR{name}', desc: 'Match device attribute from /sys/ (e.g. idVendor, manufacturer)' },
              { key: 'ATTRS{name}', desc: 'Match attribute of device OR any parent (use for USB)' },
              { key: 'ACTION', desc: '"add" | "remove" | "change" — the event type to match' },
              { key: 'KERNEL', desc: 'Match kernel device name (e.g. "sd*", "eth*")' },
              { key: 'ENV{var}', desc: 'Match environment variable (e.g. ENV{ID_TYPE}=="disk")' },
              { key: 'NAME=', desc: 'Set the device node name (e.g. NAME="mydevice")' },
              { key: 'SYMLINK+=', desc: 'Create an additional symlink in /dev/' },
              { key: 'MODE=', desc: 'Set device file permissions (e.g. MODE="0660")' },
              { key: 'OWNER= / GROUP=', desc: 'Set device file owner and group' },
              { key: 'RUN+=', desc: 'Execute a command when the rule matches' },
              { key: 'LABEL= / GOTO=', desc: 'Jump to a label (skip rules) for efficient matching' },
            ].map(({ key, desc }) => (
              <div key={key} className="rounded bg-surface-3 border border-border px-3 py-2">
                <code className="text-token-operator font-bold">{key}</code>
                <span className="text-gray-400 ml-2">{desc}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Rule operators: <code className="code-inline">==</code> (match),{' '}
            <code className="code-inline">!=</code> (not match),{' '}
            <code className="code-inline">=</code> (assign),{' '}
            <code className="code-inline">+=</code> (append to list),{' '}
            <code className="code-inline">:=</code> (assign and lock — prevents later changes).
          </p>
        </div>

        <CodeBlock
          language="bash"
          title="udev — writing and testing rules"
          code={`# Step 1: Find all attributes for the device you want to match
udevadm info -a /dev/sdb
# Examining device '/devices/pci0000:00/0000:00:14.0/usb2/2-3/2-3:1.0/host3/...'
# ATTRS{idVendor}=="0951"
# ATTRS{idProduct}=="1666"
# ATTRS{manufacturer}=="Kingston"

# Step 2: Write the rule
cat > /etc/udev/rules.d/99-kingston.rules << 'EOF'
SUBSYSTEM=="block", ATTRS{idVendor}=="0951", ATTRS{idProduct}=="1666", \
  SYMLINK+="kingston_dt", MODE="0660", GROUP="storage"
EOF

# Step 3: Test the rule without rebooting
udevadm test $(udevadm info -q path /dev/sdb)

# Step 4: Reload rules and trigger events
udevadm control --reload
udevadm trigger --action=add --subsystem-match=block

# Verify the symlink was created:
ls -la /dev/kingston_dt`}
        />

        <CommandTable title="lsusb Reference" rows={LSUSB_ROWS} />
        <CommandTable title="udevadm Reference" rows={UDEV_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. DMI / BIOS INFORMATION
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">DMI / BIOS Information with dmidecode</h2>
        <p className="section-body">
          <code className="code-inline">dmidecode</code> reads the Desktop Management Interface
          (DMI) / SMBIOS tables that the BIOS/UEFI firmware writes into memory during POST. These
          tables contain structured information about every hardware component: system model,
          serial number, processor socket count, RAM slot count and speed, BIOS version, and much
          more — all without needing to open the chassis.
        </p>

        <CodeBlock
          language="bash"
          title="dmidecode — practical examples"
          code={`# Full DMI dump (very long — pipe to less)
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
dmidecode -s processor-version       # Intel Xeon Gold 6338`}
        />

        <InfoBox type="tip" title="Counting Memory Slots and Finding Empty DIMMs">
          <code className="code-inline">dmidecode -t 17 | grep -c "Memory Device"</code> gives
          the total slot count. Pipe through{' '}
          <code className="code-inline">grep -A10 "Memory Device" | grep "Size:"</code> to see
          which are populated. "No Module Installed" entries are empty slots — useful when
          planning memory upgrades without physical access.
        </InfoBox>

        <CommandTable title="dmidecode Reference" rows={DMI_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. HARDWARE INVENTORY
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Hardware Inventory with lshw</h2>
        <p className="section-body">
          <code className="code-inline">lshw</code> (List Hardware) aggregates data from multiple
          sources — DMI tables, <code className="code-inline">/proc</code>,{' '}
          <code className="code-inline">/sys</code>, and PCI/USB enumeration — into a single
          structured view of the entire hardware inventory. The{' '}
          <code className="code-inline">-short</code> output is the fastest way to get an overview.
        </p>

        <CodeBlock
          language="bash"
          title="lshw — hardware inventory examples"
          code={`# Compact one-line summary of all hardware classes
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
lshw -c storage -c disk`}
        />

        <CommandTable title="lshw / hwinfo Reference" rows={LSHW_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. SMART DISK DIAGNOSTICS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">SMART Disk Diagnostics with smartctl</h2>
        <p className="section-body">
          S.M.A.R.T. (Self-Monitoring Analysis and Reporting Technology) is a firmware feature
          built into ATA, SATA, SAS, and NVMe drives that continuously monitors drive health
          internally. <code className="code-inline">smartctl</code> from the{' '}
          <code className="code-inline">smartmontools</code> package reads and interprets this
          data. Learning to read the attribute table is essential — several attributes are direct
          predictors of imminent drive failure.
        </p>

        <h3 className="text-base font-semibold text-gray-200 mb-2 mt-4">
          Critical SMART Attributes to Monitor
        </h3>
        <div className="rounded-xl overflow-hidden border border-border my-4">
          <div className="px-4 py-2.5 bg-surface-2 border-b border-border">
            <h3 className="text-sm font-semibold text-gray-300">Key SMART Attribute Reference</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-surface-2/80 border-b border-border">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">ID</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Attribute Name</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Severity</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">What it means</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '1',   name: 'Raw Read Error Rate',         sev: 'warning', sevColor: 'text-yellow-300', desc: 'Rate of hardware read errors. Increasing trend = disk surface degradation.' },
                  { id: '5',   name: 'Reallocated Sector Count',    sev: 'critical', sevColor: 'text-red-300',    desc: 'Sectors with errors remapped to spare area. ANY non-zero value is a warning; large values = replace drive.' },
                  { id: '9',   name: 'Power On Hours',              sev: 'info',    sevColor: 'text-blue-300',   desc: 'Total power-on time. Consumer drives rated 3-5 years; enterprise 5-10 years.' },
                  { id: '187', name: 'Reported Uncorrectable Errors', sev: 'critical', sevColor: 'text-red-300', desc: 'Errors not correctable by hardware ECC. Non-zero = data has been lost. Replace drive.' },
                  { id: '188', name: 'Command Timeout',             sev: 'warning', sevColor: 'text-yellow-300', desc: 'Commands that timed out. Increasing counts suggest SATA cable or controller issues.' },
                  { id: '197', name: 'Current Pending Sector Count', sev: 'critical', sevColor: 'text-red-300',  desc: 'Sectors waiting to be remapped (read errors, not yet written). Increasing = drive failure imminent.' },
                  { id: '198', name: 'Offline Uncorrectable',       sev: 'critical', sevColor: 'text-red-300',   desc: 'Sectors found uncorrectable during offline scan. Direct evidence of bad blocks.' },
                  { id: '199', name: 'UDMA CRC Error Count',        sev: 'warning', sevColor: 'text-yellow-300', desc: 'CRC errors on the SATA/ATA interface. Increasing = bad cable or connector.' },
                ].map(({ id, name, sev, sevColor, desc }) => (
                  <tr key={id} className="border-b border-border/50 last:border-0 odd:bg-surface-0 even:bg-surface-1/40">
                    <td className="px-4 py-2.5 font-mono font-bold text-token-number">{id}</td>
                    <td className="px-4 py-2.5 font-semibold text-gray-200">{name}</td>
                    <td className={`px-4 py-2.5 font-semibold ${sevColor}`}>{sev.toUpperCase()}</td>
                    <td className="px-4 py-2.5 text-gray-400">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <CodeBlock
          language="bash"
          title="smartctl — full diagnostic workflow"
          code={`# 1. Quick health check (PASSED or FAILED)
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
smartctl -s on /dev/sda`}
        />

        <CodeBlock
          language="bash"
          title="smartd — automated SMART monitoring"
          code={`# /etc/smartd.conf — example configuration
# Monitor all drives with 30-day short test, 365-day long test, email on failure
DEVICESCAN -a -o on -S on -s (S/../.././02|L/../../6/03) -m root -M exec /usr/libexec/smartmontools/smartd-runner

# Monitor specific drive with specific attributes to watch
/dev/sda -a -W 4,45,50 -I 194 -m admin@example.com

# Enable and start:
systemctl enable --now smartd

# Test email notification config:
smartctl --test=email /dev/sda`}
        />

        <InfoBox type="exam" title="Exam Tip: SMART Attribute Thresholds">
          The <em>VALUE</em> column starts at 100 (or higher) and counts down. The{' '}
          <em>THRESH</em> column is the threshold below which the attribute is considered failed.
          When VALUE falls below THRESH, the FAIL column shows "NOW" or "PAST". For exam
          purposes: <strong>any non-zero value in attributes 5, 187, 197, or 198 indicates a
          drive with existing or likely imminent data loss.</strong> Recommend replacement.
        </InfoBox>

        <CommandTable title="smartctl Reference" rows={SMART_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. CPU INFORMATION
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">CPU Information and Feature Detection</h2>
        <p className="section-body">
          <code className="code-inline">lscpu</code> provides a structured summary of CPU
          topology, architecture, and capabilities. The raw per-CPU data lives in{' '}
          <code className="code-inline">/proc/cpuinfo</code> and includes the full feature flag
          list — critical for verifying virtualisation support and hardware-accelerated
          cryptography availability.
        </p>

        <CodeBlock
          language="bash"
          title="CPU feature flag reference"
          code={`# Full topology overview
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
grep -m1 "vmx\|svm" /proc/cpuinfo | grep -o "vmx\|svm"
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
cat /proc/cpuinfo`}
        />

        <InfoBox type="tip" title="Checking Virtualisation Support Before KVM Install">
          Before installing KVM/libvirt, always verify hardware virtualisation is available
          and enabled in BIOS: <code className="code-inline">grep -E "vmx|svm" /proc/cpuinfo</code>.
          If the output is empty, virtualisation is either disabled in BIOS (Intel VT-x / AMD-V
          setting) or the CPU does not support it. No output from this grep is a common
          exam trap.
        </InfoBox>

        <CommandTable title="CPU Information Reference" rows={CPU_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. MEMORY HARDWARE DIAGNOSTICS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Memory Hardware Diagnostics</h2>
        <p className="section-body">
          Memory hardware faults manifest as random crashes, bit flips in data, or correctable
          ECC errors silently logged by the EDAC (Error Detection And Correction) kernel
          subsystem. DMI tables describe the physical memory configuration; the kernel tracks
          ECC error counts in <code className="code-inline">/sys/devices/system/edac/</code>.
        </p>

        <CodeBlock
          language="bash"
          title="Memory hardware inspection"
          code={`# Physical memory layout from BIOS: slots, sizes, speeds, types
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
dmesg | grep -i "edac\|mce\|DIMM\|corrected"
journalctl -k | grep -i "edac\|memory error"

# Machine Check Exceptions (MCE) — hardware error events
dmesg | grep -i "mce:"
mcelog   # decode MCE log if mcelog daemon is installed
# Or use rasdaemon (preferred on RHEL 9):
systemctl status rasdaemon
ras-mc-ctl --summary`}
        />

        <InfoBox type="warning" title="ECC vs Non-ECC Memory Errors">
          ECC memory corrects single-bit errors silently and reports them via EDAC.
          <em>Correctable errors (CE)</em> in small numbers are normal but a rapidly increasing
          CE count indicates a failing DIMM that will eventually produce an uncorrectable error.
          <em>Uncorrectable errors (UE)</em> cause immediate kernel panic with a "Machine Check
          Exception" — any UE count greater than zero requires immediate DIMM replacement.
        </InfoBox>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. DEVICE DRIVER ISSUES
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Device Driver Diagnostics and Management</h2>
        <p className="section-body">
          Kernel modules (drivers) are loaded automatically by udev when a matching device is
          detected. Driver issues commonly manifest as devices present in{' '}
          <code className="code-inline">lspci</code> but non-functional, error messages in
          <code className="code-inline">dmesg</code> at boot, or unwanted drivers binding to
          devices (requiring blacklisting).
        </p>

        <CodeBlock
          language="bash"
          title="Driver loading, unloading, and blacklisting"
          code={`# Check what module is bound to a PCI device
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
echo 0000:02:00.0 > /sys/bus/pci/drivers/igb/bind`}
        />

        <InfoBox type="exam" title="Exam Tip: Persistent Module Loading">
          <code className="code-inline">modprobe</code> changes are runtime-only. For persistence:
          module load → <code className="code-inline">/etc/modules-load.d/module.conf</code>.
          Module parameters → <code className="code-inline">/etc/modprobe.d/module.conf</code>.
          Blacklist → <code className="code-inline">/etc/modprobe.d/blacklist.conf</code>.
          After blacklisting, always rebuild initramfs with{' '}
          <code className="code-inline">dracut --force</code> so the change takes effect at boot.
        </InfoBox>

        <CommandTable title="Driver Management Reference" rows={DRIVER_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. IPMI / BMC OUT-OF-BAND DIAGNOSTICS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">IPMI / BMC Out-of-Band Diagnostics</h2>
        <p className="section-body">
          IPMI (Intelligent Platform Management Interface) is a standardised interface to the
          BMC (Baseboard Management Controller) — a dedicated microcontroller on server
          motherboards that operates independently of the main CPU and OS. It provides
          out-of-band access to sensors, power control, and the System Event Log (SEL) even
          when the server is off or the OS has crashed.
        </p>

        <CodeBlock
          language="bash"
          title="ipmitool — local and remote diagnostics"
          code={`# Local access (requires ipmi_devintf kernel module loaded):
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
ipmitool lan set 1 netmask 255.255.255.0`}
        />

        <InfoBox type="info" title="IPMI / BMC Setup on RHEL 9">
          Install: <code className="code-inline">dnf install -y ipmitool OpenIPMI</code>.
          Load modules: <code className="code-inline">modprobe ipmi_devintf ipmi_si</code>.
          Enable persistent loading:{' '}
          <code className="code-inline">echo -e "ipmi_devintf\nipmi_si" {'>'} /etc/modules-load.d/ipmi.conf</code>.
          Enable the service:{' '}
          <code className="code-inline">systemctl enable --now ipmi</code>.
          You may also use <code className="code-inline">ipmitool</code> without the service if
          the <code className="code-inline">ipmi_devintf</code> module is loaded.
        </InfoBox>

        <CommandTable title="ipmitool Reference" rows={IPMI_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          11. IRQ AND INTERRUPTS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">IRQ and Interrupt Management</h2>
        <p className="section-body">
          Hardware devices signal the CPU using interrupts (IRQs). The{' '}
          <code className="code-inline">/proc/interrupts</code> file shows the interrupt vector
          table with per-CPU hit counts, making it easy to identify which CPUs are handling
          which devices. On multi-CPU systems, concentrating high-rate interrupts on a single
          CPU causes latency; spreading them with IRQ affinity tuning improves throughput.
        </p>

        <CodeBlock
          language="bash"
          title="Inspecting and tuning IRQ affinity"
          code={`# View the interrupt table (one row per IRQ, columns = CPUs)
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
systemctl restart irqbalance`}
        />

        <CommandTable title="IRQ and Interrupt Reference" rows={IRQ_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          12. THERMAL AND POWER MONITORING
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Thermal and Power Monitoring</h2>
        <p className="section-body">
          Excessive CPU temperatures trigger thermal throttling — the kernel automatically
          reduces CPU frequency to prevent damage, causing unexplained performance degradation.
          Fan failures and inadequate cooling in data centres are common causes of thermal
          issues. Linux exposes thermal data via{' '}
          <code className="code-inline">/sys/class/thermal/</code> and hardware monitoring
          chips via the <code className="code-inline">lm-sensors</code> package.
        </p>

        <CodeBlock
          language="bash"
          title="Thermal monitoring and throttle detection"
          code={`# Install and configure lm-sensors
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
dmesg -T | grep -i "throttl\|thermal\|temp\|overheat"
journalctl -k | grep -i "throttl\|thermal"

# CPU frequency scaling (check if throttled):
cpupower frequency-info
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq   # in kHz

# Power consumption analysis:
powertop               # interactive ncurses TUI
powerstat -R 1 30      # 30 samples every 1 second (tabular output)
turbostat              # per-CPU C-states, P-states, temperature, power`}
        />

        <InfoBox type="warning" title="Thermal Throttling and Performance Issues">
          If an application suddenly runs much slower at a predictable time of day (often peak
          load when ambient temperature is highest), check for thermal throttling.
          <code className="code-inline">dmesg | grep -i throttl</code> and the current CPU
          frequency via <code className="code-inline">cpupower frequency-info</code> should
          confirm it. Solutions: clean dust filters, check fan RPMs via{' '}
          <code className="code-inline">ipmitool sensor list</code>, verify cooling
          infrastructure, and check BIOS thermal management settings.
        </InfoBox>

        <CommandTable title="Thermal and Power Reference" rows={THERMAL_ROWS} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          13. HARDWARE FAILURE INVESTIGATION FLOW DIAGRAM
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Hardware Failure Investigation Workflow</h2>
        <p className="section-body">
          Follow this systematic approach when investigating suspected hardware failures — from
          initial symptom to root cause identification.
        </p>
        <FlowDiagram
          title="Hardware Failure Investigation Flow"
          steps={HW_FLOW}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          14. FULL COMMAND REFERENCE TABLE
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Complete Command Reference</h2>
        <CommandTable
          title="Hardware Diagnostics — Full Command Reference"
          rows={ALL_CMDS}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          EXAM TIPS
      ══════════════════════════════════════════════════════════════════════ */}
      <section>
        <h2 className="section-title">Exam Tips</h2>

        <InfoBox type="exam" title="PCI and Driver Exam Scenarios">
          <ul className="space-y-1 mt-1">
            <li><strong>Device present but not working:</strong> <code className="code-inline">lspci -k</code> — no "Kernel driver in use" line → <code className="code-inline">modprobe &lt;module&gt;</code>.</li>
            <li><strong>Make module persistent:</strong> <code className="code-inline">echo module {'>'} /etc/modules-load.d/module.conf</code> — not just modprobe.</li>
            <li><strong>Blacklist a driver:</strong> Write to <code className="code-inline">/etc/modprobe.d/blacklist.conf</code>, then <code className="code-inline">dracut --force</code> to rebuild initramfs.</li>
            <li><strong>Find correct driver for unknown device:</strong> <code className="code-inline">lspci -nn</code> gives [vendor:device], then search modinfo aliases.</li>
          </ul>
        </InfoBox>

        <InfoBox type="exam" title="SMART Disk Diagnostics — What to Know">
          <ul className="space-y-1 mt-1">
            <li><code className="code-inline">smartctl -H /dev/sdX</code> — PASSED/FAILED status. This is the first check.</li>
            <li>Attributes 5, 187, 197, 198 with non-zero RAW_VALUE → recommend drive replacement in your answer.</li>
            <li><code className="code-inline">smartctl -t short /dev/sdX</code> starts a test; <code className="code-inline">smartctl -l selftest</code> reads results.</li>
            <li>Enable automated monitoring: configure <code className="code-inline">/etc/smartd.conf</code> and <code className="code-inline">systemctl enable --now smartd</code>.</li>
          </ul>
        </InfoBox>

        <InfoBox type="exam" title="IPMI / Hardware Fault Investigation">
          <ul className="space-y-1 mt-1">
            <li><code className="code-inline">ipmitool sel list</code> is the first command to run for any unexplained hardware issue — it gives a timestamped hardware event history.</li>
            <li><code className="code-inline">ipmitool sensor list | grep -i temp</code> — check for temperature threshold crossings.</li>
            <li>IPMI works out-of-band — you can access it even when the OS is down (<code className="code-inline">-I lanplus -H BMC_IP</code>).</li>
            <li>Load modules for local IPMI access: <code className="code-inline">modprobe ipmi_devintf ipmi_si</code>.</li>
          </ul>
        </InfoBox>

        <InfoBox type="exam" title="udev Rules — Quick Reference">
          <ul className="space-y-1 mt-1">
            <li>Get attributes for rule writing: <code className="code-inline">udevadm info -a /dev/sdX</code> (use ATTRS for USB — matches parent).</li>
            <li>Test rules without reboot: <code className="code-inline">udevadm test $(udevadm info -q path /dev/sdX)</code>.</li>
            <li>Apply rules: <code className="code-inline">udevadm control --reload && udevadm trigger</code>.</li>
            <li>Rules files go in <code className="code-inline">/etc/udev/rules.d/</code> with numeric prefix (higher number = later, wins on conflicts).</li>
          </ul>
        </InfoBox>

        <InfoBox type="tip" title="dmesg First, Always">
          For any hardware problem, <code className="code-inline">dmesg -T | tail -50</code> and{' '}
          <code className="code-inline">dmesg -T | grep -iE "error|fail|warn|ata|usb|pcie"</code>{' '}
          should always be your first commands. The kernel logs driver probe failures,
          I/O errors, thermal events, MCE hardware errors, and USB disconnect events with
          precise timestamps that pinpoint when a hardware failure started.
        </InfoBox>
      </section>

    </div>
  )
}
