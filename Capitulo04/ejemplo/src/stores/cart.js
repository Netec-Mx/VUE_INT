// Traemos la función que sirve para crear un almacén de datos compartido.
import { defineStore } from 'pinia'
// La API simulada que valida los cupones contra el "servidor".
import { api } from '../api.js'

// Creamos y exportamos el almacén del carrito de compras; el nombre empieza con "use" porque se usa como una función dentro de los componentes.
export const useCartStore = defineStore('cart', {
  // "cart" es el nombre único del almacén: así lo identifican las herramientas de desarrollo.

  // state guarda los datos crudos y se escribe como una función para que cada usuario tenga su propia copia.
  state: () => ({
    items: [], // Lista de productos agregados; cada producto es { id, nombre, precio, cantidad }.
    cupon: null, // Cupón de descuento aplicado; null significa que no hay ninguno.
    loading: false, // Indica si en este momento se está hablando con el servidor.
    error: null, // Guarda el mensaje del último fallo; null significa que todo va bien.
  }),

  // getters son valores calculados a partir del state; se recalculan solos cuando el state cambia.
  getters: {
    // Suma cuántas unidades hay en total, recorriendo la lista y acumulando las cantidades.
    cantidadTotal: (state) => state.items.reduce((suma, item) => suma + item.cantidad, 0),

    // Suma el valor del carrito multiplicando precio por cantidad en cada producto.
    subtotal: (state) => state.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0),

    // Calcula el descuento usando otro getter; se escribe como función normal para poder usar "this".
    descuento() {
      return this.cupon ? this.subtotal * this.cupon.porcentaje : 0
    },

    // El total es el subtotal menos el descuento; también se apoya en otros getters.
    total() {
      return this.subtotal - this.descuento
    },

    // Responde si el carrito está vacío, útil para deshabilitar el botón de pagar.
    estaVacio() {
      return this.items.length === 0
    },
  },

  // actions son las funciones que cambian el state; aquí vive la lógica del negocio.
  actions: {
    // Agrega un producto al carrito, o suma unidades si ese producto ya estaba.
    agregar(producto, cantidad = 1) {
      const existente = this.items.find((item) => item.id === producto.id) // Busca si el producto ya está en la lista.
      if (existente) {
        existente.cantidad += cantidad // Si ya estaba, solo aumentamos su cantidad.
      } else {
        this.items.push({ ...producto, cantidad }) // Si no estaba, lo agregamos como un item nuevo.
      }
    },

    // Saca del carrito el producto que tenga el identificador indicado.
    quitar(id) {
      this.items = this.items.filter((item) => item.id !== id) // Deja solo los productos cuyo id es distinto.
    },

    // Cambia la cantidad de un producto; si la cantidad llega a cero o menos, lo elimina.
    cambiarCantidad(id, cantidad) {
      if (cantidad <= 0) return this.quitar(id) // Cantidad cero o negativa significa quitarlo.
      const item = this.items.find((item) => item.id === id) // Ubica el producto que hay que modificar.
      if (item) item.cantidad = cantidad // Si existe, le asigna la nueva cantidad.
    },

    // Pide al servidor validar un cupón y lo aplica; es asíncrona porque espera una respuesta de internet.
    async aplicarCupon(codigo) {
      this.loading = true // Encendemos la señal de "espere un momento".
      this.error = null // Borramos cualquier error anterior antes de intentar.
      try {
        const cupon = await api.validarCupon(codigo) // Esperamos la respuesta del servidor.
        this.cupon = cupon // Si llegó bien, guardamos el cupón en el state.
      } catch (e) {
        this.error = e.message ?? 'No se pudo aplicar el cupón' // Si falló, guardamos el motivo.
        throw e // Y relanzamos el error para que quien llamó se entere.
      } finally {
        this.loading = false // Pase lo que pase, apagamos la señal de espera.
      }
    },

    // Deja el carrito como recién creado, usando varios cambios en una sola operación.
    vaciar() {
      this.$patch({ items: [], cupon: null, error: null }) // $patch aplica todos los cambios de una sola vez.
    },
  },
})
