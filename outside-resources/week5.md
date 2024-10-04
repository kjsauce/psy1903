Outside Resources Log - Week 5

AI Prompts
- How can you take a variable created in another js file and add it to your current one?
- How can I call a variable from an array that's in a loop within a loop?
- This is my code:

for (let condition of conditions) {

        let mathTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: <p> What is ${condition.number.num1} + ${condition.number.num2} ?,
            html: <p><input type='text' name='response' id='response'></p>,
            autofocus: 'response', // id of the field we want to auto-focus on when the trial starts
            button_label: 'Submit Answer',
            data: {
                collect: true,
                block: condition.block,
                num1: condition.num1,
                num2: condition.num2,
                answer: condition.answer,
            },
 and I keep getting this experiment.js:39 Uncaught TypeError: Cannot read properties of undefined (reading 'num1') although I've plugged in data from another js file that defines num1

Outside sites
- 