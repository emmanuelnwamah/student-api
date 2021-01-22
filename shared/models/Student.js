const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;
const CONNECTION = require('../functions/connection');
const MODEL_NAME = "students";

const COLLECTION_SCHEMA = new SCHEMA({
  FirstName: {
    type: String,
    trim: true,
    required: true
  },
  LastName: {
    type: String,
    trim: true,
    required: true
  }
});

let model;

if (model) {
  model = MONGOOSE.model(MODEL_NAME);
} else {
  model = CONNECTION.loadAssessmentCoreDatabase().model(MODEL_NAME, COLLECTION_SCHEMA);
}

module.exports = model;