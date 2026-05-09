// App.jsx — defines URL routes and wraps everything in a Layout.
// HashRouter is used instead of BrowserRouter because GitHub Pages doesn't
// support server-side routing — the hash (#) keeps routing in the browser.
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

import Home               from './pages/Home'
import BootProcess        from './pages/BootProcess'
import KernelDiagnostics  from './pages/KernelDiagnostics'
import StorageDiagnostics from './pages/StorageDiagnostics'
import MemoryDiagnostics  from './pages/MemoryDiagnostics'
import CPUPerformance     from './pages/CPUPerformance'
import NetworkDiagnostics from './pages/NetworkDiagnostics'
import SystemLogging      from './pages/SystemLogging'
import SELinux            from './pages/SELinux'
import ProcessManagement  from './pages/ProcessManagement'
import AppDiagnostics     from './pages/AppDiagnostics'
import HardwareDiagnostics from './pages/HardwareDiagnostics'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index             element={<Home />} />
          <Route path="boot"       element={<BootProcess />} />
          <Route path="kernel"     element={<KernelDiagnostics />} />
          <Route path="storage"    element={<StorageDiagnostics />} />
          <Route path="memory"     element={<MemoryDiagnostics />} />
          <Route path="cpu"        element={<CPUPerformance />} />
          <Route path="network"    element={<NetworkDiagnostics />} />
          <Route path="logging"    element={<SystemLogging />} />
          <Route path="selinux"    element={<SELinux />} />
          <Route path="process"    element={<ProcessManagement />} />
          <Route path="appdebug"   element={<AppDiagnostics />} />
          <Route path="hardware"   element={<HardwareDiagnostics />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
