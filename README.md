# AI Data Workshop - Fundación Kinal

Este proyecto sirve como base para el Workshop de IA, proporcionando una estructura robusta con autenticación y gestión de usuarios. El objetivo principal es servir de punto de partida para integrar capacidades de Inteligencia Artificial con bases de datos relacionales en aplicaciones modernas.

## Requisitos Previos


Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

### 1. Node.js (versión 20 o superior)


Entorno de ejecución para JavaScript.

- [Descargar Node.js (LTS)](https://nodejs.org/en/download/)


### 2. pnpm


Gestor de paquetes rápido y eficiente.

- [Instrucciones de instalación de pnpm](https://pnpm.io/installation)


### 3. Docker


Plataforma para contenedores que gestionará la base de datos PostgreSQL.

- [Docker Desktop para Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop para Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Docker Engine para Linux](https://docs.docker.com/engine/install/)

---

### Herramientas sugeridas para una mejor experiencia (opcionales)

- **pgAdmin**: Cliente gráfico para administrar y explorar bases de datos PostgreSQL.
	- [Descargar pgAdmin](https://www.pgadmin.org/download/)
- **Postman**: Cliente para probar y documentar APIs REST.
	- [Descargar Postman](https://www.postman.com/downloads/)



## Instalación y Configuración



```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
cd nombre-del-repo
```

### 2. Instalar dependencias

```bash
pnpm i
```

### 3. Inicializar el proyecto

Este comando preparará los archivos de entorno (.env) y las configuraciones necesarias.

```bash
pnpm init-project
```

### 4. Levantar el entorno de desarrollo

Este comando iniciará la base de datos y la API utilizando Docker, permitiendo ver los cambios en tiempo real.

```bash
pnpm docker:dev
```

---

## Información Adicional


El proyecto utiliza una arquitectura de monorepo gestionada por pnpm-workspaces.

- [Ir al frontend (client)](client/README.md)
- [Ir al backend (server)](server/README.md)
- **Client**: Aplicación frontend construida con React y Vite.
- **Server**: API REST construida con Node.js, Express y Sequelize (PostgreSQL).
- **Scripts**: Utilidades para la configuración automatizada del entorno.
