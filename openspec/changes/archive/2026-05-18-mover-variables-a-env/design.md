## Context

El proyecto hoy mezcla tres fuentes de configuración: defaults en código (server y frontend), `.env` parcial en `server/`, y variables en `docker-compose.yml`. Eso rompe la consistencia entre modos de ejecución y obliga a “adivinar” cuál valor manda. Además, Vite requiere `VITE_*` y Docker usa su propia resolución de envs.

## Goals / Non-Goals

**Goals:**
- Definir una única fuente de verdad para variables de entorno por entorno.
- Separar claramente variables de backend, frontend y docker.
- Eliminar hardcodeos cuando ya exista variable equivalente.
- Documentación simple y coherente para levantar local y con docker.

**Non-Goals:**
- Cambiar lógica de negocio o endpoints.
- Introducir nuevas dependencias de configuración (ej: dotenv extra o config server).
- Reestructurar el stack de despliegue.

## Decisions

1) **`.env` raíz como fuente para docker-compose**
   - *Por qué*: Docker Compose carga un `.env` en la raíz automáticamente; usarlo evita duplicar valores en `docker-compose.yml`.
   - *Alternativa*: `env_file` por servicio. Rechazado porque dispersa variables y obliga a múltiples archivos.

2) **`.env` específicos por app para ejecución local (server/.env y frontend/.env)**
   - *Por qué*: Node y Vite leen `.env` en sus directorios; mantenerlos locales mejora la DX cuando no se usa Docker.
   - *Alternativa*: un único `.env` en la raíz y scripts que lo exporten. Rechazado por fricción y fragilidad en Windows.

3) **Defaults mínimos en código solo como fallback seguro**
   - *Por qué*: permite arrancar sin `.env` en dev, pero obliga a declarar la intención en archivos de env.
   - *Alternativa*: eliminar todos los defaults. Rechazado porque empeora onboarding rápido.

## Risks / Trade-offs

- **Riesgo**: valores inconsistentes entre `.env` raíz y `.env` locales → **Mitigación**: documentar y proveer `.env.example` coherentes.
- **Riesgo**: confusión con `VITE_*` vs variables de backend → **Mitigación**: separar claramente secciones y nombres.
- **Trade-off**: dos fuentes (root + app) → mejor DX vs 100% centralización.
