import { afterEach } from 'vitest'                    // gancho que corre al final de cada prueba
import { enableAutoUnmount } from '@vue/test-utils'  // desmontador automático de componentes

enableAutoUnmount(afterEach)                          // tras cada prueba, quita lo que quedó montado
