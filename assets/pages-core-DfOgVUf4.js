import{a as P,L as O,r as A}from"./vendor-react-DWeyPua3.js";import{C as F,Z as _,T as M,L as D,I,B as E,a as B,b as C,S as T,c as G,d as g,e as v,H as q,M as K,A as H,N as V,F as z,f as W,g as $,h as X,i as Y,j as J,k as Q}from"./vendor-ui-CobY6wdR.js";import{h as Z}from"./vendor-syntax-BIJNGpyY.js";var y={exports:{}},h={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var N;function ee(){if(N)return h;N=1;var s=P(),t=Symbol.for("react.element"),o=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,i=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(p,d,k){var u,f={},x=null,w=null;k!==void 0&&(x=""+k),d.key!==void 0&&(x=""+d.key),d.ref!==void 0&&(w=d.ref);for(u in d)r.call(d,u)&&!l.hasOwnProperty(u)&&(f[u]=d[u]);if(p&&p.defaultProps)for(u in d=p.defaultProps,d)f[u]===void 0&&(f[u]=d[u]);return{$$typeof:t,type:p,key:x,ref:w,props:f,_owner:i.current}}return h.Fragment=o,h.jsx=c,h.jsxs=c,h}var S;function se(){return S||(S=1,y.exports=ee()),y.exports}var e=se();function j({icon:s,title:t,subtitle:o,tags:r=[]}){return e.jsx("div",{className:"mb-8 pb-6 border-b border-border",children:e.jsxs("div",{className:"flex items-start gap-4",children:[s&&e.jsx("div",{className:"p-3 rounded-xl bg-rh-red/10 border border-rh-red/30",children:e.jsx(s,{size:28,className:"text-rh-red"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-white",children:t}),o&&e.jsx("p",{className:"mt-1 text-gray-400 text-sm leading-relaxed max-w-2xl",children:o}),r.length>0&&e.jsx("div",{className:"flex flex-wrap gap-2 mt-3",children:r.map(i=>e.jsx("span",{className:"pill-red",children:i},i))})]})]})})}const te={info:{icon:I,border:"border-blue-700",bg:"bg-blue-950/40",text:"text-blue-300",title:"Info"},tip:{icon:D,border:"border-green-700",bg:"bg-green-950/40",text:"text-green-300",title:"Tip"},warning:{icon:M,border:"border-yellow-700",bg:"bg-yellow-950/40",text:"text-yellow-300",title:"Warning"},danger:{icon:_,border:"border-red-700",bg:"bg-red-950/40",text:"text-red-300",title:"Danger"},exam:{icon:F,border:"border-rh-red",bg:"bg-rh-red/10",text:"text-rh-red",title:"Exam Tip"}};function a({type:s="info",title:t,children:o}){const r=te[s],i=r.icon;return e.jsxs("div",{className:`rounded-lg border ${r.border} ${r.bg} px-4 py-3 my-4`,children:[e.jsxs("div",{className:`flex items-center gap-2 font-semibold text-sm mb-1.5 ${r.text}`,children:[e.jsx(i,{size:15}),e.jsx("span",{children:t||r.title})]}),e.jsx("div",{className:"text-sm text-gray-300 leading-relaxed",children:o})]})}const re=[{path:"/boot",icon:g,title:"Boot Process",desc:"Trace the full boot sequence from BIOS/UEFI through GRUB2, initramfs, and systemd target activation.",color:"blue",tags:["GRUB2","systemd","initramfs"]},{path:"/kernel",icon:v,title:"Kernel Diagnostics",desc:"Inspect kernel messages, modules, parameters, and oops/panic analysis with dmesg and sysfs.",color:"purple",tags:["dmesg","sysfs","modules"]},{path:"/storage",icon:q,title:"Storage",desc:"Diagnose block devices, LVM, filesystem corruption, I/O errors, and mount failures.",color:"yellow",tags:["LVM","XFS","fsck"]},{path:"/memory",icon:K,title:"Memory",desc:"Identify memory leaks, OOM killer events, swap exhaustion, and NUMA topology issues.",color:"red",tags:["OOM","vmstat","swap"]},{path:"/cpu",icon:H,title:"CPU & Performance",desc:"Profile CPU utilisation, scheduling latency, load averages, and performance bottlenecks.",color:"green",tags:["perf","top","sar"]},{path:"/network",icon:V,title:"Networking",desc:"Troubleshoot connectivity, routing, firewall rules, DNS, and interface configuration.",color:"blue",tags:["ss","tcpdump","nftables"]},{path:"/logging",icon:z,title:"System Logging",desc:"Navigate journald, rsyslog, log filtering, persistent journals, and remote log forwarding.",color:"yellow",tags:["journald","rsyslog","audit"]},{path:"/selinux",icon:W,title:"SELinux",desc:"Interpret AVC denials, write custom policy modules, and manage file/process contexts.",color:"red",tags:["AVC","audit2allow","contexts"]},{path:"/process",icon:g,title:"Process Management",desc:"Investigate hung processes, zombie states, signal handling, namespaces, and cgroups v2.",color:"purple",tags:["cgroups","strace","signals"]},{path:"/appdebug",icon:$,title:"App Diagnostics",desc:"Use strace, ltrace, core dumps, GDB, and Valgrind to diagnose misbehaving applications.",color:"green",tags:["strace","GDB","coredump"]},{path:"/hardware",icon:T,title:"Hardware",desc:"Detect hardware faults via EDAC, IPMI, smartmontools, and MCE log analysis.",color:"yellow",tags:["IPMI","SMART","EDAC"]}],oe={blue:{border:"border-blue-800/60",bg:"bg-blue-950/20",icon:"bg-blue-900/50 text-blue-300",tag:"pill-blue"},purple:{border:"border-purple-800/60",bg:"bg-purple-950/20",icon:"bg-purple-900/50 text-purple-300",tag:"pill-blue"},yellow:{border:"border-yellow-800/60",bg:"bg-yellow-950/20",icon:"bg-yellow-900/50 text-yellow-300",tag:"pill-yellow"},red:{border:"border-red-800/60",bg:"bg-red-950/20",icon:"bg-red-900/50 text-red-300",tag:"pill-red"},green:{border:"border-green-800/60",bg:"bg-green-950/20",icon:"bg-green-900/50 text-green-300",tag:"pill-green"}},R=[{label:"User Space",desc:"Applications, shells, daemons, and libraries that run in unprivileged mode.",examples:"bash, sshd, httpd, glibc, systemd user units",color:"bg-green-950/50 border-green-800/60 text-green-200",dot:"bg-green-500"},{label:"C Library (glibc)",desc:"Translates high-level C function calls into raw system call numbers the kernel understands.",examples:"open(), read(), write(), malloc(), pthread_create()",color:"bg-blue-950/50 border-blue-800/60 text-blue-200",dot:"bg-blue-500"},{label:"System Calls (syscall ABI)",desc:"The formal boundary between user space and kernel space — entry via syscall/sysenter instruction.",examples:"read(2), write(2), mmap(2), clone(2), execve(2)",color:"bg-yellow-950/50 border-yellow-800/60 text-yellow-200",dot:"bg-yellow-500"},{label:"Kernel Space",desc:"Schedulers, VFS, TCP/IP stack, device drivers, memory manager, SELinux LSM hooks — all run with full privilege.",examples:"CFS scheduler, XFS driver, NIC drivers, eBPF programs",color:"bg-red-950/50 border-red-800/60 text-red-200",dot:"bg-red-500"},{label:"Hardware",desc:"Physical CPU, RAM, storage devices, NICs, and peripheral buses exposed to the kernel via firmware interfaces.",examples:"x86-64 CPU, DDR5 RAM, NVMe SSD, PCIe bus, ACPI tables",color:"bg-surface-3 border-border text-gray-300",dot:"bg-gray-500"}],ae=[{icon:C,label:"Duration",value:"2.5 hours (150 minutes)"},{icon:B,label:"Format",value:"Hands-on performance-based lab"},{icon:T,label:"Platform",value:"Red Hat Enterprise Linux 9"},{icon:G,label:"Passing Score",value:"Not published (internally ~70%)"},{icon:E,label:"Prerequisite",value:"RHCSA (EX200) recommended"},{icon:_,label:"Objective",value:"Diagnose & troubleshoot live Linux systems"}],ne=[{n:"1",title:"Read the concept sections",body:"Each page opens with a visual flow diagram and plain-English explanations of how the subsystem works before diving into commands."},{n:"2",title:"Study the command tables",body:"Command tables list every relevant tool, its flags, and concise notes. Focus on commands you cannot easily guess — the exam is open-man-page but time is tight."},{n:"3",title:"Copy and run every code block",body:"All code blocks are copy-paste ready. Spin up a RHEL 9 VM and reproduce each example. Muscle memory matters on exam day."},{n:"4",title:"Check the Exam Tip boxes",body:'Red "Exam Tip" boxes call out the exact scenarios Red Hat examiners are known to test — prioritise these.'},{n:"5",title:"Simulate failures",body:"Deliberately break things in your VM: corrupt GRUB, fill a filesystem, trigger OOM, set wrong SELinux contexts. Recovering from real failures builds real skill."}];function Le(){return e.jsxs("div",{className:"space-y-12",children:[e.jsx(j,{icon:E,title:"EX342 Visual Guide",subtitle:"A comprehensive visual reference for the Red Hat Certified Specialist in Linux Diagnostics and Troubleshooting exam. Every subsystem explained with flow diagrams, annotated commands, and exam-focused tips.",tags:["EX342","RHEL 9","Diagnostics","Troubleshooting"]}),e.jsxs("section",{children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(B,{size:22,className:"text-rh-red"}),"Exam Overview"]}),e.jsx("p",{className:"section-body mb-4",children:"EX342 tests your ability to diagnose and resolve real-world problems on a live RHEL 9 system under time pressure. There are no multiple-choice questions — every task requires you to actually fix a broken system component and leave it in a working, persistent state."}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",children:ae.map(({icon:s,label:t,value:o})=>e.jsxs("div",{className:"flex items-start gap-3 rounded-xl border border-border bg-surface-1 px-4 py-3",children:[e.jsx("div",{className:"p-2 rounded-lg bg-rh-red/10 border border-rh-red/20 flex-shrink-0",children:e.jsx(s,{size:16,className:"text-rh-red"})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold text-gray-400 uppercase tracking-wide",children:t}),e.jsx("p",{className:"text-sm text-gray-200 mt-0.5",children:o})]})]},t))})]}),e.jsxs("section",{children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(g,{size:22,className:"text-rh-red"}),"Exam Topics"]}),e.jsx("p",{className:"section-body mb-5",children:"The exam covers eleven major subsystems. Select any topic to access its full visual reference, command tables, and exam tips."}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:re.map(({path:s,icon:t,title:o,desc:r,color:i,tags:l})=>{const c=oe[i];return e.jsxs(O,{to:s,className:`group block rounded-xl border ${c.border} ${c.bg} p-4 hover:bg-surface-2/60 transition-all duration-200 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5`,children:[e.jsxs("div",{className:"flex items-start justify-between mb-3",children:[e.jsx("div",{className:`p-2.5 rounded-lg ${c.icon} border border-white/10`,children:e.jsx(t,{size:18})}),e.jsx(X,{size:16,className:"text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all mt-1"})]}),e.jsx("h3",{className:"text-sm font-bold text-white mb-1",children:o}),e.jsx("p",{className:"text-xs text-gray-400 leading-relaxed mb-3",children:r}),e.jsx("div",{className:"flex flex-wrap gap-1.5",children:l.map(p=>e.jsx("span",{className:`pill ${c.tag} text-[10px]`,children:p},p))})]},s)})})]}),e.jsxs("section",{children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(v,{size:22,className:"text-rh-red"}),"Linux System Architecture"]}),e.jsx("p",{className:"section-body mb-5",children:"Effective troubleshooting requires understanding which layer a problem lives in. A segfault in user space has a different resolution path than a kernel NULL pointer dereference or a hardware memory error. The five layers below form the mental model behind every diagnostic technique in this guide."}),e.jsx("div",{className:"rounded-xl border border-border bg-surface-1 p-5 space-y-1",children:R.map((s,t)=>e.jsxs("div",{children:[e.jsxs("div",{className:`rounded-lg border px-4 py-3 ${s.color}`,children:[e.jsxs("div",{className:"flex items-center gap-2 mb-0.5",children:[e.jsx("div",{className:`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`}),e.jsx("span",{className:"text-sm font-bold",children:s.label})]}),e.jsx("p",{className:"text-xs leading-relaxed opacity-80 ml-4",children:s.desc}),e.jsx("p",{className:"text-[11px] font-mono opacity-60 mt-1 ml-4",children:s.examples})]}),t<R.length-1&&e.jsx("div",{className:"flex justify-center py-0.5",children:e.jsx("svg",{width:"14",height:"16",viewBox:"0 0 14 16",fill:"none",className:"opacity-40",children:e.jsx("path",{d:"M7 0v12M1 8l6 7 6-7",stroke:"#EE0000",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round"})})})]},s.label))}),e.jsxs("p",{className:"text-xs text-gray-500 mt-3 leading-relaxed",children:["When a process calls ",e.jsx("code",{className:"code-inline",children:"write()"}),", execution crosses from user space into the kernel via a syscall trap, traverses the VFS layer, reaches a device driver, and eventually talks to hardware — all in microseconds. Knowing this path tells you exactly which tool to use at each layer."]})]}),e.jsxs("section",{children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(I,{size:22,className:"text-rh-red"}),"How to Use This Guide"]}),e.jsx("div",{className:"space-y-3",children:ne.map(({n:s,title:t,body:o})=>e.jsxs("div",{className:"flex gap-4 rounded-xl border border-border bg-surface-1 px-4 py-3",children:[e.jsx("div",{className:"flex-shrink-0 w-7 h-7 rounded-full bg-rh-red/20 border border-rh-red/40 flex items-center justify-center",children:e.jsx("span",{className:"text-xs font-bold text-rh-red",children:s})}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm font-semibold text-white",children:t}),e.jsx("p",{className:"text-xs text-gray-400 mt-0.5 leading-relaxed",children:o})]})]},s))})]}),e.jsxs("section",{children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(C,{size:22,className:"text-rh-red"}),"Study Plan & Exam Day Tips"]}),e.jsx(a,{type:"tip",title:"Recommended Study Timeline (4-week plan)",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("span",{className:"text-green-200 font-semibold",children:"Week 1:"})," Boot process, kernel diagnostics, system logging. Set up a RHEL 9 VM and deliberately break/fix each subsystem."]}),e.jsxs("li",{children:[e.jsx("span",{className:"text-green-200 font-semibold",children:"Week 2:"})," Storage, memory, CPU performance. Practice LVM recovery, OOM analysis, and perf profiling."]}),e.jsxs("li",{children:[e.jsx("span",{className:"text-green-200 font-semibold",children:"Week 3:"})," Networking, SELinux, process management. Generate and fix AVC denials; use strace on real service failures."]}),e.jsxs("li",{children:[e.jsx("span",{className:"text-green-200 font-semibold",children:"Week 4:"})," Application debugging, hardware diagnostics, full mock exam simulation (timed, no notes)."]})]})}),e.jsx(a,{type:"exam",title:"Exam Day Strategy",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold",children:"Read all tasks first"})," — scan every question before starting so you can sequence easy wins and flag complex tasks."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold",children:"Verify persistence"})," — most fixes must survive a reboot. Always run ",e.jsx("code",{className:"code-inline",children:"systemctl enable"}),", write config files, and reboot to confirm before moving on."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold",children:"Use man pages"})," — the exam is open-man-page. If you forget a flag, ",e.jsx("code",{className:"code-inline",children:"man 8 dracut"})," is faster than guessing."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold",children:"Don't skip broken tasks"})," — partial credit is awarded. Implement what you can and leave the system in a better state than you found it."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold",children:"Watch the clock"})," — aim to spend no more than 15 minutes per task. If you're stuck, move on and return."]})]})}),e.jsx(a,{type:"warning",title:"Common Exam Pitfalls",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:["Forgetting to run ",e.jsx("code",{className:"code-inline",children:"grub2-mkconfig -o /boot/grub2/grub.cfg"})," after editing ",e.jsx("code",{className:"code-inline",children:"/etc/default/grub"}),"."]}),e.jsx("li",{children:"Setting SELinux to permissive mode instead of actually fixing the AVC denial — examiners check the mode."}),e.jsx("li",{children:"Fixing a service but not enabling it, so it fails after the mandatory reboot."}),e.jsxs("li",{children:["Using ",e.jsx("code",{className:"code-inline",children:"ip"})," commands (runtime-only) instead of ",e.jsx("code",{className:"code-inline",children:"nmcli"})," / connection files for persistent network changes."]}),e.jsxs("li",{children:["Overlooking ",e.jsx("code",{className:"code-inline",children:"restorecon -Rv"})," after moving files to fix SELinux context mismatches."]})]})})]}),e.jsx("div",{className:"border-t border-border pt-6 text-center",children:e.jsx("p",{className:"text-xs text-gray-600",children:"EX342 Visual Guide • Based on Red Hat Enterprise Linux 9 • Not affiliated with Red Hat, Inc."})})]})}const ie={'code[class*="language-"]':{color:"#c9d1d9",background:"none",fontFamily:"JetBrains Mono, monospace",fontSize:"0.82rem",lineHeight:"1.7"},'pre[class*="language-"]':{background:"#1c2128",border:"1px solid #30363d",borderRadius:"8px",padding:"1.25rem",overflow:"auto"},comment:{color:"#8b949e",fontStyle:"italic"},punctuation:{color:"#c9d1d9"},property:{color:"#79c0ff"},string:{color:"#a5d6ff"},"attr-value":{color:"#a5d6ff"},keyword:{color:"#ff7b72"},"class-name":{color:"#ffa657"},function:{color:"#d2a8ff"},number:{color:"#79c0ff"},boolean:{color:"#ff7b72"},operator:{color:"#ff7b72"},variable:{color:"#ffa657"},builtin:{color:"#79c0ff"},"selector-tag":{color:"#7ee787"}};function n({code:s,language:t="bash",title:o,showLineNumbers:r=!1}){const[i,l]=A.useState(!1),c=()=>{navigator.clipboard.writeText(s.trim()),l(!0),setTimeout(()=>l(!1),2e3)};return e.jsxs("div",{className:"rounded-lg overflow-hidden border border-border my-4",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2 bg-surface-2 border-b border-border",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(Y,{size:13,className:"text-gray-500"}),e.jsx("span",{className:"text-xs text-gray-400 font-mono",children:o||t})]}),e.jsxs("button",{onClick:c,className:"flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-200 transition-colors px-2 py-1 rounded hover:bg-surface-3",children:[i?e.jsx(J,{size:13,className:"text-green-400"}):e.jsx(Q,{size:13}),e.jsx("span",{children:i?"Copied!":"Copy"})]})]}),e.jsx(Z,{language:t,style:ie,showLineNumbers:r,lineNumberStyle:{color:"#4d5566",fontSize:"0.75rem",minWidth:"2.5em"},wrapLongLines:!1,children:s.trim()})]})}function L({title:s,rows:t,columns:o}){const r=o||[{label:"Command",key:"cmd"},{label:"Description",key:"desc"},{label:"Example / Notes",key:"note"}];return e.jsxs("div",{className:"my-5 rounded-xl overflow-hidden border border-border",children:[s&&e.jsx("div",{className:"px-4 py-2.5 bg-surface-2 border-b border-border",children:e.jsx("h3",{className:"text-sm font-semibold text-gray-300",children:s})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsx("tr",{className:"bg-surface-2/80",children:r.map(i=>e.jsx("th",{className:"text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wide border-b border-border",children:i.label},i.key))})}),e.jsx("tbody",{children:t.map((i,l)=>e.jsx("tr",{className:`border-b border-border/50 last:border-0 ${l%2===0?"bg-surface-0":"bg-surface-1/40"} hover:bg-surface-2/60 transition-colors`,children:r.map(c=>e.jsx("td",{className:`px-4 py-2.5 ${c.key==="cmd"?"font-mono text-token-string text-xs whitespace-nowrap":"text-gray-300 text-xs"}`,children:i[c.key]||"—"},c.key))},l))})]})})]})}const U={default:{bg:"bg-surface-2",border:"border-border",text:"text-gray-200",dot:"bg-gray-500"},red:{bg:"bg-red-950/40",border:"border-red-800",text:"text-red-300",dot:"bg-red-500"},blue:{bg:"bg-blue-950/40",border:"border-blue-800",text:"text-blue-300",dot:"bg-blue-500"},green:{bg:"bg-green-950/40",border:"border-green-800",text:"text-green-300",dot:"bg-green-500"},yellow:{bg:"bg-yellow-950/40",border:"border-yellow-800",text:"text-yellow-300",dot:"bg-yellow-500"},purple:{bg:"bg-purple-950/40",border:"border-purple-800",text:"text-purple-300",dot:"bg-purple-500"}};function le({label:s,sub:t,color:o="default",icon:r,side:i}){const l=U[o];return e.jsxs("div",{className:"flex items-start gap-4",children:[e.jsx("div",{className:"flex flex-col items-center",children:e.jsx("div",{className:`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${l.dot}`})}),e.jsxs("div",{className:`flex-1 rounded-lg border ${l.border} ${l.bg} px-4 py-3 mb-1`,children:[e.jsxs("div",{className:`flex items-center gap-2 font-semibold text-sm ${l.text}`,children:[r&&e.jsx(r,{size:14}),s]}),t&&e.jsx("p",{className:"text-xs text-gray-400 mt-0.5",children:t}),i&&e.jsx("div",{className:"mt-1.5",children:i})]})]})}function b({title:s,steps:t}){return e.jsxs("div",{className:"my-6 rounded-xl border border-border bg-surface-1 p-5",children:[s&&e.jsx("h3",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4",children:s}),e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-rh-red via-border to-border"}),e.jsx("div",{className:"space-y-3 pl-1",children:t.map((o,r)=>e.jsx(le,{...o},r))})]})]})}function ce({steps:s}){return e.jsx("div",{className:"my-6 overflow-x-auto",children:e.jsx("div",{className:"flex items-center gap-0 min-w-max px-2",children:s.map((t,o)=>{const r=U[t.color||"default"];return e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:`rounded-lg border ${r.border} ${r.bg} px-3 py-2 text-center min-w-[90px]`,children:[e.jsx("div",{className:`text-xs font-bold ${r.text}`,children:t.label}),t.sub&&e.jsx("div",{className:"text-[10px] text-gray-500 mt-0.5",children:t.sub})]}),o<s.length-1&&e.jsxs("div",{className:"flex items-center mx-1",children:[e.jsx("div",{className:"w-6 h-px bg-rh-red"}),e.jsx("div",{className:"border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-rh-red",style:{borderLeftWidth:8}})]})]},o)})})})}const de=[{label:"BIOS / UEFI",sub:"Firmware initialises hardware (POST), locates boot device via boot order",color:"purple"},{label:"MBR / GPT",sub:"First-stage bootloader code (MBR: 446 bytes) or GPT ESP partition read",color:"blue"},{label:"GRUB2 Bootloader",sub:"Loads kernel image (vmlinuz) and initramfs, presents boot menu, applies cmdline params",color:"blue"},{label:"Kernel Loading",sub:"Kernel decompresses itself, initialises CPU, memory, subsystems; mounts initramfs as /",color:"yellow"},{label:"initramfs / dracut",sub:"Temporary root FS; discovers & mounts real root, handles dm-crypt/LVM/network boot",color:"yellow"},{label:"systemd (PID 1)",sub:"Mounts real root FS, starts units in dependency order toward the default target",color:"green"},{label:"Default Target",sub:"multi-user.target or graphical.target — all services running, login prompt available",color:"green"}],me=[{label:"BIOS/UEFI",sub:"POST & boot order",color:"purple"},{label:"MBR/GPT",sub:"Stage-1 loader",color:"blue"},{label:"GRUB2",sub:"Load kernel + initrd",color:"blue"},{label:"Kernel",sub:"Init + decompression",color:"yellow"},{label:"initramfs",sub:"Pivot to real root",color:"yellow"},{label:"systemd",sub:"PID 1 / units",color:"green"},{label:"Target",sub:"multi-user / graphical",color:"green"}],ue=[{label:"Observe symptoms",sub:'Black screen, kernel panic, "failed to mount", dracut shell, systemd unit failures',color:"red"},{label:"Is GRUB menu visible?",sub:"Yes → BIOS/MBR is OK, problem is kernel or later.  No → reinstall GRUB2 (grub2-install)",color:"yellow"},{label:"Check kernel parameters",sub:"Boot with rd.break or init=/bin/bash to drop to a shell before systemd starts",color:"blue"},{label:"Check initramfs",sub:"Rebuild with dracut -f; check lsinitrd output; confirm necessary modules are included",color:"blue"},{label:"Check root filesystem",sub:"Boot into rescue.target; run fsck on unmounted partitions; verify /etc/fstab UUIDs",color:"yellow"},{label:"Check systemd units",sub:"journalctl -b -1 -p err; systemctl list-units --failed; inspect unit file dependencies",color:"purple"},{label:"System recovers",sub:"Fix persisted, reboot verified; document root cause",color:"green"}],pe=[{label:"rd.break",sub:"Drops to a dracut shell immediately before pivoting to the real root. Useful for resetting root password or inspecting initramfs environment.",color:"red"},{label:"rd.break=switch_root",sub:"Breaks just after the real root is mounted but before executing /sbin/init — allows chroot-style edits.",color:"yellow"},{label:"init=/bin/bash",sub:"Kernel spawns a raw bash shell as PID 1 instead of systemd. Filesystem is mounted read-only; remount rw before making changes.",color:"yellow"},{label:"ro / rw",sub:"Controls whether the root filesystem is mounted read-only (default) or read-write at boot time.",color:"blue"},{label:"quiet",sub:"Suppresses most kernel boot messages. Remove during troubleshooting to see full kernel output.",color:"default"},{label:"rd.lvm.lv=vg/lv",sub:"Forces dracut to activate a specific LVM logical volume — useful when auto-detection fails.",color:"purple"},{label:"systemd.unit=rescue.target",sub:'Equivalent to appending "1" or "single" — boots to rescue mode with minimal services.',color:"green"},{label:"nomodeset",sub:"Disables kernel mode-setting for the GPU; useful when a driver bug prevents the framebuffer from initialising.",color:"default"}],he=[{label:"poweroff.target",sub:"Equivalent to old runlevel 0 — shuts down the system",color:"red"},{label:"rescue.target",sub:"Runlevel 1 / single-user — root shell, minimal services, local filesystems mounted",color:"yellow"},{label:"emergency.target",sub:"Even more minimal than rescue — read-only root, no services. Use for severe filesystem issues.",color:"red"},{label:"multi-user.target",sub:"Runlevel 3 — full multi-user CLI environment, all services, no GUI",color:"blue"},{label:"graphical.target",sub:"Runlevel 5 — multi-user.target + display manager (GDM/SDDM)",color:"purple"},{label:"reboot.target",sub:"Runlevel 6 — cleanly reboots the system",color:"green"}],be=[{cmd:"grub2-install /dev/sda",desc:"Install GRUB2 bootloader to MBR of /dev/sda",note:"BIOS systems. Use --target=x86_64-efi for UEFI."},{cmd:"grub2-mkconfig -o /boot/grub2/grub.cfg",desc:"Regenerate grub.cfg from /etc/default/grub and /etc/grub.d/ scripts",note:"Always run after editing /etc/default/grub"},{cmd:"grubby --default-kernel",desc:"Print the path to the current default kernel",note:"Reads from /boot/loader/entries/"},{cmd:"grubby --set-default /boot/vmlinuz-…",desc:"Set a specific kernel as the default",note:"Persists across reboots"},{cmd:'grubby --update-kernel=ALL --args="…"',desc:"Add kernel cmdline args to all installed kernels",note:'e.g. --args="quiet splash"'},{cmd:'grubby --update-kernel=ALL --remove-args="…"',desc:"Remove kernel cmdline arguments from all kernels",note:'e.g. --remove-args="rhgb quiet"'},{cmd:"grubby --info=ALL",desc:"Show current kernel entries and their cmdline arguments",note:"Useful for auditing boot options"},{cmd:"dracut -f",desc:"Rebuild initramfs for the currently running kernel",note:"Overwrites existing initramfs"},{cmd:"dracut -f /boot/initramfs-$(uname -r).img $(uname -r)",desc:"Explicitly rebuild initramfs for running kernel",note:"Explicit paths avoid ambiguity"},{cmd:'dracut --add "lvm dm-crypt" -f',desc:"Rebuild initramfs with additional dracut modules",note:"Modules: lvm, dm-crypt, network, nfs…"},{cmd:"lsinitrd",desc:"List contents of the default initramfs image",note:"lsinitrd /boot/initramfs-<ver>.img for specific"},{cmd:"lsinitrd -f /etc/dracut.conf",desc:"Extract and print a specific file from the initramfs",note:"Good for verifying config is baked in"},{cmd:"journalctl -b",desc:"Show all log messages from the current boot",note:"-b -1 for previous boot, -b -2 two boots ago"},{cmd:"journalctl -b -p err",desc:"Show only error-level messages from current boot",note:"Levels: emerg crit err warning notice info debug"},{cmd:"journalctl -b -1",desc:"Show logs from the previous boot (useful after a crash)",note:"Requires persistent journal storage"},{cmd:"systemctl list-units --failed",desc:"List all units that failed to start at last boot",note:"Also: systemctl --failed"},{cmd:"systemctl isolate rescue.target",desc:"Switch running system into rescue mode immediately",note:"Equivalent to telinit 1"},{cmd:"systemctl isolate emergency.target",desc:"Switch into emergency mode (read-only root, no services)",note:"For serious filesystem/dependency issues"},{cmd:"systemctl get-default",desc:"Show the current default boot target",note:"Returns e.g. multi-user.target"},{cmd:"systemctl set-default graphical.target",desc:"Set graphical.target as the default boot target",note:"Creates symlink at /etc/systemd/system/default.target"},{cmd:"systemctl reboot",desc:"Cleanly reboot the system via systemd",note:"Equivalent to reboot(8)"}];function Ue(){return e.jsxs("div",{className:"space-y-12",children:[e.jsx(j,{icon:g,title:"Boot Process",subtitle:"Master the full RHEL 9 boot sequence — from firmware initialisation through GRUB2, initramfs, and systemd target activation — with recovery techniques for every failure mode.",tags:["GRUB2","initramfs","dracut","systemd","rd.break","EX342"]}),e.jsxs("section",{children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(g,{size:20,className:"text-rh-red"}),"Boot Sequence at a Glance"]}),e.jsx("p",{className:"section-body mb-4",children:"Every Linux boot passes through the same seven stages in sequence. A failure at any stage produces distinctive symptoms that point you directly to the right tool. The horizontal flow shows the high-level progression; the detailed flow below expands each stage with diagnostic context."}),e.jsx(ce,{steps:me}),e.jsx(b,{title:"Detailed Boot Stages",steps:de})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Stage 1 — BIOS / UEFI Firmware"}),e.jsx("p",{className:"section-body",children:"When the machine is powered on, the CPU begins executing firmware code stored in flash memory. BIOS (Basic Input/Output System) is the legacy interface; UEFI (Unified Extensible Firmware Interface) is its modern replacement found on all current hardware."}),e.jsxs("ul",{className:"mt-3 space-y-1.5 text-sm text-gray-300",children:[e.jsxs("li",{children:[e.jsx("span",{className:"text-yellow-300 font-semibold",children:"POST (Power-On Self Test):"})," Firmware tests CPU, RAM, and storage controllers. Errors are reported via beep codes or on-screen messages."]}),e.jsxs("li",{children:[e.jsx("span",{className:"text-yellow-300 font-semibold",children:"Boot device selection:"})," Firmware scans configured boot order (NVMe, SATA, USB, PXE) and loads the first-stage bootloader from the first bootable device."]}),e.jsxs("li",{children:[e.jsx("span",{className:"text-yellow-300 font-semibold",children:"BIOS vs UEFI:"})," BIOS reads the 512-byte MBR from the disk; UEFI reads EFI executables from the EFI System Partition (ESP), typically ",e.jsx("code",{className:"code-inline",children:"/boot/efi/"})," formatted as FAT32."]}),e.jsxs("li",{children:[e.jsx("span",{className:"text-yellow-300 font-semibold",children:"Secure Boot (UEFI):"})," UEFI Secure Boot verifies each bootloader/kernel binary against an allowlist of cryptographic signatures before executing it."]})]}),e.jsxs(a,{type:"tip",title:"Diagnosing Firmware-Level Issues",children:["Firmware failures rarely manifest as Linux problems — the system either won't POST, won't find a boot device, or displays a firmware-specific error screen. If the GRUB menu never appears, check: (1) boot order in UEFI setup, (2) whether the ESP partition exists and is flagged as boot/esp in ",e.jsx("code",{className:"code-inline",children:"parted"}),", and (3) whether the GRUB EFI binary exists at ",e.jsx("code",{className:"code-inline",children:"/boot/efi/EFI/redhat/grubx64.efi"}),"."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Stage 2 — GRUB2 Bootloader"}),e.jsxs("p",{className:"section-body",children:["GRUB2 (GRand Unified Bootloader version 2) is the standard bootloader for RHEL 9. It presents a boot menu, loads the kernel image (",e.jsx("code",{className:"code-inline",children:"vmlinuz"}),") and initial RAM filesystem (",e.jsx("code",{className:"code-inline",children:"initramfs"}),") into memory, and passes the kernel command line to the kernel."]}),e.jsx("h3",{className:"text-base font-semibold text-white mt-5 mb-2",children:"Key Configuration Files"}),e.jsxs("ul",{className:"space-y-1.5 text-sm text-gray-300",children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"/etc/default/grub"})," — Human-editable defaults (timeout, cmdline, theme). ",e.jsxs("strong",{className:"text-white",children:["Never edit ",e.jsx("code",{className:"code-inline",children:"/boot/grub2/grub.cfg"})," directly."]})]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"/etc/grub.d/"})," — Shell scripts that generate grub.cfg sections (10_linux generates kernel entries, 40_custom for hand-written entries)."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"/boot/grub2/grub.cfg"})," — Auto-generated final config (BIOS systems)."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"/boot/efi/EFI/redhat/grub.cfg"})," — Auto-generated final config (UEFI systems)."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"/boot/loader/entries/*.conf"})," — BLS (Boot Loader Specification) entries used by grubby and the kernel management tools."]})]}),e.jsx(n,{language:"bash",title:"/etc/default/grub — key variables",code:`# /etc/default/grub
GRUB_TIMEOUT=5                        # seconds to show menu before booting default
GRUB_DEFAULT=saved                    # 'saved' = use grubenv; 0 = first entry
GRUB_DISABLE_SUBMENU=true
GRUB_TERMINAL_OUTPUT="console"
GRUB_CMDLINE_LINUX="rd.lvm.lv=rhel/root rd.lvm.lv=rhel/swap rhgb quiet"
# 'rhgb' = Red Hat Graphical Boot (Plymouth splash screen)
# 'quiet' = suppress kernel messages during boot
# Remove 'rhgb quiet' to see full boot messages for troubleshooting

GRUB_DISABLE_RECOVERY="true"          # Set to false to show recovery entries`}),e.jsx(n,{language:"bash",title:"Regenerate grub.cfg after editing /etc/default/grub",code:`# BIOS / Legacy systems
grub2-mkconfig -o /boot/grub2/grub.cfg

# UEFI systems
grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg

# Verify the output — check GRUB_CMDLINE_LINUX is present:
grep -i cmdline /boot/grub2/grub.cfg`}),e.jsx(n,{language:"bash",title:"grubby — manage kernel entries without editing files",code:`# List all installed kernels and their options
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
grubby --info=DEFAULT`}),e.jsxs(a,{type:"exam",title:"Exam Tip — GRUB2 Changes",children:["The most common exam mistake is editing ",e.jsx("code",{className:"code-inline",children:"/etc/default/grub"})," and forgetting to regenerate ",e.jsx("code",{className:"code-inline",children:"grub.cfg"}),". Always follow an edit with the appropriate ",e.jsx("code",{className:"code-inline",children:"grub2-mkconfig"})," command. On UEFI systems, the output path is different — check with"," ",e.jsx("code",{className:"code-inline",children:"ls /boot/efi/EFI/redhat/"})," to confirm. Use ",e.jsx("code",{className:"code-inline",children:"grubby"})," when you only need to change kernel parameters, as it directly modifies BLS entries without requiring a config regeneration."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Kernel Command-Line Parameters"}),e.jsxs("p",{className:"section-body mb-4",children:["Boot parameters are passed from GRUB2 to the kernel at boot time. They control everything from root device selection to dracut module behaviour and emergency console access. During troubleshooting, parameters can be injected one-time at the GRUB menu by pressing",e.jsx("kbd",{className:"mx-1 px-1.5 py-0.5 rounded border border-border bg-surface-2 text-xs font-mono",children:"e"}),"to edit the current entry and",e.jsx("kbd",{className:"mx-1 px-1.5 py-0.5 rounded border border-border bg-surface-2 text-xs font-mono",children:"Ctrl+X"}),"to boot."]}),e.jsx(b,{title:"Important Boot Parameters for Troubleshooting",steps:pe}),e.jsx(n,{language:"bash",title:"One-time boot parameter injection at GRUB menu",code:`# At the GRUB menu:
# 1. Select the kernel entry
# 2. Press 'e' to edit
# 3. Find the line starting with 'linux' (contains vmlinuz path + cmdline)
# 4. Append your parameter(s) at the END of the linux line, e.g.:
#       ... rhgb quiet rd.break
# 5. Press Ctrl+X or F10 to boot with the modified parameters

# This is TEMPORARY — the edit is discarded after boot.
# To make permanent: edit /etc/default/grub, then run grub2-mkconfig`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Stage 3 — initramfs & dracut"}),e.jsxs("p",{className:"section-body",children:["The initramfs (initial RAM filesystem) is a compressed cpio archive that the kernel unpacks into a tmpfs at boot time and uses as its temporary root filesystem. On RHEL 9 it is built by ",e.jsx("strong",{className:"text-white",children:"dracut"}),". Its job is to do whatever early work is required before the real root filesystem can be mounted — typically LVM assembly, dm-crypt decryption, or iSCSI/NFS discovery."]}),e.jsx("h3",{className:"text-base font-semibold text-white mt-5 mb-2",children:"How initramfs Works"}),e.jsxs("ol",{className:"space-y-1.5 text-sm text-gray-300 list-decimal list-inside",children:[e.jsx("li",{children:"Kernel decompresses the initramfs cpio archive into an anonymous tmpfs and chroots into it."}),e.jsxs("li",{children:["Kernel executes ",e.jsx("code",{className:"code-inline",children:"/init"})," inside the initramfs (a dracut-generated shell script)."]}),e.jsx("li",{children:"dracut's init discovers storage devices, decrypts volumes, assembles LVM/RAID, and runs udev."}),e.jsxs("li",{children:["dracut mounts the real root filesystem at ",e.jsx("code",{className:"code-inline",children:"/sysroot"}),"."]}),e.jsxs("li",{children:["dracut executes ",e.jsx("code",{className:"code-inline",children:"switch_root /sysroot /sbin/init"})," — pivoting to the real root and handing off to systemd."]})]}),e.jsx(n,{language:"bash",title:"Inspect initramfs contents",code:`# List all files in the default initramfs
lsinitrd

# List files in a specific initramfs image
lsinitrd /boot/initramfs-5.14.0-362.8.1.el9_3.x86_64.img

# Extract and view a specific file from initramfs
lsinitrd -f /etc/dracut.conf
lsinitrd -f /usr/lib/systemd/systemd

# Check which dracut modules are included
lsinitrd | grep -E "^dracut|lib/dracut"

# Verify a specific kernel module is present
lsinitrd | grep dm_crypt`}),e.jsx(n,{language:"bash",title:"Rebuild initramfs with dracut",code:`# Rebuild for the currently running kernel (simplest form)
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
done`}),e.jsx(n,{language:"bash",title:"dracut configuration files",code:`# System-wide dracut configuration
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
dracut -f`}),e.jsxs(a,{type:"warning",title:"initramfs Corruption",children:["A corrupted or missing initramfs causes a kernel panic with the message",e.jsx("code",{className:"code-inline",children:"VFS: Unable to mount root fs"})," or drops to a dracut emergency shell. Recovery: boot from an older kernel (GRUB menu), or boot from installation media, mount the existing OS, and run ",e.jsx("code",{className:"code-inline",children:"dracut -f"})," in a chroot."]}),e.jsxs(a,{type:"exam",title:"Exam Tip — rd.break for Root Password Reset",children:["Resetting a forgotten root password is a classic exam scenario. The canonical RHEL 9 method uses ",e.jsx("code",{className:"code-inline",children:"rd.break"})," at the GRUB2 prompt — see the full walkthrough in the code example below. Key detail: after ",e.jsx("code",{className:"code-inline",children:"chroot /sysroot"}),"you must run ",e.jsx("code",{className:"code-inline",children:"touch /.autorelabel"})," (or pass",e.jsx("code",{className:"code-inline",children:"enforcing=0"})," at boot) so SELinux relabels the",e.jsx("code",{className:"code-inline",children:"/etc/shadow"})," file with the correct context."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Root Password Reset via rd.break"}),e.jsx("p",{className:"section-body mb-4",children:"This is one of the most tested boot-recovery procedures. The entire workflow must be completed without rebooting until the final step."}),e.jsx(n,{language:"bash",title:"Step-by-step root password reset — rd.break method",code:`# ─── At the GRUB menu ───────────────────────────────────────────────────────
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
# This is faster but leaves SELinux in permissive mode until you re-enable it.`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Emergency & Rescue Mode"}),e.jsx("p",{className:"section-body mb-3",children:"Both rescue.target and emergency.target provide a root shell for recovery work. Emergency is more stripped-down — it mounts the root filesystem read-only and starts virtually nothing, making it the right choice when systemd unit failures prevent even rescue mode from completing."}),e.jsx(n,{language:"bash",title:"Booting into rescue.target and emergency.target",code:`# ─── METHOD 1: kernel parameter at GRUB menu ────────────────────────────────
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
systemctl reboot`}),e.jsxs(a,{type:"tip",title:"Rescue vs Emergency — when to use which",children:[e.jsx("strong",{className:"text-green-200",children:"rescue.target"})," mounts all local filesystems and starts a small set of services including networking (depending on config). Use it for general system recovery, fixing bad unit files, or running ",e.jsx("code",{className:"code-inline",children:"fsck"}),"on secondary filesystems.",e.jsx("br",{}),e.jsx("br",{}),e.jsx("strong",{className:"text-green-200",children:"emergency.target"})," is the last resort — it mounts only the root filesystem (read-only) and provides a bare root shell. Use it when a required filesystem listed in ",e.jsx("code",{className:"code-inline",children:"/etc/fstab"})," is missing or corrupt and prevents even rescue.target from completing."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Stage 4 — systemd Targets"}),e.jsxs("p",{className:"section-body mb-4",children:["systemd uses ",e.jsx("em",{children:"targets"})," to group units and define a desired system state, replacing the SysV concept of runlevels. Targets can have dependencies on other targets (",e.jsx("code",{className:"code-inline",children:"Wants="}),", ",e.jsx("code",{className:"code-inline",children:"Requires="}),"), forming a dependency graph that systemd resolves at boot. The default target is a symlink at ",e.jsx("code",{className:"code-inline",children:"/etc/systemd/system/default.target"}),"."]}),e.jsx(b,{title:"systemd Targets (lowest to highest activation)",steps:he}),e.jsxs("div",{className:"mt-5 rounded-xl overflow-hidden border border-border",children:[e.jsx("div",{className:"px-4 py-2.5 bg-surface-2 border-b border-border",children:e.jsx("h3",{className:"text-sm font-semibold text-gray-300",children:"SysV Runlevel → systemd Target Mapping"})}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-xs",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-surface-2/80 border-b border-border",children:[e.jsx("th",{className:"text-left px-4 py-2.5 text-gray-400 uppercase tracking-wide font-semibold",children:"SysV Runlevel"}),e.jsx("th",{className:"text-left px-4 py-2.5 text-gray-400 uppercase tracking-wide font-semibold",children:"systemd Target"}),e.jsx("th",{className:"text-left px-4 py-2.5 text-gray-400 uppercase tracking-wide font-semibold",children:"Description"})]})}),e.jsx("tbody",{children:[["0","poweroff.target","Halt / power off"],["1","rescue.target","Single-user / maintenance"],["2, 3, 4","multi-user.target","Multi-user CLI (no GUI)"],["5","graphical.target","Multi-user with GUI"],["6","reboot.target","Reboot"]].map(([s,t,o],r)=>e.jsxs("tr",{className:`border-b border-border/50 last:border-0 ${r%2===0?"bg-surface-0":"bg-surface-1/40"}`,children:[e.jsx("td",{className:"px-4 py-2.5 font-mono text-token-string",children:s}),e.jsx("td",{className:"px-4 py-2.5 font-mono text-yellow-300",children:t}),e.jsx("td",{className:"px-4 py-2.5 text-gray-300",children:o})]},r))})]})})]}),e.jsx(n,{language:"bash",title:"Working with systemd targets",code:`# Show the current default target
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
systemctl cat multi-user.target`}),e.jsxs(a,{type:"exam",title:"Exam Tip — Targets and Persistence",children:["The exam may require you to both fix a broken target and ensure the system boots to the correct target permanently. Always use ",e.jsx("code",{className:"code-inline",children:"systemctl set-default"}),"to persist the target — runtime ",e.jsx("code",{className:"code-inline",children:"isolate"})," does not survive reboot. Remember that ",e.jsx("code",{className:"code-inline",children:"rescue.target"})," requires the root password by default; if root is locked, boot with",e.jsx("code",{className:"code-inline",children:"systemd.unit=emergency.target"})," and reset the password first."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Analysing Boot Logs with journalctl"}),e.jsxs("p",{className:"section-body mb-4",children:["journald captures all kernel and service messages from boot. By default on RHEL 9, the journal is stored persistently in ",e.jsx("code",{className:"code-inline",children:"/var/log/journal/"}),"(created automatically if it exists), enabling post-mortem analysis of previous boot failures — invaluable for diagnosing intermittent problems or panic-induced reboots."]}),e.jsx(n,{language:"bash",title:"Boot log analysis with journalctl",code:`# ─── Current boot ───────────────────────────────────────────────────────────
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
journalctl -b -o json-pretty | head -40   # Full structured data`}),e.jsxs(a,{type:"tip",title:"Reading a Kernel Panic from journalctl",children:["After an unexpected reboot, run ",e.jsx("code",{className:"code-inline",children:"journalctl -b -1 -p err"})," to see the previous boot's errors. A kernel panic will show the call stack and",e.jsx("code",{className:"code-inline",children:"RIP:"})," / ",e.jsx("code",{className:"code-inline",children:"Call Trace:"}),"lines. The function name just above ",e.jsx("code",{className:"code-inline",children:"panic()"})," in the trace is usually the culprit. If the panic was caused by a module, remove or update it. If caused by hardware, check MCE logs with ",e.jsx("code",{className:"code-inline",children:"mcelog"})," or",e.jsx("code",{className:"code-inline",children:"rasdaemon"}),"."]})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Boot Failure Diagnosis Workflow"}),e.jsx("p",{className:"section-body mb-4",children:"When a system fails to boot, work through this decision tree systematically. Each stage has a definitive symptom that tells you where to look next."}),e.jsx(b,{title:"Boot Failure Recovery Workflow",steps:ue}),e.jsx(n,{language:"bash",title:"Common boot failure diagnostics",code:`# ─── GRUB2 not installed / MBR corrupt ─────────────────────────────────────
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
fsck.ext4 -y /dev/sda1       # -y = answer yes to all repair questions`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"GRUB2 Reinstallation from Rescue Media"}),e.jsx("p",{className:"section-body mb-4",children:"When GRUB2 is completely absent or the MBR is overwritten, you must boot from RHEL 9 installation media and use the rescue environment to reinstall it."}),e.jsx(n,{language:"bash",title:"Full GRUB2 reinstall workflow from rescue media",code:`# Boot from RHEL 9 ISO → Troubleshooting → Rescue a Red Hat system
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
reboot`})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Boot Command Reference"}),e.jsx(L,{title:"Complete Boot Process Command Reference",rows:be})]}),e.jsxs("section",{children:[e.jsx("h2",{className:"section-title",children:"Exam Scenarios & Tips"}),e.jsx(a,{type:"exam",title:"Top Boot-Related Exam Scenarios",children:e.jsxs("ul",{className:"space-y-1.5 mt-1",children:[e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold text-rh-red",children:"Root password reset:"})," Use rd.break → chroot → passwd → touch /.autorelabel → exit × 2 → reboot."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold text-rh-red",children:"Boot into specific target:"})," Append systemd.unit=rescue.target to GRUB cmdline or use systemctl set-default."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold text-rh-red",children:"Add persistent kernel parameter:"})," Edit /etc/default/grub GRUB_CMDLINE_LINUX, then grub2-mkconfig. Or use grubby --update-kernel=ALL --args."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold text-rh-red",children:"Fix broken fstab:"})," Boot emergency.target, remount rw, fix UUIDs with blkid, test with mount -a."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold text-rh-red",children:"Rebuild initramfs:"})," dracut -f — usually needed after adding dm-crypt or LVM to a system."]}),e.jsxs("li",{children:[e.jsx("span",{className:"font-semibold text-rh-red",children:"Analyse previous boot failure:"})," journalctl -b -1 -p err to read crash logs from the last failed boot."]})]})}),e.jsx(a,{type:"warning",title:"Critical Details That Cost Marks",children:e.jsxs("ul",{className:"space-y-1.5 mt-1",children:[e.jsxs("li",{children:["After ",e.jsx("code",{className:"code-inline",children:"rd.break"}),", the filesystem at ",e.jsx("code",{className:"code-inline",children:"/sysroot"})," is read-only by default — always ",e.jsx("code",{className:"code-inline",children:"mount -o remount,rw /sysroot"})," before making changes."]}),e.jsxs("li",{children:["Inside the ",e.jsx("code",{className:"code-inline",children:"rd.break"})," chroot, ",e.jsx("code",{className:"code-inline",children:"touch /.autorelabel"})," is mandatory if SELinux is enforcing — without it the relabelled ",e.jsx("code",{className:"code-inline",children:"/etc/shadow"})," will be denied and the password change is useless."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"grub2-mkconfig"})," output path differs between BIOS (",e.jsx("code",{className:"code-inline",children:"/boot/grub2/grub.cfg"}),") and UEFI (",e.jsx("code",{className:"code-inline",children:"/boot/efi/EFI/redhat/grub.cfg"}),") — use the wrong path and GRUB ignores your changes."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"systemctl isolate"})," takes effect immediately but is not persistent — use ",e.jsx("code",{className:"code-inline",children:"systemctl set-default"})," to persist across reboots."]}),e.jsxs("li",{children:["Never edit ",e.jsx("code",{className:"code-inline",children:"/boot/grub2/grub.cfg"})," directly — it is auto-generated and changes are lost on the next ",e.jsx("code",{className:"code-inline",children:"grub2-mkconfig"})," or kernel update."]})]})}),e.jsx(a,{type:"danger",title:"Destructive Operations — Think Before Running",children:e.jsxs("ul",{className:"space-y-1 mt-1",children:[e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"grub2-install"})," writes to the MBR — on the wrong disk this destroys another OS's bootloader."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"xfs_repair -L"})," zeroes the log, which can cause data loss — only use if normal xfs_repair fails."]}),e.jsxs("li",{children:[e.jsx("code",{className:"code-inline",children:"dracut -f"})," overwrites the existing initramfs — if it fails partway through you may be left with no initramfs. Back up first: ",e.jsx("code",{className:"code-inline",children:"cp /boot/initramfs-$(uname -r).img /boot/initramfs-$(uname -r).img.bak"})]})]})})]})]})}function m({children:s}){return e.jsxs("h2",{className:"section-title mt-10 mb-3",children:[e.jsx("span",{className:"w-1 h-6 bg-rh-red rounded-full inline-block"}),s]})}function ge({children:s}){return e.jsx("h3",{className:"text-lg font-semibold text-gray-200 mt-6 mb-2",children:s})}function fe(){const s=[{label:"User Space",sub:"Applications, daemons, shells, libraries (glibc)",color:"bg-green-950/50 border-green-800",text:"text-green-300"},{label:"System Call Interface",sub:"read(), write(), open(), mmap(), ioctl() — the ABI boundary",color:"bg-blue-950/50 border-blue-800",text:"text-blue-300"},{label:"Kernel Core",sub:"Process scheduler, memory manager, VFS, networking stack, IPC",color:"bg-purple-950/50 border-purple-800",text:"text-purple-300"},{label:"Device Drivers",sub:"Block, char, network, platform, USB — compiled-in or modules (.ko)",color:"bg-yellow-950/50 border-yellow-800",text:"text-yellow-300"},{label:"Hardware",sub:"CPU, RAM, NIC, storage controllers, buses (PCIe, USB, I2C)",color:"bg-red-950/50 border-red-800",text:"text-red-300"}];return e.jsxs("div",{className:"my-6 rounded-xl border border-border bg-surface-1 p-5",children:[e.jsx("h3",{className:"text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4",children:"Linux Kernel Architecture"}),e.jsx("div",{className:"space-y-1",children:s.map((t,o)=>e.jsxs("div",{children:[e.jsxs("div",{className:`rounded-lg border ${t.color} px-5 py-3`,children:[e.jsx("div",{className:`font-semibold text-sm ${t.text}`,children:t.label}),e.jsx("div",{className:"text-xs text-gray-400 mt-0.5",children:t.sub})]}),o<s.length-1&&e.jsx("div",{className:"flex justify-center my-1",children:e.jsxs("div",{className:"flex flex-col items-center gap-0.5",children:[e.jsx("div",{className:"w-px h-3 bg-rh-red"}),e.jsx("div",{className:"border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-rh-red"})]})})]},o))})]})}const xe=[{label:"Symptom detected",sub:'Machine hangs, unexpected reboot, "Oops:" in logs, services crash',color:"red"},{label:"Check system journal",sub:"journalctl -k -b -1 — previous boot kernel messages; look for Oops/BUG/panic",color:"yellow"},{label:"Check dmesg for Oops",sub:'dmesg -T | grep -E "Oops|BUG|Call Trace|RIP|RSP|panic"',color:"yellow"},{label:"Decode call trace",sub:"Use addr2line, objdump, or scripts/decode_stacktrace.sh with vmlinux",color:"blue"},{label:"Check kdump vmcore",sub:"/var/crash/$(date)/vmcore — analyze with crash utility; check /proc/sys/kernel/panic",color:"purple"},{label:"Identify responsible module",sub:"lsmod; modinfo <mod>; dmesg | grep <mod>; check /var/log/messages",color:"blue"},{label:"Reproduce on isolated system",sub:"Disable suspect module (blacklist), apply upstream fix, test kernel",color:"green"},{label:"File RCA",sub:"Red Hat support sosreport + vmcore; reference kbase article",color:"green"}],ye=[{cmd:"dmesg -T",desc:"Print kernel ring buffer with human-readable timestamps",note:"-T converts syslog timestamps"},{cmd:"dmesg -l err,warn",desc:"Filter ring buffer to error and warning level messages only",note:"Levels: emerg,alert,crit,err,warn,notice,info,debug"},{cmd:"dmesg -w",desc:"Watch ring buffer live (follow mode)",note:"Like tail -f for kernel messages"},{cmd:"dmesg --clear",desc:"Clear the kernel ring buffer",note:"Requires CAP_SYS_ADMIN; use with care"},{cmd:"journalctl -k",desc:"Show kernel messages from current boot via systemd journal",note:"-k = --dmesg; -b -1 for previous boot"},{cmd:"lsmod",desc:"List currently loaded kernel modules",note:"Shows module, size, used-by count"},{cmd:"modinfo <module>",desc:"Show metadata: filename, license, depends, params, description",note:"modinfo -p shows parameters only"},{cmd:"modprobe <module>",desc:"Load module and its dependencies",note:"-r to remove; --show-depends to list deps"},{cmd:"modprobe -r <module>",desc:"Unload module (and unused deps)",note:"Fails if module is in use"},{cmd:"rmmod <module>",desc:"Remove a single module without removing deps",note:"Lower-level than modprobe -r"},{cmd:"sysctl -a",desc:"Print all kernel tunables",note:"Grep with: sysctl -a | grep net.ipv4"},{cmd:"sysctl -w key=val",desc:"Set a kernel parameter at runtime (temporary)",note:"e.g. sysctl -w vm.swappiness=10"},{cmd:"sysctl -p /etc/sysctl.d/99-x.conf",desc:"Load parameter file permanently",note:"-p with no arg loads /etc/sysctl.conf"},{cmd:"cat /proc/sys/<path>",desc:"Read a sysctl parameter directly via /proc",note:"echo value > /proc/sys/... writes it"},{cmd:"crash /usr/lib/debug/vmlinux vmcore",desc:"Open kdump vmcore for post-mortem analysis",note:"bt = backtrace, ps = process list inside crash"},{cmd:"kdumpctl status",desc:"Check kdump service readiness",note:'Must be "ready"; requires crashkernel= in cmdline'},{cmd:"uname -r",desc:"Print running kernel version string",note:"-a for full info including machine type"},{cmd:"cat /proc/version",desc:"Kernel version + GCC compiler version used to build it",note:"Also shows build date/host"},{cmd:"cat /proc/cmdline",desc:"Show kernel command-line passed by bootloader",note:"Useful to verify crashkernel, selinux, quiet"},{cmd:"cat /proc/interrupts",desc:"Per-CPU IRQ counters for all active interrupts",note:"Watch with: watch -d cat /proc/interrupts"},{cmd:"cat /proc/softirqs",desc:"Software interrupt statistics per CPU",note:"High NET_RX can indicate NIC driver issues"},{cmd:"cat /proc/slabinfo",desc:"Kernel SLAB/SLUB allocator cache statistics",note:"slabtop gives a live top-like view"},{cmd:"slabtop",desc:"Interactive SLAB cache usage (like top for kernel memory)",note:"Spot kmalloc-4096 bloat"},{cmd:"cat /proc/buddyinfo",desc:"Buddy allocator free memory per order per zone",note:"Fragmentation visible here"},{cmd:"perf list",desc:"List all available performance events",note:"Hardware PMU, software, tracepoints, probes"},{cmd:"perf stat -p <pid>",desc:"Collect hardware counters for a running process",note:"Shows IPC, cache-misses, branch-misses"}],ve=`# Basic ring buffer reading
dmesg                             # raw, default format
dmesg -T                          # human-readable timestamps
dmesg -H                          # human-friendly (colored, paged)
dmesg -x                          # show facility and level prefix

# Filter by severity
dmesg -l err                      # errors only
dmesg -l err,warn                 # errors and warnings
dmesg -l crit,alert,emerg         # critical and above

# Filter by facility
dmesg -f kern                     # kernel messages only
dmesg -f daemon                   # daemon messages

# Live watching
dmesg -w                          # follow mode (Ctrl-C to stop)
dmesg -wT                         # follow with timestamps

# Combined useful filters
dmesg -T | grep -i "error|fail|warn|oom|killed"
dmesg --since "1 hour ago"        # requires util-linux >= 2.32

# Previous boot (via journal — dmesg only covers current boot)
journalctl -k -b -1               # kernel messages, previous boot
journalctl -k -b -2               # two boots ago`,je=`# Severity levels (syslog-compatible)
# 0 emerg   — system is unusable
# 1 alert   — action must be taken immediately
# 2 crit    — critical conditions (hardware failure)
# 3 err     — error conditions
# 4 warn    — warning conditions
# 5 notice  — normal but significant condition
# 6 info    — informational messages
# 7 debug   — debug-level messages

# Set console log level (messages at level <= this go to console)
dmesg -n 3                        # only show crit/alert/emerg on console
echo 7 > /proc/sys/kernel/printk  # same, persistent only until reboot

# /proc/sys/kernel/printk contains 4 values:
cat /proc/sys/kernel/printk
# 4  4  1  7
# ^  ^  ^  ^
# |  |  |  +-- boot default
# |  |  +-- minimum level that can be set
# |  +-- default message level
# +-- current console log level`,ke=`# /proc — virtual filesystem exposing kernel state (tmpfs-backed)

## CPU information
cat /proc/cpuinfo
# processor   : 0
# vendor_id   : GenuineIntel
# cpu MHz     : 3600.000
# cache size  : 8192 KB
# physical id : 0
# siblings    : 8
# core id     : 0
# cpu cores   : 4
# flags       : fpu vme de pse ... sse4_2 hypervisor

# Count physical cores (not hyperthreads)
grep "^cpu cores" /proc/cpuinfo | uniq

## Memory information
cat /proc/meminfo
# MemTotal:       16319668 kB
# MemFree:         1023416 kB
# MemAvailable:    8423112 kB   <-- usable without swapping
# Buffers:          512308 kB
# Cached:          6128348 kB
# SwapCached:            0 kB
# Active:          4512880 kB
# Inactive:        3891120 kB
# Dirty:             12416 kB   <-- pages waiting to be written
# Writeback:             0 kB
# AnonPages:       2839244 kB
# Mapped:           723540 kB
# Shmem:            298144 kB
# Slab:             512308 kB   <-- kernel slab caches
# SReclaimable:     389044 kB
# SUnreclaim:       123264 kB
# HugePages_Total:       0
# HugePages_Free:        0

## Process information (replace 1234 with PID)
ls /proc/1234/
# cmdline  cwd  environ  exe  fd/  fdinfo/  maps  mem
# mountinfo  net/  ns/  oom_score_adj  smaps  stat  status

cat /proc/1234/status          # human-readable process state
cat /proc/1234/maps            # memory-mapped regions
cat /proc/1234/smaps           # detailed per-mapping stats (includes PSS)
cat /proc/1234/limits          # resource limits (ulimit)
ls -la /proc/1234/fd/          # open file descriptors
ls -la /proc/1234/ns/          # namespaces (ipc,mnt,net,pid,user,uts)

## Network statistics
cat /proc/net/dev               # per-interface RX/TX byte/packet counters
cat /proc/net/sockstat          # socket summary by type
cat /proc/net/tcp               # TCP socket table (hex addresses)
cat /proc/net/tcp6
cat /proc/net/udp
ss -s                           # summary from /proc/net/*

## Interrupt accounting
cat /proc/interrupts
# CPU0  CPU1  CPU2  CPU3
#   0:  84921     0     0     0  IO-APIC  2-edge  timer
#   1:    780     0     0     0  IO-APIC  1-edge  i8042
#  16:    212     0     0     0  IO-APIC 16-fasteoi  ehci_hcd:usb1
# LOC: 1948221 1820433 1699122 1601881  Local timer interrupts
# RES: 423121   412345   398231   387123  Rescheduling interrupts

## Other useful /proc files
cat /proc/loadavg               # 1/5/15-min load + running/total procs + last PID
cat /proc/uptime                # seconds up, seconds idle
cat /proc/vmstat                # detailed VM statistics
cat /proc/diskstats             # block device I/O statistics
cat /proc/mounts                # currently mounted filesystems
cat /proc/modules               # same as lsmod but raw
cat /proc/slabinfo              # kernel slab allocator stats`,we=`# /proc/sys — live kernel tunables (mirrors sysctl namespace)

## Kernel parameters
cat /proc/sys/kernel/hostname
cat /proc/sys/kernel/pid_max          # max PID number (default 32768)
cat /proc/sys/kernel/threads-max      # max threads system-wide
cat /proc/sys/kernel/dmesg_restrict   # 0=all, 1=root only
cat /proc/sys/kernel/perf_event_paranoid  # -1=all, 0=measured, 1=no-kernel, 2=no-user
cat /proc/sys/kernel/panic            # seconds before reboot on panic (0=no auto reboot)
cat /proc/sys/kernel/panic_on_oops    # 1=panic (not just oops) on kernel oops
cat /proc/sys/kernel/sysrq            # SysRq key functionality bitmask
cat /proc/sys/kernel/ngroups_max      # max supplementary groups per user

## VM tuning
cat /proc/sys/vm/swappiness           # 0-200, tendency to use swap (default 60)
cat /proc/sys/vm/dirty_ratio          # % RAM dirty pages before synchronous writeback
cat /proc/sys/vm/dirty_background_ratio  # % RAM that triggers background writeback
cat /proc/sys/vm/overcommit_memory    # 0=heuristic, 1=always allow, 2=strict
cat /proc/sys/vm/drop_caches          # write 1/2/3 to drop page/slab/both caches
cat /proc/sys/vm/min_free_kbytes      # watermark; kernel tries to keep this free
cat /proc/sys/vm/oom_kill_allocating_task  # 1=kill task triggering OOM first

## Network tuning
cat /proc/sys/net/ipv4/ip_forward     # 1=routing enabled
cat /proc/sys/net/ipv4/tcp_syncookies # SYN-flood protection
cat /proc/sys/net/core/somaxconn      # max listen() backlog
cat /proc/sys/net/core/rmem_max       # max socket receive buffer
cat /proc/sys/net/core/wmem_max       # max socket send buffer

## Writing a tunable (takes effect immediately, lost on reboot)
echo 10 > /proc/sys/vm/swappiness
# Equivalent via sysctl:
sysctl -w vm.swappiness=10`,Ne=`# /sys — sysfs: structured view of kernel device model
# Populated by udev/systemd-udevd from kernel kobjects

## Navigate device hierarchy
ls /sys/devices/                      # physical device tree
ls /sys/bus/                          # buses: pci, usb, platform, i2c, spi
ls /sys/class/                        # device classes: block, net, tty, input
ls /sys/block/                        # block devices (links into /sys/devices/)
ls /sys/module/                       # loaded modules + their parameters

## Read device attributes
cat /sys/block/sda/size               # size in 512-byte sectors
cat /sys/block/sda/queue/scheduler    # I/O scheduler: [mq-deadline] kyber bfq none
cat /sys/block/sda/queue/rotational   # 0 = SSD, 1 = spinning disk
cat /sys/block/sda/queue/nr_requests  # I/O queue depth
cat /sys/block/sda/stat               # I/O statistics

## Change I/O scheduler at runtime
echo mq-deadline > /sys/block/sda/queue/scheduler
echo none > /sys/block/nvme0n1/queue/scheduler   # for NVMe: none is often best

## Network device attributes
cat /sys/class/net/eth0/speed         # link speed in Mbit/s
cat /sys/class/net/eth0/duplex        # half / full
cat /sys/class/net/eth0/operstate     # up / down / unknown
cat /sys/class/net/eth0/statistics/rx_errors
cat /sys/class/net/eth0/statistics/tx_dropped

## CPU topology
cat /sys/devices/system/cpu/cpu0/topology/core_id
cat /sys/devices/system/cpu/cpu0/topology/physical_package_id
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor  # performance|powersave
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq

## Power management
cat /sys/class/power_supply/BAT0/capacity   # battery percentage (laptops)
cat /sys/class/thermal/thermal_zone0/temp   # CPU temperature (millidegrees Celsius)

## udev integration
udevadm info /sys/block/sda           # udev properties for a device
udevadm info -a /sys/block/sda        # full attribute hierarchy
udevadm monitor                       # watch udev events in real time
udevadm trigger                       # re-play add events (reload rules)
udevadm control --reload-rules        # reload udev rules without reboot`,Se=`# ─── Listing modules ───────────────────────────────────────────────────────
lsmod
# Module                  Size  Used by
# xfs                  1564672  1
# libcrc32c              16384  1 xfs
# sr_mod                 28672  0
# cdrom                  69632  1 sr_mod
# e1000                 155648  0

lsmod | grep -i nvidia            # check for a specific module

# ─── Module metadata ────────────────────────────────────────────────────────
modinfo xfs
# filename:       /lib/modules/5.14.0-427.el9.x86_64/kernel/fs/xfs/xfs.ko.xz
# license:        GPL
# description:    SGI XFS with ACLs, security labels, no debug enabled
# alias:          fs-xfs
# depends:        libcrc32c
# retpoline:      Y
# rhelversion:    9.4
# intree:         Y
# vermagic:       5.14.0-427.el9.x86_64 SMP preempt mod_unload modversions

modinfo -p dm_mod                  # show module parameters and their descriptions

# ─── Loading and unloading ──────────────────────────────────────────────────
modprobe dm_mod                    # load with dependencies
modprobe -r dm_mod                 # unload (if not in use)
modprobe --show-depends xfs        # show what would be loaded
modprobe -v vboxdrv                # verbose output during load

rmmod <module>                     # low-level remove (no dep tracking)
insmod /path/to/module.ko          # low-level load from explicit path

# ─── Persistent module loading ──────────────────────────────────────────────
# Files in /etc/modules-load.d/ are processed by systemd-modules-load.service
# at boot time. One module name per line.
cat /etc/modules-load.d/virtio.conf
# virtio_net
# virtio_blk
# virtio_scsi

echo "br_netfilter" > /etc/modules-load.d/k8s.conf

# ─── Blacklisting modules ───────────────────────────────────────────────────
# /etc/modprobe.d/*.conf — options, aliases, blacklists
cat /etc/modprobe.d/blacklist.conf
# blacklist nouveau
# blacklist pcspkr

# install with /bin/false prevents even manual load:
echo "install pcspkr /bin/false" > /etc/modprobe.d/no-pcspkr.conf

# Verify blacklist is active
modprobe -n pcspkr            # -n = dry run; "install /bin/false" means blocked

# ─── Module parameters ──────────────────────────────────────────────────────
# Set parameter at load time:
modprobe e1000 InterruptThrottleRate=3000

# Set parameter persistently:
echo "options e1000 InterruptThrottleRate=3000" > /etc/modprobe.d/e1000.conf

# Read current parameter value:
cat /sys/module/e1000/parameters/InterruptThrottleRate`,Re=`# ─── Reading parameters ────────────────────────────────────────────────────
sysctl kernel.hostname             # read one parameter
sysctl -a                          # read all parameters
sysctl -a --deprecated             # include deprecated parameters
sysctl -a 2>/dev/null | grep vm    # filter by namespace
sysctl net.ipv4.tcp_keepalive_time
# net.ipv4.tcp_keepalive_time = 7200

# ─── Setting parameters (temporary — lost on reboot) ────────────────────────
sysctl -w vm.swappiness=10
sysctl -w net.ipv4.ip_forward=1
sysctl -w kernel.panic=30          # auto-reboot 30s after kernel panic
sysctl -w kernel.panic_on_oops=1   # treat oops as panic (reboot)

# ─── Making parameters permanent ────────────────────────────────────────────
# /etc/sysctl.conf — legacy location (still works)
# /etc/sysctl.d/*.conf — preferred drop-in directory
# /usr/lib/sysctl.d/*.conf — vendor/package defaults (don't edit)
# /run/sysctl.d/*.conf — runtime overrides

# Precedence: /etc/sysctl.d/ > /etc/sysctl.conf > /usr/lib/sysctl.d/
# Last file wins for duplicate keys; files read in lexicographic order

cat /etc/sysctl.d/99-performance.conf
# # Reduce swap tendency
# vm.swappiness = 10
#
# # Enable IP forwarding for routing/k8s
# net.ipv4.ip_forward = 1
#
# # Increase file descriptor limits
# fs.file-max = 2097152
#
# # Kernel panic handling
# kernel.panic = 30
# kernel.panic_on_oops = 1
#
# # Network performance
# net.core.somaxconn = 65535
# net.ipv4.tcp_rmem = 4096 87380 16777216
# net.ipv4.tcp_wmem = 4096 65536 16777216

# Apply immediately without reboot:
sysctl -p /etc/sysctl.d/99-performance.conf
# Or reload all:
sysctl --system

# ─── Key exam parameters to know ────────────────────────────────────────────
# kernel.pid_max          default 32768; increase on busy servers: 4194304
# kernel.dmesg_restrict   1 = non-root cannot read dmesg
# kernel.perf_event_paranoid  1 = default safe; -1 = allow all
# vm.overcommit_memory    0=heuristic, 1=always, 2=strict (OOM-safe DB use)
# vm.drop_caches          echo 3 drops pagecache + slab (safely)
# vm.dirty_ratio          20 = start sync writeback at 20% dirty pages
# net.ipv4.tcp_syncookies 1 = SYN flood protection
# net.ipv6.conf.all.disable_ipv6 = 1  — disable IPv6`,_e=`# ─── Sample kernel Oops output ─────────────────────────────────────────────
# BUG: kernel NULL pointer dereference, address: 0000000000000008
# #PF: supervisor read access in kernel mode
# #PF: error_code(0x0000) - not-present page
# PGD 0 P4D 0
# Oops: 0000 [#1] SMP PTI
# CPU: 3 PID: 8421 Comm: bash Tainted: G           OE     5.14.0-427.el9.x86_64 #1
# Hardware name: VMware, Inc. VMware Virtual Platform/440BX Desktop Reference Platform
# RIP: 0010:bad_module_function+0x14/0x30 [bad_module]
# Code: 48 8b 47 08 48 85 c0 74 0a 48 8b 00 48 89 c7 e8 b3 ff ff ff ...
# RSP: 0018:ffffa4f380de3d48 EFLAGS: 00010246
# RAX: 0000000000000000 RBX: ffff8f1c40f78000 RCX: 0000000000000000
# RDX: 0000000000000000 RSI: 0000000000000000 RDI: 0000000000000000
# ...
# Call Trace:
#  <TASK>
#  do_init_module+0x4d/0x230
#  load_module+0xd3b/0xf40
#  __do_sys_finit_module+0xb6/0x110
#  do_syscall_64+0x5b/0x80
#  entry_SYSCALL_64_after_hwframe+0x6e/0xd8
# RIP: 0033:0x7f9a1b2c3d4e

# ─── Reading a Kernel Oops ───────────────────────────────────────────────────
# 1. "Tainted:" field — kernel state:
#    G = tainted by proprietary module (G = all GPL modules; no G = out-of-tree)
#    E = unsigned module loaded
#    O = out-of-tree (not upstream) module
#    W = taint by warning
#    U = user asked to taint kernel (unreliable core dump)
#
# 2. RIP (64-bit) or EIP (32-bit) — the instruction pointer at crash time
#    Format: segment:function+offset/size [module]
#    bad_module_function+0x14/0x30 [bad_module]
#    Offset 0x14 into a 0x30-byte function in the bad_module.ko module
#
# 3. Call Trace — backtrace of active stack frames (most recent first)
#
# 4. Decode with:
grep "bad_module" /proc/modules    # confirm module is loaded
addr2line -e /path/to/bad_module.ko 0x14    # map offset to source line
# Or use kernel script:
scripts/decode_stacktrace.sh vmlinux < oops.txt`,Ie=`# ─── kdump — capture kernel vmcore on panic ─────────────────────────────────

# 1. Install kdump
dnf install kexec-tools crash kernel-debuginfo

# 2. Reserve crash kernel memory in GRUB
# Add crashkernel=auto (or crashkernel=256M) to kernel command line
vi /etc/default/grub
# GRUB_CMDLINE_LINUX="... crashkernel=auto"
grub2-mkconfig -o /boot/grub2/grub.cfg

# 3. Configure kdump target (default: local /var/crash)
cat /etc/kdump.conf
# path /var/crash
# core_collector makedumpfile -l --message-level 1 -d 31

# Other targets:
# nfs my-nfs-server.example.com:/kdump/saves
# ssh user@crash-server.example.com

# 4. Enable and start
systemctl enable --now kdump
kdumpctl status
# Kdump is operational

# 5. Test (WARNING: forces a crash — only on non-production)
echo 1 > /proc/sysrq-trigger      # manual SysRq
echo c > /proc/sysrq-trigger      # ONLY if kernel.sysrq allows it (unsafe!)

# 6. Analyze the vmcore
ls /var/crash/
# 2024-01-15-14:23:05/vmcore
# 2024-01-15-14:23:05/vmcore-dmesg.txt

crash /usr/lib/debug/lib/modules/$(uname -r)/vmlinux \\
      /var/crash/2024-01-15-14:23:05/vmcore

# Inside crash:
# crash> bt           -- backtrace of crashing process
# crash> ps           -- process list at time of crash
# crash> log          -- kernel message buffer at time of crash
# crash> vm           -- virtual memory info
# crash> files        -- open files of current process
# crash> sys          -- system information
# crash> quit

# kdump sysctl parameters:
sysctl kernel.panic          # 0 = hang on panic (for debugging)
sysctl kernel.panic_on_oops  # 1 = panic (and kdump) on Oops`,Ee=`# ─── Dynamic debugging — zero-overhead tracing ──────────────────────────────

# Enable pr_debug() messages for a specific module/file at runtime
# (no recompile needed — uses jump_label patching)
echo "module xfs +p" > /sys/kernel/debug/dynamic_debug/control
echo "file fs/xfs/xfs_iops.c +p" > /sys/kernel/debug/dynamic_debug/control
# +p = enable print; -p = disable; +f = add function name; +l = add line number

# View all enabled debug points
cat /sys/kernel/debug/dynamic_debug/control | grep "=p"

# ─── kprobes — instrument any kernel instruction ─────────────────────────────
# kprobe: break at function entry/arbitrary address
# kretprobe: intercept function return value
# Used by BPF, SystemTap, ftrace

# Via ftrace (no kernel recompile)
cd /sys/kernel/debug/tracing
echo "p:myprobe tcp_connect" > kprobe_events   # probe tcp_connect entry
echo 1 > events/kprobes/myprobe/enable
cat trace                                       # read trace output
echo 0 > events/kprobes/myprobe/enable         # disable
echo > kprobe_events                            # remove probe

# ─── ftrace — built-in function tracer ──────────────────────────────────────
cat /sys/kernel/debug/tracing/available_tracers
# blk function_graph function nop

echo function_graph > /sys/kernel/debug/tracing/current_tracer
echo tcp_sendmsg > /sys/kernel/debug/tracing/set_graph_function
echo 1 > /sys/kernel/debug/tracing/tracing_on
# ... run workload ...
echo 0 > /sys/kernel/debug/tracing/tracing_on
cat /sys/kernel/debug/tracing/trace | head -50`;function Pe(){return e.jsxs("div",{children:[e.jsx(j,{icon:v,title:"Kernel Diagnostics",subtitle:"Deep dive into the Linux kernel: dmesg, /proc, /sys, kernel modules, sysctl tuning, Oops decoding, and kdump — everything you need for EX342 kernel troubleshooting questions.",tags:["dmesg","/proc","/sys","sysctl","modules","kdump","oops","kprobes"]}),e.jsx(m,{children:"Linux Kernel Architecture"}),e.jsxs("p",{className:"section-body mb-2",children:["The Linux kernel is a monolithic kernel with modular capabilities. User-space programs interact exclusively through the ",e.jsx("span",{className:"code-inline",children:"system call interface"}),". Device drivers can be compiled into the kernel image or loaded dynamically as",e.jsx("span",{className:"code-inline",children:".ko"})," modules."]}),e.jsx(fe,{}),e.jsxs(a,{type:"exam",title:"Architecture Exam Points",children:["The kernel ring buffer (accessed via ",e.jsx("span",{className:"code-inline",children:"dmesg"}),") has limited size — on busy systems early boot messages may be overwritten. Use",e.jsx("span",{className:"code-inline",children:"journalctl -k"})," to access persistent kernel logs from previous boots. Know the difference: dmesg is volatile in RAM; the journal persists to disk."]}),e.jsx(m,{children:"dmesg — Kernel Ring Buffer"}),e.jsxs("p",{className:"section-body mb-2",children:[e.jsx("span",{className:"code-inline",children:"dmesg"})," reads the kernel's circular ring buffer (",e.jsx("span",{className:"code-inline",children:"/dev/kmsg"})," internally). All kernel subsystems write here using ",e.jsx("code",{className:"code-inline",children:"printk()"}),". Size is typically 512 KB but configurable at compile time via ",e.jsx("span",{className:"code-inline",children:"CONFIG_LOG_BUF_SHIFT"}),"."]}),e.jsx(n,{title:"dmesg — basic usage and severity filtering",code:ve}),e.jsx(n,{title:"dmesg severity levels and console log level",code:je}),e.jsxs(a,{type:"tip",title:"Quick triage one-liner",children:[e.jsx("span",{className:"code-inline",children:'dmesg -T | grep -Ei "(error|fail|warn|oom|killed|i/o error|hardware error|mce|edac)"'}),"— covers the most common hardware and software fault indicators in a single pass."]}),e.jsxs(a,{type:"warning",title:"Ring Buffer Wrap-Around",children:["On high-throughput systems the ring buffer can wrap, discarding old messages before you read them. Increase the buffer at boot: add ",e.jsx("span",{className:"code-inline",children:"log_buf_len=16M"}),"to the kernel command line in ",e.jsx("span",{className:"code-inline",children:"/etc/default/grub"}),", then run ",e.jsx("span",{className:"code-inline",children:"grub2-mkconfig"}),"."]}),e.jsx(m,{children:"/proc Filesystem — Kernel Data Structures"}),e.jsxs("p",{className:"section-body mb-2",children:[e.jsx("span",{className:"code-inline",children:"/proc"})," is a pseudo-filesystem (type ",e.jsx("em",{children:"proc"}),") mounted at boot. It exposes kernel data structures as files — reading them calls kernel functions; writing to them changes kernel state. It is the primary diagnostic interface for process inspection, memory, networking, and hardware status."]}),e.jsx(n,{title:"/proc — CPU, memory, process, network, and interrupt info",code:ke}),e.jsx(ge,{children:"/proc/sys — Kernel Tunables via sysctl"}),e.jsxs("p",{className:"section-body mb-2",children:["The ",e.jsx("span",{className:"code-inline",children:"/proc/sys/"})," subtree maps one-to-one onto sysctl namespaces. Writing to these files changes kernel behavior immediately (no reboot). Use dots vs. slashes: ",e.jsx("span",{className:"code-inline",children:"vm.swappiness"})," maps to",e.jsx("span",{className:"code-inline",children:"/proc/sys/vm/swappiness"}),"."]}),e.jsx(n,{title:"/proc/sys — important tunables",code:we}),e.jsx(a,{type:"exam",title:"/proc Exam Essentials",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"/proc/meminfo"}),' — MemAvailable is the field that matters for "how much memory can be used without swapping"']}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"/proc/[pid]/fd/"}),' — shows open file descriptors; useful for "what files does this process have open"']}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"/proc/[pid]/limits"})," — current ulimits; compare with ",e.jsx("span",{className:"code-inline",children:"ulimit -a"})]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"/proc/sys/vm/drop_caches"})," — write 3 to free page cache + slab (safe, no data loss)"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"/proc/sys/kernel/panic_on_oops"})," — set to 1 on production to get kdump on any Oops"]})]})}),e.jsx(m,{children:"/sys Filesystem — sysfs and Device Model"}),e.jsxs("p",{className:"section-body mb-2",children:[e.jsx("span",{className:"code-inline",children:"/sys"})," (sysfs) was introduced to move device-specific information out of ",e.jsx("span",{className:"code-inline",children:"/proc"}),". It reflects the kernel's internal kobject hierarchy — every bus, device, driver, and module is represented.",e.jsx("span",{className:"code-inline",children:"udev"})," (now part of systemd) watches sysfs events to create/remove device nodes in ",e.jsx("span",{className:"code-inline",children:"/dev"}),"."]}),e.jsx(n,{title:"sysfs — device attributes, I/O scheduler, udev",code:Ne}),e.jsxs(a,{type:"tip",title:"I/O Scheduler Tuning",children:["For NVMe SSDs: set scheduler to ",e.jsx("span",{className:"code-inline",children:"none"}),". For SATA SSDs:",e.jsx("span",{className:"code-inline",children:"mq-deadline"}),". For HDDs:",e.jsx("span",{className:"code-inline",children:"bfq"})," (good for desktops) or",e.jsx("span",{className:"code-inline",children:"mq-deadline"})," (servers). Persistent tuning via udev rule:",e.jsxs("span",{className:"code-inline",children:['ACTION=="add", SUBSYSTEM=="block", KERNEL=="nvme*", ATTR',"{","queue/scheduler","}",' ="none"']}),"in ",e.jsx("span",{className:"code-inline",children:"/etc/udev/rules.d/60-io-scheduler.rules"}),"."]}),e.jsx(m,{children:"Kernel Modules"}),e.jsxs("p",{className:"section-body mb-2",children:["Kernel modules (",e.jsx("span",{className:"code-inline",children:".ko"})," files) extend the kernel at runtime without rebooting. They live in",e.jsx("span",{className:"code-inline",children:"/lib/modules/$(uname -r)/"}),". The",e.jsx("span",{className:"code-inline",children:"depmod"})," utility builds",e.jsx("span",{className:"code-inline",children:"modules.dep"})," which ",e.jsx("span",{className:"code-inline",children:"modprobe"}),"uses to resolve dependencies automatically."]}),e.jsx(n,{title:"Kernel module management — lsmod, modprobe, blacklisting",code:Se}),e.jsx(a,{type:"exam",title:"Module Exam Tips",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:["Blacklisting with ",e.jsx("span",{className:"code-inline",children:"blacklist"})," prevents auto-loading; use ",e.jsx("span",{className:"code-inline",children:"install module /bin/false"})," to block manual load too"]}),e.jsxs("li",{children:[e.jsx("span",{className:"code-inline",children:"modprobe -r"})," removes a module AND unused dependencies; ",e.jsx("span",{className:"code-inline",children:"rmmod"})," removes only the named module"]}),e.jsxs("li",{children:["Modules loaded via ",e.jsx("span",{className:"code-inline",children:"/etc/modules-load.d/"})," are loaded by ",e.jsx("span",{className:"code-inline",children:"systemd-modules-load.service"})," — check with ",e.jsx("span",{className:"code-inline",children:"systemctl status systemd-modules-load"})]}),e.jsxs("li",{children:["Signing enforcement: ",e.jsx("span",{className:"code-inline",children:"CONFIG_MODULE_SIG_FORCE"})," — on secure boot systems, unsigned modules will refuse to load"]})]})}),e.jsx(m,{children:"sysctl — Kernel Parameter Tuning"}),e.jsxs("p",{className:"section-body mb-2",children:["sysctl provides a stable interface for reading and writing kernel parameters. Files in",e.jsx("span",{className:"code-inline",children:"/etc/sysctl.d/"})," are processed at boot in alphabetical order; higher-numbered files (e.g. ",e.jsx("span",{className:"code-inline",children:"99-custom.conf"}),") override lower-numbered ones. Changes via ",e.jsx("span",{className:"code-inline",children:"sysctl -w"}),"are immediate but volatile."]}),e.jsx(n,{title:"sysctl — reading, writing, persistent configuration",code:Re}),e.jsxs(a,{type:"warning",title:"sysctl -p vs --system",children:[e.jsx("span",{className:"code-inline",children:"sysctl -p"})," without arguments only loads",e.jsx("span",{className:"code-inline",children:"/etc/sysctl.conf"})," — it does NOT read",e.jsx("span",{className:"code-inline",children:"/etc/sysctl.d/"}),". Use",e.jsx("span",{className:"code-inline",children:"sysctl --system"})," to load ALL configuration files in the correct precedence order."]}),e.jsx(a,{type:"exam",title:"Critical sysctl Parameters for the Exam",children:e.jsxs("div",{className:"space-y-1",children:[e.jsxs("div",{children:[e.jsx("span",{className:"code-inline",children:"kernel.panic=30"})," — reboot 30s after panic (0=hang forever)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"code-inline",children:"kernel.panic_on_oops=1"})," — treat any Oops as a panic (enables kdump capture)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"code-inline",children:"vm.swappiness=10"})," — reduces swap activity; 0 means swap only when out of memory"]}),e.jsxs("div",{children:[e.jsx("span",{className:"code-inline",children:"vm.overcommit_memory=2"})," — strict mode; OOM less likely; used for databases"]}),e.jsxs("div",{children:[e.jsx("span",{className:"code-inline",children:"net.ipv4.ip_forward=1"})," — enables IP routing (required for NAT/routing)"]}),e.jsxs("div",{children:[e.jsx("span",{className:"code-inline",children:"net.ipv4.tcp_syncookies=1"})," — SYN-flood mitigation"]})]})}),e.jsx(m,{children:"Kernel Oops and Panics"}),e.jsxs("p",{className:"section-body mb-2",children:["A ",e.jsx("strong",{className:"text-gray-200",children:"Kernel Oops"})," is a non-fatal error detected by the kernel (null pointer dereference, bad memory access in kernel context). The kernel prints diagnostics and may continue. A ",e.jsx("strong",{className:"text-gray-200",children:"Kernel Panic"})," is fatal — the kernel cannot safely continue and halts (or reboots if",e.jsx("span",{className:"code-inline",children:"kernel.panic"})," > 0)."]}),e.jsx(n,{title:"Kernel Oops — reading and decoding",code:_e}),e.jsx(n,{title:"kdump setup — capture vmcore for post-mortem analysis",code:Ie}),e.jsxs(a,{type:"danger",title:"Production Systems — Oops vs Panic",children:["On production systems set ",e.jsx("span",{className:"code-inline",children:"kernel.panic_on_oops=1"})," and",e.jsx("span",{className:"code-inline",children:"kernel.panic=30"}),". This ensures: (1) a vmcore is captured by kdump, (2) the system reboots automatically within 30 seconds. Without this, an Oops may leave the system in a degraded but running state, masking data corruption."]}),e.jsx(a,{type:"exam",title:"kdump Exam Requirements",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:["Requires ",e.jsx("span",{className:"code-inline",children:"crashkernel=auto"})," (or explicit size like ",e.jsx("span",{className:"code-inline",children:"256M"}),") in the kernel command line — must reboot after adding"]}),e.jsxs("li",{children:["Package: ",e.jsx("span",{className:"code-inline",children:"kexec-tools"}),"; analysis: ",e.jsx("span",{className:"code-inline",children:"crash"})," + ",e.jsx("span",{className:"code-inline",children:"kernel-debuginfo"})]}),e.jsxs("li",{children:["vmcore stored in ",e.jsx("span",{className:"code-inline",children:"/var/crash/"})," by default"]}),e.jsxs("li",{children:["Check readiness: ",e.jsx("span",{className:"code-inline",children:"kdumpctl status"}),' must say "operational"']}),e.jsxs("li",{children:["The ",e.jsx("span",{className:"code-inline",children:"crash"})," tool commands: ",e.jsx("span",{className:"code-inline",children:"bt"}),", ",e.jsx("span",{className:"code-inline",children:"log"}),", ",e.jsx("span",{className:"code-inline",children:"ps"}),", ",e.jsx("span",{className:"code-inline",children:"vm"})]})]})}),e.jsx(m,{children:"kprobes and Dynamic Debugging"}),e.jsxs("p",{className:"section-body mb-2",children:["Dynamic debug allows enabling ",e.jsx("span",{className:"code-inline",children:"pr_debug()"})," /",e.jsx("span",{className:"code-inline",children:"dev_dbg()"})," messages without recompiling the kernel. kprobes insert breakpoints at any kernel instruction at runtime, enabling tracing tools like BPF, SystemTap, and ftrace."]}),e.jsx(n,{title:"Dynamic debug, kprobes, and ftrace",code:Ee}),e.jsxs(a,{type:"info",title:"BPF and the Modern Tracing Stack",children:["For EX342, focus on ",e.jsx("span",{className:"code-inline",children:"dmesg"}),", ",e.jsx("span",{className:"code-inline",children:"ftrace"}),", and ",e.jsx("span",{className:"code-inline",children:"perf"}),". BPF tools (bpftrace, BCC/bpfcc-tools) are increasingly common on RHEL 9 but are more relevant to advanced performance analysis than exam scenarios. Know that ",e.jsx("span",{className:"code-inline",children:"perf record / perf report"}),"captures CPU performance events."]}),e.jsx(m,{children:"Kernel Crash Investigation Workflow"}),e.jsx(b,{title:"Kernel Crash Investigation Workflow",steps:xe}),e.jsx(m,{children:"Kernel Diagnostics Command Reference"}),e.jsx(L,{title:"All Kernel Diagnostic Commands",rows:ye}),e.jsx(a,{type:"exam",title:"Final Exam Checklist — Kernel",children:e.jsxs("ul",{className:"list-disc pl-4 space-y-1",children:[e.jsxs("li",{children:["Know ",e.jsx("span",{className:"code-inline",children:"dmesg -l err,warn"})," and ",e.jsx("span",{className:"code-inline",children:"journalctl -k -b -1"})," for post-reboot analysis"]}),e.jsxs("li",{children:["Navigate ",e.jsx("span",{className:"code-inline",children:"/proc/sys/"})," and map to ",e.jsx("span",{className:"code-inline",children:"sysctl"})," dot-notation"]}),e.jsxs("li",{children:["Make sysctl changes permanent via ",e.jsx("span",{className:"code-inline",children:"/etc/sysctl.d/"})," and apply with ",e.jsx("span",{className:"code-inline",children:"sysctl --system"})]}),e.jsxs("li",{children:["Blacklist modules with ",e.jsx("span",{className:"code-inline",children:"/etc/modprobe.d/"}),"; auto-load with ",e.jsx("span",{className:"code-inline",children:"/etc/modules-load.d/"})]}),e.jsxs("li",{children:["kdump: ",e.jsx("span",{className:"code-inline",children:"crashkernel=auto"}),", ",e.jsx("span",{className:"code-inline",children:"kexec-tools"}),", ",e.jsx("span",{className:"code-inline",children:"kdumpctl status"}),", vmcore in ",e.jsx("span",{className:"code-inline",children:"/var/crash/"})]}),e.jsx("li",{children:"Taint flags in Oops output: G/E/O/W indicate module trustworthiness"})]})})]})}export{Ue as B,n as C,b as F,ce as H,a as I,Pe as K,j as P,L as a,Le as b,e as j};
