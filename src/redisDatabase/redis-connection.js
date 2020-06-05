const Redis = require('ioredis');
const config = require('../../config');

const redis = new Redis(config.cache);

redis.config('SET', 'maxmemory', '200mb')
  .then(() => redis.config('SET', 'maxmemory-policy', 'allkeys-lru'));
// .then(() => redis.flushall()) // to flush redis
const addToCache = (key, value) => redis.set(key, JSON.stringify(value));

const retrieveFromCache = (key) => redis.get(key)
  .then(JSON.parse);

module.exports = {
  addToCache,
  retrieveFromCache,
};
