
const assert = require('chai').expect;
const api = require('../config/test.config')

const endpoint = '/';

const testCase = {
    positive: 'index api',
    negative: 'not found url'
}

describe('Index of API', () => {
    it(`@GET ${testCase.positive}`, async () => {
        const response = await api.get(endpoint);
        assert(response.status).to.equal(200);
    }) 
});