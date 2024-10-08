let jsPsych = initJsPsych();

let timeline = [];

// Welcome 
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> <span class= 'experiment'>Welcome to the Math Response Time Task</span></h1> 

    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press <span class= 'key'>SPACE</span> to begin the first part.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

// Questionnaire
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

// Math Trials Begin

for (let block of conditions) {
    let blockConditions = jsPsych.randomization.repeat(block.conditions, 3);

    let blockTrials = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>Press SPACE to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockTrials)


    for (let question of block.questions) {

        let mathTrial = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p> <span class ='equations'>What is <span class ='highlight'>${question.num1}</span> + <span class= 'highlight'> ${question.num2}</span> ? </span>`,
            html: `<p> <input type='text' name='response' id='response'></p>`,
            autofocus: 'response', // id of the field we want to auto-focus on when the trial starts
            button_label: 'Submit Answer',
            data: {
                collect: true,
                block: block.title,
                num1: question.num1,
                num2: question.num2,
                answer: question.answer,
            },
            on_finish: function (data) {
                data.response = data.response.response;
                if (data.response == data.answer) {
                    data.correct = true;
                } else if (data.response !== data.answer) {
                    data.correct = false;
                } else {
                    data.correct = false;
                }
            }

        }
        timeline.push(mathTrial);
    }
}



// Debrief
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>You can now close this tab.</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['collect', 'trial_type', 'trial_index', 'plugin_version'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);

jsPsych.run(timeline);