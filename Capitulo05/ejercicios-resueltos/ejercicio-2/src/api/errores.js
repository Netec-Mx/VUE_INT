// Forma estable del error en todo el proyecto: { tipo, mensaje, estado }.
// Los valores de `tipo` son los cinco del capítulo: red, auth, validacion, servidor, cancelado.
export class ErrorApi extends Error {
  constructor({ tipo, mensaje, estado, detalle }) {
    super(mensaje)
    this.name = 'ErrorApi'
    this.tipo = tipo
    this.estado = estado
    this.detalle = detalle
  }
}

// Se traduce una sola vez, lo más cerca posible del transporte.
// De aquí en adelante ningún componente vuelve a mirar error.response.
export function normalizarError(fallo) {
  if (fallo.code === 'ERR_CANCELED') {
    return new ErrorApi({ tipo: 'cancelado', mensaje: 'Petición cancelada' })
  }
  if (fallo.code === 'ECONNABORTED' || fallo.code === 'ETIMEDOUT') {
    return new ErrorApi({ tipo: 'red', mensaje: 'El servidor tardó demasiado' })
  }
  if (!fallo.response) {
    return new ErrorApi({ tipo: 'red', mensaje: 'Sin conexión con el servidor' })
  }

  const { status, data } = fallo.response

  if (status === 401 || status === 403) {
    return new ErrorApi({ tipo: 'auth', mensaje: 'Sesión vencida', estado: status })
  }
  if (status === 400 || status === 422) {
    return new ErrorApi({
      tipo: 'validacion',
      mensaje: 'Datos inválidos',
      estado: status,
      detalle: data?.errors
    })
  }
  return new ErrorApi({ tipo: 'servidor', mensaje: 'Error del servidor', estado: status })
}
