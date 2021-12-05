const Eris = require("eris-additions")(require("eris"));
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  var Fox = Math.round(Math.random() * (122  - 1) + 1)

  const embed = new Eris.Embed()
    .description(`**${message.author.username}** aquí tienes un lindo zorro 🦊`)
    .image('http:\/\/randomfox.ca\/images\/'+ Fox +'.jpg')
    .color(Math.floor(Math.random() * 0xffffff))
    .footer("Comando secreto: 13/15.");
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'fox',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: '{botname} te otorgará una foto de un lindo zorro.',
  usage: '{prefix}fox',
  example: '',
  aliases: ['senko'],
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};