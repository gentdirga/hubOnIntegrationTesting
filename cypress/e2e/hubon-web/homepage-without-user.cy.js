/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

context('HomePage Without User LoggedIn', () => {
  before(() => {
    cy.visit(hostUrl)
  })

  // it('has logo', () => {
    
  // })

  // it('navigation header has Home Marketplace Catalog Transport etc links', () => {
  //   cy.get('.site-upper-navbar').contains('Home')
  //   cy.get('.site-upper-navbar').contains('Marketplace')
  //   cy.get('.site-upper-navbar').contains('Catalog')
  //   cy.get('.site-upper-navbar').contains('Transport')
  //   cy.get('.site-upper-navbar').contains('About')
  //   cy.get('.site-upper-navbar').contains('Events')
  //   cy.get('.site-upper-navbar').contains('Social')
  //   cy.get('.site-upper-navbar').contains('Invite Friends')
  //   cy.get('.site-upper-navbar').contains('Blogs')
  //   cy.get('.site-upper-navbar').contains('FAQ')

  // })

  // it ('have signup and login links', () => {
  //   cy.get('div.login-signup a:first').should('have.text', 'Sign Up')
  //   cy.get('div.login-signup a:first').should('have.attr', 'href', '/en/signup')
  //   cy.get('div.login-signup a:last').should('have.text', 'Login')
  //   cy.get('div.login-signup a:last').should('have.attr', 'href', '/en/login')
  // })

  // it('have search form elements', () => {
  //   cy.get('.search-form').within(() => {
  //     cy.get('input.howtogrow_comment_input').should('have.attr', 'placeholder', 'What are you looking for?')
  //     cy.get('input.pac-target-input').should('have.attr', 'placeholder', 'Location')
  //   })
  // })
})
