
# Client (Frontend)

[⬅ Volver al README principal](../README.md)

Este directorio contiene la aplicación frontend del AI Data Workshop, construida con React y Vite.

## Tecnologías principales
- React 18
- Vite
- Tailwind CSS
- react-hot-toast
- Axios

## Funcionalidades
- Autenticación de usuarios (login y registro)
- Visualización de perfil de usuario
- Dashboard con panel de consultas
- Visualización y envío de preguntas en lenguaje natural a la IA
- Visualización del SQL generado por la IA
- Mostrar resultados de la consulta en formato tabla, texto o gráfico
- Feedback visual de errores y loading
- Estructura lista para consumir API REST


## Estructura de carpetas y componentes clave
- `src/pages/`: Páginas principales (`AuthPage`, `DashboardPage`)
- `src/components/auth/`: Componentes de autenticación (`LoginForm`, `RegisterForm`)
- `src/components/dashboard/`: Componentes del dashboard (`UserProfile`, `QueryInput`, `AnalysisResult`, `SqlPreview`)
- `src/services/`: Servicios para consumir la API REST y la IA
- `src/hooks/`: Hooks personalizados para login, registro y consultas
- `src/lib/`: Utilidades y helpers


---

[Ir al backend (server)](../server/README.md)
