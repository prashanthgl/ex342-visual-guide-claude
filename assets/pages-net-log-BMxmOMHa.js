import{j as e,P as r,H as d,C as t,I as s,F as n,a as l}from"./pages-core-DfOgVUf4.js";import{N as m,F as h,f as p}from"./vendor-ui-CobY6wdR.js";function g(){return e.jsxs("div",{className:"max-w-5xl mx-auto px-4 py-8 space-y-12",children:[e.jsx(r,{icon:m,title:"Network Diagnostics",subtitle:"Investigate connectivity, routing, firewall rules, DNS resolution, interface errors, and network performance on Red Hat Enterprise Linux systems.",tags:["EX342","Networking","ip","ss","tcpdump","firewalld","DNS","bonding"]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Linux Network Stack Layers"}),e.jsx(d,{steps:[{label:"Physical",sub:"NIC, cable, SFP",color:"default"},{label:"Data Link",sub:"Ethernet, MAC, ethtool",color:"blue"},{label:"Network",sub:"IP, routing, ip route",color:"green"},{label:"Transport",sub:"TCP/UDP, ss, netstat",color:"yellow"},{label:"Socket",sub:"POSIX socket API",color:"purple"},{label:"Application",sub:"HTTP, DNS, SSH…",color:"red"}]}),e.jsx("div",{className:"grid md:grid-cols-2 gap-4 mt-4",children:[{layer:"Physical / Data Link",tools:["ethtool -i eth0 (driver info)","ethtool -S eth0 (hardware counters)","ip link show (state, flags, MTU)","dmesg | grep eth0 (driver messages)"],color:"border-blue-700 bg-blue-950/30",label:"text-blue-300"},{layer:"Network (IP)",tools:["ip addr (addresses)","ip route (routing table)","ip neigh (ARP cache)","ping / traceroute / mtr"],color:"border-green-700 bg-green-950/30",label:"text-green-300"},{layer:"Transport (TCP/UDP)",tools:["ss -tulpn (listening sockets)","ss -s (socket summary)","ss state established","cat /proc/net/sockstat"],color:"border-yellow-700 bg-yellow-950/30",label:"text-yellow-300"},{layer:"Application / Firewall",tools:["firewall-cmd --list-all","nft list ruleset","tcpdump -i eth0","dig / nslookup / curl -v"],color:"border-purple-700 bg-purple-950/30",label:"text-purple-300"}].map(o=>e.jsxs("div",{className:`rounded-xl border p-4 ${o.color}`,children:[e.jsx("h3",{className:`text-sm font-semibold mb-2 ${o.label}`,children:o.layer}),e.jsx("ul",{className:"space-y-1",children:o.tools.map(a=>e.jsx("li",{className:"text-xs font-mono text-gray-300",children:a},a))})]},o.layer))})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"ip Command Suite"}),e.jsxs("p",{className:"section-body mb-4",children:["The ",e.jsx("code",{className:"code-inline",children:"ip"})," command (from ",e.jsx("em",{children:"iproute2"}),") replaces the deprecated",e.jsx("code",{className:"code-inline",children:"ifconfig"}),", ",e.jsx("code",{className:"code-inline",children:"route"}),", ",e.jsx("code",{className:"code-inline",children:"arp"}),", and ",e.jsx("code",{className:"code-inline",children:"netstat"})," tools."]}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsx("div",{children:e.jsx(t,{language:"bash",title:"ip addr — address management",code:`# Show all interfaces and addresses
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
ip -json addr show | python3 -m json.tool`})}),e.jsx("div",{children:e.jsx(t,{language:"bash",title:"ip route and ip neigh",code:`# Show routing table
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
ip netns exec testns ip addr show`})})]}),e.jsxs(s,{type:"tip",title:"Persistent Configuration with nmcli",children:["Changes made with ",e.jsx("code",{className:"code-inline",children:"ip"})," are not persistent across reboots. To persist, use ",e.jsx("code",{className:"code-inline",children:"nmcli"})," or edit ",e.jsx("code",{className:"code-inline",children:"/etc/NetworkManager/system-connections/"}),". Example: ",e.jsx("code",{className:"code-inline",children:"nmcli con mod eth0 ipv4.addresses 192.168.1.100/24 ipv4.gateway 192.168.1.1"})," followed by ",e.jsx("code",{className:"code-inline",children:"nmcli con up eth0"}),"."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"ss — Socket Statistics"}),e.jsx(t,{language:"bash",title:"ss — comprehensive socket inspection",code:`# Show all listening TCP and UDP sockets with process info
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
watch -n 1 "ss -tn state established dport = :3306 | wc -l"`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Network Interface Diagnostics — ethtool"}),e.jsx(t,{language:"bash",title:"ethtool — interface hardware diagnostics",code:`# Basic info: speed, duplex, link status
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
ethtool -t eth0 offline`}),e.jsxs(s,{type:"warning",title:"rx_fifo_errors Growing",children:["Non-zero and growing ",e.jsx("code",{className:"code-inline",children:"rx_fifo_errors"})," in ",e.jsx("code",{className:"code-inline",children:"ethtool -S"})," means the NIC's ring buffer is overflowing — packets are being dropped before the kernel can process them. Increase the ring buffer size with ",e.jsx("code",{className:"code-inline",children:"ethtool -G eth0 rx 4096"})," and consider tuning ",e.jsx("code",{className:"code-inline",children:"net.core.netdev_max_backlog"}),"."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"tcpdump — Packet Capture"}),e.jsx(t,{language:"bash",title:"tcpdump capture syntax and filters",code:`# Install
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
# 2025-09-15 14:32:01.123456 IP 10.0.0.5.52345 > 10.0.0.1.80: Flags [S]`}),e.jsxs(s,{type:"exam",title:"Exam Tip — tcpdump Flags",children:["TCP flags in tcpdump: ",e.jsx("code",{className:"code-inline",children:"[S]"}),"=SYN, ",e.jsx("code",{className:"code-inline",children:"[.]"}),"=ACK, ",e.jsx("code",{className:"code-inline",children:"[S.]"}),"=SYN-ACK, ",e.jsx("code",{className:"code-inline",children:"[F.]"}),"=FIN, ",e.jsx("code",{className:"code-inline",children:"[R.]"}),"=RST, ",e.jsx("code",{className:"code-inline",children:"[P.]"}),"=PSH+ACK. A connection that sends ",e.jsx("code",{className:"code-inline",children:"[S]"})," but only receives ",e.jsx("code",{className:"code-inline",children:"[R]"})," or nothing indicates a firewall drop or service not listening."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"firewalld — Zone-Based Firewall"}),e.jsx(t,{language:"bash",title:"firewall-cmd — managing rules",code:`# Show all active zones and their interfaces
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
firewall-cmd --permanent --zone=public   --add-rich-rule='rule family="ipv4" source address="10.0.0.0/8" service name="ssh" accept'

# Rate limiting
firewall-cmd --permanent --zone=public   --add-rich-rule='rule service name="http" limit value="100/m" accept'

# Reject with logging
firewall-cmd --permanent --zone=public   --add-rich-rule='rule family="ipv4" source address="192.168.99.0/24" reject'

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
firewall-cmd --panic-off    # restore normal operation`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"nftables — Low-Level Ruleset"}),e.jsx(t,{language:"bash",title:"nftables — list and inspect rules",code:`# List full nftables ruleset (what firewalld programs behind the scenes)
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
systemctl status nftables`}),e.jsxs(s,{type:"info",title:"firewalld vs nftables vs iptables",children:["On RHEL 9, ",e.jsx("strong",{children:"firewalld"})," is the management layer; it writes to the kernel's nftables backend by default (replacing the old iptables backend). Direct ",e.jsx("code",{className:"code-inline",children:"nft"})," commands for inspection are fine; avoid writing nft rules directly if firewalld is managing the system — changes may be overwritten on reload."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"DNS Troubleshooting"}),e.jsx(t,{language:"bash",title:"dig, nslookup, and systemd-resolved",code:`# Basic DNS lookup with dig
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
resolvectl domain eth0`}),e.jsxs(s,{type:"exam",title:"Exam Tip — DNS Resolution Order",children:["When DNS resolution fails for internal names, check: (1) ",e.jsx("code",{className:"code-inline",children:"/etc/nsswitch.conf"})," hosts line has ",e.jsx("code",{className:"code-inline",children:"dns"}),", (2) ",e.jsx("code",{className:"code-inline",children:"/etc/resolv.conf"})," has the correct nameserver, (3) firewall allows UDP/TCP port 53 to the DNS server, (4) ",e.jsx("code",{className:"code-inline",children:"resolvectl flush-caches"})," to clear stale cache."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Network Bonding & Teaming"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsx("div",{children:e.jsx(t,{language:"bash",title:"Bonding with nmcli",code:`# Create a bond interface
nmcli con add type bond   con-name bond0   ifname bond0   bond.options "mode=active-backup,miimon=100"

# Add slaves to the bond
nmcli con add type ethernet   con-name bond0-slave1   ifname eth1   master bond0

nmcli con add type ethernet   con-name bond0-slave2   ifname eth2   master bond0

# Bring up the bond
nmcli con up bond0

# Bond modes:
# 0 = balance-rr (round-robin, basic load balancing)
# 1 = active-backup (failover only)
# 2 = balance-xor
# 3 = broadcast
# 4 = 802.3ad (LACP — requires switch support)
# 5 = balance-tlb (adaptive transmit load balancing)
# 6 = balance-alb (adaptive load balancing)`})}),e.jsx("div",{children:e.jsx(t,{language:"bash",title:"Bond status and diagnostics",code:`# Check bond status
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
echo "slave eth2" > /sys/class/net/bond0/bonding/active_slave`})})]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Network Namespaces"}),e.jsx(t,{language:"bash",title:"ip netns — network isolation",code:`# List all network namespaces
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
nsenter -t <PID> -n ip addr show`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Network Performance — iperf3 & MTU"}),e.jsx(t,{language:"bash",title:"iperf3 — bandwidth testing",code:`# Install iperf3
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
iperf3 -c 10.0.0.50 -t 30`}),e.jsx(t,{language:"bash",title:"MTU diagnostics — black hole detection",code:`# Check interface MTU
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
firewall-cmd --permanent --direct --add-rule ipv4 mangle FORWARD 0   -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu

# Jumbo frames setup (requires switch support)
ip link set eth0 mtu 9000         # runtime
nmcli con mod eth0 802-3-ethernet.mtu 9000   # persistent

# TCP congestion control algorithm
sysctl net.ipv4.tcp_congestion_control
sysctl -w net.ipv4.tcp_congestion_control=bbr   # BBR algorithm
# Available algorithms:
cat /proc/sys/net/ipv4/tcp_available_congestion_control`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Common Network Issues"}),e.jsxs("div",{className:"grid md:grid-cols-2 gap-4 mb-4",children:[e.jsx("div",{children:e.jsx(t,{language:"bash",title:"Duplicate IP detection",code:`# Install arping
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
arping -A -c 3 -I eth0 192.168.1.100`})}),e.jsx("div",{children:e.jsx(t,{language:"bash",title:"Routing and connectivity problems",code:`# Trace route to destination
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
nc -zv 10.0.0.50 443    # netcat port test`})})]}),e.jsxs(s,{type:"warning",title:"ICMP vs Application Connectivity",children:["Ping succeeding does not mean the application port is reachable. Always verify at the application layer: ",e.jsx("code",{className:"code-inline",children:"nc -zv host port"})," or ",e.jsx("code",{className:"code-inline",children:"curl -v http://host:port"})," to confirm end-to-end connectivity through the firewall."]})]}),e.jsx(n,{title:"Network Connectivity Troubleshooting Workflow",steps:[{label:"Check physical link",sub:'ethtool eth0 → "Link detected: yes"  •  ip link show (is interface UP?)',color:"blue"},{label:"Verify IP address and subnet",sub:"ip addr show  •  Correct address? Correct prefix length?",color:"default"},{label:"Check default gateway",sub:'ip route show  •  "default via" entry present?  •  ping gateway IP',color:"default"},{label:"Test gateway reachability",sub:"ping -c 4 <gateway>  •  arping to verify ARP resolves correctly",color:"yellow"},{label:"Test remote host routing",sub:"ip route get <dest>  •  traceroute -n <dest> for path analysis",color:"default"},{label:"Check firewall rules",sub:"firewall-cmd --list-all  •  nft list ruleset  •  Is the required port/service allowed?",color:"red"},{label:"Verify service is listening",sub:"ss -tulpn | grep :<port>  •  Is the service bound on the right address?",color:"default"},{label:"Capture traffic to confirm flow",sub:"tcpdump -i eth0 host <peer> and port <p>  •  See SYN/SYN-ACK or RST/drop?",color:"purple"},{label:"Test DNS resolution",sub:"dig <hostname>  •  dig @<server> to test specific resolver  •  check /etc/resolv.conf",color:"default"},{label:"Check interface errors",sub:"ip -s link show eth0  •  ethtool -S eth0 | grep error  •  Look for CRC/drop counters",color:"yellow"},{label:"Validate and document fix",sub:"nmcli con mod for persistence  •  firewall-cmd --permanent + --reload  •  confirm with ss/curl",color:"green"}]}),e.jsx(l,{title:"Network Diagnostics — Quick Reference",rows:[{cmd:"ip addr show",desc:"Show all interface addresses",note:"-br for brief one-liner per interface"},{cmd:"ip link show",desc:"Show link state, MTU, flags",note:"-s for statistics (errors, drops)"},{cmd:"ip route show",desc:"Show routing table",note:"ip route get IP to find route for a destination"},{cmd:"ip neigh show",desc:"Show ARP/neighbour cache",note:"ip neigh flush dev eth0 to clear stale entries"},{cmd:"ip netns exec NS cmd",desc:"Run command in a network namespace",note:"ip netns list to see all namespaces"},{cmd:"ss -tulpn",desc:"Show all listening sockets with process info",note:"-t TCP, -u UDP, -l listening, -p process, -n numeric"},{cmd:"ss -tn state established",desc:"Show all established TCP connections",note:"ss -s for summary counts"},{cmd:"ss -tei state established",desc:"TCP internals: RTT, cwnd, retransmits",note:"Useful for diagnosing TCP performance"},{cmd:"ethtool eth0",desc:"Link speed, duplex, auto-neg, link status",note:'"Link detected: yes" confirms physical connectivity'},{cmd:"ethtool -i eth0",desc:"Driver name and firmware version",note:"Needed for driver bug reports"},{cmd:"ethtool -S eth0",desc:"Hardware NIC counters",note:"Check rx_crc_errors, rx_fifo_errors, rx_dropped"},{cmd:"ethtool -G eth0 rx 4096",desc:"Increase Rx ring buffer size",note:"Reduces rx_fifo_errors under high load"},{cmd:"tcpdump -i eth0 -w cap.pcap",desc:"Capture packets to file",note:"Use host/port/net filters to limit volume"},{cmd:"tcpdump -r cap.pcap -nn -tttt",desc:"Read packet capture with timestamps",note:"-nn disables name resolution for speed"},{cmd:"firewall-cmd --list-all",desc:"Show active firewall zone rules",note:"--zone=NAME for specific zone"},{cmd:"firewall-cmd --permanent --add-service=http",desc:"Allow HTTP service permanently",note:"Requires --reload to activate"},{cmd:"firewall-cmd --reload",desc:"Activate permanent firewall rules",note:"Does not disrupt established connections"},{cmd:"nft list ruleset",desc:"Show full nftables ruleset",note:"Shows what firewalld has programmed"},{cmd:"dig +trace example.com",desc:"Trace full DNS resolution path",note:"Identifies which server is failing"},{cmd:"dig @8.8.8.8 example.com",desc:"Query a specific DNS server",note:"Useful for split-horizon troubleshooting"},{cmd:"resolvectl status",desc:"Show systemd-resolved status and DNS servers",note:"resolvectl flush-caches to clear DNS cache"},{cmd:"arping -c 4 -I eth0 IP",desc:"ARP request — detect duplicate IPs",note:"Two different MACs replying = IP conflict"},{cmd:"ping -M do -s 1472 host",desc:"Path MTU probe (no fragmentation)",note:"Reduce -s until ping succeeds to find MTU"},{cmd:"tracepath host",desc:"Path MTU discovery per hop",note:"Shows pmtu reduction at each hop"},{cmd:"iperf3 -c host",desc:"TCP bandwidth test to a server",note:"-u for UDP, -R for reverse, -P for parallel"},{cmd:"cat /proc/net/bonding/bond0",desc:"Bond active slave and link failure counts",note:"Check Link Failure Count for flapping NICs"},{cmd:"mtr --report -n host",desc:"Combined traceroute + ping with statistics",note:"Shows packet loss per hop"}]}),e.jsx(s,{type:"exam",title:"Exam Tips — Network Diagnostics",children:e.jsxs("ul",{className:"space-y-1.5 list-disc pl-4",children:[e.jsxs("li",{children:["Always use ",e.jsx("code",{className:"code-inline",children:"ip"})," commands, not ",e.jsx("code",{className:"code-inline",children:"ifconfig"}),"/",e.jsx("code",{className:"code-inline",children:"route"})," — the deprecated tools may not be installed on RHEL 9."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{className:"code-inline",children:"ss -tulpn"})," (not ",e.jsx("code",{className:"code-inline",children:"netstat"}),") to see what is listening. The process column confirms which daemon owns a socket."]}),e.jsxs("li",{children:["When a firewall rule change must survive a reboot, always add ",e.jsx("code",{className:"code-inline",children:"--permanent"})," AND run ",e.jsx("code",{className:"code-inline",children:"firewall-cmd --reload"}),". Without ",e.jsx("code",{className:"code-inline",children:"--permanent"}),", the rule vanishes on reload/reboot."]}),e.jsxs("li",{children:["A service is running and listening (",e.jsx("code",{className:"code-inline",children:"ss"}),") but clients cannot connect → firewall is the most likely cause. Check ",e.jsx("code",{className:"code-inline",children:"firewall-cmd --list-all"}),"."]}),e.jsxs("li",{children:["DNS failure: test with ",e.jsx("code",{className:"code-inline",children:"dig @127.0.0.1"})," (local cache), then ",e.jsx("code",{className:"code-inline",children:"dig @<configured nameserver>"})," to isolate whether it's a caching or upstream issue."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"nmcli"})," changes persist; ",e.jsx("code",{className:"code-inline",children:"ip"})," changes do not. For exam tasks requiring persistence, confirm via ",e.jsx("code",{className:"code-inline",children:"nmcli"})," or NetworkManager connection files."]}),e.jsxs("li",{children:["To capture traffic without stopping the service: ",e.jsx("code",{className:"code-inline",children:"tcpdump -i eth0 -w /tmp/cap.pcap host <peer>"})," — safe and non-disruptive."]})]})})]})}function f(){return e.jsxs("div",{children:[e.jsx(r,{icon:h,title:"System Logging",subtitle:"Comprehensive coverage of journald, rsyslog, auditd, and log analysis tools for the EX342 exam. Logging is the first line of diagnosis for any system issue.",tags:["journald","rsyslog","auditd","logrotate","ausearch","aureport"]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Logging Architecture Overview"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:["Red Hat Enterprise Linux uses a layered logging architecture. The kernel writes messages to a ring buffer readable via ",e.jsx("code",{className:"text-token-string font-mono text-xs",children:"dmesg"}),". Userspace processes write to the systemd journal (journald) via the journal socket or syslog. rsyslog reads from both sources and routes messages to files. auditd handles security audit events on a separate, privileged channel."]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-lg border border-blue-800 bg-blue-950/30 p-4",children:[e.jsx("h3",{className:"text-blue-300 font-semibold text-sm mb-2",children:"Kernel Space"}),e.jsxs("ul",{className:"text-xs text-gray-400 space-y-1",children:[e.jsx("li",{className:"font-mono",children:"printk() → ring buffer"}),e.jsx("li",{className:"font-mono",children:"dmesg / /dev/kmsg"}),e.jsx("li",{className:"font-mono",children:"audit netlink socket"})]})]}),e.jsxs("div",{className:"rounded-lg border border-yellow-800 bg-yellow-950/30 p-4",children:[e.jsx("h3",{className:"text-yellow-300 font-semibold text-sm mb-2",children:"Userspace Daemons"}),e.jsxs("ul",{className:"text-xs text-gray-400 space-y-1",children:[e.jsx("li",{className:"font-mono",children:"systemd-journald"}),e.jsx("li",{className:"font-mono",children:"rsyslog (reads journal)"}),e.jsx("li",{className:"font-mono",children:"auditd"})]})]}),e.jsxs("div",{className:"rounded-lg border border-green-800 bg-green-950/30 p-4",children:[e.jsx("h3",{className:"text-green-300 font-semibold text-sm mb-2",children:"Log Destinations"}),e.jsxs("ul",{className:"text-xs text-gray-400 space-y-1",children:[e.jsx("li",{className:"font-mono",children:"/var/log/journal/"}),e.jsx("li",{className:"font-mono",children:"/var/log/messages"}),e.jsx("li",{className:"font-mono",children:"/var/log/audit/audit.log"})]})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4 text-xs font-mono text-gray-400",children:[e.jsxs("div",{className:"flex flex-wrap gap-2 items-center",children:[e.jsx("span",{className:"bg-blue-900/50 border border-blue-700 px-2 py-1 rounded text-blue-300",children:"Kernel (printk)"}),e.jsx("span",{className:"text-rh-red",children:"→"}),e.jsx("span",{className:"bg-surface-2 border border-border px-2 py-1 rounded",children:"/dev/kmsg"}),e.jsx("span",{className:"text-rh-red",children:"→"}),e.jsx("span",{className:"bg-yellow-900/50 border border-yellow-700 px-2 py-1 rounded text-yellow-300",children:"journald"}),e.jsx("span",{className:"text-rh-red",children:"→"}),e.jsx("span",{className:"bg-yellow-900/50 border border-yellow-700 px-2 py-1 rounded text-yellow-300",children:"rsyslog"}),e.jsx("span",{className:"text-rh-red",children:"→"}),e.jsx("span",{className:"bg-green-900/50 border border-green-700 px-2 py-1 rounded text-green-300",children:"/var/log/*"})]}),e.jsxs("div",{className:"mt-2 flex flex-wrap gap-2 items-center",children:[e.jsx("span",{className:"bg-red-900/50 border border-red-700 px-2 py-1 rounded text-red-300",children:"Kernel Audit"}),e.jsx("span",{className:"text-rh-red",children:"→"}),e.jsx("span",{className:"bg-surface-2 border border-border px-2 py-1 rounded",children:"netlink"}),e.jsx("span",{className:"text-rh-red",children:"→"}),e.jsx("span",{className:"bg-red-900/50 border border-red-700 px-2 py-1 rounded text-red-300",children:"auditd"}),e.jsx("span",{className:"text-rh-red",children:"→"}),e.jsx("span",{className:"bg-green-900/50 border border-green-700 px-2 py-1 rounded text-green-300",children:"/var/log/audit/audit.log"})]})]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"systemd-journald"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:[e.jsx("code",{className:"text-token-string font-mono text-xs",children:"systemd-journald"})," collects and stores structured log data. By default it stores logs in memory (",e.jsx("code",{className:"font-mono text-xs text-token-string",children:"/run/log/journal/"}),"). Configuring persistent storage writes to ",e.jsx("code",{className:"font-mono text-xs text-token-string",children:"/var/log/journal/"}),"."]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"journald.conf Configuration"}),e.jsx(t,{language:"ini",title:"/etc/systemd/journald.conf",code:`[Journal]
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
ForwardToSyslog=yes`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Enabling Persistent Journal"}),e.jsx(t,{language:"bash",title:"Persistent journal setup",code:`# Create the directory — journald detects this on next start
mkdir -p /var/log/journal

# Optionally set group and permissions
systemd-tmpfiles --create --prefix /var/log/journal

# Restart journald to apply
systemctl restart systemd-journald

# Verify — should show a machine-ID subdirectory
ls /var/log/journal/`}),e.jsxs(s,{type:"info",title:"Storage=auto Behavior",children:["With ",e.jsx("code",{className:"font-mono text-xs",children:"Storage=auto"})," (the default), journald uses persistent storage only if ",e.jsx("code",{className:"font-mono text-xs",children:"/var/log/journal/"})," already exists. Creating that directory is all that is needed — no conf file change required."]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"journalctl — Essential Usage"}),e.jsx(t,{language:"bash",title:"journalctl — common options",code:`# Show all logs (newest last)
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
journalctl --verify`}),e.jsxs(s,{type:"exam",title:"Exam: journalctl Priority Levels",children:["Priority numbers map to syslog severity: ",e.jsx("strong",{children:"0=emerg, 1=alert, 2=crit, 3=err, 4=warning, 5=notice, 6=info, 7=debug"}),". Using ",e.jsx("code",{className:"font-mono text-xs",children:"-p err"})," shows err and all more severe levels (emerg, alert, crit, err). The ",e.jsx("code",{className:"font-mono text-xs",children:"-b"})," flag without a number means ",e.jsx("em",{children:"current"})," boot; ",e.jsx("code",{className:"font-mono text-xs",children:"-b -1"}),"is the previous boot."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"rsyslog"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:"rsyslog is the high-performance syslog daemon on RHEL. It reads from journald's syslog socket and routes messages based on facility.severity rules to files, remote hosts, or databases."}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"rsyslog.conf Structure"}),e.jsx(t,{language:"bash",title:"/etc/rsyslog.conf — annotated",code:`#### MODULES ####
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
local7.*                                    /var/log/boot.log`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Facility.Severity Reference"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"Facilities"}),e.jsxs("div",{className:"text-xs font-mono text-gray-400 space-y-1",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"kern"})," — kernel messages"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"user"})," — user-level messages"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"daemon"})," — system daemons"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"auth / authpriv"})," — security/auth"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"cron"})," — cron daemon"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"mail"})," — mail system"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"local0–local7"})," — custom use"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"*"})," — all facilities"]})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"Severities (high → low)"}),e.jsxs("div",{className:"text-xs font-mono text-gray-400 space-y-1",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-red-400",children:"emerg (0)"})," — system unusable"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-red-400",children:"alert (1)"})," — immediate action needed"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-red-400",children:"crit (2)"})," — critical condition"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-orange-400",children:"err (3)"})," — error condition"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-yellow-400",children:"warning (4)"})," — warning"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-blue-400",children:"notice (5)"})," — normal but significant"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-400",children:"info (6)"})," — informational"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-gray-500",children:"debug (7)"})," — debug level"]})]})]})]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Remote Logging Configuration"}),e.jsx(t,{language:"bash",title:"/etc/rsyslog.d/remote.conf — forwarding to remote syslog",code:`# Forward ALL messages to remote host via UDP (unreliable, but lower overhead)
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
$AllowedSender TCP, 192.168.1.0/24`}),e.jsx(t,{language:"bash",title:"rsyslog templates — custom log formatting",code:`# Define a custom template
$template MyFormat,"%timegenerated% %HOSTNAME% %syslogtag%%msg%
"

# JSON template for log aggregators
$template JSON,"{"time":"%timereported:::date-rfc3339%","host":"%HOSTNAME%","program":"%programname%","msg":"%msg:::json%"}
"

# Use template in a rule
*.* /var/log/custom.log;MyFormat

# Template for remote forwarding with hostname
$template RemoteLogs,"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log"
*.* ?RemoteLogs`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"logrotate"}),e.jsx("p",{className:"text-gray-400 text-sm mb-3",children:"logrotate manages rotation, compression, and deletion of log files. It runs daily via cron/systemd timer."}),e.jsx(t,{language:"bash",title:"/etc/logrotate.conf — global defaults",code:`# Rotate weekly
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
include /etc/logrotate.d`}),e.jsx(t,{language:"bash",title:"/etc/logrotate.d/myapp — per-application config",code:`/var/log/myapp/*.log {
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
# logrotate -f /etc/logrotate.d/myapp`}),e.jsxs(s,{type:"tip",title:"logrotate Debugging",children:["Use ",e.jsx("code",{className:"font-mono text-xs",children:"logrotate -d /etc/logrotate.conf"})," for a dry-run that shows what would happen without making changes. Use ",e.jsx("code",{className:"font-mono text-xs",children:"logrotate -vf"})," to force rotation with verbose output."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"auditd — Linux Audit Framework"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:["The Linux Audit Framework provides a comprehensive security audit trail. auditd records system calls, file accesses, and user actions to ",e.jsx("code",{className:"font-mono text-xs text-token-string",children:"/var/log/audit/audit.log"}),". It operates independently of syslog — even if syslog is compromised, the audit trail remains."]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"auditd.conf"}),e.jsx(t,{language:"ini",title:"/etc/audit/auditd.conf",code:`# Log file location
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
log_format = ENRICHED`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Audit Rules"}),e.jsx(t,{language:"bash",title:"auditctl — runtime audit rules",code:`# Watch a file for all access types (r=read, w=write, x=execute, a=attribute change)
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
auditctl -s`}),e.jsx(t,{language:"ini",title:"/etc/audit/rules.d/audit.rules — persistent rules",code:`# This file is compiled by augenrules into /etc/audit/audit.rules

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
-w /var/log/lastlog -p wa -k login`}),e.jsx(t,{language:"bash",title:"augenrules — compile persistent rules",code:`# Compile all *.rules files in /etc/audit/rules.d/ into /etc/audit/audit.rules
augenrules --load

# Check compiled rule file
cat /etc/audit/audit.rules`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"ausearch and aureport"}),e.jsx(t,{language:"bash",title:"ausearch — search audit logs",code:`# Search by key (label set with -k)
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
ausearch -m AVC --raw`}),e.jsx(t,{language:"bash",title:"aureport — summary reports",code:`# Summary report (audit statistics)
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
aureport --start 01/15/2024 00:00:00 --end 01/15/2024 23:59:59 --summary`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"audit2allow — SELinux Connection"}),e.jsx(t,{language:"bash",title:"audit2allow — generate SELinux policy from denials",code:`# Generate allow rules from audit log AVC denials
ausearch -m AVC --raw | audit2allow

# Create a loadable SELinux module from denials
ausearch -m AVC --raw | audit2allow -M mypolicy

# Load the generated module
semodule -i mypolicy.pp

# Or in one step from the audit log file
audit2allow -a -M mypolicy             # -a reads from /var/log/audit/audit.log`}),e.jsxs(s,{type:"warning",title:"audit2allow Risk",children:[e.jsx("code",{className:"font-mono text-xs",children:"audit2allow"})," grants exactly the permissions that were denied — it does not evaluate whether those permissions ",e.jsx("em",{children:"should"})," be granted. Always review the generated .te file before loading. Prefer fixing file contexts or enabling booleans when possible."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Log Analysis Commands"]}),e.jsx(t,{language:"bash",title:"grep — filtering log files",code:`# Case-insensitive search
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
grep "$(date '+%b %e')" /var/log/secure | grep "Failed password"`}),e.jsx(t,{language:"bash",title:"awk — log parsing and field extraction",code:`# Print specific fields (syslog: $1=Month $2=Day $3=Time $4=Host $5=Program)
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
awk '$NF > 90 {print}' /var/log/sa/saXX`}),e.jsx(t,{language:"bash",title:"tail and multitail — live monitoring",code:`# Follow a single log
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
multitail /var/log/messages -I /var/log/myapp.log -e ERROR`})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Log Investigation Workflow"]}),e.jsx(n,{title:"Failed Service — Log Investigation Workflow",steps:[{label:"1. Check service status",sub:"systemctl status servicename.service — shows last log lines and exit code",color:"blue"},{label:"2. Read journal for the unit",sub:"journalctl -u servicename.service -n 100 --no-pager — last 100 lines without pager",color:"blue"},{label:"3. Check current boot errors",sub:"journalctl -b -p err --no-pager — all errors since last boot",color:"yellow"},{label:"4. Check kernel messages",sub:'journalctl -k -b | grep -i "error\\|fail\\|oom" — kernel-level issues',color:"yellow"},{label:"5. Check /var/log/messages",sub:"grep -i servicename /var/log/messages | tail -50 — traditional syslog output",color:"yellow"},{label:"6. Check application-specific logs",sub:"ls /var/log/servicename/ — app logs may be separate from syslog",color:"purple"},{label:"7. Check audit log for permission issues",sub:"ausearch -m AVC,USER_AVC --start recent — SELinux denials in last 10 min",color:"red"},{label:"8. Correlate timestamps across logs",sub:"Use --since/--until or grep for timestamps to find related events",color:"green"},{label:"9. Resolve and verify",sub:"systemctl start servicename && journalctl -u servicename -f",color:"green"}]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Command Reference"]}),e.jsx(l,{title:"System Logging Commands",rows:[{cmd:"journalctl -b",desc:"Show logs from current boot",note:"-b -1 = previous boot"},{cmd:"journalctl -u UNIT",desc:"Show logs for a specific systemd unit",note:"-u sshd.service -f (follow)"},{cmd:"journalctl -p err",desc:"Show error priority and above",note:"0=emerg … 7=debug"},{cmd:"journalctl -f",desc:"Follow journal in real time",note:"Like tail -f for systemd"},{cmd:"journalctl -k",desc:"Show kernel messages only",note:"Equivalent to dmesg"},{cmd:"journalctl -x",desc:"Add catalog explanations",note:"-xe: jump to end + explain"},{cmd:'journalctl --since "1h ago"',desc:"Filter by time window",note:"--since / --until accept many formats"},{cmd:"journalctl -o json",desc:"JSON output format",note:"-o verbose shows all fields"},{cmd:"journalctl --disk-usage",desc:"Show journal disk usage",note:"Followed by --vacuum-size=Xm"},{cmd:"journalctl _PID=1234",desc:"Filter by journal field",note:"_UID= _COMM= _SYSTEMD_UNIT= etc."},{cmd:"systemctl restart rsyslog",desc:"Restart rsyslog after config change",note:"rsyslogd -N1 to test config"},{cmd:"rsyslogd -N1",desc:"Validate rsyslog configuration",note:"Returns 0 if config is valid"},{cmd:'logger -p auth.info "msg"',desc:"Send a test message to syslog",note:"-t TAG -p facility.severity"},{cmd:"logrotate -d /etc/logrotate.conf",desc:"Dry-run logrotate (no changes)",note:"-v for verbose, -f to force"},{cmd:"auditctl -l",desc:"List current audit rules",note:"auditctl -s = status"},{cmd:"auditctl -w FILE -p wa -k KEY",desc:"Watch file for writes/attrib changes",note:"r=read w=write x=exec a=attr"},{cmd:"auditctl -D",desc:"Delete all audit rules",note:"Temporary — rules.d persist"},{cmd:"augenrules --load",desc:"Compile and load rules from rules.d/",note:"Preferred over editing audit.rules"},{cmd:"ausearch -k KEY",desc:"Search audit log by key label",note:"--interpret for human-readable"},{cmd:"ausearch -f FILE",desc:"Search by file path",note:"-m TYPE for record type"},{cmd:"ausearch --start recent",desc:"Search last 10 minutes of audit log",note:"--start MM/DD/YYYY HH:MM:SS"},{cmd:"aureport --summary",desc:"Overall audit event summary",note:"-au auth, -f files, -x execs"},{cmd:"aureport --failed",desc:"Report of all failed events",note:"Combine: -au --failed"},{cmd:"audit2allow -a -M mymod",desc:"Generate SELinux module from audit denials",note:"Then: semodule -i mymod.pp"}]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Exam Tips"]}),e.jsxs(s,{type:"exam",title:"Persistent Journal — Most Common Task",children:["To enable persistent journal: ",e.jsx("code",{className:"font-mono text-xs",children:"mkdir -p /var/log/journal"})," then",e.jsx("code",{className:"font-mono text-xs",children:" systemctl restart systemd-journald"}),". With ",e.jsx("code",{className:"font-mono text-xs",children:"Storage=auto"}),"(default), just creating the directory is enough. No journald.conf edit required unless you also need to set size limits."]}),e.jsxs(s,{type:"exam",title:"journalctl Time Filters",children:["Relative time: ",e.jsx("code",{className:"font-mono text-xs",children:'--since "2 hours ago"'}),",",e.jsx("code",{className:"font-mono text-xs",children:" --since today"}),", ",e.jsx("code",{className:"font-mono text-xs",children:"--since yesterday"}),". Absolute time: ",e.jsx("code",{className:"font-mono text-xs",children:'--since "2024-01-15 09:00:00"'}),". Always use ",e.jsx("code",{className:"font-mono text-xs",children:"--no-pager"})," when piping output."]}),e.jsxs(s,{type:"exam",title:"rsyslog Remote Logging",children:["Single ",e.jsx("code",{className:"font-mono text-xs",children:"@"})," = UDP (unreliable). Double ",e.jsx("code",{className:"font-mono text-xs",children:"@@"})," = TCP (reliable). To receive logs, load the ",e.jsx("code",{className:"font-mono text-xs",children:"imtcp"})," or ",e.jsx("code",{className:"font-mono text-xs",children:"imudp"})," module and add an ",e.jsx("code",{className:"font-mono text-xs",children:"input()"})," stanza. Drop config in",e.jsx("code",{className:"font-mono text-xs",children:" /etc/rsyslog.d/"})," and restart rsyslog."]}),e.jsxs(s,{type:"exam",title:"Audit Rule Persistence",children:["Rules added with ",e.jsx("code",{className:"font-mono text-xs",children:"auditctl"})," are temporary (lost on reboot). Persist rules by placing ",e.jsx("code",{className:"font-mono text-xs",children:"*.rules"})," files in",e.jsx("code",{className:"font-mono text-xs",children:" /etc/audit/rules.d/"})," and running",e.jsx("code",{className:"font-mono text-xs",children:" augenrules --load"}),". Do NOT edit",e.jsx("code",{className:"font-mono text-xs",children:" /etc/audit/audit.rules"})," directly — it is auto-generated."]}),e.jsxs(s,{type:"warning",title:"logrotate postrotate",children:["After rotating, applications holding the old file descriptor still write to the rotated file until they reload. The ",e.jsx("code",{className:"font-mono text-xs",children:"postrotate"})," script must send a signal (HUP or USR1) to the daemon to reopen log files. Use ",e.jsx("code",{className:"font-mono text-xs",children:"copytruncate"}),"as a fallback for apps that cannot be signaled."]})]})]})}function b(){return e.jsxs("div",{children:[e.jsx(r,{icon:p,title:"SELinux",subtitle:"Security-Enhanced Linux — the most critical EX342 topic. Covers MAC policy, security contexts, booleans, port labeling, AVC denial analysis, and policy module creation.",tags:["SELinux","MAC","AVC denials","audit2allow","semanage","restorecon","sealert"]}),e.jsx(s,{type:"danger",title:"Highest-Weight Exam Topic",children:"SELinux is consistently the most heavily tested area on the EX342 exam. You must be able to diagnose and resolve AVC denials under time pressure. Memorize the full AVC troubleshooting workflow: getenforce → ausearch → audit2why → fix (context / boolean / port / custom policy)."}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"SELinux Architecture"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:"SELinux implements Mandatory Access Control (MAC) enforced by the Linux kernel's Linux Security Module (LSM) framework. Unlike Discretionary Access Control (DAC — standard Unix permissions), MAC decisions cannot be overridden by the object owner. The policy is defined by the system administrator and enforced by the kernel even for the root user."}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{className:"rounded-lg border border-green-800 bg-green-950/30 p-4",children:[e.jsx("h3",{className:"text-green-300 font-semibold text-sm mb-2",children:"DAC (Standard Unix)"}),e.jsxs("ul",{className:"text-xs text-gray-400 space-y-1",children:[e.jsx("li",{children:"Based on user/group ownership and rwx bits"}),e.jsx("li",{children:"Owner controls permissions — root bypasses all"}),e.jsx("li",{children:"Once a process is compromised, it has owner's full access"}),e.jsx("li",{children:"No protection against privilege escalation within a user's domain"})]})]}),e.jsxs("div",{className:"rounded-lg border border-rh-red bg-rh-red/10 p-4",children:[e.jsx("h3",{className:"text-rh-red font-semibold text-sm mb-2",children:"MAC (SELinux)"}),e.jsxs("ul",{className:"text-xs text-gray-400 space-y-1",children:[e.jsx("li",{children:"Based on security labels (contexts) on every object and subject"}),e.jsx("li",{children:"Policy is system-defined — root cannot override MAC decisions"}),e.jsx("li",{children:"Compromised process is confined to its domain (type)"}),e.jsx("li",{children:"Principle of least privilege: deny everything not explicitly allowed"})]})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4 text-xs text-gray-400",children:[e.jsx("h4",{className:"text-gray-300 font-semibold mb-3 text-sm",children:"Access Control Decision Flow"}),e.jsxs("div",{className:"flex flex-wrap gap-2 items-center font-mono text-xs",children:[e.jsx("span",{className:"bg-blue-900/50 border border-blue-700 px-2 py-1 rounded text-blue-300",children:"Process (subject)"}),e.jsx("span",{className:"text-rh-red font-bold",children:"→"}),e.jsx("span",{className:"bg-surface-2 border border-border px-2 py-1 rounded",children:"syscall"}),e.jsx("span",{className:"text-rh-red font-bold",children:"→"}),e.jsx("span",{className:"bg-yellow-900/50 border border-yellow-700 px-2 py-1 rounded text-yellow-300",children:"DAC check (rwx)"}),e.jsx("span",{className:"text-rh-red font-bold",children:"→"}),e.jsx("span",{className:"bg-rh-red/20 border border-rh-red/50 px-2 py-1 rounded text-rh-red",children:"SELinux policy check"}),e.jsx("span",{className:"text-rh-red font-bold",children:"→"}),e.jsx("span",{className:"bg-green-900/50 border border-green-700 px-2 py-1 rounded text-green-300",children:"Object (file/socket/etc)"})]}),e.jsx("p",{className:"mt-2 text-gray-500",children:"Both DAC and MAC must ALLOW the access. A denial at either level blocks the operation."})]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"SELinux Modes"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",children:[e.jsxs("div",{className:"rounded-lg border border-red-800 bg-red-950/30 p-4",children:[e.jsx("h3",{className:"text-red-300 font-semibold text-sm mb-2",children:"Enforcing"}),e.jsx("p",{className:"text-xs text-gray-400",children:"Policy is loaded and enforced. Violations are blocked and logged to audit.log."}),e.jsx("p",{className:"text-xs text-green-400 mt-2 font-mono",children:"Production — always use this"})]}),e.jsxs("div",{className:"rounded-lg border border-yellow-800 bg-yellow-950/30 p-4",children:[e.jsx("h3",{className:"text-yellow-300 font-semibold text-sm mb-2",children:"Permissive"}),e.jsx("p",{className:"text-xs text-gray-400",children:"Policy loaded but NOT enforced. Violations are logged but not blocked. Used for troubleshooting."}),e.jsx("p",{className:"text-xs text-yellow-400 mt-2 font-mono",children:"Temporary debugging only"})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h3",{className:"text-gray-400 font-semibold text-sm mb-2",children:"Disabled"}),e.jsx("p",{className:"text-xs text-gray-400",children:"SELinux kernel support disabled. Files are not labeled. Re-enabling requires a full relabel (reboot + autorelabel)."}),e.jsx("p",{className:"text-xs text-red-400 mt-2 font-mono",children:"Never disable — use Permissive"})]})]}),e.jsx(t,{language:"bash",title:"SELinux mode management",code:`# Check current mode
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
grep SELINUX /etc/selinux/config`}),e.jsx(t,{language:"ini",title:"/etc/selinux/config — permanent mode configuration",code:`# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing  - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled   - No SELinux policy is loaded.
SELINUX=enforcing

# SELINUXTYPE= can take one of these three values:
#     targeted - Targeted processes are protected (RHEL default)
#     minimum  - Modification of targeted policy — only selected processes
#     mls      - Multi Level Security protection
SELINUXTYPE=targeted`}),e.jsxs(s,{type:"exam",title:"setenforce vs /etc/selinux/config",children:[e.jsx("code",{className:"font-mono text-xs",children:"setenforce"})," changes the mode ",e.jsx("strong",{children:"immediately"})," but is",e.jsx("strong",{children:" not persistent"})," across reboots. To make it permanent, edit",e.jsx("code",{className:"font-mono text-xs",children:" /etc/selinux/config"})," and change the ",e.jsx("code",{className:"font-mono text-xs",children:"SELINUX="})," line. Both are often required in exam scenarios. Going from Disabled → Enforcing requires a reboot with",e.jsx("code",{className:"font-mono text-xs",children:" /.autorelabel"})," file present to relabel the filesystem."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Security Contexts (Labels)"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:"Every process and every file/socket/device in an SELinux system has a security context (label). The SELinux policy defines which contexts (domains) are allowed to access which objects."}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4 mb-4",children:[e.jsx("h4",{className:"text-gray-300 font-semibold mb-3 text-sm",children:"Context Format: user:role:type:level"}),e.jsxs("div",{className:"flex flex-wrap gap-3 font-mono text-sm",children:[e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"bg-blue-900/50 border border-blue-700 px-3 py-2 rounded text-blue-300",children:"system_u"}),e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:"SELinux User"})]}),e.jsx("div",{className:"text-gray-600 self-center text-lg",children:":"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"bg-purple-900/50 border border-purple-700 px-3 py-2 rounded text-purple-300",children:"object_r"}),e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:"Role"})]}),e.jsx("div",{className:"text-gray-600 self-center text-lg",children:":"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"bg-rh-red/20 border border-rh-red/50 px-3 py-2 rounded text-rh-red",children:"httpd_sys_content_t"}),e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:"Type (most important)"})]}),e.jsx("div",{className:"text-gray-600 self-center text-lg",children:":"}),e.jsxs("div",{className:"text-center",children:[e.jsx("div",{className:"bg-surface-2 border border-border px-3 py-2 rounded text-gray-400",children:"s0"}),e.jsx("div",{className:"text-xs text-gray-500 mt-1",children:"Level (MLS/MCS)"})]})]}),e.jsxs("p",{className:"text-xs text-gray-500 mt-3",children:["In the ",e.jsx("strong",{children:"targeted policy"}),", the ",e.jsx("strong",{children:"type"})," field is what matters. Roles and users are mostly irrelevant. MLS/MCS level is only significant in MLS or multi-category deployments."]})]}),e.jsx(t,{language:"bash",title:"Viewing security contexts",code:`# List file contexts (-Z flag)
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
# system_u:system_r:httpd_t:s0              /usr/sbin/httpd`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-4",children:"Common SELinux Types"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"Process Types (Domains)"}),e.jsxs("div",{className:"text-xs font-mono text-gray-400 space-y-1",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"httpd_t"})," — Apache web server"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"sshd_t"})," — SSH daemon"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"named_t"})," — BIND DNS server"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"mysqld_t"})," — MySQL/MariaDB"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"postfix_t"})," — Postfix mail"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"vsftpd_t"})," — vsftpd FTP server"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"smbd_t"})," — Samba SMB"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"init_t"})," — systemd PID 1"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"unconfined_t"})," — unconfined processes"]})]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h4",{className:"text-sm font-semibold text-gray-300 mb-2",children:"File Types"}),e.jsxs("div",{className:"text-xs font-mono text-gray-400 space-y-1",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"httpd_sys_content_t"})," — web content"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"httpd_sys_rw_content_t"})," — writable web content"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"httpd_log_t"})," — web server logs"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"sshd_key_t"})," — SSH host keys"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"user_home_t"})," — user home files"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"etc_t"})," — /etc configuration"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"var_t"})," — /var generic"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"tmp_t"})," — /tmp files"]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-token-string",children:"bin_t"})," — system binaries"]})]})]})]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Context Management"]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"chcon — Temporary Context Change"}),e.jsxs("p",{className:"text-gray-400 text-sm mb-3",children:[e.jsx("code",{className:"font-mono text-xs text-token-string",children:"chcon"})," changes the context of a file immediately. The change is ",e.jsx("strong",{children:"temporary"})," — it will be reverted if the filesystem is relabeled (",e.jsx("code",{className:"font-mono text-xs",children:"restorecon"})," or autorelabel on boot). Use ",e.jsx("code",{className:"font-mono text-xs",children:"semanage fcontext"}),"for permanent changes."]}),e.jsx(t,{language:"bash",title:"chcon — temporary context changes",code:`# Change file type context
chcon -t httpd_sys_content_t /var/mywebfiles/index.html

# Change recursively
chcon -R -t httpd_sys_content_t /var/mywebfiles/

# Change to match another file's context
chcon --reference=/var/www/html/index.html /var/mywebfiles/index.html

# Change user, role, and type
chcon -u system_u -r object_r -t httpd_sys_content_t /var/mywebfiles/

# Verify the change
ls -Z /var/mywebfiles/`}),e.jsxs(s,{type:"warning",title:"chcon is Temporary",children:["Changes made with ",e.jsx("code",{className:"font-mono text-xs",children:"chcon"})," are overwritten by",e.jsx("code",{className:"font-mono text-xs",children:" restorecon"})," or a system relabel. On the exam, always use",e.jsx("code",{className:"font-mono text-xs",children:" semanage fcontext"})," +  ",e.jsx("code",{className:"font-mono text-xs",children:"restorecon"}),"for changes that must survive a relabel."]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"restorecon — Restore Default Context"}),e.jsx(t,{language:"bash",title:"restorecon — restore contexts to policy default",code:`# Restore context of a file to policy default
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
touch /.autorelabel && reboot`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"semanage fcontext — Permanent Context Rules"}),e.jsxs("p",{className:"text-gray-400 text-sm mb-3",children:[e.jsx("code",{className:"font-mono text-xs text-token-string",children:"semanage fcontext"})," writes rules to the SELinux policy database. These rules survive relabels. After adding a rule, you must still run",e.jsx("code",{className:"font-mono text-xs",children:" restorecon"})," to apply it to existing files."]}),e.jsx(t,{language:"bash",title:"semanage fcontext — permanent file context rules",code:`# Add a context rule for a specific path
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
ls -Z /webcontent/`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"matchpathcon — Verify Expected Context"}),e.jsx(t,{language:"bash",title:"matchpathcon — check what context a path should have",code:`# Check the expected context for a path according to policy
matchpathcon /var/www/html/index.html
# Output: /var/www/html/index.html  system_u:object_r:httpd_sys_content_t:s0

# Verify a file's actual vs expected context
matchpathcon -V /var/www/html/index.html
# Output: verified (or mismatch warning)

# Check multiple files
matchpathcon /etc/passwd /etc/shadow /var/log/messages`}),e.jsxs(s,{type:"exam",title:"The Two-Step Fix Pattern",children:["The most common SELinux file context fix is always two commands:",e.jsx("br",{}),e.jsx("code",{className:"font-mono text-xs",children:'semanage fcontext -a -t TYPE "/path(/.*)?"'}),e.jsx("br",{}),e.jsx("code",{className:"font-mono text-xs",children:"restorecon -Rv /path/"}),e.jsx("br",{}),"Forgetting ",e.jsx("code",{className:"font-mono text-xs",children:"restorecon"})," after ",e.jsx("code",{className:"font-mono text-xs",children:"semanage fcontext"}),"is the #1 student mistake. The rule is added to the policy database but existing files are not relabeled until",e.jsx("code",{className:"font-mono text-xs",children:" restorecon"})," runs."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Boolean Management"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:"SELinux booleans are on/off switches that toggle pre-written policy rules. They are the easiest fix when a boolean exists for your use case. Always check for an appropriate boolean before writing custom policy."}),e.jsx(t,{language:"bash",title:"Boolean management commands",code:`# List all booleans and their state
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
semanage boolean -l -C            # only locally modified booleans`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-4",children:"Critical Booleans to Know"}),e.jsx("div",{className:"rounded-lg border border-border bg-surface-1 overflow-hidden",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-2 border-b border-border",children:[e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Boolean"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Purpose"}),e.jsx("th",{className:"text-left px-4 py-2 text-gray-400 font-semibold uppercase tracking-wide",children:"Common Scenario"})]})}),e.jsx("tbody",{className:"divide-y divide-border/50",children:[["httpd_can_network_connect","Allow httpd to make outbound TCP connections","PHP apps connecting to remote APIs, proxying"],["httpd_can_network_connect_db","Allow httpd to connect to remote databases","Web app with remote MySQL/PostgreSQL"],["httpd_enable_homedirs","Allow httpd to serve files from home dirs","UserDir directive in Apache"],["httpd_read_user_content","Allow httpd to read user content","Serving ~/public_html"],["httpd_use_nfs","Allow httpd to use NFS-mounted content","Content on NFS share"],["samba_enable_home_dirs","Allow Samba to share home directories","Samba share for /home"],["samba_export_all_rw","Allow Samba to export any directory r/w","Custom Samba shares"],["ftp_home_dir","Allow FTP to read/write home directories","vsftpd with home directory access"],["allow_ftpd_anon_write","Allow anonymous FTP uploads","Anonymous FTP write access"],["nfs_export_all_rw","Allow NFS to export all dirs read/write","Custom NFS exports"],["ssh_sysadm_login","Allow sysadm_r role to SSH login","Admin SSH with sysadm role"],["use_nfs_home_dirs","Allow NFS-mounted home directories","LDAP/NIS with NFS home dirs"],["allow_user_exec_content","Allow users to execute content in home/tmp","Block user execution as security policy"],["deny_ptrace","Deny ptrace() to all confined domains","Hardening — prevents debugging confined processes"]].map(([o,a,c],i)=>e.jsxs("tr",{className:i%2===0?"bg-surface-0":"bg-surface-1/40",children:[e.jsx("td",{className:"px-4 py-2 font-mono text-token-string whitespace-nowrap",children:o}),e.jsx("td",{className:"px-4 py-2 text-gray-300",children:a}),e.jsx("td",{className:"px-4 py-2 text-gray-500",children:c})]},i))})]})}),e.jsxs(s,{type:"exam",title:"setsebool -P is the Permanent Flag",children:["Without ",e.jsx("code",{className:"font-mono text-xs",children:"-P"}),", ",e.jsx("code",{className:"font-mono text-xs",children:"setsebool"})," changes are lost on reboot. The ",e.jsx("code",{className:"font-mono text-xs",children:"-P"})," flag writes the change to the SELinux policy database on disk. You can set multiple booleans in one command:",e.jsx("code",{className:"font-mono text-xs",children:" setsebool -P httpd_can_network_connect on httpd_use_nfs on"}),"."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Port Labeling"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4",children:"SELinux controls which ports services can bind to using port labels. If you configure a service to use a non-standard port, SELinux will block the bind unless you add a port label."}),e.jsx(t,{language:"bash",title:"semanage port — port label management",code:`# List all port labels
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
systemctl restart httpd`}),e.jsxs(s,{type:"exam",title:"Port Label is Not Enough — Check Firewall Too",children:["On the exam, when a service fails to bind to a non-standard port, there are TWO required steps: (1) ",e.jsx("code",{className:"font-mono text-xs",children:"semanage port -a -t TYPE -p tcp PORT"})," for SELinux, and (2) ",e.jsx("code",{className:"font-mono text-xs",children:"firewall-cmd --add-port=PORT/tcp --permanent"})," for the firewall. Both must be done. Check SELinux first with ",e.jsx("code",{className:"font-mono text-xs",children:"ausearch -m AVC"}),"."]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"AVC Denial Analysis"]}),e.jsx("p",{className:"text-gray-400 text-sm mb-4 leading-relaxed",children:"AVC (Access Vector Cache) messages are the key output of SELinux enforcement. Reading them correctly is the foundation of all SELinux troubleshooting. Every denial tells you exactly what was blocked."}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"Anatomy of an AVC Message"}),e.jsx(t,{language:"bash",title:"AVC message anatomy — /var/log/audit/audit.log",code:`# Raw AVC denial from audit.log:
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

# Translation: httpd (httpd_t) was denied READ access to a file with type admin_home_t`}),e.jsx(t,{language:"bash",title:"Finding AVC denials",code:`# Search audit log for AVC denials
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
grep "avc:  denied" /var/log/audit/audit.log | tail -20`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"audit2why — Explain Denials"}),e.jsx(t,{language:"bash",title:"audit2why — human-readable denial explanation",code:`# Pipe AVC messages to audit2why for explanation
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
ausearch -m AVC -i | audit2why`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"audit2allow — Create Policy Modules"}),e.jsx(t,{language:"bash",title:"audit2allow — generate and load SELinux policy modules",code:`# Step 1: Generate the allow rules (review these!)
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
semodule -i myhttpd.pp`}),e.jsx(t,{language:"bash",title:"Example .te file generated by audit2allow",code:`module myhttpd 1.0;

require {
        type httpd_t;
        type admin_home_t;
        class file { read open getattr };
}

#============= httpd_t ==============
allow httpd_t admin_home_t:file { read open getattr };`}),e.jsxs(s,{type:"warning",title:"Always Review audit2allow Output",children:[e.jsx("code",{className:"font-mono text-xs",children:"audit2allow"})," generates the minimum permissions to allow what was denied — it does not assess ",e.jsx("em",{children:"whether those permissions are appropriate"}),'. Before loading any generated module, ask: "Does httpd really need access to admin_home_t?" If the answer involves a misconfigured file context, fix the context instead of loading policy.']})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"setroubleshootd and sealert"]}),e.jsxs("p",{className:"text-gray-400 text-sm mb-4",children:["setroubleshootd runs as a daemon and listens for AVC denials, automatically analyzing them and generating human-readable recommendations. ",e.jsx("code",{className:"font-mono text-xs text-token-string",children:"sealert"})," is the command-line client that formats these reports."]}),e.jsx(t,{language:"bash",title:"sealert — SELinux troubleshooting assistant",code:`# Install setroubleshoot-server if not present
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
grep "sealert" /var/log/messages`}),e.jsx(s,{type:"tip",title:"sealert Confidence Scores",children:'sealert ranks its suggestions by confidence percentage. A suggestion at 99.5% confidence (usually restorecon or setsebool) is almost always the right fix. The "catchall" suggestion (audit2allow custom policy) at ~1% confidence should be a last resort.'})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"MCS and MLS (Overview)"]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h3",{className:"text-gray-300 font-semibold text-sm mb-2",children:"MCS — Multi-Category Security"}),e.jsxs("p",{className:"text-xs text-gray-400 leading-relaxed",children:["Used with the ",e.jsx("code",{className:"font-mono",children:"targeted"})," policy. Adds category labels (c0–c1023) to the level field (e.g., ",e.jsx("code",{className:"font-mono",children:"s0:c0,c1"}),"). Used by containers and virtual machines to isolate processes with the same type. Docker/Podman use MCS categories to prevent container escapes."]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-surface-1 p-4",children:[e.jsx("h3",{className:"text-gray-300 font-semibold text-sm mb-2",children:"MLS — Multi-Level Security"}),e.jsxs("p",{className:"text-xs text-gray-400 leading-relaxed",children:["Used with the ",e.jsx("code",{className:"font-mono",children:"mls"})," policy type. Implements Bell-LaPadula model with sensitivity levels (s0–s15: Unclassified, Confidential, Secret, Top Secret). Used in government/defense environments. Context level:",e.jsx("code",{className:"font-mono",children:" s3-s3:c0.c1023"}),"."]})]})]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"AVC Denial Troubleshooting Workflow"]}),e.jsx(n,{title:"SELinux AVC Denial — Full Resolution Workflow",steps:[{label:"1. Confirm symptom — service/application failing",sub:'Operation fails with "Permission denied" but DAC permissions look correct',color:"red"},{label:"2. Check SELinux mode",sub:"getenforce — if Disabled, SELinux is not the cause; if Permissive, it logs but does not block",color:"blue"},{label:"3. Find the AVC denial",sub:"ausearch -m AVC --start recent --interpret — find denial messages",color:"blue"},{label:"4. Get human-readable explanation",sub:"ausearch -m AVC --raw | audit2why — identifies whether fix is boolean, context, or policy",color:"yellow"},{label:"5a. Fix: Wrong file context (most common)",sub:'semanage fcontext -a -t TYPE "/path(/.*)?" && restorecon -Rv /path/',color:"green"},{label:"5b. Fix: Boolean needs enabling",sub:"setsebool -P BOOLEAN_NAME on — check with: semanage boolean -l | grep KEYWORD",color:"green"},{label:"5c. Fix: Non-standard port",sub:"semanage port -a -t TYPE -p tcp PORT — allows service to bind on custom port",color:"green"},{label:"5d. Fix: Custom policy module (last resort)",sub:"ausearch -m AVC --raw | audit2allow -M modname && semodule -i modname.pp",color:"yellow"},{label:"6. Verify fix in enforcing mode",sub:"getenforce → Enforcing; restart service → systemctl status shows active",color:"green"}]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Realistic Exam Scenarios"]}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3",children:"Scenario 1: Apache cannot serve files from /data/www"}),e.jsx(t,{language:"bash",title:"Scenario 1: Wrong context on custom web root",code:`# Symptom: Apache returns 403 Forbidden for files in /data/www
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
systemctl status httpd`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Scenario 2: Apache cannot connect to database on remote host"}),e.jsx(t,{language:"bash",title:"Scenario 2: Boolean needed for network connection",code:`# Symptom: PHP application gets connection refused to MySQL on 192.168.1.10:3306
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

# Application should now connect`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Scenario 3: SSH on non-standard port 2222"}),e.jsx(t,{language:"bash",title:"Scenario 3: Port label for non-standard SSH port",code:`# Symptom: sshd fails to start after changing Port to 2222 in sshd_config

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
firewall-cmd --reload`}),e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mb-3 mt-6",children:"Scenario 4: Custom application needs policy module"}),e.jsx(t,{language:"bash",title:"Scenario 4: Custom policy for application without a boolean",code:`# Symptom: Custom daemon /usr/local/bin/myapp cannot write to /var/myapp/data/

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
ausearch -m AVC -c myapp --start recent  # should be empty now`})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"SELinux Command Reference"]}),e.jsx(l,{title:"Complete SELinux Command Reference",rows:[{cmd:"getenforce",desc:"Show current SELinux mode",note:"Enforcing / Permissive / Disabled"},{cmd:"setenforce 1",desc:"Set Enforcing mode (temporary)",note:"setenforce 0 = Permissive"},{cmd:"sestatus",desc:"Detailed SELinux status",note:"-v contexts, -b booleans"},{cmd:"ls -Z PATH",desc:"Show file SELinux context",note:"-laZ for verbose listing"},{cmd:"ps -Z",desc:"Show process SELinux context",note:"ps auxZ for all processes"},{cmd:"id -Z",desc:"Show current user's SELinux context",note:"Includes role and level"},{cmd:"chcon -t TYPE FILE",desc:"Temporary context change",note:"-R recursive, lost on relabel"},{cmd:"restorecon -Rv PATH",desc:"Restore context to policy default",note:"-n dry-run, -v verbose"},{cmd:'semanage fcontext -a -t TYPE "/path(/.*)?"',desc:"Add permanent file context rule",note:"Must run restorecon after"},{cmd:"semanage fcontext -l -C",desc:"List locally defined context rules",note:"-l all rules (very long)"},{cmd:'semanage fcontext -d "/path(/.*)?"',desc:"Delete a file context rule",note:"Run restorecon after"},{cmd:"matchpathcon PATH",desc:"Show expected context for path",note:"-V verifies actual vs expected"},{cmd:"getsebool -a",desc:"List all booleans and state",note:"Pipe to grep to filter"},{cmd:"setsebool -P BOOL on",desc:"Set boolean permanently",note:"Without -P: temporary"},{cmd:"semanage boolean -l",desc:"List booleans with descriptions",note:"-C shows locally modified"},{cmd:"semanage port -l",desc:"List all port labels",note:"grep http / ssh to filter"},{cmd:"semanage port -a -t TYPE -p tcp PORT",desc:"Add port label",note:"-m to modify, -d to delete"},{cmd:"ausearch -m AVC --start recent",desc:"Find recent AVC denials",note:"--interpret for readable output"},{cmd:"ausearch -m AVC --raw | audit2why",desc:"Explain why denial occurred",note:"Identifies fix type"},{cmd:"ausearch -m AVC --raw | audit2allow",desc:"Generate allow rules from denials",note:"-M name creates module"},{cmd:"audit2allow -a -M modname",desc:"Create module from entire audit.log",note:"Then: semodule -i modname.pp"},{cmd:"semodule -i MODULE.pp",desc:"Load a compiled policy module",note:"-r to remove, -l to list"},{cmd:"semodule -l",desc:"List loaded policy modules",note:"grep for specific module"},{cmd:"sealert -a /var/log/audit/audit.log",desc:"Analyze audit log with setroubleshootd",note:"Provides ranked fix suggestions"},{cmd:"touch /.autorelabel && reboot",desc:"Trigger full filesystem relabel on boot",note:"Required after disabled→enabled"}]})]}),e.jsxs("section",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),"Top 5 Exam Scenarios"]}),e.jsxs(s,{type:"exam",title:"Scenario 1: File in Wrong Location",children:["Files moved with ",e.jsx("code",{className:"font-mono text-xs",children:"mv"})," retain their original SELinux context. Files copied with ",e.jsx("code",{className:"font-mono text-xs",children:"cp"})," inherit the destination directory's policy context. When a service cannot read a file that has correct DAC permissions, always check",e.jsx("code",{className:"font-mono text-xs",children:" ls -Z"})," first. Fix with:",e.jsx("code",{className:"font-mono text-xs",children:' semanage fcontext -a -t TYPE "/path(/.*)?"'})," then",e.jsx("code",{className:"font-mono text-xs",children:" restorecon -Rv /path/"}),"."]}),e.jsxs(s,{type:"exam",title:"Scenario 2: Service Cannot Make Network Connections",children:["If a web application cannot connect to a database or remote API, check booleans first.",e.jsx("code",{className:"font-mono text-xs",children:" getsebool -a | grep httpd"})," shows all HTTP-related booleans. Common fixes: ",e.jsx("code",{className:"font-mono text-xs",children:"setsebool -P httpd_can_network_connect on"})," or",e.jsx("code",{className:"font-mono text-xs",children:" httpd_can_network_connect_db on"}),". Use",e.jsx("code",{className:"font-mono text-xs",children:" audit2why"})," to confirm the boolean suggestion."]}),e.jsxs(s,{type:"exam",title:"Scenario 3: Service Fails to Start on Non-Standard Port",children:["Port binding failures due to SELinux are common. Check",e.jsx("code",{className:"font-mono text-xs",children:" ausearch -m AVC -c servicename --start recent"}),". If you see",e.jsx("code",{className:"font-mono text-xs",children:" name_bind"})," denied, add the port:",e.jsx("code",{className:"font-mono text-xs",children:" semanage port -a -t http_port_t -p tcp 8080"}),". Also open the firewall with ",e.jsx("code",{className:"font-mono text-xs",children:"firewall-cmd --add-port=8080/tcp --permanent"}),"."]}),e.jsxs(s,{type:"exam",title:"Scenario 4: Permissive Mode for Diagnosis",children:["If you need to run an application through all its code paths to capture ALL denials at once (not just the first one), temporarily: ",e.jsx("code",{className:"font-mono text-xs",children:"setenforce 0"}),", exercise the app, then ",e.jsx("code",{className:"font-mono text-xs",children:"setenforce 1"}),", and process all collected denials together with ",e.jsx("code",{className:"font-mono text-xs",children:"ausearch -m AVC --raw | audit2allow -M appmod"}),". This saves time vs fixing one denial at a time."]}),e.jsxs(s,{type:"exam",title:"Scenario 5: semanage vs chcon",children:["The exam will test whether you know the difference. ",e.jsx("code",{className:"font-mono text-xs",children:"chcon"})," is temporary (reverted by restorecon or relabel). ",e.jsx("code",{className:"font-mono text-xs",children:"semanage fcontext"}),'is permanent (survives relabels). On the exam, if the question says "permanently" or "survives reboot/relabel", you MUST use ',e.jsx("code",{className:"font-mono text-xs",children:"semanage fcontext"})," + ",e.jsx("code",{className:"font-mono text-xs",children:"restorecon"}),'. If the question just says "fix the access", either works but semanage is the professional answer.']})]})]})}export{g as N,f as S,b as a};
