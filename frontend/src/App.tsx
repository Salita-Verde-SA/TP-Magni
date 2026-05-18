import { Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

function App() {
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Paginas / Menú</h2>

      <Link
        to="/lista"
        className="bg-blue-600 text-white font-bold px-12 py-4 rounded-sm hover:bg-blue-700 transition text-lg w-72 text-center"
      >
        Lista de Participantes
      </Link>

      {user?.rol === 'ADMIN' && (
        <Link
          to="/nuevo"
          className="bg-blue-600 text-white font-bold px-12 py-4 rounded-sm hover:bg-blue-700 transition text-lg w-72 text-center"
        >
          Nuevo participante
        </Link>
      )}

      <button
        onClick={logout}
        className="bg-red-500 text-white font-bold px-12 py-4 rounded-sm hover:bg-red-600 transition text-lg w-72"
      >
        Cerrar sesión
      </button>
    </main>
  )
}

export default App
