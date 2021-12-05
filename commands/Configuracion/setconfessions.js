const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.channelMentions[0] && args.join(' ').toUpperCase() !== 'NONE') return message.channel.createMessage(':x: | Debes mencionar un canal.\nEjemplo: {prefix}setconfessions #confesiones'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));

  let newChannel;

  if (args.join(' ').toUpperCase() === 'NONE') {
    newChannel = '';
    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal de confesiones borrado.')
      .description('El canal de confesiones ha sido borrado. Si quieres establecer un nuevo canal de confesiones, coloca:\n>`{prefix}setconfessions #canal.`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
    return db.delete(`confChannel_${message.guild.id}`);
  } else {
    newChannel = message.channelMentions[0];
  };
  db.set(`confChannel_${message.guild.id}`, newChannel);
  const embed = new Eris.Embed()
    .title(':white_check_mark: Canal de confesiones establecido.')
    .description(`El canal de confesiones de usuarios ha sido establecido. Los confesiones llegarán a ese canal.\n**Canal:** ${message.guild.channels.get(message.channelMentions[0]).mention}`)
    .color(Math.floor(Math.random() * 0xffffff))
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'setconfessions',
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece el canal donde {botname} enviará los confesiones. Debes mencionar el canal. Escribe **NONE** para reestablecer el canal de confesiones.',
  usage: '{prefix}setconfessions <#canal/NONE>',
  example: '{prefix}setconfessions #confesiones | {prefix}setconfessions NONE\n\n1. *{prefix}setconfessions #canal*: Esto establecerá el canal mencionado como el canal para recibir las confesiones de los usuarios.\n2. *{prefix}setconfessions NONE*: Esto reestablecerá el canal de confesiones.',
  aliases: ['sconfessions', 'scfs'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};