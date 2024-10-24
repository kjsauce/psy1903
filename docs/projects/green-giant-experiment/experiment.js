let jsPsych = initJsPsych();

let timeline = [];

// Welcome 
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> Welcome to the Green Giant Experiment!</h1> 

    <p>In this experiment, you will complete the following three tasks:</p>
    <li> In Task 1, you will be asked to watch a short video.</li>
    <li> In Task 2, you will answer a brief set of questions.</li>
    <li> In Task 3, you will be asked to categorize a series of words. </li>
</div>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

let inductionTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> Task 1 of 3</h1> 

    <p>Please watch the following video. When you are done, press the <span class='key'>SPACE</span> key to move to the next task. </p>
    `,
    choices: [' '],
};
timeline.push(inductionTrial);

let likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];


let questionnaire = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", name: 'Math Problem', labels: likert_scale },
        { prompt: "I find math easy.", name: 'Easy', labels: likert_scale },

    ],
    randomize_question_order: false
};

timeline.push(questionnaire);

for (let block of conditions) {

    // Screen with instructions, indicating the two categories
    // and the expected keys to be pressed
    let leftCategory = block.categories[0];
    let rightCategory = block.categories[1];

    for (let trial of block.trials) {
        // Screen that displays trial.word in the center
        // as well as the left/right categories
        // listening for key response (f,j)
        // on_finish: process the response, store the appropriate data

        let example = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `...`,
            data: {
                collect: true,
                trialType: 'iat',
                word: trial.word,
                expectedCategory: trial.expectedCategory,
                expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
                leftCategory: leftCategory,
                rightCategory: rightCategory
            },
            on_finish: function (data) {
                // if data.response == trial.expectedResponse
                // data.correct = true
                // else
                // data.correct = false
            }
        }
        timeline.push(example);
    }
}

jsPsych.run(timeline);