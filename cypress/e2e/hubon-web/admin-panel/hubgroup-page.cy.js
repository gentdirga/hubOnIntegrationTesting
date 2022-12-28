/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
const newHubGroupName = getUniqueId() + "testing hub group";

context('Admin panel hubs groups page', () => {

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

  it('hub groups page', () => {
    cy.contains('a', 'Hub Groups').click()
    cy.contains('table th', 'No')
    cy.contains('table th', 'Name')
    cy.contains('table th', 'Delivery Days')
    cy.contains('table th', 'Hub Sequence')
    cy.contains('a', 'Add Group')
    cy.get('a.btn-primary').should('have.attr', 'href', '/admin/hub-groups/create')
  })

  it('Add a new hub group', () => {
    cy.contains('a', 'Hub Groups').click()
    cy.contains('a', 'Add Group').click()
    cy.get('input[placeholder="Input hub group name"]').type(newHubGroupName)
    cy.get('input[name="delivery_days.sunday"]').check({force: true})
    cy.get('input[name="delivery_days.monday"]').check({force: true})
    cy.get('select[name="hub"]').select("1")
    cy.get('form').submit()
    // newly created hub group should be present
    cy.contains('a', newHubGroupName)
  })
})
