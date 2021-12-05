const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let razon = args.join(' ').split(' ').slice(1).join(' ');

  if (!message.member.hasPermission("banMembers") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Bloquear Miembros` activado.').then(m => setTimeout(() => m.delete(), 4000));
  if (!message.guild.me.hasPermission("banMembers")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para banear miembros.\nNecesito tener el permiso `Bloquear Miembros` activado.").then(m => setTimeout(() => m.delete(), 6000));
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario válido.').then(m => setTimeout(() => m.delete(), 6000));
  if (!razon) return message.channel.createMessage(message.author.mention+', :x: | Debes escribir la razón del baneo.\n**Ejemplo:** {prefix}ban @MathError#6880 Publicidad en #general.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(message.author.id)) return message.channel.createMessage(':x: | No puedes darte ban a ti mismo.').then(m => setTimeout(() => m.delete(), 4000));
  if (message.content.includes(client.user.id)) return message.channel.createMessage('O-oye... ¿de verdad me quieres dar ban? :C Y-yo no me quiero ir y no poder regresar...').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.guild.members.get(user.id).bannable) return message.channel.createMessage(':x: | No puedo banear al usuario mencionado. Puede que el usuario tenga un rol superior al mío.').then(m => setTimeout(() => m.delete(), 4000));

  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  let embed = new Eris.Embed()
    .title(":no_entry_sign: Usuario Baneado")
    .description(`El usuario **${user.tag}** fue baneado del servidor.\n\`ID: ${user.id}\``)
    .field("Razón:", `${razon}`)
    .field("Admin/Mod responsable:", `${message.author.username}#${message.author.discriminator}`)
    .timestamp()
    .color(0xFA3131)
  
  if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
  else message.guild.channels.get(o).createMessage({ embed });
  
  embed = new Eris.Embed()
    .title(":no_entry_sign: Has sido baneado")
    .description('Has sido baneado de **' + message.guild.name + '.**')
    .field("Razón:", `${razon}`)
    .field("Admin/Mod responsable:", `${message.author.username}#${message.author.discriminator}`)
    .timestamp()
    .color(0xFA3131)
  user.createMessage({ embed });
  
  setTimeout(() => message.guild.members.get(user.id).ban(0, razon).catch(error=>message.channel.createMessage(':x: | Surgió un error al intentar banear al usuario.\nEs posible que no tenga los permisos necesarios para banear a ese usuario.')), 1000);
}
exports.config = {
  command: "ban",
  category: 'Comandos ADMIN/MOD',
  permissions: 'Bloquear Miembros',
  description: 'Banea del servidor al usuario mencionado. Se debe colocar la razón del baneo para que el comando funcione.',
  usage: '{prefix}ban <@usuario> <razón>',
  example: '{prefix}ban @MathError#6880 Publicidad en #general.\n\nEsto baneará al usuario MathError#6880 del servidor, con la razón especificada.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
}