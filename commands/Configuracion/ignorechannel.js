const db = require('quick.db');
const servers = new db.table("servers");
const Eris = require("eris-additions")(require("eris"));
const config = require("../../config.json")

exports.run = (client, message, args) => {
  if (!message.member.hasPermission('administrator')) return message.channel.createMessage(':x: | No tienes los permisos requeridos para usar este comando.\nNecesitas tener el permiso `Administrador` activado.').then(m => setTimeout(() => m.delete(), 6000));
  if (!args.join(' ') && args.join(' ').toUpperCase() !== 'NONE') return message.channel.createMessage(':x: | Debes mencionar un canal.\nEjemplo: {prefix}ignorechannel add/remove #general'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 8000));
  const option = args.shift();
  let server = servers.fetch(`${message.guild.id}`) || {
    ignoredchannels: []
  };

  if (option == "add") {
    const canal = message.guild.channels.get(message.channelMentions[0]);
    if (!canal) return message.channel.createMessage(':x: | Debes mencionar un canal válido.\nEjemplo: {prefix}ignorechannel add #general'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
    if (server.ignoredchannels.includes(canal.id)) return message.channel.createMessage(':x: | El canal ya está en la lista de ignorados.').then(m => setTimeout(() => m.delete(), 6000));
    server.ignoredchannels.push(canal.id);
    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal ignorado añadido.')
      .description('Se ha añadido el ' + canal.mention + ' a la lista de canales ignorados. Si deseas quitarlo, coloca:\n>`{prefix}ignorechannel remove <#canal>`'.replace(/{prefix}/gi, config.prefix))
      .color(Math.floor(Math.random() * 0xffffff));
    servers.set(`${message.guild.id}`, server);
    message.guild.ignoredchannels =server.ignoredchannels
    message.channel.createMessage({ embed });
  
  } else if (option == "remove") {
    const canal = message.guild.channels.get(message.channelMentions[0]);
    if (!canal) return message.channel.createMessage(':x: | Debes mencionar un canal que esté en la lista de ignorados.\nEjemplo: {prefix}ignorechannel remove #general'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
    if (!server.ignoredchannels.includes(canal.id)) return message.channel.createMessage(':x: | El canal especificado no está en la lista de ignorados.').then(m => setTimeout(() => m.delete(), 6000));
    server.ignoredchannels.splice(server.ignoredchannels.indexOf(canal.id), 1);

    const embed = new Eris.Embed()
      .title(':white_check_mark: Canal ignorado removido.')
      .description('Se ha eliminado el canal ' + canal.mention + ' de la lista de canales ignorados.')
      .color(Math.floor(Math.random() * 0xffffff));
    message.guild.ignoredchannels =server.ignoredchannels
    servers.set(`${message.guild.id}`, server);
    message.channel.createMessage({ embed });
  } else if (option == "list") {
    let tchannels = server.ignoredchannels.filter(q => message.guild.channels.get(q)).map(tx => '#' + message.guild.channels.get(tx).name).join("\n") || "Ninguno.";
    if (tchannels.length > 900) {
      message.channel.createMessage('La lista de canales sobrepasa el límite de caracteres permitidos. Pero puedes descargar este archivo de texto para ver los canales igualmente.', new Discord.MessageAttachment(Buffer.from('Canales de texto ignorados:\n\n' + tchannels),"ignoredchannels.txt"));
    } else {
      const embed = new Eris.Embed()
        .title('Lista de canales ignorados de: ' + message.guild.name)
        .field('Canales de texto', '```' + tchannels + '```')
        .color(Math.floor(Math.random() * 0xffffff));
      message.channel.createMessage({ embed });
    };
  } else {
    message.channel.createMessage(':x: | Debes mencionar un canal.\nEjemplo: {prefix}ignorechannel add/remove #general'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000));
  };
};

exports.config = {
  command: "ignorechannel",
  category: 'Comandos de Configuración',
  permissions: 'Administrador',
  description: 'Ignora el uso de comandos en un canal del servidor. Al agregar un canal a la lista, {botname} simplemente no responderá.\nOpciones:\n**-add:** Añade un canal a la lista de ignorados.\n**-remove:** Quita un canal a la lista de ignorados.\n**-list:** Lista los canales ignorados por {botname}.\nNOTA: **Los administradores y personas con el mod-role, pueden esquivar esto**.',
  usage: '{prefix}ignorechannel <add/remove/list> <#canal>',
  example: '{prefix}ignorechannel add #general | {prefix}ignorechannel remove #general | {prefix}ignorechannel list\n\n1. *{prefix}ignorechannel add #canal*: Este agregará el canal mencionado a la lista de ignorados.\n2. *{prefix}ignorechannel remove #canal*: Este removerá el canal mencionado de la lista de ignorados.\n3. *{prefix}ignorechannel list*: Este mostrará la lista de canales ignorados actual del servidor.',
  aliases: ['ignorec', 'ic'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};