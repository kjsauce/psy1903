// Welcome alert saying the phrase given
alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.')

// Prompt needs to give an equation to solve
rstart1 = Date.now();
number11 = Math.floor(Math.random() * 10) + 1;
number12 = Math.floor(Math.random() * 10) + 1;
response1 = prompt("What is " + number11 + " + " + number12 + " ? ")
console.log(response1);
rend1 = Date.now();
responsetime1 = (rend1 - rstart1) / 1000;
// Alert tells the respondent their answer
alert('You answered ' + response1 + ' in ' + responsetime1 + ' seconds.')

// Prompt needs to give an equation to solve
rstart2 = Date.now();
number21 = Math.floor(Math.random() * 10) + 1;
number22 = Math.floor(Math.random() * 10) + 1;
response2 = prompt("What is " + number21 + " + " + number22 + " ? ")
console.log(response2);
rend2 = Date.now();
responsetime2 = (rend2 - rstart2) / 1000;
// Alert tells the respondent their answer
alert('You answered ' + response2 + ' in ' + responsetime2 + ' seconds.')

// Prompt needs to give an equation to solve
rstart3 = Date.now();
number31 = Math.floor(Math.random() * 10) + 1;
number32 = Math.floor(Math.random() * 10) + 1;
response3 = prompt("What is " + number31 + " + " + number31 + " ? ")
console.log(response3);
rend3 = Date.now();
responsetime3 = (rend3 - rstart3) / 1000;
// Alert tells the respondent their answer
alert('You answered ' + response3 + ' in ' + responsetime3 + ' seconds.')

alert("Thank you for your participation!")

