import { useEffect, useMemo, useState } from 'react'
import type { SubmitEventHandler } from 'react'

type Modalidad = 'Presencial' | 'Virtual' | 'Hibrido'
type Nivel = 'Principiante' | 'Intermedio' | 'Avanzado'
type Tecnologia = 'React' | 'Angular' | 'Vue' | 'Node' | 'Python' | 'Java'

interface Participante {
  id: number
  nombre: string
  email: string
  edad: number
  pais: string
  modalidad: Modalidad
  tecnologias: Tecnologia[]
  nivel: Nivel
  aceptaTerminos: boolean
}

interface FormularioParticipante {
  nombre: string
  email: string
  edad: string
  pais: string
  modalidad: Modalidad
  tecnologias: Tecnologia[]
  nivel: Nivel
  aceptaTerminos: boolean
}

const STORAGE_KEY = 'registro-eventos-participantes'

const PAISES = ['Argentina', 'Chile', 'Uruguay', 'Mexico', 'Espana']
const MODALIDADES: Modalidad[] = ['Presencial', 'Virtual', 'Hibrido']
const TECNOLOGIAS: Tecnologia[] = [
  'React',
  'Angular',
  'Vue',
  'Node',
  'Python',
  'Java',
]
const NIVELES: Nivel[] = ['Principiante', 'Intermedio', 'Avanzado']

const FORMULARIO_INICIAL: FormularioParticipante = {
  nombre: '',
  email: '',
  edad: '',
  pais: 'Argentina',
  modalidad: 'Presencial',
  tecnologias: [],
  nivel: 'Principiante',
  aceptaTerminos: false,
}

const PARTICIPANTES_INICIALES: Participante[] = [
  {
    id: 1,
    nombre: 'Juan Perez',
    email: 'juan@mail.com',
    edad: 25,
    pais: 'Argentina',
    modalidad: 'Presencial',
    tecnologias: ['React', 'Node'],
    nivel: 'Intermedio',
    aceptaTerminos: true,
  },
]

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

  return (
    <main className="min-h-screen bg-[#ececec] py-4">
      <div className="max-w-6xl mx-auto px-3">
        <header className="bg-emerald-500 text-white font-semibold text-2xl px-4 py-3 rounded-t-sm">
          Registro de Participantes
        </header>

        <div className="font-semibold text-2xl text-slate-900 mt-2 mb-3">
          Participantes registrados: {participantes.length}
        </div>

        <section className="bg-white border border-slate-200 rounded-sm p-6 mb-8">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={registrarParticipante}
          >
            <label className="flex flex-col gap-1">
              <input
                required
                type="text"
                value={formulario.nombre}
                onChange={(e) => actualizarCampo('nombre', e.target.value)}
                placeholder="Nombre"
                className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <input
                required
                type="email"
                value={formulario.email}
                onChange={(e) => actualizarCampo('email', e.target.value)}
                placeholder="Email"
                className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <input
                required
                type="number"
                min={1}
                value={formulario.edad}
                onChange={(e) => actualizarCampo('edad', e.target.value)}
                placeholder="Edad"
                className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="flex flex-col gap-1">
              <select
                value={formulario.pais}
                onChange={(e) => actualizarCampo('pais', e.target.value)}
                className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PAISES.map((pais) => (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>
            </label>

            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium mb-2">
                Modalidad de asistencia
              </legend>
              <div className="flex gap-4 flex-wrap">
                {MODALIDADES.map((modalidad) => (
                  <label key={modalidad} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="modalidad"
                      checked={formulario.modalidad === modalidad}
                      onChange={() => actualizarCampo('modalidad', modalidad)}
                    />
                    {modalidad}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="md:col-span-2">
              <legend className="text-sm font-medium mb-2">
                Tecnologias conocidas
              </legend>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-y-0">
                {TECNOLOGIAS.map((tecnologia) => (
                  <label key={tecnologia} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formulario.tecnologias.includes(tecnologia)}
                      onChange={() => alternarTecnologia(tecnologia)}
                    />
                    {tecnologia}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="flex flex-col gap-1">
              <select
                value={formulario.nivel}
                onChange={(e) =>
                  actualizarCampo('nivel', e.target.value as FormularioParticipante['nivel'])
                }
                className="rounded-sm border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {NIVELES.map((nivel) => (
                  <option key={nivel} value={nivel}>
                    {nivel}
                  </option>
                ))}
              </select>
            </label>

            <label className="md:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={formulario.aceptaTerminos}
                onChange={(e) =>
                  actualizarCampo('aceptaTerminos', e.target.checked)
                }
              />
              Acepto terminos
            </label>

            {errorFormulario && (
              <p className="md:col-span-2 text-sm text-red-600">{errorFormulario}</p>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-sm hover:bg-blue-700 transition"
              >
                Registrar
              </button>
            </div>
          </form>
        </section>

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
          </div>
        </section>

        <section>
          {participantesFiltrados.length === 0 ? (
            <p className="text-slate-600">
              No hay participantes que coincidan con los filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {participantesFiltrados.map((participante) => (
                <article
                  key={participante.id}
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
                      onClick={() => eliminarParticipante(participante.id)}
                      className="text-sm px-3 py-1 rounded-sm bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
