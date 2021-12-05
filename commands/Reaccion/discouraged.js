const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** está muy triste :\'c', '**{nombre}** se ha deprimido...', '**{nombre}** se apagó completamente... :c', '**{nombre}** está perdidamente triste... -n-'];
  let embed = new Eris.Embed().color(10800092);
  if (Math.random() > .99) embed.description(`¡No estés triste, déjame darte cariño. - Abraza a **${message.author.username}** - uwu`).image(gifs.hug[Math.floor(gifs.hug.length * Math.random())]);
  else embed.image(gifs.discouraged[Math.floor(gifs.discouraged.length * Math.random())]).description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));;
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'discouraged',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa tu tristeza. :(',
  usage: '{prefix}discouraged',
  example: '',
  aliases: ['sad', 'depress'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
