// main.jsx — The very first file React looks at.
// ReactDOM.createRoot() attaches our React component tree to the <div id="root"> in index.html.
// StrictMode helps catch bugs by rendering components twice in development.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
