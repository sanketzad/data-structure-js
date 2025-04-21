import murmurhash  from "murmurhash";

function generateHash (data) {
    const hash1 = murmurhash.v3(data, 0);
    const hash2 = murmurhash.v3(data, hash1);
    const hash3 = murmurhash.v3(data, hash2);
    const hash4 = murmurhash.v3(data, hash3);
    const hash5 = murmurhash.v3(data, hash4);

    return [hash1, hash2, hash3, hash4, hash5];
}

function generateHashRecursive (data, hashCount) {
    if (hashCount === 0) return [];

    const hash = murmurhash.v3(data, hashCount);

    return [hash, ...generateHashRecursive(data, hashCount - 1)];
}

const DEFAULT_SIZE = 1000;
const DEFAULT_HASH_COUNT = 5;
const DATABASE = [];

class BloomFilter {
    constructor (size = DEFAULT_SIZE, hashCount = DEFAULT_HASH_COUNT) {
        this.size = size;
        this.hashCount = hashCount;
        this.bitArray = new Array(size).fill(0);
    }

    // Adding the data to the bloom filter
    add (data) {
        const hashes = generateHashRecursive(data, this.hashCount);
        console.log(hashes);
        for (let i = 0; i < this.hashCount; i++) {
            const index = hashes[i] % this.size;
            this.bitArray[index] = 1;
        }

        DATABASE.push(data);
    };

    contains (data) {
        const hashes = generateHashRecursive(data, this.hashCount);
        for (let i = 0; i < this.hashCount; i++) {
            const index = hashes[i] % this.size;
            if (this.bitArray[index] === 0) return false;
        }
        // Check if the data is in the database - Because the bloom filter is not 100% accurate. It is possible that bloom filter can provide FALSE POSITIVE but never FALSE NEGATIVE.
        // So we need to check if the data is in the database
        if (DATABASE.includes(data)) {
            return true;
        }
    }
}

const bloomFilter = new BloomFilter(1000, 5);
bloomFilter.add("hello");
bloomFilter.add("world");

console.log(bloomFilter.contains("hello")); // true
console.log(bloomFilter.contains("world")); // true
console.log(bloomFilter.contains("foo")); // false