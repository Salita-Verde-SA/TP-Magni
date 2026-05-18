import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useParticipantes } from './context/ParticipantesContext'
import { ListaPage } from './pages/ListaPage'
import { FormularioPage } from './pages/FormularioPage'
import { EditarPage } from './pages/EditarPage'

function App() {
  const { resetear } = useParticipantes()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()


  const handleCloseMenu = () => setMenuOpen(false)

  return (
    <main className="min-h-screen bg-[#ececec]">

      <nav className="bg-emerald-500 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-semibold text-2xl tracking-tight" onClick={handleCloseMenu}>
            RegistroApp
          </Link>


          <button
            className="md:hidden p-2 text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>


          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className={`hover:text-emerald-200 transition ${location.pathname === '/' ? 'font-bold' : ''}`}>Lista</Link>
            <Link to="/nuevo" className={`hover:text-emerald-200 transition ${location.pathname === '/nuevo' ? 'font-bold' : ''}`}>Nuevo</Link>
            <button
              onClick={() => void resetear()}
              className="text-sm font-normal px-3 py-1.5 rounded-sm bg-white/20 hover:bg-white/30 transition ml-2"
            >
              Resetear datos
            </button>
          </div>
        </div>


        {menuOpen && (
          <div className="md:hidden bg-emerald-600 px-4 pb-4 pt-2 space-y-2 shadow-inner">
            <Link to="/" onClick={handleCloseMenu} className="block py-2 hover:bg-emerald-700 px-2 rounded">Lista</Link>
            <Link to="/nuevo" onClick={handleCloseMenu} className="block py-2 hover:bg-emerald-700 px-2 rounded">Nuevo</Link>
            <button
              onClick={() => {
                void resetear()
                handleCloseMenu()
              }}
              className="block w-full text-left py-2 hover:bg-emerald-700 px-2 rounded text-red-100"
            >
              Resetear datos
            </button>
          </div>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<ListaPage />} />
          <Route path="/nuevo" element={<FormularioPage />} />
          <Route path="/editar/:id" element={<EditarPage />} />
        </Routes>
      </div>
    </main>
  )
}

export default App
