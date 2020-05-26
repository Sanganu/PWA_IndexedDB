const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {

    word: {
      type: String,
      trim: true,
      unique:true,
      required: "Enter a name for transaction"
    },
    syllable: [{
      type: String,
      required: "Enter an amount"
    }],
    partsOfSpeech:{
      type:String,
    },
    stems:[{
      type:String
    }],
    definition:[{
      type:String
    }],
    apiuuid:{
      type:String
    },
    dateCreated: {
      type: Date,
      default: Date.now
    }
  }
);

const Words = mongoose.model("Words", wordSchema);

module.exports = Words;
