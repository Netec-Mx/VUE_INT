# Ejercicio 2 - Trazar una variable desde el pipeline hasta la pantalla

App Vue que define `VITE_ENTORNO` en `.env.staging` y `.env.production` con valores distintos,
la muestra en el pie (`src/components/PieDeApp.vue`) y compila cada modo a una carpeta aparte.

## Archivos de entorno

| Archivo | `VITE_ENTORNO` | `VITE_API_URL` |
|---|---|---|
| `.env` | (común, no define entorno) | - |
| `.env.staging` | `staging` | `https://api-pruebas.cooperativa.co` |
| `.env.production` | `produccion` | `https://api.cooperativa.co` |

`.env.local` y `.env.*.local` están en `.gitignore`.

## Comandos

```bash
npm run build:staging      # vite build --mode staging    --outDir dist-staging
npm run build:production   # vite build --mode production --outDir dist-production
npm run build              # los dos, uno detrás del otro
npm run preview:staging    # sirve dist-staging
npm run preview:production # sirve dist-production
npm run verificar-fuga     # grep de "staging" dentro de dist-production/assets/
```

El texto visible de la página no nombra ningún entorno a propósito: así la única fuente
posible de esa palabra dentro del bundle es la variable, y el `grep` mide lo que debe medir.

## Por qué el valor de staging no aparece en el build de producción (las dos líneas pedidas)

Vite no lee `import.meta.env` en tiempo de ejecución: durante la compilación reemplaza cada
acceso por el **literal** del archivo `.env` del modo elegido, así que el build de producción
solo llega a contener la cadena `"produccion"`, nunca la de otro archivo.
Por eso `.env.staging` ni siquiera se abre al compilar con `--mode production`: no es un valor
que el bundle consulte después, es un texto que se incrusta una sola vez y se queda fijo.

## Validación aplicada (salida real)

```
dist-staging/assets/index-B-a-srZ9.js     63.90 kB   ✓ built in 1.48s
dist-production/assets/index-DiLoI7Nj.js  63.89 kB   ✓ built in 2.11s

grep -rc "staging" dist-production/assets/
  dist-production/assets/index-DiLoI7Nj.js:0
  dist-production/assets/index-C7HHOQiZ.css:0
  (código de salida 1 = ninguna coincidencia)

Valores realmente incrustados:
  dist-staging     -> staging     / api-pruebas.cooperativa.co
  dist-production  -> produccion  / api.cooperativa.co
```
