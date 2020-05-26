const router = require("express").Router();
const Word = require("../models/words.js");
const axios = require("axios");

router.post("/api/word", (req, res) => {
        // console.log("POST route",req.body)
        var word = req.body.userword;
        // console.log("New wor",word)
        axios.get(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${word}?key=${process.env.MERRIAM_API_KEY}`)
        .then(apiresponse => {
            // console.log("API",apiresponse.data[0]);
            let wordentry = {
              word: apiresponse.data[0].meta.id,
              syllable: apiresponse.data[0].hwi.hw,
              apiuuid: apiresponse.data[0].meta.uuid,
              partsOfSpeech: apiresponse.data[0].fl,
              stems: apiresponse.data[0].meta.stems,
              definition: apiresponse.data[0].shortdef,
            }
            // console.log(wordentry)
  
              Word.create(wordentry)
                .then(dbWord => {
                  console.log("REcord created", dbWord)
                  res.json(dbWord);
                }).   
              catch(error => {
                var vrmsg = (error.errmsg).substr(0, 6) || "error";
                if (vrmsg === "E11000") {
                  console.log("Word already exxist-1");
                  res.json({ "E1100": "Word already exist" })
                }
                else {
                  console.log("err", error);
                  res.error(error)
                }
              })


          }).catch(err => {

            console.log("err", err)

            // res.status(404).json(err);


        });
})

  router.post("/api/word/bulk", ({ body }, res) => {
    Word.insertMany(body)
      .then(dbWord => {
        console.lof("Bulk record", body)
        res.json(dbWord);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  router.get("/api/word", (req, res) => {
    Word.find({}).sort({ date: -1 })
      .then(dbWord => {
        console.log("Records", dbWord)
        res.send(dbWord);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  module.exports = router;