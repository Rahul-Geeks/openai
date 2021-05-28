require("dotenv").config();
const OpenAI = require('openai-api');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;      // Openai API key

const openai = new OpenAI(OPENAI_API_KEY);

/**
 * Call complete text
 * @returns Promise with complete text API response
 */
async function completeText() {
    const complete = await openai.complete({
        engine: 'davinci',
        prompt: 'this is a test',
        maxTokens: 5,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
    });
    return complete.data;
}

completeText().then(console.log).catch(console.log);