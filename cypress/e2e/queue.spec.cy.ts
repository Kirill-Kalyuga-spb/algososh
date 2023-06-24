import {
    classChanging,
    classDefault,
    circleInsides,
    head,
    input,
    submit,
    remove,
    clear,
    tail
} from "./utils"
import { DELAY_IN_MS } from '../../src/constants/delays'

describe('Тест очереди', () => {
    before(() => {
        cy.visit('/queue')
    })

    it('пустой инпут => заблокированая кнопка', () => {
        cy.get(input).clear().as('input')
        cy.get("@input").should('have.value', '');
        cy.get(submit).should('be.disabled')
    })

    it('проверка анимаций', () => {
        cy.get(input).type('qwe').as('input')
        cy.get(submit).click().as('submit')

        cy.get(circleInsides).as('circle')
        cy.get(head).as('head')
        cy.get(tail).as('tail')

        // iteration #1
        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })

        cy.wait(DELAY_IN_MS)

        cy.get('@head').eq(0).should('have.text', 'head')
        cy.get('@tail').eq(0).should('have.text', 'tail')

        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[0]).children().contains('qwe')
        })

        // iteration #2
        cy.get('@input').type('rty')
        cy.get('@submit').click()

        cy.get('@circle').then((item: any) => {
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })

        cy.wait(DELAY_IN_MS)

        cy.get('@head').eq(0).should('have.text', 'head')
        cy.get('@tail').eq(0).should('not.have.text', 'tail')
        cy.get('@head').eq(1).should('not.have.text', 'head')
        cy.get('@tail').eq(1).should('have.text', 'tail')

        cy.get('@circle').then((item: any) => {
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[1]).children().contains('rty')
        })

        // iteration #3-7
        for (let i = 0; i < 5; i++) {
            cy.get('@input').type(String(i))
            cy.get('@submit').click()
            cy.wait(DELAY_IN_MS)
        }
        
        //remove
        cy.get(remove).click()

        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })

        cy.wait(DELAY_IN_MS)

        cy.get('@head').eq(0).should('not.have.text', 'head')
        cy.get('@head').eq(1).should('have.text', 'head')
        cy.get('@circle').eq(0).should('have.text', '')

        // iteration #8 (переход tail в 'начало' очереди)
        cy.get('@input').type('lzx')
        cy.get('@submit').click()

        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })

        cy.wait(DELAY_IN_MS)

        cy.get('@tail').eq(0).should('have.text', 'tail')
        cy.get('@tail').eq(6).should('not.have.text', 'tail')

        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[0]).children().contains('lzx')
        })

        // remove 1-5 elem
        for (let i = 0; i < 5; i++) {
            cy.get(remove).click()
            cy.wait(DELAY_IN_MS)
        }

        // переход head в 'начало'
        cy.get(remove).click()

        cy.get('@circle').then((item: any) => {
            cy.get(item[6])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })

        cy.wait(DELAY_IN_MS)

        cy.get('@head').eq(0).should('have.text', 'head')
        cy.get('@head').eq(6).should('not.have.text', 'head')

        // clear
        cy.get('@input').type('cvb')
        cy.get('@submit').click()
        cy.wait(DELAY_IN_MS)

        cy.get(clear).click()
        cy.get('@circle').then((item: any) => {
            for(let i = 0; i < 7; i++) {
                cy.get(item[i]).children().should('have.text','')
                cy.get('@head').eq(i).should('not.have.text', 'head')
                cy.get('@tail').eq(i).should('not.have.text', 'tail')
            }
        })
    })
})