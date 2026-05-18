import { useEffect, useMemo, useState } from 'react'
import type { SubmitEventHandler } from 'react'
import type { Participante, FormularioParticipante, Modalidad, Nivel, Tecnologia } from './models/Participante'
import { STORAGE_KEY, FORMULARIO_INICIAL, PARTICIPANTES_INICIALES } from './models/Participante'
import Formulario from './components/Formulario'
import Filtros from './components/Filtros'
import ParticipanteCard from './components/ParticipanteCard'

function App() {
  const [participantes, setParticipantes] = useState<Participante[]>(() => {
    const guardados = localStorage.getItem(STORAGE_KEY)
    if (!guardados) return PARTICIPANTES_INICIALES

    try {
      return JSON.parse(guardados) as Participante[]
    } catch {
      return PARTICIPANTES_INICIALES
    }
  })

  const [formulario, setFormulario] =
    useState<FormularioParticipante>(FORMULARIO_INICIAL)
  const [buscarNombre, setBuscarNombre] = useState('')
  const [filtroModalidad, setFiltroModalidad] = useState<'Todas' | Modalidad>(
    'Todas',
  )
  const [filtroNivel, setFiltroNivel] = useState<'Todos' | Nivel>('Todos')
  const [errorFormulario, setErrorFormulario] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participantes))
  }, [participantes])

  const participantesFiltrados = useMemo(() => {
    return participantes.filter((participante) => {
      const coincideNombre = participante.nombre
        .toLowerCase()
        .includes(buscarNombre.toLowerCase())
      const coincideModalidad =
        filtroModalidad === 'Todas' || participante.modalidad === filtroModalidad
      const coincideNivel =
        filtroNivel === 'Todos' || participante.nivel === filtroNivel

      return coincideNombre && coincideModalidad && coincideNivel
    })
  }, [participantes, buscarNombre, filtroModalidad, filtroNivel])

  const actualizarCampo = (
    campo: keyof FormularioParticipante,
    valor: string | boolean,
  ) => {
    setFormulario((previo) => ({
      ...previo,
      [campo]: valor,
    }))
  }

  const alternarTecnologia = (tecnologia: Tecnologia) => {
    setFormulario((previo) => {
      const existe = previo.tecnologias.includes(tecnologia)
      const tecnologias = existe
        ? previo.tecnologias.filter((item) => item !== tecnologia)
        : [...previo.tecnologias, tecnologia]

      return { ...previo, tecnologias }
    })
  }

  const registrarParticipante: SubmitEventHandler<HTMLFormElement> = (
    evento,
  ) => {
    evento.preventDefault()
    setErrorFormulario('')

    const edadNumerica = Number(formulario.edad)
    if (!formulario.aceptaTerminos) {
      setErrorFormulario('Debes aceptar los terminos y condiciones.')
      return
    }

    if (Number.isNaN(edadNumerica) || edadNumerica <= 0) {
      setErrorFormulario('La edad debe ser un numero mayor a 0.')
      return
    }

    const nuevoParticipante: Participante = {
      id: Date.now(),
      nombre: formulario.nombre.trim(),
      email: formulario.email.trim(),
      edad: edadNumerica,
      pais: formulario.pais,
      modalidad: formulario.modalidad,
      tecnologias: formulario.tecnologias,
      nivel: formulario.nivel,
      aceptaTerminos: formulario.aceptaTerminos,
    }

    setParticipantes((previo) => [nuevoParticipante, ...previo])
    setFormulario(FORMULARIO_INICIAL)
  }

  const eliminarParticipante = (id: number) => {
    setParticipantes((previo) =>
      previo.filter((participante) => participante.id !== id),
    )
  }

  const limpiarFiltros = () => {
    setBuscarNombre('')
    setFiltroModalidad('Todas')
    setFiltroNivel('Todos')
  }

  const resetearDatos = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todos los participantes?')) {
      localStorage.removeItem(STORAGE_KEY);
      setParticipantes(PARTICIPANTES_INICIALES);
    }
  }
  return (
    <main className="min-h-screen bg-[#ececec] py-4">
      <div className="max-w-6xl mx-auto px-3">
        <header className="bg-emerald-500 text-white font-semibold text-2xl px-4 py-3 rounded-t-sm">
          Registro de Participantes
        </header>

        <div className="font-semibold text-2xl text-slate-900 mt-2 mb-3">
          Participantes registrados: {participantes.length}
        </div>

        <Formulario
          formulario={formulario}
          actualizarCampo={actualizarCampo}
          alternarTecnologia={alternarTecnologia}
          registrarParticipante={registrarParticipante}
          errorFormulario={errorFormulario}
        />

        <Filtros
          buscarNombre={buscarNombre}
          setBuscarNombre={setBuscarNombre}
          filtroModalidad={filtroModalidad}
          setFiltroModalidad={setFiltroModalidad}
          filtroNivel={filtroNivel}
          setFiltroNivel={setFiltroNivel}
          onLimpiarFiltros={limpiarFiltros}
          onResetearDatos={resetearDatos}
        />

        <p className="text-sm text-gray-600 mb-4">
            Mostrando {participantesFiltrados.length} de {participantes.length} participantes.
          </p>
        <section>
          {participantesFiltrados.length === 0 ? (
            <p className="text-slate-600">
              No hay participantes que coincidan con los filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participantesFiltrados.map((participante) => (
                <ParticipanteCard
                  key={participante.id}
                  participante={participante}
                  onEliminar={eliminarParticipante}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
