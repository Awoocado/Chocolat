const Eris = require("eris-additions")(require("eris"))
const config = require('../../config.json')
const { exec } = require('child_process')
const fetch = require('node-fetch')
  util = require('util')

exports.run = async (client, message, args, stats) => {
  let developers = ['192756779573051392', '398658092021055511', '224619540263337984']
  if (!developers.includes(message.author.id)) return message.channel.createMessage(':x: | No tienes acceso a este comando.\nNecesitas ser `Desarrollador de ' + client.user.username + '` para usar este comando.').then(m => setTimeout(() => m.delete(), 6000));
  try {
    var code = args.join(' ')
    if (code == 'gamemode 1') {
      let embed = new Eris.Embed().author(message.author.tag, message.author.avatarURL).description('Tu modo de juego ha cambiado.');
      message.channel.createMessage({embed})
    } else if (code == 'restart') {
      await message.channel.createMessage(':arrows_counterclockwise: Reiniciando los clústeres...')
      return exec(`pm2 restart ${config.botname}`, () => { message.channel.createMessage('Sucedió algo imprevisto.') })
    } else if (code == 'soft-reset') {
      await message.channel.createMessage(':repeat_one: Reiniciando únicamente el clúster presente...')
      return process.exit()
    } else if (code == 'reload') {
      message.channel.createMessage(':arrows_counterclockwise: Recargando comandos...');
      console.log(`Se han recargado los comandos desde la shard: ${message.guild.shard.id+1}`);
      client.reloadCommands();
    } else if (code == 'connections') {
      fetch(`https://discordapp.com/api/v7/gateway/bot`, {
        method: 'GET',
        headers: { Authorization: `Bot ${config.token}` }
      })
        .then(res => {
          if (res.ok) return res.json()
          throw res
        })
        .then(q => message.channel.createMessage('```js\n' + util.inspect(q) + '```'))
    } else {
      var evalued = util.inspect(eval(code))
      //if (typeof evalued !== 'string') evalued = util.inspect(evalued)
      message.channel.createMessage('```js\n' + evalued + '```')
    }
  } catch (err) {
    const embed = new Eris.Embed()
      .title(':bangbang: Error encontrado!')
      .field('Código', '```js\n' + code + '```')
      .field('Error', '```js\n' + err + '```')
      .color(0xd7e447)
    message.channel.createMessage({ embed })
  }
}

exports.config = {
  command: 'eval',
  category: 'Comandos de Desarrollador',
  permissions: 'Desarrollador',
  description: 'Ejecuta y evalúa un código JavaScript.',
  usage: '{prefix}eval <argumentos>',
  example: "{prefix}eval message.channel.createMessage('Hola :D')",
  aliases: ['e', '/', 'system-commando'],
  developerOnly: true,
  allowedToDisable: false,
  visible: false,
  cooldown: 0
}
