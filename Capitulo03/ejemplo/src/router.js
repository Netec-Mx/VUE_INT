// Traemos del paquete vue-router las funciones que necesitamos para armar el enrutador.
import { createRouter, createWebHistory } from 'vue-router'
// Traemos nuestro módulo de sesión, que sabe si hay un usuario dentro y cuál es su rol.
import { useAuth } from './stores/auth'
// La pantalla de ingreso se carga de una vez, porque es lo primero que verá quien no tiene sesión.
import Login from './views/Login.vue'

// Guardamos en una constante la función que descarga el tablero, para poder llamarla también por adelantado.
const Dashboard = () => import('./views/Dashboard.vue')

// Aquí empieza la lista de rutas: cada objeto describe una dirección de la aplicación.
const routes = [
  {
    // Esta es la dirección del formulario de ingreso.
    path: '/login',
    // Le ponemos un nombre para poder referirnos a ella sin escribir la dirección.
    name: 'login',
    // Dibujamos el componente Login, que ya está cargado en memoria.
    component: Login,
    // Anotamos que esta ruta es pública: no pide sesión para entrar.
    meta: { requiresAuth: false },
  },
  {
    // Esta es la dirección raíz y hace de contenedor de todo lo privado.
    path: '/',
    // El marco visual (menú, encabezado) también se descarga solo cuando hace falta.
    component: () => import('./layouts/AppLayout.vue'),
    // Anotamos aquí, una sola vez, que todo lo que cuelgue de esta ruta exige sesión.
    meta: { requiresAuth: true },
    // Las rutas hijas se dibujan dentro del RouterView que vive en AppLayout.
    children: [
      {
        // Cadena vacía significa: esta es la pantalla que se ve al entrar a la raíz.
        path: '',
        // Nombre corto para poder mandar al usuario aquí después de que inicie sesión.
        name: 'dashboard',
        // Reutilizamos la constante de arriba, así el mismo archivo sirve para cargar y para precargar.
        component: Dashboard,
      },
      {
        // Dirección completa resultante: /reportes, porque el padre aporta la barra inicial.
        path: 'reportes',
        name: 'reportes',
        // El código de esta pantalla viaja en un archivo aparte que solo se baja al entrar aquí.
        component: () => import('./views/Reportes.vue'),
      },
      {
        // Zona de administración, más restringida que el resto de lo privado.
        path: 'admin',
        name: 'admin',
        component: () => import('./views/Admin.vue'),
        // Además de sesión (heredada del padre), anotamos qué roles pueden entrar.
        meta: { roles: ['admin'] },
      },
    ],
  },
]

// Creamos el enrutador con la lista anterior y el modo de direcciones limpias, sin numeral.
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Esta función se ejecuta antes de CADA cambio de pantalla y decide si se permite.
router.beforeEach((to) => {
  // Consultamos el estado actual de la sesión en el momento exacto de la navegación.
  const auth = useAuth()

  // Caso 1: la pantalla pedida exige sesión y el usuario no la tiene.
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    // Lo mandamos al ingreso y guardamos en la dirección a dónde quería ir, para devolverlo luego.
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Caso 2: la pantalla exige un rol específico y el rol del usuario no está en la lista permitida.
  if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) {
    // Cancelamos el viaje: el usuario se queda donde estaba y no ve la pantalla restringida.
    return false
  }

  // Caso 3: el usuario ya tiene sesión pero está pidiendo el formulario de ingreso.
  if (to.name === 'login' && auth.isLoggedIn) {
    // No tiene sentido mostrarle el formulario, así que lo llevamos directo al tablero.
    return { name: 'dashboard' }
  }

  // Si ninguna condición anterior aplicó, no devolvemos nada y la navegación sigue su curso.
})

// Esta función corre cuando la navegación ya terminó; recibe el fallo si algo la impidió.
router.afterEach((to, from, failure) => {
  // Solo dejamos constancia en consola cuando efectivamente hubo un fallo.
  if (failure) console.warn('Navegación no completada:', failure.type, to.path)
})

// Aquí atrapamos los errores lanzados dentro de las funciones de control o al bajar un archivo.
router.onError((error, to) => {
  // Si el archivo de una pantalla ya no existe en el servidor (hubo un despliegue nuevo)...
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    // ...recargamos la página completa en la dirección pedida para traer la versión actualizada.
    window.location.href = to.fullPath
  }
})

// Exportamos la constante Dashboard para poder precargarla desde el formulario de ingreso.
export { Dashboard }
// Exportamos el enrutador para que el archivo principal de la aplicación lo conecte con Vue.
export default router
