// src/services/graphqlClient.js: el único lugar que habla GraphQL
import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client/core'  // /core: sin React
import { normalizeGraphqlError } from './appError'

const graphqlClient = new ApolloClient({             // el cliente se crea una sola vez
  link: new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_URL }),   // camino: '/graphql'
  cache: new InMemoryCache()                         // guarda cada objeto una vez, por tipo e id
})

// gql convierte el texto en una consulta; $projectId es su variable
const PROJECT_TASKS = gql`
  query ProjectTasks($projectId: ID!) {
    project(id: $projectId) {
      id
      name
      tasks { id title }
    }
  }
`

export async function getProjectTasks(projectId, force = false) {
  try {
    const result = await graphqlClient.query({
      query: PROJECT_TASKS,                          // qué pedir
      variables: { projectId },                      // con qué valores
      fetchPolicy: force ? 'network-only' : 'cache-first'   // force: ignora la caché
    })
    return result.data.project                       // la respuesta tiene la forma pedida
  } catch (error) {
    throw normalizeGraphqlError(error)               // la vista solo ve AppError
  }
}

// Claves guardadas en la caché, como Project:p-100 (sin la raíz ROOT_QUERY)
export function cacheKeys() {
  return Object.keys(graphqlClient.cache.extract()).filter((key) => key !== 'ROOT_QUERY')
}
