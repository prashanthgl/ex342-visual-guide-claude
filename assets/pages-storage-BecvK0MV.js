import{j as e,P as l,I as t,C as a,F as n,a as c}from"./pages-core-DfOgVUf4.js";import{H as p,M as u,A as h}from"./vendor-ui-CobY6wdR.js";function r({children:s}){return e.jsxs("h2",{className:"section-title mt-10 mb-3",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),s]})}function f({children:s}){return e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mt-6 mb-2",children:s})}function g(){const s=[{label:"Application",sub:"open(), read(), write(), fsync() — POSIX file API",color:"bg-green-950/50 border-green-800",text:"text-green-300"},{label:"VFS (Virtual File System)",sub:"Unified inode/dentry/file abstraction; path lookup; page cache",color:"bg-blue-950/50 border-blue-800",text:"text-blue-300"},{label:"File System",sub:"ext4 / XFS / btrfs / tmpfs — manages inodes, extents, journals",color:"bg-purple-950/50 border-purple-800",text:"text-purple-300"},{label:"Block Layer",sub:"BIO/request queue, I/O scheduler (mq-deadline/bfq/none), dm-*, md-*",color:"bg-yellow-950/50 border-yellow-800",text:"text-yellow-300"},{label:"Device Driver",sub:"AHCI (SATA), NVMe, virtio-blk, iSCSI initiator, Fibre Channel HBA",color:"bg-orange-950/50 border-orange-800",text:"text-orange-300"},{label:"Physical Storage",sub:"HDD (spinning), SSD (NAND), NVMe PCIe, SAN LUN, iSCSI target",color:"bg-red-950/50 border-red-800",text:"text-red-300"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-border bg-surface-1 p-5",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4",children:"Linux Storage Stack"}),e.jsx("div",{className:"space-y-1",children:s.map((i,o)=>e.jsxs("div",{children:[e.jsxs("div",{className:`rounded-lg border ${i.color} px-5 py-3`,children:[e.jsx("div",{className:`font-semibold text-sm ${i.text}`,children:i.label}),e.jsx("div",{className:"text-xs text-gray-400 mt-0.5",children:i.sub})]}),o<s.length-1&&e.jsx("div",{className:"flex justify-center my-1",children:e.jsxs("div",{className:"flex flex-col items-center gap-0.5",children:[e.jsx("div",{className:"w-px h-3 bg-rh-red"}),e.jsx("div",{className:"border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rh-red"})]})})]},o))})]})}function v(){return e.jsxs("div",{className:"my-6 rounded-xl border border-border bg-surface-1 p-5",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4",children:"LVM Hierarchy"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide",children:"Logical Volumes (LV)"}),e.jsx("div",{className:"grid grid-cols-3 gap-2",children:["lv_root (50G)","lv_home (100G)","lv_data (200G)"].map((s,i)=>e.jsxs("div",{className:"rounded-lg border border-purple-800 bg-purple-950/40 px-3 py-2 text-center",children:[e.jsx("div",{className:"text-xs font-semibold text-purple-300",children:s}),e.jsxs("div",{className:"text-[10px] text-gray-500",children:["/dev/vg_data/",s.split(" ")[0]]})]},i))})]}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{className:"flex flex-col items-center gap-0.5",children:[e.jsx("div",{className:"w-px h-4 bg-rh-red"}),e.jsx("div",{className:"border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rh-red"})]})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide",children:"Volume Group (VG)"}),e.jsxs("div",{className:"rounded-lg border border-blue-800 bg-blue-950/40 px-5 py-3 text-center",children:[e.jsx("div",{className:"text-sm font-semibold text-blue-300",children:"vg_data (350G total — 4MB PE size)"}),e.jsx("div",{className:"text-xs text-gray-400 mt-0.5",children:"Spans multiple PVs; presents unified pool of Physical Extents"})]})]}),e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{className:"flex flex-col items-center gap-0.5",children:[e.jsx("div",{className:"w-px h-4 bg-rh-red"}),e.jsx("div",{className:"border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rh-red"})]})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide",children:"Physical Volumes (PV)"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:["/dev/sdb (200G)","/dev/sdc (150G)"].map((s,i)=>e.jsxs("div",{className:"rounded-lg border border-yellow-800 bg-yellow-950/40 px-3 py-2 text-center",children:[e.jsx("div",{className:"text-xs font-semibold text-yellow-300",children:s}),e.jsx("div",{className:"text-[10px] text-gray-500",children:"Physical disk or partition with LVM label"})]},i))})]})]})]})}const b=[{label:"Add new disk or partition",sub:"fdisk /dev/sdc → create partition → type 8e (Linux LVM); or use whole disk",color:"blue"},{label:"Create Physical Volume",sub:"pvcreate /dev/sdc1 — writes LVM label + PV UUID to disk header",color:"blue"},{label:"Extend the Volume Group",sub:"vgextend vg_data /dev/sdc1 — adds PEs from new PV to existing VG",color:"purple"},{label:"Extend the Logical Volume",sub:"lvextend -L +50G /dev/vg_data/lv_home  OR  lvextend -l +100%FREE /dev/vg_data/lv_home",color:"purple"},{label:"Resize the filesystem online",sub:"ext4: resize2fs /dev/vg_data/lv_home  |  XFS: xfs_growfs /home  (no unmount needed!)",color:"green"},{label:"Verify",sub:"df -h /home — should show new size; lvs confirms LV size; pvs confirms PV used",color:"green"}],x=[{label:"Symptom: I/O errors or slow performance",sub:'dmesg -T shows "blk_update_request: I/O error" or "ata1: EH in SRST"; application timeouts',color:"red"},{label:"Check SMART data",sub:"smartctl -a /dev/sda — look at Reallocated_Sector_Ct, Current_Pending_Sector, Offline_Uncorrectable",color:"yellow"},{label:"Check kernel I/O statistics",sub:"iostat -x 1 — look for %util approaching 100%, high await (>10ms for HDD, >1ms for SSD)",color:"yellow"},{label:"Check filesystem integrity",sub:"If ext4: e2fsck -n /dev/sda1 (read-only check); if XFS: xfs_repair -n /dev/sda1",color:"blue"},{label:"Check RAID / LVM health",sub:'cat /proc/mdstat; mdadm --detail /dev/md0; lvs; pvs — look for "failed" or "partial" state',color:"blue"},{label:"Replace failed component",sub:"mdadm --manage /dev/md0 --remove /dev/sdb1; replace disk; mdadm --manage /dev/md0 --add /dev/sdc1",color:"purple"},{label:"Repair or restore data",sub:"fsck after mdadm sync completes; restore from backup if fs corrupted beyond repair",color:"green"}],y=[{cmd:"iostat -x 1 5",desc:"Extended I/O stats every 1s for 5 iterations",note:"Key cols: r/s w/s %util await aqu-sz"},{cmd:"iotop -ao",desc:"Accumulative I/O per process (requires root)",note:"-o shows only processes with I/O"},{cmd:"blktrace -d /dev/sda -o -",desc:"Block-level I/O trace on device",note:"Pipe to blkparse; use btrace wrapper"},{cmd:"cat /sys/block/sda/stat",desc:"Raw I/O statistics from sysfs (11 fields)",note:"Fields: reads merges sectors ms-read writes..."},{cmd:"lsblk -f",desc:"List block devices with filesystem type, UUID, mountpoint",note:"-o NAME,SIZE,TYPE,UUID,MOUNTPOINT"},{cmd:"blkid",desc:"Print block device attributes (UUID, TYPE, PARTUUID)",note:"Used by systemd to generate mount units"},{cmd:"e2fsck -f /dev/sda1",desc:"Force full ext4 filesystem check (device must be unmounted)",note:"-n = read-only check; -p = auto-fix safe issues"},{cmd:"xfs_repair /dev/sda1",desc:"Repair XFS filesystem (device must be unmounted)",note:"-n = check only; -L = force log zeroing (last resort)"},{cmd:"xfs_check /dev/sda1",desc:"Check XFS consistency (deprecated — use xfs_repair -n)",note:"Available on older RHEL versions"},{cmd:"tune2fs -l /dev/sda1",desc:"Show ext4 superblock information",note:"Shows mount count, last check, reserved blocks"},{cmd:"tune2fs -i 0 -c 0 /dev/sda1",desc:"Disable automatic fsck interval and mount-count checks",note:"Useful for VMs; not recommended for production HDDs"},{cmd:"dumpe2fs /dev/sda1",desc:"Dump full ext4 superblock and block group info",note:"Very verbose; grep for specific fields"},{cmd:"pvs / pvdisplay",desc:"List Physical Volumes (short / detailed)",note:"pvdisplay -m shows physical extent allocation map"},{cmd:"vgs / vgdisplay",desc:"List Volume Groups (short / detailed)",note:"Shows free PE, total PE, VG size"},{cmd:"lvs / lvdisplay",desc:"List Logical Volumes (short / detailed)",note:"lvs -a shows hidden internal volumes"},{cmd:"pvcreate /dev/sdb",desc:"Initialize disk as a Physical Volume",note:"Writes LVM label; destroys existing data"},{cmd:"vgcreate vg1 /dev/sdb",desc:"Create Volume Group from one or more PVs",note:"-s 4M sets Physical Extent size (default 4MB)"},{cmd:"lvcreate -L 20G -n lv1 vg1",desc:"Create 20G Logical Volume named lv1 in vg1",note:"-l 100%FREE uses all remaining space"},{cmd:"lvextend -L +10G /dev/vg1/lv1",desc:"Extend LV by 10G (filesystem resize needed separately)",note:"-r auto-resizes filesystem if supported"},{cmd:"pvmove /dev/sdb1",desc:"Migrate PE data off a PV to other PVs in VG",note:"Live migration; used before vgreduce"},{cmd:"vgreduce vg1 /dev/sdb1",desc:"Remove a PV from a VG (after pvmove)",note:"Then pvremove to wipe the LVM label"},{cmd:"mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sd{b,c}",desc:"Create RAID-1 mirror across two disks",note:"--metadata=1.2 is default on modern RHEL"},{cmd:"mdadm --detail /dev/md0",desc:"Show RAID array status, member disks, rebuild progress",note:'Check "State:" line: clean / degraded / recovering'},{cmd:"cat /proc/mdstat",desc:"Quick summary of all md arrays and rebuild progress",note:"Watch live: watch -d cat /proc/mdstat"},{cmd:"smartctl -a /dev/sda",desc:"Full SMART report: attributes, errors, self-test logs",note:"Key: Reallocated_Sector_Ct > 0 means disk failure imminent"},{cmd:"smartctl -t short /dev/sda",desc:"Start short SMART self-test (~2 minutes)",note:"-t long runs a full surface scan (hours)"},{cmd:"df -h",desc:"Human-readable filesystem usage (space)",note:"-i shows inode usage instead of blocks"},{cmd:"df -i",desc:"Inode usage — critical for inode exhaustion diagnosis",note:"100% Use% with space available = inode exhaustion"},{cmd:"du -sh /path",desc:"Show disk usage of a directory",note:"-x stays on one filesystem; --max-depth=1 lists subdirs"},{cmd:"findmnt",desc:"Show mount table as tree; includes mount options",note:"--verify checks /etc/fstab validity"},{cmd:"mount -o remount,rw /",desc:"Remount root filesystem read-write (recovery mode)",note:"Or: mount -o remount,noatime /data"},{cmd:"xfs_growfs /mountpoint",desc:"Grow mounted XFS filesystem online (after lvextend)",note:"XFS cannot shrink; shrink requires backup/restore"},{cmd:"resize2fs /dev/vg1/lv1",desc:"Grow/shrink ext4 filesystem (after lvextend/lvreduce)",note:"Can resize online for grow; unmount required to shrink"},{cmd:"nfsstat -c",desc:"NFS client statistics — RPC call counts and errors",note:"-s for server; -m for mount stats"},{cmd:"showmount -e nfs-server",desc:"List exports available on NFS server",note:"Requires rpcbind/portmapper accessible"}],k=`# iostat -x 1 — extended statistics (1-second interval)
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
# -a = accumulative (total since start, not current rate)`,w=`# blktrace — trace block layer I/O events at the kernel level
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
btt -i sda_trace.bin | head -50`,j=`# ─── ext4 filesystem check and repair ──────────────────────────────────────

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
# realtime =none       extsz=4096 blocks=0, rtextents=0`,N=`# ─── Creating filesystems ───────────────────────────────────────────────────

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
mount -o remount,noatime /data     # add noatime to running mount`,S=`# ─── Physical Volume operations ──────────────────────────────────────────────
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
lvremove /dev/vg_data/lv_home_snap         # remove snapshot when done`,P=`# ─── RAID levels summary ────────────────────────────────────────────────────
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
dracut --regenerate-all`,C=`# ─── SMART — Self-Monitoring, Analysis and Reporting Technology ──────────────
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
smartctl --tolerance=verypermissive -t offline /dev/sda`,M=`# ─── fdisk — MBR partition tables (up to 2TB, max 4 primary) ─────────────────
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
udevadm settle            # wait for udev to process events (device nodes created)`,_=`# ─── NFS client troubleshooting ──────────────────────────────────────────────

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
# NFSv3 also needs: mountd, rpc-bind ports (variable)`,A=`# ─── Inode exhaustion diagnosis ──────────────────────────────────────────────
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
find /var -xdev -printf '%h
' | sort | uniq -c | sort -rn | head -20
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
# Prevention: mkfs.ext4 -i 4096 /dev/sdb1  (one inode per 4096 bytes — double density)`;function U(){return e.jsxs("div",{children:[e.jsx(l,{icon:p,title:"Storage Diagnostics",subtitle:"Comprehensive storage troubleshooting for EX342: I/O analysis, filesystem check/repair, LVM, software RAID, SMART diagnostics, NFS client issues, and inode exhaustion.",tags:["iostat","LVM","mdadm","SMART","ext4","XFS","NFS","fsck","blktrace"]}),e.jsx(r,{children:"Linux Storage Stack Architecture"}),e.jsx("p",{className:"section-body mb-2",children:"Storage I/O in Linux passes through a layered stack. Each layer abstracts the one below, allowing filesystems to be independent of physical media and device drivers to be independent of logical volume management. Understanding this stack tells you where to instrument diagnostics."}),e.jsx(g,{}),e.jsx(t,{type:"info",title:"Where Problems Hide in the Stack",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{className:"text-gray-200",children:"High await in iostat"})," → Block layer saturation or device failure"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-gray-200",children:"Filesystem errors in dmesg"})," → VFS/FS layer corruption"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-gray-200",children:"100% inode use with free space"})," → VFS/inode table exhausted"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-gray-200",children:"md array degraded"})," → Block layer (dm-md) has a missing member"]}),e.jsxs("li",{children:[e.jsx("strong",{className:"text-gray-200",children:"LV showing wrong size after lvextend"})," → Filesystem not resized (separate step)"]})]})}),e.jsx(r,{children:"Disk I/O Analysis"}),e.jsxs("p",{className:"section-body mb-2",children:["I/O performance analysis starts with ",e.jsx("span",{className:"code-inline",children:"iostat"})," for aggregate device statistics, ",e.jsx("span",{className:"code-inline",children:"iotop"})," to identify which process is causing I/O, and ",e.jsx("span",{className:"code-inline",children:"blktrace"})," for deep block-layer tracing when you need to understand the exact I/O pattern."]}),e.jsx(a,{title:"iostat -x — extended statistics with interpretation",code:k}),e.jsx(a,{title:"blktrace / blkparse — block-layer I/O tracing",code:w}),e.jsx(t,{type:"exam",title:"iostat Exam Essentials",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"%iowait"})," in the CPU section means CPUs are idle waiting for I/O — does NOT mean disk is busy; could be remote NFS"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"await"})," is the most important column: total time from I/O request to completion (including queue time)"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"%util"})," near 100% on a spinning disk means it is saturated; on NVMe this is misleading (parallelism hides it)"]}),e.jsxs("li",{children:["Package: ",e.jsx("span",{className:"code-inline",children:"sysstat"}),"; also provides ",e.jsx("span",{className:"code-inline",children:"sar"})]})]})}),e.jsx(r,{children:"Filesystem Check and Repair"}),e.jsxs("p",{className:"section-body mb-2",children:["Never run ",e.jsx("span",{className:"code-inline",children:"fsck"})," or ",e.jsx("span",{className:"code-inline",children:"xfs_repair"}),"on a mounted filesystem (with write access) — doing so will cause additional corruption. Boot to rescue/emergency mode, or remount read-only first."]}),e.jsx(a,{title:"e2fsck / xfs_repair — check and repair filesystems",code:j}),e.jsxs(t,{type:"danger",title:"fsck on Mounted Filesystem",children:["Running ",e.jsx("span",{className:"code-inline",children:"e2fsck -f /dev/sda1"})," while it is mounted read-write will corrupt the filesystem. If you cannot unmount (e.g., root filesystem), boot into rescue mode: ",e.jsx("span",{className:"code-inline",children:"systemctl rescue"})," or append",e.jsx("span",{className:"code-inline",children:"single"})," to kernel command line. For root fs:",e.jsx("span",{className:"code-inline",children:"touch /.autorelabel"})," triggers fsck on next boot."]}),e.jsx(t,{type:"exam",title:"ext4 vs XFS Repair Differences",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:["ext4: ",e.jsx("span",{className:"code-inline",children:"e2fsck -f"})," to force check; ",e.jsx("span",{className:"code-inline",children:"-p"})," for automatic safe repair; ",e.jsx("span",{className:"code-inline",children:"-y"})," for yes to all"]}),e.jsxs("li",{children:["XFS: ",e.jsx("span",{className:"code-inline",children:"xfs_repair -n"})," for check; no flags = repair; ",e.jsx("span",{className:"code-inline",children:"-L"})," forces log zeroing (data loss risk)"]}),e.jsxs("li",{children:["XFS journal replay happens automatically on ",e.jsx("span",{className:"code-inline",children:"mount"})," — if mount fails, THEN run ",e.jsx("span",{className:"code-inline",children:"xfs_repair"})]}),e.jsxs("li",{children:["XFS can NOT shrink; ext4 can shrink but must unmount and run ",e.jsx("span",{className:"code-inline",children:"e2fsck"})," first"]})]})}),e.jsx(r,{children:"Filesystem Creation and Mount Options"}),e.jsx(a,{title:"mkfs.ext4 / mkfs.xfs and mount options",code:N}),e.jsxs(t,{type:"tip",title:"Choosing ext4 vs XFS on RHEL",children:["RHEL 9 default root filesystem is XFS. Use ",e.jsx("strong",{className:"text-gray-200",children:"XFS"})," for: large filesystems (>16TB), high-throughput workloads, database servers. Use",e.jsx("strong",{className:"text-gray-200",children:"ext4"})," for: small filesystems, environments requiring shrinking, or where ext4 tooling is more familiar. Both are journaling filesystems with comparable reliability."]}),e.jsx(r,{children:"LVM — Logical Volume Management"}),e.jsxs("p",{className:"section-body mb-2",children:["LVM provides flexible storage management by abstracting physical disks (PV) into a pool (VG) from which logical volumes (LV) are carved. Key advantage: LVs can be extended online, snapshots created, and storage migrated live with ",e.jsx("span",{className:"code-inline",children:"pvmove"}),"."]}),e.jsx(v,{}),e.jsx(a,{title:"LVM — full reference: PV, VG, LV operations",code:S}),e.jsx(f,{children:"LVM Extension Workflow"}),e.jsx(n,{title:"Extending an LV Live (no downtime)",steps:b}),e.jsx(t,{type:"exam",title:"LVM Exam Must-Knows",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:["Extend order: ",e.jsx("strong",{className:"text-gray-200",children:"pvcreate → vgextend → lvextend → resize2fs/xfs_growfs"})]}),e.jsxs("li",{children:["Shrink order (ext4 only): ",e.jsx("strong",{className:"text-gray-200",children:"umount → e2fsck → resize2fs → lvreduce → mount"})]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"lvextend -r"})," auto-resizes the filesystem — but know how to do each step separately"]}),e.jsxs("li",{children:["XFS filesystems ",e.jsx("strong",{className:"text-gray-200",children:"cannot be shrunk"})," — this is a common exam trick"]}),e.jsxs("li",{children:["Thin pools: watch ",e.jsx("span",{className:"code-inline",children:"data_percent"})," in ",e.jsx("span",{className:"code-inline",children:"lvs"})," — if 100%, new writes fail silently"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"pvmove"})," can be run while the filesystem is mounted and active — it is live migration"]})]})}),e.jsx(r,{children:"Software RAID with mdadm"}),e.jsxs("p",{className:"section-body mb-2",children:["Linux software RAID (",e.jsx("span",{className:"code-inline",children:"md"})," — multiple device driver) provides RAID functionality in software, independent of hardware. For EX342, focus on RAID 1 and RAID 5 creation, degraded array recovery, and reading",e.jsx("span",{className:"code-inline",children:"/proc/mdstat"}),"."]}),e.jsx(a,{title:"mdadm — RAID creation, management, failure recovery",code:P}),e.jsx(t,{type:"warning",title:"RAID is Not a Backup",children:"RAID 1/5/6 protects against disk failure but NOT against accidental deletion, filesystem corruption, or ransomware. A file deleted on a RAID-1 array is deleted on both mirrors. Always maintain separate backups."}),e.jsx(t,{type:"exam",title:"mdadm Exam Tips",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"/proc/mdstat"})," ",e.jsx("span",{className:"code-inline",children:"[UU]"})," = healthy, ",e.jsx("span",{className:"code-inline",children:"[U_]"})," = one disk missing (degraded)"]}),e.jsxs("li",{children:["Rebuild progress shown live: ",e.jsx("span",{className:"code-inline",children:"watch cat /proc/mdstat"})]}),e.jsxs("li",{children:["Must update ",e.jsx("span",{className:"code-inline",children:"/etc/mdadm.conf"})," and run ",e.jsx("span",{className:"code-inline",children:"dracut -f"})," for RAID to assemble at boot"]}),e.jsx("li",{children:"RAID 5 minimum 3 disks, survives 1 failure; RAID 6 minimum 4 disks, survives 2 failures"}),e.jsxs("li",{children:["A hot spare (",e.jsx("span",{className:"code-inline",children:"--spare-devices"}),") auto-joins rebuild when a member fails"]})]})}),e.jsx(r,{children:"SMART Diagnostics"}),e.jsxs("p",{className:"section-body mb-2",children:["SMART (Self-Monitoring, Analysis and Reporting Technology) is firmware-level monitoring built into HDDs, SSDs, and NVMe drives. The key attributes to watch are",e.jsx("span",{className:"code-inline",children:"Reallocated_Sector_Ct"}),",",e.jsx("span",{className:"code-inline",children:"Current_Pending_Sector"}),", and",e.jsx("span",{className:"code-inline",children:"Offline_Uncorrectable"}),". Any non-zero value in these is a strong indicator of impending disk failure."]}),e.jsx(a,{title:"smartctl — full report, self-tests, smartd daemon",code:C}),e.jsx(t,{type:"exam",title:"SMART Attribute Interpretation",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"Reallocated_Sector_Ct > 0"})," — bad sectors remapped to spare area; disk is failing"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"Current_Pending_Sector > 0"})," — unstable sectors awaiting reallocation; read errors likely"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"Offline_Uncorrectable > 0"})," — sectors that could not be recovered; data likely lost"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"UDMA_CRC_Error_Count > 0"})," — cable, connector, or controller problem (not disk itself)"]}),e.jsxs("li",{children:["Overall health: ",e.jsx("span",{className:"code-inline",children:"smartctl -H /dev/sda"})," — PASSED or FAILED"]})]})}),e.jsx(r,{children:"Disk Partitioning"}),e.jsxs("p",{className:"section-body mb-2",children:["Use ",e.jsx("span",{className:"code-inline",children:"gdisk"})," (GPT) for all new deployments — MBR (",e.jsx("span",{className:"code-inline",children:"fdisk"}),") is limited to 2TB and 4 primary partitions.",e.jsx("span",{className:"code-inline",children:"parted"})," supports both and is scriptable."]}),e.jsx(a,{title:"fdisk / gdisk / parted — partitioning reference",code:M}),e.jsx(r,{children:"NFS Client Troubleshooting"}),e.jsxs("p",{className:"section-body mb-2",children:["NFS client issues commonly manifest as stale mount points, permission errors, or performance problems. The key tools are ",e.jsx("span",{className:"code-inline",children:"showmount"}),",",e.jsx("span",{className:"code-inline",children:"rpcinfo"}),", ",e.jsx("span",{className:"code-inline",children:"nfsstat"}),", and careful attention to mount options."]}),e.jsx(a,{title:"NFS client — mounting, options, statistics, troubleshooting",code:_}),e.jsxs(t,{type:"warning",title:"NFS hard vs soft Mounts",children:[e.jsx("span",{className:"code-inline",children:"hard"})," mounts (default) hang indefinitely if the server is unreachable — applications block in ",e.jsx("span",{className:"code-inline",children:"D"})," state (uninterruptible sleep).",e.jsx("span",{className:"code-inline",children:"soft"})," mounts return errors but risk data corruption on write failures. For most production NFS use ",e.jsx("span",{className:"code-inline",children:"hard,timeo=30,retrans=3"}),"and ensure ",e.jsx("span",{className:"code-inline",children:"nofail"})," is set to prevent boot failure if server is down."]}),e.jsx(r,{children:"Inode Exhaustion"}),e.jsxs("p",{className:"section-body mb-2",children:['Inode exhaustion causes "No space left on device" errors even when',e.jsx("span",{className:"code-inline",children:"df -h"})," shows free space. This happens when a filesystem has created the maximum number of inodes (one per file/directory). It is common in",e.jsx("span",{className:"code-inline",children:"/var"})," with many small files (mail spools, temp files, log fragments)."]}),e.jsx(a,{title:"Inode exhaustion — detection and remediation",code:A}),e.jsxs(t,{type:"exam",title:"Inode Exhaustion Exam Scenario",children:['If asked "the application cannot create files but df -h shows 50% free" — immediately run',e.jsx("span",{className:"code-inline",children:"df -i"}),". If inodes are 100%, find the offending directory with ",e.jsx("span",{className:"code-inline",children:"find / -xdev -printf '%h\\n' | sort | uniq -c | sort -rn | head -20"}),". For ext4, inodes cannot be added after creation — you must move data to a new filesystem with more inodes or delete files. XFS allocates inodes dynamically and is immune to this."]}),e.jsx(r,{children:"Disk Failure Investigation Workflow"}),e.jsx(n,{title:"Storage Failure Investigation Workflow",steps:x}),e.jsx(r,{children:"Storage Diagnostics Command Reference"}),e.jsx(c,{title:"All Storage Diagnostic Commands",rows:y}),e.jsx(t,{type:"exam",title:"Final Exam Checklist — Storage",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:["Know the LV extension chain: ",e.jsx("span",{className:"code-inline",children:"pvcreate → vgextend → lvextend → xfs_growfs / resize2fs"})]}),e.jsx("li",{children:"XFS cannot shrink; ext4 can shrink offline only"}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"df -i"})," for inode exhaustion; ",e.jsx("span",{className:"code-inline",children:"df -h"})," for space"]}),e.jsxs("li",{children:["SMART: ",e.jsx("span",{className:"code-inline",children:"Reallocated_Sector_Ct / Current_Pending_Sector / Offline_Uncorrectable"})," — any >0 is critical"]}),e.jsxs("li",{children:["mdadm arrays need ",e.jsx("span",{className:"code-inline",children:"/etc/mdadm.conf"})," updated + ",e.jsx("span",{className:"code-inline",children:"dracut -f"})," to survive reboots"]}),e.jsxs("li",{children:["NFS: ",e.jsx("span",{className:"code-inline",children:"_netdev"})," in fstab delays mount until network up; ",e.jsx("span",{className:"code-inline",children:"nofail"})," prevents boot failure"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"iostat -x"})," fields: ",e.jsx("span",{className:"code-inline",children:"await"})," (latency), ",e.jsx("span",{className:"code-inline",children:"%util"})," (saturation), ",e.jsx("span",{className:"code-inline",children:"aqu-sz"})," (queue depth)"]}),e.jsx("li",{children:"Never run fsck/xfs_repair on a mounted R/W filesystem"})]})})]})}function D(){return e.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-8 space-y-12",children:[e.jsx(l,{icon:u,title:"Memory Diagnostics",subtitle:"Investigate memory pressure, OOM kills, swap usage, huge pages, NUMA topology, and slab caches on Red Hat Enterprise Linux systems.",tags:["EX342","Memory","OOM Killer","vmstat","Swap","NUMA","Huge Pages"]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Linux Memory Architecture"}),e.jsx("p",{className:"section-body mb-4",children:"Linux uses a virtual memory model: every process sees a flat 64-bit address space backed by the kernel's page tables. Physical memory is divided into pages (typically 4 KiB) and organised into zones so that hardware constraints are respected."}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-xl border border-border bg-surface-1 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-300 mb-3",children:"Memory Zones"}),e.jsx("div",{className:"space-y-2",children:[{zone:"ZONE_DMA",range:"0 – 16 MiB",desc:"Legacy ISA DMA devices; very limited, avoid allocation here.",color:"text-red-300"},{zone:"ZONE_DMA32",range:"0 – 4 GiB",desc:"32-bit PCI DMA; present on x86-64 kernels.",color:"text-yellow-300"},{zone:"ZONE_NORMAL",range:"16 MiB – (varies)",desc:"Main zone for kernel and user allocations.",color:"text-green-300"},{zone:"ZONE_HIGHMEM",range:"Above NORMAL (32-bit only)",desc:"Only on 32-bit kernels; not present on x86-64.",color:"text-blue-300"}].map(s=>e.jsxs("div",{className:"rounded bg-surface-2 p-2.5",children:[e.jsxs("div",{className:"flex items-baseline gap-2",children:[e.jsx("span",{className:`font-mono text-xs font-bold ${s.color}`,children:s.zone}),e.jsx("span",{className:"text-xs text-gray-500",children:s.range})]}),e.jsx("p",{className:"text-xs text-gray-400 mt-0.5",children:s.desc})]},s.zone))})]}),e.jsxs("div",{className:"rounded-xl border border-border bg-surface-1 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-300 mb-3",children:"Key Concepts"}),e.jsxs("div",{className:"space-y-2 text-xs text-gray-300 leading-relaxed",children:[e.jsxs("div",{className:"rounded bg-surface-2 p-2.5",children:[e.jsx("span",{className:"font-semibold text-blue-300",children:"Page Cache"}),' — Disk data cached in RAM to speed I/O. Reclaimable under memory pressure. Shown as "Cached" in ',e.jsx("code",{className:"code-inline",children:"free"}),"."]}),e.jsxs("div",{className:"rounded bg-surface-2 p-2.5",children:[e.jsx("span",{className:"font-semibold text-yellow-300",children:"Buffers"})," — Kernel buffer cache (block device metadata, e.g. filesystem superblocks). Usually small (a few hundred MiB)."]}),e.jsxs("div",{className:"rounded bg-surface-2 p-2.5",children:[e.jsx("span",{className:"font-semibold text-green-300",children:"Anonymous Memory"})," — Pages not backed by a file (heap, stack, mmap(MAP_ANONYMOUS)). Must be swapped out if reclamation is needed."]}),e.jsxs("div",{className:"rounded bg-surface-2 p-2.5",children:[e.jsx("span",{className:"font-semibold text-purple-300",children:"Slab Cache"})," — Kernel object allocator. Caches frequently-used kernel structures (dentries, inodes, socket buffers)."]}),e.jsxs("div",{className:"rounded bg-surface-2 p-2.5",children:[e.jsx("span",{className:"font-semibold text-rh-red",children:"Virtual vs Physical"})," — A process's virtual address is mapped to a physical frame by the MMU via page tables. ",e.jsx("code",{className:"code-inline",children:"/proc/[pid]/maps"})," shows virtual regions; ",e.jsx("code",{className:"code-inline",children:"VmRSS"})," in status shows physical pages."]})]})]})]}),e.jsxs(t,{type:"tip",title:"MemAvailable vs MemFree",children:[e.jsx("code",{className:"code-inline",children:"MemFree"})," is completely unused RAM. ",e.jsx("code",{className:"code-inline",children:"MemAvailable"})," is the kernel's estimate of memory available for new allocations without swapping — it includes reclaimable page cache and slab. Always use ",e.jsx("code",{className:"code-inline",children:"MemAvailable"})," to judge whether the system has enough free memory for a new workload."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"/proc/meminfo — Field Reference"}),e.jsx(a,{language:"bash",title:"cat /proc/meminfo (annotated sample)",code:`MemTotal:       32768000 kB  # Total usable RAM (excludes hardware reserved)
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
DirectMap2M:    31457280 kB  # 2M-mapped physical pages`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Interpreting free -h"}),e.jsx(a,{language:"bash",title:"free -h output with column explanations",code:`$ free -h
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
# If Swap 'used' growing          → active memory pressure`}),e.jsx("div",{className:"grid md:grid-cols-3 gap-3 mt-2",children:[{label:"Healthy",desc:"available ≥ 20% total, swap used ≈ 0",color:"border-green-700 bg-green-950/30 text-green-300"},{label:"Watch",desc:"available 5–20%, swap in active use",color:"border-yellow-700 bg-yellow-950/30 text-yellow-300"},{label:"Critical",desc:"available < 5%, OOM events likely",color:"border-red-700 bg-red-950/30 text-red-300"}].map(s=>e.jsxs("div",{className:`rounded-lg border p-3 ${s.color}`,children:[e.jsx("div",{className:"font-bold text-sm",children:s.label}),e.jsx("div",{className:"text-xs mt-1 opacity-80",children:s.desc})]},s.label))})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"vmstat — Virtual Memory Statistics"}),e.jsx(a,{language:"bash",title:"vmstat 2 5  (sample 5 times every 2 seconds)",code:`$ vmstat 2 5
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0 397312 985440 512000 12288000    0    0     8    24  450  900 15  5 78  2  0
 3  1 397312 950000 512000 12288000    2    0   128   256  890 1800 45 12 38  5  0
 1  0 397312 960000 512000 12288000    0    0     0    48  500  950 20  6 72  2  0`}),e.jsx("div",{className:"overflow-x-auto rounded-xl border border-border",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-2 border-b border-border",children:[e.jsx("th",{className:"text-left px-3 py-2 text-gray-400 uppercase tracking-wide",children:"Column"}),e.jsx("th",{className:"text-left px-3 py-2 text-gray-400 uppercase tracking-wide",children:"Group"}),e.jsx("th",{className:"text-left px-3 py-2 text-gray-400 uppercase tracking-wide",children:"Meaning"}),e.jsx("th",{className:"text-left px-3 py-2 text-gray-400 uppercase tracking-wide",children:"Alarm threshold"})]})}),e.jsx("tbody",{children:[["r","procs","Processes in run queue (runnable)","> # of CPUs = CPU saturated"],["b","procs","Processes blocked in uninterruptible sleep (I/O wait)","> 2–3 sustained = I/O bottleneck"],["swpd","memory","Total swap in use (kB)","Non-zero = memory was tight"],["free","memory","Idle (unused) RAM (kB)","Very low alone is OK; check available"],["buff","memory","Kernel buffer cache (kB)","Informational"],["cache","memory","Page cache size (kB)","High is normal; released under pressure"],["si","swap","Swap-IN rate (kB/s) — pages read from swap","> 0 sustained = memory pressure"],["so","swap","Swap-OUT rate (kB/s) — pages written to swap","> 0 sustained = memory pressure"],["bi","io","Blocks read from block devices (blocks/s)","Baseline-dependent"],["bo","io","Blocks written to block devices (blocks/s)","Sustained high = disk write pressure"],["in","system","Interrupts per second","Very high may indicate driver issue"],["cs","system","Context switches per second","Very high (>100k) may indicate thrashing"],["us","cpu","User CPU time %","> 70% sustained = CPU-bound userspace"],["sy","cpu","System (kernel) CPU time %","> 20% = kernel overhead (syscalls, etc.)"],["id","cpu","Idle CPU time %","< 10% = saturated"],["wa","cpu","I/O wait CPU time %","> 10% sustained = I/O bottleneck"],["st","cpu","Stolen CPU time (VM hypervisor took it) %","> 5% = hypervisor contention"]].map(([s,i,o,d],m)=>e.jsxs("tr",{className:`border-b border-border/50 ${m%2===0?"bg-surface-0":"bg-surface-1/40"}`,children:[e.jsx("td",{className:"px-3 py-2 font-mono text-token-string",children:s}),e.jsx("td",{className:"px-3 py-2 text-gray-500",children:i}),e.jsx("td",{className:"px-3 py-2 text-gray-300",children:o}),e.jsx("td",{className:"px-3 py-2 text-yellow-400/80",children:d})]},s))})]})})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"OOM Killer"}),e.jsxs("p",{className:"section-body mb-4",children:["When the kernel cannot satisfy a memory allocation request and reclaim is exhausted, it invokes the Out-of-Memory killer. The OOM killer selects a victim process using an ",e.jsx("em",{children:"oom_score"})," and terminates it to free memory."]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsx("div",{children:e.jsx(a,{language:"bash",title:"Reading OOM kills from journals",code:`# Most recent OOM kill events
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
journalctl -k -b -1 --grep="Killed process"`})}),e.jsx("div",{children:e.jsx(a,{language:"bash",title:"oom_score and oom_score_adj",code:`# View OOM score for a process (higher = more likely to be killed)
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
sysctl -w vm.overcommit_memory=2  # disable overcommit`})})]}),e.jsxs(t,{type:"warning",title:"vm.overcommit_memory Values",children:[e.jsx("strong",{children:"0 (default)"})," — Heuristic: kernel allows reasonable overcommit.",e.jsx("br",{}),e.jsx("strong",{children:"1"})," — Always allow: any allocation succeeds (dangerous; OOM more likely).",e.jsx("br",{}),e.jsx("strong",{children:"2"})," — Never overcommit: total committed memory cannot exceed ",e.jsx("code",{className:"code-inline",children:"overcommit_ratio"}),"% of RAM + swap. Most conservative; may cause allocation failures rather than OOM kills."]}),e.jsxs(t,{type:"exam",title:"Exam Tip — OOM",children:["The exam often asks you to prevent a specific daemon from being OOM-killed. Set ",e.jsx("code",{className:"code-inline",children:"OOMScoreAdjust=-1000"})," in the systemd unit file's ",e.jsx("code",{className:"code-inline",children:"[Service]"})," section, then ",e.jsx("code",{className:"code-inline",children:"systemctl daemon-reload"})," and restart the service."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Memory Leak Detection"}),e.jsx(a,{language:"bash",title:"Watching VmRSS growth over time",code:`# /proc/[pid]/status contains per-process memory fields
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
watch -n 5 "grep VmRSS /proc/$(pgrep myapp)/status"

