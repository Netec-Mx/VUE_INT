import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormularioSolicitud from '../src/components/FormularioSolicitud.vue'
import { llenarFormulario, DATOS_VALIDOS } from './llenar.js'

const enviar = (wrapper) => wrapper.get('[data-test="formulario"]').trigger('submit')

describe('FormularioSolicitud.vue', () => {
  it('arranca sin mensajes de error en pantalla', () => {
    const wrapper = mount(FormularioSolicitud)
    expect(wrapper.find('[data-test="error-asunto"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="error-correo"]').exists()).toBe(false)
  })

  it('muestra en pantalla el mensaje de cada campo vacío al enviar', async () => {
    const wrapper = mount(FormularioSolicitud)
    await enviar(wrapper)
    expect(wrapper.get('[data-test="error-asunto"]').text()).toBe('El asunto es obligatorio')
    expect(wrapper.get('[data-test="error-detalle"]').text()).toBe('El detalle es obligatorio')
    expect(wrapper.get('[data-test="error-celular"]').text())
      .toBe('El celular debe tener 10 cifras y empezar por 3')
  })

  it('muestra solo el mensaje del campo mal diligenciado', async () => {
    const wrapper = mount(FormularioSolicitud)
    await llenarFormulario(wrapper, { ...DATOS_VALIDOS, correo: 'ana.torres@empresa' })
    await enviar(wrapper)
    expect(wrapper.get('[data-test="error-correo"]').text())
      .toBe('El correo no tiene un formato válido')
    expect(wrapper.find('[data-test="error-asunto"]').exists()).toBe(false)
  })

  it('limpia los mensajes y emite radicar con los datos válidos', async () => {
    const wrapper = mount(FormularioSolicitud)
    await enviar(wrapper)
    await llenarFormulario(wrapper)
    await enviar(wrapper)
    expect(wrapper.find('[data-test="error-asunto"]').exists()).toBe(false)
    expect(wrapper.emitted('radicar')).toHaveLength(1)
    expect(wrapper.emitted('radicar')[0][0]).toMatchObject(DATOS_VALIDOS)
  })
})
