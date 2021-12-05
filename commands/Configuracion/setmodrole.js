const db = require('quick.db');
const Eris = require("eris-additions")(require("eris"));
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ')) return message.channel.createMessage(":x: | Debes escribir el nombre del rol de las personas con permisos de usar los comandos de moderación de Chocolat.\nLas personas que lo tengan, **podrán usar** los comandos:\n> \`ban\`\n> \`hackban\`\n> \`kick\`\n> \`mute\`\n> \`nickname\`\n> \`purge\`\n> \`sdm\`\n> \`softban\`\n> \`tempmute\`\n> \`unban\`\n> \`unmute\`\n> \`unwarn\`\n> \`warn\`\n").then(m => setTimeout(() => m.delete(), 10000));
  let role;
  if (args.join(' ').toUpperCase() === 'NONE') {
    role = '';
    db.set(`modRole_${message.guild.id}`, role);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Mod-rol borrado.')
      .description('El mod-rol ha sido borrado. Si quieres establecer un nuevo mod-rol, coloca:\n>`{prefix}setmodrole Nombre del rol.`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  } else {
    role = message.guild.roles.get(message.roleMentions[0]) || message.guild.roles.find(x=>x.name==args.join(' ')) || message.guild.roles.get(args[0]);
  if (!role) return message.channel.createMessage(':x: | El rol no ha sido encontrado. Verifique si lo ha escrito correctamente o de que el rol exista.').then(m => setTimeout(() => m.delete(), 6000));
    
    db.set(`modRole_${message.guild.id}`, role.id);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Mod-rol establecido.')
      .description('El mod-rol ha sido establecido. Los usuarios con ese rol podrán utilizar ciertos comandos de moderación del bot.\n**Rol establecido:** `' + role.name + '`')
      .color(Math.floor(Math.random() * 0xffffff))
    message.channel.createMessage({ embed });
  };
};

exports.config = {
  command: "setmodrole",
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Establece un rol con el que tus moderadores podrán tocar libremente los comandos de moderación de {botname} sin necesidad de tener permisos autorizados en su rol de Discord. Asegúrate de que el rol esté bien escrito o de que exista. Escribe **NONE** para eliminar el mod-rol.',
  usage: '{prefix}setmodrol <rol/NONE>',
  example: '{prefix}setmodrol Moderadores | {prefix}setmodrol NONE \n\n1. *{prefix}setmodrol rol*: Esto le asignará permisos para usar los comandos de moderación del bot a todo aquel que tenga el rol indicado.\n2. *{prefix}setmodrol NONE*: Esto reestablecerá a fábrica el mod-rol.',
  aliases: ['smr', 'mod', 'modrole'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};