const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let perms = message.member.hasPermission("manageMessages");
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let args2 = args.join(' ');
  var mensaje = args2.split(' ').slice(1).join(' ');

  if (!perms && !message.member.roles.find(x => x.name == mod)) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.").then(m => setTimeout(() => m.delete(), 6000));
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario, luego especificar el mensaje a enviar.').then(m => setTimeout(() => m.delete(), 6000));
  if (!mensaje) return message.channel.createMessage(":x: | Debes escribir el mensaje a enviar.").then(m => setTimeout(() => m.delete(), 6000));
  if (user.bot) return message.channel.createMessage(":x: | No puedes enviar mensajes a otros bots.").then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(message.author.id)) return message.channel.createMessage(':x: | No puedes enviarte mensajes a ti mismo.').then(m => setTimeout(() => m.delete(), 6000));

  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  let embed = new Eris.Embed()
    .title(`Mensaje del servidor ${message.guild.name}.`)
    .description(mensaje)
    .color(0xFF2E00)
    .footer(`Mensaje enviado por el Admin/Mod: ${message.author.tag}`)
    .timestamp()
  try {
    user.createMessage({embed})
    embed = new Eris.Embed()
      .title(":white_check_mark: ¡Se ha enviado el mensaje!")
      .description(`Un mensaje fue enviado a los Mensajes Directos de **${user.tag}**.`)
      .timestamp()
      .color(Math.floor(Math.random() * 0xffffff))
      .field("Contenido del mensaje", `${mensaje}`)
    message.channel.createMessage({ embed });
} catch {
  message.channel.createMessage(":x: | No pude enviarle mensaje al usuario mencionado, es posible que me tenga **bloqueado** o haya desactivado la opción de **recibir mensajes privados de desconocidos**.").then(m => setTimeout(() => m.delete(), 6000));
}
};

exports.config = {
  command: 'sdm',
  category: 'Comandos ADMIN/MOD',
  permissions: "Administrar mensajes",
  description: 'Envía un mensaje privado usando a {botname} al usuario mencionado. Asegúrate que el usuario esté en el servidor y pueda recibir mensajes privados.',
  usage: '{prefix}sdm <@usuario> <mensaje>',
  example: '{prefix}sdm @MathError#6880 Atención por favor.\n\nEste le enviará el mensaje "Atención por favor." al privado del usuario MathError#6880',
  aliases: ['tell'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};