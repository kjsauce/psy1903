//let form = document.getElementsByTagName('form')[0];
//let results = document.getElementById('results');

//let num1output = document.getElementById('num1');
//let num2output = document.getElementById('num2');

//let num1 = Math.floor(Math.random() * 10) + 1;
//let num2 = Math.floor(Math.random() * 10) + 1;

//num1output.innerHTML = num1;
//num2output.innerHTML = num2;

// equation.innerHTML = 'What is ' + num1 + " + " + num2 + ' ?';
//let response = prompt(equation.innerHTML)

//let feedback = '';

//if (response == num1 + num2) {
// feedback = 'Correct! ';
//} else if (response == (num1 + num2) - 1 || response == (num1 + num2) + 1) {
// feedback = 'You were close! ';
//} else {
// feedback = 'Incorrect.';
//}

//alert(feedback + 'The expected answer is ' + (num1 + num2) + '.');

//let age = prompt('How old are you?');
//if (age < 12) {
//alert('Child');
//}
//if (age >= 12 || age <= 18) {
//alert('Teenager');
//}
//if (age >= 18) {
//alert('Adult');
//}

let response = prompt('Enter a whole number.')
even = (response % 2 == 0);
odd = (response % 2 !== 0);

if (response = even) {
    alert("You entered an even number.")
} else if (response = odd) {
    alert("You enetered an odd number.")
}
