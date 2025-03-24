require("../settings.js")
const instagramGetUrl = require("instagram-url-direct")

async function igdl (url) {
let links = await instagramGetUrl(url).then((res) => {
return {
status: true, 
creator: global.creator, 
result: {
type: res.media_details.find(e => e.type == "image") ? "image" : "video", 
url: res.media_details.find(e => e.type == "image") ? res.media_details.map(e => e.url) : res.media_details[0].url
}
}
}).catch((e) => {
return {
status: false, 
creator: global.creator, 
result: {}
}
})
return links
}
app.get("/api/downloader/igdl", async (req, res) => {
    const { url, apikey } = req.query;
    if (!url) return res.json("Isi Parameternya!");
    if (!apikey) return res.json("Input Apikey!");
    }
    const check = global.apikey
if (!check.includes(apikey)) return res.json("Apikey Tidak Valid!.");
    try {
        var anu = await igdl(`${url}`)
        res.json(anu)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});
module.exports = { igdl }