const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"))
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ')) return message.channel.createMessage(':x: | Escriba el prefix que se usará en este servidor.').then(m => setTimeout(() => m.delete(), 6000));

  let newPrefix;
  const embed = new Eris.Embed()
    
    .color(Math.floor(Math.random() * 0xffffff))
  if (args.join(' ').toUpperCase() === "NONE") {
    newPrefix = config.prefix
    message.guild.prefix = newPrefix
    embed.title(':white_check_mark: Prefix borrado.').description('El prefix del servidor ha sido borrado. Ahora se utilizará el prefix por defecto.\nPrefix por defecto: `' + newPrefix + '`')
  } else {
    if (args[0].length > 15) return message.channel.createMessage('El prefijo que introdujo es demasiado largo. Tiene que tener menos de 15 caracteres.').then(m => setTimeout(() => m.delete(), 6000));
    newPrefix = args[0];
    embed.title(':white_check_mark: El prefix ha sido cambiado.').description('El prefix del bot ha sido cambiado en este servidor.\nNuevo Prefix: `' + newPrefix + '`\n\n**NOTA IMPORTANTE:** Recuerda que debes usar el prefix exactamente igual a como lo escribiste, de lo contrario el bot no responderá.\nEjemplo: `' + args.join(' ') + 'help.`')
  };
  message.guild.prefix= newPrefix
  db.set(`guildPrefix_${message.guild.id}`, newPrefix);
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'setprefix',
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Cambia el prefijo de comandos a uno personalizado si no te gusta el original `{prefix}`. Escribe **NONE** para reestablecer al prefijo original.\n**NOTA IMPORTANTE:** Una vez establecido el prefijo personalizado, debes usar el prefijo **exactamente igual** a como lo escribiste, de lo contario {botname} no responderá. En caso de que el prefijo personalizado se haya olvidado, puedes escribir lo siguiente: `@{botname} prefix` y te dará el prefijo actual.',
  usage: '{prefix}setprefix <nuevo prefijo/NONE>',
  example: '{prefix}setprefix c! | {prefix}setprefix NONE\n\n1. *{prefix}setprefix prefix*: Esto establecerá un prefijo personalizado.\n2. *{prefix}setprefix NONE*: Esto reestablecerá el prefix al original `{prefix}`.',
  aliases: ['sprefix', 'sp', 'prefix'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
