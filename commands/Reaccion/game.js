const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se puso a jugar >u<', '**{nombre}** está jugando algo divertido.', '**{nombre}** juega un poco para entretenerse uwu', '**{nombre}** tiene una adicción por los videojuegos O.o', '¿Te encantan jugarlos **{nombre}**?'];
  const embed = new Eris.Embed().description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username)).image(gifs.game[Math.floor(Math.random() * gifs.game.length)]).color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'game',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: '¡Ponte a jugar algo!',
  usage: '{prefix}game',
  example: '',
  aliases: ['playing', 'gaming'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};