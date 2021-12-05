const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** presume con estilo u.u', '**{nombre}** se ha puesto a presumir por ello.', '**{nombre}** está presumiendo.'];
  const embed = new Eris.Embed().image(gifs.smug[Math.floor(Math.random() * gifs.smug.length)]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: "smug",
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Siéntete libre de presumir tus mejores actos.',
  usage: '{prefix}smug',
  example: '',
  aliases: ['snooty', 'conceited'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};