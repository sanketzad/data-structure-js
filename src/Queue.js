class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

/**
 * Queue implementation using a linked list.
 * * FIFO (First In, First Out) structure.
 * * The queue is implemented using a singly linked list.
 * * Operations:
 *  * enqueue: O(1)
 *  * dequeue: O(1)
 *  * peek: O(1)
 *  * isEmpty: O(1)
 *  * size: O(1)
 *  * lookUp: O(n)
 */
class Queue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    enqueue(value) {
        const newNode = new Node(value);

        if (this.size === 0) {
            this.front = newNode;
            this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }

        this.size++;
        return this.size;
    }

    dequeue() {
        if (this.size === 0) {
            return null;
        }

        const dequeuedNode = this.front;
        this.front = this.front.next;
        this.size--;

        if (this.size === 0) {
            this.rear = null;
        }

        return dequeuedNode;
    }

    peek() {
        if (this.size === 0) {
            return null;
        }

        return this.front;
    }

    isEmpty() {
        return this.size === 0;
    }
}

const myQueue = new Queue();
myQueue.enqueue(1);
myQueue.enqueue(2);
myQueue.enqueue(3);
console.log(myQueue.peek()); // Node { value: 1, next: Node { value: 2, next: [Node] } }
console.log(myQueue.dequeue()); // Node { value: 1, next: Node { value: 2, next: [Node] } }
console.log(myQueue.peek()); // Node { value: 2, next: Node { value: 3, next: null } }
console.log(myQueue.isEmpty()); // false
console.log(myQueue.size); // 2