const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes escribir un mensaje.\nEjemplo: {prefix}setwelcome ¡Bienvenido al servidor **{server}**, **{user}**!'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));

  let newMessage;

  if (args.join(' ').toUpperCase() === 'NONE') {
    newMessage = '';
    db.set(`joinMessage_${message.guild.id}`, newMessage);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Mensaje de bienvenida borrado.')
      .description('El mensaje de bienvenida ha sido borrado. Si quieres establecer uno nuevo, coloca:\n>`{prefix}setwelcome <Mensaje>`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    return message.channel.createMessage({ embed });
  } else {
    newMessage = args.join(' ').trim();
    if(newMessage.length > 500) return message.channel.createMessage('Debe hacer más corta la bienvenida. (Menos de 500 caracteres)').then(m => setTimeout(() => m.delete(), 6000));
    db.set(`joinMessage_${message.guild.id}`, newMessage);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Mensaje de bienvenida establecido.')
      .description('Se ha establecido el mensaje de bienvenida del servidor.\n**Mensaje:** *' + args.join(' ').trim() + '*')
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  };
};

exports.config = {
  command: "setwelcome",
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece el mensaje que {botname} enviará cuando un usuario se una al servidor. Escribe **NONE** para reestablecer el mensaje de bienvenida. Para que este comando funcione, el canal de bienvenida/despedida debe estar establecido.\nAcá una lista de cosas que puedes incluir:\n1.- **{user}** Menciona al usuario que llegó.\n2.- **{usern}** Coloca el nombre y tag en texto simple, sin mención.\n3.- **{userid}** Coloca el ID del usuario.\n4.- **{server}** Coloca el nombre del servidor.\n5.- **{members}** Coloca la cantidad de miembros totales.',
  usage: '{prefix}setwelcome <mensaje/NONE>',
  example: '{prefix}setwelcome ¡Bienvenid@ al servidor **{server}**, {user} . Espero y la pases bien dentro de nuestro servidor. Actualmente somos: **{members}** miembros. | {prefix}setwelcome NONE\n\n1. *{prefix}setwelcome mensaje*: Esto establecerá el mensaje el cual enviará cuando un usuario se una al servidor.\n2. *{prefix}setwelcome NONE*: Esto reestablecerá el mensaje de bienvenida.',
  aliases: ['swelcome', 'sw'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
