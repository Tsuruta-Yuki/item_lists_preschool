const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const knexConfig = require('./knexfile');
const knex = require('knex');

const nodeEnv = process.env.NODE_ENV;
console.log('💀 ~ nodeEnv:', nodeEnv);
module.exports = knex(knexConfig[nodeEnv]);
