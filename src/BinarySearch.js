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
        else if (node.value === value) {
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
        } else {
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

    // ZigZag Traversal - Interview question in Oracle
    zigzagTraversal(root) {
        const result = [];
        if (!root) return result;

        const queue = [root];

        let leftToRight = true;

        while (queue.length) {
            const levelSize = queue.length;
            const currentLevel = [];

            for(let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                if (leftToRight) {
                    currentLevel.push(node.value); 
                } else {
                    currentLevel.unshift(node.value);
                }

                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            // Toggle the direction for the next level
            leftToRight = !leftToRight;
            // Add the current level to the result
            result.push(currentLevel);
        }

        return result;
    }

    depthFirstSearch(root) {
        const result = [];
        if (!root) return result;

        const stack = [root];

        while (stack.length) {
            const node = stack.pop();
            result.push(node.value);

            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }

        return result;
    }

    depthFirstSearchRecursive(root, result = []) {
        if (!root) return result;

        result.push(root.value);
        this.depthFirstSearchRecursive(root.left, result);
        this.depthFirstSearchRecursive(root.right, result);

        return result;
    }

    // Breadth First Search
    // Iterative Way - Only way to do the BFS as recursive solution uses stack to get hold of the nodes, it would be difficult to implement
    // Recursive way - Not possible as it uses stack to get hold of the nodes, it would be difficult to implement
    // BFS is used to find the shortest path in the graph
    breadthFirstSearch(root) {
        const result = [];

        if (!root) return result;

        const queue = [root];

        while (queue.length) {
            const node = queue.shift();
            result.push(node.value);

            // Add the left and right child to the queue
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return result;
    }

    // Tree Includes Problem
    // Check if the tree includes the given value
    // Breadth First Search
    includesBFS(root, value) {
        if (!root) return false;

        const queue = [root];

        while (queue.length) {
            const node = queue.shift();
            if (node.value === value) return true;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return false;
    }

    // Tree Includes Problem
    // Check if the tree includes the given value
    // Depth First Search - Recursive
    includesDFSRecursive(root, value) {
        if (!root) return false;

        if (root.value === value) return true;

        return this.includesDFSRecursive(root.left, value) || this.includesDFSRecursive(root.right, value);
    }

    // Tree Sum Problem
    // Calculate the sum of all the nodes in the tree
    // Iterative way
    treeSumIterative (root) {
        if (!root) return 0;

        let sum = 0;
        const stack = [root];

        while (stack.length) {
            const node = stack.pop();
            sum += node.value;

            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }

        return sum;
    }

    // Calculate the sum of all the nodes in the tree
    // Recursive way
    treeSumRecursive (root) {
        if (!root) return 0;

        return root.value + this.treeSumRecursive(root.left) + this.treeSumRecursive(root.right);
    }

    // Tree Minimum Value Problem
    // Find the minimum value in the tree
    // Iterative way
    // DFS
    findMinimumValueIterative (root) {
        if (!root) return null;

        let minimum = Infinity;
        const stack = [root];

        while (stack.length) {
            const node = stack.pop();

            if (node.value < minimum) minimum = node.value;

            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }

        return minimum;
    }

    // Find the minimum value in the tree
    // Recursive way
    // DFS
    findMinimumValueRecursive (root) {
        if (!root) return Infinity;

        const leftMin = this.findMinimumValueRecursive(root.left);
        const rightMin = this.findMinimumValueRecursive(root.right);

        return Math.min(root.value, leftMin, rightMin);
    }

    // Find Minimum vakue in tree
    // BFS
    findMinimumValueBFS (root) {
        if (!root) return null;

        let minimum = Infinity;
        const queue = [root];

        while (queue.length) {
            const node = queue.shift();

            if (node.value < minimum) minimum = node.value;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        return minimum;
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

    // Max sum of path to the leaf node
    // Find the maximum sum of the path to the leaf nodes
    maxSumToLeaf (root) {
        if (!root) return -Infinity;

        if (!root.left && !root.right) return root.value;

        const leftMax = this.maxSumToLeaf(root.left);
        const rightMax = this.maxSumToLeaf(root.right);

        return root.value + Math.max(leftMax, rightMax);
    }

    // Print leaf nodes of the tree
    printLeafNodes (root, result = []) {
        if (!root) return result;

        if (!root.left && !root.right) {
            result.push(root.value);
        }

        if (root.right !== null) this.printLeafNodes(root.right, result);
        if (root.left !== null) this.printLeafNodes(root.left, result);

        return result;
    }

    // Priont leaf nodes of the tree but one level up the leaf node
    printLeafNodesOneLeveUp (root, result = []) {
        if (!root) return result;
        
        if ((root.left && !root.left.left && !root.left.right) || (root.right && !root.right.left && !root.right.right)) {
            result.push(root.value);
        }

        if (root.left !== null) this.printLeafNodesOneLeveUp(root.left, result);
        if (root.right !== null) this.printLeafNodesOneLeveUp(root.right, result);

        return result;
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

    /**
     * Check if the binary tree us vaklid BST
     * @param {object} root
     * @returns {boolean}
     */
    isValidBST(root) {
        if (!root) return true;

        const isValid = (root, min=-Infinity, max=Infinity) => {
            if (!root) return true;
            if (!(min < root.value && root.value < max)) return false;

            return isValid(root.left, min, root.value) && isValid(root.right, root.value, max);
        }

        return isValid(root);
    }
};

// https://www.linkedin.com/posts/anmol-agarwal-674a21166_react-frontend-interview-activity-7311977456570155008-2AMb?utm_source=share&utm_medium=member_desktop&rcm=ACoAABCOuyABfXiZesTw1ME7ODvVstWjCIIIVTs

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
console.log("Is valid BST:", BST.isValidBST(BST.getRootNode()));
console.group(BST.getRootNode());
console.log("inorder", BST.inorder(BST.getRootNode()));
console.log("preorder", BST.preorder(BST.getRootNode()));
console.log("postorder", BST.postorder(BST.getRootNode()));
console.log("BST Remove", BST.remove(15));
console.log(BST);
console.log("inorder", BST.inorder(BST.getRootNode()));
console.log("preorder", BST.preorder(BST.getRootNode()));
console.log("postorder", BST.postorder(BST.getRootNode()));
console.log("ZigZag traversal", BST.zigzagTraversal(BST.getRootNode()));
console.log("Depth First Search traversal", BST.depthFirstSearch(BST.getRootNode()));
console.log("Depth First Search recursive traversal", BST.depthFirstSearchRecursive(BST.getRootNode()));
console.log("Breadth First Search traversal", BST.breadthFirstSearch(BST.getRootNode()));
console.log("Tree includes 10?", BST.includesBFS(BST.getRootNode(), 10));
console.log("Tree includes 15?", BST.includesBFS(BST.getRootNode(), 15));
console.log("Tree Sum (Iterative):", BST.treeSumIterative(BST.getRootNode()));
console.log("Tree Sum (Recursive):", BST.treeSumRecursive(BST.getRootNode()));
console.log("Minimum Value (Iterative):", BST.findMinimumValueIterative(BST.getRootNode()));
console.log("Minimum Value (Recursive):", BST.findMinimumValueRecursive(BST.getRootNode()));
console.log("Minimum Value (BFS):", BST.findMinimumValueBFS(BST.getRootNode()));
console.log("Height of the tree (Iterative):", BST.heightIterative(BST.getRootNode()));
console.log("Height of the tree (Recursive):", BST.heightRecursive(BST.getRootNode()));
console.log("Print leaf nodes:", BST.printLeafNodes(BST.getRootNode()));
console.log("Print leaf nodes one level up:", BST.printLeafNodesOneLeveUp(BST.getRootNode()));