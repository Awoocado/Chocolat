const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if(!message.guild.me.hasPermission("manageRoles")) return message.channel.createMessage(":x: | No tengo los permisos necesarios para cambiar los roles.\nNecesito tener el permiso `Administrar Roles` activado.").then(m => setTimeout(() => m.delete(), 6000));
  
  if (!args.join(' ')) return message.channel.createMessage(":x: | Debes escribir el nombre del rol el cual se le asignará a los nuevos miembros.").then(m => setTimeout(() => m.delete(), 6000));
  let role;
  if (args.join(' ').toUpperCase() === 'NONE') {
    role = '';
    db.set(`autoRole_${message.guild.id}`, role);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Autorol borrado.')
      .description('El auto-rol ha sido borrado. Si quieres establecer un nuevo auto-rol, coloca:\n>`{prefix}setautorole Nombre del rol.`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  } else {
    role = message.guild.roles.get(message.roleMentions[0]) || message.guild.roles.find(x=>x.name==args.join(' ')) || message.guild.roles.get(args[0]);
  if (!role) return message.channel.createMessage(':x: | El rol no ha sido encontrado. Verifique si lo ha escrito correctamente o de que el rol exista.').then(m => setTimeout(() => m.delete(), 6000));
   if(!role.addable) return message.channel.createMessage(':x: | Debe seleccionar un rol de menor jerarquia.\nEsto pasa cuando el rol que quieres asignar está por encima de mi rol más alto.').then(m => setTimeout(() => m.delete(), 6000));
    db.set(`autoRole_${message.guild.id}`, role.id);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Autorol establecido.')
      .description('El auto-rol ha sido establecido. A los nuevos miembros se les asignará el rol automáticamente.\n**Rol establecido:** `' + role.name + '`')
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  };
};

exports.config = {
  command: "setautorole",
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece un rol que {botname} asignará a los nuevos que entren al servidor. Asegúrate de que el rol esté bien escrito o de que exista. Escribe **NONE** para reestablecer el auto-rol.',
  usage: '{prefix}setautorole <rol/NONE>',
  example: '{prefix}setautorole Miembros | {prefix}setautorole NONE \n\n1. *{prefix}autorole rol*: Esto le asignará el rol especificado a todo aquel que entre al servidor.\n2. *{prefix}setautorole NONE*: Esto reestablecerá el auto-rol.',
  aliases: ['setrole', 'srole', 'autorole'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};