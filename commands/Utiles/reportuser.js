const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let channel;
  const u = db.fetch(`ruChannel_${message.guild.id}`);
  let user = message.mentions[0] || message.guild.members.get(args[0]);
  let reportText = args.slice(1).join(' ');

  if (!message.guild.channels.get(u)) return message.channel.createMessage(':x: | El canal de reportes no está establecido.').then(m => setTimeout(() => m.delete(), 6000));
  else channel = message.guild.channels.get(u);
  if (!user) return message.channel.createMessage(':x: | Debes mencionar al usuario o que quieres reportar. Aunque también puedes hacerlo mediante la ID.').then(m => setTimeout(() => m.delete(), 6000));
  if (!reportText) return message.channel.createMessage(':x: | Debes escribir una razón para el reporte.').then(m => setTimeout(() => m.delete(), 6000));

  const embed = new Eris.Embed()
  .author(message.author.tag, message.author.avatarURL)
  .title(':warning: Reporte de usuario.')
  .description('<@' + user.id + '> ha sido reportado.')
  .field('Datos del reportado', `${user.tag} (${user.id})`, true)
  .field('Datos del reportero', `${message.author.tag} (${message.author.id})`, true)
  .field('Contenido del reporte', reportText)
  .color(0xECD132)
  .thumbnail(user.avatarURL)
  .timestamp();
  channel.createMessage({ embed });
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  message.channel.createMessage(':white_check_mark: | Se ha enviado tu reporte al staff del servidor.').then(m => setTimeout(() => m.delete(), 4000));
};

exports.config = {
  command: 'reportuser',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Reporta a un usuario del servidor. Antes de reportar, el canal de reportes debe estar establecido. Si eres el Administrador, ejecuta el comando `{prefix}setreports #canal` para establecer el canal. Preferiblemente el canal debería ser privado.',
  usage: '{prefix}reportuser <@usuario>/<id> <argumentos>',
  example: '{prefix}reportuser @MathErroR#6880 Este usuario ha estado haciendo spam.\n\nEsto enviará al canal establecido el reporte.',
  aliases: ['report'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};