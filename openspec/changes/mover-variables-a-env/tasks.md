## 1. Inventario y esquema de variables

- [x] 1.1 Relevar variables actuales (server, frontend, docker-compose) y definir esquema único
- [x] 1.2 Definir `.env.example` raíz con todas las variables y valores por defecto

## 2. Backend

- [x] 2.1 Ajustar lectura de `PORT`, `MONGO_URL`, `JWT_SECRET` para usar envs y fallback mínimo
- [x] 2.2 Actualizar `server/.env.example` (o moverlo) para reflejar el esquema definitivo

## 3. Frontend

- [x] 3.1 Definir `frontend/.env.example` con `VITE_API_URL`
- [x] 3.2 Asegurar que el código usa `import.meta.env.VITE_API_URL` como fuente

## 4. Docker Compose

- [x] 4.1 Ajustar `docker-compose.yml` para consumir variables desde `.env` raíz
- [x] 4.2 Alinear `API_PORT`, `FRONTEND_PORT`, `JWT_SECRET`, `VITE_API_URL` con el esquema

## 5. Documentación

- [x] 5.1 Actualizar README raíz con instrucciones de `.env` y overrides por entorno
- [x] 5.2 Actualizar README del server si aplica
