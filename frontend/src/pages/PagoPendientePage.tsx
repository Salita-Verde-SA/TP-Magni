import { Link, useSearchParams } from 'react-router-dom'

export function PagoPendientePage() {
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('payment_id') ?? 'N/A'

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl backdrop-blur-md">
        {/* Animated Clock / Pending Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-amber-500/20 text-amber-400 mb-6 border border-amber-500/30 animate-pulse">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-2">
          Pago Pendiente
        </h1>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Tu pago está siendo procesado por Mercado Pago. Esto ocurre comúnmente si elegiste pagar en efectivo (ej. RapiPago, Pago Fácil) o si la tarjeta requiere verificación.
        </p>

        {/* Details Table */}
        <div className="bg-slate-900/50 rounded-2xl p-5 mb-8 border border-slate-700/30 text-left text-xs space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold uppercase font-mono">ID de Pago</span>
            <span className="font-mono text-slate-200">{paymentId}</span>
          </div>
          <div className="flex justify-between items-center border-t border-slate-850 pt-2">
            <span className="text-slate-400 font-semibold uppercase">Estado</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
              en proceso / pendiente
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/menu_inicio"
            className="block w-full py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 transition text-center shadow-lg shadow-amber-950/20"
          >
            Ir al Menú Principal
          </Link>
          <Link
            to="/cursos"
            className="block w-full py-3 px-4 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 transition text-center border border-slate-700"
          >
            Ver catálogo de cursos
          </Link>
        </div>
      </div>
    </main>
  )
}
