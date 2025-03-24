const express = require('express');
const axios = require('axios');
const router = express.Router();  // Tambahkan ini!

router.get('/imagecreator/brat', async (req, res) => {
    try {
        const { apikey, text } = req.query;
        if (!global.apikey.includes(apikey)) {
            return res.status(400).json({ status: false, error: 'Apikey invalid' });
        }
        if (!text) {
            return res.status(400).json({ status: false, error: 'Text is required' });
        }

        const pedo = await axios.get(`https://brat.caliphdev.com/api/brat?text=${text}`, { responseType: "arraybuffer" });
        let imageBuffer = pedo.data;

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = router;  // Ubah dari `module.exports = function app(app) {...}`
