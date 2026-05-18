## ADDED Requirements

### Requirement: Esquema único de variables
El sistema MUST definir un esquema único de variables de entorno para backend, frontend y Docker, con nombres estables y documentados.

#### Scenario: Esquema documentado
- **WHEN** se consulta la documentación del proyecto
- **THEN** se listan todas las variables requeridas con su propósito, valores por defecto y ámbito (backend, frontend, docker)

### Requirement: Variables sin hardcodeo cuando exista env
El sistema MUST evitar valores hardcodeados en código cuando exista una variable de entorno equivalente definida en el esquema.

#### Scenario: Lectura desde env
- **WHEN** se ejecuta el backend o frontend con variables definidas
- **THEN** la configuración se toma desde las variables de entorno

### Requirement: Coherencia entre modos de ejecución
El sistema MUST permitir ejecutar local y con Docker usando el mismo conjunto de variables, con overrides claros por entorno.

#### Scenario: Local vs Docker
- **WHEN** se levanta el proyecto en local y con Docker
- **THEN** los valores de configuración son coherentes o explícitamente sobreescritos por entorno
