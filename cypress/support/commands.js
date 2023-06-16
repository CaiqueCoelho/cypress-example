// -- This is a parent command --
Cypress.Commands.add("getAndStorageText", (id, variable) => {
  cy.get(`#${id}`)
    .invoke("text")
    .then((percentage) => {
      variable = percentage;
      cy.log(variable);
    });
});
