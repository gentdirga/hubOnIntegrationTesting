/// <reference types="cypress" />

import dayjs from 'dayjs'

let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;
const todaysDate = dayjs().format('YYYY-MM-DD');

context('ETA Calculator', () => {
  before(() => {
    cy.visit(hostUrl)
  })

  it('calculates the eta', () => {
    cy.get('button').contains('ETA Calculator').click()
    cy.intercept('GET', '/api/v1/transports/eta?origin_hub_id=1&destination_hub_id=2&drop_off_at=*', req => {
      // delete headers to avoid cached requests otherwise it returns 304
      delete req.headers['if-none-match']
    }).as('calculate_eta');

    cy.get('select[name="origin_hub"]').should('be.visible').select('1')
    cy.get('select[name="destination_hub"]').select('2')
    cy.get('input[placeholder="Select drop off date and time"]').should('be.visible').type(todaysDate)
    cy.get('form').submit()
    cy.wait('@calculate_eta').its('response.statusCode').should('eq', 200)
  })
})
