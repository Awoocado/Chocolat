const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
const warns = new db.table("warns")

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  
  if (!message.member.hasPermission("kickMembers") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Expulsar Miembros` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!message.guild.me.hasPermission("kickMembers")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para advertir usuarios.\nNecesito tener el permiso `Expulsar Miembros` activado.").then(m => setTimeout(() => m.delete(), 6000));
  if(!args[0]) return message.channel.createMessage(":x: | Debes mencionar a un usuario").then(m => setTimeout(() => m.delete(), 6000));
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario válido.').then(m => setTimeout(() => m.delete(), 6000));
  let warn = warns.fetch(`${user.id}`) || {warns:0}
  let reason = message.content.split(' ').slice(2).join(' ');
  if (!reason) return message.channel.createMessage(':x: | Debes escribir la razón de la advertencia.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(message.author.id)) return message.channel.createMessage(':x: | No puedes advertirte a ti mismo.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(client.user.id)) return message.channel.createMessage('¿Y-y.. ahora qué hice para que me llames la atención? :C').then(m => setTimeout(() => m.delete(), 6000))
  if (message.member.highestRole.position<=message.guild.members.get(user.id).highestRole.position) return message.channel.createMessage(":x: | No puedes warnear a alguien superior o igual a ti.").then(m => setTimeout(() => m.delete(), 6000))
  if (message.guild.me.highestRole.position<=message.guild.members.get(user.id).highestRole.position) return message.channel.createMessage(":x: | No puedo warnear a esa persona, tiene un rol igual o superior al mio.").then(m => setTimeout(() => m.delete(), 6000))

  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  warn.warns++;
  warns.set(`${user.id}`,warn)

  let embed = new Eris.Embed()
    .title(':warning: ¡Has sido advertido!')
    .description('Has recibido una advertencia proveniente de **' + message.guild.name + '**. Si llegas a un total de 3 advertencias, serás expulsado.')
    .field('Razón', `${reason}`)
    .field('Admin/mod responsable', `${message.author.tag}`)
    .color(0xecd412)
    .footer(warn.warns + '/3')
    .timestamp()
  user.createMessage({embed});
  
  embed = new Eris.Embed()
    .title(':warning: Usuario Advertido.')
    .description('El usuario **' + message.guild.members.get(user.id).tag + '** ha sido advertido.\n `ID: '+user.id+'`')
    .field('Número de Advertencias:', '' + warn.warns + '')
    .field('Razón', `${reason}`)
    .field('Admin/mod responsable', `${message.author.tag}`)
    .color(0xecd412)
    .footer(warn.warns + '/3')
    .timestamp()
  if (!message.guild.channels.get(o)) message.channel.createMessage({embed});
  else message.guild.channels.get(o).createMessage({embed});

  if (warn.warns >= 3) {
    embed = new Eris.Embed()
      .title(':warning: Has sido expulsado.')
      .description('Has sido expulsado de **' + message.guild.name + '.**')
      .field('Razón', `Has alcanzado las 3 advertencias.`)
      .field('Admin/mod responsable', `${message.author.tag}`)
      .color(0xecd412)
      .footer(warn.warns + '/3')
      .timestamp()
      message.guild.members.get(user.id).createMessage({embed});
    
    embed = new Eris.Embed()
      .title(":warning: Usuario Expulsado.")
      .description(`El usuario **${message.guild.members.get(user.id).tag}** fue expulsado del servidor.\n**ID:** ${user.id}`)
      .field("Razón:", `El usuario alcanzó las 3 advertencias.`)
      .field("Admin/mod responsable:", `${message.author.tag}`)
      .timestamp()
      .color(0xECD132)
    if (!message.guild.channels.get(o)) message.channel.createMessage({embed});
    else message.guild.channels.get(o).createMessage({embed});
    
    setTimeout(() => message.guild.members.get(user.id).kick('El usuario alcanzó las 3 advertencias.'), 1000);

    warn.warns=0
    warns.set(`${user.id}`,warn)
  };
};

exports.config = {
  command: "warn",
  category: 'Comandos ADMIN/MOD',
  permissions: 'Expulsar miembros',
  description: "Advierte al usuario mencionado. Cuando el usuario llegue a 3 advertencias, será expulsado automáticamente por {botname}. Colocar la razón de las advertencias es obligatorio.",
  usage: '{prefix}warn <@Usuario> <razón>',
  example: '{prefix}warn @MathError#6880 Usa los canales del servidor correctamente.\n\nEste advertirá a MathError#6880, sumándole 1 advertencia a su historial. Si el usuario llega a 3, será expulsado por {botname}.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};