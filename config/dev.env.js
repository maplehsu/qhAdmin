'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://server.izmqh.com"'
  API_ROOT: '"http://10.98.24.177:7777"'
})