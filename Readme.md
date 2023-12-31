# Cypress Test

We will be testing the application https://apexcharts.com/samples/react/pie/simple-donut.html

## How to run the Cypress tests locally

1. Install all dependencia in the terminal run `npm i`
2. In the terminal open Cypress with `npx cypress open` or run cypress headless with `npm run e2e:tests`

## Pipeline

With the tests automated in the GHA pipeline, we can execute our tests every time a pull request is opened to our project to assure everything still works like expected and block the Pull Request from being merged if any tests failed

We can also execute the tests manually by the workflow dispatch in the following link by clicking in the [following link](https://github.com/CaiqueCoelho/cypress-example/actions/workflows/e2e.yml) on Run Workflow in the gray box and on the Run Workflow green button

https://github.com/CaiqueCoelho/cypress-example/actions/workflows/e2e.yml

When the job of tests finish we can see the reports of our executed tests hosted in the Github Artifacts you can find a HTML report, with screenshots when the test failed, and the video of the execution of the tests.

## How to run the Cypress tests in GHA

Go to https://apexcharts.com/samples/react/pie/simple-donut.html and click in the gray button called Run Workflow and in the green button
called Run Workflow, the job will start and you will be able to see all the steps running include the test and you can download the report in the end
of the job execution in the Summary of the job action in the Artifacts section like the following example https://github.com/CaiqueCoelho/cypress-example/actions/runs/5299155073

## Tests report from the Cypress execution

I'm using Github Pages to store the lastest test execution so you can access the following link to see the report of the test execution https://caiquecoelho.github.io/cypress-example/
Or you can download the report from the Github Artifact of the last execution https://github.com/CaiqueCoelho/cypress-example/suites/13677686927/artifacts/755789239

## Tests videos from the Cypress execution

[Tests Execution](https://github.com/CaiqueCoelho/cypress-example/raw/main/docs/videos/simple-donut.cy.js.mp4)
