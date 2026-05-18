import { useNavigate, Link } from 'react-router-dom'
import { Formulario } from '../components/Formulario'

export function FormularioPage() {
  const navigate = useNavigate()

  return (
    <section>
      <div className="flex items-center gap-4 mb-4">
        <Link to="/" className="text-slate-500 hover:text-slate-800 transition">
          &larr; Volver
        </Link>
        <h2 className="text-xl font-bold text-slate-800">Nuevo Participante</h2>
      </div>
      <Formulario onSuccess={() => navigate('/')} />
    </section>
  )
}
