import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Participante } from '../models/Participante'
import type { Modalidad, Nivel, Tecnologia } from '../models/Participante'
import { useParticipantes } from '../context/ParticipantesContext'

const PAISES = ['Argentina', 'Chile', 'Uruguay', 'Mexico', 'Espana']
const MODALIDADES: Modalidad[] = ['Presencial', 'Virtual', 'Hibrido']
const TECNOLOGIAS: Tecnologia[] = ['React', 'Angular', 'Vue', 'Node', 'Python', 'Java']
const NIVELES: Nivel[] = ['Principiante', 'Intermedio', 'Avanzado']

interface FormularioState {
  nombre: string
  email: string
  edad: string
  pais: string
  modalidad: Modalidad
  tecnologias: Tecnologia[]
  nivel: Nivel
  aceptaTerminos: boolean
}

const FORMULARIO_INICIAL: FormularioState = {
  nombre: '',
  email: '',
  edad: '',
  pais: 'Argentina',
  modalidad: 'Presencial',
  tecnologias: [],
  nivel: 'Principiante',
  aceptaTerminos: false,
}

interface FormularioProps {
  onSuccess?: () => void
}

export function Formulario({ onSuccess }: FormularioProps = {}) {
  const [formulario, setFormulario] = useState<FormularioState>(FORMULARIO_INICIAL)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { agregar, editar, participanteEnEdicion, cancelarEdicion } = useParticipantes()

  useEffect(() => {
    if (participanteEnEdicion) {
      setFormulario({
        nombre: participanteEnEdicion.nombre,
        email: participanteEnEdicion.email,
        edad: participanteEnEdicion.edad.toString(),
        pais: participanteEnEdicion.pais,
        modalidad: participanteEnEdicion.modalidad,
        tecnologias: participanteEnEdicion.tecnologias,
        nivel: participanteEnEdicion.nivel,
        aceptaTerminos: participanteEnEdicion.aceptaTerminos,
      })
    } else {
      setFormulario(FORMULARIO_INICIAL)
    }
  }, [participanteEnEdicion])

  const actualizarCampo = (campo: keyof FormularioState, valor: string | boolean) => {
    setFormulario((prev) => ({ ...prev, [campo]: valor }))
  }

  const alternarTecnologia = (tecnologia: Tecnologia) => {
    setFormulario((prev) => {
      const existe = prev.tecnologias.includes(tecnologia)
      const tecnologias = existe
        ? prev.tecnologias.filter((t) => t !== tecnologia)
        : [...prev.tecnologias, tecnologia]
      return { ...prev, tecnologias }
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const edadNumerica = Number(formulario.edad)

    if (!formulario.aceptaTerminos) {
      setError('Debes aceptar los terminos y condiciones.')
      return
    }

    if (Number.isNaN(edadNumerica) || edadNumerica <= 0) {
      setError('La edad debe ser un numero mayor a 0.')
      return
    }

    const nuevo = new Participante(
      formulario.nombre.trim(),
      formulario.email.trim(),
      edadNumerica,
      formulario.pais,
      formulario.modalidad,
      formulario.tecnologias,
      formulario.nivel,
      formulario.aceptaTerminos,
    )

    if (participanteEnEdicion) {
      nuevo.id = participanteEnEdicion.id
    }

    try {
      if (participanteEnEdicion) {
        await editar(nuevo)
      } else {
        await agregar(nuevo)
        setFormulario(FORMULARIO_INICIAL)
      }
      if (onSuccess) onSuccess()
    } catch {
      setError('No se pudo guardar el participante.')
    }
  }

  return (
    <section className="bg-white border border-slate-200 rounded-sm p-6 mb-8">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => void handleSubmit(e)}>
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
          <legend className="text-sm font-medium mb-2">Modalidad de asistencia</legend>
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
          <legend className="text-sm font-medium mb-2">Tecnologias conocidas</legend>
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
            onChange={(e) => actualizarCampo('nivel', e.target.value as Nivel)}
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
            onChange={(e) => actualizarCampo('aceptaTerminos', e.target.checked)}
          />
          Acepto terminos
        </label>

        {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-sm hover:bg-blue-700 transition"
          >
            {participanteEnEdicion ? 'Actualizar' : 'Registrar'}
          </button>
          {participanteEnEdicion && (
            <button
              type="button"
              onClick={() => {
                cancelarEdicion()
                navigate('/lista')
              }}
              className="bg-slate-500 text-white px-5 py-2 rounded-sm hover:bg-slate-600 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
