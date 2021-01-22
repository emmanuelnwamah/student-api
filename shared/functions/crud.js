const RESULT_CODES = require('../variables/ResultCodes');
const OBJECT_ID = require('mongoose').Types.ObjectId;

let create = async (data, collection) => {
    try {
        if (!data) {
            throw {
                code: RESULT_CODES.BAD_REQUEST,
                message: "No data found in request"
            };
        }

        const document = new collection(data);

        await document.validate().catch(error => {

            throw {
                code: RESULT_CODES.BAD_REQUEST,
                message: error.message
            };
        });

        await document.save().catch((error) => {
            if (error.message) {
                throw {
                    code: RESULT_CODES.BAD_REQUEST,
                    message: error.message
                };
            } else if (error.code == 11000) {
                throw {
                    code: RESULT_CODES.BAD_REQUEST,
                    message: "A duplicate key error occurred"
                };
            } else {
                throw {
                    code: RESULT_CODES.BAD_REQUEST,
                    message: "Error: " + error.code
                };
            }
        });

        return document;
    } catch (error) {
        throw error;
    }
};

let read = async (documentId, collectionName, collection) => {
    try {

        if (!OBJECT_ID.isValid(documentId)) {
            throw {
                code: RESULT_CODES.BAD_REQUEST,
                message: "Invalid " + collectionName + " ID: " + documentId
            };
        }

        const document = await collection.findOne({
            _id: documentId
        });

        if (!document) {
            throw {
                code: RESULT_CODES.NOT_FOUND,
                message: "Invalid " + collectionName + " ID: " + documentId
            };
        } else {
            return document
        }

    } catch (error) {
        throw {
            code: error.code ? error.code : RESULT_CODES.BAD_REQUEST,
            message: error.message
        };
    }
};

module.exports = {
    create,
    read 
};