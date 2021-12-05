const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  const content = message.content.split(' ').slice(2);
  const args2 = content.join(' ');
  let perms = message.member.hasPermission("manageNicknames");
  let miembro = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  
  if (!perms && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Apodos` activado.').then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.me.hasPermission("manageNicknames")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para cambiar apodos.\nNecesito tener el permiso `Administrar Apodos` activado.").then(m => setTimeout(() => m.delete(), 6000))
  
  if (!miembro) return message.channel.createMessage(':x: | Debes mencionar a un usuario.').then(m => setTimeout(() => m.delete(), 6000)).catch(console.error);
  if (!args2) return message.channel.createMessage(":x: | Debes escribir el nuevo apodo para el usuario.").then(m => setTimeout(() => m.delete(), 6000))
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();

  message.guild.members.get(miembro.id).edit({nick:`${args2}`}).then(m => {
    const embed = new Eris.Embed()
      .title(':pencil2: Nickname cambiado.')
      .description(`El nickname de **${miembro.tag}** fue cambiado a **${args2}**\n\`ID: ${miembro.id}\``)
      .field('Admin/mod responsable', `${message.author.tag}`)
      .timestamp()
      .color(Math.floor(Math.random() * 0xffffff))
    
    if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
    else message.guild.channels.get(o).createMessage({ embed })
  }).catch(e=>message.channel.createMessage('Ocurrió un error al intentar cambiar el nickname.\nEs posible que no tenga los permisos suficientes para asignarle otro apodo al usuario.').then(m => setTimeout(() => m.delete(), 6000)));
};

exports.config = {
  command: "nickname",
  category: 'Comandos ADMIN/MOD',
  permissions: 'Administrar Apodos.',
  description: 'Cámbiale el apodo al usuario mencionado.',
  usage: '{prefix}nickname <@usuario> <Nuevo apodo>',
  example: '{prefix}nickname @MathError#6880 ErrorMath\n\nEste cambiará el apodo de **MathError#6880** a **ErrorMath**.',
  aliases: ['name', 'nick'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};