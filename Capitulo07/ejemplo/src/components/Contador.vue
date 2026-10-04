<script setup>
import { ref } from 'vue'

const props = defineProps({
  inicio: { type: Number, default: 0 }
})

const emit = defineEmits(['cambio'])

const valor = ref(props.inicio)

function sumar() {
  valor.value += 1
  emit('cambio', valor.value)
}

function restar() {
  if (valor.value === 0) return
  valor.value -= 1
  emit('cambio', valor.value)
}
</script>

<template>
  <div class="contador">
    <p data-test="valor">{{ valor }}</p>
    <button data-test="restar" :disabled="valor === 0" @click="restar">-</button>
    <button data-test="sumar" @click="sumar">+</button>
  </div>
</template>
