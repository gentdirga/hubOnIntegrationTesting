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
    cy.get('[alt="HubON by Gardeneur"]')
  })

  it('top bar has ETA Calculator FAQ and About link', () => {
    cy.get('button').contains('ETA Calculator')
    cy.get('a').contains('FAQ')
    cy.get('a').contains('About')
  })

  it('navigation header has Home Track Transport Get Transport etc links', () => {
    cy.get('ul').contains('Home')
    cy.get('ul').contains('Track Transport')
    cy.get('ul').contains('Get Transport')
    cy.get('ul').contains('Our Hubs')
    cy.get('ul').contains('Login / Sign up')
  })

  it ('verify text', () => {
    cy.get('h3').contains('Easy, Economical, Eco-Friendly Transport')
    cy.get('p').contains('$6.99 flat fee / transport')
    cy.get('a').contains('Try now for FREE')
  })
})
