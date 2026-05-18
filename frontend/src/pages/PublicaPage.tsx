import { Link } from 'react-router-dom'

export function PublicaPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold text-slate-800">Página Pública</h1>
      <p className="text-slate-600">Esta página es accesible sin autenticación.</p>
      <Link to="/login" className="text-blue-600 hover:underline">
        Ir al Login
      </Link>
    </main>
  )
}
