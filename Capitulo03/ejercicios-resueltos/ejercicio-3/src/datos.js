export const productos = [
  { id: 1, nombre: 'Café tostado 500 g', precio: 28_000 },
  { id: 2, nombre: 'Panela pulverizada 1 kg', precio: 9_500 },
  { id: 3, nombre: 'Arroz premium 5 kg', precio: 24_900 },
]

const pedidos = {
  1: { id: 1, cliente: 'Tienda La Esquina', total: 182_000, estado: 'despachado' },
  2: { id: 2, cliente: 'Supermercado El Trigal', total: 96_500, estado: 'en alistamiento' },
  3: { id: 3, cliente: 'Minimercado Nueva Era', total: 341_200, estado: 'pendiente' },
}

export function buscarPedido(id) {
  return pedidos[Number(id)] ?? null
}
