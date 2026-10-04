# Procedimiento de rollback - rutas-cooperativa

> Escrito **antes** del ensayo, tal como exige el ejercicio. Este archivo no se modifica
> durante el incidente: se sigue al pie de la letra y después se compara con lo que
> realmente se hizo.

## Control de cambios

| Versión | Fecha | Autor | Descripción del cambio |
|---|---|---|---|
| 1.0 | 2026-09-20 | Andrés García | Versión inicial escrita antes del ensayo cronometrado |

## Quién puede ejecutarlo

Cualquier persona del turno, **sin pedir autorización**, cuando se cumpla uno de los
criterios de activación. La autorización previa es la diferencia entre 4 minutos y 40.

## Criterios de activación

- Tasa de error por encima del 2 % de las sesiones durante 5 minutos seguidos.
- Una ruta crítica (inicio de sesión, registro de ruta del día) deja de completarse.
- El indicador de negocio cae más del 30 % contra la misma hora del día anterior.

## Los tres pasos exactos

1. **Abrir** la pestaña *Actions* del repositorio y localizar la ejecución verde del flujo
   `Construir y desplegar la app Vue` inmediatamente anterior a la que rompió.
2. **Ejecutar** "Re-run all jobs" sobre esa ejecución. Publica el mismo artefacto ya
   compilado; no recompila desde el código actual y no requiere escribir nada.
3. **Verificar** en la URL pública con recarga forzada (Ctrl+Shift+R) que la ruta principal
   responde, y confirmar que el pie muestra el hash de la versión anterior.

Alternativa sin interfaz, mismo efecto:

```bash
gh run list --workflow=deploy.yml --branch=main --limit 5
gh run rerun <ID-DE-LA-EJECUCION-ANTERIOR>
gh run watch <ID-DE-LA-EJECUCION-ANTERIOR>
```

## Lo que NO se hace durante el rollback

- No se investiga la causa raíz. Primero se restablece el servicio.
- No se ejecuta `git revert` ni se recompila: eso arrastra cambios de dependencias que no
  estaban en el artefacto bueno y es el camino más lento.
- No se toca el backend. Si el despliegue vino con un cambio incompatible de API o una
  migración, este procedimiento no alcanza y se escala al responsable del backend.

## Después de restablecer

- Anotar los tiempos en `bitacora-ensayo.md`.
- Conservar el artefacto roto para el análisis posterior.
- Si algún paso hubo que improvisarlo, este documento se corrige y el ensayo se repite.
