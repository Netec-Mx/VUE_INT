// Datos generados en memoria con un bucle: el ejemplo no depende de la red ni de un backend.
const CLIENTES = [
  'Distribuidora Andina', 'Ferretería El Roble', 'Panadería La Espiga',
  'Textiles del Valle', 'Importadora Caribe', 'Lácteos San José',
  'Papelería Central', 'Transportes Rápido', 'Café de Origen', 'Droguería Salud'
]

const ESTADOS = ['pendiente', 'despachado', 'entregado', 'anulado']

export function cargarPedidosIniciales(cantidad = 500) {
  const pedidos = []
  for (let i = 0; i < cantidad; i++) {
    pedidos.push({
      id: i + 1,
      cliente: `${CLIENTES[i % CLIENTES.length]} #${i + 1}`,
      estado: ESTADOS[i % ESTADOS.length],
      valor: 10000 + ((i * 7919) % 990000),
      ciudad: i % 2 === 0 ? 'Bogotá' : 'Medellín'
    })
  }
  return pedidos
}
