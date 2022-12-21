/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

context('Admin panel transport page', () => {

  beforeEach(() => {
    cy.visit(hostUrl+'admin/login')
    cy.get('input[name="username"]').type(Cypress.env('default_admin_username'))
    cy.get('input[name="password"]').type(Cypress.env('default_admin_password'))
    
    Cypress.Commands.add('confirmCaptcha', function () {
      cy.get('iframe')
        .first()
        .then((recaptchaIframe) => {
          const body = recaptchaIframe.contents()
          cy.wrap(body).find('.recaptcha-checkbox-border').should('be.visible').click()
        })
    })

    cy.get('button').contains('Login').click()
    cy.url().should('contain', '/admin')
  })

  it('loads transport page after login', () => {
    cy.contains('h3', 'Transport')
    cy.contains('button', 'Filters')
    cy.contains('button', 'Sort By:')
    cy.contains('div', 'Latest')
    cy.contains('button', 'Search By:')
    cy.contains('div', 'Transport ID')
    cy.get('input').should('have.attr', 'placeholder', 'search transport')
  })

  it('sort transports by oldest first', () => {
    // declare the AJAX request we will wait for
    cy.intercept('GET', '/admin/v1/transports?page=1&page_size=4&sort_by=oldest').as('sort_by_oldest')
    cy.get('select[name="sort_by"]').select("oldest")
    // wait till we get 200
    cy.wait('@sort_by_oldest').its('response.statusCode').should('eq', 200)
  })

  it('filter transport', () => {
    // declare the AJAX request we will wait for
    cy.intercept('GET', '/admin/v1/transports?page=1&page_size=4&filter[state]=initiated&sort_by=latest').as('filter_transport')
    cy.contains('button', 'Filters').click()
    cy.get('select[name="state"]').select("initiated")
    cy.get('button[type="submit"]').click();
    // wait till we get 200
    cy.wait('@filter_transport').its('response.statusCode').should('eq', 200)
  })
})
