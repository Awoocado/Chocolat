const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** no lo sabe...', 'Parece que a **{nombre}** no le importa. e.e', '**{nombre}** probablemente no sepa acerca de ello...']
  const embed = new Eris.Embed().image(gifs.shrug[Math.floor(Math.random() * gifs.shrug.length)]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'shrug',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa que no sabes algo o no te importa.',
  usage: '{prefix}shrug',
  example: '',
  aliases: ['idk'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};