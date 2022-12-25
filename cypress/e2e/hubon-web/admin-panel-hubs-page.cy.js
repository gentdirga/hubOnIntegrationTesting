/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
const newHubName = getUniqueId() + "testing hub";
const newHubContantNumber = "+1123412345";

context('Admin panel hubs page', () => {

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

  it('hubs page', () => {
    cy.contains('a', 'Hubs').click()
    cy.contains('table th', 'No')
    cy.contains('table th', 'Name')
    cy.contains('table th', 'Adress')
    cy.contains('table th', 'Status')
    cy.contains('a', 'Add Hub')
    cy.get('a.btn-primary').should('have.attr', 'href', '/admin/hubs/create')
  })

  it('Add hub and deactivate', () => {
    cy.contains('a', 'Hubs').click()
    cy.contains('a', 'Add Hub').click()
    cy.get('input[name="name"]').type(newHubName)
    cy.get('input[name="contact"]').type(newHubContantNumber)
    cy.get('select[name="hub_group_id"]').select("1")
    cy.get('input[name="categories.cat_1"]').check({force: true})
    cy.get('button.btn-primary').click()

    cy.wait(1000)
    // load hubs page
    cy.contains('a', 'Hubs').click()
    
    // newly created hub should be present
    cy.contains('a', newHubName)

    cy.contains('a', newHubName).click()
    cy.get('button.btn-danger').click()

    cy.contains('a', 'Hubs').click()
    cy.contains('table td', 'inactive')
    
  })

//   it('filter transport', () => {
//     // declare the AJAX request we will wait for
//     cy.intercept('GET', '/admin/v1/transports?page=1&page_size=4&filter[state]=initiated&sort_by=latest').as('filter_transport')
//     cy.contains('button', 'Filters').click()
//     cy.get('select[name="state"]').select("initiated")
//     cy.get('button[type="submit"]').click();
//     // wait till we get 200
//     cy.wait('@filter_transport').its('response.statusCode').should('eq', 200)
//   })
})
