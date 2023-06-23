import {
    classChanging,
    classDefault,
    circleInsides,
    head,
    input,
    submit,
    remove,
    clear
} from "./utils"
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'

describe('Тест Фибоначчи', () => {
    before(() => {
        cy.visit('/stack')
    })

    it('пустой инпут => заблокированая кнопка', () => {
        cy.get(input).clear().as('input')
        cy.get("@input").should('have.value', '');
        cy.get(submit).should('be.disabled')
    })

    it('проверка анимаций', () => {
        cy.get(input).type('abc').as('input')
        cy.get(submit).click().as('submit')

        cy.get(circleInsides).as('circle')
        cy.get(head).as('head')

        // iteration #1
        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().contains('abc')
        })
        cy.get('@head').eq(0).should('have.text', 'top')

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
        })

        // iteration #2
        cy.get('@input').type('def')
        cy.get('@submit').click()

        cy.get('@circle').then((item: any) => {
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[1]).children().contains('def')
        })
        cy.get('@head').eq(0).should('not.have.text', 'top')
        cy.get('@head').eq(1).should('have.text', 'top')

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
        })

        // iteration #3
        cy.get('@input').type('ghi')
        cy.get('@submit').click()

        cy.get('@circle').then((item: any) => {
            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[2]).children().contains('ghi')
        })
        cy.get('@head').eq(1).should('not.have.text', 'top')
        cy.get('@head').eq(2).should('have.text', 'top')

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
        })

        //remove top
        cy.get(remove).click()

        cy.get('@circle').then((item: any) => {
            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@head').eq(1).should('have.text', 'top')
        cy.get('@circle').eq(2).should('not.exist')

        //clear all
        cy.get(clear).click()
        cy.get('@circle').should('not.exist')
    })
})