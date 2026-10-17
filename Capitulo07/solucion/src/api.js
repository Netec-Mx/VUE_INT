// Servicio real de datos. En las pruebas de componente se reemplaza por un doble.
export const api = {
  async listarProductos() {                                      // devuelve la lista de productos
    const respuesta = await fetch('/api/productos.json')         // archivo que Vite sirve desde public/
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`) // un 404 o un 500 se vuelven error
    return respuesta.json()                                      // convierte el texto JSON en objetos
  }
}
