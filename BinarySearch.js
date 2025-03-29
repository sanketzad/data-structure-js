// Create the Node class for the binary search tree
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Binary Search Tree class
class BinaryTree {
    contructor () {
        this.root = null;
    }

    // Insert a new value into the binary tree
    insert(value) {
        // Create a new node
        const newNode = new Node(value);

        // If the tree is empty, set the new node to the root
        if (!this.root) {
            this.root = newNode;
            return;
        }

        this.insertNode(this.root, newNode);
    }

    // Inserting the new node using Recursion
    insertNode(node, newNode) {
        // Otherwise, find the correct position for the new node
        // if the data is less than the node
        // data move left of the tree
        if (newNode.value < node.value) {
            // Check if the left node is null if yes then insert the new node
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        }
        // if the data is more than the node
        // data move right of the tree 
        else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // Helper function for the removing the node/data
    remove(value) {
        // Root will be reinitiated after the removing of the value
        this.root = this.removeNode(this.root, value);
    }

    // Removing the node using Recursion
    removeNode(node, value) {
        // If the root is null then tree is empty
        if (!node) {
            return null;
        }
        // If the value is less than the node value then move to the left of the tree
        else if(value < node.value) {
            node.left = this.removeNode(node.left, value);
            return node;
        }
        // If the value is more than the node value then move to the right of the tree
        else if (value > node.value) {
            node.right = this.removeNode(node.right, value);
            return node;
        }
        // If the value is same as the node value then remove the node
        else {
            // Deleting the node with no children
            if (!node.left && !node.right) {
                node = null;
                return node;
            }

            // Deleting the node with one child
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            // Deleting the node with two children
            // Find the minimum node in the right subtree
            const minNode = this.findMinNode(node.right);
            // Replace the node value with the minimum node value
            node.value = minNode.value;
            // Remove the minimum node from the right subtree
            node.right = this.removeNode(node.right, minNode.value);
            return node;
        }
    }

    search(node, value) {
        // If the tree is emplty then return null
        if (!node) {
            return null;
        }
        // If the value is less than the node value then move t=o the left of the tree
        else if (node.value > value) {
            return this.search(node.left, value);
        }
        // If the value is more than node value then move to the right of the tree
        else if (node.value < value) {
            return this.search(node.right, value);
        }
        // If the value is equal to the node value then return the node
        else {
            return node;
        }
    }

    // Tree Traversal
    // Inorder Traversal
    inorder(node){
        const result = [];
        if (node) {
            result.push(...this.inorder(node.left));
            result.push(node.value);
            result.push(...this.inorder(node.right));
        }

        return result;
    }

    // Preorder Traversal
    preorder(node) {
        const result = [];
        if (node) {
            result.push(node.value);
            result.push(...this.preorder(node.left));
            result.push(...this.preorder(node.right));
        }

        return result;
    }

    // Postorder Traversal
    postorder(node) {
        const result = [];
        if (node) {
            result.push(...this.postorder(node.left));
            result.push(...this.postorder(node.right));
            result.push(node.value);
        }

        return result;
    }

    // Calculate the height of the tree
    // Iterative way
    heightIterative(root) {
        if (!root) return 0;

        let height = 0;
        const queue = [root];

        while (queue.length) {
            let levelSize = queue.length;

            for (let i = 0; i < levelSize; i++) {
                let node = queue.shift();
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }

            // Increament the height of the tree after the each level is processed
            height++;
        }

        return height;
    }

    // Calculate the height of the tree
    // Recursive way
    heightRecursive(root) {
        if (!root) return 0;

        const leftHeight = this.heightRecursive(root.left);
        const rightHeight = this.heightRecursive(root.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Helper function for the searching the node/data
    findMinNode(node) {
        // If left node is null then return the node
        if (!node.left) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    }

    // Get root node
    getRootNode() {
        return this.root;
    }
};

const BST = new BinaryTree();

BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(9);
BST.insert(27);

console.group(BST);
console.group(BST.getRootNode());
console.log("inorder", BST.inorder(BST.getRootNode()));
console.log("preorder", BST.preorder(BST.getRootNode()));
console.log("postorder", BST.postorder(BST.getRootNode()));
console.log(BST.remove(15));
console.log(BST);
console.log("inorder", BST.inorder(BST.getRootNode()));
console.log("preorder", BST.preorder(BST.getRootNode()));
console.log("postorder", BST.postorder(BST.getRootNode()));

console.log("Shift", [1,2,3,4,5].shift());
console.log("Shift", [1,2,3,4,5].pop());