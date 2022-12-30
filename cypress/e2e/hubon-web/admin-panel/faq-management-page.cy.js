/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
const newFaqQuestion = getUniqueId() + "testing faq";

context('Admin panel faq management page', () => {

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

  it('faq management page', () => {
    cy.contains('a', 'Faq Management').click()
    cy.contains('h3', 'FAQ')

    cy.contains('table th', 'No')
    cy.contains('table th', 'Question')
    cy.contains('a', 'Add FAQ')
    cy.get('a.btn-primary').should('have.attr', 'href', '/admin/faqs/create')
  })

  it('Add a new FAQ and delete', () => {
    cy.contains('a', 'Faq Management').click()
    cy.contains('a', 'Add FAQ').click()

    cy.get('input[placeholder="Input FAQ question"]').type(newFaqQuestion)
    cy.get('div.ql-editor p').type('answer')
    cy.get('form').submit()
    // newly created faq should be present
    cy.contains('a', newFaqQuestion)
    cy.contains('a', newFaqQuestion).click()

    cy.contains('button', 'Delete').click()
  })
})
