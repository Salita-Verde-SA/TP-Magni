import {MODALIDADES, NIVELES, type Modalidad, type Nivel } from '../models/Participante'

interface FiltrosProps {
  buscarNombre: string
  setBuscarNombre: (value: string) => void
  filtroModalidad: 'Todas' | Modalidad
  setFiltroModalidad: (value: 'Todas' | Modalidad) => void
  filtroNivel: 'Todos' | Nivel
  setFiltroNivel: (value: 'Todos' | Nivel) => void
  onLimpiarFiltros: () => void
  onResetearDatos: () => void
}

export default function Filtros({
  buscarNombre,
  setBuscarNombre,
  filtroModalidad,
  setFiltroModalidad,
  filtroNivel,
  setFiltroNivel,
  onLimpiarFiltros,
  onResetearDatos,
}: FiltrosProps) {
  return (
    <section className="bg-white border border-slate-200 rounded-sm p-4 mb-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex flex-col gap-1">
          <input
            type="text"
            value={buscarNombre}
            onChange={(e) => setBuscarNombre(e.target.value)}
            placeholder="Buscar"
            className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1">
          <select
            value={filtroModalidad}
            onChange={(e) =>
              setFiltroModalidad(e.target.value as 'Todas' | Modalidad)
            }
            className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todas">Todas</option>
            {MODALIDADES.map((modalidad) => (
              <option key={modalidad} value={modalidad}>
                {modalidad}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <select
            value={filtroNivel}
            onChange={(e) => setFiltroNivel(e.target.value as 'Todos' | Nivel)}
            className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Todos">Todos</option>
            {NIVELES.map((nivel) => (
              <option key={nivel} value={nivel}>
                {nivel}
              </option>
            ))}
          </select>
        </label>
            
            <button
              onClick={onLimpiarFiltros}
              className="text-sm px-3 py-1 rounded-sm bg-gray-500 text-white hover:bg-gray-600 transition"
            >
              Limpiar filtros
            </button>
            <button
              onClick={onResetearDatos}
              className="text-sm px-3 py-1 rounded-sm bg-red-500 text-white hover:bg-red-600 transition"
            >
              Resetear datos
            </button>

      </div>
    </section>
  )
}