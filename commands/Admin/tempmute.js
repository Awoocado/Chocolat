const Eris = require("eris-additions")(require("eris"));
const timeconvert = require('quick.time');
const moment = require("moment");
require('moment-duration-format');
const db = require('quick.db');
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  const mod = db.fetch(`modRole_${message.guild.id}`);
  const o = db.fetch(`logChannel_${message.guild.id}`);
  let role = message.guild.roles.find(x=>x.name=='Silenciado');
  let razon = args.join(' ').split(' ').slice(2).join(' ');
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes mencionar al usuario, escribir el tiempo que deseas silenciarle y una razón.\n**Ejemplo:** {prefix}tempmute @MathError#6880 10m Usuario molesto.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  let t = args[1];
  if (!t) return message.channel.createMessage(':x: | Debes escribir el tiempo que deseas silenciarle y una razón.\n**Ejemplo:** {prefix}tempmute @MathError#6880 10m Usuario molesto. ("s" para segundos, "m" para minutos, "h" para horas y "d" para días'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  let min = timeconvert(t);
  const converted = moment.duration(min.time).format("D [días], H [horas], m [m¡nutos], s [segundos]");
  let user = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let perms = message.member.hasPermission("manageMessages");

  if (!perms && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.").then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.me.hasPermission("manageRoles") && !message.guild.me.hasPermission("manageChannels"))return message.channel.createMessage(":x: | No tengo los permisos necesarios para cambiar los roles y modificar canales.\nNecesito tener los permisos `Administrar Roles` y `Administrar Canales` activados.").then(m => setTimeout(() => m.delete(), 6000));
  
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario.').then(m => setTimeout(() => m.delete(), 6000))
  if (min.time < 10000 || min.time >= 86400000) return message.channel.createMessage('Debes escribir el tiempo del silencio. El tiempo debe durar de 10 segundos, hasta un máximo de 24 horas.\n**Ejemplo:** {prefix}tempmute @MathError#6880 10m Usuario molesto.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));
  if (message.content.includes(message.author.id)) return message.channel.createMessage(':x: | No puedes silenciarte a ti mismo.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(client.user.id)) return message.channel.createMessage('P-pero yo quiero responder a los comandos de todos... ¿p-por qué me quieres silenciar? :c').then(m => setTimeout(() => m.delete(), 6000))
  if (role && message.guild.members.get(user.id).roles.find(x=>message.guild.roles.get(x).name=='Silenciado')) return message.channel.createMessage(':x: | El usuario ya está silenciado.').then(m => setTimeout(() => m.delete(), 6000))
  
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  if (!role) {
    message.guild.createRole({
      name: "Silenciado",
      color: 0x747474,
      position: (message.guild.me.highestRole.position - 1)
  }).then(role1 => {
     let canales = message.guild.channels;
     role = role1;
     let rol = message.guild.roles.get(role1.id);

     canales.forEach(k => k.editPermission(rol.id, 1024, 2048, "role"));
      message.channel.createMessage("El rol **Silenciado** no fue encontrado. El rol se creó automáticamente por " +client.user.username +" y los canales fueron configurados.").then(m => setTimeout(() => m.delete(), 6000));
      message.guild.members.get(user.id).addRole(role1.id).catch(console.error);
    })  
  }
  
  if (role) message.guild.members.get(user.id).addRole(role.id).catch(() => {return message.channel.createMessage(':x: | Ocurrió un error al tratar de silenciar temporalmente al usuario.').then(m => setTimeout(() => m.delete(), 6000));});
  const embed = new Eris.Embed()
    .title(":mute: Usuario silenciado")
    .description(`El usuario **${user.tag}** fue silenciado temporalmente (${converted}).\n\`ID: ${user.id}\``)
    .field('Razón:', razon ? razon : 'Ninguna.')
    .field("Admin/mod responsable:", `${message.author.tag}`)
    .timestamp()
    .color(0xFFB400)

  if (!message.guild.channels.get(o)) message.channel.createMessage({ embed })
  else message.guild.channels.get(o).createMessage({ embed });

  setTimeout(() => {
    message.guild.members.get(user.id).removeRole(role.id)
    const embed = new Eris.Embed()
      .title(":loud_sound: Usuario no silenciado")
      .description(`El silencio de **${user.tag}** fue retirado.\n\`ID: ${user.id}\``)
      .field('Razón:', `Tiempo Expirado (Tempmute de ${converted})`)
      .field("Admin/mod responsable:", `${client.user.tag}`)
      .timestamp()
      .color(0x42cc25)
    if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
    else message.guild.channels.get(o).createMessage({ embed });
  }, min.time);
};

exports.config = {
  command: "tempmute",
  category: 'Comandos ADMIN/MOD',
  permissions: "Administrar mensajes",
  description: "Silencia al usuario mencionado temporalmente. El tiempo debe estar escrito en inglés: `Días = days, horas = hours, minutos = minutes y segundos = seconds`. El silencio será removido automáticamente por {botname} cuando el tiempo expire.",
  usage: '{prefix}tempmute <@usuario> <tiempo> [razón]',
  example: '{prefix}tempmute @MathError#6880 3h | {prefix}tempmute @MathError#6880 10m Groserías.\n\n1. *{prefix}tempmute @MathError#6880 3h* Este silenciará al usuario MathError#6880 por 3 horas.\n\n2. *{prefix}tempmute @MathError#6880 10m Groserías.* Este silenciará al usuario MathError#6880 durante 10 minutos con la razón "Groserías.".',
  aliases: ['tm', 'tmute'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};
