// Plugin de auditoría: anota en la consola cada action, cuánto tardó y si falló
export function auditPlugin({ store }) {
  store.$onAction(({ name, after, onError }) => {    // avisa antes de cada action
    const id = `${store.$id}.${name}`                // ej.: projects.loadAll
    const start = performance.now()                  // arranca el cronómetro
    after(() => {                                    // si la action termina bien...
      const ms = performance.now() - start           // ...cuánto tardó
      console.info(id, ms.toFixed(1), 'ms')          // lo anota en la consola
    })
    onError((error) => {                             // si la action falla...
      console.error(id, error.message)               // ...anota el error, en rojo
    })
  })
}
