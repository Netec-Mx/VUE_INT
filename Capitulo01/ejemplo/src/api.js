// Mock para fines educativos: reemplaza la llamada real a `fetch('/api/obligaciones')`
// del capítulo, para que el ejemplo corra sin backend.

const NOMBRES = ['Crédito hipotecario', 'Libranza', 'Tarjeta', 'Rotativo', 'Vehículo']

function generarObligaciones(cantidad) {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: i + 1,
    nombre: `${NOMBRES[i % NOMBRES.length]} ${String(i + 1).padStart(4, '0')}`,
    saldo: Math.round((i * 7919) % 5_000_000)
  }))
}

// Simula la latencia de red con un setTimeout envuelto en una Promise.
export function obtenerObligaciones(cantidad = 2000, demoraMs = 300) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generarObligaciones(cantidad)), demoraMs)
  })
}
