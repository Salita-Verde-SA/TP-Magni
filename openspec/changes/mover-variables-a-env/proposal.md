## Why

Hoy las variables están dispersas entre defaults en código, `.env` parcial y `docker-compose.yml`. Eso genera confusión, valores divergentes entre modos (local vs docker) y hace difícil saber cuál es la fuente de verdad. Centralizar en `.env` mejora la trazabilidad y baja errores de configuración.

## What Changes

- Definir un esquema único de variables de entorno para backend, frontend y Docker.
- Eliminar valores hardcodeados en código cuando haya variables equivalentes.
- Documentar un `.env` raíz y `.env` de cada app con ejemplos coherentes.
- Ajustar `docker-compose.yml` para consumir el `.env` como fuente primaria.

## Capabilities

### New Capabilities
- `env-config`: Estándar de variables y fuentes de configuración para todo el proyecto.

### Modified Capabilities
- (ninguna)

## Impact

- Backend Node/Express (lectura de variables y defaults).
- Frontend Vite (VITE_*).
- Docker Compose (env_file/args y puertos).
- Documentación de setup.
