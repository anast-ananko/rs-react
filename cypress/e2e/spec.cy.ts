/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('does something', function () {
    cy.visit('/');
    cy.get('.search__input > input').type('funny');
    cy.get('.search__button').click();
  });
});

describe('Links', () => {
  it('checks About link works', () => {
    cy.visit('/');

    cy.get('.header__link').contains('About').click();

    cy.url().should('include', '/about');
    cy.get('.about__title').contains('About Us');
  });

  it('checks Form link works', () => {
    cy.visit('/');

    cy.get('.header__link').contains('Form').click();

    cy.url().should('include', '/form');
    cy.get('.form-data__title').contains('Form');
  });

  it('checks Home link works', () => {
    cy.visit('/form');

    cy.get('.header__link').contains('Home').click();

    cy.url().should('include', '/');
    cy.get('.home__title').contains('Home');
  });

  it('Just a test to remove page load on coverage saving', () => {
    expect(true).to.equal(true);
  });
});
