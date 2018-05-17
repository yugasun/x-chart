const KoaRouter = require('koa-router')
const router = new KoaRouter()

router.get('/', async (ctx, next) => {
  ctx.body = {
    version: '1.0.0',
    name: 'Mock server'
  }
})

require('./routes')(router)

module.exports = router
