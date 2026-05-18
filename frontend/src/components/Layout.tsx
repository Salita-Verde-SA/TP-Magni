import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen bg-slate-100">
      <nav className="bg-emerald-500 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/menu_inicio" className="font-semibold text-2xl tracking-tight">
            RegistroApp
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:inline">
              {user?.username} ({user?.rol})
            </span>
            <button
              onClick={logout}
              className="text-sm px-3 py-1.5 rounded-sm bg-red-500 hover:bg-red-600 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
    </main>
  )
}
