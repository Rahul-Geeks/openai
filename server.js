require("dotenv").config();
const OpenAI = require('openai-api');
const express = require("express");
let app = express();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;      // Openai API key

const openai = new OpenAI(OPENAI_API_KEY);

/**
 * Get completed string
 * @param {string} prompt Prompt string
 * @returns Promise with completed
 */
async function getCompleteText (prompt) {
    let complete = await openai.complete({
        engine: 'davinci',
        prompt: prompt,
        maxTokens: 800,
        temperature: 0.7,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 1,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
    });

    return complete.data;
}

// Complete text
app.get("/complete/text", async (req, res) => {
    if (req.query.prompt) {                             // Don't allow if prompt is not passed
        getCompleteText(req.query.prompt)               // Call completion API
            .then(textObj => res.status(200).json(textObj))
            .catch(error => res.status(500).json({ message: 'Error occurred while getting completed text', error: error.toString() }));
    }
    else
        res.status(404).json({ message: "Prompt is not set" });
});

app.listen(4000, () => {
    console.log("App running on port 4000!");
});