// Create variables to store references to elements on the page
rstart1 = Date.now();
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');

let num1output = document.getElementById('num1');
let num2output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

num1output.innerHTML = num1;
num2output.innerHTML = num2;

// equation.innerHTML = "What is " + num1 + ' + ' + num2 + ' ?';

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {

    // Prevent the default form submission b
    event.preventDefault();

    // Stop the timer
    rend1 = Date.now();
    // Calculate response time
    responsetime1 = (rend1 - rstart1) / 1000;
    // Collect the response
    let response = form.elements['response'].value;

    // Report the results

    let resultsinnerHTML = '';

    if (response == num1 + num2) {
        resultsinnerHTML = ("You answered " + response + " (correct) in " + responsetime1 + " seconds.");
    } else if (response !== num1 + num2) {
        resultsinnerHTML = ("You answered " + response + " (incorrect) in " + responsetime1 + " seconds.");
    }

    results.innerHTML = resultsinnerHTML

    // Hide the form, including instructions
    form.style.display = 'none';
});