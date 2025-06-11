class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this._insertNode(this.root, newNode);
        }

        return this;
    }

    _insertNode(root, node) {
        if (node.value < root.value) {
            if (root.left === null) {
                root.left = node;
            } else {
                this._insertNode(root.left, node);
            }
        } else if (node.value > root.value) {
            if (root.right === null) {
                root.right = node;
            } else {
                this._insertNode(root.right, node);
            }
        } else {
            // Value already exists in the tree, do nothing
            return;
        }
    }

    insertWithStandard(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            while (true) {
                if (value < currentNode.value) {
                    if (!currentNode.left) {
                        currentNode.left = newNode;
                        return this;
                    }
                    currentNode = currentNode.left;
                } else {
                    if (!currentNode.right) {
                        currentNode.right = newNode;
                        return this;
                    }
                    currentNode = currentNode.right;
                }
            }
        }
    }

    lookup (value) {
        function traverse (root) {
            if (root === null) {
                return false;
            }

            if (root.value === value) {
                return true;
            }

            if (root.value > value) {
                return traverse(root.left)
            } else {
                return traverse(root.right);
            }
        }

        return traverse(this.root);
    }

    lookupStandard(value) {
        let currentNode = this.root;

        while (currentNode) {
            if (currentNode.value === value) {
                return true;
            } else if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return false;
    }

    remove (value) {
        function removeNode(root, value) {
            if (root === null) {
                return null;
            }

            if (value < root.value) {
                root.left = removeNode(root.left, value);
                return root;
            } else if (value > root.value) {
                root.right = removeNode(root.right, value);
                return root;
            } else {
                // We have found the node to remove
                if (root.left === null && root.right === null) {
                    return null; // Node is a leaf node
                } else if (root.left === null) {
                    return root.right; // Node has only one right child
                } else if (root.right === null) {
                    return root.left; // Node has only one left child
                } else {
                    // Node has two children, find the minimum value in the right children
                    let minimum = root.right;
                    while (minimum.left !== null) {
                        minimum = minimum.left;
                    }
                    root.value = minimum.value; // Replace the value with the minimum value
                    root.right = removeNode(root.right, minimum.value); // Remove the nimimum node;
                    return root;
                }
            }
        }

        return this.root = removeNode(this.root, value);
    }
}

const myBST = new BinarySearchTree();
console.log(myBST);
myBST.insertWithStandard(10);
myBST.insertWithStandard(5);
myBST.insertWithStandard(15);
myBST.insertWithStandard(6);
myBST.insertWithStandard(66);
myBST.insertWithStandard(14);
myBST.insertWithStandard(25);
myBST.insertWithStandard(30);
console.log(myBST);
console.log(JSON.stringify(myBST));
console.log(myBST.lookupStandard(10)); // true
console.log(myBST.lookupStandard(5)); // true
console.log(myBST.lookupStandard(15)); // true
console.log(myBST.lookupStandard(20)); // false
console.log(myBST.lookupStandard(21)); // false
myBST.remove(10);
console.log(JSON.stringify(myBST));