// test/main.test.js

const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')

describe('main tests', () =>{
    it('GET / should render home', () =>{
        return request
        .get ('/')
        .then(result => {
            assert.equal(200, result.status);
        })
    })

    it('GET /not-found should responds 404', (done) =>{
        request
        .get('/not-found')
        .end((err, result) =>{
            assert.equal(404, result.status)
            done()
        })
    })
})