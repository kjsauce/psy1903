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


// Task 2 - Questionnaire 
let animation_sequence1 = ["IMG1.jpg", "IMG2.jpg"];

let animationTrial1 = {
    type: jsPsychAnimation,
    stimuli: animation_sequence1,
    sequence_reps: 3,
    frame_time: 500,
    prompt: '<p>Watch the faces.</p>',
};
timeline.push(animationTrial1);

let questionTrial1 = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p>After viewing these faces, what word would you use to categorize them?</p>',
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

//var animation_sequence2 = ["img/happy_face_1.jpg", "img/happy_face_2.jpg", "img/happy_face_3.jpg", "img/happy_face_4.jpg"];

//var animation_trial = {
// type: jsPsychAnimation,
// stimuli: animation_sequence,
// sequence_reps: 3,
// frame_time: 500,
// prompt: '<p>Watch the faces.</p>',
//};

//var animation_sequence3 = ["img/happy_face_1.jpg", "img/happy_face_2.jpg", "img/happy_face_3.jpg", "img/happy_face_4.jpg"];

//var animation_trial = {
// type: jsPsychAnimation,
// stimuli: animation_sequence,
// sequence_reps: 3,
// frame_time: 500,
// prompt: '<p>Watch the faces.</p>',
//};


//timeline.push(questionnaireA, questionnaireB);

// Task 3 - IAT Questions 

//Setting up Intro Screen
//let introScreen = {
// type: jsPsychHtmlKeyboardResponse,
// stimulus: `
// <h1> Task 3 of 3 </h1> 
// <p>In this final task, you will be shown a series of words and asked to sort them into categories. </p>
//  <p>Press <span class='key'>SPACE</span> to begin.</p>
// `,
// choices: [' '],
//};

//timeline.push(introScreen);



// Debrief Trial
//let debriefTrial = {
// type: jsPsychHtmlKeyboardResponse,
// stimulus: `
// <h1>Thank you!</h1>
// <p>The experiment is now complete, you can close this tab.</p>
// `,
// choices: ['NO KEYS'],
// on_start: function () {
//  jsPsych.progressBar.progress = 1;
//  let data = jsPsych.data
//  .get('label')
//   .filter({ collect: true })
//  .ignore(['response', 'stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect'])
//  .csv();
//  console.log(data);
//  }
//}



jsPsych.run(timeline);