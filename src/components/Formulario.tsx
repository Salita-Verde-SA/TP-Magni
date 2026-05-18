import type { SubmitEventHandler } from 'react'
import { type FormularioParticipante, type Tecnologia, type Nivel, PAISES, MODALIDADES, TECNOLOGIAS, NIVELES } from '../models/Participante'

interface FormularioProps {
  formulario: FormularioParticipante
  actualizarCampo: (campo: keyof FormularioParticipante, valor: string | boolean) => void
  alternarTecnologia: (tecnologia: Tecnologia) => void
  registrarParticipante: SubmitEventHandler<HTMLFormElement>
  errorFormulario: string
}

export default function Formulario({
  formulario,
  actualizarCampo,
  alternarTecnologia,
  registrarParticipante,
  errorFormulario,
}: FormularioProps) {
  return (
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
              actualizarCampo('nivel', e.target.value as Nivel)
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
  )
}