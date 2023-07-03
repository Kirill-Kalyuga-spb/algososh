import {
    classModified,
    classChanging,
    classDefault,
    circleInsides,
    input,
    submit
} from './utils'

import { DELAY_IN_MS } from '../../src/constants/delays'

describe('Тест String ', () => {
    before(() => {
        cy.visit('/recursion')
    })

    it('пустой инпут => заблокированая кнопка', () => {
        cy.get(input).clear().as('input')
        cy.get("@input").should('have.value', '');
        cy.get(submit).should('be.disabled')
    })

    it('проверка анимации', () => {
        const str = 'abcde'

        cy.get(input).type(str)
        cy.get(submit).click()

        cy.get('[data-testid="list"]')
            .children()
            .should('have.length', 5)

        cy.get(circleInsides).as('circle')

        // iteration #1
        cy.get("@circle").then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should("have.text", "a");

            cy.get(item[4])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[4]).children().should("have.text", "e");

            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[1]).children().should("have.text", "b");

            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[2]).children().should("have.text", "c");

            cy.get(item[3])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[3]).children().should("have.text", "d");
        })

        cy.wait(DELAY_IN_MS)

        // iteration #2
        cy.get("@circle").then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[0]).children().should("have.text", "e");

            cy.get(item[4])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[4]).children().should("have.text", "a");

            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[1]).children().should("have.text", "b");

            cy.get(item[3])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[3]).children().should("have.text", "d");

            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[2]).children().should("have.text", "c");
        })

        cy.wait(DELAY_IN_MS)

        // iteration #3
        cy.get("@circle").then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[0]).children().should("have.text", "e");

            cy.get(item[4])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[4]).children().should("have.text", "a");

            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[1]).children().should("have.text", "d");

            cy.get(item[3])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[3]).children().should("have.text", "b");

            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[2]).children().should("have.text", "c");
        })
    })
})