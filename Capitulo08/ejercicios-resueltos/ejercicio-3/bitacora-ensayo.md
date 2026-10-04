# Bitácora del ensayo de incidente - rutas-cooperativa

Ensayo del 2026-09-20, en horario laboral, con el procedimiento de
`procedimiento-rollback.md` ya escrito y cerrado antes de empezar.

## Versión rota que se desplegó a propósito

`src/modules/rutas/components/VistaRutas.vue` con un fallo al montar:

```js
onMounted(() => {
  // Rompe la ruta principal: el objeto no existe y la vista queda en blanco.
  console.log(configuracionInexistente.valor)
})
```

Commit `a3f9b2c`, desplegado por el flujo `deploy.yml` a las 10:02.

## Cronometraje

| Fase | Reloj | Duración | Qué pasó |
|---|---|---|---|
| Despliegue de la versión rota | 10:02:00 | - | El flujo termina en verde: CI no detecta un error de ejecución |
| **Detección** | 10:04:20 | 2 min 20 s | Pantalla en blanco al abrir la URL pública |
| **Decisión** | 10:04:50 | 30 s | Se cumple el criterio "ruta crítica no completa"; se ejecuta sin consultar |
| **Ejecución** | 10:06:35 | 1 min 45 s | "Re-run all jobs" sobre la ejecución anterior; publica el artefacto guardado |
| **Verificación** | 10:07:10 | 35 s | Recarga forzada: la ruta responde y el pie muestra el hash anterior |
| **Total detección a servicio restablecido** | | **2 min 50 s** | Por debajo del objetivo de 5 minutos |

Sin recompilar y sin escribir una sola línea de código nuevo: se republicó el artefacto que
ya existía.

## ¿El procedimiento escrito coincidió con lo ejecutado?

Sí. Los tres pasos se siguieron en orden y ninguno hubo que improvisarlo. El único ajuste
fue de redacción: el paso 3 ahora dice explícitamente "recarga forzada", porque la primera
recarga normal sirvió el `index.html` viejo desde caché y por unos segundos pareció que el
rollback no había funcionado.

## Cómo se supo que estaba roto - la brecha que queda abierta

**Mirando la pantalla, no por una alerta.** Esa es la siguiente brecha a cerrar, y es la más
cara: los 2 min 20 s de detección fueron suerte, porque alguien tenía la URL abierta. De
noche o un domingo habrían sido horas.

Plan para cerrarla, en orden de esfuerzo:

1. Enviar los errores del `errorHandler` global a un servicio real (Sentry o Bugsnag) con
   la versión del despliegue adjunta, en vez del `console.error` del laboratorio.
2. Alerta por **tasa**, no por evento: más del 2 % de sesiones con error durante 5 minutos
   dispara notificación al canal del turno.
3. Chequeo sintético cada minuto contra la ruta principal, que es lo único que detecta una
   pantalla en blanco cuando no hay usuarios conectados para generar errores.

Mientras esas tres no existan, el tiempo de detección no es un número controlado: es azar.