# smaps_rollup gives a richer breakdown (kernel ≥ 4.14)
cat /proc/14523/smaps_rollup

# ps one-liner to track top RSS consumers
ps -eo pid,comm,rss --sort=-rss | head -15`}),e.jsx(a,{language:"bash",title:"Valgrind — heap memory leak check",code:`# Install valgrind
dnf install valgrind

# Run program under valgrind's memcheck tool
valgrind --tool=memcheck --leak-check=full --show-leak-kinds=all          --track-origins=yes --log-file=valgrind.log ./myapp

# Key output sections:
# LEAK SUMMARY:
#    definitely lost: 4,096 bytes in 1 blocks   ← definite leak
#    indirectly lost: 0 bytes in 0 blocks
#      possibly lost: 0 bytes in 0 blocks
#    still reachable: 2,048 bytes in 3 blocks   ← probably OK
#         suppressed: 0 bytes in 0 blocks

# Address sanitizer (faster, needs recompile):
gcc -fsanitize=address -g -o myapp myapp.c
./myapp   # ASan reports at runtime`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Swap Management"}),e.jsx(a,{language:"bash",title:"Swap setup and management",code:`# View current swap usage
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
# Persist: echo 'vm.swappiness=10' >> /etc/sysctl.d/99-memory.conf`}),e.jsxs(t,{type:"tip",title:"vm.swappiness on Servers",children:["For database servers (e.g. MySQL, PostgreSQL) set ",e.jsx("code",{className:"code-inline",children:"vm.swappiness=1"})," — this avoids swapping the buffer pool while still allowing emergency swapping. Red Hat recommends ",e.jsx("code",{className:"code-inline",children:"vm.swappiness=10"})," for most production servers."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Huge Pages"}),e.jsxs("p",{className:"section-body mb-4",children:["Standard pages are 4 KiB. Huge pages (2 MiB on x86-64) reduce TLB pressure for memory-intensive workloads. Linux provides two mechanisms: ",e.jsx("strong",{children:"static huge pages"})," (pre-allocated at boot) and",e.jsx("strong",{children:"Transparent Huge Pages (THP)"})," (kernel auto-promotes pages)."]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsx("div",{children:e.jsx(a,{language:"bash",title:"Static Huge Pages",code:`# Check current status
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
mount -t hugetlbfs none /dev/hugepages`})}),e.jsx("div",{children:e.jsx(a,{language:"bash",title:"Transparent Huge Pages (THP)",code:`# View THP setting (always/madvise/never)
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

