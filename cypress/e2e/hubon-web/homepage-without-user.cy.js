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

  it('has logo', () => {
    cy.get('[alt="HubOn by Gardeneur"]')
  })

  it('top bar has ETA Calculator FAQ and About link', () => {
    cy.get('button').contains('ETA Calculator')
    cy.get('a').contains('FAQ')
    cy.get('a').contains('About')
  })

  it('navigation header has Home Track Transport Get Transport etc links', () => {
    cy.get('ul').contains('Home')
    cy.get('ul').contains('Track Transport')
    cy.get('ul').contains('Get Transport')
    cy.get('ul').contains('Our Hubs')
    cy.get('ul').contains('Login / Sign up')
  })

  it ('homepage text', () => {
    cy.get('h3').contains('Easy, Economical, Eco-Friendly Transport')
    cy.get('p').contains('$6.99 flat fee / transport')
    cy.get('a').contains('Try now for FREE')
  })

  it ('try now for free', () => {
    cy.get('a').contains('Try now for FREE').should('have.attr', 'href', '/signup')
    cy.get('a').contains('Try now for FREE').click({force: true})
    cy.get('h3').contains('Join Hub')
    cy.get('p').contains('We will require a phone number validation for security purposes')
    cy.get('input[name="phone_number"]')
    cy.get('button').contains('Sign Up')
    cy.get('p').contains('Already have an account?')
    cy.get('a').contains("Login")
  })

  it ('Find hubs closest to you', () => {
    cy.get('ul').contains('Home').click()
    cy.get('a[href="/hubs"]')
    cy.get('a').contains('Map').click({force: true})
  })

  it ('Get Free Transports', () => {
    cy.get('ul').contains('Home').click()
    cy.get('a').contains('Get Free Transports').should('have.attr', 'href', '/login')
    cy.get('a').contains('Get Free Transports').click({force: true})
    cy.get('p').contains('We will require a phone number validation for security purposes')
    cy.get('input[name="identity"]')
    cy.get('button').contains('Login')
    cy.get('p').contains("Don't have an account?")
    cy.get('a strong').contains("Sign Up")
  })

  it('Frequently Asked Questions', () => {
    cy.get('a').should('have.attr', 'href', '/faqs')
    cy.get('a').contains('FAQ').click()
    cy.get('h2').contains('Frequently Asked Questions')
  })

  it('About', () => {
    cy.get('a[href="/about"]')
    cy.get('a').contains('About').click()
    cy.get('h1').contains('Our Story')
  })
})
