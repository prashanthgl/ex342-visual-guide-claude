import { Network } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import InfoBox from '../components/InfoBox'
import CodeBlock from '../components/CodeBlock'
import CommandTable from '../components/CommandTable'
import FlowDiagram from '../components/FlowDiagram'
import { HorizontalFlow } from '../components/FlowDiagram'

export default function NetworkDiagnostics() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      <PageHeader
        icon={Network}
        title="Network Diagnostics"
        subtitle="Investigate connectivity, routing, firewall rules, DNS resolution, interface errors, and network performance on Red Hat Enterprise Linux systems."
        tags={['EX342', 'Networking', 'ip', 'ss', 'tcpdump', 'firewalld', 'DNS', 'bonding']}
      />

      {/* ── 1. Network Stack Layers ───────────────────────────────────── */}
      <section>
        <h2 className="section-title">Linux Network Stack Layers</h2>
        <HorizontalFlow
          steps={[
            { label: 'Physical', sub: 'NIC, cable, SFP', color: 'default' },
            { label: 'Data Link', sub: 'Ethernet, MAC, ethtool', color: 'blue' },
            { label: 'Network', sub: 'IP, routing, ip route', color: 'green' },
            { label: 'Transport', sub: 'TCP/UDP, ss, netstat', color: 'yellow' },
            { label: 'Socket', sub: 'POSIX socket API', color: 'purple' },
            { label: 'Application', sub: 'HTTP, DNS, SSH…', color: 'red' },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {[
            {
              layer: 'Physical / Data Link',
              tools: ['ethtool -i eth0 (driver info)', 'ethtool -S eth0 (hardware counters)', 'ip link show (state, flags, MTU)', 'dmesg | grep eth0 (driver messages)'],
              color: 'border-blue-700 bg-blue-950/30',
              label: 'text-blue-300',
            },
            {
              layer: 'Network (IP)',
              tools: ['ip addr (addresses)', 'ip route (routing table)', 'ip neigh (ARP cache)', 'ping / traceroute / mtr'],
              color: 'border-green-700 bg-green-950/30',
              label: 'text-green-300',
            },
            {
              layer: 'Transport (TCP/UDP)',
              tools: ['ss -tulpn (listening sockets)', 'ss -s (socket summary)', 'ss state established', 'cat /proc/net/sockstat'],
              color: 'border-yellow-700 bg-yellow-950/30',
              label: 'text-yellow-300',
            },
            {
              layer: 'Application / Firewall',
              tools: ['firewall-cmd --list-all', 'nft list ruleset', 'tcpdump -i eth0', 'dig / nslookup / curl -v'],
              color: 'border-purple-700 bg-purple-950/30',
              label: 'text-purple-300',
            },
          ].map(l => (
            <div key={l.layer} className={`rounded-xl border p-4 ${l.color}`}>
              <h3 className={`text-sm font-semibold mb-2 ${l.label}`}>{l.layer}</h3>
              <ul className="space-y-1">
                {l.tools.map(t => (
                  <li key={t} className="text-xs font-mono text-gray-300">{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. ip command suite ───────────────────────────────────────── */}
      <section>
        <h2 className="section-title">ip Command Suite</h2>
        <p className="section-body mb-4">
          The <code className="code-inline">ip</code> command (from <em>iproute2</em>) replaces the deprecated
          <code className="code-inline">ifconfig</code>, <code className="code-inline">route</code>, <code className="code-inline">arp</code>, and <code className="code-inline">netstat</code> tools.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <CodeBlock
              language="bash"
              title="ip addr — address management"
              code={`# Show all interfaces and addresses
ip addr show
ip addr show eth0          # specific interface
ip -br addr show           # brief one-liner per interface

# Add an address
ip addr add 192.168.1.100/24 dev eth0

# Remove an address
ip addr del 192.168.1.100/24 dev eth0

# Bring interface up/down
ip link set eth0 up
ip link set eth0 down

# Change MTU
ip link set eth0 mtu 9000

# Show interface statistics (errors, drops)
ip -s link show eth0
# RX:  bytes  packets  errors  dropped  missed  mcast
#   12345678  98765     0       12       0       234
# TX:  bytes  packets  errors  dropped  carrier collsns
#    9876543  76543     0        0       0       0

# ip -json for scripting
ip -json addr show | python3 -m json.tool`}
            />
          </div>
          <div>
            <CodeBlock
              language="bash"
              title="ip route and ip neigh"
              code={`# Show routing table
ip route show
ip route show table all    # all routing tables
ip route show table main

# Sample output:
# default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.50 metric 100
# 192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.50

# Add a static route
ip route add 10.10.0.0/16 via 192.168.1.254 dev eth0

# Add default gateway
ip route add default via 192.168.1.1

# Delete a route
ip route del 10.10.0.0/16

# Show route for a specific destination
ip route get 8.8.8.8
# 8.8.8.8 via 192.168.1.1 dev eth0 src 192.168.1.50 uid 0

# ARP / Neighbour cache
ip neigh show
# 192.168.1.1 dev eth0 lladdr aa:bb:cc:dd:ee:ff REACHABLE
# 192.168.1.200 dev eth0  FAILED   ← not responding

# Flush stale ARP entries
ip neigh flush dev eth0

# Network namespaces
ip netns list
ip netns add testns
ip netns exec testns ip addr show`}
            />
          </div>
        </div>

        <InfoBox type="tip" title="Persistent Configuration with nmcli">
          Changes made with <code className="code-inline">ip</code> are not persistent across reboots. To persist, use <code className="code-inline">nmcli</code> or edit <code className="code-inline">/etc/NetworkManager/system-connections/</code>. Example: <code className="code-inline">nmcli con mod eth0 ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1</code> followed by <code className="code-inline">nmcli con up eth0</code>.
        </InfoBox>
      </section>

      {/* ── 3. ss ─────────────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">ss — Socket Statistics</h2>
        <CodeBlock
          language="bash"
          title="ss — comprehensive socket inspection"
          code={`# Show all listening TCP and UDP sockets with process info
ss -tulpn
# Netid  State   Recv-Q  Send-Q  Local Address:Port   Peer Address:Port   Process
# tcp    LISTEN  0       128     0.0.0.0:22            0.0.0.0:*           users:(("sshd",pid=1234,fd=3))
# tcp    LISTEN  0       511     *:80                  *:*                 users:(("nginx",pid=5678,fd=6))
# udp    UNCONN  0       0       0.0.0.0:53            0.0.0.0:*           users:(("named",pid=910,fd=5))

# -t TCP, -u UDP, -l listening, -p show process, -n numeric (no DNS)

# Show all established TCP connections
ss -tn state established

# Socket summary
ss -s
# Total: 456
# TCP:   234 (estab 89, closed 12, orphaned 2, timewait 10)
# Transport  Total  IP   IPv6
# RAW        0      0    0
# UDP        12     10   2
# TCP        222    180  42

# Filter by destination port
ss -tn dport = :443

# Filter by source port
ss -tn sport = :8080

# Filter by remote address
ss dst 10.0.0.50

# Show connections with timer info
ss -to state established

# Extended info (TCP internals: RTT, congestion window, etc.)
ss -tei state established
# rto:200 rtt:0.5/0.25 ato:40 mss:1460 rcvmss:1460 advmss:1460
# cwnd:10 ssthresh:7 bytes_sent:12345 bytes_retrans:0
# segs_out:456 segs_in:789 data_segs_out:200

# Detect SYN flood (many SYN-RECV states)
ss -tn state syn-recv | wc -l

# Watch connections to a specific port in real time
watch -n 1 "ss -tn state established dport = :3306 | wc -l"`}
        />
      </section>

      {/* ── 4. ethtool ───────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">Network Interface Diagnostics — ethtool</h2>
        <CodeBlock
          language="bash"
          title="ethtool — interface hardware diagnostics"
          code={`# Basic info: speed, duplex, link status
ethtool eth0
# Settings for eth0:
#     Supported link modes:   1000baseT/Full 10000baseT/Full
#     Speed: 10000Mb/s
#     Duplex: Full
#     Auto-negotiation: on
#     Link detected: yes     ← critical field

# Driver and firmware info
ethtool -i eth0
# driver: ixgbe
# version: 5.1.0-k
# firmware-version: 0x800009a7, 1.2144.0

# Interface statistics (hardware counters — NIC-specific)
ethtool -S eth0 | grep -E "error|drop|miss|pause" | head -20
# rx_dropped: 0
# tx_errors: 0
# rx_crc_errors: 0         ← non-zero = bad cable/SFP
# rx_frame_errors: 0
# rx_fifo_errors: 123      ← ring buffer overflow (increase ring size)

# Ring buffer sizes (Rx/Tx descriptor counts)
ethtool -g eth0
# Ring parameters for eth0:
# Pre-set maximums: RX: 4096, TX: 4096
# Current hardware settings: RX: 512, TX: 512
# Increase ring buffer to reduce drops:
ethtool -G eth0 rx 4096 tx 4096

# Pause frames (flow control) — can cause head-of-line blocking
ethtool -a eth0
# Pause parameters for eth0:
# Autonegotiate: on
# RX: on
# TX: on
# Disable pause for latency-sensitive workloads:
ethtool -A eth0 rx off tx off

# Offload features (TSO, GSO, GRO, LRO)
ethtool -k eth0 | grep -E "tcp-segmentation|generic|large"

# Disable LRO if causing latency issues
ethtool -K eth0 lro off

# Test cable with time-domain reflectometry (if supported)
ethtool -t eth0 offline`}
        />
        <InfoBox type="warning" title="rx_fifo_errors Growing">
          Non-zero and growing <code className="code-inline">rx_fifo_errors</code> in <code className="code-inline">ethtool -S</code> means the NIC's ring buffer is overflowing — packets are being dropped before the kernel can process them. Increase the ring buffer size with <code className="code-inline">ethtool -G eth0 rx 4096</code> and consider tuning <code className="code-inline">net.core.netdev_max_backlog</code>.
        </InfoBox>
      </section>

      {/* ── 5. tcpdump ───────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">tcpdump — Packet Capture</h2>
        <CodeBlock
          language="bash"
          title="tcpdump capture syntax and filters"
          code={`# Install
dnf install tcpdump

# Basic capture on interface (Ctrl+C to stop)
tcpdump -i eth0

# Save to file (for later analysis in Wireshark)
tcpdump -i eth0 -w /tmp/capture.pcap

# Read from file
tcpdump -r /tmp/capture.pcap

# Verbose output (-v, -vv, -vvv for increasing detail)
tcpdump -i eth0 -vnn   # -n: no DNS, -nn: no DNS or service names

# ── Filters ─────────────────────────────────────────────────
# By host
tcpdump -i eth0 host 192.168.1.100
tcpdump -i eth0 src host 192.168.1.100
tcpdump -i eth0 dst host 8.8.8.8

# By port
tcpdump -i eth0 port 443
tcpdump -i eth0 dst port 22
tcpdump -i eth0 portrange 8000-8080

# By network
tcpdump -i eth0 net 10.0.0.0/8
tcpdump -i eth0 src net 192.168.0.0/16

# By protocol
tcpdump -i eth0 tcp
tcpdump -i eth0 udp
tcpdump -i eth0 icmp

# Compound filters (and, or, not)
tcpdump -i eth0 'host 10.0.0.50 and port 3306'
tcpdump -i eth0 'tcp and not port 22'
tcpdump -i eth0 '(src 10.0.0.1 or src 10.0.0.2) and dst port 80'

# Capture only N packets
tcpdump -i eth0 -c 100 host 10.0.0.50

# Snapshot length (-s, default 65535)
tcpdump -i eth0 -s 0 -w full.pcap   # capture full packets

# Rotating capture files (100MB each, keep 10)
tcpdump -i eth0 -w /tmp/cap-%Y%m%d%H%M%S.pcap -G 60 -C 100 -W 10

# Read back with timestamps
tcpdump -tttt -r capture.pcap | head -20
# 2025-09-15 14:32:01.123456 IP 10.0.0.5.52345 > 10.0.0.1.80: Flags [S]`}
        />
        <InfoBox type="exam" title="Exam Tip — tcpdump Flags">
          TCP flags in tcpdump: <code className="code-inline">[S]</code>=SYN, <code className="code-inline">[.]</code>=ACK, <code className="code-inline">[S.]</code>=SYN-ACK, <code className="code-inline">[F.]</code>=FIN, <code className="code-inline">[R.]</code>=RST, <code className="code-inline">[P.]</code>=PSH+ACK. A connection that sends <code className="code-inline">[S]</code> but only receives <code className="code-inline">[R]</code> or nothing indicates a firewall drop or service not listening.
        </InfoBox>
      </section>

      {/* ── 6. firewalld ─────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">firewalld — Zone-Based Firewall</h2>
        <CodeBlock
          language="bash"
          title="firewall-cmd — managing rules"
          code={`# Show all active zones and their interfaces
firewall-cmd --get-active-zones
# public
#   interfaces: eth0
# internal
#   interfaces: eth1

# List everything in the active zone
firewall-cmd --list-all
firewall-cmd --zone=public --list-all

# ── Services ─────────────────────────────────────────────────
# Allow a service permanently
firewall-cmd --permanent --zone=public --add-service=http
firewall-cmd --permanent --zone=public --add-service=https

# Remove a service
firewall-cmd --permanent --zone=public --remove-service=telnet

# List available service definitions
firewall-cmd --get-services

# ── Ports ────────────────────────────────────────────────────
# Allow a specific port
firewall-cmd --permanent --zone=public --add-port=8080/tcp
firewall-cmd --permanent --zone=public --add-port=10000-10100/udp

# Remove a port
firewall-cmd --permanent --zone=public --remove-port=8080/tcp

# ── Rich Rules (advanced matching) ───────────────────────────
# Allow from specific source
firewall-cmd --permanent --zone=public \
  --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" service name="ssh" accept'

# Rate limiting
firewall-cmd --permanent --zone=public \
  --add-rich-rule='rule service name="http" limit value="100/m" accept'

# Reject with logging
firewall-cmd --permanent --zone=public \
  --add-rich-rule='rule family="ipv4" source address="192.168.99.0/24" reject'

# ── Runtime vs Permanent ─────────────────────────────────────
# Runtime (immediate effect, lost on reload)
firewall-cmd --zone=public --add-port=9090/tcp

# Permanent (survives reload, requires --reload to activate)
firewall-cmd --permanent --zone=public --add-port=9090/tcp
firewall-cmd --reload    # activate permanent rules

# Copy runtime to permanent (emergency scenario)
firewall-cmd --runtime-to-permanent

# ── Masquerading / NAT ───────────────────────────────────────
firewall-cmd --permanent --zone=public --add-masquerade

# ── Panic mode (block all traffic)  ─────────────────────────
firewall-cmd --panic-on     # emergency block all
firewall-cmd --panic-off    # restore normal operation`}
        />
      </section>

      {/* ── 7. nftables ──────────────────────────────────────────────── */}
      <section>
        <h2 className="section-title">nftables — Low-Level Ruleset</h2>
        <CodeBlock
          language="bash"
          title="nftables — list and inspect rules"
          code={`# List full nftables ruleset (what firewalld programs behind the scenes)
nft list ruleset

# Sample output:
# table inet firewalld {
#     chain filter_INPUT {
#         type filter hook input priority filter; policy accept;
#         ct state { established, related } accept
#         iifname "lo" accept
#         ip protocol icmp accept
#         tcp dport 22 accept comment "ssh"
#         tcp dport { 80, 443 } accept comment "http/https"
#         reject with icmpx admin-prohibited
#     }
# }

# List a specific table
nft list table inet filter

# Watch nftables rule changes in real time
nft monitor

# One-shot rule: block a specific source IP (transient)
nft add rule inet firewalld filter_INPUT ip saddr 203.0.113.5 drop

# Flush all rules (dangerous!)
nft flush ruleset

# Load rules from file
nft -f /etc/nftables.conf

# Check nftables service (used instead of iptables on RHEL 9)
systemctl status nftables`}
        />
        <InfoBox type="info" title="firewalld vs nftables vs iptables">
          On RHEL 9, <strong>firewalld</strong> is the management layer; it writes to the kernel's nftables backend by default (replacing the old iptables backend). Direct <code className="code-inline">nft</code> commands for inspection are fine; avoid writing nft rules directly if firewalld is managing the system — changes may be overwritten on reload.
        </InfoBox>
      </section>

      {/* ── 8. DNS Troubleshooting ───────────────────────────────────── */}
      <section>
        <h2 className="section-title">DNS Troubleshooting</h2>
        <CodeBlock
          language="bash"
          title="dig, nslookup, and systemd-resolved"
          code={`# Basic DNS lookup with dig
dig example.com
dig example.com A         # A record (IPv4)
dig example.com AAAA      # AAAA record (IPv6)
dig example.com MX        # mail exchanger
dig -x 8.8.8.8            # reverse lookup (PTR)

# Trace the full DNS resolution path
dig +trace example.com

# Query a specific DNS server
dig @8.8.8.8 example.com
dig @192.168.1.1 internal.corp.local

# Short output
dig +short example.com
# 93.184.216.34

# nslookup (simpler interactive or one-shot)
nslookup example.com
nslookup example.com 8.8.8.8     # use specific server

# ── Configuration files ──────────────────────────────────────
# DNS server list
cat /etc/resolv.conf
# nameserver 192.168.1.1
# nameserver 8.8.8.8
# search corp.local example.com   ← search domain suffix
# options ndots:5 timeout:2 attempts:3

# Resolution order (dns = DNS, files = /etc/hosts)
cat /etc/nsswitch.conf | grep hosts
# hosts: files dns myhostname

# /etc/hosts — static entries (checked before DNS with default nsswitch)
cat /etc/hosts

# ── systemd-resolved ─────────────────────────────────────────
# Status and active servers
resolvectl status
resolvectl dns          # show per-interface DNS config

# Query via systemd-resolved
resolvectl query example.com

# Flush DNS cache
resolvectl flush-caches

# Statistics (cache hits, DNSSEC validations)
resolvectl statistics

# Check if resolved is the stub resolver
cat /etc/resolv.conf | head -3
# nameserver 127.0.0.53      ← systemd-resolved stub
# options edns0 trust-ad

# Per-interface DNS (useful to debug split-horizon)
resolvectl dns eth0
resolvectl domain eth0`}
        />
        <InfoBox type="exam" title="Exam Tip — DNS Resolution Order">
          When DNS resolution fails for internal names, check: (1) <code className="code-inline">/etc/nsswitch.conf</code> hosts line has <code className="code-inline">dns</code>, (2) <code className="code-inline">/etc/resolv.conf</code> has the correct nameserver, (3) firewall allows UDP/TCP port 53 to the DNS server, (4) <code className="code-inline">resolvectl flush-caches</code> to clear stale cache.
        </InfoBox>
      </section>

      {/* ── 9. Bonding and Teaming ───────────────────────────────────── */}
      <section>
        <h2 className="section-title">Network Bonding &amp; Teaming</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <CodeBlock
              language="bash"
              title="Bonding with nmcli"
              code={`# Create a bond interface
nmcli con add type bond \
  con-name bond0 \
  ifname bond0 \
  bond.options "mode=active-backup,miimon=100"

# Add slaves to the bond
nmcli con add type ethernet \
  con-name bond0-slave1 \
  ifname eth1 \
  master bond0

nmcli con add type ethernet \
  con-name bond0-slave2 \
  ifname eth2 \
  master bond0

# Bring up the bond
nmcli con up bond0

# Bond modes:
# 0 = balance-rr (round-robin, basic load balancing)
# 1 = active-backup (failover only)
# 2 = balance-xor
# 3 = broadcast
# 4 = 802.3ad (LACP — requires switch support)
# 5 = balance-tlb (adaptive transmit load balancing)
# 6 = balance-alb (adaptive load balancing)`}
            />
          </div>
          <div>
            <CodeBlock
              language="bash"
              title="Bond status and diagnostics"
              code={`# Check bond status
cat /proc/net/bonding/bond0
# Ethernet Channel Bonding Driver: v3.7.1
# Bonding Mode: active-backup
# Primary Slave: eth1 (primary_reselect failure)
# Currently Active Slave: eth1
# MII Status: up
# MII Polling Interval (ms): 100
# Up Delay (ms): 0
# Down Delay (ms): 0
#
# Slave Interface: eth1
# MII Status: up
# Speed: 10000 Mbps
# Duplex: full
# Link Failure Count: 0
#
# Slave Interface: eth2
# MII Status: up
# Speed: 10000 Mbps
# Link Failure Count: 2   ← has failed twice

# View with ip
ip link show bond0
ip addr show bond0

# Force failover to test
echo "slave eth2" > /sys/class/net/bond0/bonding/active_slave`}
            />
          </div>
        </div>
      </section>

      {/* ── 10. Network Namespaces ───────────────────────────────────── */}
      <section>
        <h2 className="section-title">Network Namespaces</h2>
        <CodeBlock
          language="bash"
          title="ip netns — network isolation"
          code={`# List all network namespaces
ip netns list

# Create a new namespace
ip netns add testns

# Execute a command inside a namespace
ip netns exec testns ip addr show
ip netns exec testns ip link show

# Create a veth pair (virtual ethernet cable between namespaces)
ip link add veth0 type veth peer name veth1

# Move veth1 into testns
ip link set veth1 netns testns

# Configure addresses on both ends
ip addr add 10.100.0.1/24 dev veth0
ip netns exec testns ip addr add 10.100.0.2/24 dev veth1

# Bring both up
ip link set veth0 up
ip netns exec testns ip link set veth1 up
ip netns exec testns ip link set lo up

# Test connectivity
ping -c 3 10.100.0.2
ip netns exec testns ping -c 3 10.100.0.1

# Delete the namespace (also removes its interfaces)
ip netns del testns

# Container network namespaces (accessible via nsenter)
# Find container PID
docker inspect --format '{{.State.Pid}}' mycontainer
nsenter -t <PID> -n ip addr show`}
        />
      </section>

      {/* ── 11. Network Performance ──────────────────────────────────── */}
      <section>
        <h2 className="section-title">Network Performance — iperf3 &amp; MTU</h2>
        <CodeBlock
          language="bash"
          title="iperf3 — bandwidth testing"
          code={`# Install iperf3
dnf install iperf3

# Server side (listens on port 5201)
iperf3 -s
iperf3 -s -p 5001 -D    # custom port, daemonise

# Client side — basic TCP test
iperf3 -c 10.0.0.50
# [ ID] Interval     Transfer     Bitrate         Retr
# [  5]  0.00-10.00  11.0 GBytes  9.45 Gbits/sec    0   sender
# [  5]  0.00-10.00  11.0 GBytes  9.44 Gbits/sec        receiver

# UDP test (latency and packet loss)
iperf3 -c 10.0.0.50 -u -b 1G    # UDP at 1 Gbps target

# Reverse mode (server sends, client receives)
iperf3 -c 10.0.0.50 -R

# Parallel streams
iperf3 -c 10.0.0.50 -P 4        # 4 parallel connections

# Test for 30 seconds
iperf3 -c 10.0.0.50 -t 30`}
        />
        <CodeBlock
          language="bash"
          title="MTU diagnostics — black hole detection"
          code={`# Check interface MTU
ip link show eth0 | grep mtu
# 2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...

# Test effective path MTU with ping (fragment probe)
# -M do = don't fragment, -s = payload size
ping -M do -s 1472 10.0.0.50      # 1472 + 28 (IP+ICMP header) = 1500 bytes
ping -M do -s 8972 10.0.0.50      # test for jumbo frames (9000 MTU)

# If ping with -M do -s 1472 fails but -s 1400 works → MTU black hole
# (Intermediate router drops packets silently without ICMP unreachable)

# Discover path MTU
tracepath 10.0.0.50
# 1:  10.0.0.1 (10.0.0.1)  0.345ms pmtu 1500
# 2:  10.10.0.1 (10.10.0.1) 1.234ms pmtu 1440  ← bottleneck

# TCP MSS clamping (workaround for MTU issues in NAT/VPN)
firewall-cmd --permanent --direct --add-rule ipv4 mangle FORWARD 0 \
  -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

# Jumbo frames setup (requires switch support)
ip link set eth0 mtu 9000         # runtime
nmcli con mod eth0 802-3-ethernet.mtu 9000   # persistent

# TCP congestion control algorithm
sysctl net.ipv4.tcp_congestion_control
sysctl -w net.ipv4.tcp_congestion_control=bbr   # BBR algorithm
# Available algorithms:
cat /proc/sys/net/ipv4/tcp_available_congestion_control`}
        />
      </section>

      {/* ── 12. Common Network Issues ────────────────────────────────── */}
      <section>
        <h2 className="section-title">Common Network Issues</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <CodeBlock
              language="bash"
              title="Duplicate IP detection"
              code={`# Install arping
dnf install iputils

# Send ARP request for an IP — if another host replies, duplicate!
arping -c 4 -I eth0 192.168.1.100
# ARPING 192.168.1.100 from 192.168.1.50 eth0
# Unicast reply from 192.168.1.100 [AA:BB:CC:DD:EE:FF] 1.234ms
# Unicast reply from 192.168.1.100 [11:22:33:44:55:66] 1.567ms
# ← Two different MACs → duplicate IP conflict!

# Check ARP table for suspicious duplicates
ip neigh show | sort -k1 | awk '
  prev_ip==$1 {print "DUPLICATE:", $0}
  {prev_ip=$1}
'

# Gratuitous ARP to announce our IP (after IP change)
arping -A -c 3 -I eth0 192.168.1.100`}
            />
          </div>
          <div>
            <CodeBlock
              language="bash"
              title="Routing and connectivity problems"
              code={`# Trace route to destination
traceroute -n 8.8.8.8
mtr --report -n 8.8.8.8   # combined ping+traceroute

# Check routing table for a destination
ip route get 8.8.8.8
# 8.8.8.8 via 192.168.1.1 dev eth0 src 192.168.1.50

# If no route exists:
ip route add default via 192.168.1.1

# Check if IP forwarding is enabled (for routers/containers)
sysctl net.ipv4.ip_forward
sysctl -w net.ipv4.ip_forward=1

# Test connectivity at each layer
ping 127.0.0.1          # loopback (kernel IP stack)
ping 192.168.1.100      # same subnet (ARP/L2)
ping 192.168.1.1        # default gateway
ping 8.8.8.8            # internet (routing)
nslookup google.com     # DNS resolution

# Check for ICMP blocks (ping works, but app fails → check firewall)
firewall-cmd --list-all | grep -E "service|port"
telnet 10.0.0.50 80     # test TCP connectivity to a port
nc -zv 10.0.0.50 443    # netcat port test`}
            />
          </div>
        </div>
        <InfoBox type="warning" title="ICMP vs Application Connectivity">
          Ping succeeding does not mean the application port is reachable. Always verify at the application layer: <code className="code-inline">nc -zv host port</code> or <code className="code-inline">curl -v http://host:port</code> to confirm end-to-end connectivity through the firewall.
        </InfoBox>
      </section>

      {/* ── 13. FlowDiagram ──────────────────────────────────────────── */}
      <FlowDiagram
        title="Network Connectivity Troubleshooting Workflow"
        steps={[
          { label: 'Check physical link', sub: 'ethtool eth0 → "Link detected: yes"  •  ip link show (is interface UP?)', color: 'blue' },
          { label: 'Verify IP address and subnet', sub: 'ip addr show  •  Correct address? Correct prefix length?', color: 'default' },
          { label: 'Check default gateway', sub: 'ip route show  •  "default via" entry present?  •  ping gateway IP', color: 'default' },
          { label: 'Test gateway reachability', sub: 'ping -c 4 <gateway>  •  arping to verify ARP resolves correctly', color: 'yellow' },
          { label: 'Test remote host routing', sub: 'ip route get <dest>  •  traceroute -n <dest> for path analysis', color: 'default' },
          { label: 'Check firewall rules', sub: 'firewall-cmd --list-all  •  nft list ruleset  •  Is the required port/service allowed?', color: 'red' },
          { label: 'Verify service is listening', sub: 'ss -tulpn | grep :<port>  •  Is the service bound on the right address?', color: 'default' },
          { label: 'Capture traffic to confirm flow', sub: 'tcpdump -i eth0 host <peer> and port <p>  •  See SYN/SYN-ACK or RST/drop?', color: 'purple' },
          { label: 'Test DNS resolution', sub: 'dig <hostname>  •  dig @<server> to test specific resolver  •  check /etc/resolv.conf', color: 'default' },
          { label: 'Check interface errors', sub: 'ip -s link show eth0  •  ethtool -S eth0 | grep error  •  Look for CRC/drop counters', color: 'yellow' },
          { label: 'Validate and document fix', sub: 'nmcli con mod for persistence  •  firewall-cmd --permanent + --reload  •  confirm with ss/curl', color: 'green' },
        ]}
      />

      {/* ── Command Table ─────────────────────────────────────────────── */}
      <CommandTable
        title="Network Diagnostics — Quick Reference"
        rows={[
          { cmd: 'ip addr show', desc: 'Show all interface addresses', note: '-br for brief one-liner per interface' },
          { cmd: 'ip link show', desc: 'Show link state, MTU, flags', note: '-s for statistics (errors, drops)' },
          { cmd: 'ip route show', desc: 'Show routing table', note: 'ip route get IP to find route for a destination' },
          { cmd: 'ip neigh show', desc: 'Show ARP/neighbour cache', note: 'ip neigh flush dev eth0 to clear stale entries' },
          { cmd: 'ip netns exec NS cmd', desc: 'Run command in a network namespace', note: 'ip netns list to see all namespaces' },
          { cmd: 'ss -tulpn', desc: 'Show all listening sockets with process info', note: '-t TCP, -u UDP, -l listening, -p process, -n numeric' },
          { cmd: 'ss -tn state established', desc: 'Show all established TCP connections', note: 'ss -s for summary counts' },
          { cmd: 'ss -tei state established', desc: 'TCP internals: RTT, cwnd, retransmits', note: 'Useful for diagnosing TCP performance' },
          { cmd: 'ethtool eth0', desc: 'Link speed, duplex, auto-neg, link status', note: '"Link detected: yes" confirms physical connectivity' },
          { cmd: 'ethtool -i eth0', desc: 'Driver name and firmware version', note: 'Needed for driver bug reports' },
          { cmd: 'ethtool -S eth0', desc: 'Hardware NIC counters', note: 'Check rx_crc_errors, rx_fifo_errors, rx_dropped' },
          { cmd: 'ethtool -G eth0 rx 4096', desc: 'Increase Rx ring buffer size', note: 'Reduces rx_fifo_errors under high load' },
          { cmd: 'tcpdump -i eth0 -w cap.pcap', desc: 'Capture packets to file', note: 'Use host/port/net filters to limit volume' },
          { cmd: 'tcpdump -r cap.pcap -nn -tttt', desc: 'Read packet capture with timestamps', note: '-nn disables name resolution for speed' },
          { cmd: 'firewall-cmd --list-all', desc: 'Show active firewall zone rules', note: '--zone=NAME for specific zone' },
          { cmd: 'firewall-cmd --permanent --add-service=http', desc: 'Allow HTTP service permanently', note: 'Requires --reload to activate' },
          { cmd: 'firewall-cmd --reload', desc: 'Activate permanent firewall rules', note: 'Does not disrupt established connections' },
          { cmd: 'nft list ruleset', desc: 'Show full nftables ruleset', note: 'Shows what firewalld has programmed' },
          { cmd: 'dig +trace example.com', desc: 'Trace full DNS resolution path', note: 'Identifies which server is failing' },
          { cmd: 'dig @8.8.8.8 example.com', desc: 'Query a specific DNS server', note: 'Useful for split-horizon troubleshooting' },
          { cmd: 'resolvectl status', desc: 'Show systemd-resolved status and DNS servers', note: 'resolvectl flush-caches to clear DNS cache' },
          { cmd: 'arping -c 4 -I eth0 IP', desc: 'ARP request — detect duplicate IPs', note: 'Two different MACs replying = IP conflict' },
          { cmd: 'ping -M do -s 1472 host', desc: 'Path MTU probe (no fragmentation)', note: 'Reduce -s until ping succeeds to find MTU' },
          { cmd: 'tracepath host', desc: 'Path MTU discovery per hop', note: 'Shows pmtu reduction at each hop' },
          { cmd: 'iperf3 -c host', desc: 'TCP bandwidth test to a server', note: '-u for UDP, -R for reverse, -P for parallel' },
          { cmd: 'cat /proc/net/bonding/bond0', desc: 'Bond active slave and link failure counts', note: 'Check Link Failure Count for flapping NICs' },
          { cmd: 'mtr --report -n host', desc: 'Combined traceroute + ping with statistics', note: 'Shows packet loss per hop' },
        ]}
      />

      <InfoBox type="exam" title="Exam Tips — Network Diagnostics">
        <ul className="space-y-1.5 list-disc pl-4">
          <li>Always use <code className="code-inline">ip</code> commands, not <code className="code-inline">ifconfig</code>/<code className="code-inline">route</code> — the deprecated tools may not be installed on RHEL 9.</li>
          <li>Use <code className="code-inline">ss -tulpn</code> (not <code className="code-inline">netstat</code>) to see what is listening. The process column confirms which daemon owns a socket.</li>
          <li>When a firewall rule change must survive a reboot, always add <code className="code-inline">--permanent</code> AND run <code className="code-inline">firewall-cmd --reload</code>. Without <code className="code-inline">--permanent</code>, the rule vanishes on reload/reboot.</li>
          <li>A service is running and listening (<code className="code-inline">ss</code>) but clients cannot connect → firewall is the most likely cause. Check <code className="code-inline">firewall-cmd --list-all</code>.</li>
          <li>DNS failure: test with <code className="code-inline">dig @127.0.0.1</code> (local cache), then <code className="code-inline">dig @&lt;configured nameserver&gt;</code> to isolate whether it's a caching or upstream issue.</li>
          <li><code className="code-inline">nmcli</code> changes persist; <code className="code-inline">ip</code> changes do not. For exam tasks requiring persistence, confirm via <code className="code-inline">nmcli</code> or NetworkManager connection files.</li>
          <li>To capture traffic without stopping the service: <code className="code-inline">tcpdump -i eth0 -w /tmp/cap.pcap host &lt;peer&gt;</code> — safe and non-disruptive.</li>
        </ul>
      </InfoBox>
    </div>
  )
}
