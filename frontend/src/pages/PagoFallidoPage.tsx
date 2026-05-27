import { Link } from 'react-router-dom'

export function PagoFallidoPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl backdrop-blur-md">
        {/* Animated Cross */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-500/20 text-red-400 mb-6 border border-red-500/30 animate-bounce">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 mb-2">
          Pago Cancelado / Fallido
        </h1>
        <p className="text-slate-300 text-sm mb-8 leading-relaxed">
          No pudimos completar tu solicitud de pago en esta ocasión. Puede que la transacción haya sido cancelada o rechazada por tu entidad bancaria.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/cursos"
            className="block w-full py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition text-center shadow-lg"
          >
            Reintentar Compra
          </Link>
          <Link
            to="/menu_inicio"
            className="block w-full py-3 px-4 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 transition text-center border border-slate-700"
          >
            Volver al Menú Principal
          </Link>
        </div>
      </div>
    </main>
  )
}
