<!-- Idioma: es-CO (español de Colombia) -->
# Vue Intermedio (VUE_INT)

Laboratorios del curso Vue Intermedio de Netec: consolidar y aplicar conceptos intermedios y avanzados de Vue 3.5 (reactividad, composición de componentes, enrutamiento, estado, comunicación con servicios, rendimiento, pruebas y despliegue) para construir aplicaciones escalables.

## Cómo se trabaja en cada laboratorio

- **Construyes tú, paso a paso.** Cada práctica arranca en una carpeta vacía y la guía trae todo el código para copiar, con la ruta exacta del archivo. No hay que clonar ni descargar nada.
- **Cada paso tiene la misma forma:** qué vas a hacer y por qué, dónde, el código o comando, y qué debes ver.
- **Funciona igual en Windows, macOS y Linux.** Los comandos son de `npm`, `npx`, `node`, `git` o `docker`; si alguno cambia según el sistema, la guía muestra las dos variantes.
- **Laboratorio resuelto:** cada capítulo trae la carpeta `ejercicio-resuelto/` con el proyecto terminado, para comparar al final o si te atascas.

Antes de empezar, prepara el equipo con la guía de instalación del curso (SUG, Setup Guide): Node.js 22, Git, Google Chrome, Visual Studio Code con la extensión Vue (Official) y, para la práctica 8, Docker.

## Lista de laboratorios

| Capítulo | Práctica | Duración | Qué construyes |
|---|---|---|---|
| 1 | [Práctica 1.4: diagnóstico y optimización de dibujos en una SPA](Capitulo01/README.md) | 24 min | Catálogo que mide sus propios dibujos y los baja de 12 a 1 con `computed`, props y `shallowRef` |
| 2 | [Práctica 2.4: refactorizar componentes a Composition API y crear composables](Capitulo02/README.md) | 30 min | Lista de tareas que pasa de Options API a composables, `provide`/`inject` con `Symbol` y un componente sin interfaz |
| 3 | [Práctica 3.4: flujo de autenticación con rutas protegidas y carga dinámica](Capitulo03/README.md) | 46 min | Inicio de sesión simulado con guardias, roles, rutas anidadas y carga perezosa con recuperación de errores |
| 4 | [Práctica 4.4: diseñar y aplicar una arquitectura de stores para una aplicación compleja](Capitulo04/README.md) | 46 min | Varias stores de Pinia que colaboran, con un plugin propio de persistencia y acciones asíncronas |
| 5 | [Práctica 5.4: clientes REST y GraphQL con manejo de caché y errores](Capitulo05/README.md) | 46 min | Cliente REST con Axios y cliente GraphQL con Apollo sobre un servidor simulado (MSW, Mock Service Worker), con caché normalizada y errores unificados |
| 6 | [Práctica 6.4: aplicar optimizaciones y medir mejoras en una SPA real](Capitulo06/README.md) | 46 min | Medición antes y después: división de código, carga diferida y análisis del paquete |
| 7 | [Práctica 7.4: crear una estrategia de pruebas para una aplicación Vue](Capitulo07/README.md) | 46 min | Pruebas unitarias y de componentes con Vitest y recorridos de punta a punta con Cypress |
| 8 | [Práctica 8.4: diseñar y desplegar una aplicación escalable con pipeline automatizado](Capitulo08/README.md) | 43 min | Monorrepositorio con pnpm, imagen de Docker y flujo de integración continua en GitHub Actions |

## Estructura del repositorio

```text
CapituloNN/
  README.md            guía paso a paso de la práctica
  ejercicio-resuelto/  proyecto terminado de la práctica
```

## Versiones

Vue 3.5, Vue Router 4, Pinia 3, Vite 6.4, Vitest 3 y Cypress 14. Se usa Vite 6.4 porque funciona con Node.js 20.18 o superior y con Node.js 22.

## Control de cambios

| Versión | Fecha | Autor | Cambio |
|---|---|---|---|
| 2.0 | 2026-10-17 | Andrés Eduardo García Márquez | Índice de las 8 prácticas rehechas desde carpeta vacía, con su duración, lo que se construye y la carpeta `ejercicio-resuelto/` |
