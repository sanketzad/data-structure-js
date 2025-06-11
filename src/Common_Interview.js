/**
 * * 1. Check the two strings are anagrams
 * @params {string} str1
 * @params {string} str2
 * @returns {boolean}
 */
function iAnagram(str1, str2) {
    if (str1.length !== str2.length) return false;

    const frq1 = {};
    const frq2 = {};

    for (let i = 0; i < str1.length; i++) {
        frq1[str1[i]] = (frq1[str1[i]] || 0) + 1;
        frq2[str2[i]] = (frq2[str2[i]] || 0) + 1;
    }

    for (const key in frq1) {
        if (!(key in frq2) || frq1[key] !== frq2[key]) return false;
    }

    return true;


    // if (str1.length !== str2.length) return false;

    // const count = {};

    // for (let i = 0; i < str1.length; i++) {
    //     count[str1[i]] = (count[str1[i]] || 0) + 1;
    //     count[str2[i]] = (count[str2[i]] || 0) - 1;
    // }

    // for (const key in count) {
    //     if (count[key] !== 0) return false;
    // }

    // return true;
}

/**
 * * 2. First and Last occurance of the a element in a sorted array
 * @params {array} arr
 * @params {number} target
 * @returns {array}
 */
function firstAndLast(arr, target) {
    let first = -1;
    let last = -1;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            if (first === -1) first = i;
            last = i;
        }
    }

    return [first, last];
}

function firstAndLast_1(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return [i, arr.lastIndexOf(target)];
        }
    }

    return [-1, -1];
}

/**
 * First and Last using Binary search as the input arr is sorted
 */
