const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  let neko = require('../../data/nekog.json')

  const embed = new Eris.Embed()
    .description(`Nyaah~`)
    .image(`${neko[Math.floor(Math.random() * neko.length)]}`)
    .color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'nekogirl',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Observa tantas nekomimi como puedas. :D',
  usage: '{prefix}nekogirl',
  example: '',
  aliases: ['nekomimi', 'nekog'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 3000
};