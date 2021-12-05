const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.channelMentions[0] && args.join(' ').toUpperCase() !== 'NONE') return message.channel.createMessage(':x: | Debes mencionar un canal.\nEjemplo: {prefix}setlogs #mod-logs'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));

  let newChannel;

  if (args.join(' ').toUpperCase() === 'NONE') {
    newChannel = '';
    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal de Logs borrado.')
      .description('El canal de reporte ha sido borrado. Si quieres establecer un nuevo canal de Logs, coloca:\n>`{prefix}setlogs #canal.`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
    return db.delete(`logChannel_${message.guild.id}`);
  } else {
    newChannel = message.channelMentions[0];
  };
  db.set(`logChannel_${message.guild.id}`, newChannel);
  const embed = new Eris.Embed()
    .title(':white_check_mark: Canal de Logs establecido.')
    .description(`El canal de Logs de usuarios ha sido establecido. Los Logs llegarán a ese canal.\n**Canal:** ${message.guild.channels.get(message.channelMentions[0]).mention}`)
    .color(Math.floor(Math.random() * 0xffffff))
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'setlogs',
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece el canal donde {botname} enviará los Logs. Debes mencionar el canal. Escribe **NONE** para reestablecer el canal de Logs. El no tener establecido el canal de logs no afecta los comandos de moderación.',
  usage: '{prefix}setlogs <#canal/NONE>',
  example: '{prefix}setlogs #Logs | {prefix}setlogs NONE\n\n1. *{prefix}setlogs #canal*: Esto establecerá el canal donde las infracciones se enviarán.\n2. *{prefix}setlogs NONE*: Esto reestablecerá el canal de logs.',
  aliases: ['slogs'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};