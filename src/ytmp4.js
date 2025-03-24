const { ytmp4 } = require('@vreden/youtube_scraper')

async function YtMp4(url) {
return new Promise(async (resolve, reject) => {
const links = url
try {
const res = await ytmp4(links)
resolve(res)
} catch (e) {
reject(e) 
}
})
}
    app.get("/api/downloader/ytmp4", async (req, res) => {
    const { url, apikey } = req.query;
    if (!url) return res.json("Isi Parameternya!");
    if (!apikey) return res.json("Isi Parameter Apikey.");
}
const check = global.apikey
if (!check.includes(apikey)) return res.json("Apikey Tidak Valid!.");
    try {
        var anu = await YtMp4(`${url}`)

        res.json({
            status: true,
            creator: global.creator,
            metadata: anu.metadata, 
            download: anu.download         
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});
module.exports = { YtMp4 }