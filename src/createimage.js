const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
app.use(express.json());

// ChatGPT Endpoint
app.post('/api/ai/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4',
            messages: [{ role: 'user', content: message }],
        }, {
            headers: { Authorization: `Bearer NabzxDev` },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Image Generation Endpoint
app.post('/api/ai/image', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt,
            n: 1,
            size: "1024x1024",
        }, {
            headers: { Authorization: `Bearer YOUR_API_KEY` },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
