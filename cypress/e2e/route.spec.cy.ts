import { forEach } from "cypress/types/lodash";

const routes = [
    '/recursion',
    '/fibonacci',
    '/sorting',
    '/stack',
    '/queue',
    '/list',
]

describe('routes test', () => {
    before(() => {
        cy.visit('/');
    });

    routes.forEach((route) => {
        it(`visit ${route}`, () => {
            cy.get(`[href="${route}"]`).click()
            cy.location('pathname').should('eq', route)
            cy.get('[href="/"]').click()
        })
    })
})