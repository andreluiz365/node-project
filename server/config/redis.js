// server/config/redis.js

const redis = require('redis');
const client = redis.createClient({
    host: '10.0.1.73',
    port: 6379
})
client.on('error', (err) =>{
    console.log(err)
})

module.exports = client