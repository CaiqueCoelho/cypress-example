import { calculatePercentage } from "../support/utils";

describe("simple-donut", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

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

  it("Check if a series with 0 values would be display in the chart with percentage 0%", () => {
    cy.intercept("https://apexcharts.com/samples/react/pie/simple-donut.html", {
      fixture: "simple-donut.html",
    }).as("simple-donut");

    cy.visit("/samples/react/pie/simple-donut.html");

    cy.wait("@simple-donut");

    cy.get("#chart").should("be.visible");
    cy.get('[seriesname="series-1"]').should("be.visible");
    cy.get('[seriesName="series-1"]')
      .eq(1)
      .children()
      .should("have.attr", "data:value", 0);
  });

  it("Checking if sum all the series on the char is we are getting 100%", () => {
    cy.get("#SvgjsText1018")
      .invoke("text")
      .then((series1) => {
        cy.get("#SvgjsG1030")
          .invoke("text")
          .then((series2) => {
            cy.get("#SvgjsG1043")
              .invoke("text")
              .then((series3) => {
                cy.get("#SvgjsG1056")
                  .invoke("text")
                  .then((series4) => {
                    cy.get("#SvgjsG1069")
                      .invoke("text")
                      .then((series5) => {
                        const sumSeriesPercentage =
                          Number(series1.replace("%", "")) +
                          Number(series2.replace("%", "")) +
                          Number(series3.replace("%", "")) +
                          Number(series4.replace("%", "")) +
                          Number(series5.replace("%", ""));
                        expect(Math.floor(sumSeriesPercentage)).to.be.equals(
                          100
                        );
                      });
                  });
              });
          });
      });
  });

  it("Check if the values on my series represet the real percetage shown on the chart", () => {
    let totalSeriesValues = 0;
    let seriesValues = undefined;
    cy.get('[type="donut"]')
      .invoke("attr", "series")
      .then((series) => {
        seriesValues = series.split(",");
        totalSeriesValues =
          Number(seriesValues[0]) +
          Number(seriesValues[1]) +
          Number(seriesValues[2]) +
          Number(seriesValues[3]) +
          Number(seriesValues[4]);
      });
    cy.get("#SvgjsText1018")
      .invoke("text")
      .then((series1Percentage) => {
        cy.get("#SvgjsG1030")
          .invoke("text")
          .then((series2Percentage) => {
            cy.get("#SvgjsG1043")
              .invoke("text")
              .then((series3Percentage) => {
                cy.get("#SvgjsG1056")
                  .invoke("text")
                  .then((series4Percentage) => {
                    cy.get("#SvgjsG1069")
                      .invoke("text")
                      .then((series5Percentage) => {
                        const sumSeriesPercentage =
                          Number(series1Percentage.replace("%", "")) +
                          Number(series2Percentage.replace("%", "")) +
                          Number(series3Percentage.replace("%", "")) +
                          Number(series4Percentage.replace("%", "")) +
                          Number(series5Percentage.replace("%", ""));

                        expect(Math.floor(sumSeriesPercentage)).to.be.equals(
                          100
                        );

                        const seriesPercentage1Calculated = calculatePercentage(
                          totalSeriesValues,
                          seriesValues[0]
                        );

                        const seriesPercentage2Calculated = calculatePercentage(
                          totalSeriesValues,
                          seriesValues[1]
                        );
                        const seriesPercentage3Calculated = calculatePercentage(
                          totalSeriesValues,
                          seriesValues[2]
                        );
                        const seriesPercentage4Calculated = calculatePercentage(
                          totalSeriesValues,
                          seriesValues[3]
                        );
                        const seriesPercentage5Calculated = calculatePercentage(
                          totalSeriesValues,
                          seriesValues[4]
                        );

                        expect(
                          Number(series1Percentage.replace("%", ""))
                        ).to.be.equals(seriesPercentage1Calculated);

                        expect(
                          Number(series2Percentage.replace("%", ""))
                        ).to.be.equals(seriesPercentage2Calculated);

                        expect(
                          Number(series3Percentage.replace("%", ""))
                        ).to.be.equals(seriesPercentage3Calculated);

                        expect(
                          Number(series4Percentage.replace("%", ""))
                        ).to.be.equals(seriesPercentage4Calculated);

                        expect(
                          Number(series5Percentage.replace("%", ""))
                        ).to.be.equals(seriesPercentage5Calculated);
                      });
                  });
              });
          });
      });
  });

  it("Hover in a series in chart should show the total number of values in the serie", () => {});

  it("Get All Donut Percentage values using cypress-map methods and save as Env value", () => {
    cy.get('[type="donut"]')
      .map("innerText")
      .mapInvoke("split", "\n")
      .mapInvoke("slice", 5)
      .asEnv("donut-values")
      .print();
  });

  it("Check if values Donut Percentage is equal a 100%", () => {
    cy.get('[type="donut"]')
      .map("innerText")
      .mapInvoke("split", "\n")
      .mapInvoke("slice", 5)
      .at(-1)
      .map(parseInt)
      .reduce((sum, n) => sum + n, 3)
      .should("equal", 100);
  });

  it("Intercept the endpoint requests sending the series data and check if the information on the chart is the same one from our endpoint response", () => {});

  it("Check if my series on chart have different colors", () => {});

  it("Run cypress-axe to check if our chart have a great accessibility score for people with vision problems, like aria-labels and good contrast color", () => {});

  it("Run cypress-axe to check if our chart have a great accessibility score for people with vision problems, like aria-labels and good contrast color", () => {});

  it("The color in the series name on summary should be the same color on the chart", () => {});
});
