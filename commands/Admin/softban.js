const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db')
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let reason = args.join(' ').split(' ').slice(1).join(' ');

  if (!message.member.hasPermission("banMembers") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Bloquear Miembros` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.guild.me.hasPermission("banMembers")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para banear usuarios.\nNecesito tener el permiso `Bloquear Miembros` activado.").then(m => setTimeout(() => m.delete(), 6000))
  
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario válido.').then(m => setTimeout(() => m.delete(), 6000)).catch(console.error);
  if (!reason) return message.channel.createMessage(':x: | Debes escribir la razón del softbaneo.\n**Ejemplo:** {prefix}softban @MathError#6880 Limpieza de flood.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000))
  if (message.content.includes(message.author.id)) return message.channel.createMessage(':x: | No puedes darte softban a ti mismo.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(client.user.id)) return message.channel.createMessage('N-no quiero recibir un softban... por favor :c').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.members.get(user.id).bannable) return message.channel.createMessage(':x: | No puedo softbanear al usuario mencionado. Puede que el usuario tenga un rol superior al mío.').then(m => setTimeout(() => m.delete(), 6000))
  
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  let embed = new Eris.Embed()
    .title(":warning: Usuario softbaneado.")
    .description(`El usuario **${user.tag}** fue softbaneado del servidor.\n\`ID: ${user.id}\``)
    .field("Razón:", `${reason}`)
    .field("Admin/mod responsable:", `${message.author.tag}`)
    .timestamp()
    .color(0xFA3131)
  if (!message.guild.channels.get(o)) message.channel.createMessage({ embed })
  else message.guild.channels.get(o).createMessage({ embed });
  embed = new Eris.Embed()
  .title(":warning: Has sido softbaneado")
  .description('Has sido baneado de **' + message.guild.name + '.**')
  .field("Razón:", `${reason}`)
  .field("Admin/Mod responsable:", `${message.author.username}#${message.author.discriminator}`)
  .timestamp()
  .color(0xFA3131)
user.createMessage({ embed });
  setTimeout(() => message.guild.members.get(user.id).ban(7, reason).catch(error=>message.channel.createMessage(':x: | Surgió un error al intentar banear al usuario.\nEs posible que no tenga los permisos necesarios para expulsar al usuario.')), 1000);
  setTimeout(() => message.guild.unbanMember(user.id).catch(e => console.log(e)), 1000);
};

exports.config = {
  command: 'softban',
  category: 'Comandos ADMIN/MOD',
  permissions: 'Bloquear miembros',
  description: 'Banea y desbanea al usuario para eliminar 7 días de mensajes de todos los canales y expulsarlo. Se debe colocar la razón del baneo para que el comando funcione.',
  usage: '{prefix}softban <@usuario> <razón>',
  example: '{prefix}softban @MathError#6880 Spam.\n\nEste le dará softban a MathError#6880 haciendo que sus mensajes sean eliminados y él expulsado, colocando la razón especificada.',
  aliases: ['sban'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};