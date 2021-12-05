const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**' + message.author.username + '** está moviendo la colita uwu').image(gifs.wag[Math.floor(gifs.wag.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 6/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'wag',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: 'Mueve la colita.',
  usage: '{prefix}wag',
  example: '',
  aliases: ['toss'],
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};