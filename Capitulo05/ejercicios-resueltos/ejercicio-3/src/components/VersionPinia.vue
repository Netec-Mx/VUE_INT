<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductos } from '../stores/productos'
import { contadorPeticiones } from '../api'

const store = useProductos()
const { destacados } = storeToRefs(store)

const seleccionado = ref(42)
const precioEditado = ref(0)

onMounted(async () => {
  await store.cargarDestacados()
  precioEditado.value = store.porId[seleccionado.value]?.precio ?? 0
})

async function guardar() {
  await store.cambiarPrecio(seleccionado.value, Number(precioEditado.value))
}
</script>

<template>
  <section>
    <h2>Versión REST con store normalizado (Pinia)</h2>

    <div class="dos-columnas">
      <div>
        <h3>Listado</h3>
        <ul>
          <li v-for="producto in destacados" :key="producto.id">
            {{ producto.nombre }} - {{ producto.precio }}
          </li>
        </ul>
      </div>

      <div>
        <h3>Panel de edición</h3>
        <label>
          Producto:
          <select v-model.number="seleccionado">
            <option v-for="producto in destacados" :key="producto.id" :value="producto.id">
              {{ producto.nombre }}
            </option>
          </select>
        </label>
        <label>
          Precio:
          <input v-model.number="precioEditado" type="number" />
        </label>
        <button @click="guardar">Guardar</button>
      </div>
    </div>

    <p>Peticiones REST realizadas: {{ contadorPeticiones() }} (guardar no vuelve a pedir la lista)</p>
  </section>
</template>

<style scoped>
.dos-columnas {
  display: flex;
  gap: 2rem;
}
label {
  display: block;
  margin: 0.25rem 0;
}
</style>
