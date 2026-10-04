import { servidorGraphql } from './servidorSimulado'

// Endpoint real, si el curso lo configura en .env; si no, se usa el servidor simulado.
const ENDPOINT = import.meta.env.VITE_GRAPHQL_URL

function nombreOperacion(documento) {
  return documento.match(/(?:query|mutation)\s+(\w+)/)?.[1] ?? ''
}

// Un solo punto de transporte. Aquí se contemplan los dos planos de error de GraphQL:
// la falla de red y el arreglo `errors` que llega con estado 200.
export async function ejecutar(documento, variables = {}) {
  let cuerpo

  if (ENDPOINT) {
    const respuesta = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: documento, variables })
    })
    // fetch no rechaza con un 500: la guarda es obligatoria.
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
    cuerpo = await respuesta.json()
  } else {
    cuerpo = await servidorGraphql({ operacion: nombreOperacion(documento), variables })
  }

  if (cuerpo.errors?.length) {
    const problema = new Error(cuerpo.errors[0].message)
    problema.tipo = 'validacion'
    throw problema
  }

  return cuerpo.data
}
