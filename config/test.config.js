const supertest = require('supertest');
require('dotenv').config();

const api = supertest(process.env.BASE_URL);

module.exports = api