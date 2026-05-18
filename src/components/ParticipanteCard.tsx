import { colorFondoTarjeta, colorTextoNivel ,type Participante } from '../models/Participante'

interface ParticipanteCardProps {
  participante: Participante
  onEliminar: (id: number) => void
}

export default function ParticipanteCard({ participante, onEliminar }: ParticipanteCardProps) {
  return (
    <article
      className={`rounded-sm p-4 border border-slate-200 ${colorFondoTarjeta(participante.nivel)}`}
    >
      <h3 className="text-lg font-semibold mb-1">
        {participante.nombre}
      </h3>
      <p className="mb-2">{participante.pais}</p>
      <p className="text-sm mb-1">
        <span className="font-medium">Modalidad:</span>{' '}
        {participante.modalidad}
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
      <div className="flex items-center justify-start">
        <button
          onClick={() => onEliminar(participante.id)}
          className="text-sm px-3 py-1 rounded-sm bg-red-500 text-white hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}