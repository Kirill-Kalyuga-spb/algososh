interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getStack: () => T[];
    clear: () => void;
}

class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        this.container.pop();
    };

    getStack = () => this.container;

    clear = () => {
        this.container = [];
    };
}

export const stack = new Stack<string>();