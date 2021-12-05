const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
const warns = new db.table("warns")

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let razon = args.join(' ').split(' ').slice(1).join(' ');

  if (!message.member.hasPermission("kickMembers") && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Expulsar Miembros` activado.').then(m => setTimeout(() => m.delete(), 6000))
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario que tenga advertencias.').then(m => setTimeout(() => m.delete(), 6000))
  let warn = warns.fetch(`${user.id}`) || {warns:0}
  if (warn.warns == 0) return message.channel.createMessage(':x: | El usuario mencionado no tiene advertencias.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  warn.warns--;
  warns.set(`${user.id}`,warn) 
  
  let embed = new Eris.Embed()
    .title('✅ Advertencia removida')
    .color(parseInt('2DE100', 16))
    .field('Se le ha eliminado una advertencia a:', '**' + message.guild.members.get(user.id).tag + '**\n `ID: '+user.id+'`')
    .field('Razón:', razon ? razon : 'Ninguna.')
    .field('Número de Advertencias: ', `${warn.warns}`)
    .footer(warn.warns + '/3')
    .timestamp()
  if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
  else message.guild.channels.get(o).createMessage({ embed });
  
};

exports.config = {
  command: "unwarn",
  category: "Comandos ADMIN/MOD",
  permissions: "Expulsar miembros",
  description: 'Quita 1 advertencia al usuario mencionado. El usuario debe tener advertencias acumuladas para que este comando funcione.',
  usage: '{prefix}unwarn <@usuario>',
  example: '{prefix}unwarn @MathError#6880\n\nEste eliminará 1 advertencia al usuario MathError#6880, asumiendo que éste tenga advertencias.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};