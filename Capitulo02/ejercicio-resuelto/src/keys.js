import { inject } from 'vue'                            // función para recibir lo que ofrece un componente de arriba

export const projectHubKey = Symbol('projectHub')       // clave única: ninguna otra puede chocar con ella

export function useProjectHubContext() {                // así piden el contexto los componentes de abajo
  const contexto = inject(projectHubKey)                // busca hacia arriba quién lo ofreció con provide
  if (!contexto) {                                      // si nadie lo ofreció...
    throw new Error('useProjectHubContext debe utilizarse dentro de ProjectHubView') // ...error con nombre
  }
  return contexto                                       // datos y acciones de ProjectHub
}
