// Abre el catálogo y responde por el servidor con lo que diga cada prueba
function abrirCatalogo(respuesta) {
  cy.intercept('GET', '**/api/productos.json', respuesta).as('productos') // atrapa la petición
  cy.visit('/')                                 // abre la página: la intercepción quedó registrada antes
  cy.wait('@productos')                         // espera la causa, nunca un número de segundos
}

describe('Catálogo Pro en Chrome', () => {
  it('carga el catálogo y filtra por nombre', () => {
    abrirCatalogo({ fixture: 'productos.json' })                  // responde con los datos fijos
    cy.get('[data-cy="tarjeta"]').should('have.length', 3)        // los 3 de la fixture
    cy.get('[data-cy="buscar"]').type('mouse')                    // escribe como una persona
    cy.get('[data-cy="tarjeta"]').should('have.length', 1).and('contain', 'Mouse inalámbrico')
  })

  it('marca y desmarca un favorito', () => {
    abrirCatalogo({ fixture: 'productos.json' })
    cy.get('[data-cy="favorito"]').first().click().should('have.attr', 'aria-pressed', 'true')
    cy.get('[data-cy="resumen"]').should('have.text', 'Favoritos: 1 de 3')
    cy.get('[data-cy="favorito"]').first().click().should('have.attr', 'aria-pressed', 'false')
    cy.get('[data-cy="resumen"]').should('have.text', 'Favoritos: 0 de 3')
  })

  it('avisa cuando el servidor falla', () => {
    abrirCatalogo({ statusCode: 500, body: {} })                   // el servidor responde con error
    cy.get('[role="alert"]').should('have.text', 'No se pudo cargar el catálogo.')
  })
})
