const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir un mensaje.\nEjemplo: {prefix}setleave ¡Hasta pronto, **{user}**!'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));

  let newMessage;

  if (args.join(' ').toUpperCase() === 'NONE') {
    newMessage = '';
    db.set(`leaveMessage_${message.guild.id}`, newMessage);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Mensaje de despedida borrado.')
      .description('El mensaje de despedida fue borrado. Si quieres establecer uno nuevo, coloca:\n>`{prefix}setleave Mensaje.`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    return message.channel.createMessage({ embed });
  } else {
    newMessage = args.join(' ').trim();
    if(newMessage.length > 300) return message.channel.createMessage('Debe hacer más corta la despedida. (Menos de 300 caracteres)').then(m => setTimeout(() => m.delete(), 6000));
    db.set(`leaveMessage_${message.guild.id}`, newMessage);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Mensaje de despedida establecido.')
      .description('Se ha establecido el mensaje de despedida del servidor.\n**Mensaje:** *' + args.join(' ').trim() + '*')
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  };
};

exports.config = {
  command: "setleave",
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece el mensaje de despedida que {botname} enviará cuando un miembro abandone el servidor. Escribe **NONE** para reestablecer el mensaje de despedida. Para que este comando funcione, el canal de bienvenida/despedida debe estar establecido.\nAcá una lista de cosas que puedes incluir:\n1.- **{user}** Coloca el nombre y tag del usuario que se fue..\n2.- **{userid}** Coloca el ID del usuario.\n3.- **{server}** Coloca el nombre del servidor.\n4.- **{members}** Coloca la cantidad de miembros totales.',
  usage: '{prefix}setleave <mensaje/NONE>',
  example: '{prefix}setleave ¡Es una lástima que hayas abandonado **{server}**, **{user}**!... Ahora somos **{members}** miembros. | {prefix}setleave NONE\n\n1. *{prefix}setleave mensaje*: Esto establecerá el mensaje del ejemplo como mensaje que se enviará cada vez que un usuario abandone el servidor.\n2. *{prefix}setleave NONE*: Esto reestablecerá el mensaje de despedida.',
  aliases: ['sleave', 'slv'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};