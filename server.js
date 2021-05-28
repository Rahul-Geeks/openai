require("dotenv").config();
const OpenAI = require('openai-api');
const express = require("express");
let app = express();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;      // Openai API key

const openai = new OpenAI(OPENAI_API_KEY);

// Complete text
app.get("/complete/text", (req, res) => {
    if (req.query.prompt) {                             // Don't allow if prompt is not passed
        let params = {
            engine: 'davinci',
            prompt: req.query.prompt,
            maxTokens: 800,
            temperature: 0.7,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 1
        };

        // Call completion API
        openai.complete(params)
            .then(textObj => res.status(200).json(textObj.data))
            .catch(error => res.status(500).json({ message: 'Error occurred while getting completed text', error: error.toString() }));
    }
    else
        res.status(404).json({ message: "Prompt is not set" });
});

app.listen(4000, () => {
    console.log("App running on port 4000!");
});