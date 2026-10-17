import { describe, it, expect } from 'vitest'
import { etiquetaDeEstado } from './estado.js'

describe('etiquetaDeEstado', () => {
  it('traduce un estado conocido', () => {
    expect(etiquetaDeEstado('agotado')).toBe('Agotado')
  })
  it('avisa cuando no conoce el estado', () => {
    expect(etiquetaDeEstado('xyz')).toBe('Desconocido')
  })
})
