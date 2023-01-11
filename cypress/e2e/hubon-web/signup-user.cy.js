/// <reference types="cypress" />


let uiURL = Cypress.env('CYPRESS_BASE_URL');

if (uiURL == "" || uiURL === undefined) {
  uiURL = Cypress.env('default_hubon_web_url');
}

const hostUrl = uiURL;

const phoneNumber = "1 (" + Math.random().toString().slice(2,5) + ") "+
                        Math.random().toString().slice(2,5)+
                        "-"+Math.random().toString().slice(2,6);

const craftingTestFixedOTP = "123123";
const fullName = "cratingIntegrationTestsUser"
const username = Math.random().toString().slice(2,12)+"user";



context('Signup User', () => {
  before(() => {
    cy.visit(hostUrl)
  })
	
	it('creates a new account', () => {
        cy.get('ul').contains('Login / Sign up').click()
        cy.get('a > strong').contains('Sign Up').click({force: true})
		
        // fill in phone number and continue
        cy.get('input[name="phone_number"]').type(phoneNumber)
        cy.get('button').contains('Sign Up').click()

        // verify otp and continue
		cy.get('input[name="code"]').type(craftingTestFixedOTP)
        cy.get('button').contains('Continue').click()
        
        // fill in fullname and username
		cy.get('input[name="fullname"]').type(fullName)
		cy.get('input[name="username"]').type(username)
        cy.get('select[name="hub"]').select("1")
        cy.get('input[name="term"]').check({force: true})
        cy.get('input[name="notif"]').check({force: true})
        cy.get('button').contains('Continue').click({force: true})

        cy.get('div').contains(username)
        cy.get('button').contains('Get Transport')
	})
})
