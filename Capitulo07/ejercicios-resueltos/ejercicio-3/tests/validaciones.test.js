import { describe, it, expect } from 'vitest'
import { validarSolicitud } from '../src/utils/validaciones.js'

const solicitudValida = () => ({
  asunto: 'Revisión de cartera vencida',
  detalle: 'El usuario solicita la revisión del saldo reportado en junio',
  correo: 'ana.torres@empresa.co',
  documento: '1030512345',
  celular: '3001234567',
  tipo: 'petición'
})

const errorDe = (campo, cambios) =>
  validarSolicitud({ ...solicitudValida(), ...cambios }).errores[campo]

describe('validarSolicitud', () => {
  it('acepta una solicitud completa y bien escrita', () => {
    const resultado = validarSolicitud(solicitudValida())
    expect(resultado.valido).toBe(true)
    expect(resultado.errores).toEqual({})
  })

  it('exige el asunto', () => {
    expect(errorDe('asunto', { asunto: '   ' })).toBe('El asunto es obligatorio')
  })

  it('exige un asunto de al menos 10 caracteres', () => {
    expect(errorDe('asunto', { asunto: 'Saldo' }))
      .toBe('El asunto debe tener al menos 10 caracteres')
  })

  it('exige el detalle', () => {
    expect(errorDe('detalle', { detalle: '' })).toBe('El detalle es obligatorio')
  })

  it('rechaza un detalle de más de 500 caracteres', () => {
    expect(errorDe('detalle', { detalle: 'a'.repeat(501) }))
      .toBe('El detalle no puede superar 500 caracteres')
  })

  it('rechaza un correo con formato inválido', () => {
    expect(errorDe('correo', { correo: 'ana.torres@empresa' }))
      .toBe('El correo no tiene un formato válido')
  })

  it('rechaza un documento con letras', () => {
    expect(errorDe('documento', { documento: '10305A2345' }))
      .toBe('El documento solo admite cifras')
  })

  it('rechaza un documento fuera del rango de 6 a 10 cifras', () => {
    expect(errorDe('documento', { documento: '12345' }))
      .toBe('El documento debe tener entre 6 y 10 cifras')
  })

  it('rechaza un celular que no empieza por 3 o no tiene 10 cifras', () => {
    expect(errorDe('celular', { celular: '6012345678' }))
      .toBe('El celular debe tener 10 cifras y empezar por 3')
    expect(errorDe('celular', { celular: '300123456' }))
      .toBe('El celular debe tener 10 cifras y empezar por 3')
  })

  it('rechaza un tipo de solicitud desconocido', () => {
    expect(errorDe('tipo', { tipo: 'sugerencia' }))
      .toBe('Seleccione un tipo de solicitud válido')
  })
})
