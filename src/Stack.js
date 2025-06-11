/**
 * Stack class that implements a basic stack data structure.
 * It provides methods to push and pop items from the stack.
 * LIFO - Last In, First Out
 * * The stack is implemented using a singly linked list.
 * 
 * * lookUp: O(n)
 * * push: O(1)
 * * pop: O(1)
 * * peek: O(1)
 * * isEmpty: O(1)
 * * size: O(1)
 * 
 */

class Node {
    constructor (value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.size = 0;
    }

    puah (value) {
        const newNode = new Node(value);
        if (this.size === 0) {
            this.top = newNode;
            this.bottom = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        this.size++;
    }

    peek() {
        if (this.size === 0) { return null;}

        return this.top.value;
    }

    pop() {
        if (this.size === 0) { return null; }

        const poppedNode = this.top;
        this.top = this.top.next;
        this.size--;

        if (this.size === 0) {
            this.bottom = null;
        }

        return poppedNode.value;
    }

    isEmpty() {
        return this.size === 0;
    }
}

const myStack = new Stack();
myStack.puah(10);
myStack.puah(20);
myStack.puah(30);
console.log(myStack);
console.log(myStack.peek()); // 30
console.log(myStack.pop()); // 30
console.log(myStack);