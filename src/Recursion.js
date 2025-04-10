// String reversal using recursion
function reverseString (str) {
    if (str === "") { return "";}

    return reverseString(str.substr(1)) + str.charAt(0);
}

// Palindrome check using recursion
function isPalindrome (str) {
    // Base case: if the string is empty or has one character, it's a palindrome
    if (str.length < 2) return true;

    // Check if the first and last characters are the same
    // If they are, recursively check the substring without the first and last characters
    if (str.charAt(0) === str.charAt(str.length - 1)) {
        return isPalindrome(str.substr(1, str.length - 2));
    }
    
    // If they are not, return false
    return false;
}

// Decimal to binary conversion using recursion
function findBinary(num) {
    // Base case: if the number is 0, return an empty string
    if (num === 0) return "";

    return findBinary(Math.floor(num / 2)) + (num % 2);
}

// Sum of natural numbers using recursion
function recursiveSummation (num) {
    if (num <= 1) return num;

    return num + recursiveSummation(num - 1);
}

/**
 * Binary Search Tree - Divide and conquer the bigger problem by splitting it into smaller problems
 * 
 * Assumption is array/list is sorted
 * 
 * @param {array} list
 * @param {left} left index of the array
 * @param {right} right index of the array
 * @param {number} target
 * @returns {object} node
 */
function binarySearch(list, left, right, target) {
    if (left > right) return null;

    const mid = Math.floor((left + right) / 2);

    if (list[mid] === target) return { index: mid, value: list[mid] };

    if (list[mid] > target) {
        return binarySearch(list, left, mid - 1, target);
    }

    return binarySearch(list, mid + 1, right, target);
}

// Fibonacci sequence using recursion
function fibonacci (num) {
    if (num <= 1) return num;

    return fibonacci(num - 1) + fibonacci(num - 2);
}

// Merge sort using recursion - divide and conquer
function mergeSort (list, start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    mergeSort(list, start, mid);
    mergeSort(list, mid + 1, end);

    merge(list, start, mid, end);
}

function merge (list, start, mid, end) {
    const temp = [];
    let i = start,
    j = mid + 1,
    k = 0; // Pointer to store the sorted elements in the temp array

    // While the both sub-array are not empty
    while (i <= start && j <= end) {
        if (list[i] <= list[j]) {
            temp[k++] = list[i++]
        } else {
            temp[k++] = list[j++];
        }
    }

    // While the left sub-array is not empty and right is empty
    while (i <= mid) {
        temp[k++] = list[i++];
    }

    // While the right sub-array is not empty and left is empty
    while (j <= end) {
        temp[k++] = list[j++];
    }

    for (i = start; i <= end; i++) {
        list[i] = temp[i - start];
    }
}

console.log(reverseString("hello world")); // "olleh"
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(findBinary(12)); // "1011"
console.log(findBinary(0)); // ""
console.log(recursiveSummation(5)); // 15
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0, 5, 4)); // { index: 3, value: 4 }
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0, 5, 7)); // null
console.log(fibonacci(5)); // 5
console.log(mergeSort([5, 2, 9, 1, 5, 6], 0, 5)); // [1, 2, 5, 5, 6, 9]