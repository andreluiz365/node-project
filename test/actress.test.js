// test/actress.test.js

const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')
const repository = require('../server/repository/ActressRepository')

describe('actress crud', () => {
    let id;
    before(() =>{
        let actress = new repository({name: 'Silvia'})
        return actress.save()
        .then(result =>{
            id = result._id
        })
    })
    after(() =>{
        return repository.remove({})
    })

    it ('GET /actresses', function() {
        //this.timeout(5000)
        return request.get('/actresses')
        .then(result =>{
            assert.ok(result.body.length == 1)
            assert.equal(200, result.status)
            assert.ok(result.body[0]._id)
        })
    })

    it('Should get a actress by her id', () =>{
            return request.get(`/actresses/${id}`)
            .then(result =>{
                assert.equal(200, result.status)
                assert.equal('Silvia', result.body.name)
            })
        })
    it ('POST /actresses', () =>{
        const actress = {
            name: 'Xuxa',
            age: '70'
        }
        return request.post('/actresses')
        .send(actress)
        .then(result =>{
            assert.equal(201, result.status)
            assert.equal('Xuxa', result.body.name)
        })

    })
    it ('PUT /actresses/:id', () =>{
        const age = Math.ceil(Math.random() * 20) + 18
        const update = {age}
        return request.put(`/actresses/${id}`)
        .send(update)
        .then(result =>{
            assert.equal(200, result.status)
            return repository.findOne({_id:id})
        })
        .then(data =>{
            console.log('==>',data)
            assert.equal(age, data.age)
        })
    })
    it ('DELETE /actresses', () =>{

    })
})