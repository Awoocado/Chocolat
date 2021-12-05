const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**' + message.author.username + '** hace una tpose (T)').image(gifs.tpose[Math.floor(gifs.tpose.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 11/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'tpose',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: 'Posa en forma de "T".',
  usage: '{prefix}tpose',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};