export const DATOS_VALIDOS = {
  asunto: 'Revisión de cartera vencida',
  detalle: 'El usuario solicita la revisión del saldo reportado en junio',
  correo: 'ana.torres@empresa.co',
  documento: '1030512345',
  celular: '3001234567'
}

export async function llenarFormulario(wrapper, datos = DATOS_VALIDOS) {
  for (const [campo, valor] of Object.entries(datos)) {
    await wrapper.get(`[data-test="${campo}"]`).setValue(valor)
  }
}
