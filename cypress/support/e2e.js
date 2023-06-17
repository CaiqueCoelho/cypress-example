import "./commands";
import addContext from "mochawesome/addContext";

afterEach(() => {
  cy.wait(1000);
});

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshot = `screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({ test }, screenshot);
  }

  const video = `videos/${Cypress.spec.name}.mp4`;
  addContext({ test }, video);
});

Cypress.on("after:spec", (test, runnable) => {
  const video = `videos/${Cypress.spec.name}.mp4`;
  addContext({ test }, video);
});
