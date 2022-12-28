/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
const couponCode = getUniqueId();

context('Admin panel coupon management page', () => {

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

  it('coupon management page', () => {
    cy.contains('a', 'Coupon Management').click()
    
    cy.contains('HubOn Coupons')
    cy.contains('a', 'Add Coupon')
    cy.get('a.btn-primary').should('have.attr', 'href', '/admin/coupons/create')

    cy.contains('table th', 'No')
    cy.contains('table th', 'Code')
    cy.contains('table th', 'Type')
    cy.contains('table th', 'Quantity')
  })

  it('add and delete a new coupon', () => {
    cy.contains('a', 'Coupon Management').click()
    
    cy.contains('a', 'Add Coupon').click()
    cy.contains('Create HubOn Coupon')    
    cy.get('input[placeholder="Input coupon code"]').type(couponCode)
    cy.get('select[name="type"]').select("free")
    cy.get('input[placeholder="Input coupon value"]').type(100)
    cy.get('input[placeholder="Input coupon quantity"]').type(10)
    cy.get('form').submit()

    cy.contains('a', couponCode).click()
    cy.contains('button', 'Delete Coupon').click()
  })
})
