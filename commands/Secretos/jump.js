const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**¡' + message.author.username + '** está dando unos gloriosos saltos! :D').image(gifs.jump[Math.floor(gifs.jump.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 9/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'jump',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: '¡Salta sin parar, salta tanto como quieras!',
  usage: '{prefix}jump',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};