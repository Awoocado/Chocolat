const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  const o = db.fetch(`logChannel_${message.guild.id}`);
  const mod = db.fetch(`modRole_${message.guild.id}`);
  let miembro = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let role = message.guild.roles.find(x=>x.name=="Silenciado");
  let perms = message.member.hasPermission("manageMessages");
  let razon = args.join(' ').split(' ').slice(1).join(' ');

  if (!perms && !message.member.roles.find(x=>message.guild.roles.get(x).id==mod)) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Mensajes` activado.").then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.me.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para cambiar roles.\nNecesito tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
  
  if (!miembro) return message.channel.createMessage(":x: | Debes mencionar a un usuario que esté silenciado.").then(m => setTimeout(() => m.delete(), 6000));
  if (!role) return message.channel.createMessage(':x: | El rol **Silenciado** no fue encontrado. Puedes usar **{prefix}mute** create para crear el rol.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.members.get(miembro.id).roles.find(x=>message.guild.roles.get(x).name=='Silenciado')) return message.channel.createMessage(":x: | El usuario mencionado no está silenciado.").then(m => setTimeout(() => m.delete(), 6000));
  
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  message.guild.members.get(miembro.id).removeRole(role.id).catch(console.error);
  const embed = new Eris.Embed()
    .title(":loud_sound: Usuario no silenciado")
    .description(`El silencio de **${miembro.tag}** fue retirado.\n\`ID: ${miembro.id}\``)
    .field('Razón:', razon ? razon : "Ninguna.")
    .field("Admin/mod responsable:", `${message.author.tag}`)
    .timestamp()
    .color(0x42cc25)
  if (!message.guild.channels.get(o)) message.channel.createMessage({ embed });
  else message.guild.channels.get(o).createMessage({ embed });
};

exports.config = {
  command: "unmute",
  category: 'Comandos ADMIN/MOD',
  permissions: 'Administrar Mensajes',
  description: 'Quita el silencio del usuario silenciado. La razón es opcional.',
  usage: '{prefix}unmute <@usuario silenciado> [razón]',
  example: '{prefix}unmute @MathError#6880 | {prefix}unmute @MathError#6880 Apeló.\n\n1. *{prefix}*unmute @usuario*: Este quitará el silencio al usuario mencionado, sin razón.\n2. *{prefix}unmute @usuario razón*: Este quitará el silencio al usuario mencionado, con la razón especificada.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};