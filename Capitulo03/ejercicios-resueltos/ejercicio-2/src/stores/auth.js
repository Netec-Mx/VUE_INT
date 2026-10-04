import { reactive } from 'vue'

const CLAVE = 'capitulo3.ej2.auth'

function leerGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? null
  } catch {
    return null
  }
}

// Único dueño del estado de acceso. El router lo lee, nunca lo modifica.
const estado = reactive({
  user: leerGuardado(),
  get isLoggedIn() {
    return this.user !== null
  },
  get rol() {
    return this.user?.rol ?? null
  },
  entrarComo(rol) {
    this.user = { nombre: rol, rol }
    localStorage.setItem(CLAVE, JSON.stringify(this.user))
  },
  salir() {
    this.user = null
    localStorage.removeItem(CLAVE)
  },
})

export function useAuth() {
  return estado
}
