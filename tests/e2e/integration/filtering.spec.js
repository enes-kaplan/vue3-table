/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/')
})

describe('Filtering tests', () => {
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

  it('testing filtering date', () => {
    const filter = '2020-04-14'

    cy.findByRole('filter', { name: 'employmentDate' })
      .then(datePicker => {
        cy.wrap(datePicker)
          .type(filter)
          .trigger('change')

        cy.get('tbody')
          .find('tr')
          .each(row => {
            cy.wrap(row)
              .findByRole('cell', { name: 'employmentDate' })
              .invoke('data', 'value')
              .should('equal', filter)
          })
      })
  })

  it('testing filtering daterange', () => {
    const filter = { start: '1990-01-01', end: '1993-01-01' }
    const startDate = new Date(filter.start)
    const endDate = new Date(filter.end)

    cy.findByRole('filter-start', { name: 'birthDate' })
      .type(filter.start)
      .trigger('change')

    cy.findByRole('filter-end', { name: 'birthDate' })
      .type(filter.end)
      .trigger('change')

    cy.get('tbody')
      .find('tr')
      .each(row => {
        cy.wrap(row)
          .findByRole('cell', { name: 'birthDate' })
          .invoke('data', 'value')
          .then(dataVal => {
            const cellDate = new Date(dataVal)
            expect(cellDate).to.be.gte(startDate)
            expect(cellDate).to.be.lte(endDate)
          })
      })
  })
})

describe('Sorting test', () => {
  it('testing sorting name', () => {
    cy.findByRole('sort', { name: 'name' })
      .click()

    let prevValue = null
    cy.get('tbody')
      .find('tr')
      .each(row => {
        cy.wrap(row)
          .findByRole('cell', { name: 'name' })
          .invoke('data', 'value')
          .then(data => {
            if (prevValue !== null) {
              const isSortedCorrectly = prevValue.localeCompare(data) <= 0
              expect(isSortedCorrectly).to.eq(true)
            }
            prevValue = data
          })
      })
  })
})

describe('Pagination tests', () => {
  it('counting first page rows', () => {
    cy.get('tbody')
      .find('tr')
      .should('have.length', 5)
  })

  it('counting page count', () => {
    cy.findAllByRole('page')
      .should('have.length', 3)
  })

  it('counting last page rows', () => {
    cy.findByRole('page', { name: '3' })
      .click()

    cy.get('tbody')
      .find('tr')
      .should('have.length', 2)
  })
})
