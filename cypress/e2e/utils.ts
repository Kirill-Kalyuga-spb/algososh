import { ElementStates } from '../../src/types/element-states'

export const classModified = `circle_${ElementStates.Modified}`;
export const classDefault = `circle_${ElementStates.Default}`;
export const classChanging = `circle_${ElementStates.Changing}`;

export const circleInsides = '[data-testid=circle-circle]';
export const circleSmall = '[class*="circle_small"]';
export const head = '[data-testid="head"]'
export const tail = '[data-testid="tail"]'

export const input = '[data-testid="input"]'
export const submit = '[data-testid="submit"]'
export const remove = '[data-testid="delete"]'
export const clear = '[data-testid="clear"]'

export const inputIndex = '[data-testid="input-index"]'
export const addHead = '[data-testid="add-head"]'
export const addTail = '[data-testid="add-tail"]'
export const addByIndex = '[data-testid="add-by-index"]'
export const removeHead = '[data-testid="remove-head"]'
export const removeTail = '[data-testid="remove-tail"]'
export const removeByIndex = '[data-testid="remove-by-index"]'