const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.channelMentions[0] && args.join(' ').toUpperCase() !== 'NONE') return message.channel.createMessage(':x: | Debes mencionar un canal.\nEjemplo: {prefix}setchannel #bienvenida-depedida'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));

  let newChannel;

  if (args.join(' ').toUpperCase() === 'NONE') {
    newChannel = '';
    db.set(`messageChannel_${message.guild.id}`, newChannel);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal de bienvenida/despedida borrado.')
      .description('Se ha borrado el canal donde se enviaban los mensajes de bienvenida y despedida. Si quieres establecerlo nuevamente, coloca:\n>`{prefix}setchannel #canal.`'.replace(/{prefix}/gi, config.prefix))
      .timestamp()
      .color(Math.floor(Math.random() * 0xffffff))
    return message.channel.createMessage({ embed });
  } else {
    newChannel = message.channelMentions[0];
  };
  db.set(`messageChannel_${message.guild.id}`, newChannel);
  const embed = new Eris.Embed()
    .title(':white_check_mark: Canal de bienvenida/despedida establecido.')
    .description(`Se ha establecido el canal donde se enviarán los mensajes de bienvenida y despedida.\n**Canal:** ${message.guild.channels.get(message.channelMentions[0]).mention}`)
    .timestamp()
    .color(Math.floor(Math.random() * 0xffffff))
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'setchannel',
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece el canal donde {botname} enviará el mensaje de bienvenida y/o despedida. Debes mencionar el canal. Escribe **NONE** para reestablecer el canal de bienvenida/despedida.',
  usage: '{prefix}setchannel <#canal/NONE>',
  example: '{prefix}setchannel #bienvenida-depedida | {prefix}setchannel NONE\n\n1. *{prefix}setchannel #canal*: Esto establecerá el canal mencionado como canal para enviar los mensajes de Bienvenida/Despedida.\n2. *{prefix}setchannel NONE*: Esto reestablecerá el canal de bienvenida/despedida.',
  aliases: ['sch', 'schannel'],
  developerOnly: false,
  allowenToDisable: true,
  visible: true,
  cooldown: 2000
};