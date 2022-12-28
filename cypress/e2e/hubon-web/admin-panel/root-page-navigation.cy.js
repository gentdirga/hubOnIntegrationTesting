/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

context('Admin panel', () => {

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
    cy.confirmCaptcha

    cy.get('button').contains('Login').click()
    cy.url().should('contain', '/admin')
  })

  it('left sidebar navigation menu', () => {
    cy.get('ul').contains('Transport')
    cy.get('ul').contains('Hubs')
    cy.get('ul').contains('Hub Groups')
    cy.get('ul').contains('Category')
    cy.get('ul').contains('Coupon Management')
    cy.get('ul').contains('Transport Management')
    cy.get('ul').contains("Driver's Dashboard")
    cy.get('ul').contains('Faq Management')
    cy.get('ul').contains('Global Holidays')
    cy.get('ul').contains('Dashboard')
    cy.get('ul').contains('Logout')
  })

  it('logout from admin panel', () => {
    cy.get('ul').contains('Logout').click()
    cy.get('h3').contains('HubOn Admin Login')
    cy.url().should('include', '/admin/login')
  })
})
