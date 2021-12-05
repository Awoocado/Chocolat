const Eris = require("eris-additions")(require("eris"));
const db = require('quick.db');
const config = require('../../config.json');
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  let author1 = message.author.id;
  const channel = message.guild.channels.get(db.fetch(`messageChannel_${message.guild.id}`)) || '*No definido.*';
  const suggestion = message.guild.channels.get(db.fetch(`suggestChannel_${message.guild.id}`)) || '*No definido.*';
  const report = message.guild.channels.get(db.fetch(`ruChannel_${message.guild.id}`)) || '*No definido.*';
  const logs = message.guild.channels.get(db.fetch(`logChannel_${message.guild.id}`)) || '*No definido.*';
  const confsChannel = message.guild.channels.get(db.fetch(`confChannel_${message.guild.id}`)) || '*No definido.*';
  const joinText = db.fetch(`joinMessage_${message.guild.id}`) || '*No definido.*';
  const leaveText = db.fetch(`leaveMessage_${message.guild.id}`) || '*No definido.*';
  let autoRole = message.guild.roles.get(db.fetch(`autoRole_${message.guild.id}`)) || '*No definido.*';
  const modRole = message.guild.roles.get(db.fetch(`modRole_${message.guild.id}`)) || '*No definido.*';
  const prefixText = db.fetch(`guildPrefix_${message.guild.id}`) || '*Prefix por defecto `{prefix}`*'.replace(/{prefix}/gi, require('../../config.json').prefix);
  
  if (!args.join(' '));
  else if (args[0].toLowerCase().includes("delete")){
    await message.channel.createMessage('¿Está seguro de **borrar toda la configuración de su servidor**? (sí = aceptar / no = denegar)').then(m => setTimeout(() => m.delete(), 10000));
    const msgs = await message.channel.awaitMessages((res) => author1 == res.author.id, {"maxMatches": 1, "time": 20000});
    if (!msgs.length || !['y', 'yes', 's', 'sí', 'si'].includes(msgs[0].content.toLowerCase())) return message.channel.createMessage('Comando cancelado.').then(m => setTimeout(() => m.delete(), 6000));
    if (channel !== "*No definido.*") db.delete(`messageChannel_${message.guild.id}`);
    if (suggestion !== "*No definido.*") db.delete(`suggestChannel_${message.guild.id}`);
    if (report !== "*No definido.*") db.delete(`ruChannel_${message.guild.id}`);
    if (logs !== "*No definido.*") db.delete(`logChannel_${message.guild.id}`);
    if (confsChannel !== "*No definido.*") db.delete(`confChannel_${message.guild.id}`);
    if (joinText !== "*No definido.*") db.delete(`joinMessage_${message.guild.id}`);
    if (leaveText !== "*No definido.*") db.delete(`leaveMessage_${message.guild.id}`);
    if (autoRole !== "*No definido.*") db.delete(`autoRole_${message.guild.id}`);
    if (modRole !== "*No definido.*") db.delete(`modRole_${message.guild.id}`);
    if (prefixText !== "*Prefix por defecto `{prefix}`*".replace(/{prefix}/gi, require('../../config.json').prefix)){
      db.delete(`guildPrefix_${message.guild.id}`);
      message.guild.prefix = config.prefix;
    };
    return message.channel.createMessage(':white_check_mark: | La configuración ha sido reiniciada por defecto.').then(m => setTimeout(() => m.delete(), 6000)); 
  };
  const embed = new Eris.Embed()
    .author('Configuración actual del servidor.', message.guild.iconURL || message.guild.dynamicIconURL)
    .description('Esta es la configuración actual de servidor.')
    .thumbnail(message.guild.iconURL || message.guild.dynamicIconURL)
    .field('Canal de bienvenida/despedida', `${channel.mention || '*No definido.*'}`)
    .field('Canal de Sugerencias', `${suggestion.mention || '*No definido.*'}`)
    .field('Canal de Reportes', `${report.mention || '*No definido.*'}`)
    .field('Canal de Logs', `${logs.mention || '*No definido.*'}`)
    .field('Canal de Confesiones', `${confsChannel.mention || '*No definido.*'}`)
    .field('Mensaje de bienvenida', `${joinText}`)
    .field('Mensaje de despedida', `${leaveText}`)
    .field('Auto-Rol', autoRole.mention ? autoRole.mention : '*No definido.*')
    .field('Mod-Rol', modRole.mention ? modRole.mention : '*No definido.*')
    .field('Prefix del servidor', `${prefixText}`)
    .color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: "config",
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Muestra o elimina la configuración actual del servidor. La información que incluye es la siguiente:\n1. **Canal de bienvenida/despedida:** Canal donde se enviarán los mensajes de bienvenida y despedida.\n2. **Canal de sugerencias:** Canal donde se enviará las sugerencias del comando `{prefix}suggest`.\n3. **Canal de reportes:** Canal donde se enviarán los reportes del comando `{prefix}reportuser`.\n4. **Canal de Logs:** Canal donde se enviará las infracciones al usar algún comando de moderación.\n5. **Canal de confesiones:** Canal donde se enviará las confesiones del comando `{prefix}confession`.\n6. **Mensaje de bienvenida:** Mensaje que se enviará cuando un usuario entre al servidor.\n7. **Mensaje de despedida:** Mensaje que se enviará cuando un usuario abandone el servidor.\n8. **Auto-rol:** Rol que se asignará automáticamente a los usuarios que entren al servidor.\n9. **Prefix:** Prefijo para llamar a los comandos de Chocolat actual del servidor.',
  usage: '{prefix}config [delete]',
  example: '{prefix}config | {prefix}config delete\n\n*{prefix}config:* 1. Esto mostrará la configuración actual del servidor.\n\n*{prefix}config delete:* 2. Esto borrará las configuraciones existentes en el servidor.',
  aliases: ['cnf'],
  developerOnly: false,
  allowedToDisable: false,
  visible: true,
  cooldown: 15000
};
