import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ex442-visual-guide/',
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui':     ['lucide-react'],
          'vendor-syntax': ['react-syntax-highlighter'],
          'pages-core':    [
            './src/pages/Home',
            './src/pages/BootProcess',
            './src/pages/KernelDiagnostics',
          ],
          'pages-storage': [
            './src/pages/StorageDiagnostics',
            './src/pages/MemoryDiagnostics',
            './src/pages/CPUPerformance',
          ],
          'pages-net-log': [
            './src/pages/NetworkDiagnostics',
            './src/pages/SystemLogging',
            './src/pages/SELinux',
          ],
          'pages-proc-hw': [
            './src/pages/ProcessManagement',
            './src/pages/AppDiagnostics',
            './src/pages/HardwareDiagnostics',
          ],
        },
      },
    },
  },
})
