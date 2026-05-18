import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import type { Participante } from '../models/Participante'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export type Action =
  | { type: 'GET_PARTICIPANTES'; payload: Participante[] }
  | { type: 'AGREGAR'; payload: Participante }
  | { type: 'ELIMINAR'; payload: number }
  | { type: 'RESET'; payload: Participante[] }
  | { type: 'EDITAR'; payload: Participante }
  | { type: 'SET'; payload: Participante[] }

function participantesReducer(state: Participante[], action: Action): Participante[] {
  switch (action.type) {
    case 'GET_PARTICIPANTES':
    case 'SET':
      return action.payload
    case 'AGREGAR':
      return [action.payload, ...state]
    case 'ELIMINAR':
      return state.filter((p) => p.id !== action.payload)
    case 'RESET':
      return action.payload
    case 'EDITAR':
      return state.map((p) => (p.id === action.payload.id ? action.payload : p))
    default:
      return state
  }
}

interface ContextType {
  participantes: Participante[]
  participanteEnEdicion: Participante | null
  agregar: (p: Participante) => Promise<void>
  editar: (p: Participante) => Promise<void>
  eliminar: (id: number) => Promise<void>
  resetear: () => Promise<void>
  seleccionarParaEdicion: (p: Participante) => void
  cancelarEdicion: () => void
}

const ParticipantesContext = createContext<ContextType | undefined>(undefined)

const jsonHeaders = {
  'Content-Type': 'application/json',
}

const handleJsonResponse = async <T,>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Error de servidor')
  }
  return (await response.json()) as T
}

export function ParticipantesProvider({ children }: { children: React.ReactNode }) {
  const [participantes, dispatch] = useReducer(participantesReducer, [])
  const [participanteEnEdicion, setParticipanteEnEdicion] = useState<Participante | null>(null)

  useEffect(() => {
    const cargar = async () => {
      try {
        const response = await fetch(`${API_BASE}/participantes`)
        const data = await handleJsonResponse<Participante[]>(response)
        dispatch({ type: 'GET_PARTICIPANTES', payload: data })
      } catch {
        dispatch({ type: 'SET', payload: [] })
      }
    }

    void cargar()
  }, [])

  const agregar = useCallback(async (nuevo: Participante) => {
    const response = await fetch(`${API_BASE}/participantes`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(nuevo),
    })
    const creado = await handleJsonResponse<Participante>(response)
    dispatch({ type: 'AGREGAR', payload: creado })
  }, [])

  const editar = useCallback(async (modificado: Participante) => {
    const response = await fetch(`${API_BASE}/participantes/${modificado.id}`, {
      method: 'PUT',
      headers: jsonHeaders,
      body: JSON.stringify(modificado),
    })
    const actualizado = await handleJsonResponse<Participante>(response)
    dispatch({ type: 'EDITAR', payload: actualizado })
    setParticipanteEnEdicion(null)
  }, [])

  const eliminar = useCallback(async (id: number) => {
    const response = await fetch(`${API_BASE}/participantes/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok && response.status !== 204) {
      const message = await response.text()
      throw new Error(message || 'Error al eliminar')
    }

    dispatch({ type: 'ELIMINAR', payload: id })
  }, [])

  const resetear = useCallback(async () => {
    const response = await fetch(`${API_BASE}/participantes`, {
      method: 'DELETE',
    })

    if (!response.ok && response.status !== 204) {
      const message = await response.text()
      throw new Error(message || 'Error al resetear')
    }

    dispatch({ type: 'RESET', payload: [] })
  }, [])

  const seleccionarParaEdicion = useCallback((p: Participante) => setParticipanteEnEdicion(p), [])
  const cancelarEdicion = useCallback(() => setParticipanteEnEdicion(null), [])

  const value = useMemo(
    () => ({
      participantes,
      participanteEnEdicion,
      agregar,
      editar,
      eliminar,
      resetear,
      seleccionarParaEdicion,
      cancelarEdicion,
    }),
    [
      participantes,
      participanteEnEdicion,
      agregar,
      editar,
      eliminar,
      resetear,
      seleccionarParaEdicion,
      cancelarEdicion,
    ],
  )

  return (
    <ParticipantesContext.Provider value={value}>
      {children}
    </ParticipantesContext.Provider>
  )
}

export function useParticipantes() {
  const context = useContext(ParticipantesContext)
  if (!context) {
    throw new Error('useParticipantes debe usarse dentro de ParticipantesProvider')
  }
  return context
}
