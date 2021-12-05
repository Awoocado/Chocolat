const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  var cat = Math.round(Math.random() * (397  - 1) + 1)

  const embed = new Eris.Embed()
    .description(`**${message.author.username}** aquí tienes un gato 🐈`)
    .image('https://cataas.com/cat?' + cat)
    .color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'cat',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: '{botname} mostrará una imagen de un Gato aleatoriamente.',
  usage: '{prefix}cat',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 10000
};