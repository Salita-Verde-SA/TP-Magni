import { Routes, Route } from 'react-router-dom'
import App from './App'
import { LoginPage } from './pages/LoginPage'
import { PublicaPage } from './pages/PublicaPage'
import { ListaPage } from './pages/ListaPage'
import { FormularioPage } from './pages/FormularioPage'
import { EditarPage } from './pages/EditarPage'
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
    </Routes>
  )
}
