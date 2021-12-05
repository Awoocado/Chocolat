const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se ha disgustado de eso :/', 'A **{nombre}** no le parece agradable...', '**{nombre}** siente odio por ello...'];
  const embed = new Eris.Embed().image(gifs.disgust[Math.floor(Math.random() * gifs.disgust.length)]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'disgust',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa que algo te disgusta. ¡Bleh!',
  usage: '{prefix}disgust',
  example: '',
  aliases: ['dislike', 'aversion'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};