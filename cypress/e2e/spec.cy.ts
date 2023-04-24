/// <reference types="cypress" />
import 'cypress-file-upload';

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
    cy.get('.modal__text').should('exist');
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
    cy.get('#file').attachFile('example.jpg');
  });

  it('clear all fields after submit', function () {
    cy.visit('/form');
    cy.get('#title').type('Oliver').should('have.value', 'Oliver');
    cy.get('#date').type('2023-04-22').should('have.value', '2023-04-22');
    cy.get('#color').select('Red').should('have.value', 'red');
    cy.get('#small').check('small').should('have.value', 'small');
    cy.get('#postcard').check('postcard');
    cy.get('#file').attachFile('example.jpg');

    cy.get('.form__button').click();

    cy.get('#title').should('have.value', '');
    cy.get('#date').should('have.value', '');
    cy.get('#color').should('have.value', '');
    cy.get('#small').should('not.be.checked');
    cy.get('#medium').should('not.be.checked');
    cy.get('#big').should('not.be.checked');
    cy.get('#postcard').should('not.be.checked');
    cy.get('#trinket').should('not.be.checked');
    cy.get('#file').should('have.value', '');
  });

  it('show mistakes when gift, size and image are not selected', function () {
    cy.visit('/form');
    cy.get('#title').type('Oliver').should('have.value', 'Oliver');
    cy.get('#date').type('2023-04-22').should('have.value', '2023-04-22');
    cy.get('#color').select('red').should('have.value', 'red');
    cy.get('.form__button').click();
    cy.get('p.error').contains('Size is required').should('be.visible');
    cy.get('p.error').contains('Gift is required').should('be.visible');
    cy.get('p.error').contains('Image is required').should('be.visible');
  });

  it('show mistakes when title does not start with uppercase letter', function () {
    cy.visit('/form');
    cy.get('#title').type('oliver').should('have.value', 'oliver');
    cy.get('.form__button').click();
    cy.get('p.error').contains('First letter must be uppercase').should('be.visible');
  });

  it('show mistakes when data is greater then current', function () {
    cy.visit('/form');
    cy.get('#date').type('2023-05-22').should('have.value', '2023-05-22');
    cy.get('.form__button').click();
    cy.get('p.error').contains('Date cannot be greater than current').should('be.visible');
  });
});

describe('The Not found Page', () => {
  it('successfully loads', () => {
    cy.visit('/wrong');
    cy.url().should('include', '/wrong');
    cy.get('.not-found__title').contains('Not found');
  });

  it('Just a test to remove page load on coverage saving', () => {
    expect(true).to.equal(true);
  });
});
