/// <reference types="cypress" />

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('works with value in search bar', function () {
    cy.visit('/');
    cy.get('.search__input > input').type('funny');
    cy.get('.search__button').click();
  });

  it('modal opens when is card is clicked', function () {
    cy.visit('/');
    cy.get('[data-testid="card"]:first-child').click();
    cy.get('.modal').should('exist');
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
});

describe('The Form Page', () => {
  it('successfully loads', () => {
    cy.visit('/form');
  });

  it('correctly works when fill the fields', function () {
    cy.visit('/form');
    cy.get('#title').type('Oliver').should('have.value', 'Oliver');
    cy.get('#date').type('2023-04-22').should('have.value', '2023-04-22');
    cy.get('#color').select('red').should('have.value', 'red');
    cy.get('#small').check('small').should('have.value', 'small');
    cy.get('#postcard').check('postcard');
    cy.fixture('example.jpg').then((fileContent) => {
      cy.get('#file').trigger('change', {
        target: { files: [new File([fileContent], 'example.jpg')] },
      });
    });
  });

  it('Just a test to remove page load on coverage saving', () => {
    expect(true).to.equal(true);
  });
});
