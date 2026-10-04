# Ejercicio 1 - Regla de frontera entre módulos

App Vue real con dos módulos bajo `src/modules/`: `pedidos` y `clientes`. Cada uno expone su
`index.js` como única puerta de salida (componente principal y `routes`).

## Estructura

```
src/
├── modules/
│   ├── pedidos/
│   │   ├── components/ListaPedidos.vue    # importa clientes por '@/modules/clientes'
│   │   ├── composables/usePedidos.js
│   │   └── index.js                       # única puerta de salida
│   └── clientes/
│       ├── components/ListaClientes.vue
│       ├── composables/useClientes.js     # interno, no debe importarse desde fuera
│       └── index.js
├── app/App.vue
├── main.js
└── violacion/PedidosMalImportado.vue.txt  # la versión prohibida, fuera del build
```

## La regla

`eslint.config.js` lleva el `no-restricted-imports` de la sección 1 del capítulo, aplicado a
`src/modules/**` y desactivado dentro de los propios `index.js`, que sí pueden entrar a sus
archivos internos por ruta relativa.

## Comprobación del ejercicio

La importación prohibida está en `src/violacion/PedidosMalImportado.vue.txt` junto con el
mensaje de error esperado. Se copia sobre `src/modules/pedidos/components/ListaPedidos.vue`
y `npm run lint` falla con el mensaje redactado en la regla; vuelve a verde al corregir la
línea a `import { useClientes } from '@/modules/clientes'`. No vale comentar la regla ni
agregar `eslint-disable`.

Se deja fuera del build a propósito para que `npm run build` valide solo el código correcto.

## Validación aplicada

```bash
npm run build    # vite build - compila dist/ sin errores
```

`npm run lint` **no se ejecutó**: el `node_modules` compartido del curso no incluye `eslint`
ni `eslint-plugin-vue`, y la consigna prohíbe instalar nada. La regla queda escrita y
verificable en cualquier proyecto que sí tenga ESLint instalado.