function findStart (arr, target) {
    if (arr[0] === target) return 0;

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target && arr[mid-1] < target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

function findEnd (arr, target) {
    if (arr[arr.length - 1] === target) return arr.length - 1;

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target && arr[mid+1] > target) {
            return mid;
        } else if (arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}

function findFirstAndLast (arr, target) {
    if (arr.length === 0 || arr[0] > target || arr[arr.length - 1] < target) return [-1, -1];

    const first = findStart(arr, target);
    const last = findEnd(arr, target);

    return [first, last];
}

/**
 * * 3. Find the kth largest number in the array
 * @params {array} arr
 * @params {number} k
 * @returns {number}
 */
function kth_largest(arr, k) {
    if (k > arr.length) return -1;

    const sortedArr = arr.sort((a, b) => b - a);
    return sortedArr[k - 1];
}

function kth_largest_1 (arr, k) {
    if (k > arr.length) return -1;

    for (let i = 0; i < k - 1; i++) {
        arr.splice(arr.indexOf(Math.max(...arr)), 1);
    }

    return Math.max(...arr);
}

/**
 * * 4. Are two binary trees symmetric
 * @params {object} tree1
 * @params {object} tree2
 * @returns {boolean}
 */
function areSymmetric(tree1, tree2) {
    if (!tree1 && !tree2) return true;
    if (!tree1 || !tree2) return false;
    if (tree1.val !== tree2.val) return false;

    return (areSymmetric(tree1.left, tree2.right) &&
            areSymmetric(tree1.right, tree2.left)
    );
}

function isSymmetric(root) {
    if (!root) return true;

    return areSymmetric(root.left, root.right);
}

/**
 * * 5. Generate all possible combinations of the parenthesis
 * @params {number} n
 * @returns {array}
 */
function generateParenthesis(n) {
    function backtrack(n, diff, comb, combs) {
        if (diff < 0 || diff > n) return;
        else if (n === 0) {
            if (diff === 0) {
                const str = comb.join("");
                if (isValid(str)) {
                    combs.push(str);
                }
            }
        }
        else {
            comb.push("(");
            backtrack(n - 1, diff + 1, comb, combs);
            comb.pop();
            comb.push(")");
            backtrack(n - 1, diff - 1, comb, combs);
            comb.pop();
        }
    }

    const combs = [];
    backtrack(n * 2, 0, [], combs);

    return combs;
};

function isValid(combination) {
    const arr = [];

    for (let i = 0; i < combination.length; i++) {
        if (combination[i] === "(") {
            arr.push(combination[i]);
        } else {
            if (arr.length === 0) return false;
            arr.pop();
        }
    }
 
    return arr.length === 0;
}

/**
 * * 6. Find if one can travel from one node to the same node by going through the circular path given gas and cost to travel next node
 * @params {array} gas
 * @params {array} cost
 * @returns {number}
 */
function canTravel(gas, cost, start) {
    const n = gas.length;
    let remainingGas = 0;
    let i = start;
    let started = false;

    while (i !== start || !started) {
        started = true;

        remainingGas += gas[i] - cost[i];
        if (remainingGas < 0) {
            return false;
        }
        i = (i + 1) % 2;
    }

    return true;
}

function gasStation(gas, cost) {
    for (let i = 0; i < gas.length; i++) {
        if (canTravel(gas, cost, i)) {
            return i;
        }
    }

    return -1;
}

function gasStation_1 (gas, cost) {
    let remainingGas = 0;
    let candidate = 0;
    let prev_remainingGas = 0;

    for (let i = 0; i < gas.length; i++) {
        remainingGas += gas[i] - cost[i];
        
        if (remainingGas < 0) {
            candidate = i + 1;
            prev_remainingGas += remainingGas;
            remainingGas = 0; 
        }
    }

    if (candidate === gas.length || remainingGas + prev_remainingGas < 0) {
        return -1;
    } else {
        return candidate;
    }
}

/***
 * * 7. Check if the binary tree is a valid BST
 * @params {object} root
 * @returns {boolean}
 */
function isValidBST_1(root) {
    if (!root) return true;
    if (root.left && root.left.val >= root.val) return false;
    if (root.right && root.right.val <= root.val) return false;
    if (root.left && root.right) {
        if (root.left.val >= root.right.val) return false;
    }

    return isValidBST_1(root.left) && isValidBST_1(root.right);
}
// This is range based solution
function isValidBST(root) {
    const isValid = (root, min=-Inifinity, max=Infinity) => {
        if (!root) return true;
        if (!(root.val < min && root.val < max)) return false;

        return isValid(root.left, min, root.val) && isValid(root.right, root.val, max);
    }

    return isValid(root);
}

/**
 * * 8. Course Schedule
 * @params {number} numCourses
 * @params {array} prerequisites
 * @returns {boolean}
 */
function generateGraph(numCourses, prerequisites) {
    const graph = {};

    for (const [course, prereq] of prerequisites) {
        if (!graph[course]) graph[course] = [];
        if (!graph[prereq]) graph[prereq] = [];
        graph[course].push(prereq);
    }

    return graph;
}

function canFinish(graph, vertex, path, order, visited) {
    path.push(vertex);

    for (const neighbor of graph[vertex]) {
        if (path.includes(neighbor)) return false;
        if (!visited.get(vertex)) {
            visited.set(vertex);
            if (!canFinish(graph, neighbor, path, order, visited)) return false;
        }
    }

    order.push(path.pop());

    return true;
}

function topSort(graph) {
    const order = [];
    const visited = new Set();
    const path = [];

    for (const vertex in graph) {
        if (!visited.has(vertex)) {
            visited.add(vertex);
            if (!canFinish(graph, vertex, path, order, visited)) return [];
        }
    }

    return order.reverse();
}

function ableToFinish(numCourses, prerequisites) {
    const graph = generateGraph(prerequisites);
    const order = topSort(graph);

    return order.length === numCourses;
}

console.log(iAnagram('listen', 'silent')); // true
console.log(iAnagram('hello', 'world')); // false
console.log(findFirstAndLast([1, 2, 2, 3, 4, 5], 2)); // [1, 2]
console.log(findFirstAndLast([1, 2, 2, 3, 4, 5], 6)); // [-1, -1]
console.log(findFirstAndLast([1, 2, 2, 3, 4, 5], 1)); // [0, 0]
console.log(kth_largest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(kth_largest_1([3, 2, 1, 5, 6, 4], 1)); // 6
console.log(generateParenthesis(2)); // ["(())", "()()"]
console.log(generateParenthesis(3)); // ["(())", "()()"]
