Exercise: Run Redis locally
===========================

![](https://github.com/kenerbe/par-test/blob/master/src/Redis.png)

To install locally (on Mac), open a terminal and run:
```
    brew install redis
```

To run a Redis server locally (run in a separate terminal window), run:

```
    redis-server
```
You should see something similar to this.
![](https://github.com/kenerbe/par-test/blob/master/src/Redis-server.png)

Use the Redis command line interface to interact with the Redis server.

```
    redis-cli
```
To load and display a hash value called "my_hash" with key value pairs, type:

```
    hmset my_hash key1 value1
    hmset my_hash key2 value2
    hmset my_hash key3 value3
    hgetall my_hash
    hmget my_hash key3
```

Type `quit` to exit the Redis command line interface.  Type `cmd-C` to exit the Redis server.  Follow this [article](https://codequs.com/p/ByrvfsMY/getting-started-node-js-and-redis/) for more details on using Redis locally.

To interact with Redis via Node.js, create a new Node.js project called "redis-test".  We assume you have `node` and `npm` installed - if not, go [here](https://nodejs.org/en/) to get it.

```
    mkdir redis-test
    cd redis-test
    npm init
    npm install --Save redis
```

Create a file called index.js and add the following [code](https://github.com/kenerbe/par-test/blob/master/index.js).  

```js
    var redis = require('redis')
    var redisClient = redis.createClient({host : 'localhost', port : 6379})

    redisClient.on('ready',function() {
      console.log("Redis is ready - running locally")
    })

    redisClient.on('error',function() {
      console.log("Error with Redis - running locally")
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
      }
      console.log('Redis hash returned: ' + reply)
    })

    // Read the beer hash from Redis
    redisClient.hgetall('beer',function(err,reply) {
      if (err) {
        console.log(err)
      }
      console.log(reply)
    })

    // Delete the beer hash from Redis
    // Read the beer hash from Redis
    redisClient.del('beer',function(err,reply) {
      if (err) {
        console.log(err)
      }
      console.log('Redis delete returned: ' + reply)
    })

    // Write a hash and expire after 10 seconds
    redisClient.hmset('beer', 'choice1', 'PBR', 'choice2', 'AlphaKing', 'choice3', 'SilurianStout',function(err, reply) {
      if (err) {
        console.log(err)
      }
      console.log('Redis hash returned: ' + reply)
      redisClient.expire('beer', 10)
      console.log('... will expire in 10sec')
      process.exit(0)
    })
```

In another terminal window, run the Redis server

```
    redis-server
```

To run the Node.js index.js code type:

```
    node index.js
```

If everything work, you should see "Redis is ready - running locally".

