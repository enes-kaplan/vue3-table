/// <reference types="cypress" />

import { applyFilter } from '/src/helpers/filtering.js'

describe('Filtering test', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('counting first page rows', () => {
    cy.get('tbody')
      .find('tr')
      .should('have.length', 5)
  })

  it.only('testing filtering text', () => {
    const filterText = 'jo'

    cy.findByRole('filter', { name: /name/  }).type(filterText)
    cy.get('tbody')
      .then(body => {
        cy.wrap(body)
          .find('tr')
          .should('have.length', 4)

        cy.wrap(body)
          .find('tr')
          .each(row => {
            cy.wrap(row)
              .find('td:first')
              .invoke('text')
              .then(textVal => {
                const test = textVal.toLowerCase()
                expect(textVal.toLowerCase()).to.contain(filterText.toLowerCase())
              })
          })
      })
  })
})
