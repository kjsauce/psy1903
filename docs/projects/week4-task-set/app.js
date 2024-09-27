// function celsiusToFahrenheit(C, F) {
// let fahreneit = (F = (C * 1.8) + 32);
// return fahreneit;
// }

// console.log(celsiusToFahrenheit(10)); // Expected output: 50 (yes)
// console.log(celsiusToFahrenheit(-5)); // 23 (yes)

// function convertTemp(temp, convertTo) {
// let fahreneit = ((temp * 1.8) + 32);
// let celsius = ((temp - 32) / 1.8);
// if (convertTo == 'c') {
// return celsius;
// } else if (convertTo == 'f') {
//return fahreneit;
//}
//}

//console.log(convertTemp(10, 'c')); // Expected output: -12.222222222222221
//console.log(convertTemp(10, 'f')); // Expected output: 50

// function getWordLengths() {
// let getWordLengths = words.map(wordslength => wordslength.length); //usign map to make a new array and wordslength to determine the # of characters in each string
// }

// let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
//console.log(getWordLengths(words)); // Expected output: [5, 6, 6, 4, 5]

// function getLongestWord(words) {
// let longestWord = '';
// for (let word of words) {
//if (word.length > longestWord.length) {
//longestWord = word;
//}
//}
//return longestWord
//}

//let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];
//console.log(getLongestWord(words)); // Expected output: banana

//function getOddNumbers(numbers) {
//let results = [];
//for (let number of numbers) {
//if (number % 2 !== 0) {
// results.push(number);
// }
//}
// return results;
//}

//console.log(getOddNumbers([1, 2, 3, 4, 5])); // Expected output: [1, 3, 5]
//console.log(getOddNumbers([12, 45, 10, 11, 61])); // Expected output: [45, 11, 61]

function filterNumbers(numbers, evenOrOdd) {
    let results = [];
    for (let number of numbers) {
        if (evenOrOdd == 'odd' && number % 2 !== 0) {
            results.push(number);
        } else if (evenOrOdd == 'even' && number % 2 === 0) {
            results.push(number);
        }
    }
    return results

}



console.log(filterNumbers([1, 2, 3, 4, 5], 'even')); // Expected output: [2, 4]
console.log(filterNumbers([1, 2, 3, 4, 5], 'odd')); // Expected output: [1, 3, 5]

console.log(filterNumbers([45, 10, 11, 61], 'even')); // Expected output: [10]
console.log(filterNumbers([45, 10, 11, 61], 'odd')); // Expected output: [45, 11, 61]