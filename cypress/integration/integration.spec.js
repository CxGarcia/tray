describe('Navigate to app', () => {
  it('Visits the app (running on port 3000)', () => {
    cy.visit('http://localhost:3000');
  });

  it('Prompts user to create an account', () => {
    cy.contains('Create your account');
  });
});

describe('User form step', () => {
  it('The user step has a blue background color', () => {
    cy.get('h3')
      .contains('user')
      .should('have.css', 'background-color', 'rgb(15, 102, 228)');
  });

  it('The remaining steps have a grey background color', () => {
    cy.get('h3')
      .contains('privacy')
      .should('have.css', 'background-color', 'rgb(166, 166, 166)');

    cy.get('h3')
      .contains('done')
      .should('have.css', 'background-color', 'rgb(166, 166, 166)');
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

  it('Shows an error because there is no name', () => {
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
    cy.fixture('valid-user.json').then((data) => {
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
    cy.wait(500);

    cy.contains('Receive updates about Tray.io');
  });
});

describe('Privacy form step', () => {
  it('The privacy step and previous steps have a blue background color', () => {
    cy.get('h3')
      .contains('user')
      .should('have.css', 'background-color', 'rgb(15, 102, 228)');

    cy.get('h3')
      .contains('privacy')
      .should('have.css', 'background-color', 'rgb(15, 102, 228)');
  });

  it('The remaining steps have a grey background color', () => {
    cy.get('h3')
      .contains('done')
      .should('have.css', 'background-color', 'rgb(166, 166, 166)');
  });

  it('click on the updates', () => {
    cy.get('#trayUpdates').click();
    cy.get('#otherUpdates').click();
  });
});

describe('Going back from privacy to user', () => {
  let user;

  before(function () {
    cy.fixture('valid-user.json').then((data) => {
      user = data;
    });
  });

  it('Goes back to the previous step', () => {
    cy.get('button').contains('Go Back').click();
    cy.wait(500);

    cy.contains('Create your account');
  });

  it('The user step has a blue background color', () => {
    cy.get('h3')
      .contains('user')
      .should('have.css', 'background-color', 'rgb(15, 102, 228)');
  });

  it('The remaining steps have a grey background color', () => {
    cy.get('h3')
      .contains('privacy')
      .should('have.css', 'background-color', 'rgb(166, 166, 166)');

    cy.get('h3')
      .contains('done')
      .should('have.css', 'background-color', 'rgb(166, 166, 166)');
  });

  it('The user values should be the same as the ones introduced before', () => {
    cy.get('#name').should('have.value', user.name);
    cy.get('#role').should('have.value', user.role);
    cy.get('#email').should('have.value', user.email);
    cy.get('#password').should('have.value', user.password);
  });
});

describe('Back to privacy form step', () => {
  it('Goes back to the privacy step', () => {
    cy.get('button[type=submit]').click();
    cy.wait(500);

    cy.contains('Hear from us');
  });

  it('The privacy step and previous steps have a blue background color', () => {
    cy.get('h3')
      .contains('user')
      .should('have.css', 'background-color', 'rgb(15, 102, 228)');

    cy.get('h3')
      .contains('privacy')
      .should('have.css', 'background-color', 'rgb(15, 102, 228)');
  });

  it('The remaining steps have a grey background color', () => {
    cy.get('h3')
      .contains('done')
      .should('have.css', 'background-color', 'rgb(166, 166, 166)');
  });

  it('The boxes are still checked after going back to prev step and coming back', () => {
    cy.get('#trayUpdates').should('have.attr', 'checked');
    cy.get('#otherUpdates').should('have.attr', 'checked');
  });
});

describe('Submit the final form', () => {
  it('Submits the form and spinner should appear', () => {
    cy.get('button[type=submit]').click();
    cy.wait(100);
    cy.get('#spinner');
  });
});
