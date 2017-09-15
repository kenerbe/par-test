var redis = require('redis');
var redisClient = redis.createClient({host : 'localhost', port : 6379});

redisClient.on('ready',function() {
 console.log("Redis is ready - running locally");
});

redisClient.on('error',function() {
 console.log("Error with Redis - running locally");
});
