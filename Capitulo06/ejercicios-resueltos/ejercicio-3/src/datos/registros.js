// Los 5000 registros se generan en memoria con un bucle: sin red, sin backend, reproducible.
const CIUDADES = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga', 'Pereira']
const ESTADOS = ['pendiente', 'despachado', 'entregado', 'anulado']

export function generarRegistros(cantidad = 5000) {
  const registros = []
  for (let i = 0; i < cantidad; i++) {
    registros.push({
      id: i + 1,
      cliente: `Cliente ${String(i + 1).padStart(4, '0')}`,
      ciudad: CIUDADES[i % CIUDADES.length],
      estado: ESTADOS[i % ESTADOS.length],
      valor: 10000 + ((i * 7919) % 990000)
    })
  }
  return registros
}
