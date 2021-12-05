const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** vomitó. Bleh.', 'A **{nombre}** le pareció muy asqueroso, y vomitó...', '**{nombre}** no pudo contenerse y vomitó >n<'];
  const embed = new Eris.Embed().image(gifs.vomit[Math.floor(gifs.vomit.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'vomit',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Vomita de algo desagradable.',
  usage: '{prefix}vomit',
  example: '',
  aliases: ['disgorge', 'bleh'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};