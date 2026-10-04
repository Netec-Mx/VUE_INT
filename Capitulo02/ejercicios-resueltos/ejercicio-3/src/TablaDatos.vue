<script setup>
// SOLUCIÓN DEL EJERCICIO 3, parte visual.
// El componente aporta la estructura (encabezado, cuerpo, estado vacío, pie de
// paginación) y deja que cada pantalla rellene los huecos con scoped slots
// nombrados: #encabezado, #celda y #vacio. Toda la lógica viene de useTabla.
import { computed } from 'vue'
import { useTabla } from './composables/useTabla.js'

const props = defineProps({
  filas: { type: Array, required: true },
  columnas: { type: Array, required: true },
  porPagina: { type: Number, default: 5 }
})

const tabla = useTabla(() => props.filas, { porPagina: props.porPagina })
const seleccion = computed(() => tabla.seleccionadas.value.size)

defineExpose({ tabla })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="columna in columnas" :key="columna.campo" @click="tabla.ordenarPor(columna.campo)">
            <slot name="encabezado" :columna="columna" :campo-orden="tabla.campoOrden.value" :direccion="tabla.direccionOrden.value">
              {{ columna.titulo }}
            </slot>
          </th>
        </tr>
      </thead>

      <tbody v-if="!tabla.vacia.value">
        <tr v-for="fila in tabla.filasPagina.value" :key="fila.id">
          <td>
            <input
              type="checkbox"
              :checked="tabla.estaSeleccionada(fila)"
              @change="tabla.alternarSeleccion(fila)"
            />
          </td>
          <td v-for="columna in columnas" :key="columna.campo">
            <slot name="celda" :fila="fila" :columna="columna" :valor="fila[columna.campo]">
              {{ fila[columna.campo] }}
            </slot>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td :colspan="columnas.length + 1">
            <slot name="vacio">No hay datos para mostrar.</slot>
          </td>
        </tr>
      </tbody>
    </table>

    <nav>
      <button :disabled="tabla.pagina.value <= 1" @click="tabla.irA(tabla.pagina.value - 1)">Anterior</button>
      <span>Página {{ tabla.pagina.value }} de {{ tabla.totalPaginas.value }}</span>
      <button :disabled="tabla.pagina.value >= tabla.totalPaginas.value" @click="tabla.irA(tabla.pagina.value + 1)">Siguiente</button>
      <span>Seleccionadas: {{ seleccion }}</span>
      <button :disabled="seleccion === 0" @click="tabla.limpiarSeleccion()">Limpiar</button>
    </nav>
  </div>
</template>

<style scoped>
table { border-collapse: collapse; width: 100%; }
th, td { border: 1px solid #ccd; padding: 0.35rem 0.5rem; text-align: left; }
th { cursor: pointer; background: #f3f4f8; }
nav { display: flex; gap: 0.75rem; align-items: center; margin-top: 0.5rem; }
</style>
