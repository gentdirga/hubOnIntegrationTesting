/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

context('Get Transport Page', () => {
  before(() => {
    cy.visit(hostUrl)
  })
	
	it('load get transport page', () => {
		cy.get('ul').contains('Get Transport').trigger('mouseover')
		cy.get('a').contains('Send a package')
		cy.get('a').contains('Receive a package')
		cy.get('a').contains('Receive a package').click({force: true})
		cy.get('h3').contains('Welcome back to Hub')
		cy.get('p').contains('We will require a phone number validation for security purposes')
		cy.get('input[name="identity"]')
		cy.get('button').contains('Login')
	})
})
