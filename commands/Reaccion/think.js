const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se puso a pensar. Hmm...', '**{nombre}** está pensando en algo útil.', '**{nombre}** necesita romperse la cabeza en ello O.o', '**{nombre}** está intentando resolverse la duda...'];
  const embed = new Eris.Embed().image(gifs.think[Math.floor(gifs.think.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'think',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Muestra a los demás que estás pensando en algo.',
  usage: '{prefix}think',
  example: '',
  aliases: ['meditate', 'ponder'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};