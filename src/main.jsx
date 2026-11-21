import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// الخطوط — مستضافة محلياً لسرعة التحميل
import '@fontsource/ibm-plex-sans-arabic/300.css'
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/600.css'
import '@fontsource/amiri/400.css'
import '@fontsource/amiri/700.css'
import '@fontsource/aref-ruqaa/400.css'
import '@fontsource/aref-ruqaa/700.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