cat /sys/kernel/mm/transparent_hugepage/khugepaged/pages_collapsed`})})]}),e.jsxs(t,{type:"exam",title:"Exam Tip — THP and Databases",children:["Oracle, MySQL, MongoDB, and Redis all recommend disabling THP. If a service is performing poorly and THP is ",e.jsx("code",{className:"code-inline",children:"always"}),", disabling it (and confirming via ",e.jsx("code",{className:"code-inline",children:"cat /sys/kernel/mm/transparent_hugepage/enabled"}),") is a common exam task."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"NUMA Topology"}),e.jsx(a,{language:"bash",title:"NUMA diagnostics with numactl and numastat",code:`# Show NUMA topology
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
numastat -p $(pgrep java) | head -20`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Slab Cache — slabtop & /proc/slabinfo"}),e.jsx(a,{language:"bash",title:"Slab cache investigation",code:`# Interactive slab top (like top for slab caches)
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

# WARNING: drop_caches causes cache misses — avoid on production`}),e.jsxs(t,{type:"warning",title:"SUnreclaim Growing",children:["If ",e.jsx("code",{className:"code-inline",children:"SUnreclaim"})," in ",e.jsx("code",{className:"code-inline",children:"/proc/meminfo"})," grows continuously without bound, it may indicate a kernel memory leak (e.g. a driver not freeing socket buffers). Compare with ",e.jsx("code",{className:"code-inline",children:"slabtop -o -s c"})," to identify which cache is growing."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Historical Memory Data — sar -r"}),e.jsx(a,{language:"bash",title:"sar memory reporting",code:`# Memory utilisation for today (requires sysstat package)
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
systemctl enable --now sysstat`})]}),e.jsx(n,{title:"Memory Pressure Investigation Workflow",steps:[{label:"Check overall memory state",sub:"free -h → is MemAvailable critically low? Is swap in use?",color:"blue"},{label:"Identify memory consumers",sub:"ps -eo pid,comm,rss --sort=-rss | head -15  •  smem -r | head",color:"default"},{label:"Check for active swapping",sub:"vmstat 2 5 → si/so columns non-zero?  •  sar -S for history",color:"yellow"},{label:"Look for OOM kills",sub:'journalctl -k --grep="Out of memory"  •  dmesg | grep oom_kill',color:"red"},{label:"Examine slab caches",sub:"slabtop -o -s c | head -20  •  check SUnreclaim in /proc/meminfo",color:"default"},{label:"Check for memory leaks",sub:"Watch VmRSS in /proc/[pid]/status over time for the suspect process",color:"yellow"},{label:"Check THP / huge page config",sub:"cat /sys/kernel/mm/transparent_hugepage/enabled  •  /proc/meminfo Huge*",color:"default"},{label:"Review NUMA distribution",sub:"numastat → high numa_miss?  •  numactl --hardware for topology",color:"purple"},{label:"Tune and validate",sub:"Adjust vm.swappiness, vm.nr_hugepages, OOMScoreAdjust, THP; re-check sar -r",color:"green"}]}),e.jsx(c,{title:"Memory Diagnostics — Quick Reference",rows:[{cmd:"free -h",desc:"Human-readable overview of RAM and swap",note:"-w for wider columns showing buff and cache separately"},{cmd:"cat /proc/meminfo",desc:"Full kernel memory statistics",note:"Watch MemAvailable, Slab, SUnreclaim, Committed_AS"},{cmd:"vmstat 2 5",desc:"VM stats every 2s, 5 iterations",note:"si/so = swap in/out; r = run queue depth"},{cmd:"vmstat -s",desc:"Summary memory event counters",note:"Cumulative since boot"},{cmd:"sar -r 1 5",desc:"Historical memory utilisation (sysstat)",note:"-r ALL for extended fields; -S for swap"},{cmd:"ps -eo pid,comm,rss --sort=-rss",desc:"Processes sorted by RSS (physical memory)",note:"RSS in KiB; use head -15"},{cmd:"cat /proc/[pid]/status",desc:"Per-process memory details",note:"VmRSS, VmSize, VmSwap, VmPeak"},{cmd:"cat /proc/[pid]/smaps_rollup",desc:"Detailed memory map rollup for a process",note:"Shows Private_Dirty (actual RAM use)"},{cmd:"slabtop -o -s c",desc:"Snapshot of kernel slab caches sorted by size",note:"Identify kernel memory consumers"},{cmd:"numactl --hardware",desc:"Display NUMA node topology and sizes",note:"Shows distances between NUMA nodes"},{cmd:"numastat",desc:"Per-node allocation hit/miss counters",note:"High numa_miss = remote allocations (slow)"},{cmd:"swapon --show",desc:"List active swap areas",note:"NAME, TYPE, SIZE, USED, PRIO columns"},{cmd:"mkswap /dev/vg0/swap",desc:"Initialise a swap area",note:"Must be run before swapon"},{cmd:"sysctl vm.swappiness",desc:"Query/set swap aggressiveness (0–200)",note:"Default 60; set 1–10 for databases"},{cmd:"sysctl vm.nr_hugepages",desc:"Number of pre-allocated static huge pages",note:"Set at boot or via sysctl.d"},{cmd:"echo never > /sys/kernel/mm/transparent_hugepage/enabled",desc:"Disable THP",note:"Always persist via systemd service"},{cmd:"echo -1000 > /proc/[pid]/oom_score_adj",desc:"Make a process immune to OOM killer",note:"Range -1000 to +1000"},{cmd:'journalctl -k --grep="Out of memory"',desc:"Find OOM kill events",note:"-b -1 for previous boot"},{cmd:"valgrind --leak-check=full ./app",desc:"Detect memory leaks in an application",note:"Requires debug symbols for best output"},{cmd:"echo 3 > /proc/sys/vm/drop_caches",desc:"Drop page cache and slab cache",note:"Non-destructive but causes cache misses — avoid in production"}]}),e.jsx(t,{type:"exam",title:"Exam Tips — Memory",children:e.jsxs("ul",{className:"space-y-1.5 list-disc pl-4",children:[e.jsxs("li",{children:['When asked "why is the system swapping?", check ',e.jsx("code",{className:"code-inline",children:"vmstat 2 5"})," (si/so columns) and ",e.jsx("code",{className:"code-inline",children:"sar -r"})," for historical context."]}),e.jsxs("li",{children:["To prevent a daemon from being OOM-killed: set ",e.jsx("code",{className:"code-inline",children:"OOMScoreAdjust=-1000"})," in its systemd unit ",e.jsx("code",{className:"code-inline",children:"[Service]"})," section."]}),e.jsxs("li",{children:["Databases reporting latency spikes → check THP: ",e.jsx("code",{className:"code-inline",children:"cat /sys/kernel/mm/transparent_hugepage/enabled"}),". If it shows ",e.jsx("code",{className:"code-inline",children:"[always]"}),", set to ",e.jsx("code",{className:"code-inline",children:"never"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"MemAvailable"})," (not ",e.jsx("code",{className:"code-inline",children:"MemFree"}),') is the right field to monitor for "is there memory for new workloads".']}),e.jsxs("li",{children:["Static huge pages for Oracle/HugeSQL: set ",e.jsx("code",{className:"code-inline",children:"vm.nr_hugepages"})," via sysctl and persist in ",e.jsx("code",{className:"code-inline",children:"/etc/sysctl.d/"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"sysstat"})," package must be installed and ",e.jsx("code",{className:"code-inline",children:"sysstat.service"})," enabled for ",e.jsx("code",{className:"code-inline",children:"sar"})," historical data to exist."]})]})})]})}function O(){return e.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-8 space-y-12",children:[e.jsx(l,{icon:h,title:"CPU & Performance",subtitle:"Investigate CPU saturation, scheduler behaviour, CPU affinity, cgroup limits, perf profiling, frequency scaling, and context-switch overhead on RHEL systems.",tags:["EX342","CPU","CFS Scheduler","cgroups v2","perf","sar","nice/renice"]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"CPU Scheduler — CFS & Load Average"}),e.jsxs("p",{className:"section-body mb-4",children:["Linux uses the ",e.jsx("strong",{children:"Completely Fair Scheduler (CFS)"})," as the default scheduler for normal processes. CFS maintains a red-black tree of runnable tasks ordered by ",e.jsx("em",{children:"virtual runtime"})," — the task that has run least gets scheduled next. Real-time processes (SCHED_FIFO, SCHED_RR) preempt CFS tasks entirely."]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-xl border border-border bg-surface-1 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-300 mb-3",children:"Load Average Explained"}),e.jsxs("p",{className:"text-xs text-gray-400 mb-3 leading-relaxed",children:["Load average represents the average number of processes in the run queue (runnable or waiting for I/O) over 1, 5, and 15 minutes. A load average equal to the number of CPU cores means 100% utilisation — ",e.jsx("em",{children:"not"})," necessarily a problem."]}),e.jsx("div",{className:"space-y-2",children:[{v:"load avg = 1.0 on 4-core",status:"Fine",color:"text-green-300",note:"25% CPU utilised"},{v:"load avg = 4.0 on 4-core",status:"Saturated",color:"text-yellow-300",note:"100% utilised, no queue"},{v:"load avg = 8.0 on 4-core",status:"Overloaded",color:"text-red-300",note:"2× CPU — queuing/waiting"},{v:"1-min > 15-min",status:"Spike",color:"text-yellow-300",note:"Recent burst of load"},{v:"1-min < 15-min",status:"Recovering",color:"text-green-300",note:"Load is decreasing"}].map(s=>e.jsxs("div",{className:"flex items-start gap-2 rounded bg-surface-2 p-2",children:[e.jsx("div",{className:"font-mono text-xs text-gray-300 flex-1",children:s.v}),e.jsx("div",{className:`text-xs font-semibold ${s.color} flex-shrink-0`,children:s.status}),e.jsx("div",{className:"text-xs text-gray-500 flex-shrink-0",children:s.note})]},s.v))})]}),e.jsxs("div",{className:"rounded-xl border border-border bg-surface-1 p-4",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-300 mb-3",children:"CPU State Breakdown (%)"}),e.jsx("div",{className:"space-y-2",children:[{s:"us",name:"user",color:"text-blue-300",desc:"User-space CPU time (applications)"},{s:"sy",name:"system",color:"text-yellow-300",desc:"Kernel CPU time (syscalls, IRQ handling)"},{s:"ni",name:"nice",color:"text-purple-300",desc:"User-space time for niced processes"},{s:"id",name:"idle",color:"text-green-300",desc:"CPU idle — nothing to do"},{s:"wa",name:"iowait",color:"text-orange-300",desc:"Idle while waiting for I/O to complete"},{s:"hi",name:"hardirq",color:"text-red-300",desc:"Hardware interrupt handler time"},{s:"si",name:"softirq",color:"text-red-300",desc:"Software interrupt handler time (e.g. network receive)"},{s:"st",name:"steal",color:"text-rh-red",desc:"Time stolen by hypervisor (VMs only)"}].map(s=>e.jsxs("div",{className:"flex items-baseline gap-2 text-xs",children:[e.jsx("span",{className:`font-mono font-bold w-5 ${s.color}`,children:s.s}),e.jsx("span",{className:"text-gray-500 w-14",children:s.name}),e.jsx("span",{className:"text-gray-400",children:s.desc})]},s.s))})]})]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"top and htop — Interactive Process Monitoring"}),e.jsx(a,{language:"bash",title:"top — key columns and interactive commands",code:`$ top
top - 14:32:01 up 12 days,  4:21,  2 users,  load average: 2.45, 1.87, 1.23
Tasks: 345 total,   3 running, 342 sleeping,   0 stopped,   0 zombie
%Cpu(s): 38.2 us,  8.5 sy,  0.0 ni, 50.1 id,  2.8 wa,  0.2 hi,  0.2 si,  0.0 st
MiB Mem : 31768.0 total,   956.2 free, 18432.5 used, 12379.3 buff/cache
MiB Swap:  8192.0 total,  7803.5 free,   388.5 used. 11934.7 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
14523 appuser   20   0 4194304 3.0g   45312 R  98.3   9.7  45:12.44 java
 2341 mysql     20   0 2097152 1.2g   32768 S  12.4   3.9  12:34.21 mysqld

