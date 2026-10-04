// Paso 7 del laboratorio: claves Symbol para provide/inject.
// Con Symbol no hay colisión de nombres con otras librerías ni con otros módulos.
export const claveTema = Symbol('tema')
export const claveIdioma = Symbol('idioma')
