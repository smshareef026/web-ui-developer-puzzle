describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should see my reading list and snackbar after adding book to Reading List', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]')
      .find('.book--content--info button')
      .not('[disabled]')
      .eq(1)
      .click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );

    cy.get('.mat-snack-bar-container')
      .find('.mat-simple-snackbar')
      .should('contain.text', 'added');

    cy.get('.mat-snack-bar-container')
      .get('.mat-simple-snackbar-action > .mat-focus-indicator')
      .should('contain.text', 'Undo');
  });

  it('Then: After adding book to reading list when I click on remove button then should able to see snackbar with Undo action', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]')
      .find('.book--content--info button')
      .not('[disabled]')
      .eq(1)
      .click();

    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('.reading-list-content')
      .find('.reading-list-item .mat-button-wrapper')
      .eq(0)
      .click();

    cy.get('.mat-snack-bar-container .mat-simple-snackbar').should(
      'contain.text',
      'removed'
    );
    cy.get('.mat-snack-bar-container')
      .get('.mat-simple-snackbar-action > .mat-focus-indicator')
      .should('contain.text', 'Undo');
  });

  it('Then: I should be able perform undo action on snackbar after adding book to reading list', () => {
    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .its('length')
      .then((value) => {
        const readingListItemsLengthBeforeAddingBook = value;

        cy.get('input[type="search"]').type('javascript');

        cy.get('form').submit();

        cy.get('[data-testing="book-item"]')
          .find('.book--content--info button')
          .not('[disabled]')
          .eq(1)
          .click();

        cy.get('.mat-snack-bar-container')
          .find('.mat-simple-snackbar-action > .mat-focus-indicator')
          .contains('Undo')
          .click();

        cy.get('.reading-list-content')
          .find('.reading-list-item')
          .should('have.length', readingListItemsLengthBeforeAddingBook);
      });
  });

  it('Then: I should be able perform undo action on snackbar after removing book from reading list', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]')
      .find('.book--content--info button')
      .not('[disabled]')
      .eq(1)
      .click();

    cy.get('.reading-list-content')
      .find('.reading-list-item')
      .its('length')
      .then((value) => {
        const readingListBooksCount = value;

        cy.get('[data-testing="toggle-reading-list"]').click();

        cy.get('.reading-list-content')
          .find('.reading-list-item .mat-button-wrapper')
          .eq(0)
          .click();

        cy.get('.mat-snack-bar-container')
          .get(
            '.mat-simple-snackbar-action > .mat-focus-indicator > .mat-button-wrapper'
          )
          .contains('Undo')
          .click();

        cy.get('.reading-list-content')
          .find('.reading-list-item')
          .should('have.length', readingListBooksCount);
      });
  });
});
