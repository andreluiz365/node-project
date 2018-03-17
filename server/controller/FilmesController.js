// server/controller/FilmesController.js

const repository = require('../repository/FilmesRepository')

const FilmesController = {
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

        repository.findOne({ _id: id}, (err, data) =>{
            response.json(data)
        })
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
module.exports = FilmesController