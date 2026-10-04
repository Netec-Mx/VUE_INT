import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('Catalogo Pro Component', () => {
  it('monta correctamente y calcula lista virtual de productos', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Catalogo Pro')
    expect(wrapper.findAll('.item-row').length).toBeGreaterThan(0)
  })
})