# Column meanings:
# PR     = scheduling priority (kernel-assigned, related to nice)
# NI     = nice value (-20 high priority to +19 low priority)
# VIRT   = virtual address space (includes mmap, shared libs — often huge)
# RES    = resident set size — actual physical RAM in use
# SHR    = shared memory (shared libs counted here)
# S      = process state: R=running, S=sleeping, D=unint.sleep, Z=zombie
# %CPU   = CPU % across all threads (can exceed 100% on multi-core)
# %MEM   = RES as % of total RAM

# Interactive keys:
# 1      = toggle per-CPU breakdown
# Shift+P = sort by CPU
# Shift+M = sort by MEM
# Shift+H = show threads
# k      = kill a process
# r      = renice
# f      = field selection
# u      = filter by user

# Batch mode (non-interactive, for scripts):
top -b -n 3 -d 2 | head -40`}),e.jsx(a,{language:"bash",title:"htop — additional features",code:`# Install htop
dnf install htop

# Key differences from top:
# F2/S  = Setup (columns, colours, meters)
# F5    = Tree view (show process hierarchy)
# F6    = Sort by column
# F9    = Send signal to process
# Space = Tag processes for bulk action
# t     = Tree/flat toggle
# H     = Hide/show user threads
# K     = Hide/show kernel threads
# Arrows + Enter = navigate and open process detail`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"mpstat — Per-CPU Statistics"}),e.jsx(a,{language:"bash",title:"mpstat — identify CPU hotspots",code:`# Install sysstat
dnf install sysstat

