import { describe, it, expect } from 'vitest'
import { formatearPesos } from '../src/utils/formato.js'

describe('formatearPesos', () => {
  it('formatea un número normal con separador de miles', () => {
    expect(formatearPesos(1250000)).toBe('$ 1.250.000')
  })

  it('devuelve el cero sin separadores', () => {
    expect(formatearPesos(0)).toBe('$ 0')
  })

  it('antepone el signo menos a los valores negativos', () => {
    expect(formatearPesos(-45000)).toBe('-$ 45.000')
  })

  it('trata null como cero en vez de fallar', () => {
    expect(formatearPesos(null)).toBe('$ 0')
  })

  it('detecta si se elimina el separador de miles', () => {
    expect(formatearPesos(1000000)).toContain('.')
    expect(formatearPesos(1000000)).not.toBe('$ 1000000')
  })
})
