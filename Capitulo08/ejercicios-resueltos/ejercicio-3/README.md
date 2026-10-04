# Ejercicio 3 - Ensayo de incidente cronometrado

Este ejercicio **no es código de aplicación**: es el procedimiento operativo y el registro
del ensayo. Lo entregable es que el procedimiento esté escrito antes del incidente y que
coincida con lo que realmente se hizo.

## Contenido

| Archivo | Qué es |
|---|---|
| `procedimiento-rollback.md` | Los tres pasos exactos, escritos antes de romper nada. Incluye criterios de activación y quién está autorizado |
| `bitacora-ensayo.md` | Cronometraje real por fases (detección, decisión, ejecución, verificación) y la brecha de detección que queda abierta |
| `.github/workflows/rollback.yml` | Rollback como flujo manual: descarga el artefacto de una ejecución anterior y lo republica sin recompilar |
| `version-rota/VistaRutas.vue.txt` | La versión que rompe la ruta principal al montar, para reproducir el ensayo |

## Resultado del ensayo

Detección a servicio restablecido: **2 min 50 s**, por debajo del objetivo de 5 minutos, sin
recompilar y sin escribir código nuevo. El procedimiento escrito se siguió sin improvisar
ningún paso; el único ajuste fue precisar "recarga forzada" en el paso de verificación.

La detección fue **mirando la pantalla, no por una alerta**: esa es la brecha que queda
abierta y el plan para cerrarla está al final de `bitacora-ensayo.md`.

## Por qué `rollback.yml` no recompila

`actions/download-artifact` recupera el `dist/` que la ejecución buena ya guardó y
`actions/deploy-pages` lo publica tal cual. Compartir `concurrency: pages` con `deploy.yml`
garantiza que un rollback cancele cualquier despliegue en curso, que es exactamente el
comportamiento que se quiere en un incidente.

## Validación aplicada

Es un ejercicio de documentación más un pipeline. Lo validable de forma automática es el
YAML:

```bash
python3 -c "import yaml, sys; yaml.safe_load(open(sys.argv[1])); print('YAML valido')" \
  .github/workflows/rollback.yml
```

El cronometraje de los archivos Markdown corresponde a un ensayo sobre un repositorio de
GitHub real con Pages activo; no es reproducible dentro de esta carpeta del curso y se
documenta como tal.
