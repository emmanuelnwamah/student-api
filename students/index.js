const RESULT_CODES = require('../shared/variables/ResultCodes');
const USER = require('../shared/models/Student');
const CRUD = require('../shared/functions/crud');

module.exports = async function (context, req) {

    switch (req.method) {
        case "POST":
            await post();
            break;
        case "GET":
            await get();
            break;
    }

    async function post() {
        try {

            var user = await CRUD.create(req.body, USER);

            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: RESULT_CODES.CREATED,
                body: user
            };

            return true;

        } catch (error) {

            if (!error.code) {

                context.res = {
                    status: RESULT_CODES.INTERNAL_SERVER_ERROR,
                    body: "An internal error occurred"
                };

            } else {

                context.res = {
                    status: error.code,
                    body: error.message
                };

            }

            return true;
        }
    }

    async function get() {

        try {

            var users = await USER.find().lean();

            context.res = {
                headers: {
                    'Content-Type': 'application/json'
                },
                status: RESULT_CODES.OK,
                body: users
            }

            return true;

        } catch (error) {

            if (!error.code) {

                context.res = {
                    status: RESULT_CODES.INTERNAL_SERVER_ERROR,
                    body: "An internal error occurred"
                };

            } else {

                context.res = {
                    status: error.code,
                    body: error.message
                };

            }

            return true;
        }
    }
};