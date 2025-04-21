class Node  {
    constructor (value) {
        this.value = value;
        this.next = null;
    }

    setNext (node) {
        this.next = node;
    }

    getNext () {
        return this.next;
    }
}

class LinkedList {
    constructor () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    add (node) {
        if  (this.size === 0) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.setNext(node);
            this.tail = node;
        }
        this.size++;
        return this;
    }

    remove (node) {
        if (this.size === 0) return null;

        let current = this.head;
        let previous = null;

        while (current !== null) {
            if (current.value === node.value) {

                if (previous === null) {
                    this.head = current.getNext();
                } else {
                    previous.setNext(current.getNext());
                }
                // If the node to be removed is the head
                if (current === this.head) {
                    this.head = current.getNext();
                }
                // If the node to be removed is the tail
                if (current === this.tail) {
                    this.tail = previous;
                }
                
                this.size--;
                return current;
            }
            previous = current;
            current = current.getNext();
        }
    }

    reverseList () {
        let prev = null;
        let current = this.head;
        let next = null;

        this.tail = this.head;
        // Traverse the list and reverse the links
        // Set the head to the last node
        // Set the tail to the first node
        // Set the next node to the current node
        // Set the current node to the next node
        // Set the previous node to the current node
        // Set the current node to the next node

        while (current !== null) {
            next = current.getNext();
            current.setNext(prev);
            prev = current;
            current = next;
        }

        this.head = prev;

        return this;
    }

    reverseListRecursive () {
        const temp = this.head;
        this.head = this.tail;
        this.tail = temp;
        // Base case: if the node is null or the next node is null, return the node
        function reverseListRecursive1 (node) {
            if (node === null || node.getNext() === null) return node;
            const node1 = this.reverseListRecursive1(node.getNext());
            node.next.setNext(node);
            node.setNext(null);
            return node1;
        }

        reverseListRecursive1(this.head);
        
        return this;
    }

    // Merge 2 sorted linked list
    mergeList (list) {
        let current1 = this.head;
        let current2 = list.head;
        let mergedList = new LinkedList();

        while (current1 !== null && current2 !== null) {
            if (current1.value < current2.value) {
                mergedList.add(current1);
                current1 = current1.getNext();
            } else {
                mergedList.add(current2);
                current2 = current2.getNext();
            }
        }

        if (current1 === null) {
            while (current2 !== null) {
                mergedList.add(current2);
                current2 = current2.getNext();
            }
        }

        if (current2 === null) {
            while (current1 !== null) {
                mergedList.add(current1);
                current1 = current1.getNext();
            }
        }
        // Set the head and tail of the merged list
        this.head = mergedList.head;
        this.tail = mergedList.tail;
        this.size = this.size + list.size;

        return this;
    };

    print () {
        let current = this.head;
        let result = [];

        while (current !== null) {
            result.push(current.value);
            current = current.getNext();
        }

        return result.join(" -> ");
    }
}

const linkedList = new LinkedList();

const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const n4 = new Node(4);
const n5 = new Node(5);
const n6 = new Node(6);

linkedList.add(n1);
linkedList.add(n2);
linkedList.add(n3);
linkedList.add(n4);
linkedList.add(n5);
linkedList.add(n6);
console.log(linkedList);
console.log(linkedList.head);
console.log(linkedList.tail);
console.log(linkedList.size);
console.log(linkedList.print());
linkedList.remove(n1);
console.log(linkedList.print());
linkedList.reverseListRecursive(linkedList.head);
console.log(linkedList.print());
console.log(linkedList.tail);

