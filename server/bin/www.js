// server/bin/www.js

const cluster = require('cluster')
const numCpus = require('os').cpus().length
const app = require('../app')

if (cluster.isMaster){
    for (let i=0; i<numCpus; i++){
        cluster.fork()
    }
}else {
app.listen((3000), () =>{
    console.log('app está no ar')
})
}