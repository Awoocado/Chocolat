const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.channelMentions[0] && args.join(' ').toUpperCase() !== 'NONE') return message.channel.createMessage(':x: | Debes mencionar un canal.\nEjemplo: {prefix}setreports #reportes'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));

  let newChannel;

  if (args.join(' ').toUpperCase() === 'NONE') {
    newChannel = '';
    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal de reportes borrado.')
      .description('El canal de reporte ha sido borrado. Si quieres establecer un nuevo canal de reportes, coloca:\n>`{prefix}setreports #canal.`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
    return db.delete(`ruChannel_${message.guild.id}`);
  } else {
    newChannel = message.channelMentions[0];
  };
  db.set(`ruChannel_${message.guild.id}`, newChannel);
  const embed = new Eris.Embed()
    .title(':white_check_mark: Canal de reportes establecido.')
    .description(`El canal de reportes de usuarios ha sido establecido. Los reportes llegarán a ese canal.\n**Canal:** ${message.guild.channels.get(message.channelMentions[0]).mention}`)
    .color(Math.floor(Math.random() * 0xffffff))
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'setreports',
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece el canal donde {botname} enviará los reportes. Debes mencionar el canal. Escribe **NONE** para reestablecer el Canal de Reportes. Se recomienda establecer un canal que solo el staff del servidor pueda ver.',
  usage: '{prefix}setreports <#canal/NONE>',
  example: '{prefix}setreports #reportes | {prefix}setreports NONE\n\n1. *{prefix}setreports #canal*: Esto establecerá el canal mencionado como el canal de envío de reportes de usuarios.\n2. *{prefix}setreports NONE*: Esto reestablecerá el canal de reportes.',
  aliases: ['sr', 'sreports'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};