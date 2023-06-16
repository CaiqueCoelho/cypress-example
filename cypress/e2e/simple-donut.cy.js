describe("simple-donut", () => {
  beforeEach(() => {
    cy.visit("/samples/react/pie/simple-donut.html");
  });

  it("Getting simple donut chart and verify if is visible", () => {
    cy.get("#chart").should("be.visible");

    cy.get('[seriesname="series-1"]').should("be.visible");
    cy.get('[seriesname="series-2"]').should("be.visible");
    cy.get('[seriesname="series-3"]').should("be.visible");
    cy.get('[seriesname="series-4"]').should("be.visible");
    cy.get('[seriesname="series-5"]').should("be.visible");
  });

  it("Click in a specific series name and see if the information on chat is highleted", () => {
    cy.get('[seriesname="series-1"]').first().click();

    cy.get('[seriesName="series-1"]')
      .eq(1)
      .children()
      .should("have.attr", "data:pieClicked", "true");
  });

  it("Assert that the total values in an element is being shown", () => {
    cy.get('[seriesName="series-1"]')
      .eq(1)
      .children()
      .should("have.attr", "data:value", 44);

    cy.get('[seriesName="series-1"]')
      .eq(1)
      .children()
      .invoke("attr", "data:value")
      .then((value) => {
        expect(Number(value)).to.be.gte(0);
      });
  });

  it("Checking if sum all the series on the char is we are getting 100%", () => {});

  it("Check if the values on my series represet the real percetage shown on the chart", () => {});

  it("Check if a series with 0 values would be display in the chart with percentage 0%", () => {});

  it("Hover in a series in chart should show the total number of values in the serie", () => {});

  it("Intercept the endpoint requests sending the series data and check if the information on the chart is the same one from our endpoint response", () => {});

  it("Check if my series on chart have different colors", () => {});

  it("Run cypress-axe to check if our chart have a great accessibility score for people with vision problems, like aria-labels and good contrast color", () => {});

  it("Run cypress-axe to check if our chart have a great accessibility score for people with vision problems, like aria-labels and good contrast color", () => {});

  it("The color in the series name on summary should be the same color on the chart", () => {});
});
