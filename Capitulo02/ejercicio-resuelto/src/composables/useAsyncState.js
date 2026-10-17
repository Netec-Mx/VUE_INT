import { onMounted, ref } from 'vue'                    // un hook y la caja vigilada

export function useAsyncState(cargar, inicial) {        // recibe cómo cargar y el valor de arranque
  const datos = ref(inicial)                            // lo que llegue del servidor
  const cargando = ref(false)                           // bandera de espera
  const error = ref('')                                 // mensaje si algo falla
  async function recargar() {                           // pide los datos otra vez
    cargando.value = true                               // empieza la espera
    error.value = ''                                    // borra el error anterior
    try { datos.value = await cargar() }                // intenta cargar y guarda lo que llegó
    catch { error.value = 'No se pudieron cargar las tareas' } // si falla, deja el aviso
    finally { cargando.value = false }                  // pase lo que pase, termina la espera
  }
  onMounted(recargar)                                   // hook: carga cuando el componente aparece
  return { datos, cargando, error, recargar }           // lo que entrega a quien lo llame
}
