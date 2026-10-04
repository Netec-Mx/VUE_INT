// Servidor REST simulado: una promesa con retardo, sin dependencias ni red.
const catalogo = [
  { id: 42, nombre: 'Café Sierra Nevada', precio: 18000 },
  { id: 51, nombre: 'Café Huila', precio: 21000 },
  { id: 77, nombre: 'Café Nariño', precio: 23500 }
]

export let peticionesRest = 0

function retardo(valor, ms = 350) {
  return new Promise((resolver) => setTimeout(() => resolver(valor), ms))
}

export function obtenerDestacados() {
  peticionesRest += 1
  return retardo(catalogo.map((producto) => ({ ...producto })))
}

export function guardarPrecio(id, precio) {
  peticionesRest += 1
  const producto = catalogo.find((elemento) => elemento.id === id)
  producto.precio = precio
  // La respuesta de la mutación trae la entidad completa con su identificador.
  return retardo({ ...producto })
}

export function contadorPeticiones() {
  return peticionesRest
}
