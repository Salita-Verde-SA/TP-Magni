import { useNavigate, Link } from 'react-router-dom'
import { Formulario } from '../components/Formulario'
import { Layout } from '../components/Layout'

export function FormularioPage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <section>
        <div className="flex items-center gap-4 mb-4">
          <Link to="/lista" className="text-slate-500 hover:text-slate-800 transition">
            &larr; Volver
          </Link>
          <h2 className="text-xl font-bold text-slate-800">Nuevo Participante</h2>
        </div>
        <Formulario onSuccess={() => navigate('/lista')} />
      </section>
    </Layout>
  )
}
