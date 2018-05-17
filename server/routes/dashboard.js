
const Mock = require('mockjs')
const Random = Mock.Random
const Sleep = require('../utils').Sleep

module.exports = (router) => {
  // dashboard
  router.get('/api/dashboard', async (ctx, next) => {
    await Sleep(0.5)
    ctx.body = require('../json/dashboard.json')
  })


  // 通用图形接口
  router.get('/api/chart_data', async (ctx, next) => {
    await Sleep(0.5)
    let chartType = ctx.query.chart_type || 'x-line'

    ctx.body = require(`../json/${chartType}.json`)
  })
}
