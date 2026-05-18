import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Participante } from '../models/Participante'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

interface ContextType {
  participantes: Participante[]
  agregar: (p: Participante) => Promise<void>
  eliminar: (id: number) => Promise<void>
  resetear: () => Promise<void>
}

const ParticipantesContext = createContext<ContextType | undefined>(undefined)

const jsonHeaders = {
  'Content-Type': 'application/json',
}

// Lee JSON y levanta error si el status no es OK.
const handleJsonResponse = async <T,>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Error de servidor')
  }
  return (await response.json()) as T
}

// Provider que carga participantes y expone CRUD via context.
export function ParticipantesProvider({ children }: { children: React.ReactNode }) {
  const [participantes, setParticipantes] = useState<Participante[]>([])

  // Carga inicial desde la API.
  useEffect(() => {
    const cargar = async () => {
      try {
        const response = await fetch(`${API_BASE}/participantes`)
        const data = await handleJsonResponse<Participante[]>(response)
        setParticipantes(data)
      } catch {
        setParticipantes([])
      }
    }

    void cargar()
  }, [])

  // Crea participante en backend y actualiza el estado local.
  const agregar = useCallback(async (nuevo: Participante) => {
    const response = await fetch(`${API_BASE}/participantes`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(nuevo),
    })
    const creado = await handleJsonResponse<Participante>(response)
    setParticipantes((prev) => [creado, ...prev])
  }, [])

  // Elimina participante por id en backend y estado local.
  const eliminar = useCallback(async (id: number) => {
    const response = await fetch(`${API_BASE}/participantes/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok && response.status !== 204) {
      const message = await response.text()
      throw new Error(message || 'Error al eliminar')
    }

    setParticipantes((prev) => prev.filter((p) => p.id !== id))
  }, [])

  // Borra todos los participantes en backend y limpia el estado.
  const resetear = useCallback(async () => {
    const response = await fetch(`${API_BASE}/participantes`, {
      method: 'DELETE',
    })

    if (!response.ok && response.status !== 204) {
      const message = await response.text()
      throw new Error(message || 'Error al resetear')
    }

    setParticipantes([])
  }, [])

  const value = useMemo(
    () => ({ participantes, agregar, eliminar, resetear }),
    [participantes, agregar, eliminar, resetear],
  )

  return (
    <ParticipantesContext.Provider value={value}>
      {children}
    </ParticipantesContext.Provider>
  )
}

// Hook para consumir el contexto de participantes.
export function useParticipantes() {
  const context = useContext(ParticipantesContext)
  if (!context) {
    throw new Error('useParticipantes debe usarse dentro de ParticipantesProvider')
  }
  return context
}
