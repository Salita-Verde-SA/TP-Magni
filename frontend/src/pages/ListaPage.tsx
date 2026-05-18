import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Filtros, FILTROS_INICIALES } from '../components/Filtros'
import type { FiltrosState } from '../components/Filtros'
import { ParticipanteCard } from '../components/ParticipanteCard'
import { useParticipantes } from '../context/ParticipantesContext'

export function ListaPage() {
  const { participantes } = useParticipantes()
  const [filtros, setFiltros] = useState<FiltrosState>(FILTROS_INICIALES)

  const participantesFiltrados = useMemo(() => {
    return participantes.filter((p) => {
      const coincideNombre = p.nombre
        .toLowerCase()
        .includes(filtros.nombre.toLowerCase())
      const coincideModalidad =
        filtros.modalidad === 'Todas' || p.modalidad === filtros.modalidad
      const coincideNivel =
        filtros.nivel === 'Todos' || p.nivel === filtros.nivel

      return coincideNombre && coincideModalidad && coincideNivel
    })
  }, [participantes, filtros])

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="font-semibold text-base text-slate-700">
          Mostrando <span className="text-slate-900">{participantesFiltrados.length}</span> de{' '}
          <span className="text-slate-900">{participantes.length}</span> participantes
        </div>
        <Link
          to="/nuevo"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-sm transition"
        >
          Nuevo Participante
        </Link>
      </div>

      <Filtros filtros={filtros} setFiltros={setFiltros} />

      {participantesFiltrados.length === 0 ? (
        <p className="text-slate-600 py-6 text-center">No hay participantes</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {participantesFiltrados.map((p) => (
            <ParticipanteCard key={p.id} participante={p} />
          ))}
        </div>
      )}
    </section>
  )
}
