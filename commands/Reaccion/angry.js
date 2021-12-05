const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se enfadó >:c', '**{nombre}** se ha molestado mucho D:', 'Es mejor salir de aquí porque **{nombre}** se ha enfadado.'];
  const embed = new Eris.Embed().image(gifs.angry[Math.floor(Math.random() * gifs.angry.length)]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'angry',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa que te has enfadado.',
  usage: '{prefix}angry',
  example: '',
  aliases: ['furious', 'mad'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};