require('dotenv').config();

var config = {}

config.endpoint = process.env.DOCUMENTDB_ENDPOINT;
config.primaryKey = process.env.DOCUMENTDB_KEY;

module.exports = config;