# All CPUs summary
mpstat 2 5

# Per-CPU breakdown (identify hot CPUs)
mpstat -P ALL 2 3
# 14:35:02  CPU    %usr   %nice    %sys %iowait    %irq   %soft  %steal  %guest  %gnice   %idle
# 14:35:02  all   38.25    0.00    8.50    2.75    0.25    0.25    0.00    0.00    0.00   50.00
# 14:35:02    0   98.02    0.00   1.98    0.00    0.00    0.00    0.00    0.00    0.00    0.00
# 14:35:02    1    2.00    0.00    1.00    0.00    0.50    0.50    0.00    0.00    0.00   96.00
# 14:35:02    2    3.00    0.00    2.00   11.00    0.00    0.00    0.00    0.00    0.00   84.00
# 14:35:02    3    1.00    0.00    1.00    0.00    0.00    0.00    0.00    0.00    0.00   98.00
# CPU 0 is nearly saturated — single-threaded app or IRQ affinity issue

# Check IRQ distribution (if %irq is high on one CPU)
cat /proc/interrupts | head -5
# Rebalance IRQs
systemctl status irqbalance

# Interrupt affinity for a specific IRQ
cat /proc/irq/24/smp_affinity   # bitmask of CPUs`}),e.jsxs(t,{type:"tip",title:"Single-CPU Saturation",children:["If ",e.jsx("code",{className:"code-inline",children:"mpstat -P ALL"})," shows one CPU at 100% while others are idle, the workload is single-threaded or an IRQ is pinned to that CPU. Check ",e.jsx("code",{className:"code-inline",children:"/proc/interrupts"})," and ensure ",e.jsx("code",{className:"code-inline",children:"irqbalance"})," is running."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"sar -u — Historical CPU Data"}),e.jsx(a,{language:"bash",title:"sar CPU utilisation — historical analysis",code:`# CPU usage today (10-minute intervals, default sysstat collection)
sar -u
sar -u ALL      # extended: %usr %nice %sys %iowait %steal %irq %soft %guest %idle

