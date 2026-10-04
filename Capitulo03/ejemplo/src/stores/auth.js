import { reactive } from 'vue'

const CLAVE = 'capitulo3.auth'

function leerGuardado() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? null
  } catch {
    return null
  }
}

// El estado se crea una sola vez al importar el módulo, antes de que corra el primer beforeEach.
const estado = reactive({
  user: leerGuardado(),
  get isLoggedIn() {
    return this.user !== null
  },
  login(datos) {
    this.user = datos
    localStorage.setItem(CLAVE, JSON.stringify(datos))
  },
  logout() {
    this.user = null
    localStorage.removeItem(CLAVE)
  },
})

export function useAuth() {
  return estado
}
