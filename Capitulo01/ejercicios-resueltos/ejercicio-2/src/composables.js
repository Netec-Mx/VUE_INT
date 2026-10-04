import { ref, reactive, computed } from 'vue'

// Fuente de datos en memoria: el ejercicio no necesita backend.
export const FUENTE = [
  'Crédito hipotecario',
  'Libranza pensionados',
  'Tarjeta de crédito',
  'Rotativo empresarial',
  'Vehículo particular',
  'Microcrédito rural'
]

// VERSIÓN ROTA: devuelve un objeto reactive.
// Al desestructurar el retorno, cada propiedad primitiva se copia y pierde el vínculo
// con el proxy: se rompe la cadena track/trigger.
export function useFiltroRoto() {
  const estado = reactive({ texto: '', resultados: [...FUENTE] })

  function buscar(texto) {
    // Esta mutación sí llega al proxy, pero el componente ya se quedó con copias.
    estado.texto = texto
    estado.resultados = FUENTE.filter((f) => f.toLowerCase().includes(texto.toLowerCase()))
  }

  return { estado, buscar }
}

// VERSIÓN CORREGIDA: objeto plano con refs.
// Cada ref conserva su identidad al desestructurar, así que el getter de .value
// sigue ejecutando track dentro del efecto de render.
export function useFiltro() {
  const texto = ref('')
  const resultados = computed(() =>
    FUENTE.filter((f) => f.toLowerCase().includes(texto.value.toLowerCase()))
  )

  return { texto, resultados }
}
