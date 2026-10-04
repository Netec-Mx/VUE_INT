import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AlertaStock from '../src/components/AlertaStock.vue'

const montar = (unidades) => mount(AlertaStock, { props: { unidades } })

describe('AlertaStock.vue', () => {
  it('muestra disponibilidad en verde con más de 10 unidades', () => {
    const alerta = montar(15).get('[data-test="alerta"]')
    expect(alerta.text()).toBe('Disponible: 15 unidades')
    expect(alerta.classes()).toContain('verde')
  })

  it('advierte en amarillo entre 1 y 10 unidades', () => {
    const alerta = montar(4).get('[data-test="alerta"]')
    expect(alerta.text()).toBe('Quedan 4 unidades')
    expect(alerta.classes()).toContain('amarillo')
  })

  it('muestra Agotado en rojo cuando no hay unidades', () => {
    const alerta = montar(0).get('[data-test="alerta"]')
    expect(alerta.text()).toBe('Agotado')
    expect(alerta.classes()).toContain('rojo')
  })
})
