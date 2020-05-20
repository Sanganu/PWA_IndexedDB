const router = require("express").Router();
const Word = require("../models/words.js");
const axios = require("axios");

router.post("/api/word", ({body}, res) => {
  console.log("New wor",body)
  axios.get(`https://www.dictionaryapi.com/api/v3/references/sd4/json/${body}?key=${process.env.MERRIAM_API_KEY}`)
  .then(apiresponse => {
    console.log("API",apiresponse);
    let wordentry = {
      word:body,
      synonym:[],
      partsOfSpeech:"",
      examples:[],
      definition:[],
    }
    Word.create(wordentry)
    .then(dbWord => {
      console.log("REcord created",body)
      res.json(dbWord);
    })
   
  }).catch(err => {
    res.status(404).json(err);
  });
 
});

router.post("/api/word/bulk", ({body}, res) => {
  Word.insertMany(body)
    .then(dbWord => {
      console.lof("Bulk record",body)
      res.json(dbWord);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

router.get("/api/word", (req, res) => {
  Word.find({}).sort({date: -1})
    .then(dbWord => {
      console.log("Records",dbWord)
      res.send(dbWord);
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

module.exports = router;