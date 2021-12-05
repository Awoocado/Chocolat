const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config =require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.channelMentions[0] && args.join(' ').toUpperCase() !== 'NONE') return message.channel.createMessage(':x: | Debes mencionar un canal.\nEjemplo: {prefix}setsuggestions #sugerencias'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));

  let newChannel;

  if (args.join(' ').toUpperCase() === 'NONE') {
    newChannel = '';
    db.set(`suggestChannel_${message.guild.id}`, newChannel);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal de Sugerencias borrado.')
      .description('El canal de sugerencias ha sido borrado. Si quieres asignar uno nuevo, utiliza:\n>`{prefix}setsuggestions #canal-nuevo`.'.replace(/{prefix}/gi, require('../../config.json').prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    return message.channel.createMessage({ embed });
  } else {
    newChannel = message.channelMentions[0];
    db.set(`suggestChannel_${message.guild.id}`, newChannel);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal de Sugerencias establecido.')
      .description(`El canal ${message.guild.channels.get(message.channelMentions[0]).mention} ha sido establecido como canal de Sugerencias. Los usuarios podrán mandar sus sugerencias al canal establecido usando \`{prefix}suggest <Sugerencia>\``.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  };
};

exports.config = {
  command: 'setsuggestions',
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece el canal donde {botname} enviará las sugerencias. Debes mencionar el canal. Escribe **NONE** para reestablecer el canal de sugerencias. No confundir con Enviar Sugerencias para el Bot, estas sugerencias son para el propio servidor donde el canal fue establecido.',
  usage: '{prefix}setsuggestions <#canal/NONE>',
  example: '{prefix}setsuggestions #sugerencias | {prefix}setsuggestions NONE\n\n1. *{prefix}setsuggestions #canal*: Esto establecerá el canal donde las sugerencias de los usuarios llegarán.\n2. *{prefix}setsuggestions NONE*: Esto reestablecerá el canal de sugerencias.',
  aliases: ['ssgg', 'ssuggestions'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};