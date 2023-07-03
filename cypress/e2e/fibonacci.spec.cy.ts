import { circleInsides, input, submit } from "./utils"
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'

describe('Тест Фибоначчи', () => {
    before(() => {
        cy.visit('/fibonacci')
    })

    it('пустой инпут => заблокированая кнопка', () => {
        cy.get(input).clear().as('input')
        cy.get("@input").should('have.value', '');
        cy.get(submit).should('be.disabled')
    })

    it('проверка генерации чисел', () => {
        cy.get(input).type('4')
        cy.get(submit).click()
        cy.get(circleInsides).as('circle')

        cy.get('@circle').then((item: any) => {
            cy.get(item[0]).children().contains(1)
        })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[1]).children().contains(1)
        })

        cy.wait(SHORT_DELAY_IN_MS)
        
        cy.get('@circle').then((item: any) => {
            cy.get(item[2]).children().contains(2)
        })

        cy.wait(SHORT_DELAY_IN_MS)
        
        cy.get('@circle').then((item: any) => {
            cy.get(item[3]).children().contains(3)
        })

        cy.wait(SHORT_DELAY_IN_MS)
        
        cy.get('@circle').then((item: any) => {
            cy.get(item[4]).children().contains(5)
        })
    })
})