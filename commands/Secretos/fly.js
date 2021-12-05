const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**' + message.author.username + '** está... ¿Volando?').image(gifs.fly[Math.floor(gifs.fly.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 14/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'fly',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: 'Vuela, vuela... ¡Demuestra que sabes volar con este comando!',
  usage: '{prefix}fly',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};