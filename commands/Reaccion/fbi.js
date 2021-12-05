const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['Hoy la FBI está aquí, ¡huyan!', 'Hoy la ONU está aquí, ¡escapen!', 'Hoy la CIA está aquí, ¡corran!'];
  const embed = new Eris.Embed().image(gifs.fbi[Math.floor(gifs.fbi.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'fbi',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Ya viene la policía, lo mejor que puedes hacer es correr.',
  usage: '{prefix}fbi',
  example: '',
  aliases: ['police', 'jail', 'onu', 'cia'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};