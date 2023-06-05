interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    getElements: () => T[];
    getHead: () => number;
    getTail: () => number;
    getLength: () => number;
    clear: () => void;
    isEmpty: () => void;
}

export class Queue<T> implements IQueue<T> {
    private container: T[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill("");
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        } else {
            this.container[this.tail] = item
            this.tail = (this.tail + 1) % this.size;
            this.length++;
        }
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        } else {
            delete this.container[this.head];
            this.head = (this.head + 1) % this.size;
            this.length--;
        }
    };

    isEmpty = () => this.length === 0;

    getElements = () => this.container;

    getHead = (): number => this.head;

    getTail = (): number => this.tail;

    getLength = (): number => this.length;

    clear = () => {
        this.container = Array(this.size).fill("");
        this.length = 0;
        this.head = 0;
        this.tail = 0;
    };
}