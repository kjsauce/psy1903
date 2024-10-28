let jsPsych = initJsPsych();

let timeline = [];

// Welcome Trial
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1 class='welcome'> Welcome to the <span class= 'greengiant'>Green Giant Experiment</span>!</h1> 
    <p>In this experiment, you will complete the following three tasks:</p>
    <div class = "task-box">
         <li> In Task 1, you will be asked to watch a short video.</li>
         <li> In Task 2, you will answer a brief set of questions.</li>
         <li> In Task 3, you will be asked to categorize a series of words. </li>
</div>
    <p>Press <span class='key'>SPACE</span> to begin.</p>
    `,
    choices: [' '],
};

timeline.push(welcomeTrial);

// Task 1 - Priming 

// Setting up the YouTube Videos for Randomization 
let videos = {
    video1: {
        iframe: "<iframe title= 'YouTube video player' width = '640' height='390' src='https://www.youtube.com/embed/XMcab1MFaLc' frameborder='0' allowFullScreen></iframe>",
        label: 'video1'
    },
    video2: {
        iframe: "<iframe title='YouTube video player' width='640' height='390' src='https://www.youtube.com/embed/aOusNCEXFZw' frameborder='0' allowFullScreen></iframe>",
        label: 'video2'
    }
};

let selectedVideo = Math.random() < 0.5 ? videos.video1 : videos.video2;

// Text on Screen for Priming Task
let primingTask = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> Task 1 of 3</h1> 
    <p>Please watch the following video. When you are done, press the <span class='key'>SPACE</span> key to move to the next task. </p>
    <p>${selectedVideo.iframe}</p>
    `,
    choices: [' '],
    data: {
        collect: true,
        trialType: 'prime',
        displayedVideo: selectedVideo.label
    }
};

timeline.push(primingTask);

// Task 2 - Questionnaire 

// let likertscaleA = [
"Strongly Disagree (1)",
    "Disagree",
    "Neutral (3)",
    "Agree",
    "Strongly Agree (5)"
// ];

// let likertscaleB = [
    // "Never (1)",
   // "Very Rarely",
   // "Ocasionally (3)",
  //  "Frequently",
   // "Very Frequently (5)",
];

let questionnaireA = {
    type: jsPsychSurveyLikert,
    //  questions: [
    //  { prompt: "I enjoy solving math problems.", name: 'Math Problem', labels: likert_scale },
    // { prompt: "I find math easy.", name: 'Easy', labels: likert_scale },

    //],
    // randomize_question_order: false
    //};

    ////timeline.push(questionnaire);

    ///for (let block of conditions) {

    // Screen with instructions, indicating the two categories
    // and the expected keys to be pressed
    // let leftCategory = block.categories[0];
    // let rightCategory = block.categories[1];

    // for (let trial of block.trials) {
    // Screen that displays trial.word in the center
    // as well as the left/right categories
    // listening for key response (f,j)
    // on_finish: process the response, store the appropriate data

    // let example = {
    //  type: jsPsychHtmlKeyboardResponse,
    //  stimulus: `...`,
    //  data: {
    //      collect: true,
    //     trialType: 'iat',
    //     word: trial.word,
    //      expectedCategory: trial.expectedCategory,
    //      expectedCategoryAsDisplayed: trial.expectedCategoryAsDisplayed,
    //      leftCategory: leftCategory,
    //     rightCategory: rightCategory
    //   },
    //  on_finish: function (data) {
    // if data.response == trial.expectedResponse
    // data.correct = true
    // else
    // data.correct = false
    // }
    // }
    //  timeline.push(example);
    //  }
    // }

    jsPsych.run(timeline);