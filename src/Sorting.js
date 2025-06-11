/**
 * * This file contains the sorting algorithms used in the application.
 * * It includes implementations for Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort.
 * * Each algorithm is implemented as a function that takes an array as input and returns a sorted array.
 * * The algorithms are designed to be efficient and easy to understand.
 * *
 * @module Sorting
 * @example
 * import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort } from './Sorting';
 * const arr = [5, 3, 8, 4, 2];
 * const sortedArr = bubbleSort(arr);
 * console.log(sortedArr); // Output: [2, 3, 4, 5, 8]
 * @function bubbleSort
 * @function selectionSort
 * @function insertionSort
 * @function mergeSort
 * @function quickSort
 * @function heapSort
 * @description
 * * Bubble Sort: A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.
 * * Selection Sort: A sorting algorithm that divides the input list into two parts: a sorted and an unsorted part, and repeatedly selects the smallest (or largest) element from the unsorted part and moves it to the sorted part.
 * * Insertion Sort: A simple sorting algorithm that builds a sorted array one element at a time, by repeatedly taking the next element from the input and inserting it into the correct position in the sorted part.
 * * Merge Sort: A divide-and-conquer algorithm that divides the input list into two halves, recursively sorts each half, and then merges the sorted halves.
 * * Quick Sort: A divide-and-conquer algorithm that selects a 'pivot' element from the list, partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot, and then recursively sorts the sub-arrays.
 * * Heap Sort: A comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It first builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and rebuilds the heap until all elements are sorted.
 * @returns {Array} A sorted array.
 * @throws {Error} If the input is not an array or contains non-numeric elements.
 * @see {@link https://en.wikipedia.org/wiki/Sorting_algorithm|Sorting Algorithms on Wikipedia}
// * @version 1.0.0
// * @author Sanket Zad
// * @license MIT
// * @since 1.0.0
// * @todo Implement additional sorting algorithms such as Radix Sort and Counting Sort
// * @todo Add unit tests for each sorting algorithm
// * @todo Optimize the performance of the sorting algorithms
// * @todo Add support for sorting objects based on a specific property
// * @todo Implement a generic sorting function that can sort any type of data
// * @todo Add support for sorting in descending order
// * @todo Implement a stable sorting algorithm
// * @todo Add support for sorting arrays of strings
// * @todo Implement a sorting algorithm that can handle large datasets efficiently
// * @todo Add support for sorting arrays of objects based on multiple properties
// * @todo Implement a sorting algorithm that can handle null or undefined values
 */

function bubbleSort(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap the elements
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

function selectionSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        let min = arr[i];
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < min) {
                min = arr[j];
                minIndex = j;
            }
        }
        const temp = arr[i];
        arr[i] = min;
        arr[minIndex] = temp;
    }
}

function insertionSort(arr) {
    const len = arr.length;

    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
            // Swap the elements
            const temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
        }
    }
}

function mergeSort(arr) {
    if (arr.length < 2) {
        return arr;
    }

    // Split the array into two halves
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort the both halves
    return _merge(mergeSort(left), mergeSort(right));
}

function _merge (left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function quickSort(arr) {
    if (arr.length < 2) return arr;

    const len = arr.length;
    const randomIndex = Math.floor(Math.random() * len);

    const pivot = arr[randomIndex];

    const left = [];
    const right = [];

    for (let i = 0; i < len; i++) {
        if (i === randomIndex) continue;

        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

function quickSortNew(arr, left, right) {
    const len = arr.length;
    left = typeof left === 'number' ? left : 0;
    right = typeof right === 'number' ? right : len - 1;
    let pivot;
    let partitionIndex;

    if (left < right) {
        pivot = right;
        partitionIndex = _partition(arr, pivot, left, right);

        quickSortNew(arr, left, partitionIndex - 1);
        quickSortNew(arr, partitionIndex + 1, right);
    }

    return arr;
}

function _partition(arr, pivot, left, right) {
    let pivotValue = arr[pivot];
    let partitionIndex = left;

    for (let i = left; i < right; i++) {
        if (arr[i] < pivotValue) {
            // Swap the elements
            const temp = arr[i];
            arr[i] = arr[partitionIndex];
            arr[partitionIndex] = temp;
            partitionIndex++;
        }
    }
    // Swap the pivot element with the partition index element
    const temp = arr[partitionIndex];
    arr[partitionIndex] = arr[right];
    arr[right] = temp;
    // Return the partition index
    return partitionIndex;
}

const array = [99, 60, 10, 72, 56, 1, 2, 57, 45, 44, 1, 2]
// bubbleSort(array);
// console.log('Bubble Sort:', array);
// selectionSort(array);
// console.log('Selection Sort:', array);
// insertionSort(array);
// console.log('Insertion Sort:', array);
// console.log('Merge Sort:', mergeSort(array));
console.log('Quick Sort:', quickSortNew(array, 0, array.length - 1));


// export { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort } from './Sorting.js';