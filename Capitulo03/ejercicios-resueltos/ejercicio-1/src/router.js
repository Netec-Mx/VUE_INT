import { createRouter, createWebHistory } from 'vue-router'
import TiendaLayout from './layouts/TiendaLayout.vue'
import Catalogo from './views/Catalogo.vue'
import Carrito from './views/Carrito.vue'
import PedidoDetalle from './views/PedidoDetalle.vue'

const routes = [
  // La raíz solo reubica hacia la sección que sí tiene contenido.
  { path: '/', redirect: '/tienda' },
  {
    path: '/tienda',
    // El nombre NO va en el padre: iría a un RouterView vacío. Va en el hijo con path vacío.
    component: TiendaLayout,
    children: [
      // Hijo por defecto: se ve al entrar a /tienda, sin ninguna redirección de por medio.
      { path: '', name: 'catalogo', component: Catalogo },
      // Sin barra inicial, así que la URL resultante es /tienda/carrito.
      { path: 'carrito', name: 'carrito', component: Carrito },
      {
        path: 'pedidos/:id',
        name: 'pedido-detalle',
        component: PedidoDetalle,
        // props: true convierte route.params.id en la prop id del componente.
        props: true,
      },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
