/// <reference types="cypress" />

import dayjs from 'dayjs'

let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
const newHolidayNote = getUniqueId() + "testing holiday note";
const todaysDate = dayjs().format('YYYY-MM-DD');

context('Admin panel global holidays page', () => {

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

  it('global holidays page', () => {
    cy.contains('a', 'Global Holidays').click()

    cy.get('input[placeholder="Input holiday note"]').type(newHolidayNote)
    cy.contains('button', 'Add Date').click()
    cy.contains(todaysDate)

    cy.contains('table th', 'No')
    cy.contains('table th', 'Holiday date')
    cy.contains('table th', 'Note')
    cy.contains('table th', 'Action')

    cy.get('span svg').last().click()
  })
})
