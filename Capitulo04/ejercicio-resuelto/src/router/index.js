import { createRouter, createWebHistory } from 'vue-router' // repaso del capítulo 3
import { useAuthStore } from '@/stores/auth.js'             // la tienda de sesión

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),      // direcciones limpias, sin #
  routes: [
    { path: '/', redirect: '/proyectos' },                  // la raíz lleva a proyectos
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') }, // carga perezosa
    {
      path: '/proyectos',
      component: () => import('@/views/ProjectsView.vue'),  // se descarga solo al visitarla
      meta: { requiresAuth: true },                         // exige sesión
    },
  ],
})

router.beforeEach((to) => {                                 // antes de cada navegación
  const auth = useAuthStore()                               // DENTRO de la guardia: Pinia ya está instalada
  if (to.meta.requiresAuth && !auth.isAuthenticated) {      // ¿pide sesión y no la hay?
    return { name: 'login', query: { redirect: to.fullPath } } // al formulario, guardando el destino
  }
  return true                                               // si no, adelante
})

export default router                                       // main.js lo instala
