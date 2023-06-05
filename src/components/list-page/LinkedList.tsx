class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    append: (element: T) => void;
    insertAt: (element: T, position: number) => void;
    removeAt: (position: number) => void;
    getSize: () => number;
    getArr: () => T[]
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertAt(element: T, index: number) {
        const node = new Node(element);
        // добавить элемент в начало списка
        if (index === 0) {
            node.next = this.head
            this.head = node
        } else {
            let curr = this.head;
            let currIndex = 0;
            // перебрать элементы в списке до нужной позиции
            while (currIndex < index - 1) {
                currIndex++
                if (curr?.next) {
                    curr = curr.next
                }
            }
            // добавить элемент
            if (curr?.next) {
                node.next = curr.next
                curr.next = node
            }
        }
        this.size++;
    }

    removeAt(index: number) {
        let cur = this.head
        
        if (index === 0 && this.head?.next === null) {
            this.head = null
        }

        if (index === 0 && this.head?.next) {
            let elem = this.head?.next || this.head
            if(cur !== null) { cur.next = null}
            this.head = elem
        } 

        if (index > 0) {
            let preCurr = this.head
            let curr = this.head?.next;
            let currIndex = 0;
            
            while (currIndex < index - 1) {
                currIndex++
                if (curr?.next && preCurr?.next) {
                    preCurr = preCurr.next
                    curr = curr.next
                }
            }
           
            if (curr?.next && preCurr?.next) {
                preCurr.next = curr.next
                curr.next = null
            } else {
                if(preCurr?.next) {
                    preCurr.next = null
                }
            }
        }
        this.size--;
    }

    append(element: T) {
        const node = new Node(element);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }

            current.next = node;
        }
        this.size++;
    }

    getSize() {
        return this.size;
    }

    getArr() {
        let curr = this.head;
        let arr: T[] = []
        while (curr) {
            arr.push(curr.value)
            curr = curr.next;
        }
        return arr
    }
}