# Historical — specific date
sar -u -f /var/log/sa/sa08    # 8th of month

# Identify worst CPU period today
sar -u | sort -k5 -rn | head -5    # sort by %idle ascending (worst = lowest idle)

# Graph-friendly: output to CSV
sar -u -f /var/log/sa/sa$(date +%d) | grep -v "^$|^Linux|Average"   | awk '{print $1,$3,$4,$5,$6,$8}' > cpu_data.csv

# Real-time + history combined
sar -u 2 10   # every 2s, 10 samples

# CPU queue depths (runnable + blocked processes)
sar -q         # runq-sz, plist-sz, ldavg-1/5/15
sar -q | tail -3`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"nice, renice, and ionice"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsx("div",{children:e.jsx(a,{language:"bash",title:"nice and renice",code:`# nice value range: -20 (highest priority) to +19 (lowest)
# Default nice value for new processes: 0

# Start a new process with lower priority (nice +10)
nice -n 10 ./mybuildscript.sh

# Start with high priority (requires root for negative nice)
nice -n -5 ./realtime-app    # root only

# Renice a running process
renice -n 15 -p 14523       # lower priority for PID 14523
renice -n -5 -p 14523       # boost priority (root only)

# Renice all processes of a user
renice -n 10 -u appuser

# Renice all processes in a process group
renice -n 5 -g 14520

# Verify the change
ps -o pid,ni,comm -p 14523
#   PID  NI COMMAND
# 14523  15 mybuildscript`})}),e.jsx("div",{children:e.jsx(a,{language:"bash",title:"ionice — I/O scheduling priority",code:`# ionice class:
# 0 = none (inherit from CFQ)
# 1 = real-time (rt)   — guaranteed I/O time
# 2 = best-effort (be) — default; 0-7 priority
# 3 = idle             — only when disk is otherwise idle

