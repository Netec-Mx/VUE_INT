// Traemos la función "mount" de Vue Test Utils: sirve para crear el componente en memoria y poder revisarlo.
import { mount } from '@vue/test-utils'
// Traemos de Vitest las tres piezas básicas: agrupar pruebas, declarar una prueba y afirmar resultados.
import { describe, it, expect } from 'vitest'
// Traemos el componente que vamos a probar, tal como lo importaría la aplicación real.
import Contador from '../src/components/Contador.vue'

// "describe" agrupa todas las pruebas de este componente bajo un mismo título, para leer mejor el reporte.
describe('Contador.vue', () => {

  // Primera prueba: revisa lo que se ve apenas aparece el componente, sin que nadie lo toque todavía.
  it('muestra el valor inicial que recibe por props', () => {
    // Creamos el componente en memoria y le entregamos el dato inicial "inicio" con valor 5.
    const wrapper = mount(Contador, { props: { inicio: 5 } })
    // Buscamos el elemento marcado con data-test="valor"; usamos "get" porque ese elemento debe existir sí o sí.
    const texto = wrapper.get('[data-test="valor"]').text()
    // Afirmamos que ese elemento muestra el número 5 como texto; si muestra otra cosa, la prueba falla.
    expect(texto).toBe('5')
  })

  // Segunda prueba: revisa qué pasa cuando el usuario hace clic. Es "async" porque el clic tarda un instante en reflejarse.
  it('aumenta el valor visible al hacer clic en el botón', async () => {
    // Montamos de nuevo el componente, limpio, empezando en 0. Cada prueba arranca desde cero, sin heredar nada.
    const wrapper = mount(Contador, { props: { inicio: 0 } })
    // Disparamos un clic sobre el botón; el "await" espera a que Vue termine de actualizar lo que se ve en pantalla.
    await wrapper.get('[data-test="sumar"]').trigger('click')
    // Volvemos a leer el texto del valor, ya actualizado después del clic.
    expect(wrapper.get('[data-test="valor"]').text()).toBe('1')
  })

  // Tercera prueba: revisa el aviso que el componente le manda a su componente padre cuando algo cambia.
  it('avisa al padre con el evento cambio y el nuevo número', async () => {
    // Montamos el componente empezando en 10 para que el número del aviso sea fácil de reconocer.
    const wrapper = mount(Contador, { props: { inicio: 10 } })
    // Hacemos clic una sola vez, esperando a que termine la actualización.
    await wrapper.get('[data-test="sumar"]').trigger('click')
    // Pedimos la lista de avisos llamados "cambio" que el componente envió durante esta prueba.
    const avisos = wrapper.emitted('cambio')
    // Afirmamos que envió exactamente un aviso; ni cero (no avisó) ni dos (avisó de más).
    expect(avisos).toHaveLength(1)
    // Afirmamos que ese único aviso llevaba el número 11 adentro; el [0] es el primer aviso y va entre corchetes porque un aviso puede llevar varios datos.
    expect(avisos[0]).toEqual([11])
  })

  // Cuarta prueba: revisa el caso borde, que es donde se esconden casi todos los errores de verdad.
  it('no baja de cero ni deja el botón de restar activo en cero', async () => {
    // Montamos el componente ya en el límite inferior para probar justo la frontera.
    const wrapper = mount(Contador, { props: { inicio: 0 } })
    // Intentamos restar estando en cero, que es lo que un usuario distraído haría.
    await wrapper.get('[data-test="restar"]').trigger('click')
    // Afirmamos que el valor se quedó en 0 y nunca pasó a números negativos.
    expect(wrapper.get('[data-test="valor"]').text()).toBe('0')
    // Afirmamos además que el botón de restar quedó deshabilitado, que es lo que el usuario alcanza a ver.
    expect(wrapper.get('[data-test="restar"]').attributes('disabled')).toBeDefined()
  })
})
