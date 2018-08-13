'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://server.izmqh.com"'
  API_ROOT: '"http://192.168.1.116:7777"'
})