# Set a process to idle I/O class (backup jobs)
ionice -c 3 -p $(pgrep rsync)

# Start a new process with idle I/O
ionice -c 3 nice -n 19 tar czf /backup/home.tar.gz /home

# Best-effort class, priority 0 (highest in class)
ionice -c 2 -n 0 -p $(pgrep mysqld)

# View current I/O class for a process
ionice -p $(pgrep rsync)
# idle: prio 0

# ionice only works with CFQ/BFQ schedulers
cat /sys/block/sda/queue/scheduler
# [mq-deadline] kyber bfq none
# Switch to BFQ for ionice support:
echo bfq > /sys/block/sda/queue/scheduler`})})]}),e.jsxs(t,{type:"exam",title:"Exam Tip — nice vs ionice",children:[e.jsx("code",{className:"code-inline",children:"nice"}),"/",e.jsx("code",{className:"code-inline",children:"renice"})," affects CPU scheduling. ",e.jsx("code",{className:"code-inline",children:"ionice"})," affects disk I/O scheduling. For a backup job that should not impact production, combine both: ",e.jsx("code",{className:"code-inline",children:"ionice -c 3 nice -n 19 ./backup.sh"}),". Remember that only root can set negative nice values."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"CPU Affinity — taskset & isolcpus"}),e.jsx(a,{language:"bash",title:"taskset — bind processes to specific CPUs",code:`# View current CPU affinity mask for a PID
taskset -p 14523
# pid 14523's current affinity mask: ff  (all 8 CPUs on a hex mask)

# Set affinity to CPUs 0 and 1 only (hex mask: 0x3)
taskset -p 3 14523
# pid 14523's new affinity mask: 3

# Human-readable CPU list syntax
taskset -cp 0,1 14523          # pin to CPU 0 and 1
taskset -cp 2-5 14523          # pin to CPUs 2 through 5

# Launch a new process pinned to CPU 3
taskset -c 3 ./latency-app

# Verify with ps
ps -o pid,psr,comm -p 14523   # psr = CPU currently running on

# Persist CPU affinity in a systemd unit:
# CPUAffinity=0 1   (in [Service] section)

# isolcpus — kernel parameter to reserve CPUs for exclusive use
# Add to /etc/default/grub GRUB_CMDLINE_LINUX:
# isolcpus=4-7 nohz_full=4-7 rcu_nocbs=4-7
# Then: grub2-mkconfig -o /boot/grub2/grub.cfg && reboot

# Verify isolation
cat /sys/devices/system/cpu/isolated    # e.g. 4-7
# Move a process onto an isolated CPU
taskset -cp 4 $(pgrep latency-app)`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"cgroups v2 — Resource Limits"}),e.jsxs("p",{className:"section-body mb-4",children:["Control groups v2 (unified hierarchy) is the default on RHEL 9. Limits are set via pseudo-files under",e.jsx("code",{className:"code-inline",children:"/sys/fs/cgroup/"}),". Systemd slice units are the recommended way to configure cgroups on RHEL."]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsx("div",{children:e.jsx(a,{language:"bash",title:"Inspecting cgroups v2",code:`# Check cgroup v2 is active
cat /proc/filesystems | grep cgroup
# nodev  cgroup2

mount | grep cgroup
# cgroup2 on /sys/fs/cgroup type cgroup2 (rw,nosuid,nodev,noexec)

# View a process's cgroup membership
cat /proc/14523/cgroup
# 0::/system.slice/myapp.service

# Inspect CPU limits for a service
systemctl show myapp.service | grep -E "CPU|Memory"
cat /sys/fs/cgroup/system.slice/myapp.service/cpu.max
# 200000 100000   ← 200ms per 100ms period = 2 CPUs max

# Current CPU usage
cat /sys/fs/cgroup/system.slice/myapp.service/cpu.stat
# usage_usec 45231000
# user_usec  38000000
# system_usec 7231000

# Real-time resource view
systemd-cgtop`})}),e.jsx("div",{children:e.jsx(a,{language:"bash",title:"Setting limits via systemd slice units",code:`# Create a slice for database workloads
# /etc/systemd/system/database.slice
[Unit]
Description=Database Workloads Slice

[Slice]
CPUWeight=500          # relative weight (default=100, range 1-10000)
CPUQuota=150%          # max 1.5 CPUs (150% of one core)
MemoryMax=4G           # hard memory limit
MemoryHigh=3G          # soft limit (throttle before hard)
MemorySwapMax=0        # disable swap for this slice
CPUAffinity=0-3        # bind to CPUs 0-3

# Assign a service to the slice:
# /etc/systemd/system/mysqld.service.d/override.conf
[Service]
Slice=database.slice

# Apply changes
systemctl daemon-reload
systemctl restart mysqld

# Direct cgroup manipulation (transient, testing only)
echo "200000 100000" > /sys/fs/cgroup/system.slice/mysqld.service/cpu.max
echo "4294967296"    > /sys/fs/cgroup/system.slice/mysqld.service/memory.max`})})]}),e.jsxs(t,{type:"warning",title:"cgroups v1 vs v2",children:["RHEL 8 defaults to cgroups v1 (multi-hierarchy). RHEL 9 defaults to cgroups v2 (unified hierarchy). The file names differ: v1 uses ",e.jsx("code",{className:"code-inline",children:"cpu.cfs_quota_us"})," and ",e.jsx("code",{className:"code-inline",children:"cpu.cfs_period_us"}),"; v2 uses the combined ",e.jsx("code",{className:"code-inline",children:"cpu.max"}),". Always check which version is mounted before writing cgroup files directly."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"perf — Linux Performance Counters"}),e.jsx(a,{language:"bash",title:"perf tool basics",code:`# Install perf (matches running kernel version)
dnf install perf

# perf stat — count hardware events for a command
perf stat ./mybenchmark
# Performance counter stats for './mybenchmark':
#      12,345,678      cycles
#       9,876,543      instructions              #    0.80  insn per cycle
#       1,234,567      cache-references
#          98,765      cache-misses              #    8.00% of all cache refs
#           2,345      branch-misses
#       0.523456789 seconds time elapsed

# perf top — live profiling (like top but for functions)
perf top                          # system-wide
perf top -p 14523                 # specific process
perf top -C 0,1                   # specific CPUs

# perf record — sample CPU at 99Hz for 30 seconds
perf record -F 99 -a -g -- sleep 30    # all CPUs, call graph
perf record -F 99 -p 14523 -g          # specific PID

# perf report — view recorded samples
perf report                  # interactive TUI
perf report --stdio          # plain text output
perf report --sort=dso       # sort by shared library

# perf annotate — show hottest source lines (needs debug symbols)
perf annotate -d mysqld

# Flame graph (requires brendangregg/FlameGraph scripts)
perf record -F 99 -a -g -- sleep 60
perf script | stackcollapse-perf.pl | flamegraph.pl > cpu-flame.svg

# perf stat — specific events
perf stat -e cache-misses,cache-references,instructions,cycles ./app`}),e.jsxs(t,{type:"tip",title:"perf and Kernel Symbols",children:["For meaningful ",e.jsx("code",{className:"code-inline",children:"perf report"})," output, install ",e.jsx("code",{className:"code-inline",children:"kernel-debuginfo"})," and ",e.jsx("code",{className:"code-inline",children:"kernel-debuginfo-common"})," matching your kernel version. Without symbols, you'll see raw addresses. Application profiling also benefits from ",e.jsx("code",{className:"code-inline",children:"-g"})," (debug info) compile flag."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Frequency Scaling — turbostat & cpupower"}),e.jsx(a,{language:"bash",title:"CPU frequency and power state inspection",code:`# Install tools
dnf install kernel-tools   # provides cpupower, turbostat

# turbostat — per-core frequency, C-states, temperature
turbostat --interval 5
# Core  CPU   Avg_MHz  Busy%  Bzy_MHz TSC_MHz   IRQ SMI  CPU%c1  CPU%c3  CPU%c6  CPU%c7  CoreTmp
#          -   1234.5   30.9   3990.2  3600.0  1234   0    15.2    1.2    52.6     0.0      58

# turbostat for a specific command
turbostat -- sleep 5
turbostat -s PkgTmp,Avg_MHz,Busy%,Bzy_MHz -- ./benchmark

# cpupower — CPU frequency governor
cpupower frequency-info
# current CPU frequency: 3.60 GHz (hardware limits: 400 MHz - 5.00 GHz)
# available cpufreq governors: performance powersave

cpupower frequency-info --governors

# Set performance governor (disables frequency scaling — use for benchmarks)
cpupower frequency-set -g performance

# Set powersave governor (default on most servers)
cpupower frequency-set -g powersave

# Force a specific frequency
cpupower frequency-set -f 3600MHz   # root only

# Check current scaling governor for each CPU
cat /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# C-states (sleep states) — deeper = lower power but higher latency
cpupower idle-info
# Available idle states: POLL C1 C1E C3 C6 C7

# Disable deep C-states for latency-sensitive workloads
cpupower idle-set -D 3    # disable C-states deeper than C3`}),e.jsxs(t,{type:"exam",title:"Exam Tip — Performance Governor",children:["If a benchmark shows unexpectedly low CPU performance, the frequency governor may be set to ",e.jsx("code",{className:"code-inline",children:"powersave"}),". Switch to ",e.jsx("code",{className:"code-inline",children:"performance"})," with ",e.jsx("code",{className:"code-inline",children:"cpupower frequency-set -g performance"}),". To persist, use a udev rule or systemd service — the governor resets on reboot unless configured."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Context Switches — pidstat -w"}),e.jsx(a,{language:"bash",title:"Measuring context switch rates",code:`# System-wide context switches (from vmstat)
vmstat 1 5
# cs column = context switches per second

