class Node {
    constructor (value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * * 1. Linked List Traversal
 * @param {Node} head - The head of the linked list
 * @returns {Array} - An array of node values
 */
function printList (head) {
    const result = [];
    let current = head;

    while (current !== null) {
        result.push(current.value);
        current = current.next;
    }

    return result;
}

function printListRecursive (head) {
    if (head === null) return [];

    return [head.value, ...printListRecursive(head.next)];
}

function printListRecursive_1 (head) {
    const result = [];

    fillTheValues(head, result);

    return result;
}

function fillTheValues (node, result) {
    if (node === null) return;

    result.push(node.value);

    fillTheValues(node.next, result);
}

/**
 * * 2. Sum List
 */
function sumList(head) {
    let sum = 0;
    let current = head;

    while (current !== null) {
        sum += current.value;
        current = current.next;
    }

    return sum;
}

function sumListRecursive(head) {
    if (head === null) return 0;

    return head.value + sumListRecursive(head.next);
}

/**
 * * 3. Linked List Find
 */
function find(head, target) {
    let current = head;

    while (current !== null) {
        if (current.value === target) return true;
        current = current.next;
    }

    return false;
}

function findRecursive (head, target) {
    if (head === null) return false;
    if (head.value === target) return true;

    return findRecursive(head.next, target);
}

/**
 * * 4. Get Node Value
 */
function getNodeValue (head, index) {
    let current = head;
    let count = 0;

    while (current !== null) {
        if (count === index) return current.value;
        current = current.next;
        count++;
    }

    return null; // or throw an error if index is out of bounds
}

function getNodeValueRecursive (head, index) {
    if (head === null) return null; // or throw an error if index is out of bounds
    if (index === 0) return head.value;

    return getNodeValueRecursive(head.next, index - 1);
}

/**
 * * 5. Reverse Linked List
 */
function reverseList(head) {
    let prev = null;
    let current = head;

    while (current !== null) {
        const nextNode = current.next; // Store the next node
        current.next = prev; // Reverse the link
        prev = current;
        current = nextNode;
    }

    return prev; // New head of the reversed list
}

function reverseListRecursive (head, prev = null) {
    if (head === null) return prev;

    const next = head.next; // Store the next node
    head.next = prev;

    return reverseListRecursive(next, head); // Recur with the next node and current node as previous
}

/**
 * * 6. Zipper List
 * @param {Node} head1 - The head of the first linked list
 * @param {Node} head2 - The head of the second linked list
 * @returns {Node} - The head of the zipped linked list
 */
function zipperList(head1, head2) {
    if (head1 === null) return head2;
    if (head2 === null) return head1;
    if (head1 === null && head2 === null) return null;

    let tail = head1;
    let current1 = head1.next;
    let current2 = head2;
    let count = 0;

    while (current1 !== null && current2 !== null) {
        if (count % 2 === 0) {
            tail.next = current2;
            current2 = current2.next;
        } else {
            tail.next = current1;
            current1 = current1.next;
        }
        tail = tail.next;
        count += 1;
    }

    if (current1 !== null) tail.next = current1;
    if (current2 !== null) tail.next = current2;

    return head1;
}

function zipperListRecursive(head1, head2) {
    if (head1 === null && head2 === null) return null;
    if (head1 === null) return head2;
    if (head2 === null) return head1;

    const next1 = head1.next;
    const next2 = head2.next;

    head1.next = head2;
    head2.next = zipperListRecursive(next1, next2);

    return head1;
}

const a = new Node("A");
const b = new Node("B");
const c = new Node("C");
const d = new Node("D");
const e = new Node("E");

const f = new Node(1);
const g = new Node(2);
const h = new Node(3);
const i = new Node(4);
const j = new Node(5);

// A -> B -> C -> D -> E
a.next = b;
b.next = c;
c.next = d;
d.next = e;

// 1 -> 2 -> 3 -> 4 -> 5
f.next = g;
g.next = h;
h.next = i;
i.next = j;

console.log(printList(a)); // [ 'A', 'B', 'C', 'D', 'E' ]
console.log(printListRecursive(a)); // [ 'A', 'B', 'C', 'D', 'E' ]
console.log(sumList(f)); // 15
console.log(sumListRecursive(f)); // 15
console.log(find(a, "C")); // true
console.log(find(a, "F")); // false
console.log(findRecursive(a, "C")); // true
console.log(findRecursive(a, "F")); // false
console.log(getNodeValue(a, 2)); // C
console.log(getNodeValueRecursive(a, 2)); // C
console.log(getNodeValue(a, 5)); // null
console.log(getNodeValueRecursive(a, 5)); // null
// console.log(printList(reverseList(a))); // [ 'E', 'D', 'C', 'B', 'A' ]
// console.log(printList(reverseListRecursive(f))); // [ 5, 4, 3, 2, 1 ]
console.log(printList(zipperList(a, f))); // [ 'A', 1, 'B', 2, 'C', 3, 'D', 4, 'E', 5 ]
console.log(printList(zipperList(a, null))); // [ 'A', 'B', 'C', 'D', 'E' ]
console.log(printList(zipperList(null, f))); // [ 1, 2, 3, 4, 5 ]
console.log(printList(zipperList(null, null))); // []