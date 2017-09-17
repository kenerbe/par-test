var redis = require('redis')
var redisClient = redis.createClient({host : 'localhost', port : 6379})

redisClient.on('ready',function() {
  console.log("Redis is ready - running locally")
})

redisClient.on('error',function() {
  console.log("Error with Redis - running locally")
  process.exit(1)
})

// Write our beer choices to Redis via a hash
//
// { choice1: 'PBR',
//   choice2: 'AlphaKing',
//   choice3: 'SilurianStout'
// }

redisClient.hmset('beer', 'choice1', 'PBR', 'choice2', 'AlphaKing', 'choice3', 'SilurianStout',function(err, reply) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Redis hash returned: ' + reply)
})

// Read the beer hash from Redis
redisClient.hgetall('beer',function(err,reply) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(reply)
})

// Delete the beer hash from Redis
// Read the beer hash from Redis
redisClient.del('beer',function(err,reply) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Redis delete returned: ' + reply)
})

// Write a hash and expire after 10 seconds
redisClient.hmset('beer', 'choice1', 'PBR', 'choice2', 'AlphaKing', 'choice3', 'SilurianStout',function(err, reply) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Redis hash returned: ' + reply)
  redisClient.expire('beer', 10)
  console.log('... will expire in 10sec')
  process.exit(0)
})
