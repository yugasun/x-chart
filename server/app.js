
const Koa = require('koa')
const cors = require('@koa/cors')
const app = new Koa()
const router = require('./router')
const port = 3001

app
  .use(cors({
    credentials: true,
    origin: '*'
  }))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(port)

console.log(`Mock server is start on: http://localhost:${port}`)
