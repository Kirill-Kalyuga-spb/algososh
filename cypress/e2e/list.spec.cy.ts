import {
    classChanging,
    classDefault,
    classModified,
    circleInsides,
    circleSmall,
    head,
    tail,
    input,
    inputIndex,
    addHead,
    addTail,
    addByIndex,
    removeHead,
    removeTail,
    removeByIndex,
} from "./utils"
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays'

describe('Тест списка', () => {
    before(() => {
        cy.visit('/list')
    })

    it('пустой инпут => заблокированая кнопка', () => {
        cy.get(input).clear().as('input')
        cy.get("@input").should('have.value', '');
        cy.get(addHead).should('be.disabled')
        cy.get(addTail).should('be.disabled')

        cy.get(inputIndex).should('have.value', '');
        cy.get(addByIndex).should('be.disabled')
        cy.get(removeByIndex).should('be.disabled')
    })

    it('добавление в head', () => {
        // добавление 1 элем
        cy.get(input).type('1')
        cy.get(addHead).click()
        cy.get(circleInsides).as('circle')
        cy.wait(SHORT_DELAY_IN_MS)

        // добавление в head
        cy.get(input).type('2')
        cy.get(addHead).click()

        cy.get(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should('have.text', '2')
        })
        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
        })
        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[0]).children().should('have.text', '2')
            cy.get(item[1]).children().should('have.text', '1')
        })
    })

    it('добавление в tail', () => {
        cy.get(input).type('3')
        cy.get(addTail).click()
        cy.get(circleInsides).as('circle')

        cy.get(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should('have.text', '3')
        })
        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
        })
        cy.wait(SHORT_DELAY_IN_MS)

        cy.get('@circle').then((item: any) => {
            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[2]).children().should('have.text', '3')
            cy.get(item[1]).children().should('have.text', '1')
        })
    })

    it('добавление по индексу', () => {
        cy.get(input).type('4')
        cy.get(inputIndex).type('1')
        cy.get(addByIndex).click()
        cy.get(circleInsides).as('circle')

        //#1
        cy.get(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should('have.text', '4')
        })
        cy.get('@circle').not(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#2
        cy.get(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should('have.text', '4')
        })
        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#3
        cy.get(circleSmall).should('not.exist')
        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classModified));
            cy.get(item[1]).children().should('have.text', '4')
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#4
        cy.get('@circle').then((item: any) => {
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
        })
    })

    it('удаление по индексу', () => {
        cy.get(inputIndex).type('2')
        cy.get(removeByIndex).click()
        cy.get(circleInsides).as('circle')

        //#1
        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#2
        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#3
        cy.get('@circle').then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[2]).children().should('have.text', '1')
            cy.get(item[3]).children().should('have.text', '3')
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#4
        cy.get('@circle').not(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[2])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
        })
        cy.get(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should('have.text', '1')
        })
        cy.wait(SHORT_DELAY_IN_MS)
        
        //#5
        cy.get('@circle').not(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[2]).children().should('have.text', '3')
        })
    })

    it('удаление из head', () => {
        cy.get(removeHead).click()
        cy.get(circleInsides).as('circle')

        //#1
        cy.get('@circle').not(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[0]).children().should('have.text', '')
        })
        cy.get(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should('have.text', '2')
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#2
        cy.get('@circle').not(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[0]).children().should('have.text', '4')
        })
        cy.get(circleSmall).should('not.exist')
    })

    it('удаление из tail', () => {
        cy.get(removeTail).click()
        cy.get(circleInsides).as('circle')

        //#1
        cy.get('@circle').not(circleSmall).then((item: any) => {
            cy.get(item[1])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classDefault));
            cy.get(item[1]).children().should('have.text', '')
        })
        cy.get(circleSmall).then((item: any) => {
            cy.get(item[0])
                .invoke("attr", "class")
                .then((className) => expect(className).contains(classChanging));
            cy.get(item[0]).children().should('have.text', '3')
        })
        cy.wait(SHORT_DELAY_IN_MS)

        //#2
        cy.get('@circle').not(circleSmall).then((item: any) => {
            cy.get(item[1]).should('not.exist')
        })
        cy.get(circleSmall).should('not.exist')
    })
})