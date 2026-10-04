// Simulación de una librería de gráficas "pesada": es el código que NO queremos en el bundle inicial.
// Solo la vista Reportes la importa, así que viaja en el chunk de Reportes cuando la ruta es perezosa.

export const PALETA = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b',
  '#e377c2', '#7f7f7f', '#bcbd22', '#17becf', '#393b79', '#637939',
  '#8c6d31', '#843c39', '#7b4173', '#5254a3', '#8ca252', '#bd9e39',
  '#ad494a', '#a55194', '#6b6ecf', '#b5cf6b', '#e7ba52', '#d6616b'
]

// Devuelve el alto en píxeles de cada barra, escalado al valor máximo de la serie.
export function escalarSerie(valores, altoMaximo = 160) {
  const maximo = Math.max(...valores, 1)
  return valores.map((valor) => Math.round((valor / maximo) * altoMaximo))
}

// Calcula las estadísticas descriptivas que acompañan a la gráfica.
export function resumirSerie(valores) {
  const total = valores.reduce((suma, valor) => suma + valor, 0)
  const promedio = total / (valores.length || 1)
  const ordenados = [...valores].sort((a, b) => a - b)
  const mitad = Math.floor(ordenados.length / 2)
  const mediana = ordenados.length % 2 === 0
    ? (ordenados[mitad - 1] + ordenados[mitad]) / 2
    : ordenados[mitad]
  const varianza = valores.reduce((acum, valor) => acum + (valor - promedio) ** 2, 0) / (valores.length || 1)

  return {
    total,
    promedio: Math.round(promedio),
    mediana: Math.round(mediana),
    desviacion: Math.round(Math.sqrt(varianza)),
    minimo: ordenados[0] ?? 0,
    maximo: ordenados[ordenados.length - 1] ?? 0
  }
}

// Construye el atributo 'points' de una polilínea SVG a partir de la serie.
export function trazarLinea(valores, ancho = 480, alto = 160) {
  const paso = ancho / Math.max(valores.length - 1, 1)
  const alturas = escalarSerie(valores, alto)
  return alturas.map((altura, indice) => `${Math.round(indice * paso)},${alto - altura}`).join(' ')
}

// Genera las marcas del eje vertical en cuatro tramos iguales.
export function marcasEjeY(valores, tramos = 4) {
  const maximo = Math.max(...valores, 1)
  const marcas = []
  for (let i = tramos; i >= 0; i--) {
    marcas.push(Math.round((maximo / tramos) * i))
  }
  return marcas
}

// Etiquetas de la serie, con el color de la paleta que le corresponde a cada una.
export function construirLeyenda(etiquetas) {
  return etiquetas.map((etiqueta, indice) => ({
    etiqueta,
    color: PALETA[indice % PALETA.length]
  }))
}
