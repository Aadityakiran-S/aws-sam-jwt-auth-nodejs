require('source-map-support/register');
const serverlessExpress = require('@vendia/serverless-express');
const app = require('./express/app.js');
const connectDB = require('./express/db/connect.js');
require('dotenv').config();

let serverlessExpressInstance

async function asyncTask() {
    return new Promise((resolve) => {
        const timeout = setTimeout(async () => {
            await connectDB(process.env.MONGO_URI);
            console.log("Hello from Async Task");
            resolve('connected to database');
        }, 10000)
    })
}

async function setup(event, context) {
    const asyncValue = await asyncTask() //No try catch here? 
    console.log(asyncValue);
    serverlessExpressInstance = serverlessExpress({ app })
    return serverlessExpressInstance(event, context)
}

async function handler(event, context) {
    if (serverlessExpressInstance) return serverlessExpressInstance(event, context)
    const setupVar = await setup(event, context)
    return setupVar;
}

exports.handler = handler
// exports.handler = serverlessExpress({ app })