/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const faker = require('faker');

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    invalidPassword1() {
      let user = {
        name: faker.name.firstName(),
        role: faker.name.jobTitle(),
        email: faker.internet.email(),
        password: faker.internet.password(8, false, /^[A-Za-z0-9]*$/),
      };

      return user;
    },
  });

  on('task', {
    invalidPassword2() {
      let user = {
        name: faker.name.firstName(),
        role: faker.name.jobTitle(),
        email: faker.internet.email(),
        password: faker.internet.password(9, false, /^[A-Za-z]*$/),
      };
      return user;
    },
  });

  on('task', {
    invalidPassword3() {
      let user = {
        name: faker.name.firstName(),
        role: faker.name.jobTitle(),
        email: faker.internet.email(),
        password: faker.internet.password(9, false, /^[A-Z0-9]*$/),
      };
      return user;
    },
  });

  on('task', {
    invalidUser() {
      let user = {
        name: faker.name.firstName(),
        role: faker.name.jobTitle(),
        email: faker.name.firstName(),
        password: faker.internet.password(9, false, /^[A-Z0-9]*$/),
      };
      return user;
    },
  });

  on('task', {
    validInputs() {
      let user = {
        name: faker.name.firstName(),
        role: faker.name.jobTitle(),
        email: faker.internet.email(),
        password: faker.internet.password(9, false, /^[A-Za-z0-9]*$/),
      };
      return user;
    },
  });
};
