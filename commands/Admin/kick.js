const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let args2 = args.join(' ');
  let razon = args2.split(' ').slice(1).join(' ');


  if (!message.member.hasPermission("kickMembers") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Expulsar Miembros` activado.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.me.hasPermission("kickMembers")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para expulsar usuarios.\nNecesito tener el permiso `Expulsar Miembros` activado.").then(m => setTimeout(() => m.delete(), 6000))
  
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario válido.').then(m => setTimeout(() => m.delete(), 6000))
  if (!razon) return message.channel.createMessage(':x: | Debes escribir la razón de la expulsión.\n**Ejemplo:** {prefix}kick @MathError#6880 Nickname inapropiado.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 8000))
  if (message.content.includes(message.author.id)) return message.channel.createMessage(':x: | No puedes expulsarte a ti mismo.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(client.user.id)) return message.channel.createMessage('N-no me expulses... por favor :c A mí me gusta estar aquí...').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.members.get(user.id).kickable) return message.channel.createMessage(':x: | No puedo expulsar al usuario mencionado. Puede que el usuario tenga un rol superior al mío.').then(m => setTimeout(() => m.delete(), 6000))

  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  let embed = new Eris.Embed()
    .title(":warning: Usuario Expulsado")
    .description(`El usuario **${user.tag}** fue expulsado del servidor.\n\`ID: ${user.id}\``)
    .field("Razón:", `${razon}`)
    .field("Admin/Mod responsable:", `${message.author.username}#${message.author.discriminator}`)
    .timestamp()
    .color(0xECD132)
  
  if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
  else message.guild.channels.get(o).createMessage({ embed });

  embed = new Eris.Embed()
    .title(":warning: Has sido expulsado")
    .description('Has sido expulsado de **' + message.guild.name + '**')
    .field("Razón:", `${razon}`)
    .field("Admin/Mod responsable:", `${message.author.username}#${message.author.discriminator}`)
    .timestamp()
    .color(0xECD132)
  user.createMessage({ embed });

  setTimeout(() => message.guild.members.get(user.id).kick(razon).catch(e => message.channel.createMessage(':x: | Surgió un error al intentar expulsar al usuario.\nEs posible que no tenga los permisos suficientes para expulsar a ese usuario.')), 1000);
}

exports.config = {
  command: 'kick',
  category: 'Comandos ADMIN/MOD',
  permissions: 'Expulsar miembros',
  description: 'Expulsa al usuario mencionado del servidor. Se debe colocar la razón de la expulsión para que el comando funcione.',
  usage: '{prefix}kick <@usuario> <razón>',
  example: '{prefix}kick @MathError#6880 Nickname inapropiado.\n\nEsto expulsará a MathError#6880 del servidor, con la razón especificada.',
  aliases: ['expel'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
}