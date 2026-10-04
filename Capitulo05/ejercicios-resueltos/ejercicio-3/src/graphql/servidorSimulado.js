// Punto único POST /graphql simulado. Devuelve siempre __typename,
// que es la pieza de la que depende el cache normalizado para identificar objetos.
const catalogo = [
  { __typename: 'Producto', id: '42', nombre: 'Café Sierra Nevada', precio: 18000 },
  { __typename: 'Producto', id: '51', nombre: 'Café Huila', precio: 21000 },
  { __typename: 'Producto', id: '77', nombre: 'Café Nariño', precio: 23500 }
]

let llamadas = 0

export function llamadasGraphql() {
  return llamadas
}

function responder(cuerpo, ms = 350) {
  return new Promise((resolver) => setTimeout(() => resolver(cuerpo), ms))
}

// Resuelve la operación por su nombre. Un servidor real haría esto con su esquema tipado.
export function servidorGraphql({ operacion, variables }) {
  llamadas += 1

  if (operacion === 'ProductosDestacados') {
    return responder({ data: { destacados: catalogo.map((item) => ({ ...item })) } })
  }

  if (operacion === 'ActualizarPrecio') {
    const item = catalogo.find((elemento) => elemento.id === variables.id)
    if (!item) {
      // Error de GraphQL: llega con estado 200 y un arreglo `errors` junto a los datos.
      return responder({ data: null, errors: [{ message: 'El producto no existe' }] })
    }
    item.precio = variables.precio
    // La mutación devuelve la entidad con su identificador y su tipo: el cache la reconoce.
    return responder({ data: { actualizarPrecio: { ...item } } })
  }

  return responder({ data: null, errors: [{ message: `Operación desconocida: ${operacion}` }] })
}
