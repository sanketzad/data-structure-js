# data-structure-js
Data structure implementation in JavaScript

# Data Structures
    Collections of the data / values. Values can have the relations or not. Each data strcutures have their own way of handling and modifying the values. Handling the values within it.
    
    It's a way for us to organise the data / values, so that with the algorithms we can manupilate the data to generate desired outcomes.

`Data Structures + Algorithms = Programs`

# What is `GOOD` code?
- Readable
- Scalable
    - Time or Speed [Time complexity]
    - Space or Memory [Space complexity]

# Big O
    Means when we grow bigger and bigger with the input, how of the algorithm or function slows down.
- O(1): Constant time - 
- O(log n): Logarithemic time - 
- O(n): Linear time - 
- O(n log n): 
- O(n ^ 2): Quadratic time - 
- O(2 ^ n): Exponential time - 
- O(n!): Factorial time - 

```
- Iterating through the half a collection of item is still O(n)
- Two separate collections O(a + b) or O(a * b)
```

- ## Rule book
    - Rule 1: Consider the `Worst Case`
    - Rule 2: `Remove Constants` from the calculated BigO
    - Rule 3: Use `Different Terms` for different inputs. Consider, Array A & B, nested would be O(a*b) and parallely would be O(a+b)
        - `+` for steps in order
        - `*` for nested steps
    - Rule 4: `Drop Non Dominant` inputs

- ## What casues space complexity?
    - Variables
    - Data structures
    - Function call
    - Allocations
