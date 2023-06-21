import { decrease, increase } from "./utils-for-test";

describe('Тест сортировки выбором', () => {
    it('пустой массив по убыванию', () => {
        expect(decrease("choice", [])).toEqual([]);
    })
    it('массив из одного элемента по убыванию', () => {
        expect(decrease("choice", [9])).toEqual([9]);
    })
    it('массив из нескольких элементов по убыванию', () => {
        expect(decrease("choice", [1,100,99,50])).toEqual([100,99,50,1]);
    })
    it('пустой массив по возростанию', () => {
        expect(increase("choice", [])).toEqual([]);
    })
    it('массив из одного элемента по возростанию', () => {
        expect(increase("choice", [9])).toEqual([9]);
    })
    it('массив из нескольких элементов по возростанию', () => {
        expect(increase("choice", [1,100,99,50])).toEqual([1,50,99,100]);
    })
})