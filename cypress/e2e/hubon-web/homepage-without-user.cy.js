/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

context('HomePage Without User LoggedIn', () => {
  before(() => {
    cy.visit(hostUrl)
  })

  it('has logo', () => {
    cy.get('div#root').within(() => {
      cy.get('img').should('have.attr', 'alt').should('include','HubOn by Gardeneur')
    })
  })
})
