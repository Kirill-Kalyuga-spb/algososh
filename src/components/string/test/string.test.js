import { reversalString } from "./utils-for-test";

describe('Тест компонента String', () => {
    it('с чётным количеством символов', () => {
        expect(reversalString("abcd")).toEqual(['d','c','b','a']);
    })
    it('с нечетным количеством символов', () => {
        expect(reversalString("abc")).toEqual(['c','b','a']);
    })
    it('с одним символом', () => {
        expect(reversalString("a")).toEqual(['a']);
    })
    it('пустую строку', () => {
        expect(reversalString("")).toEqual([]);
    })
})