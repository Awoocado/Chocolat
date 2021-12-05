const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
    let nombrerol = args[0];
    let role = message.guild.roles.get(message.roleMentions[0]) || message.guild.roles.find(x=>x.name==nombrerol);
    let perms = message.member.hasPermission("manageRoles");

    if (!perms) return message.channel.createMessage(":x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
    if (!message.guild.me.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios.\nNecesito tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000))
    
    if (!nombrerol) return message.channel.createMessage('Escriba el nombre del rol en el cual desea eliminar del servidor.').then(m => setTimeout(() => m.delete(), 6000))
    if (!role) return message.channel.createMessage('El rol especificado no fue encontrado en el servidor. Por favor asegúrese de que esté bien escrito.').then(m => setTimeout(() => m.delete(), 6000))
    if(!role.addable) return message.channel.createMessage(':x: | Debe seleccionar un rol de menor jerarquia.\nEsto pasa cuando el rol que quieres añadir está por encima de mi rol más alto.').then(m => setTimeout(() => m.delete(), 6000))
    let author1 = message.author.id;
    await message.channel.createMessage(message.author.mention + `,  ¿está seguro de eliminar el rol **${role.name}**? (Sí = Continuar / No = Denegar)`).then(m => setTimeout(() => m.delete(), 20000));

    const msgs = await message.channel.awaitMessages((res) => author1 == res.author.id, {"maxMatches": 1, "time": 20000});
    if (!msgs.length || !['y', 'yes', 's', 'sí', 'si'].includes(msgs[0].content.toLowerCase())) return message.channel.createMessage('Comando cancelado.').then(m => setTimeout(() => m.delete(), 6000));  
    
    if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
    role.delete().catch(e => message.channel.createMessage('Ocurrió un error al intentar borrar el rol. Puede que el rol a eliminar esté por encima del mío.'));
    const embed = new Eris.Embed()
      .title(":page_facing_up: Rol eliminado")
      .description(`El rol **${role.name}** ha sido eliminado.`)
      .field("Admin/Mod responsable:", `${message.author.tag}`)
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
};

exports.config = {
    command: "drole",
    category: 'Comandos ADMIN/MOD',
    permissions: 'Administrar Roles',
    description: 'Elimina por completo un rol usando a {botname}. El rol debe estar escrito exactamente igual a como fue creado. Además, el el rol por eliminar debe estar por debajo del rol de {botname} en el orden de la jerarquía de roles.',
    usage: '{prefix}drole <nombre del rol>/<mención del rol>',
    example: '{prefix}drole Silenciado \n\nEsto eliminará el rol "Silenciado".',
    aliases: ['deleterole', 'dr'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 20000
};