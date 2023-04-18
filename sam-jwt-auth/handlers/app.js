let response;
const connectDB = require('./db/connect.js');
require('dotenv').config();

exports.connectToMongoDB = async (event, context) => {
    response = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: `Nothing at the moment`
    };
    try {
        await connectDB(process.env.MONGO_URI);
        response.body = `Successfully connected to MongoDB`;
    } catch (err) {
        console.log(err);
        response.body = JSON.stringify(err);
    }

    return response
};
