const MONGOOSE = require('mongoose');
const CORE_DATABASE_NAME = "assessment-core-db";
let coreConnection = null;

const loadAssessmentCoreDatabase = () => {

    if (coreConnection) {
        return coreConnection;
    }

    const client = MONGOOSE.createConnection(process.env.MONGODB_URL + CORE_DATABASE_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, function (err) {
        if (err) {
            console.log(CORE_DATABASE_NAME + "Error: " + err)
        }
    });

    coreConnection = client;

    return coreConnection;
};

module.exports = {
   loadAssessmentCoreDatabase
};