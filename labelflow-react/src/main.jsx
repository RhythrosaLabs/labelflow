import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './labelflow.css'
import './integrated_styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
