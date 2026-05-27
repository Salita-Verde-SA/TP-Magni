import { Link, useSearchParams } from 'react-router-dom'

export function PagoExitosoPage() {
  const [searchParams] = useSearchParams()
  const paymentId = searchParams.get('payment_id') ?? 'N/A'
  const status = searchParams.get('status') ?? 'approved'
  const merchantOrderId = searchParams.get('merchant_order_id') ?? 'N/A'

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl backdrop-blur-md">
        {/* Animated Checkmark */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 border border-emerald-500/30 animate-pulse">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-2">
          ¡Pago Exitoso!
        </h1>
        <p className="text-slate-300 text-sm mb-6">
          Muchas gracias por tu compra. Ya tienes acceso al curso seleccionado. Se ha enviado la confirmación de pago a tu correo.
        </p>

        {/* Details Table */}
        <div className="bg-slate-900/50 rounded-2xl p-5 mb-8 border border-slate-700/30 text-left text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-semibold uppercase">ID de Transacción</span>
            <span className="font-mono text-slate-200">{paymentId}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-semibold uppercase">Estado del Pago</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
              {status}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-semibold uppercase">Orden de Compra</span>
            <span className="font-mono text-slate-200">{merchantOrderId}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/menu_inicio"
            className="block w-full py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition text-center shadow-lg shadow-emerald-950/20"
          >
            Ir al Menú Principal
          </Link>
          <Link
            to="/cursos"
            className="block w-full py-3 px-4 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 transition text-center border border-slate-700"
          >
            Ver otros cursos
          </Link>
        </div>
      </div>
    </main>
  )
}
