import { createRouter, createWebHistory } from 'vue-router'    // funciones para crear el enrutador
import { useSesion } from '../sesion'                          // la guardia consulta la sesión
import LoginView from '../views/LoginView.vue'                  // pantalla pública de ingreso
import ForbiddenView from '../views/ForbiddenView.vue'          // aviso de acceso prohibido
import ProjectHubLayout from '../views/ProjectHubLayout.vue'    // marco con el menú del área de trabajo
import NotFoundView from '../views/NotFoundView.vue'            // página para direcciones que no existen
import ChunkRecoveryView from '../views/ChunkRecoveryView.vue'  // aviso cuando falla la descarga de una vista
const DashboardView = () => import('../views/DashboardView.vue')  // con la flecha, se descarga al visitarla
const ProjectsView = () => import('../views/ProjectsView.vue')    // archivo aparte, bajo demanda
const TaskDetailView = () => import('../views/TaskDetailView.vue') // archivo aparte, bajo demanda
const AdminView = () => import('../views/AdminView.vue')          // solo lo descarga quien entra a /admin

const routes = [                                                // la tabla: dirección -> componente
  { path: '/', redirect: { name: 'dashboard' } },               // la raíz lleva al tablero, por nombre
  { path: '/login', name: 'login', component: LoginView },      // pública
  { path: '/forbidden', name: 'forbidden', component: ForbiddenView }, // pública
  { path: '/chunk-recovery', name: 'chunk-recovery', component: ChunkRecoveryView }, // pública
  {
    path: '/app',                                               // ruta padre del área de trabajo
    component: ProjectHubLayout,                                // su RouterView dibuja a los hijos
    meta: { requiresAuth: true },                               // requisito: los hijos lo heredan
    children: [                                                 // hijas: /app/dashboard, /app/projects...
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'projects', name: 'projects', component: ProjectsView },
      { path: 'tasks/:taskId', name: 'task-detail', component: TaskDetailView, props: true }, // :taskId llega como prop
    ],
  },
  { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAuth: true, roles: ['admin'] } }, // solo admin
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }, // comodín: siempre de último
]

const router = createRouter({                                   // el enrutador de la aplicación
  history: createWebHistory(import.meta.env.BASE_URL),          // direcciones limpias, sin #
  routes,                                                       // la tabla de arriba
})

router.beforeEach((to) => {                                     // la guardia: corre antes de CADA navegación
  const { conectado, usuario } = useSesion()                    // estado de la sesión en este momento
  if (to.meta.requiresAuth && !conectado.value) {               // pide sesión y no hay
    return { name: 'login', query: { redirect: to.fullPath } }  // al ingreso, recordando a dónde iba
  }
  if (to.meta.roles && !to.meta.roles.includes(usuario.value.rol)) { // pide un rol que no tiene
    return { name: 'forbidden' }                                // lo manda al aviso de prohibido
  }
  if (to.name === 'login' && conectado.value) return { name: 'dashboard' } // ya entró: no repite el ingreso
})                                                              // sin return, la navegación sigue

router.afterEach((to) => {                                      // corre al terminar cada navegación
  if (to.name === 'login') DashboardView()                      // precarga: desde el ingreso casi todos van al tablero
})

router.afterEach((to, from, failure) => {                       // segundo oyente: navegaciones que no se completaron
  if (failure) console.info('[ProjectHub] Navegación no completada:', failure.message) // aviso, no error
})

router.onError((error, to) => {                                 // errores al navegar, como una descarga fallida
  const perdido = /dynamically imported module|Importing a module script failed/i.test(error.message) // ¿falló la descarga?
  if (perdido) router.replace({ name: 'chunk-recovery', query: { target: to.fullPath } }) // muestra el aviso
})

export default router                                           // main.js lo conecta a la aplicación
