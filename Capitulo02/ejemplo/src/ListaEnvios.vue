<script setup>
// Paso 6 del laboratorio: el componente compuesto. El bloque de script queda
// por debajo de 60 líneas y se lee como el resumen de lo que hace la pantalla.
import { ref, computed } from 'vue'
import { useFetch } from './composables/useFetch.js'
import { useFiltro } from './composables/useFiltro.js'
import { useEstadoRed } from './composables/useEstadoRed.js'
import PieDePantalla from './PieDePantalla.vue'

const url = ref('/api/paquetes')
const { data, error, cargando } = useFetch(url)
const { termino, resultados } = useFiltro(data, ['id', 'destinatario', 'ciudad', 'estado'])
const { enLinea } = useEstadoRed()

const pagina = ref(1)
const porPagina = 3
const totalPaginas = computed(() => Math.max(1, Math.ceil(resultados.value.length / porPagina)))
const pagineados = computed(() => {
  const inicio = (pagina.value - 1) * porPagina
  return resultados.value.slice(inicio, inicio + porPagina)
})

function irA(destino) {
  pagina.value = Math.min(Math.max(1, destino), totalPaginas.value)
}
</script>

<template>
  <section>
    <h2>Panel de despachos</h2>

    <p :class="enLinea ? 'ok' : 'mal'">
      {{ enLinea ? 'En línea' : 'Sin conexión' }}
    </p>

    <label>
      Fuente:
      <select v-model="url">
        <option value="/api/paquetes">Paquetes</option>
        <option value="/api/clientes">Clientes</option>
        <option value="/api/inexistente">Ruta inválida (prueba de error)</option>
      </select>
    </label>

    <label>
      Buscar:
      <input v-model="termino" placeholder="ciudad, estado o destinatario" />
    </label>

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error" class="mal">Error: {{ error.message }}</p>
    <p v-else-if="resultados.length === 0">Sin resultados para "{{ termino }}".</p>

    <ul v-else>
      <li v-for="fila in pagineados" :key="fila.id">
        <strong>{{ fila.id }}</strong> - {{ fila.destinatario }} ({{ fila.ciudad }}) - {{ fila.estado }}
      </li>
    </ul>

    <nav>
      <button :disabled="pagina <= 1" @click="irA(pagina - 1)">Anterior</button>
      <span>Página {{ pagina }} de {{ totalPaginas }}</span>
      <button :disabled="pagina >= totalPaginas" @click="irA(pagina + 1)">Siguiente</button>
    </nav>

    <PieDePantalla />
  </section>
</template>

<style scoped>
.ok { color: #14663a; }
.mal { color: #9b1c1c; }
nav { display: flex; gap: 0.5rem; align-items: center; margin-top: 0.5rem; }
</style>
