import { createContext, useContext, useState, useMemo, useCallback } from 'react'

export type Rol = 'ADMIN' | 'CONSULTA'

export interface Usuario {
  username: string
  rol: Rol
}

interface AuthContextType {
  user: Usuario | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE = import.meta.env.VITE_API_URL ?? ''

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    try {
      const stored = localStorage.getItem('user')
      return stored ? (JSON.parse(stored) as Usuario) : null
    } catch {
      return null
    }
  })

  const login = useCallback(async (username: string, password: string) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      const msg = await response.text()
      throw new Error(msg || 'Credenciales inválidas')
    }

    const data = (await response.json()) as { token: string; usuario: Usuario }
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.usuario))
    setUser(data.usuario)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}
