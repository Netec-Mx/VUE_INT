<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCartStore } from './stores/cart.js'
import { api } from './api.js'

const cart = useCartStore()

// storeToRefs conserva la reactividad de state y getters al desestructurar.
const { items, cupon, loading, error } = storeToRefs(cart)
const { cantidadTotal, subtotal, descuento, total, estaVacio } = storeToRefs(cart)

const productos = ref([])
const codigoEscrito = ref('ANDINO10')

onMounted(async () => {
  productos.value = await api.getProductos()
})

// El componente solo expresa la intención: la lógica vive en la action.
async function aplicar() {
  try {
    await cart.aplicarCupon(codigoEscrito.value)
  } catch {
    // El mensaje ya quedó en cart.error; aquí solo evitamos la promesa sin capturar.
  }
}

const pesos = (valor) => valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })
</script>

<template>
  <main>
    <h1>Mercado Andino - carrito con Pinia</h1>

    <section>
      <h2>Catálogo</h2>
      <ul>
        <li v-for="producto in productos" :key="producto.id">
          {{ producto.nombre }} - {{ pesos(producto.precio) }}
          <button @click="cart.agregar(producto)">Agregar</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Carrito ({{ cantidadTotal }} unidades)</h2>
      <p v-if="estaVacio">El carrito está vacío.</p>
      <ul v-else>
        <li v-for="item in items" :key="item.id">
          {{ item.nombre }} x
          <input
            type="number"
            min="0"
            :value="item.cantidad"
            @input="cart.cambiarCantidad(item.id, Number($event.target.value))"
          />
          = {{ pesos(item.precio * item.cantidad) }}
          <button @click="cart.quitar(item.id)">Quitar</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Descuento</h2>
      <input v-model="codigoEscrito" placeholder="ANDINO10" />
      <button :disabled="loading" @click="aplicar">
        {{ loading ? 'Validando...' : 'Aplicar' }}
      </button>
      <p v-if="error" role="alert">{{ error }}</p>
      <p v-if="cupon">Activo: {{ cupon.clave }} ({{ cupon.porcentaje * 100 }} %)</p>
    </section>

    <section>
      <p>Subtotal: {{ pesos(subtotal) }}</p>
      <p>Descuento: -{{ pesos(descuento) }}</p>
      <p><strong>Total: {{ pesos(total) }}</strong></p>
      <button :disabled="estaVacio" @click="cart.vaciar()">Vaciar carrito</button>
    </section>
  </main>
</template>
