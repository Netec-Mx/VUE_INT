describe('Prueba E2E Catalogo Pro', () => {
  it('carga la pagina y permite desplazamiento en el catalogo', () => {
    cy.visit('/')
    cy.contains('Catalogo Pro').should('be.visible')
    cy.get('input').type('Producto')
    cy.get('.virtual-list').scrollTo('bottom')
  })
})