# Per-process context switches with pidstat
pidstat -w 1 5
# 14:40:01    UID    PID   cswch/s nvcswch/s  Command
# 14:40:01      0      1      2.00      0.00  systemd
# 14:40:01   1000  14523    450.00    120.00  java
# 14:40:01    999   2341     85.00     12.00  mysqld

# cswch/s  = voluntary context switches per second
#            (process yielded CPU, e.g. waiting for I/O, sleep, mutex)
# nvcswch/s = non-voluntary context switches per second
#            (kernel preempted the process — running too long)

# High nvcswch/s → process is CPU-hungry, being preempted
# High cswch/s  → process does a lot of waiting (I/O, synchronisation)

# Thread-level context switches
pidstat -w -t -p 14523 1

# System-wide from /proc/stat
grep ctxt /proc/stat
# ctxt 1234567890   (cumulative since boot)

# Check per-process from /proc/[pid]/status
grep -E "voluntary|nonvoluntary" /proc/14523/status
# voluntary_ctxt_switches:        3456
# nonvoluntary_ctxt_switches:      789`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Performance Co-Pilot (PCP)"}),e.jsx(a,{language:"bash",title:"PCP — pmstat, pmrep, pcp-dstat",code:`# Install PCP
dnf install pcp pcp-system-tools pcp-doc

# Enable and start data collection daemon
systemctl enable --now pmcd pmlogger

# pmstat — like vmstat but with more detail
pmstat -s 5 -t 2sec    # 5 samples every 2 seconds

# pmrep — flexible reporting (CSV, columnar, metrics by name)
pmrep -s 5 kernel.all.cpu.user kernel.all.cpu.sys
pmrep -o csv -s 100 -t 5sec kernel.all.load > load.csv

# pcp-dstat (modern dstat replacement)
pcp dstat --cpu --mem --net --disk 2 5

# pminfo — explore available metrics
pminfo -d kernel.all.cpu
pminfo -t kernel.percpu.cpu.user   # with help text

# Live analysis
pcp atop           # like atop
pcp htop           # like htop backed by PCP

# Historical playback (pmlogger writes archives to /var/log/pcp/pmlogger/)
pmrep -a /var/log/pcp/pmlogger/$(hostname)/$(date +%Y%m%d)       kernel.all.load

# PCP web API (pmproxy)
systemctl enable --now pmproxy
# Access metrics: http://localhost:44322/metrics  (Prometheus format)`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Load Testing — stress & stress-ng"}),e.jsx(a,{language:"bash",title:"stress and stress-ng for controlled load generation",code:`# Install
dnf install stress stress-ng

# stress — simple load generator
stress --cpu 4                     # 4 CPU workers (infinite)
stress --cpu 2 --timeout 60        # 2 CPU workers for 60 seconds
stress --vm 2 --vm-bytes 512M      # 2 memory workers, 512 MiB each
stress --io 4 --hdd 2              # 4 I/O workers + 2 disk workers

# stress-ng — more powerful with hundreds of stressors
stress-ng --cpu 4 --timeout 30s --metrics-brief
# cpu 4 97.3% (bogo ops: 1234567)

# Memory pressure test
stress-ng --vm 2 --vm-bytes 75% --timeout 60s

# I/O stressor targeting specific filesystem
stress-ng --hdd 2 --hdd-opts sync --temp-path /tmp --timeout 30s

# All stressors sequentially (useful for burn-in)
stress-ng --class cpu --timeout 60s --metrics-brief

# Test specific CPU vulnerability mitigations
stress-ng --cpu 4 --cpu-method matrixprod --timeout 30s

# Test with thermal monitoring
stress-ng --cpu $(nproc) --timeout 60s &   watch -n 2 "sensors | grep -E 'Core|temp'"

# Limit stress-ng with cgroups
systemd-run --scope -p CPUQuota=50% stress-ng --cpu 4 --timeout 30s`})]}),e.jsx(n,{title:"CPU Performance Investigation Workflow",steps:[{label:"Check load average and CPU states",sub:"uptime  •  top (1 key for per-CPU)  •  mpstat -P ALL 2 3",color:"blue"},{label:"Is CPU saturated or I/O-bound?",sub:"If wa% > 10% → I/O issue, not CPU. If us%+sy% near 100% → CPU-bound.",color:"default"},{label:"Identify top CPU consumers",sub:"top (Shift+P)  •  ps -eo pid,comm,%cpu --sort=-%cpu | head -10",color:"yellow"},{label:"Check for single-CPU hotspot",sub:"mpstat -P ALL → one core at 100%?  •  Check irqbalance and IRQ affinity",color:"yellow"},{label:"Examine context switch rate",sub:"vmstat cs column  •  pidstat -w 1 5 for per-process breakdown",color:"default"},{label:"Profile with perf",sub:"perf top -p PID  •  perf record -F 99 -g; perf report for function-level detail",color:"purple"},{label:"Check CPU frequency / governor",sub:"cpupower frequency-info  •  turbostat — is performance governor set?",color:"default"},{label:"Review cgroup/slice limits",sub:"systemd-cgtop  •  cat /sys/fs/cgroup/.../cpu.max  •  systemctl show svc | grep CPU",color:"default"},{label:"Review historical patterns",sub:"sar -u -f /var/log/sa/sa$(date +%d)  •  sar -q for run queue history",color:"green"},{label:"Tune and validate",sub:"nice/renice, taskset CPU affinity, cgroup limits, governor; confirm with sar/perf",color:"green"}]}),e.jsx(c,{title:"CPU & Performance — Quick Reference",rows:[{cmd:"uptime",desc:"Load averages for 1, 5, 15 minutes",note:"Compare against CPU count for saturation check"},{cmd:"top",desc:"Interactive process/CPU monitor",note:"1=per-CPU, Shift+P=sort CPU, Shift+H=threads"},{cmd:"mpstat -P ALL 2 3",desc:"Per-CPU utilisation stats",note:"Identify single-CPU hotspots or IRQ imbalance"},{cmd:"sar -u ALL",desc:"Historical CPU utilisation",note:"-f /var/log/sa/saDD for specific day"},{cmd:"sar -q",desc:"Run queue and load average history",note:"runq-sz column shows scheduler queue depth"},{cmd:"pidstat -u 1 5",desc:"Per-process CPU utilisation",note:"-t for threads, -w for context switches"},{cmd:"pidstat -w 1 5",desc:"Voluntary/non-voluntary context switches",note:"cswch/s and nvcswch/s per process"},{cmd:"nice -n 10 cmd",desc:"Start command with lower CPU priority",note:"-20 = max priority (root); +19 = min priority"},{cmd:"renice -n 15 -p PID",desc:"Adjust priority of running process",note:"Negative values require root"},{cmd:"ionice -c 3 -p PID",desc:"Set idle I/O class for process",note:"Only effective with CFQ/BFQ scheduler"},{cmd:"taskset -cp 0,1 PID",desc:"Pin process to CPUs 0 and 1",note:"Use -c for CPU list, no -c for hex mask"},{cmd:"perf top -p PID",desc:"Live CPU profiling for a process",note:"Shows hottest functions in real time"},{cmd:"perf stat ./app",desc:"Hardware counter stats for a command",note:"Instructions, cycles, cache-misses, branches"},{cmd:"perf record -F 99 -g -p PID",desc:"Sample at 99Hz with call graphs",note:"Follow with perf report"},{cmd:"cpupower frequency-set -g performance",desc:"Set CPU to performance frequency governor",note:"Disables power saving for benchmarks"},{cmd:"turbostat --interval 5",desc:"Per-core frequency, C-states, temperature",note:"Requires kernel-tools package"},{cmd:"systemd-cgtop",desc:"Live cgroup resource usage tree",note:"Shows CPU and memory per slice/service"},{cmd:"systemctl set-property svc CPUQuota=50%",desc:"Limit a service to 50% of one CPU",note:"Persists to /etc/systemd/system.control/"},{cmd:"stress-ng --cpu 4 --timeout 30s",desc:"Generate controlled CPU load for testing",note:"--metrics-brief for performance results"},{cmd:"pcp dstat --cpu --mem 2 5",desc:"PCP-backed dstat for CPU and memory",note:"Requires pcp-system-tools package"}]}),e.jsx(t,{type:"exam",title:"Exam Tips — CPU Performance",children:e.jsxs("ul",{className:"space-y-1.5 list-disc pl-4",children:[e.jsx("li",{children:"Load average above the number of CPUs means the system is overloaded. Always divide load by CPU count."}),e.jsxs("li",{children:["High ",e.jsx("code",{className:"code-inline",children:"wa%"})," (iowait) in ",e.jsx("code",{className:"code-inline",children:"top"})," means the CPU is idle waiting for I/O — the bottleneck is disk/network, not CPU."]}),e.jsxs("li",{children:["High ",e.jsx("code",{className:"code-inline",children:"st%"})," (steal) in a VM means the hypervisor host is CPU-contended — escalate to infrastructure team."]}),e.jsxs("li",{children:["To limit a systemd service's CPU: ",e.jsx("code",{className:"code-inline",children:"systemctl set-property myservice.service CPUQuota=50%"})," or add ",e.jsx("code",{className:"code-inline",children:"CPUQuota=50%"})," to the unit's ",e.jsx("code",{className:"code-inline",children:"[Service]"})," section."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"perf"})," requires the ",e.jsx("code",{className:"code-inline",children:"perf"})," package and often ",e.jsx("code",{className:"code-inline",children:"kernel-debuginfo"})," for symbol resolution."]}),e.jsxs("li",{children:["For CPU affinity that survives restarts, use ",e.jsx("code",{className:"code-inline",children:"CPUAffinity="})," in the systemd unit ",e.jsx("code",{className:"code-inline",children:"[Service]"})," section."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"sysstat"})," must be installed and ",e.jsx("code",{className:"code-inline",children:"sysstat.service"})," (or timer) enabled for ",e.jsx("code",{className:"code-inline",children:"sar"})," historical data to accumulate."]})]})})]})}export{O as C,D as M,U as S};
