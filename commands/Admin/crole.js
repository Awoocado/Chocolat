const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {

  var color = Math.floor(Math.random() * 0xffffff);

  if (!message.member.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
  if (!message.guild.me.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para crear roles.\nNecesito tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
  
  if (!args.join(' ')) return message.channel.createMessage(':x: | Debes colocar el nombre del rol a crear.').then(m => setTimeout(() => m.delete(), 4000))
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  
  message.guild.createRole({
      name: args.join(' '),
      color: color
  }).then(role => {
    const embed = new Eris.Embed()
      .title(":gear: Nuevo rol creado")
      .description(`El rol **${role.mention}** ha sido creado.`)
      .color(0x00AE86)
    message.channel.createMessage({ embed })
  });

};

exports.config = {
  command: "crole",
  category: 'Comandos ADMIN/MOD',
  permissions: "Administrar Roles",
  description: "Crea un rol con permisos estandar y con color aleatorio.",
  usage: '{prefix}crole <nombre del rol>',
  example: '{prefix}crole Miembros\n\nEsto creará el rol "Miembros", teniendo un color aleatorio.',
  aliases: ['createrole'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};