const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://127.0.0.1:2048' }))
  // app.use(proxy('/api', { target: 'http://192.168.225.128:2048' }))
}
