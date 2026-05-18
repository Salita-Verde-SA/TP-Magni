import { useMemo, useState } from 'react'
import { Formulario } from './components/Formulario'
import { Filtros, FILTROS_INICIALES } from './components/Filtros'
import type { FiltrosState } from './components/Filtros'
import { ParticipanteCard } from './components/ParticipanteCard'
import { useParticipantes } from './context/ParticipantesContext'

// Componente principal: aplica filtros, muestra conteo y renderiza la UI.
function App() {
  const { participantes, resetear } = useParticipantes()

  const [filtros, setFiltros] = useState<FiltrosState>(FILTROS_INICIALES)

  // Estado derivado: filtros combinados con AND lógico
  // Calcula la lista visible segun los filtros actuales.
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
    <main className="min-h-screen bg-[#ececec] py-4">
      <div className="max-w-6xl mx-auto px-3">
        <header className="bg-emerald-500 text-white font-semibold text-2xl px-4 py-3 rounded-t-sm flex items-center justify-between">
          <span>Registro de Participantes</span>
          <button
            onClick={() => void resetear()}
            className="text-sm font-normal px-3 py-1.5 rounded-sm bg-white/20 hover:bg-white/30 transition"
          >
            Resetear datos
          </button>
        </header>

        {/* Contador dinámico */}
        <div className="font-semibold text-base text-slate-700 mt-2 mb-3">
          Mostrando{' '}
          <span className="text-slate-900">{participantesFiltrados.length}</span> de{' '}
          <span className="text-slate-900">{participantes.length}</span> participantes
        </div>

        {/* Formulario - Alta de participante */}
        <Formulario />

        {/* Sección de Filtros */}
        <Filtros filtros={filtros} setFiltros={setFiltros} />

        {/* Lista de tarjetas */}
        <section>
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
      </div>
    </main>
  )
}

export default App
