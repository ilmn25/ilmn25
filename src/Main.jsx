import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Main.css'
import './Desktop.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Desktop from './Desktop.jsx'
import Files from './Files.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/desktop" element={<Desktop />} />
        <Route path="/files" element={<Files />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
