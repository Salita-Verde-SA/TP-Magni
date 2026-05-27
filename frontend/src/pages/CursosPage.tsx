import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../components/Layout'

const API_BASE = import.meta.env.VITE_API_URL ?? ''

interface Curso {
  id: string
  nombre: string
  descripcion: string
  precio: number
  duracion: string
  nivel: string
  color: string // Matching background color for cards/badges
  textColor: string // Matching text color for badges
}

const CURSOS: Curso[] = [
  {
    id: 'react-avanzado',
    nombre: 'Curso React Avanzado',
    descripcion: 'Domina Hooks avanzados, Concurrent Mode, patrones de diseño, Zustand y optimización de rendimiento.',
    precio: 25000,
    duracion: '8 semanas',
    nivel: 'Avanzado',
    color: 'bg-rose-100 border-rose-200',
    textColor: 'text-rose-700',
  },
  {
    id: 'dba-databases',
    nombre: 'Curso DBA',
    descripcion: 'Diseño, optimización de consultas, indexación y administración avanzada de bases de datos SQL y NoSQL.',
    precio: 40000,
    duracion: '10 semanas',
    nivel: 'Avanzado',
    color: 'bg-rose-100 border-rose-200',
    textColor: 'text-rose-700',
  },
  {
    id: 'backend-node',
    nombre: 'Curso Backend con Node.js',
    descripcion: 'Construye APIs robustas y escalables con Express, NestJS, Postgres y despliegue continuo con Docker.',
    precio: 30000,
    duracion: '8 semanas',
    nivel: 'Intermedio',
    color: 'bg-yellow-100 border-yellow-200',
    textColor: 'text-amber-700',
  },
  {
    id: 'machine-learning',
    nombre: 'Introducción a Machine Learning',
    descripcion: 'Modelos predictivos, redes neuronales, regresiones y procesamiento de datos con Python y TensorFlow.',
    precio: 45000,
    duracion: '12 semanas',
    nivel: 'Avanzado',
    color: 'bg-rose-100 border-rose-200',
    textColor: 'text-rose-700',
  },
  {
    id: 'devops-arch',
    nombre: 'Arquitectura de Software & DevOps',
    descripcion: 'Infraestructura como código (IaC), CI/CD, Kubernetes, AWS, microservicios y escalado de sistemas.',
    precio: 50000,
    duracion: '10 semanas',
    nivel: 'Avanzado',
    color: 'bg-rose-100 border-rose-200',
    textColor: 'text-rose-700',
  },
  {
    id: 'ui-ux-design',
    nombre: 'Diseño Interfaces (UI/UX)',
    descripcion: 'Diseña interfaces visuales modernas en Figma, crea user journeys, wireframes y sistemas de diseño.',
    precio: 20000,
    duracion: '6 semanas',
    nivel: 'Principiante',
    color: 'bg-emerald-100 border-emerald-200',
    textColor: 'text-emerald-700',
  },
]

export function CursosPage() {
  const [loadingCursoId, setLoadingCursoId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleComprar = async (curso: Curso) => {
    setLoadingCursoId(curso.id)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/pago/preferencia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: curso.id,
          nombre: curso.nombre,
          precio: curso.precio,
          back_urls: {
            success: `${window.location.origin}/pago-exitoso`,
            failure: `${window.location.origin}/pago-fallido`,
            pending: `${window.location.origin}/pago-pendiente`,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Error al conectar con el servidor de pagos')
      }

      const data = (await response.json()) as { init_point: string }
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        throw new Error('No se recibió la URL de pago de Mercado Pago')
      }
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Error inesperado al procesar el pago')
    } finally {
      setLoadingCursoId(null)
    }
  }

  return (
    <Layout>
      <section className="py-2">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Cursos Disponibles</h1>
            <p className="text-slate-600 mt-1 text-sm">
              Elige tu próximo curso y págalo de forma segura con Mercado Pago Checkout Pro.
            </p>
          </div>
          <Link
            to="/menu_inicio"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-sm transition text-sm flex items-center gap-1 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Menú Principal
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-sm bg-red-100 border border-red-200 text-red-700 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Cursos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURSOS.map((curso) => {
            const isLoading = loadingCursoId === curso.id
            return (
              <article
                key={curso.id}
                className={`rounded-sm p-5 border border-slate-200 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-200`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">
                      {curso.nombre}
                    </h3>
                  </div>

                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-sm mb-3 border ${curso.color} ${curso.textColor}`}>
                    Nivel: {curso.nivel}
                  </span>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {curso.descripcion}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {curso.duracion}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                      </svg>
                      Certificación
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-500 text-sm">Precio:</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      ${curso.precio.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <button
                    onClick={() => void handleComprar(curso)}
                    disabled={isLoading || loadingCursoId !== null}
                    className="w-full py-2 px-4 rounded-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Conectando...</span>
                      </>
                    ) : (
                      'QUIERO ESTE CURSO'
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}
