const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se ha decepcionado...', 'A **{nombre}** le pareció muy absurdo.', '**{nombre}** demuestra completa decepción por ello...'];
  const embed = new Eris.Embed().image(gifs.facepalm[Math.floor(Math.random() * gifs.facepalm.length)]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'facepalm',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa tu decepción...',
  usage: '{prefix}facepalm',
  example: '',
  aliases: ['deception', 'letdown'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};