// Mock para fines educativos: reemplaza al backend real de la empresa de logística.
// Se expone como una función async que resuelve tras un retardo, igual que una
// petición HTTP, para que useFetch se pueda escribir tal cual lo haría en producción.

const PAQUETES = [
  { id: 'ENV-1001', destinatario: 'Ana Ruiz', ciudad: 'Bogotá', estado: 'En tránsito', peso: 2.4 },
  { id: 'ENV-1002', destinatario: 'Carlos Mena', ciudad: 'Medellín', estado: 'Entregado', peso: 12.0 },
  { id: 'ENV-1003', destinatario: 'Lucía Peña', ciudad: 'Cali', estado: 'En bodega', peso: 0.8 },
  { id: 'ENV-1004', destinatario: 'Jorge Silva', ciudad: 'Barranquilla', estado: 'En tránsito', peso: 5.5 },
  { id: 'ENV-1005', destinatario: 'Marta Gil', ciudad: 'Bogotá', estado: 'Devuelto', peso: 3.1 },
  { id: 'ENV-1006', destinatario: 'Pedro Lara', ciudad: 'Bucaramanga', estado: 'Entregado', peso: 7.9 }
]

const CLIENTES = [
  { id: 'CLI-01', destinatario: 'Ana Ruiz', ciudad: 'Bogotá', estado: 'Activo', peso: 0 },
  { id: 'CLI-02', destinatario: 'Pedro Lara', ciudad: 'Bucaramanga', estado: 'Inactivo', peso: 0 }
]

const RUTAS = {
  '/api/paquetes': PAQUETES,
  '/api/clientes': CLIENTES
}

// Simula la latencia de red y el error 404 de una ruta inexistente.
export function consultar(url, retardo = 400) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const datos = RUTAS[url]
      if (!datos) {
        reject(new Error(`Ruta no encontrada: ${url}`))
        return
      }
      resolve(datos.map((fila) => ({ ...fila })))
    }, retardo)
  })
}

export const RUTAS_DISPONIBLES = Object.keys(RUTAS)
