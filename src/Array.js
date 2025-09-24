// This is a new comment

class MyArray {
    constructor() {
        this.length = 0;
        this.data = {};
    }

    get (index) {
        return this.data[index];
    }

    push (item) {
        this.data[this.length] = item;
        this.length++;
        return this.length;
    }

    pop() {
        if (this.length === 0) {
            return undefined; // Handle case when popping from an empty array
        }
        const itemIndex = this.length - 1;
        // Delete the item at the last index and return it
        const item = this.data[itemIndex];
        delete this.data[itemIndex];
        this.length--;
        return item;
    }

    delete (index) {
        if (index < 0 || index >= this.length) {
            return undefined; // Handle the invalid input case
        };

        const item = this.data[index];
        this._shiftItems(index);

        return item;
    }

    _shiftItems(index) {
        // Shift items to the left to fill the gap created by deletion
        for (let i = index; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }

        // Delete the last item as it is now a duplicate
        delete this.data[this.length - 1];
        this.length--;
    }
}

const newArr = new MyArray();
newArr.push('hi');
newArr.push('there');
console.log(newArr);
const temp = newArr.pop();
console.log(temp);

/**
 * Array problems
 */
// Reverse the string
function reverseString(str) {
    if (!str || str.length < 2 || typeof str !== 'string') {
        return str; // Handle empty string or single character
    }
    return str.split("").reverse().join("");
}

// Merge to sorted array
function mergeSortedArrays(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        throw new Error("Both inputs must be arrays");
    }
    if (arr1.length === 0) return arr2;
    if (arr2.length === 0) return arr1;
    
    let leftIndex = 0;
    let rightIndex = 0;
    const mergedArray = [];

    while (leftIndex < arr1.length && rightIndex < arr2.length) {
        if (arr1[leftIndex] < arr2[rightIndex]) {
            mergedArray.push(arr1[leftIndex]);
            leftIndex++;
        } else {
            mergedArray.push(arr2[rightIndex]);
            rightIndex++;
        }
    }

    return mergedArray.concat(arr1.slice(leftIndex)).concat(arr2.slice(rightIndex));
}

console.log(mergeSortedArrays([1, 3, 5, 10], [2, 4, 6, 8, 10]));