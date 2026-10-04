# Ejemplo comentado - Pipeline de CI/CD para una app Vue

Este ejemplo no es una aplicación Vue: es el **pipeline de GitHub Actions** de la sección
"Ejemplo de código comentado" del capítulo 8. El archivo vive en
`.github/workflows/deploy.yml`, que es la ruta exacta donde GitHub busca los flujos.

## Qué hace, en orden

1. **Se dispara** con cada push a `main` y también a mano (`workflow_dispatch`), que es el
   botón "Run workflow" de la pestaña Actions.
2. **Pide permisos mínimos**: leer el código, escribir en GitHub Pages y pedir un token de
   identidad para publicar. Nada más.
3. **Hace fila** (`concurrency: pages`): si llega un despliegue nuevo mientras corre otro,
   el viejo se cancela y no se encima con el nuevo.
4. **Trabajo `build`**: descarga el código, fija Node 22, instala con `npm ci` (no
   `npm install`), y encadena lint, type-check, tests unitarios y build. Si cualquiera de
   esos pasos falla, el flujo se detiene ahí y no se publica nada.
5. **Inyecta las variables de compilación**: `VITE_API_URL` desde la configuración del
   repositorio y `VITE_APP_VERSION` con `${{ github.sha }}`, que es el identificador del
   commit. Ese valor es el que después se muestra en el pie de la app.
6. **Empaqueta `dist/`** con `upload-pages-artifact` y lo entrega al siguiente trabajo.
7. **Trabajo `deploy`**: solo arranca si `build` terminó bien (`needs: build`) y publica el
   mismo artefacto en el entorno `github-pages`, devolviendo la URL pública.

## Los tres detalles que el capítulo remarca

- **`npm ci`, no `npm install`**: instala exactamente lo del `package-lock.json` y falla si
  el lockfile está desfasado. Elimina el clásico "en mi máquina sí compila".
- **Un solo artefacto**: `build` compila una vez y `deploy` publica ese mismo paquete. No
  se recompila por entorno.
- **`github.sha` en vez de `git rev-parse`**: el runner puede clonar sin historia completa,
  así que se toma el hash de la variable que GitHub ya expone.

## Validación aplicada

Como es un archivo YAML y no una app Vue, no aplica `npm run build`. Se valida la sintaxis:

```bash
python3 -c "import yaml, sys; yaml.safe_load(open(sys.argv[1])); print('YAML valido')" \
  .github/workflows/deploy.yml
```
