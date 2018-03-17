// server/app.js

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const path = require('path')

if (process.env.NODE_ENV !== 'prod'){
    app.use(express.static(path.join(__dirname, '../public')))
}

app.set('view engine', 'html')
//app.set('views', path.join(__dirname, 'views'))

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use((request, response, next)=>{
    console.log('request.url', request.url)
    next()
})
app.use(require('./routes'))

app.use((request, response, next)=>{
    let err = new Error('Tá errado Burro')
    err.status = 404
    next(err)
})
app.use((err, request, response, next)=>{
    if (request.xhr){
        response.json({
            message: err.message
        })
    } else{
        response.status(err.status || 500).send(err.message)
    }
})
module.exports = app