const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**' + message.author.username + '** está espiando :eyes:').image(gifs.peek[Math.floor(gifs.peek.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 3/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'peek',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: ':eyes: Sólo espía.',
  usage: '{prefix}peek',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};