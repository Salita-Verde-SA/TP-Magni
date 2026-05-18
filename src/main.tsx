import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ParticipantesProvider } from './context/ParticipantesContext'

// Punto de entrada de React.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ParticipantesProvider>
      <App />
    </ParticipantesProvider>
  </StrictMode>,
)
