/// <reference types="cypress" />

describe('Filtering test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('counting first page rows', () => {
    cy.get('tbody')
      .find('tr')
      .should('have.length', 5)
  })

  it('testing filtering text', () => {
    const filterText = 'jo'

    cy.findByRole('filter', { name: 'name' })
      .type(filterText)

    cy.get('tbody')
      .then(body => {
        cy.wrap(body)
          .find('tr')
          .should('have.length', 4)

        cy.wrap(body)
          .find('tr')
          .each(row => {
            cy.wrap(row)
              .findByRole('cell', { name: 'name' })
              .invoke('data', 'value')
              .then(textVal => {
                const test = textVal.toLowerCase()
                expect(textVal.toLowerCase()).to.contain(filterText.toLowerCase())
              })
          })
      })
  })

  it('testing filtering select', () => {
    cy.findByRole('filter', { name: 'surname' })
      .select(1)
      .invoke('val')
      .then(selectVal => {
        cy.get('tbody')
          .find('tr')
          .each(row => {
            cy.wrap(row)
              .findByRole('cell', { name: 'surname' })
              .invoke('data', 'value')
              .should('equal', selectVal)
          })
      })

  })

  it('testing filtering boolean', () => {
    cy.findAllByRole('filter', { name: 'isApproved' })
      .then(checkboxElements => {
        // We are getting the 2nd element in the array because the first one is the label and the second one is the input element
        cy.wrap(checkboxElements[1])
          .click({ force: true })
          .then(checkbox => {
            cy.wrap(checkbox)
              .should('be.checked')

            cy.get('tbody')
              .find('tr')
              .each(row => {
                cy.wrap(row)
                  .findByRole('cell', { name: 'isApproved' })
                  .invoke('data', 'value')
                  .should('equal', true)
              })
          })
      })
  })
})
