// Ejercicio 3: plugin de expiración con los cuatro TODO resueltos.
//
// Lee la opción propia "expiraEn" (en milisegundos) declarada en defineStore()
// y guarda en localStorage un objeto { state, marcaDeTiempo }. Al arrancar,
// hidrata solo si el dato sigue vigente; si expiró, borra la clave.

export const claveDe = (store) => `pinia:${store.$id}`

// Paso de hidratación, extraído a su propia función para poder invocarlo de
// nuevo desde la interfaz y simular una recarga de la página sin apretar F5.
export function hidratar(store, clave, expiraEn) {
  const guardado = localStorage.getItem(clave)

  // TODO 1 resuelto: si "guardado" existe, se parsea (trae { state, marcaDeTiempo })
  // y se calcula hace cuánto se escribió.
  if (guardado) {
    try {
      const { state, marcaDeTiempo } = JSON.parse(guardado)
      const transcurrido = Date.now() - marcaDeTiempo

      // TODO 2 resuelto: vigente significa transcurrido menor que expiraEn.
      if (Number.isFinite(marcaDeTiempo) && transcurrido < expiraEn) {
        store.$patch(state)
        return { hidratado: true, transcurrido }
      }

      // TODO 3 resuelto (rama "ya expiró").
      localStorage.removeItem(clave)
      return { hidratado: false, motivo: 'expirado', transcurrido }
    } catch (e) {
      // Dato corrupto o de una versión anterior: se descarta y se sigue.
      localStorage.removeItem(clave)
      return { hidratado: false, motivo: 'corrupto' }
    }
  }

  // TODO 3 resuelto (rama "no había nada guardado"): no dejar basura.
  localStorage.removeItem(clave)
  return { hidratado: false, motivo: 'vacio' }
}

export function expiracionPlugin({ store, options }) {
  if (!options.expiraEn) return // Paso 1 (dado): store sin expiración, nada que hacer.

  const clave = claveDe(store)

  hidratar(store, clave, options.expiraEn)

  store.$subscribe(
    (mutation, state) => {
      // TODO 4 resuelto: cada cambio de state se guarda junto con la marca de tiempo.
      localStorage.setItem(clave, JSON.stringify({ state, marcaDeTiempo: Date.now() }))
    },
    { detached: true }, // detached: la suscripción sobrevive al desmontaje del componente.
  )
}
