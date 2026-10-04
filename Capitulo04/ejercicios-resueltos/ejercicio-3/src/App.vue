<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useBorradorStore, EXPIRA_EN } from './stores/borrador.js'
import { usePreferenciasStore } from './stores/preferencias.js'
import { claveDe, hidratar } from './plugins/expiracion.js'

const borrador = useBorradorStore()
const preferencias = usePreferenciasStore()
const { titulo, lineas, cantidad } = storeToRefs(borrador)
const { tema } = storeToRefs(preferencias)

const clave = claveDe(borrador)
const texto = ref('')
const bitacora = ref([])
const ahora = ref(Date.now())

let reloj
onMounted(() => {
  reloj = setInterval(() => (ahora.value = Date.now()), 250)
})
onUnmounted(() => clearInterval(reloj))

// Segundos que le quedan de vigencia a lo guardado en localStorage.
function vigencia() {
  const guardado = localStorage.getItem(clave)
  if (!guardado) return null
  const { marcaDeTiempo } = JSON.parse(guardado)
  const restante = EXPIRA_EN - (ahora.value - marcaDeTiempo)
  return restante > 0 ? (restante / 1000).toFixed(1) : '0.0'
}

// Simula un F5: toma la foto de localStorage, deja el store como recién creado
// y vuelve a ejecutar la hidratación del plugin sobre esa misma foto.
async function simularRecarga() {
  const instantanea = localStorage.getItem(clave)
  borrador.$reset()
  await nextTick() // Se deja que la suscripción escriba el state vacío...
  if (instantanea) localStorage.setItem(clave, instantanea)
  else localStorage.removeItem(clave)

  const resultado = hidratar(borrador, clave, EXPIRA_EN)

  await nextTick()
  // El plugin real hidrata antes de suscribirse, así que la marca original no
  // se toca; aquí se restaura para que el reloj de expiración siga corriendo.
  if (resultado.hidratado && instantanea) localStorage.setItem(clave, instantanea)

  bitacora.value.unshift(
    resultado.hidratado
      ? `Hidratado: el dato tenía ${Math.round(resultado.transcurrido)} ms de escrito`
      : `Descartado (${resultado.motivo}); la clave ${clave} quedó borrada`,
  )
}

function agregar() {
  borrador.agregarLinea(texto.value)
  texto.value = ''
}
</script>

<template>
  <main>
    <h1>Ejercicio 3 - plugin de expiración</h1>
    <p>Los datos del store <code>borrador</code> caducan a los {{ EXPIRA_EN / 1000 }} segundos.</p>

    <label>
      Título:
      <input v-model="titulo" placeholder="Lista de mercado" />
    </label>

    <p>
      <input v-model="texto" placeholder="Nueva línea" @keyup.enter="agregar" />
      <button @click="agregar">Agregar línea</button>
      <button :disabled="cantidad === 0" @click="borrador.vaciar()">Vaciar</button>
    </p>

    <ul>
      <li v-for="linea in lineas" :key="linea.id">{{ linea.texto }}</li>
    </ul>

    <p>Vigencia restante de lo guardado: {{ vigencia() ?? 'no hay nada guardado' }} s</p>
    <button @click="simularRecarga">Simular recarga de la página</button>

    <h2>Bitácora</h2>
    <ol>
      <li v-for="(entrada, indice) in bitacora" :key="indice">{{ entrada }}</li>
    </ol>

    <h2>Store sin expiraEn (control)</h2>
    <p>Tema: {{ tema }} - el plugin no escribe nada para este store.</p>
    <button @click="preferencias.alternarTema()">Alternar tema</button>
  </main>
</template>
