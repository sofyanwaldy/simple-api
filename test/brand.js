const assert = require('chai').expect;
const api = require('../config/test.config')

const endpoint = '/brands';

const testCase = {
    positive: {
        list: 'List Brand response data should be array',
        detail: 'find brand by ID response data should have attribute [name, logo, banner]'
    }
};

describe('List of brands', () => {
    it(`@GET ${testCase.positive.list}`, async () => {
        const response = await api.get(endpoint)
        const { status, message, data } = response.body;
        assert(status).to.equal(200);
        assert(message).to.equal("Ok");
        assert(data).to.be.an('array');
    })
})

describe('Retrieve brand by ID', () => {
    it(`@GET ${testCase.positive.detail}`, async () => {
        const response = await api.get(endpoint + '/1')
        const { status, message, data } = response.body;
        assert(status).to.equal(200);
        assert(message).to.equal("Ok");
        assert(data).to.have.property('name');
        assert(data).to.have.property('logo');
        assert(data).to.have.property('banner');
    })
})

// TODO
// test CRUD brand, outlets, products