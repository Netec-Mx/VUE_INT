<script setup>
import { ref } from 'vue'
import { api } from './api/cliente'

const bitacora = ref([])
const cargando = ref(false)
let controlActual = null

const escenarios = [
  { ruta: '/productos', titulo: 'Petición correcta' },
  { ruta: '/apagado', titulo: 'Backend apagado (tipo red)' },
  { ruta: '/privado', titulo: 'Respuesta 401 (tipo auth)' },
  { ruta: '/guardar', titulo: 'Respuesta 422 (tipo validacion)' },
  { ruta: '/roto', titulo: 'Respuesta 500 (tipo servidor)' }
]

// El componente ya no inspecciona la falla cruda: solo lee tipo, mensaje y estado.
async function ejecutar(ruta) {
  cargando.value = true
  controlActual = new AbortController()
  try {
    const respuesta = await api.get(ruta, { signal: controlActual.signal })
    bitacora.value.unshift({ ruta, tipo: 'ok', mensaje: JSON.stringify(respuesta.data) })
  } catch (problema) {
    bitacora.value.unshift({
      ruta,
      tipo: problema.tipo,
      mensaje: problema.mensaje,
      estado: problema.estado
    })
  } finally {
    cargando.value = false
    controlActual = null
  }
}

function cancelar() {
  controlActual?.abort()
}
</script>

<template>
  <main>
    <h1>Ejercicio 2 - Un solo lugar para los errores</h1>
    <p>
      El interceptor de respuesta traduce toda falla a <code>{ tipo, mensaje, estado }</code>.
      Ningún componente de este proyecto contiene la cadena <code>error</code>.<code>response</code>.
    </p>

    <p>
      <button v-for="e in escenarios" :key="e.ruta" :disabled="cargando" @click="ejecutar(e.ruta)">
        {{ e.titulo }}
      </button>
      <button :disabled="!cargando" @click="cancelar">Cancelar en curso (tipo cancelado)</button>
    </p>

    <table>
      <thead>
        <tr><th>Ruta</th><th>Tipo</th><th>Estado</th><th>Mensaje</th></tr>
      </thead>
      <tbody>
        <tr v-for="(registro, i) in bitacora" :key="i">
          <td>{{ registro.ruta }}</td>
          <td>{{ registro.tipo }}</td>
          <td>{{ registro.estado ?? '-' }}</td>
          <td>{{ registro.mensaje }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
main {
  font-family: system-ui, sans-serif;
  max-width: 52rem;
  margin: 2rem auto;
}
button {
  margin: 0.25rem;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #ddd;
  padding: 0.35rem 0.5rem;
  text-align: left;
}
</style>
