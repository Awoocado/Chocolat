const Eris = require("eris-additions")(require("eris"));
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  fetch('https://dog.ceo/api/breeds/image/random').then(r=>r.json())
    .then(response => {
    const embed = new Eris.Embed().description(`**${message.author.username}**, aquí tienes un lindo perrito. 🐶`).image(response.message).color(Math.floor(Math.random() * 0xffffff)).footer("Comando secreto: 7/15.");
    message.channel.createMessage({ embed });
  }).catch(e=> message.channel.createMessage('Ocurrió un error al intentar pedir una imagen.\nEs posible que no se puedan solicitar más perritos por hoy.'))
};

exports.config = {
  command: 'dog',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: '{botname} te otorgará una foto de un lindo perrito.',
  usage: '{prefix}dog',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};