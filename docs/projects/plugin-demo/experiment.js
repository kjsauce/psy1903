let jsPsych = initJsPsych()

let timeline = [];

let participantId = getCurrentTimestamp();

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

// Results
let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'rabgtJ4iEa1O';
        let forceOSFSave = false;
        let participantId = getCurrentTimestamp();
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })

    }
}
timeline.push(resultsTrial);

// Debrief and end screen
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function (data) {

        let linkToQualtricsSurvey = `https://harvard.az1.qualtrics.com/jfe/form/SV_6PWVYr2uGdESVoi?experimentParticipantId=${participantId}`

        return `
        <h1>Thank you!</h1>
        <p>
            To complete your response, 
            please follow <a href='${linkToQualtricsSurvey}'>this link</a> 
            and complete the survey you see there.
        </p>
    `},
    choices: ['NO KEYS']
}
timeline.push(debriefTrial);


jsPsych.run(timeline); 