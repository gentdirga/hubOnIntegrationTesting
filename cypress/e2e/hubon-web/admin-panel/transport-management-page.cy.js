/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
const couponCode = getUniqueId();

context('Admin panel transport management page', () => {

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

  it('transport management page', () => {
    cy.contains('a', 'Transport Management').click()
    
    cy.contains('h3', 'Transport Management')
    
    cy.contains('legend', 'Prices')
    cy.contains('label', 'First Bag Price')
    cy.get('input[placeholder="Input first bag price"]')
    cy.contains('label', 'Additional Bag Price')
    cy.get('input[placeholder="Input additional bag price"]')

    cy.contains('legend', 'Miles Saved')
    cy.contains('label', 'Miles Saved')
    cy.get('input[name="miles_saved"]')
    
    cy.contains('legend', 'Logo')

    cy.contains('button', 'Update data')
  })
})
