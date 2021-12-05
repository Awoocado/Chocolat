exports.run = async (client, message, args) => {
  message.channel.createMessage(':tools: | Este comando está siendo arreglado. Si desea sugerir algo para el bot, acuda a nuestro servidor del soporte, info: `ch!support`.').then(m => setTimeout(() => m.delete(), 6000));
  /*let sug = args.join(' ');
  if (!args.join(' ')) return message.channel.createMessage(':x: | Escriba la sugerencia que se enviará al Servidor de Soporte.\n**Nota importante:** El mal uso de este comando puede resultar en una penalización.').then(m => setTimeout(() => m.delete(), 6000))

  const embed = {
    "title": 'Nueva sugerencia externa',
    "description": sug,
    "author": {
      "name": message.author.tag,
      "icon_url": message.author.avatarURL
    },
    "footer": {
      "text": 'Sugerencias para Chocolat | Proveniente de: ' + message.guild.name
    },
    "color": 0x06adf0
  }

  const embed2 = {
    "title": 'Log de sugerencia',
    "description": '**Contenido:**\n' + sug,
    "fields": [{
        "name": 'Usuario',
        "value": message.author.tag,
        "inline": true
      },
      {
        "name": 'ID del Usuario',
        "value": message.author.id,
        "inline": true
      },
      {
        "name": 'Servidor',
        "value": message.guild.name,
        "inline": true
      },
      {
        "name": 'ID del Servidor',
        "value": message.guild.id,
        "inline": true
      },
      {
        "name": 'Shard',
        "value": client.shard.id + 1,
        "inline": true
      }
    ],
    "timestamp": Date.now()
  }

  return client.shard.broadcastEval(`
    if(!this.guilds.get('379197913936429056')) {false}
    else{
      this.channels.get('471082915007168532').createMessage({embed:${JSON.stringify({ embed2 })}})
      this.channels.get('664136004835475458').createMessage({embed:${JSON.stringify({ embed })}}).then(c=>c.addReaction('⬆')).then(c=>c.message.addReaction('⬇'))
      true;
    }
  `)
    .then(sentArray => {
      if (!sentArray.includes(true)) return message.channel.createMessage(':x: | Hubo un error al enviar la sugerencia. Intente de nuevo.').then(m => setTimeout(() => m.delete(), 6000))
      else message.channel.createMessage(':white_check_mark: | Su sugerencia ha sido enviada, gracias por su idea. :thumbsup:').then(m => setTimeout(() => m.delete(), 6000))
    }).catch(e => message.channel.createMessage(':x: | Ocurrió un error al intentar enviar la sugerencia.\nEs posible que no tenga los permisos requeridos para realizar esta acción.'));*/
}
exports.config = {
  command: 'botsuggestion',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Envía una sugerencia al Servidor de Soporte utilizando a {botname}. Al momento de enviar una sugerencia, asegúrate de que sea detallada lo más que se pueda para que sea tomada en cuenta. Envíos basura no serán atendidos.\n**Nota importante:** El mal uso de este comando puede resultar en una penalización.',
  usage: '{prefix}botsuggestion',
  example: '{prefix}botsuggestion Quiero sugerir que implementen un Sistema de Niveles. Este sistema consiste en que por cada mensaje, ganas cierta cantidad de EXP, al llegar a X cantidad, subirás un nivel. Esto servirá para ver quién es activo en el servidor.\n\nEsto enviará la sugerencia al canal de sugerencias en el Servidor de Soporte para que la gente pueda votar por él.',
  aliases: ['botsuggest', 'bs'],
  developerOnly: false,
  allowedToDisable: false,
  visible: true,
  cooldown: 10000
};
