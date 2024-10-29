let jsPsych = initJsPsych();

let timeline = [];

// Welcome 
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Lexical Decision Task!</h1> 

    <p>In this experiment, you will be shown a series of characters and asked to categorize whether the characters make up a word or not.</p>
    <p>There are three parts to this experiment.</p>
    <p>Press SPACE to begin the first part.</p>
    `,
    choices: [' '],
};
timeline.push(welcomeTrial);

let trial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['f', 'j'],
    stimulus: `
        <span class='category1'> <strong>family</strong> (press F)</span>
        <span class='category2'> <strong>career</strong> (press J)</span>
        <p class='word'>home</p>`
    ,
};

// Create an array of conditions
let conditions = [
    {
        title: 'Part 1',
        count: 3,
        conditions: [
            { characters: 'cat', isWord: true },
            { characters: 'pin', isWord: true },
            { characters: 'jgb', isWord: false },
            { characters: 'mub', isWord: false },
        ],
    },
    {
        title: 'Part 2',
        count: 4,
        conditions: [
            { characters: 'food', isWord: true },
            { characters: 'burn', isWord: true },
            { characters: 'mnut', isWord: false },
            { characters: 'plut', isWord: false },
        ]
    },
    {
        title: 'Part 3',
        count: 5,
        conditions: [
            { characters: 'apple', isWord: true },
            { characters: 'jumps', isWord: true },
            { characters: 'pilde', isWord: false },
            { characters: 'kandy', isWord: false },
        ]
    }
];


for (let block of conditions) {
    let blockConditions = jsPsych.randomization.repeat(block.conditions, 1);

    let blockIntroTrial = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <h1>${block.title}</h1>
            <p>You are about to see a series of ${block.count} characters.</p>
            <p>If the characters make up a word, press the F key.</p>
            <p>If the characters do not make up a word, press the J key.</p>
            <p class ='instructions'> Press SPACE to begin.</p>
            `,
        choices: [' '],
    };
    timeline.push(blockIntroTrial);

    for (let condition of blockConditions) {
        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1> ${condition.characters} </h1>`,
            choices: ['f', 'j'],
            data: {
                collect: true,
                characters: condition.characters,
                blockId: block.title

            },
            on_finish: function (data) {
                if (data.response == 'f' && condition.isWord == true) {
                    data.correct = true;
                } else if (data.response == 'j' && condition.isWord == false) {
                    data.correct = true;
                } else {
                    data.correct = false;
                }
            }
        }
        timeline.push(conditionTrial);
    }
}

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'lexical-decision';
        let dataPipeExperimentId = '0qB4cs3GAXma';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect'])
            .csv();

        console.log(results);

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');
        let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentID, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })
    }
}

timeline.push(resultsTrial);

// Showed word or psuedo word (on repeat) 
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1> Thank you! </h1>
    <p> You can now close this tab </p>
    `,
    choices: ['NO KEYS'],

}
timeline.push(debriefTrial);

// Debrief

jsPsych.run(timeline);