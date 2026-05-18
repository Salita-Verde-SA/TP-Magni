import { useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Formulario } from '../components/Formulario'
import { useParticipantes } from '../context/ParticipantesContext'
import { Layout } from '../components/Layout'

export function EditarPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { participantes, seleccionarParaEdicion, cancelarEdicion } = useParticipantes()

  useEffect(() => {
    const participante = participantes.find((p) => p.id === Number(id))
    if (participante) {
      seleccionarParaEdicion(participante)
    }

    return () => {
      cancelarEdicion()
    }
  }, [id, participantes, seleccionarParaEdicion, cancelarEdicion])

  return (
    <Layout>
      <section>
        <div className="flex items-center gap-4 mb-4">
          <Link to="/lista" className="text-slate-500 hover:text-slate-800 transition">
            &larr; Volver
          </Link>
          <h2 className="text-xl font-bold text-slate-800">Editar Participante</h2>
        </div>
        <Formulario onSuccess={() => navigate('/lista')} />
      </section>
    </Layout>
  )
}
