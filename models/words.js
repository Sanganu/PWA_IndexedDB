const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordSchema = new Schema(
  {

    word: {
      type: String,
      trim: true,
      required: "Enter a name for transaction"
    },
    synonym: [{
      type: String,
      required: "Enter an amount"
    }],
    partsOfSpeech:{
      type:String,
    },
    examples:[{
      type:String
    }],
    definition:[{
      type:String
    }],
    dateCreated: {
      type: Date,
      default: Date.now
    }
  }
);

const Words = mongoose.model("Words", wordSchema);

module.exports = Words;
