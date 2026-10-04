import axios from 'axios'

// Única instancia configurada: baseURL y timeout viven aquí, no en los componentes.
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

// Catálogo local de respaldo, por si se quiere correr el ejercicio sin salida a internet.
const catalogoLocal = {
  1: { id: 1, title: 'Café Sierra Nevada', precio: 18000 },
  2: { id: 2, title: 'Café Huila', precio: 21000 },
  3: { id: 3, title: 'Café Nariño', precio: 23500 }
}

export function obtenerProductoLocal(id) {
  return new Promise((resolver, rechazar) => {
    setTimeout(() => {
      const producto = catalogoLocal[id]
      if (producto) resolver(producto)
      else rechazar(new Error(`No existe el producto ${id}`))
    }, 300)
  })
}
