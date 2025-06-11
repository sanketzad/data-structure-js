class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

/**
 * A simple implementation of a singly linked list.
 * It allows adding nodes to the end of the list and provides a method to get the length of the list.
 * 
 * Prepend: O(1)
 * Append: O(1)
 * Lookup: O(n)
 * Insert: O(n)
 * Delete: O(n)
 * Get length: O(1)
 */
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;

        return this.length;
    }

    prepend(value) {
        const newNode = new Node(value);

        if (this.head === null) {
            this.append(value);
        } else {
            newNode.next = this.head;
            this.head = newNode;
            this.length++;
        }

        return this.length;
    }

    printList() {
        let current = this.head;
        const arr = [];

        while (current) {
            arr.push(current.value);
            current = current.next;
        }

        return arr;
    }
 
    insert(index, value) {
        if (index < 0 || index > this.length) {
            return new Error("Index out of bounds");
        }

        if (index === 0) {
            return this.prepend(value);
        }

        if (index === this.length) {
            return this.append(value);
        }

        const newNode = new Node(value);
        let current = this.head;
        let previous;
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current.next;
            currentIndex++;
        }

        previous.next = newNode;
        newNode.next = current;
        this.length++;

        return this.length;
    }

    remove (index) {
        if (index < 0 || index >= this.length) {
            return new Error("Index is out of bounds");
        }

        if (index  === 0) {
            this.head = this.head.next;
            if (this.length === 1) {
                this.tail = null;
            }
            this.length--;
            return this.length;
        }

        let current = this.head;
        let previous;
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current.next;
            currentIndex++;
        }

        if (current === this.tail) {
            this.tail = previous;
        }

        previous.next = current ? current.next : null;
        this.length--;

        return this.length;
    }

    lookUp(index) {
        if (index < 0 || index >= this.length) {
            return new Error("index is out of bounds");
        }

        let current = this.head;
        let previous;
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current.next;
            currentIndex++;
        }

        return current ? current.value : null;
    }

    reverse() {
        if (!this.head.next) return this;
        let current = this.head;
        let previous = null;
        this.tail = this.head;

        while (current) {
            const newNode = current.next;
            current.next = previous;
            previous = current;
            current = newNode;
        }

        this.head = previous;
        return this;
    }
}

const myLinkedList = new LinkedList();
console.log(myLinkedList.printList()); // []
myLinkedList.append(1);
myLinkedList.append(2);
myLinkedList.append(3);
myLinkedList.prepend(0);
myLinkedList.insert(2, 1.5);
console.log(myLinkedList.lookUp(2)); // 1.5
console.log(myLinkedList.printList()); // [0, 1, 2, 3]
myLinkedList.reverse();
console.log(myLinkedList.printList()); // [3, 2, 1, 0]


class DoublyNode {
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(value) {
        const newNode = new DoublyNode(value);

        if (this.head === null) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.length++;
        return this.length;
    }

    prepend (value) {
        const newNode = new DoublyNode(value);

        if (this.head === null) {
            this.append(value);
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
            this.length++;
        }
    }

    insert(index, value) {
        if (index < 0 || index > this.length) {
            return new Error("Index out of bounds");
        }

        if (index === 0) {
            return this.prepend(value);
        }

        if (index === this.length) {
            return this.append(value);
        }

        const newNode = new DoublyNode(value);
        let current = this.head;
        let previous;
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current.next;
            currentIndex++;
        }

        previous.next = newNode;
        newNode.prev = previous;
        newNode.next = current;

        if (current) {
            current.prev = newNode;
        }

        this.length++;
        return this.length;
    }

    remove (index) {
        if (index < 0 || index >= this.length) {
            return new Error("Index is out of bounds");
        }

        if (index === 0) {
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
            this.length--;
            return this.length;
        }

        let current = this.head;
        let previous;
        let currentIndex = 0;

        while (currentIndex < index) {
            previous = current;
            current = current.next;
            currentIndex++;
        }

        if (current === this.tail) {
            this.tail = previous;
        } else {
            current.next.prev = previous;
        }

        previous.next = current ? current.next : null;
        this.length--;
        return this.length;
    }
}