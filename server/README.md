# Server (Backend)

[⬅ Volver al README principal](../README.md)

Este directorio contiene la API backend del AI Data Workshop, construida con Node.js, Express y Sequelize (PostgreSQL).

## Tecnologías principales
- Node.js 20+
- Express
- Sequelize (ORM para PostgreSQL)
- JWT para autenticación
- Docker (para base de datos)

## Funcionalidades
- Autenticación de usuarios (login y registro)
- Gestión de usuarios y roles
- Seeder para poblar la base de datos con datos de ejemplo
- Endpoints REST para autenticación y perfil
- Endpoint para recibir preguntas en lenguaje natural y consultar la IA (Groq)
- Generación dinámica del esquema de la base de datos para la IA
- Ejecución segura de SQL generado por la IA
- Endpoint para devolver resultados y SQL al frontend


## Estructura de carpetas clave
- `src/auth/`: Controladores y rutas de autenticación
- `src/users/`: Modelo y controladores de usuario
- `src/roles/`: Modelo y controladores de roles
- `src/ai/`: Controlador y servicio para integración con IA (Groq)
- `src/dbschema/`: Función para generación dinámica del esquema de la base de datos
- `configs/`: Configuración de base de datos, app y seeders
- `shared/helpers/`: Utilidades como generación de JWT

---

[Ir al frontend (client)](../client/README.md)
