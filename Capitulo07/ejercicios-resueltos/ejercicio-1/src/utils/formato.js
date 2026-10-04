const SEPARADOR_MILES = /\B(?=(\d{3})+(?!\d))/g

export function formatearPesos(valor) {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) return '$ 0'

  const signo = valor < 0 ? '-' : ''
  const entero = Math.trunc(Math.abs(valor))
  const conPuntos = String(entero).replace(SEPARADOR_MILES, '.')

  return `${signo}$ ${conPuntos}`
}
