const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let ex = ['288143032375574538'];
  let r = ['-sip sip- **{nombre}** bebe a sorbos.', '**{nombre}** está bebiendo de forma atenta.', 'A **{nombre}** le pareció un momento perfecto para detenerse a beber un poco >u<', 'Parece que **{nombre}** andaba con mucha sed...'];
  const embed = new Eris.Embed().image(gifs.sip[Math.floor(gifs.sip.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));
  if (message.author.id == ex) embed.description(`**${message.author.username}** está tomando un matecito 🧉`);
else   embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'sip',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Bebe un poco de té, o alguna bebida refrescante de forma atenta.',
  usage: '{prefix}sip',
  example: '',
  aliases: ['gulp', 'drink'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
