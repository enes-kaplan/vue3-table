/// <reference types="cypress" />

import { applyFilter } from '/src/helpers/filtering.js'

describe('Filtering test', () => {
  it('Filtering without locale', () => {
    cy.visit('/')
    cy.get('tbody')
      .find('tr')
      .should('have.length', 5)
  })
})
