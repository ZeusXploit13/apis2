const Groq = require('groq-sdk');
require("../settings.js")

let api = [
"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", 
"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", 
"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"
]

let apikey = api[Math.floor(Math.random() * api.length)]

const client = new Groq({
  apiKey: apikey,
});

async function groq(teks, prompt) {
try {
  const chatCompletion = await client.chat.completions
    .create({
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: teks }
      ],
      model: 'llama3-8b-8192',
    })
    .catch(async (err) => {
      if (err instanceof Groq.APIError) {
        console.log(err.status);
        console.log(err.name);
        console.log(err.headers);
      } else {
        throw err;
      }
    })
    
    return {
  status: true, 
  creator: global.creator,
  respon: chatCompletion.choices[0].message.content
  }
  
  } catch (e) {
  return {
  status: false, 
  creator: global.creator,
  respon: "Error :" + e  
  }
  }
}
app.get("/api/tools/openai", async (req, res) => {
    const { prompt, msg, apikey } = req.query;
    if (!prompt || !msg) return res.json("Isi Parameternya!");
    if (!apikey) return res.json("Input Apikey!");
    }
    const check = global.apikey
if (!check.includes(apikey)) return res.json("Apikey Tidak Valid!.");
    try {
        var anu = await groq(`${msg}`, `${prompt}`)
        if (!anu.status) {
        res.json ({
        status: false,
        creator: global.creator,
        result: anu.respon
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu.respon     
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});
module.exports = { groq }