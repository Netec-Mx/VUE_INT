// API simulada (mock para fines educativos): no hay servidor real detrás.
// "modoFalla" permite forzar el error desde la interfaz y comprobar el punto
// clave del ejercicio: que "loading" vuelva a false aunque la petición falle.

function demorar(ms) {
  return new Promise((resolver) => setTimeout(resolver, ms))
}

export const api = {
  modoFalla: false,

  async getPedidos() {
    await demorar(500)
    if (api.modoFalla) throw new Error('El servidor respondió 500: pedidos no disponibles')
    return [
      { id: 101, fecha: '2026-09-02', valor: 96000 },
      { id: 102, fecha: '2026-09-11', valor: 42000 },
      { id: 103, fecha: '2026-09-18', valor: 128000 },
    ]
  },
}
