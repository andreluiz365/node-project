//routes/index.js

const router = require('express').Router()
const repository = require('../repository/ActressRepository')

router.get('/', (request, response, next) => {
    response.send('Olá')
    })

router.get('/bootstrap', (request, response, next) => {
    let query = request.query;
    let find = {}
    if (query.name){
        find.name = RegExp(query.name, 'i')
    }
    if (query.age){
        find.age = query
    }

    repository.find()
    .then(result =>{
        let data = {
            title: 'vim de longe parça',
            items: result
        }
        console.log(data)
    response.render('bt', data)
        })
        .catch(next)
    })
router.get('/', (request, response, next) =>{
    response.send('ola')
})

router.use('/actresses', require('./actress'))
router.use('/filmes', require('./filmes'))

    module.exports = router