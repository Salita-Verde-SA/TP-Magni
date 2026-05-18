# Backend Registro de Eventos - TP7

## Requisitos
- MongoDB local en `mongodb://localhost:27017/registro-evento`
- Node.js 18+

## Levantar API

```bash
cd server
npm install
npm run dev
```

## Variables de entorno
Crear un archivo `.env` basado en `.env.example`:
```
PORT=3000
MONGO_URL=mongodb://localhost:27017/registro-evento
JWT_SECRET=jwt_secreto_tp7_cambiar_en_produccion
```

## Usuarios de prueba (se crean automáticamente)
| Usuario   | Password      | Rol      |
|-----------|---------------|----------|
| admin     | admin123      | ADMIN    |
| consulta  | consulta123   | CONSULTA |

## Endpoints

### Público
- `POST /login` — Retorna JWT

### Protegidos (requieren `Authorization: Bearer <token>`)
- `GET /participantes`
- `POST /participantes`
- `PUT /participantes/:id`
- `DELETE /participantes/:id`
- `DELETE /participantes`

## Colecciones MongoDB
- `participantes` — Registro de participantes
- `usuarios_db` — Usuarios del sistema con rol
