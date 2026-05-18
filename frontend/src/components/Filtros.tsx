import type { Modalidad, Nivel } from '../models/Participante'

const MODALIDADES: Modalidad[] = ['Presencial', 'Virtual', 'Hibrido']
const NIVELES: Nivel[] = ['Principiante', 'Intermedio', 'Avanzado']

export interface FiltrosState {
  nombre: string
  modalidad: 'Todas' | Modalidad
  nivel: 'Todos' | Nivel
}

export const FILTROS_INICIALES: FiltrosState = {
  nombre: '',
  modalidad: 'Todas',
  nivel: 'Todos',
}

interface FiltrosProps {
  filtros: FiltrosState
  setFiltros: (filtros: FiltrosState) => void
}

export function Filtros({ filtros, setFiltros }: FiltrosProps) {
  const limpiarFiltros = () => setFiltros(FILTROS_INICIALES)

  return (
    <section className="bg-white border border-slate-200 rounded-sm p-4 mb-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
        <label className="flex flex-col gap-1">
          <input
            type="text"
            value={filtros.nombre}
            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
            placeholder="Buscar por nombre"
            className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1">
          <select
            value={filtros.modalidad}
            onChange={(e) =>
              setFiltros({ ...filtros, modalidad: e.target.value as 'Todas' | Modalidad })
            }
            className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todas">Todas las modalidades</option>
            {MODALIDADES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <select
            value={filtros.nivel}
            onChange={(e) =>
              setFiltros({ ...filtros, nivel: e.target.value as 'Todos' | Nivel })
            }
            className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos">Todos los niveles</option>
            {NIVELES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        onClick={limpiarFiltros}
        className="text-sm px-3 py-1.5 rounded-sm bg-slate-200 text-slate-700 hover:bg-slate-300 transition"
      >
        Limpiar filtros
      </button>
    </section>
  )
}
