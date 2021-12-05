const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  const embed = new Eris.Embed().description(`**${message.author.username}** se puso a posar como los Jojos.`).image(gifs.jpose[Math.floor(Math.random() * gifs.jpose.length)]).color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'jpose',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Haz una pose estilo Jojos',
  usage: '{prefix}jpose',
  example: '',
  aliases: ['jojo'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};