// API simulada (mock para fines educativos): no hay servidor real detrás.
// Cada función devuelve una promesa que se resuelve o se rechaza tras un retardo,
// para que el estudiante pueda ver el estado "loading" y probar el manejo de errores.

const CUPONES = {
  ANDINO10: { clave: 'ANDINO10', porcentaje: 0.1 },
  PROMO20: { clave: 'PROMO20', porcentaje: 0.2 },
}

function demorar(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms))
}

export const api = {
  // Valida el texto recibido contra la tabla de arriba. Rechaza cuando no existe,
  // así se puede ejercitar el bloque catch de la action aplicarCupon.
  async validarCupon(texto) {
    await demorar(400)
    const encontrado = CUPONES[String(texto).trim().toUpperCase()]
    if (!encontrado) throw new Error(`El descuento "${texto}" no existe o ya venció`)
    return encontrado
  },

  // Catálogo de ejemplo: café colombiano, para tener productos que agregar al carrito.
  async getProductos() {
    await demorar(200)
    return [
      { id: 1, nombre: 'Café Huila 500 g', precio: 32000 },
      { id: 2, nombre: 'Café Nariño 500 g', precio: 35000 },
      { id: 3, nombre: 'Café Sierra Nevada 250 g', precio: 21000 },
    ]
  },
}
