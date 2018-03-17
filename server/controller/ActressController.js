// server/controller/ActressController.js

const repository = require('../repository/ActressRepository')
const redis = require('../config/redis')
const promisify = require('util').promisify
const getAsync = promisify(redis.get).bind(redis)
const setAsync = promisify(redis.set).bind(redis)

const ActressController = {
    getAll(request, response, next){
        repository.find({}, (err, data)=>{
            if (err){
                return next(err)
            }
            response.json(data)
        });
    },
    getById(request, response, next){
        let id = request.params.id
        getAsync(`andreluiz:${id}`)
        .then(data =>{
            if(data){
                return JSON.parse(data)
            }
                return repository.findOne({_id: id})
            })
            .then(data=>{
                setAsync(`andreluiz:${id}`, JSON.stringify(data))
                .cath(err => console.log(err))
                response.json(data)
            })
            .cath(next)
    },
    create(request, response, next){
        let body = request.body

        const actress = new repository(body);
        actress.save()
        .then((data)=>{
            response.status(201).json(data)
        })
        .catch(next)
    },
    update(request, response, next){
        let id = request.params.id
        let body = request.body

        repository.update({ _id: id}, body)
        .then(data => response.json(data))
        .catch(next)
    },
    delete(request, response, next){
        let id = request.params.id

        repository.remove({ _id: id})
        .then(data => response.sendStatus(204))
        .catch(next)
    }
}
module.exports = ActressController