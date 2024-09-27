// function celsiusToFahrenheit(C, F) {
// let fahreneit = (F = (C * 1.8) + 32);
// return fahreneit;
// }

// console.log(celsiusToFahrenheit(10)); // Expected output: 50 (yes)
// console.log(celsiusToFahrenheit(-5)); // 23 (yes)

function convertTemp(temp, convertTo) {
    let fahreneit = ((temp * 1.8) + 32);
    let celsius = ((temp - 32) / 1.8);
    if (convertTo == 'c') {
        return celsius;
    } else if (convertTo == 'f') {
        return fahreneit;
    }
}

console.log(convertTemp(10, 'c')); // Expected output: -12.222222222222221
console.log(convertTemp(10, 'f')); // Expected output: 50