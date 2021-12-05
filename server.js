const Sharder = require('eris-sharder').Master
const { isMaster } = require('cluster')
const config = require('./config.json')

const sharder = new Sharder(config.token, '/main.js', {
  stats: false,
  statsInterval: 60 * 5000,
  debug: true,
  //clusters: 1,
  //shards: 2,
  //guildsPerShard: 1100,
  name: 'Chocolat',
  webhooks: {
    shard: {
      id: '',
      token: ''
    },
    cluster: {
      id: '',
      token: ''
    }
  },
  clientOptions: {
    compress: false,
    largeThreshold: 50,
    messageLimit: 10,
    defaultImageFormat: 'png',
    defaultImageSize: 1024,
  }
})

if (isMaster) {

  require('node-fetch')(`https://discordapp.com/api/v7/gateway/bot`, {
    method: 'GET',
    headers: { Authorization: `Bot ${config.token}` }
  })
    .then(res => {
      if (res.ok) return res.json()
      throw res
    })
    .then(console.log)
}
