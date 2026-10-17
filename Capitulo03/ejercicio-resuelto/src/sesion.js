import { ref, computed } from 'vue'                          // estado reactivo y valores calculados

const cuentas = {                                            // cuentas de prueba: correo -> datos del usuario
  'user@projecthub.dev': { nombre: 'Úrsula', rol: 'user' },
  'admin@projecthub.dev': { nombre: 'Ada', rol: 'admin' },
}
const usuario = ref(null)                                    // fuera de la función: una sola sesión para toda la app
const conectado = computed(() => usuario.value !== null)     // true cuando alguien inició sesión

async function entrar(correo) {                              // simula la llamada al servidor de autenticación
  await new Promise((listo) => setTimeout(listo, 300))       // espera 300 ms, como haría la red
  if (!cuentas[correo]) throw new Error('Ese correo no está registrado.') // la vista muestra este mensaje
  usuario.value = cuentas[correo]                            // guarda quién entró
}

function salir() {                                           // cierra la sesión
  usuario.value = null                                       // sin usuario, la guardia vuelve a pedir ingreso
}

export function useSesion() {                                // el composable entrega el estado y las acciones
  return { usuario, conectado, entrar, salir }
}
