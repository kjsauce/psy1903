let jsPsych = initJsPsych()

let timeline = [];

// Welcome Trial
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcome'> Welcome to our Demo Experiment of the Animation Plug-in!</h1> 
    <p>In this experiment, you will be asked to look at various faces and categorize them by their level of trustworthiness</p>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);


// Trial 1 Untrustworthy
let animationSequence1 = [
    'images/IMG1.png',
    'images/IMG2.png'
];

let animationTrial1 = {
    type: jsPsychAnimation,
    stimuli: animationSequence1,
    sequence_reps: 5,
    frame_time: 300,
    prompt: '<p> Watch the faces.</p>',
};
timeline.push(animationTrial1);

let questionTrial1 = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>After viewing these faces, what word would you use to categorize them out of the following: Trustworthy, Neutral, Untrustworthy ?</p>',
    html: `<p><input type='text' name='category' id='mood'></p>`,
    autofocus: 'category', // id of the field we want to auto-focus on when the trial starts
    button_label: 'Submit Answer',
    data: {
        collect: true,
    },
    on_finish: function (data) {
        data.category = data.response.category1;
    }
}
timeline.push(questionTrial1);

// Trial 2 - Trustworthy
let animationSequence2 = [
    'images/IMG4.png',
    'images/IMG5.png'
];

let animationTrial2 = {
    type: jsPsychAnimation,
    stimuli: animationSequence2,
    sequence_reps: 5,
    frame_time: 300,
    prompt: '<p> Watch the faces.</p>',
};
timeline.push(animationTrial2);

let questionTrial2 = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>After viewing these faces, what word would you use to categorize them out of the following: Trustworthy, Neutral, Untrustworthy ?</p>',
    html: `<p><input type='text' name='category' id='mood'></p>`,
    autofocus: 'category', // id of the field we want to auto-focus on when the trial starts
    button_label: 'Submit Answer',
    data: {
        collect: true,
    },
    on_finish: function (data) {
        data.category = data.response.category2;
    }
}
timeline.push(questionTrial2);

// Trial 3 - Neutral 
let animationSequence3 = [
    'images/IMG6.png',
    'images/IMG5.png',
];

let animationTrial3 = {
    type: jsPsychAnimation,
    stimuli: animationSequence3,
    sequence_reps: 5,
    frame_time: 300,
    prompt: '<p> Watch the faces.</p>',
};
timeline.push(animationTrial3);

let questionTrial3 = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>After viewing these faces, what word would you use to categorize them out of the following: Trustworthy, Neutral, Untrustworthy ?</p>',
    html: `<p><input type='text' name='category' id='mood'></p>`,
    autofocus: 'category', // id of the field we want to auto-focus on when the trial starts
    button_label: 'Submit Answer',
    data: {
        collect: true,
    },
    on_finish: function (data) {
        data.category = data.response.category3;
    }
}
timeline.push(questionTrial3);

// Debrief and end screen
let debrief = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you for participating!</h1><p>This is the end of the experiment.</p>`
};
timeline.push(debrief);


jsPsych.run(timeline); 