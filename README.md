# EX342 Visual Guide — Red Hat Linux Diagnostics & Troubleshooting

> An interactive, visually-rich exam prep guide for the **Red Hat Certified Specialist in Linux Diagnostics and Troubleshooting (EX342)** exam, built with React and deployed to GitHub Pages.

**Live site:** [https://prashanthgl.github.io/ex442-visual-guide/](https://prashanthgl.github.io/ex442-visual-guide/)

---

## What's Inside

11 in-depth chapters covering every EX342 exam domain:

| Chapter | Topics |
|---|---|
| Boot Process | GRUB2, initramfs, systemd targets, `rd.break` recovery, boot failures |
| Kernel Diagnostics | `dmesg`, `/proc`, `/sys`, sysctl, modules, kernel Oops/kdump |
| Storage | LVM, RAID (mdadm), fsck/xfs_repair, SMART, blktrace, inode exhaustion |
| Memory | OOM killer, vmstat, huge pages, NUMA, slab cache |
| CPU & Performance | CFS scheduler, `perf`, cgroups v2, CPU affinity, PCP |
| Networking | `ip`/`ss`/`tcpdump`/`firewalld`, DNS, bonding, network namespaces |
| System Logging | journald, rsyslog, auditd, `ausearch`/`aureport` |
| SELinux | AVC denials, contexts, booleans, port labeling, `audit2allow` modules |
| Process Management | Signals, zombies, ulimits, cgroups v2, systemd units, core dumps |
| App Diagnostics | `strace`, `lsof`, GDB, `/proc/pid`, bpftrace, sosreport |
| Hardware | `lspci`, udev rules, dmidecode, SMART attributes, IPMI, IRQ affinity |

Each chapter includes:
- Visual flow diagrams for investigation workflows
- Syntax-highlighted code examples you can copy
- Command reference tables
- Exam-specific tips and common pitfalls

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Vite](https://vitejs.dev/) | Build tool — fast dev server and optimised production builds |
| [React 18](https://react.dev/) | UI framework — component-based, declarative |
| [React Router v6](https://reactrouter.com/) | Client-side routing between chapters |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first CSS — no separate stylesheet files needed |
| [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) | Code blocks with language-aware highlighting |
| [lucide-react](https://lucide.dev/) | Icon set |
| [gh-pages](https://github.com/tschaub/gh-pages) | Deploys the `dist/` build to the `gh-pages` branch on GitHub |

---

## Local Development

```bash
# 1. Clone the repo
git clone https://github.com/prashanthgl/ex442-visual-guide.git
cd ex442-visual-guide

# 2. Install dependencies
npm install

# 3. Start dev server (hot-reloads on every save)
npm run dev
```

Open [http://localhost:5173/ex442-visual-guide/](http://localhost:5173/ex442-visual-guide/) in your browser.

---

## Deploying to GitHub Pages

This project deploys using the `gh-pages` npm package. It builds the app and
pushes the compiled output to the `gh-pages` branch of this repo — GitHub Pages
then serves that branch automatically.

```bash
npm run deploy
```

That single command:
1. Runs `npm run build` (via the `predeploy` hook in `package.json`)
2. Pushes the `dist/` folder to the `gh-pages` branch on GitHub
3. GitHub Pages publishes it at `https://prashanthgl.github.io/ex442-visual-guide/`

> **First-time setup only:** Go to your repo → **Settings → Pages → Source** → select
> **`gh-pages` branch** and save. After that, every `npm run deploy` updates the site
> automatically — no settings changes needed.

---

## Project Structure

```
ex442-visual-guide/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx            # React entry point — mounts app to index.html
│   ├── App.jsx             # Route definitions (React Router)
│   ├── index.css           # Tailwind directives + global styles
│   │
│   ├── components/         # Reusable UI building blocks
│   │   ├── Layout.jsx      # Sidebar + main content shell (shared by all pages)
│   │   ├── Sidebar.jsx     # Navigation links
│   │   ├── CodeBlock.jsx   # Syntax-highlighted code with copy button
│   │   ├── InfoBox.jsx     # Coloured callout boxes (tip / warning / exam)
│   │   ├── FlowDiagram.jsx # Vertical & horizontal step diagrams
│   │   ├── CommandTable.jsx # Command reference tables
│   │   └── PageHeader.jsx  # Page title / subtitle / tag pills
│   │
│   └── pages/              # One file per exam chapter
│       ├── Home.jsx
│       ├── BootProcess.jsx
│       ├── KernelDiagnostics.jsx
│       ├── StorageDiagnostics.jsx
│       ├── MemoryDiagnostics.jsx
│       ├── CPUPerformance.jsx
│       ├── NetworkDiagnostics.jsx
│       ├── SystemLogging.jsx
│       ├── SELinux.jsx
│       ├── ProcessManagement.jsx
│       ├── AppDiagnostics.jsx
│       └── HardwareDiagnostics.jsx
│
├── index.html              # Single HTML entry point (Vite injects the JS bundle here)
├── vite.config.js          # Vite config — sets base path for GitHub Pages
├── tailwind.config.js      # Tailwind theme (Red Hat colour palette)
├── postcss.config.js       # PostCSS pipeline required by Tailwind
└── package.json            # Scripts: dev / build / deploy
```

### Key React Concepts Used

| Concept | Where you'll see it |
|---|---|
| **Components** | Every `.jsx` file — functions that return UI |
| **Props** | `<CodeBlock code="..." language="bash" />` — data passed into components |
| **HashRouter** | `App.jsx` — URL routing without a server (`/#/boot`, `/#/selinux`, …) |
| **`<Outlet />`** | `Layout.jsx` — renders the currently matched child route |
| **`useState`** | `Layout.jsx` — mobile sidebar open/close toggle |
| **`NavLink`** | `Sidebar.jsx` — link that adds an `isActive` class when selected |

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `localhost:5173` |
| `npm run build` | Build production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and push to GitHub Pages (`gh-pages` branch) |

---

## Exam Resources

- [Red Hat EX342 Exam Objectives](https://www.redhat.com/en/services/training/ex342-red-hat-certificate-expertise-linux-diagnostics-and-troubleshooting)
- [RHEL 9 Documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9)
- [Red Hat Customer Portal](https://access.redhat.com/)
