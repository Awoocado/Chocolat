const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  let miembro = message.mentions[0] || (!isNaN(args[0]) ? message.guild.members.get(args[0]) : undefined);
    let args2 = args.join(' ');
    let nombrerol = args2.split(' ').slice(1).join(' ');
    let role = message.guild.roles.get(message.roleMentions[0]) || message.guild.roles.find(x=>x.name==nombrerol);
    let perms = message.member.hasPermission("manageRoles");

    if (!perms) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
    if (!message.guild.me.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para cambiar roles.\nNecesito tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
    
    if (!miembro) return message.channel.createMessage(message.author.mention+', Debe mencionar a un usuario.').then(m => setTimeout(() => m.delete(), 6000)).catch(console.error);
    if (!nombrerol) return message.channel.createMessage('Escriba el nombre del rol en el cual desea retirar al usuario mencionado.').then(m => setTimeout(() => m.delete(), 6000))
    if (!role) return message.channel.createMessage('El rol especificado no fue encontrado en el servidor. Por favor asegúrese de que esté bien escrito.').then(m => setTimeout(() => m.delete(), 6000))
    if (!message.guild.members.get(miembro.id).roles.find(x=>message.guild.roles.get(x).name==nombrerol)) return message.channel.createMessage('El usuario mencionado no está en el rol que especificó.').then(m => setTimeout(() => m.delete(), 6000));
    
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
    if(!role.addable) return message.channel.createMessage(':x: | Debe seleccionar un rol de menor jerarquia.\nEsto pasa cuando el rol que quieres remover está por encima de mi rol más alto.').then(m => setTimeout(() => m.delete(), 6000))
    message.guild.members.get(miembro.id).removeRole(role.id).catch(console.error);

    const embed = new Eris.Embed()
      .title(":page_facing_up: Rol retirado")
      .description(`El rol **${role.name}** de **${miembro.tag}** fue retirado.`)
      .field("Admin/Mod responsable:", `${message.author.tag}`)
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
};

exports.config = {
    command: "remrole",
    category: 'Comandos ADMIN/MOD',
    permissions: 'Administrar Roles',
    description: 'Quita un rol del usuario mencionado usando a {botname}. El rol debe estar escrito exactamente igual a como fue creado. Además, el usuario a remover el rol debe estar por debajo del rol de {botname} en el orden de jerarquía de roles.',
    usage: '{prefix}remrole <@usuario> <nombre del rol>',
    example: '{prefix}remrole @MathError#6880 Moderador\n\nEste quitará el rol "Moderador" al usuario MathError#6880.',
    aliases: ['removerole', 'rmr'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 5000
};