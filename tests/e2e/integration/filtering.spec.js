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

    cy.findByRole('filter', { name: 'name'  })
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
              .findByRole('cell', { name: 'name'  })
              .invoke('text')
              .then(textVal => {
                const test = textVal.toLowerCase()
                expect(textVal.toLowerCase()).to.contain(filterText.toLowerCase())
              })
          })
      })
  })

  it('testing filtering select', () => {
    cy.findByRole('filter', { name: 'surname'  })
      .select(1)
      .invoke('val')
      .then(selectVal => {
        cy.get('tbody')
          .find('tr')
          .each(row => {
            cy.wrap(row)
              .findByRole('cell', { name: /surname/  })
              .invoke('text')
              .should('equal', selectVal)
          })
      })

  })
})
