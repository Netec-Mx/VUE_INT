// Sustituto del E2E de Cypress: Cypress no está instalado en este repositorio del curso,
// así que el único camino feliz se cubre con Vitest y Vue Test Utils.
// El doble "radicarEnServidor" cumple el papel de cy.intercept() sobre el POST de radicación.
import { mount, flushPromises } from '@vue/test-utils'
import { it, expect, vi } from 'vitest'
import FormularioSolicitud from '../src/components/FormularioSolicitud.vue'
import { llenarFormulario } from './llenar.js'

it('radica una solicitud y muestra el consecutivo', async () => {
  const servidor = vi.fn().mockResolvedValue({ consecutivo: 'RAD-2026-0001' })
  const wrapper = mount(FormularioSolicitud, { props: { radicarEnServidor: servidor } })
  await llenarFormulario(wrapper)
  await wrapper.get('[data-test="formulario"]').trigger('submit')
  await flushPromises()
  expect(servidor).toHaveBeenCalledTimes(1)
  expect(wrapper.get('[data-test="consecutivo"]').text()).toBe('RAD-2026-0001')
})
