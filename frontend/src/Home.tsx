import { Routes, Route } from 'react-router-dom'
import App from './App'
import { LoginPage } from './pages/LoginPage'
import { PublicaPage } from './pages/PublicaPage'
import { ListaPage } from './pages/ListaPage'
import { FormularioPage } from './pages/FormularioPage'
import { EditarPage } from './pages/EditarPage'
import { CursosPage } from './pages/CursosPage'
import { PagoExitosoPage } from './pages/PagoExitosoPage'
import { PagoFallidoPage } from './pages/PagoFallidoPage'
import { PagoPendientePage } from './pages/PagoPendientePage'
import PrivateRoute from './routes/PrivateRoute'

export default function Home() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/publica" element={<PublicaPage />} />
      <Route
        path="/lista"
        element={
          <PrivateRoute>
            <ListaPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/nuevo"
        element={
          <PrivateRoute rol="ADMIN">
            <FormularioPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/editar/:id"
        element={
          <PrivateRoute rol="ADMIN">
            <EditarPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/menu_inicio"
        element={
          <PrivateRoute>
            <App />
          </PrivateRoute>
        }
      />
      <Route path="/cursos" element={<CursosPage />} />
      <Route path="/pago-exitoso" element={<PagoExitosoPage />} />
      <Route path="/pago-fallido" element={<PagoFallidoPage />} />
      <Route path="/pago-pendiente" element={<PagoPendientePage />} />
    </Routes>
  )
}
