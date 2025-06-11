class HashTable {
    constructor(size = 50) {
        this.size = size;
        this.data = new Array(size);
    }

    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i) * i) % this.data.length;
        }

        return hash;
    }

    set(key, value) {
        const address = this._hash(key);
        if (!this.data[address]) {
            this.data[address] = [];
        }
        this.data[address].push([key, value]);
    }

    get(key) {
        const address = this._hash(key);
        const currentBucket = this.data[address];

        if (currentBucket.length) {
            for (let i = 0; i < currentBucket.length; i++) {
                const [_, value] = currentBucket[i];
                if (currentBucket[i][0] === key) {
                    return value; // Return the value if the key matches
                }
            }
        }

        return undefined; // Return undefined if the key is not found
    }

    keys() {
        const keysArray = [];

        for (let i = 0; i < this.data.length; i++) {
            const currentBucket = this.data[i];
            if (currentBucket && currentBucket.length > 0) {
                for (let j = 0; j < currentBucket.length; j++) {
                    keysArray.push(currentBucket[j][0]); // Push the key into the keys array
                }
            }
        }

        return keysArray; // Return the array of keys
    }

    values() {
        const valuesArray = [];

        for (let i = 0; i < this.data.length; i++) {
            const currentBucket = this.data[i];
            if (currentBucket && currentBucket.length > 0) {
                for (let j = 0; j < currentBucket.length; j++) {
                    valuesArray.push(currentBucket[j][1]); // Push the value into the values array
                }
            }
        }

        return valuesArray; // Return the array of values
    }

    entries() {
        const entriesArray = [];

        for (let i = 0; i < this.data.length; i++) {
            const currentBucket = this.data[i];
            if (currentBucket && currentBucket.length > 0) {
                for (let j = 0; j < currentBucket.length; j++) {
                    entriesArray.push(currentBucket[j]);
                }
            }
        }

        return entriesArray; // Return the array of key-value pairs
    }
}

const myHashTable = new HashTable(2);
myHashTable.set('name', 'John');
myHashTable.set('age', 30);
myHashTable.set('city', 'JKD'); // This will update the value for 'name'
console.log(myHashTable.data);
// Output: [ <50 empty items>, [ [ 'name', 'John' ], [ 'age', 30 ] ] ]
console.log(myHashTable.get('name')); // Output: John
console.log(myHashTable.keys()); // Output: [ 'name', 'age' ]
console.log(myHashTable.values()); // Output: [ 'name', 'age' ]
console.log(myHashTable.entries()); // Output: [ 'name', 'age' ]


// FInd first recurring number in the array
function firstRecurringNumber(arr) {
    const seen = new Set();
    for (const num of arr) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }

    return undefined; // Return undefined if no recurring number is found
}

/**
 * 
 * @param {Array} arr 
 * @returns Number | undefined
 * This function finds the first recurring number in an array by using a string to track seen numbers.
 * This is a less efficient approach compared to using a Set, as it involves string manipulation and regular expressions.
 * But it is a memory inefficient way to find the first recurring number.
 */
function firstRecurringNumber_1(arr) {
    let str = "";
    for (const num of arr) {
        const regex = new RegExp(num, "g");
        if (regex.text(str)) {
            return num; // Return the number if it is found in the string
        }
        str += num; // Append the number to the string
    }

    return undefined;
}

// Example usage
const numbers = [2, 5, 1, 2, 3, 5, 1];
console.log(firstRecurringNumber(numbers)); // Output: 2