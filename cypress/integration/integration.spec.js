describe('Navigate to app', () => {
  it('Visits the app (running on port 3000)', () => {
    cy.visit('http://localhost:3000');
  });

  it('Prompts user to create an account', () => {
    cy.contains('Create your account');
  });
});

describe('Invalid password (length below 9 chars)', () => {
  let user;

  before(function () {
    cy.task('invalidPassword1').then((data) => {
      user = data;
    });
  });

  it('Enters a password below 9 chars', () => {
    cy.get('#name').type(user.name);
    cy.get('#role').type(user.role);
    cy.get('#email').type(user.email);
    cy.get('#password').type(user.password);

    cy.get('button[type=submit]').click();
  });

  it('Shows an error because the password is not correct', () => {
    cy.contains('Error');
    cy.contains('password has to be 9 chars long');
  });

  it('Does not navigate to the next part of the form', () => {
    cy.contains('Create your account');
  });
});

describe('Invalid password (no numbers)', () => {
  let user;

  before(function () {
    cy.task('invalidPassword2').then((data) => {
      user = data;
    });
  });

  it('Enters a password without numbers', () => {
    cy.wait(1000);
    cy.get('#name').clear().type(user.name);
    cy.get('#role').clear().type(user.role);
    cy.get('#email').clear().type(user.email);
    cy.get('#password').clear().type(user.password);

    cy.get('button[type=submit]').click();
  });

  it('Shows an error because the password is not correct', () => {
    cy.contains('Error');
    cy.contains('and one number');
  });

  it('Does not navigate to the next part of the form', () => {
    cy.contains('Create your account');
  });
});

describe('Invalid password (no lower case)', () => {
  let user;

  before(function () {
    cy.task('invalidPassword3').then((data) => {
      user = data;
    });
  });

  it('Enters a password without lowercase letter', () => {
    cy.wait(1000);
    cy.get('#name').clear().type(user.name);
    cy.get('#role').clear().type(user.role);
    cy.get('#email').clear().type(user.email);
    cy.get('#password').clear().type(user.password);

    cy.get('button[type=submit]').click();
  });

  it('Shows an error because the password is not correct', () => {
    cy.contains('Error');
    cy.contains('one lowercase letter');
  });

  it('Does not navigate to the next part of the form', () => {
    cy.contains('Create your account');
  });
});

describe('No email entered', () => {
  let user;

  before(function () {
    cy.task('invalidUser').then((data) => {
      user = data;
    });
  });

  it('Fills the input without an email', () => {
    cy.wait(1000);
    cy.get('#name').clear().type(user.name);
    cy.get('#role').clear().type(user.role);
    cy.get('#email').clear();
    cy.get('#password').clear().type(user.password);

    cy.get('button[type=submit]').click();
  });

  it('Shows an error because there is no email', () => {
    cy.contains('Error');
    cy.contains('Please enter a valid email');
  });

  it('Does not navigate to the next part of the form', () => {
    cy.contains('Create your account');
  });
});

describe('No name entered', () => {
  let user;

  before(function () {
    cy.task('invalidUser').then((data) => {
      user = data;
    });
  });

  it('Fills the input without a name', () => {
    cy.wait(1000);
    cy.get('#name').clear();
    cy.get('#role').clear().type(user.role);
    cy.get('#email').clear().type(user.email);
    cy.get('#password').clear().type(user.password);

    cy.get('button[type=submit]').click();
  });

  it('Shows an error because there is no email', () => {
    cy.contains('Error');
    cy.contains('Your name is required');
  });

  it('Does not navigate to the next part of the form', () => {
    cy.contains('Create your account');
  });
});

describe('Valid form submit', () => {
  let user;

  before(function () {
    cy.task('validInputs').then((data) => {
      user = data;
    });
  });

  it('Enters all valid inputs', () => {
    cy.wait(1000);
    cy.get('#name').clear().type(user.name);
    cy.get('#role').clear().type(user.role);
    cy.get('#email').clear().type(user.email);
    cy.get('#password').clear().type(user.password);

    cy.get('button[type=submit]').click();
  });

  it('Should go to the next part of the form', () => {
    cy.contains('Receive updates about Tray.io');
  });
});
