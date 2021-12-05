const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**' + message.author.username + '** activó su modo Yandere~.').image(gifs.yandere[Math.floor(gifs.yandere.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 8/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'yandere',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: 'Expresa que estás en tu modo Yandere.\n"Mira fijamente a tu víctima, activa tu modo, y prepárate para atacar."',
  usage: '{prefix}yandere',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};