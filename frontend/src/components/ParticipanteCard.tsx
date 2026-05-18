import { useNavigate } from 'react-router-dom'
import type { Participante, Nivel } from '../models/Participante'
import { useParticipantes } from '../context/ParticipantesContext'

const colorFondoTarjeta = (nivel: Nivel): string => {
  if (nivel === 'Principiante') return 'bg-emerald-100'
  if (nivel === 'Intermedio') return 'bg-yellow-100'
  return 'bg-rose-100'
}

const colorTextoNivel = (nivel: Nivel): string => {
  if (nivel === 'Principiante') return 'text-emerald-700'
  if (nivel === 'Intermedio') return 'text-amber-700'
  return 'text-rose-600'
}

interface ParticipanteCardProps {
  participante: Participante
}

export function ParticipanteCard({ participante }: ParticipanteCardProps) {
  const { eliminar } = useParticipantes()
  const navigate = useNavigate()

  return (
    <article
      className={`rounded-sm p-4 border border-slate-200 ${colorFondoTarjeta(participante.nivel)}`}
    >
      <h3 className="text-lg font-semibold mb-1">{participante.nombre}</h3>
      <p className="text-sm text-slate-500 mb-1">{participante.email}</p>
      <p className="mb-2">{participante.pais}</p>
      <p className="text-sm mb-1">
        <span className="font-medium">Modalidad:</span> {participante.modalidad}
      </p>
      <p className="text-sm mb-3">
        <span className={`font-semibold ${colorTextoNivel(participante.nivel)}`}>
          Nivel: {participante.nivel}
        </span>
      </p>
      <p className="text-sm mb-3">
        {participante.tecnologias.length > 0
          ? participante.tecnologias.join(', ')
          : 'Sin tecnologias cargadas'}
      </p>
      <div className="flex items-center justify-start gap-2">
        <button
          onClick={() => navigate(`/editar/${participante.id}`)}
          className="text-sm px-3 py-1 rounded-sm bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => void eliminar(participante.id)}
          className="text-sm px-3 py-1 rounded-sm bg-red-500 text-white hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}
