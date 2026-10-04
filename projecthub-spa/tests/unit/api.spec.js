import { describe, it, expect } from 'vitest'
import axios from 'axios'

describe('Cliente REST y Configuracion de API', () => {
  it('instancia de axios permite configurar interceptores y timeout', () => {
    const client = axios.create({
      baseURL: 'https://api.projecthub.local',
      timeout: 5000
    })
    expect(client.defaults.timeout).toBe(5000)
    expect(client.defaults.baseURL).toBe('https://api.projecthub.local')
  })
})
