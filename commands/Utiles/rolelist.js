const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  let rolelist = message.guild.roles.map(r => r.name).join("\n");

  if (rolelist.length > 600) {
    let msg = 'La lista de roles sobrepasa el límite de caracteres permitidos. Pero puedes descargar este archivo de texto para ver la lista igualmente.';
    message.channel.createMessage(msg, {file: Buffer.from('Lista de roles de ' + message.guild.name + ':\n\n' + rolelist, {encodind: 'utf8'}), name: 'rolelist.txt'})
  } else {
    const embed = new Eris.Embed().title(`Lista de roles de ${message.guild.name}`).color(Math.floor(Math.random() * 0xffffff)).description(`${rolelist}`);
    message.channel.createMessage({ embed });
  }
};

exports.config = {
  command: 'rolelist',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Obtén la lista de roles completa del servidor. El resultado podrá venir en un documento de texto si el servidor tiene muchos roles.',
  usage: '{prefix}rolelist',
  example: '',
  aliases: ['rlist'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};