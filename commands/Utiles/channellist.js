const Eris = require("eris-additions")(require("eris"));
const fs = require("fs");
exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'attachFiles')) return message.channel.createMessage(':x: | No tengo los permisos necesarios para subir archivos.\nNecesito tener el permiso `Adjuntar Archivos` activado.').then(m => setTimeout(() => m.delete(), 6000));
  
  let vchannels = message.guild.channels.filter(m => m.type === 2).map(vc => '🔊 ' + vc.name).slice(1).join("\n");
  if (!vchannels) vchannels = "Ninguno";
  let tchannels = message.guild.channels.filter(m => m.type === 0).map(tx => '#' + tx.name).slice(1).join("\n");
  
  if (tchannels.length > 900 || vchannels.length > 900) {
      let msg = 'La lista de canales sobrepasa el límite de caracteres permitidos. Pero puedes descargar este archivo de texto para ver los canales igualmente.';
      message.channel.createMessage(msg, {file: Buffer.from('Canales de texto:\n\n' + tchannels + '\n\nCanales de Voz:\n\n' + vchannels, {encodind: 'utf8'}), name: 'channellist.txt'})
  } else {
    const embed = new Eris.Embed().title('Lista de canales de ' + message.guild.name).field('Canales de texto', '```' + tchannels + '```').field('Canales de voz', '```' + vchannels + '```').color(Math.floor(Math.random() * 0xffffff));
    message.channel.createMessage({embed});
  };
};

exports.config = {
  command: 'channellist',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Obtiene la lista de canales del servidor. El resultado podrá venir en un documento de texto si el servidor tiene muchos canales.',
  usage: '{prefix}channellist',
  example: '',
  aliases: ['chlist'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};