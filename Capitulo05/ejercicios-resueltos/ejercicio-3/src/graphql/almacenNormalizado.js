import { reactive } from 'vue'

// Réplica mínima de InMemoryCache: una tabla plana de objetos, no de respuestas.
const tabla = reactive({})

// Identificador del objeto dentro de la tabla: __typename y id separados por dos puntos.
export function identificar(objeto) {
  return `${objeto.__typename}:${objeto.id}`
}

// Escribe cada objeto una sola vez y devuelve sus referencias, al estilo { "__ref": "Producto:42" }.
export function escribir(objetos) {
  return objetos.map((objeto) => {
    const clave = identificar(objeto)
    tabla[clave] = { ...tabla[clave], ...objeto }
    return { __ref: clave }
  })
}

export function leer(referencia) {
  return tabla[referencia.__ref] ?? null
}

export function leerVarias(referencias) {
  return referencias.map(leer).filter(Boolean)
}

export const tablaPlana = tabla
