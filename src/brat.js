const express = require('express');
const axios = require('axios');
const router = express.Router();  // Buat router

router.get('/imagecreator/brat', async (req, res) => {
    try {
        const { apikey, text } = req.query;
        if (!global.apikey.includes(apikey)) {
            return res.status(400).json({ status: false, error: 'Apikey invalid' });
        }
        if (!text) {
            return res.status(400).json({ status: false, error: 'Text is required' });
        }

        const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${text}`, { responseType: "arraybuffer" });
        let imageBuffer = response.data;

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = router; // Ekspor router dengan benar
