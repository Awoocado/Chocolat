const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**' + message.author.username + '** cometió un gran fallo.').image(gifs.fail[Math.floor(gifs.fail.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 5/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'fail',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: 'Vaya fracaso... Expresa que has cometido un gran fallo.',
  usage: '{prefix}fail',
  example: '',
  aliases: ['miss'],
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};