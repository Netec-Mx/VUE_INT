// src/services/appError.js: la forma única de los errores
export class AppError extends Error {                // un Error, con más datos
  constructor({
    message = 'No fue posible completar la operación.', // texto por defecto
    type = 'unknown',                                // qué pasó: network, validation...
    status = null,                                   // código HTTP, si hubo respuesta
    details = null,                                  // errores por campo (en un 422)
    cause = null                                     // el error original, para depurar
  } = {}) {                                          // sin datos: todo por defecto
    super(message)                                   // Error guarda el mensaje
    this.name = 'AppError'                           // nombre visible en la consola
    this.type = type                                 // con esto decide la vista
    this.status = status                             // guarda el código
    this.details = details                           // guarda el detalle
    this.cause = cause                               // guarda el original
  }
}

// Cada código HTTP se traduce a una palabra estable
const TYPES = { 401: 'authentication', 403: 'authorization', 404: 'not-found', 422: 'validation' }

// normalizeRestError: convierte un fallo de Axios en AppError
export function normalizeRestError(error) {
  if (error instanceof AppError) return error        // ya traducido: igual
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {  // se acabó el tiempo
    return new AppError({ type: 'timeout', message: 'El servidor tardó demasiado.', cause: error })
  }
  const status = error.response?.status              // ?. evita fallar si no hubo respuesta
  if (!status) {                                     // nadie respondió: es la red
    return new AppError({ type: 'network', message: 'No se pudo conectar con el servicio.', cause: error })
  }
  const data = error.response.data                   // lo que dijo el servidor
  return new AppError({
    message: data?.message,                          // su texto (o el de por defecto)
    type: TYPES[status] ?? 'service',                // ?? : si no está en la tabla, 'service'
    status,                                          // el código recibido
    details: data?.errors ?? null,                   // errores por campo, si hay
    cause: error                                     // el original
  })
}

// normalizeGraphqlError: convierte un fallo de Apollo en AppError
export function normalizeGraphqlError(error) {
  if (error.networkError) {                          // no hubo respuesta del servidor
    return new AppError({ type: 'network', message: 'No se pudo conectar con GraphQL.', cause: error })
  }
  // El servidor respondió con errores: se toma el primero
  return new AppError({ type: 'graphql', message: error.graphQLErrors?.[0]?.message, cause: error })
}
