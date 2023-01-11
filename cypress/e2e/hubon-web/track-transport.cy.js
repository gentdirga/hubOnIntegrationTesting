/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

context('Track Transport Page', () => {
  before(() => {
    cy.visit(hostUrl)
  })
	
	it('load track transport page', () => {
    	cy.get('ul').contains('Track Transport').click()
		cy.get('h3').contains('Track your transport')
		cy.get('p').contains('We will require a phone number validation for security purposes')
		cy.get('input[name="identity"]')
		cy.get('button').contains('Track Transport')
	})
})
