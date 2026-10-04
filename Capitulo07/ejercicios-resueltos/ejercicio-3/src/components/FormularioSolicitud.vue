<script setup>
import { reactive, ref } from 'vue'
import { validarSolicitud } from '../utils/validaciones.js'

const props = defineProps({
  radicarEnServidor: { type: Function, default: null }
})

const emit = defineEmits(['radicar'])

const datos = reactive({
  asunto: '', detalle: '', correo: '', documento: '', celular: '', tipo: 'petición'
})
const errores = ref({})
const consecutivo = ref('')

async function enviar() {
  const resultado = validarSolicitud(datos)
  errores.value = resultado.errores
  if (!resultado.valido) return

  emit('radicar', { ...datos })
  if (props.radicarEnServidor) {
    const respuesta = await props.radicarEnServidor({ ...datos })
    consecutivo.value = respuesta.consecutivo
  }
}
</script>

<template>
  <form data-test="formulario" @submit.prevent="enviar">
    <input v-model="datos.asunto" data-test="asunto" />
    <span v-if="errores.asunto" data-test="error-asunto">{{ errores.asunto }}</span>

    <textarea v-model="datos.detalle" data-test="detalle"></textarea>
    <span v-if="errores.detalle" data-test="error-detalle">{{ errores.detalle }}</span>

    <input v-model="datos.correo" data-test="correo" />
    <span v-if="errores.correo" data-test="error-correo">{{ errores.correo }}</span>

    <input v-model="datos.documento" data-test="documento" />
    <span v-if="errores.documento" data-test="error-documento">{{ errores.documento }}</span>

    <input v-model="datos.celular" data-test="celular" />
    <span v-if="errores.celular" data-test="error-celular">{{ errores.celular }}</span>

    <select v-model="datos.tipo" data-test="tipo">
      <option value="petición">Petición</option>
      <option value="queja">Queja</option>
      <option value="reclamo">Reclamo</option>
    </select>

    <button type="submit" data-test="enviar">Radicar</button>
    <p v-if="consecutivo" data-test="consecutivo">{{ consecutivo }}</p>
  </form>
</template>
