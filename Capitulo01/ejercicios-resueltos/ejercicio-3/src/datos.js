// Datos sintéticos generados en memoria: el ejercicio pide 5.000 objetos, sin backend.
const NOMBRES = ['Crédito', 'Libranza', 'Tarjeta', 'Rotativo', 'Vehículo', 'Microcrédito']
const ESTADOS = ['al día', 'en mora', 'en acuerdo', 'castigada']

export const CANTIDAD = 5000

export function generarDatos(cantidad = CANTIDAD) {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: i + 1,
    nombre: `${NOMBRES[i % NOMBRES.length]} ${String(i + 1).padStart(5, '0')}`,
    saldo: (i * 7919) % 5_000_000,
    estado: ESTADOS[i % ESTADOS.length],
    // Campos anidados: encarecen la conversión a proxy profundo de un ref normal.
    titular: { documento: 1_000_000_000 + i, ciudad: i % 2 === 0 ? 'Bogotá' : 'Medellín' }
  }))
}

// Las cinco pulsaciones que se miden en todas las variantes, para comparar peras con peras.
export const PULSACIONES = ['c', 'cr', 'cre', 'cred', 'credi']
