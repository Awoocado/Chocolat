const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  const embed = new Eris.Embed().description('**¡BOOM!**').image(gifs.boom[Math.floor(gifs.boom.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'boom',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: '¡BOOM! ¡Explota todo a tu alrededor con este comando!',
  usage: '{prefix}boom',
  example: '',
  aliases: ['bakuretsu', 'explosion'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};