const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  let miembro = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
  let nombrerol = args.join(' ').split(' ').slice(1).join(' ');
  let role = message.guild.roles.get(message.roleMentions[0]) || message.guild.roles.find(x=>x.name==nombrerol);

  if(!message.member.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
  if(!message.guild.me.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para cambiar los roles.\nNecesito tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
  

  if(!miembro) return message.channel.createMessage(':x: | Debes mencionar a un usuario y después el nombre del rol que deseas otorgarle al usuario.').then(m => setTimeout(() => m.delete(), 6000));
  if(!nombrerol) return message.channel.createMessage(':x: | Debes mencionar o escribir el nombre del rol que deseas otorgarle al usuario.').then(m => setTimeout(() => m.delete(), 6000));
  if (!role) return message.channel.createMessage(':x: | Rol no encontrado. Asegúrese de que esté bien escrito, o que el rol exista.').then(m => setTimeout(() => m.delete(), 4000));
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
  else message.delete();
  if(!role.addable) return message.channel.createMessage(':x: | Debe seleccionar un rol de menor jerarquia.\nEsto pasa cuando el rol que quieres añadir está por encima de mi rol más alto.').then(m => setTimeout(() => m.delete(), 6000))
  message.guild.members.get(miembro.id).addRole(role.id).catch(e => message.channel.createMessage('Ocurrió un error al intentar agregar el rol. Puede que el rol por agregar esté por encima del mío.\nDetalles del error: `'+e+'`.'));
  
  const embed = new Eris.Embed()
    .title(":page_facing_up: Rol agregado.")
    .description(`A **${miembro.username}**, se le añadió el rol: **${role.name}**`)
    .field("Admin/Mod responsable:", `${message.author.username}#${message.author.discriminator}`)
    .color(Math.floor(Math.random() * 0xffffff))
  message.channel.createMessage({ embed });
};

exports.config = {
  command: "addrole",
  category: "Comandos ADMIN/MOD",
  permissions: "Administrar Roles",
  description: "Asigna un rol del servidor al usuario mencionado usando a {botname}. El rol debe estar escrito exactamente igual a como fue creado. Además, el rol a agregar al usuario debe estar por debajo del rol de {botname} en el orden de jerarquía de roles.",
  usage: '{prefix}addrole <@usuario> <nombre del rol>',
  example: '{prefix}addrole @MathError#6880 Moderador\n\nEsto agregará el rol "Moderador" al usuario MathError#6880.',
  aliases: ['addr', 'role'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};