import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
      navigate('/menu_inicio')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-slate-800 mb-10 text-center px-4">
        Iniciar Sesión - Registro de Participantes
      </h1>
      <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-3 w-72">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-full border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-full border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2.5 rounded-sm hover:bg-blue-700 transition mt-1"
        >
          Login
        </button>
      </form>
    </main>
  )
}
