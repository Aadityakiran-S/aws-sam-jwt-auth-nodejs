const serverlessExpress = require('@vendia/serverless-express')
const app = require('./express/app');

exports.handler = serverlessExpress({ app })