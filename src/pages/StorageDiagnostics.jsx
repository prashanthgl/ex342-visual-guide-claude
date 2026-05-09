// StorageDiagnostics.jsx — EX342 Storage Diagnostics & Troubleshooting reference page
import { HardDrive } from 'lucide-react'
import PageHeader    from '../components/PageHeader'
import CodeBlock     from '../components/CodeBlock'
import InfoBox       from '../components/InfoBox'
import FlowDiagram   from '../components/FlowDiagram'
import CommandTable  from '../components/CommandTable'

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

// ─── Storage Stack Visual ────────────────────────────────────────────────────
function StorageStackDiagram() {
  const layers = [
    { label: 'Application',             sub: 'open(), read(), write(), fsync() — POSIX file API',                     color: 'bg-green-950/50 border-green-800',   text: 'text-green-300' },
    { label: 'VFS (Virtual File System)', sub: 'Unified inode/dentry/file abstraction; path lookup; page cache',       color: 'bg-blue-950/50 border-blue-800',     text: 'text-blue-300' },
    { label: 'File System',              sub: 'ext4 / XFS / btrfs / tmpfs — manages inodes, extents, journals',        color: 'bg-purple-950/50 border-purple-800', text: 'text-purple-300' },
    { label: 'Block Layer',              sub: 'BIO/request queue, I/O scheduler (mq-deadline/bfq/none), dm-*, md-*',   color: 'bg-yellow-950/50 border-yellow-800', text: 'text-yellow-300' },
    { label: 'Device Driver',            sub: 'AHCI (SATA), NVMe, virtio-blk, iSCSI initiator, Fibre Channel HBA',    color: 'bg-orange-950/50 border-orange-800', text: 'text-orange-300' },
    { label: 'Physical Storage',         sub: 'HDD (spinning), SSD (NAND), NVMe PCIe, SAN LUN, iSCSI target',         color: 'bg-red-950/50 border-red-800',       text: 'text-red-300' },
  ]
  return (
    <div className="my-6 rounded-xl border border-border bg-surface-1 p-5">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Linux Storage Stack
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

// ─── LVM Hierarchy Visual ────────────────────────────────────────────────────
function LvmDiagram() {
  return (
    <div className="my-6 rounded-xl border border-border bg-surface-1 p-5">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
        LVM Hierarchy
      </h3>
      <div className="space-y-3">
        {/* LV row */}
        <div>
          <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Logical Volumes (LV)</div>
          <div className="grid grid-cols-3 gap-2">
            {['lv_root (50G)', 'lv_home (100G)', 'lv_data (200G)'].map((lv, i) => (
              <div key={i} className="rounded-lg border border-purple-800 bg-purple-950/40 px-3 py-2 text-center">
                <div className="text-xs font-semibold text-purple-300">{lv}</div>
                <div className="text-[10px] text-gray-500">/dev/vg_data/{lv.split(' ')[0]}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Arrow */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-px h-4 bg-rh-red" />
            <div className="border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rh-red" />
          </div>
        </div>
        {/* VG row */}
        <div>
          <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Volume Group (VG)</div>
          <div className="rounded-lg border border-blue-800 bg-blue-950/40 px-5 py-3 text-center">
            <div className="text-sm font-semibold text-blue-300">vg_data (350G total — 4MB PE size)</div>
            <div className="text-xs text-gray-400 mt-0.5">Spans multiple PVs; presents unified pool of Physical Extents</div>
          </div>
        </div>
        {/* Arrow */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-px h-4 bg-rh-red" />
            <div className="border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rh-red" />
          </div>
        </div>
        {/* PV row */}
        <div>
          <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">Physical Volumes (PV)</div>
          <div className="grid grid-cols-2 gap-2">
            {['/dev/sdb (200G)', '/dev/sdc (150G)'].map((pv, i) => (
              <div key={i} className="rounded-lg border border-yellow-800 bg-yellow-950/40 px-3 py-2 text-center">
                <div className="text-xs font-semibold text-yellow-300">{pv}</div>
                <div className="text-[10px] text-gray-500">Physical disk or partition with LVM label</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Flow Diagram Data ────────────────────────────────────────────────────────
const lvExtendFlow = [
  { label: 'Add new disk or partition',     sub: 'fdisk /dev/sdc → create partition → type 8e (Linux LVM); or use whole disk', color: 'blue' },
  { label: 'Create Physical Volume',        sub: 'pvcreate /dev/sdc1 — writes LVM label + PV UUID to disk header',              color: 'blue' },
  { label: 'Extend the Volume Group',       sub: 'vgextend vg_data /dev/sdc1 — adds PEs from new PV to existing VG',            color: 'purple' },
  { label: 'Extend the Logical Volume',     sub: 'lvextend -L +50G /dev/vg_data/lv_home  OR  lvextend -l +100%FREE /dev/vg_data/lv_home', color: 'purple' },
  { label: 'Resize the filesystem online',  sub: 'ext4: resize2fs /dev/vg_data/lv_home  |  XFS: xfs_growfs /home  (no unmount needed!)', color: 'green' },
  { label: 'Verify',                        sub: 'df -h /home — should show new size; lvs confirms LV size; pvs confirms PV used', color: 'green' },
]

const diskFailureFlow = [
  { label: 'Symptom: I/O errors or slow performance',  sub: 'dmesg -T shows "blk_update_request: I/O error" or "ata1: EH in SRST"; application timeouts', color: 'red' },
  { label: 'Check SMART data',               sub: 'smartctl -a /dev/sda — look at Reallocated_Sector_Ct, Current_Pending_Sector, Offline_Uncorrectable', color: 'yellow' },
  { label: 'Check kernel I/O statistics',    sub: 'iostat -x 1 — look for %util approaching 100%, high await (>10ms for HDD, >1ms for SSD)', color: 'yellow' },
  { label: 'Check filesystem integrity',     sub: 'If ext4: e2fsck -n /dev/sda1 (read-only check); if XFS: xfs_repair -n /dev/sda1', color: 'blue' },
  { label: 'Check RAID / LVM health',        sub: 'cat /proc/mdstat; mdadm --detail /dev/md0; lvs; pvs — look for "failed" or "partial" state', color: 'blue' },
  { label: 'Replace failed component',       sub: 'mdadm --manage /dev/md0 --remove /dev/sdb1; replace disk; mdadm --manage /dev/md0 --add /dev/sdc1', color: 'purple' },
  { label: 'Repair or restore data',         sub: 'fsck after mdadm sync completes; restore from backup if fs corrupted beyond repair',              color: 'green' },
]

// ─── Command table data ───────────────────────────────────────────────────────
const storageCmdRows = [
  { cmd: 'iostat -x 1 5',              desc: 'Extended I/O stats every 1s for 5 iterations',          note: 'Key cols: r/s w/s %util await aqu-sz' },
  { cmd: 'iotop -ao',                  desc: 'Accumulative I/O per process (requires root)',           note: '-o shows only processes with I/O' },
  { cmd: 'blktrace -d /dev/sda -o -',  desc: 'Block-level I/O trace on device',                       note: 'Pipe to blkparse; use btrace wrapper' },
  { cmd: 'cat /sys/block/sda/stat',    desc: 'Raw I/O statistics from sysfs (11 fields)',              note: 'Fields: reads merges sectors ms-read writes...' },
  { cmd: 'lsblk -f',                   desc: 'List block devices with filesystem type, UUID, mountpoint', note: '-o NAME,SIZE,TYPE,UUID,MOUNTPOINT' },
  { cmd: 'blkid',                      desc: 'Print block device attributes (UUID, TYPE, PARTUUID)',   note: 'Used by systemd to generate mount units' },
  { cmd: 'e2fsck -f /dev/sda1',        desc: 'Force full ext4 filesystem check (device must be unmounted)', note: '-n = read-only check; -p = auto-fix safe issues' },
  { cmd: 'xfs_repair /dev/sda1',       desc: 'Repair XFS filesystem (device must be unmounted)',       note: '-n = check only; -L = force log zeroing (last resort)' },
  { cmd: 'xfs_check /dev/sda1',        desc: 'Check XFS consistency (deprecated — use xfs_repair -n)', note: 'Available on older RHEL versions' },
  { cmd: 'tune2fs -l /dev/sda1',       desc: 'Show ext4 superblock information',                       note: 'Shows mount count, last check, reserved blocks' },
  { cmd: 'tune2fs -i 0 -c 0 /dev/sda1', desc: 'Disable automatic fsck interval and mount-count checks', note: 'Useful for VMs; not recommended for production HDDs' },
  { cmd: 'dumpe2fs /dev/sda1',         desc: 'Dump full ext4 superblock and block group info',          note: 'Very verbose; grep for specific fields' },
  { cmd: 'pvs / pvdisplay',            desc: 'List Physical Volumes (short / detailed)',               note: 'pvdisplay -m shows physical extent allocation map' },
  { cmd: 'vgs / vgdisplay',            desc: 'List Volume Groups (short / detailed)',                  note: 'Shows free PE, total PE, VG size' },
  { cmd: 'lvs / lvdisplay',            desc: 'List Logical Volumes (short / detailed)',                note: 'lvs -a shows hidden internal volumes' },
  { cmd: 'pvcreate /dev/sdb',          desc: 'Initialize disk as a Physical Volume',                   note: 'Writes LVM label; destroys existing data' },
  { cmd: 'vgcreate vg1 /dev/sdb',      desc: 'Create Volume Group from one or more PVs',              note: '-s 4M sets Physical Extent size (default 4MB)' },
  { cmd: 'lvcreate -L 20G -n lv1 vg1', desc: 'Create 20G Logical Volume named lv1 in vg1',           note: '-l 100%FREE uses all remaining space' },
  { cmd: 'lvextend -L +10G /dev/vg1/lv1', desc: 'Extend LV by 10G (filesystem resize needed separately)', note: '-r auto-resizes filesystem if supported' },
  { cmd: 'pvmove /dev/sdb1',           desc: 'Migrate PE data off a PV to other PVs in VG',           note: 'Live migration; used before vgreduce' },
  { cmd: 'vgreduce vg1 /dev/sdb1',     desc: 'Remove a PV from a VG (after pvmove)',                  note: 'Then pvremove to wipe the LVM label' },
  { cmd: 'mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sd{b,c}', desc: 'Create RAID-1 mirror across two disks', note: '--metadata=1.2 is default on modern RHEL' },
  { cmd: 'mdadm --detail /dev/md0',    desc: 'Show RAID array status, member disks, rebuild progress', note: 'Check "State:" line: clean / degraded / recovering' },
  { cmd: 'cat /proc/mdstat',           desc: 'Quick summary of all md arrays and rebuild progress',   note: 'Watch live: watch -d cat /proc/mdstat' },
  { cmd: 'smartctl -a /dev/sda',       desc: 'Full SMART report: attributes, errors, self-test logs', note: 'Key: Reallocated_Sector_Ct > 0 means disk failure imminent' },
  { cmd: 'smartctl -t short /dev/sda', desc: 'Start short SMART self-test (~2 minutes)',              note: '-t long runs a full surface scan (hours)' },
  { cmd: 'df -h',                      desc: 'Human-readable filesystem usage (space)',               note: '-i shows inode usage instead of blocks' },
  { cmd: 'df -i',                      desc: 'Inode usage — critical for inode exhaustion diagnosis', note: '100% Use% with space available = inode exhaustion' },
  { cmd: 'du -sh /path',               desc: 'Show disk usage of a directory',                        note: '-x stays on one filesystem; --max-depth=1 lists subdirs' },
  { cmd: 'findmnt',                    desc: 'Show mount table as tree; includes mount options',       note: '--verify checks /etc/fstab validity' },
  { cmd: 'mount -o remount,rw /',      desc: 'Remount root filesystem read-write (recovery mode)',    note: 'Or: mount -o remount,noatime /data' },
  { cmd: 'xfs_growfs /mountpoint',     desc: 'Grow mounted XFS filesystem online (after lvextend)',   note: 'XFS cannot shrink; shrink requires backup/restore' },
  { cmd: 'resize2fs /dev/vg1/lv1',     desc: 'Grow/shrink ext4 filesystem (after lvextend/lvreduce)', note: 'Can resize online for grow; unmount required to shrink' },
  { cmd: 'nfsstat -c',                 desc: 'NFS client statistics — RPC call counts and errors',    note: '-s for server; -m for mount stats' },
  { cmd: 'showmount -e nfs-server',    desc: 'List exports available on NFS server',                  note: 'Requires rpcbind/portmapper accessible' },
]

// ─── Code Snippets ───────────────────────────────────────────────────────────
const iostatOutput = `# iostat -x 1 — extended statistics (1-second interval)
# Install: dnf install sysstat

iostat -x 1 5
# Linux 5.14.0-427.el9.x86_64 (server01)  01/15/2024  _x86_64_  (8 CPU)
#
# avg-cpu:  %user   %nice %system %iowait  %steal   %idle
#            2.34    0.00    1.12   15.43    0.00   81.11
#
# Device     r/s    rkB/s  rrqm/s  %rrqm  r_await rareq-sz  w/s   wkB/s  wrqm/s  %wrqm  w_await wareq-sz  d/s  dkB/s  f/s  aqu-sz  %util
# sda       45.2  1843.2     0.8   1.7%    12.4    40.8    23.1   512.0     3.2   12.2%    8.2    22.1   0.0    0.0  0.0    0.85   78.3
# sdb        2.1    85.4     0.1   4.5%     0.8    40.7     1.2    48.8     0.8   40.0%    0.4    40.7   0.0    0.0  0.0    0.01    0.3

# ── Key columns ──────────────────────────────────────────────────────────────
# r/s w/s      — read/write operations per second (IOPS)
# rkB/s wkB/s  — kilobytes read/written per second (throughput)
# r_await      — average read service time in ms (queue + device)
#                HDD: normal <10ms; >20ms indicates saturation
#                SSD: normal <1ms; NVMe: <0.5ms
# w_await      — average write service time in ms
# aqu-sz       — average I/O queue depth (formerly avgqu-sz)
#                >4 on HDD = saturated; >32 on NVMe = very busy
# %util        — device utilization
#                100% = device is saturated (for single-queue HDD)
#                NVMe may reach 100% while still having headroom (parallel queues)
# rrqm/s wrqm/s — requests merged per second (OS-level merging in I/O scheduler)

# ── iotop: per-process I/O ───────────────────────────────────────────────────
iotop -ao
# Total DISK READ:  45.23 M/s | Total DISK WRITE:  12.54 M/s
# Current DISK READ: 45.23 M/s | Current DISK WRITE:  12.54 M/s
#   TID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND
#  8421 be/4 oracle      44.23 M/s  0.00 B/s   0.00 %  98.23 % ora_dbwr_PROD
#   312 be/3 root         1.00 M/s  1.23 M/s   0.00 %   4.12 % [jbd2/sda1-8]
# -a = accumulative (total since start, not current rate)`

const blktraceUsage = `# blktrace — trace block layer I/O events at the kernel level
# Requires debugfs mounted: mount -t debugfs debugfs /sys/kernel/debug

# Simple trace of sda, output to terminal:
btrace /dev/sda

# Full trace to files (creates sda.blktrace.0, sda.blktrace.1, ... per CPU)
blktrace -d /dev/sda -o sda_trace
# Press Ctrl-C to stop

# Parse the binary trace files:
blkparse -i sda_trace -o sda_trace.txt

# Combined one-step:
blktrace -d /dev/sda -o - | blkparse -i -

# Sample blkparse output:
# 8,0   0   1  0.000000000  1234  Q  WS 2097152 + 8 [mysqld]
# 8,0   0   2  0.000001234  1234  G  WS 2097152 + 8 [mysqld]
# 8,0   0   3  0.000001890  1234  I  WS 2097152 + 8 [mysqld]
# 8,0   0   4  0.000002100     0  D  WS 2097152 + 8 [mysqld]
# 8,0   0   5  0.000005678     0  C  WS 2097152 + 8   0
# ^     ^   ^  ^              ^   ^  ^  ^        ^ ^
# dev   cpu seq timestamp     pid act rwf sector  + size

# Action codes:
# Q = queued to block layer     G = get request
# I = inserted to queue         D = dispatched to driver
# C = completed                 M = merged with other request
# R/W/S/D = read/write/sync/discard flags

# btt — analyze blktrace output for latency breakdown
btt -i sda_trace.bin | head -50`

const fscheckRepair = `# ─── ext4 filesystem check and repair ──────────────────────────────────────

# IMPORTANT: fsck/e2fsck requires the filesystem to be UNMOUNTED or read-only
# Exception: you can check a mounted fs with -n (read-only, no changes)

# Read-only check (safe on mounted filesystem):
e2fsck -n /dev/sda1

# Force check even if filesystem appears clean:
e2fsck -f /dev/sda1

# Automatically repair obvious errors (non-interactive):
e2fsck -p /dev/sda1     # "preen" mode — fix only obvious issues

# Interactive repair (answers y to all prompts — USE WITH CAUTION):
e2fsck -y /dev/sda1

# Full verbose check with progress:
e2fsck -fv /dev/sda1

# Check after specific number of mounts (tune2fs):
tune2fs -c 20 /dev/sda1     # check every 20 mounts
tune2fs -i 30d /dev/sda1    # check every 30 days
tune2fs -c 0 -i 0 /dev/sda1 # disable both (for LVM volumes managed externally)

# Show ext4 superblock info:
tune2fs -l /dev/sda1
# Filesystem magic number:  0xEF53
# Filesystem OS type:       Linux
# Inode count:              1310720
# Block count:              5242880
# Reserved block count:     262144    # root reserve (5% default)
# Free blocks:              3891234
# Free inodes:              1298441
# Mount count:              14
# Maximum mount count:      -1
# Last checked:             Tue Jan  9 10:23:41 2024
# Check interval:           0 (<none>)
# Reserved blocks uid:      0 (user root)

# ─── XFS filesystem check and repair ────────────────────────────────────────

# Read-only check (UNMOUNTED required even for -n):
xfs_repair -n /dev/sdb1

# Repair (unmounted):
xfs_repair /dev/sdb1

# If log is dirty (unclean shutdown), may need to zero log:
# WARNING: -L can cause data loss — only if xfs_repair says log is bad
xfs_repair -L /dev/sdb1

# XFS metadata dump (for support/analysis):
xfs_metadump /dev/sdb1 /tmp/sdb1.metadump

# XFS filesystem info:
xfs_info /mountpoint          # or xfs_info /dev/sdb1 (if unmounted)
# meta-data=/dev/sdb1  isize=512  agcount=4, agsize=655360 blks
#          =           sectsz=512 attr=2, projid32bit=1
#          =           crc=1      finobt=1, sparse=1, rmapbt=0
#          =           reflink=1
# data     =           bsize=4096 blocks=2621440, imaxpct=25
# naming   =version 2  bsize=4096 ascii-ci=0, ftype=1
# log      =internal   bsize=4096 blocks=2560, version=2
# realtime =none       extsz=4096 blocks=0, rtextents=0`

const mkfsMount = `# ─── Creating filesystems ───────────────────────────────────────────────────

# ext4 creation
mkfs.ext4 /dev/sdb1
mkfs.ext4 -L "data_disk" /dev/sdb1              # with label
mkfs.ext4 -b 4096 -i 16384 /dev/sdb1            # 4K blocks, one inode per 16K
mkfs.ext4 -m 1 /dev/sdb1                        # 1% reserved for root (default 5%)
mkfs.ext4 -E lazy_itable_init=0 /dev/sdb1       # fully init inode table now (slower format, faster mount)
mkfs.ext4 -E stride=16,stripe_width=64 /dev/sdb1 # RAID stripe hints

# XFS creation
mkfs.xfs /dev/sdb1
mkfs.xfs -L "xfs_data" /dev/sdb1               # with label
mkfs.xfs -f /dev/sdb1                           # force (overwrite existing)
mkfs.xfs -b size=4096 /dev/sdb1                 # 4K block size (default)
mkfs.xfs -i size=512 /dev/sdb1                  # 512-byte inodes (default; 256 is minimum)
mkfs.xfs -d su=64k,sw=4 /dev/sdb1              # RAID stripe unit=64K, width=4 disks

# ─── Important mount options ─────────────────────────────────────────────────
# In /etc/fstab or via mount -o option1,option2

# Performance options:
# noatime       — don't update atime on reads (big win on read-heavy workloads)
# relatime      — only update atime if older than mtime/ctime (default on RHEL)
# nodiratime    — don't update directory access times
# data=writeback— ext4: fastest, metadata journaling only (not data)
# data=ordered  — ext4: DEFAULT; ensures data written before metadata commit
# data=journal  — ext4: safest but slowest; all data journaled

# Safety options:
# barrier=1     — ensures journal commits are flushed (default; set =0 only on battery-backed cache)
# errors=remount-ro — remount read-only on fs errors (safer for data integrity)
# errors=panic      — panic kernel on fs errors (good for servers needing kdump)

# Example fstab with options:
cat /etc/fstab
# UUID=a1b2c3d4-e5f6-7890-abcd-ef1234567890  /data   xfs   defaults,noatime,nofail  0 2
# /dev/vg_app/lv_logs                         /logs   ext4  defaults,data=writeback,noatime  0 2

# nofail — do not fail boot if device is missing (important for removable/SAN)
# _netdev — delay mount until network is up (NFS, iSCSI)

# Mount with options:
mount -o noatime,relatime /dev/sdb1 /data
mount -o remount,rw /data          # remount with new options
mount -o remount,noatime /data     # add noatime to running mount`

const lvmSection = `# ─── Physical Volume operations ──────────────────────────────────────────────
pvcreate /dev/sdb /dev/sdc         # initialize as PVs
pvremove /dev/sdb                  # remove LVM label (VG must be removed first)
pvs                                # short listing
pvdisplay /dev/sdb                 # detailed view
pvdisplay -m /dev/sdb              # show extent allocation map
pvscan                             # scan all block devices for PVs

# ─── Volume Group operations ──────────────────────────────────────────────────
vgcreate vg_data /dev/sdb /dev/sdc          # create VG spanning two PVs
vgextend vg_data /dev/sdd                   # add PV to existing VG
vgreduce vg_data /dev/sdc                   # remove PV (must be empty — pvmove first)
vgdisplay vg_data
vgs
vgrename vg_data vg_newname                 # rename a VG
vgchange -ay vg_data                        # activate all LVs in VG
vgchange -an vg_data                        # deactivate all LVs in VG
vgremove vg_data                            # remove entire VG (all LVs must be removed first)

# ─── Logical Volume creation ──────────────────────────────────────────────────
lvcreate -L 20G   -n lv_home vg_data         # fixed size
lvcreate -l 50%VG -n lv_data vg_data         # 50% of VG space
lvcreate -l 100%FREE -n lv_scratch vg_data   # all remaining free space
lvcreate -i 2 -I 64 -L 40G -n lv_striped vg_data  # striped LV (2 stripes, 64K chunk)
lvcreate -m 1 -L 20G -n lv_mirror vg_data    # mirrored LV (internal RAID-1)

# Thin provisioning (over-commit storage):
lvcreate -L 100G --thinpool vg_data/tpool   # create thin pool
lvcreate -V 500G --thin -n lv_thinvol vg_data/tpool  # thin LV (500G virtual)
lvs --all -o lv_name,lv_size,data_percent,metadata_percent vg_data  # check pool usage

# ─── Extending (live, no unmount needed) ──────────────────────────────────────
lvextend -L +10G /dev/vg_data/lv_home            # add 10G
lvextend -L 30G  /dev/vg_data/lv_home            # set absolute size to 30G
lvextend -l +100%FREE /dev/vg_data/lv_home       # use all free space

# Resize filesystem immediately after extend:
# ext4:
resize2fs /dev/vg_data/lv_home
# XFS (must be mounted):
xfs_growfs /home
# Or use -r flag on lvextend to do both:
lvextend -L +10G -r /dev/vg_data/lv_home

# ─── Reducing an LV (ext4 only — XFS cannot shrink) ──────────────────────────
# MUST unmount first; process is reverse of extending
umount /home
e2fsck -f /dev/vg_data/lv_home            # check first — mandatory
resize2fs /dev/vg_data/lv_home 25G        # shrink filesystem FIRST
lvreduce -L 25G /dev/vg_data/lv_home      # then shrink the LV
mount /home

# ─── pvmove — migrate data off a PV ──────────────────────────────────────────
pvmove /dev/sdb                            # move all extents off sdb to other PVs
pvmove /dev/sdb /dev/sdc                   # specify destination
pvmove /dev/vg_data/lv_data:0-499 /dev/sdc # move specific extent range
# pvmove runs in background; check with pvs / lvs / pvscan
# Can be interrupted: pvmove --abort; resume: pvmove (restarts automatically)

# ─── Snapshots ────────────────────────────────────────────────────────────────
lvcreate -L 5G -s -n lv_home_snap /dev/vg_data/lv_home  # COW snapshot
lvs -a                                     # check snapshot space usage
mount -o ro /dev/vg_data/lv_home_snap /mnt/snap  # mount snapshot read-only
lvremove /dev/vg_data/lv_home_snap         # remove snapshot when done`

const raidSection = `# ─── RAID levels summary ────────────────────────────────────────────────────
# RAID 0: stripe — no redundancy; max performance; N disks; any disk loss = data loss
# RAID 1: mirror — full redundancy; N/2 usable; survive N/2 disk failures
# RAID 5: stripe+parity — 1 parity disk; N-1 usable; survive 1 disk failure
# RAID 6: stripe+dual parity — 2 parity; N-2 usable; survive 2 disk failures
# RAID 10: mirror+stripe — combines 1+0; min 4 disks; N/2 usable; best for performance+redundancy

# ─── Creating RAID arrays with mdadm ─────────────────────────────────────────
# RAID 1 (mirror) with 2 disks:
mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc

# RAID 5 with 3 disks:
mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sdb /dev/sdc /dev/sdd

# RAID 6 with 4 disks + 1 spare:
mdadm --create /dev/md0 --level=6 --raid-devices=4 --spare-devices=1 \\
      /dev/sdb /dev/sdc /dev/sdd /dev/sde /dev/sdf

# RAID 10 with 4 disks:
mdadm --create /dev/md0 --level=10 --raid-devices=4 /dev/sd{b,c,d,e}

# With explicit metadata version (1.2 is default on RHEL 8/9):
mdadm --create /dev/md0 --level=1 --raid-devices=2 --metadata=1.2 \\
      /dev/sdb /dev/sdc

# ─── Array management ────────────────────────────────────────────────────────
mdadm --detail /dev/md0
# /dev/md0:
#           Version : 1.2
#     Creation Time : Mon Jan 15 10:23:41 2024
#        Raid Level : raid1
#        Array Size : 209584128 (199.85 GiB 214.61 GB)
#     Used Dev Size : 209584128 (199.85 GiB 214.61 GB)
#      Raid Devices : 2
#     Total Devices : 2
#       Persistence : Superblock is persistent
#       Update Time : Mon Jan 15 14:45:22 2024
#             State : clean           <-- clean/degraded/recovering/resync
#    Active Devices : 2
#   Working Devices : 2
#   Failed Devices : 0
#    Spare Devices : 0
# ...
#     Number   Major   Minor   RaidDevice State
#        0       8       16        0      active sync   /dev/sdb
#        1       8       32        1      active sync   /dev/sdc

mdadm --examine /dev/sdb    # examine RAID superblock on a member disk
mdadm --scan                # detect all arrays from disk superblocks

# /proc/mdstat quick view:
cat /proc/mdstat
# Personalities : [raid1] [raid5] [raid6]
# md0 : active raid1 sdb[0] sdc[1]
#       209584128 blocks super 1.2 [2/2] [UU]
#       ^ [UU] means both disks UP; [U_] = one missing (degraded)
#
# md1 : active raid5 sdd[0] sde[1] sdf[2]
#       419168256 blocks super 1.2 level 5, 512k chunk, algorithm 2 [3/2] [UU_]
#       [===>.................]  recovery =  16.5% (34506748/209584128) finish=14.2min speed=200M/s

# ─── Failure and recovery ────────────────────────────────────────────────────
# Mark disk as failed (e.g., before hot-removal):
mdadm --manage /dev/md0 --fail /dev/sdb
# Remove failed disk from array:
mdadm --manage /dev/md0 --remove /dev/sdb
# Add replacement disk (hot-spare or new disk):
mdadm --manage /dev/md0 --add /dev/sdd

# ─── Persist array configuration ──────────────────────────────────────────────
# Generate /etc/mdadm.conf:
mdadm --detail --scan >> /etc/mdadm.conf
# Or specifically:
mdadm --detail --scan /dev/md0 >> /etc/mdadm.conf

# Regenerate initramfs so array assembles at boot:
dracut -f
# or:
dracut --regenerate-all`

const smartSection = `# ─── SMART — Self-Monitoring, Analysis and Reporting Technology ──────────────
# Package: smartmontools
dnf install smartmontools

# Full SMART report:
smartctl -a /dev/sda
# === START OF INFORMATION SECTION ===
# Device Model:     WDC WD2003FZEX-00SRLA0
# Serial Number:    WD-WCC1T0ABCDEF
# Firmware Version: 01.01A01
# User Capacity:    2,000,398,934,016 bytes [2.00 TB]
# Sector Size:      512 bytes logical/physical
# SMART support is: Enabled
#
# === START OF READ SMART DATA SECTION ===
# SMART overall-health self-assessment test result: PASSED
#
# ID# ATTRIBUTE_NAME          FLAG  VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
#   1 Raw_Read_Error_Rate     0x000f   98   98    006   Pre-fail  Always       -       0
#   3 Spin_Up_Time            0x0003   98   98    000   Pre-fail  Always       -       6016
#   5 Reallocated_Sector_Ct   0x0033  200  200    140   Pre-fail  Always       -       0   <-- CRITICAL: >0 = sectors going bad
#   9 Power_On_Hours          0x0032   88   88    000   Old_age   Always       -       8920
#  10 Spin_Retry_Count        0x0013  100  100    097   Pre-fail  Always       -       0
#  12 Power_Cycle_Count       0x0032   99   99    020   Old_age   Always       -       823
# 183 Runtime_Bad_Block       0x0032  100  100    000   Old_age   Always       -       0
# 187 Reported_Uncorrect      0x0032  100  100    000   Old_age   Always       -       0   <-- >0 = uncorrectable errors
# 188 Command_Timeout         0x0032  100  100    000   Old_age   Always       -       0
# 190 Airflow_Temperature_Cel 0x0022   72   61    045   Old_age   Always       -       28
# 196 Reallocated_Event_Count 0x0032  200  200    000   Old_age   Always       -       0
# 197 Current_Pending_Sector  0x0012  200  200    000   Old_age   Always       -       0   <-- >0 = unstable sectors
# 198 Offline_Uncorrectable   0x0030  200  200    000   Old_age   Offline      -       0   <-- >0 = disk failing
# 199 UDMA_CRC_Error_Count    0x003e  200  200    000   Old_age   Always       -       0   <-- >0 = cable/controller issue

# Run self-tests:
smartctl -t short /dev/sda    # ~2 minutes
smartctl -t long /dev/sda     # full surface scan (hours for large disks)
smartctl -t conveyance /dev/sda  # tests after shipping (some disks only)

# View self-test results:
smartctl -l selftest /dev/sda

# For NVMe drives:
smartctl -a /dev/nvme0
nvme smart-log /dev/nvme0     # native NVMe tool (nvme-cli package)

# ─── smartd daemon ───────────────────────────────────────────────────────────
# /etc/smartd.conf
# DEVICESCAN -d removable -n standby -m admin@example.com -M exec /usr/libexec/smartmontools/smartdnotify

# Monitor specific disk:
# /dev/sda -a -o on -S on -s (S/../.././02|L/../../6/03) -m root

# Enable and start smartd:
systemctl enable --now smartd

# Test alerting:
smartctl --tolerance=verypermissive -t offline /dev/sda`

const partitionSection = `# ─── fdisk — MBR partition tables (up to 2TB, max 4 primary) ─────────────────
fdisk /dev/sdb
# Commands: n=new, d=delete, p=print, t=type, w=write, q=quit, g=convert to GPT
# Common types: 83=Linux, 82=swap, 8e=Linux LVM, fd=Linux RAID auto, ee=GPT

# Script-friendly with sfdisk:
echo "type=83, size=20G" | sfdisk /dev/sdb  # create one partition

# ─── gdisk — GPT partition tables (recommended; required for >2TB) ────────────
gdisk /dev/sdb
# Commands same as fdisk plus: r=recovery, x=expert
# Common GUIDs: 8300=Linux, 8200=swap, 8e00=Linux LVM, fd00=Linux RAID

# Or use parted (supports both MBR and GPT, scriptable):
parted /dev/sdb -- mklabel gpt
parted /dev/sdb -- mkpart primary 1MiB 21GiB        # 20G partition
parted /dev/sdb -- mkpart primary 21GiB 100%         # rest of disk
parted /dev/sdb -- set 1 lvm on                      # set LVM flag
parted /dev/sdb print                                # show partition table

# Non-interactive parted:
parted -s /dev/sdb mklabel gpt mkpart primary ext4 1MiB 100%

# After partitioning, inform kernel of new partition table:
partprobe /dev/sdb        # re-read partition table without reboot
udevadm settle            # wait for udev to process events (device nodes created)`

const nfsSection = `# ─── NFS client troubleshooting ──────────────────────────────────────────────

# Check NFS server exports:
showmount -e nfs-server.example.com
# Export list for nfs-server.example.com:
# /data/exports/public     *
# /data/exports/restricted 192.168.1.0/24

# Mount NFS share:
mount -t nfs nfs-server.example.com:/data/exports/public /mnt/nfs
mount -t nfs4 nfs-server.example.com:/exports/data /mnt/nfs4  # force NFSv4

# Persistent mount in /etc/fstab:
# nfs-server:/data  /mnt/nfs  nfs  defaults,_netdev,nofail,soft,timeo=30,retrans=3  0 0

# ─── NFS mount options for reliability ────────────────────────────────────────
# hard (default) — retries indefinitely; app blocks (hangs) if server unreachable
# soft            — returns error after retrans retries; can cause data corruption
# timeo=<n>       — timeout in tenths of second before retransmit (default: 600 for TCP)
# retrans=<n>     — number of retransmissions before soft-mounting gives error
# nfsvers=4.2     — force specific NFS protocol version
# proto=tcp       — use TCP (default for NFSv4)
# rsize=1048576   — read buffer size (1MB)
# wsize=1048576   — write buffer size (1MB)
# noatime         — don't update access time (big NFS performance gain)
# actimeo=30      — cache attribute results for 30s (reduces server load)

# NFS statistics:
nfsstat -c                         # client statistics
nfsstat -m                         # mount statistics per mountpoint
# Look for: retrans (timeouts), badlen (protocol errors)

# Check portmapper / rpcbind:
rpcinfo -p nfs-server.example.com
# program vers proto   port  service
#    100000    4   tcp    111  portmapper
#    100005    3   tcp  20048  mountd
#    100003    3   tcp   2049  nfs
#    100003    4   tcp   2049  nfs

# RPC troubleshooting:
rpcinfo -t nfs-server.example.com nfs  # test NFS RPC connectivity
cat /proc/net/rpc/nfs                  # kernel NFS client counters

# Firewall check (server side):
firewall-cmd --list-services | grep nfs
firewall-cmd --add-service=nfs --permanent  # NFSv4 only needs TCP 2049
# NFSv3 also needs: mountd, rpc-bind ports (variable)`

const inodeSection = `# ─── Inode exhaustion diagnosis ──────────────────────────────────────────────
# Symptom: "No space left on device" but df -h shows free space

# Check inode usage:
df -i
# Filesystem      Inodes IUsed  IFree IUse% Mounted on
# /dev/sda1      1310720 1310720     0  100% /          <-- EXHAUSTED
# /dev/sdb1      2621440  984321 1637119  38% /data

# Also check per filesystem:
df -i /var
tune2fs -l /dev/sda1 | grep -i inode

# Find directories hogging inodes (lots of small files):
find /var -xdev -printf '%h\n' | sort | uniq -c | sort -rn | head -20
# Above counts files per directory; most inodes = most files

# Alternative: du with inode count
find / -xdev -type d | while read dir; do
  count=$(find "$dir" -maxdepth 1 -not -type d 2>/dev/null | wc -l)
  echo "$count $dir"
done | sort -rn | head -20

# Common culprits:
# /var/spool/mail — unread mail piling up
# /var/tmp — tmpfiles not cleaned up
# /var/lib/systemd/coredump — accumulated core dumps
# /var/log — log files fragmented into many small chunks
# Application temp directories

# Quick cleanup:
journalctl --vacuum-size=500M        # reduce journal size
rm -rf /var/tmp/old_tmp_files/*      # clear temp files
find /var/spool/mail -maxdepth 1 -type f -mtime +30 -delete  # old mail

# Increasing inodes (ext4 only, must be done at mkfs time or offline):
# You cannot add inodes to an existing ext4 filesystem
# For XFS: inodes are allocated dynamically (inode exhaustion is rare)
# Prevention: mkfs.ext4 -i 4096 /dev/sdb1  (one inode per 4096 bytes — double density)`

// ─── Component ───────────────────────────────────────────────────────────────
export default function StorageDiagnostics() {
  return (
    <div>
      <PageHeader
        icon={HardDrive}
        title="Storage Diagnostics"
        subtitle="Comprehensive storage troubleshooting for EX342: I/O analysis, filesystem check/repair, LVM, software RAID, SMART diagnostics, NFS client issues, and inode exhaustion."
        tags={['iostat', 'LVM', 'mdadm', 'SMART', 'ext4', 'XFS', 'NFS', 'fsck', 'blktrace']}
      />

      {/* ── 1. Storage Stack ── */}
      <SectionTitle>Linux Storage Stack Architecture</SectionTitle>
      <p className="section-body mb-2">
        Storage I/O in Linux passes through a layered stack. Each layer abstracts the one below,
        allowing filesystems to be independent of physical media and device drivers to be
        independent of logical volume management. Understanding this stack tells you where to
        instrument diagnostics.
      </p>
      <StorageStackDiagram />
      <InfoBox type="info" title="Where Problems Hide in the Stack">
        <ul className="list-disc pl-4 space-y-1">
          <li><strong className="text-gray-200">High await in iostat</strong> → Block layer saturation or device failure</li>
          <li><strong className="text-gray-200">Filesystem errors in dmesg</strong> → VFS/FS layer corruption</li>
          <li><strong className="text-gray-200">100% inode use with free space</strong> → VFS/inode table exhausted</li>
          <li><strong className="text-gray-200">md array degraded</strong> → Block layer (dm-md) has a missing member</li>
          <li><strong className="text-gray-200">LV showing wrong size after lvextend</strong> → Filesystem not resized (separate step)</li>
        </ul>
      </InfoBox>

      {/* ── 2. Disk I/O Analysis ── */}
      <SectionTitle>Disk I/O Analysis</SectionTitle>
      <p className="section-body mb-2">
        I/O performance analysis starts with <span className="code-inline">iostat</span> for aggregate
        device statistics, <span className="code-inline">iotop</span> to identify which process is
        causing I/O, and <span className="code-inline">blktrace</span> for deep block-layer tracing
        when you need to understand the exact I/O pattern.
      </p>
      <CodeBlock title="iostat -x — extended statistics with interpretation" code={iostatOutput} />
      <CodeBlock title="blktrace / blkparse — block-layer I/O tracing" code={blktraceUsage} />
      <InfoBox type="exam" title="iostat Exam Essentials">
        <ul className="list-disc pl-4 space-y-1">
          <li><span className="code-inline">%iowait</span> in the CPU section means CPUs are idle waiting for I/O — does NOT mean disk is busy; could be remote NFS</li>
          <li><span className="code-inline">await</span> is the most important column: total time from I/O request to completion (including queue time)</li>
          <li><span className="code-inline">%util</span> near 100% on a spinning disk means it is saturated; on NVMe this is misleading (parallelism hides it)</li>
          <li>Package: <span className="code-inline">sysstat</span>; also provides <span className="code-inline">sar</span></li>
        </ul>
      </InfoBox>

      {/* ── 3. Filesystem Check/Repair ── */}
      <SectionTitle>Filesystem Check and Repair</SectionTitle>
      <p className="section-body mb-2">
        Never run <span className="code-inline">fsck</span> or <span className="code-inline">xfs_repair</span>
        on a mounted filesystem (with write access) — doing so will cause additional corruption.
        Boot to rescue/emergency mode, or remount read-only first.
      </p>
      <CodeBlock title="e2fsck / xfs_repair — check and repair filesystems" code={fscheckRepair} />
      <InfoBox type="danger" title="fsck on Mounted Filesystem">
        Running <span className="code-inline">e2fsck -f /dev/sda1</span> while it is mounted read-write
        will corrupt the filesystem. If you cannot unmount (e.g., root filesystem), boot into rescue
        mode: <span className="code-inline">systemctl rescue</span> or append
        <span className="code-inline">single</span> to kernel command line. For root fs:
        <span className="code-inline">touch /.autorelabel</span> triggers fsck on next boot.
      </InfoBox>
      <InfoBox type="exam" title="ext4 vs XFS Repair Differences">
        <ul className="list-disc pl-4 space-y-1">
          <li>ext4: <span className="code-inline">e2fsck -f</span> to force check; <span className="code-inline">-p</span> for automatic safe repair; <span className="code-inline">-y</span> for yes to all</li>
          <li>XFS: <span className="code-inline">xfs_repair -n</span> for check; no flags = repair; <span className="code-inline">-L</span> forces log zeroing (data loss risk)</li>
          <li>XFS journal replay happens automatically on <span className="code-inline">mount</span> — if mount fails, THEN run <span className="code-inline">xfs_repair</span></li>
          <li>XFS can NOT shrink; ext4 can shrink but must unmount and run <span className="code-inline">e2fsck</span> first</li>
        </ul>
      </InfoBox>

      {/* ── 4. Filesystem Creation and Mount Options ── */}
      <SectionTitle>Filesystem Creation and Mount Options</SectionTitle>
      <CodeBlock title="mkfs.ext4 / mkfs.xfs and mount options" code={mkfsMount} />
      <InfoBox type="tip" title="Choosing ext4 vs XFS on RHEL">
        RHEL 9 default root filesystem is XFS. Use <strong className="text-gray-200">XFS</strong> for:
        large filesystems (&gt;16TB), high-throughput workloads, database servers. Use
        <strong className="text-gray-200">ext4</strong> for: small filesystems, environments requiring
        shrinking, or where ext4 tooling is more familiar. Both are journaling filesystems with
        comparable reliability.
      </InfoBox>

      {/* ── 5. LVM ── */}
      <SectionTitle>LVM — Logical Volume Management</SectionTitle>
      <p className="section-body mb-2">
        LVM provides flexible storage management by abstracting physical disks (PV) into a pool
        (VG) from which logical volumes (LV) are carved. Key advantage: LVs can be extended online,
        snapshots created, and storage migrated live with <span className="code-inline">pvmove</span>.
      </p>
      <LvmDiagram />
      <CodeBlock title="LVM — full reference: PV, VG, LV operations" code={lvmSection} />

      <SubTitle>LVM Extension Workflow</SubTitle>
      <FlowDiagram
        title="Extending an LV Live (no downtime)"
        steps={lvExtendFlow}
      />

      <InfoBox type="exam" title="LVM Exam Must-Knows">
        <ul className="list-disc pl-4 space-y-1">
          <li>Extend order: <strong className="text-gray-200">pvcreate → vgextend → lvextend → resize2fs/xfs_growfs</strong></li>
          <li>Shrink order (ext4 only): <strong className="text-gray-200">umount → e2fsck → resize2fs → lvreduce → mount</strong></li>
          <li><span className="code-inline">lvextend -r</span> auto-resizes the filesystem — but know how to do each step separately</li>
          <li>XFS filesystems <strong className="text-gray-200">cannot be shrunk</strong> — this is a common exam trick</li>
          <li>Thin pools: watch <span className="code-inline">data_percent</span> in <span className="code-inline">lvs</span> — if 100%, new writes fail silently</li>
          <li><span className="code-inline">pvmove</span> can be run while the filesystem is mounted and active — it is live migration</li>
        </ul>
      </InfoBox>

      {/* ── 6. Software RAID ── */}
      <SectionTitle>Software RAID with mdadm</SectionTitle>
      <p className="section-body mb-2">
        Linux software RAID (<span className="code-inline">md</span> — multiple device driver)
        provides RAID functionality in software, independent of hardware. For EX342, focus on
        RAID 1 and RAID 5 creation, degraded array recovery, and reading
        <span className="code-inline">/proc/mdstat</span>.
      </p>
      <CodeBlock title="mdadm — RAID creation, management, failure recovery" code={raidSection} />
      <InfoBox type="warning" title="RAID is Not a Backup">
        RAID 1/5/6 protects against disk failure but NOT against accidental deletion, filesystem
        corruption, or ransomware. A file deleted on a RAID-1 array is deleted on both mirrors.
        Always maintain separate backups.
      </InfoBox>
      <InfoBox type="exam" title="mdadm Exam Tips">
        <ul className="list-disc pl-4 space-y-1">
          <li><span className="code-inline">/proc/mdstat</span> <span className="code-inline">[UU]</span> = healthy, <span className="code-inline">[U_]</span> = one disk missing (degraded)</li>
          <li>Rebuild progress shown live: <span className="code-inline">watch cat /proc/mdstat</span></li>
          <li>Must update <span className="code-inline">/etc/mdadm.conf</span> and run <span className="code-inline">dracut -f</span> for RAID to assemble at boot</li>
          <li>RAID 5 minimum 3 disks, survives 1 failure; RAID 6 minimum 4 disks, survives 2 failures</li>
          <li>A hot spare (<span className="code-inline">--spare-devices</span>) auto-joins rebuild when a member fails</li>
        </ul>
      </InfoBox>

      {/* ── 7. SMART ── */}
      <SectionTitle>SMART Diagnostics</SectionTitle>
      <p className="section-body mb-2">
        SMART (Self-Monitoring, Analysis and Reporting Technology) is firmware-level monitoring
        built into HDDs, SSDs, and NVMe drives. The key attributes to watch are
        <span className="code-inline">Reallocated_Sector_Ct</span>,
        <span className="code-inline">Current_Pending_Sector</span>, and
        <span className="code-inline">Offline_Uncorrectable</span>. Any non-zero value in these
        is a strong indicator of impending disk failure.
      </p>
      <CodeBlock title="smartctl — full report, self-tests, smartd daemon" code={smartSection} />
      <InfoBox type="exam" title="SMART Attribute Interpretation">
        <ul className="list-disc pl-4 space-y-1">
          <li><span className="code-inline">Reallocated_Sector_Ct &gt; 0</span> — bad sectors remapped to spare area; disk is failing</li>
          <li><span className="code-inline">Current_Pending_Sector &gt; 0</span> — unstable sectors awaiting reallocation; read errors likely</li>
          <li><span className="code-inline">Offline_Uncorrectable &gt; 0</span> — sectors that could not be recovered; data likely lost</li>
          <li><span className="code-inline">UDMA_CRC_Error_Count &gt; 0</span> — cable, connector, or controller problem (not disk itself)</li>
          <li>Overall health: <span className="code-inline">smartctl -H /dev/sda</span> — PASSED or FAILED</li>
        </ul>
      </InfoBox>

      {/* ── 8. Partitioning ── */}
      <SectionTitle>Disk Partitioning</SectionTitle>
      <p className="section-body mb-2">
        Use <span className="code-inline">gdisk</span> (GPT) for all new deployments — MBR
        (<span className="code-inline">fdisk</span>) is limited to 2TB and 4 primary partitions.
        <span className="code-inline">parted</span> supports both and is scriptable.
      </p>
      <CodeBlock title="fdisk / gdisk / parted — partitioning reference" code={partitionSection} />

      {/* ── 9. NFS ── */}
      <SectionTitle>NFS Client Troubleshooting</SectionTitle>
      <p className="section-body mb-2">
        NFS client issues commonly manifest as stale mount points, permission errors, or
        performance problems. The key tools are <span className="code-inline">showmount</span>,
        <span className="code-inline">rpcinfo</span>, <span className="code-inline">nfsstat</span>,
        and careful attention to mount options.
      </p>
      <CodeBlock title="NFS client — mounting, options, statistics, troubleshooting" code={nfsSection} />
      <InfoBox type="warning" title="NFS hard vs soft Mounts">
        <span className="code-inline">hard</span> mounts (default) hang indefinitely if the server
        is unreachable — applications block in <span className="code-inline">D</span> state (uninterruptible sleep).
        <span className="code-inline">soft</span> mounts return errors but risk data corruption on
        write failures. For most production NFS use <span className="code-inline">hard,timeo=30,retrans=3</span>
        and ensure <span className="code-inline">nofail</span> is set to prevent boot failure if
        server is down.
      </InfoBox>

      {/* ── 10. Inode Exhaustion ── */}
      <SectionTitle>Inode Exhaustion</SectionTitle>
      <p className="section-body mb-2">
        Inode exhaustion causes "No space left on device" errors even when
        <span className="code-inline">df -h</span> shows free space. This happens when a filesystem
        has created the maximum number of inodes (one per file/directory). It is common in
        <span className="code-inline">/var</span> with many small files (mail spools, temp files,
        log fragments).
      </p>
      <CodeBlock title="Inode exhaustion — detection and remediation" code={inodeSection} />
      <InfoBox type="exam" title="Inode Exhaustion Exam Scenario">
        If asked "the application cannot create files but df -h shows 50% free" — immediately run
        <span className="code-inline">df -i</span>. If inodes are 100%, find the offending directory
        with <span className="code-inline">find / -xdev -printf '%h\n' | sort | uniq -c | sort -rn | head -20</span>.
        For ext4, inodes cannot be added after creation — you must move data to a new filesystem
        with more inodes or delete files. XFS allocates inodes dynamically and is immune to this.
      </InfoBox>

      {/* ── 11. Disk Failure Flow ── */}
      <SectionTitle>Disk Failure Investigation Workflow</SectionTitle>
      <FlowDiagram
        title="Storage Failure Investigation Workflow"
        steps={diskFailureFlow}
      />

      {/* ── 12. Command Reference ── */}
      <SectionTitle>Storage Diagnostics Command Reference</SectionTitle>
      <CommandTable
        title="All Storage Diagnostic Commands"
        rows={storageCmdRows}
      />

      <InfoBox type="exam" title="Final Exam Checklist — Storage">
        <ul className="list-disc pl-4 space-y-1">
          <li>Know the LV extension chain: <span className="code-inline">pvcreate → vgextend → lvextend → xfs_growfs / resize2fs</span></li>
          <li>XFS cannot shrink; ext4 can shrink offline only</li>
          <li><span className="code-inline">df -i</span> for inode exhaustion; <span className="code-inline">df -h</span> for space</li>
          <li>SMART: <span className="code-inline">Reallocated_Sector_Ct / Current_Pending_Sector / Offline_Uncorrectable</span> — any &gt;0 is critical</li>
          <li>mdadm arrays need <span className="code-inline">/etc/mdadm.conf</span> updated + <span className="code-inline">dracut -f</span> to survive reboots</li>
          <li>NFS: <span className="code-inline">_netdev</span> in fstab delays mount until network up; <span className="code-inline">nofail</span> prevents boot failure</li>
          <li><span className="code-inline">iostat -x</span> fields: <span className="code-inline">await</span> (latency), <span className="code-inline">%util</span> (saturation), <span className="code-inline">aqu-sz</span> (queue depth)</li>
          <li>Never run fsck/xfs_repair on a mounted R/W filesystem</li>
        </ul>
      </InfoBox>
    </div>
  )
}
