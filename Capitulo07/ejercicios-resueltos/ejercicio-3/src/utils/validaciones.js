const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SOLO_CIFRAS = /^\d+$/
const CELULAR = /^3\d{9}$/
const TIPOS = ['petición', 'queja', 'reclamo']

const texto = (valor) => String(valor ?? '').trim()

export function validarSolicitud(datos = {}) {
  const errores = {}

  const asunto = texto(datos.asunto)
  if (!asunto) errores.asunto = 'El asunto es obligatorio'
  else if (asunto.length < 10) errores.asunto = 'El asunto debe tener al menos 10 caracteres'

  const detalle = texto(datos.detalle)
  if (!detalle) errores.detalle = 'El detalle es obligatorio'
  else if (detalle.length > 500) errores.detalle = 'El detalle no puede superar 500 caracteres'

  const correo = texto(datos.correo)
  if (!CORREO.test(correo)) errores.correo = 'El correo no tiene un formato válido'

  const documento = texto(datos.documento)
  if (!SOLO_CIFRAS.test(documento)) errores.documento = 'El documento solo admite cifras'
  else if (documento.length < 6 || documento.length > 10) {
    errores.documento = 'El documento debe tener entre 6 y 10 cifras'
  }

  const celular = texto(datos.celular)
  if (!CELULAR.test(celular)) errores.celular = 'El celular debe tener 10 cifras y empezar por 3'

  if (!TIPOS.includes(texto(datos.tipo))) errores.tipo = 'Seleccione un tipo de solicitud válido'

  return { valido: Object.keys(errores).length === 0, errores }
}
