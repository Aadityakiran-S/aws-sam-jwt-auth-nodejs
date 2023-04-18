let response;
const connectDB = require('./db/connect.js');
require('dotenv').config();

exports.connectToMongoDB = async (event, context) => {
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'Successfully connected to DB',
        })
    }
    try {
        await connectDB(process.env.MONGO_URI);
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
