const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  const embed = new Eris.Embed().description('NOPE!').image(gifs.nope[Math.floor(Math.random() * gifs.nope.length)]).color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'nope',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'NOPE!',
  usage: '{prefix}nope',
  example: '',
  aliases: ['no', 'nono'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};