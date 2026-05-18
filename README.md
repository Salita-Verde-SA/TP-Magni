# TP7 - Registro de Eventos

Aplicacion full stack para gestionar participantes de un evento. Tiene:

- Frontend en React + Vite
- API en Node.js + Express
- MongoDB como base de datos
- Autenticacion con JWT y roles `ADMIN` / `CONSULTA`

## Estructura del proyecto

- `frontend/` - interfaz web
- `server/` - API y conexion a MongoDB
- `docker-compose.yml` - levanta MongoDB, API y frontend

## Requisitos

- Node.js 20 o superior para correr todo en local
- Docker y Docker Compose para levantar el stack completo
- MongoDB corriendo localmente si se va a ejecutar solo la API fuera de Docker

## Despliegue con Docker

Desde la raiz del proyecto:

Crear `.env` en la raíz basado en `.env.example`, luego:

```bash
docker compose up --build
```

Luego abrir:

- Frontend: `http://localhost:8080`
- API: `http://localhost:3000`

La API en Docker ya apunta a MongoDB con el host de red `mongo`, asi que no hace falta configurar nada extra para ese modo.

## Ejecucion en local sin docker

### 1. Levantar la base de datos

Se debe tener MongoDB disponible en `mongodb://localhost:27017/registro-evento`.

### 2. Levantar la API

```bash
cd server
npm install
npm run dev
```

Variables usadas por la API (server/.env):

- `PORT` - puerto de la API, por defecto `3000`
- `MONGO_URL` - conexion a MongoDB, por defecto `mongodb://localhost:27017/registro-evento`
- `JWT_SECRET` - secreto para firmar tokens, por defecto `jwt_secreto_tp7_desarrollo`

### 3. Levantar el frontend

```bash
cd frontend
npm install
npm run dev
```

Si la API no corre en `http://localhost:3000`, se debe definir `VITE_API_URL` en `frontend/.env` antes de arrancar Vite.

## Uso de la aplicacion

1. Entrar a la pantalla de login.
2. Iniciar sesion con un usuario de prueba.
3. Ir a la lista de participantes.
4. Si el usuario tiene rol `ADMIN`, puede crear, editar y eliminar participantes.
5. Si el usuario tiene rol `CONSULTA`, solo puede ver la informacion.

### Rutas principales

- `/` o `/login` - login
- `/menu_inicio` - menu principal
- `/lista` - listado de participantes
- `/nuevo` - alta de participante, solo `ADMIN`
- `/editar/:id` - edicion de participante, solo `ADMIN`
- `/publica` - pagina publica sin autenticacion

## Usuarios de prueba

La API crea estos usuarios automaticamente si la coleccion esta vacia:

| Usuario  | Password    | Rol |
|----------|-------------|-----|
| admin    | admin123    | ADMIN |
| consulta | consulta123 | CONSULTA |

## API

### Publico

- `POST /login` - devuelve un JWT y los datos del usuario

### Protegido por JWT

Todas estas rutas requieren `Authorization: Bearer <token>`:

- `GET /participantes`
- `POST /participantes`
- `PUT /participantes/:id`
- `DELETE /participantes/:id`
- `DELETE /participantes`

## Base de datos

Colecciones usadas:

- `participantes` - registros del evento
- `usuarios_db` - usuarios del sistema

## Notas

- En Docker, la API usa `MONGO_URL` del `.env` raíz (por defecto `mongodb://mongo:27017/registro-evento`).
- Si se ejecuta el backend en local, no usar `localhost` desde dentro de contenedores.

