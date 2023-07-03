import { decrease, increase } from "./utils-for-test";

describe('Тест сортировки пузырьком', () => {
    it('пустой массив по убыванию', () => {
        expect(decrease("bubble", [])).toEqual([]);
    })
    it('массив из одного элемента по убыванию', () => {
        expect(decrease("bubble", [9])).toEqual([9]);
    })
    it('массив из нескольких элементов по убыванию', () => {
        expect(decrease("bubble", [1,100,99,50])).toEqual([100,99,50,1]);
    })
    it('пустой массив по возростанию', () => {
        expect(increase("bubble", [])).toEqual([]);
    })
    it('массив из одного элемента по возростанию', () => {
        expect(increase("bubble", [9])).toEqual([9]);
    })
    it('массив из нескольких элементов по возростанию', () => {
        expect(increase("bubble", [1,100,99,50])).toEqual([1,50,99,100]);
    })
})