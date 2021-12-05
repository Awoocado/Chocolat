const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description('**' + message.author.username + '** ¡¡está gritando aAaAAa!!').image(gifs.scream[Math.floor(gifs.scream.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 4/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'scream',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: '¡¡¡¡AaAaaAaaAA!!!!, expresa tus ganas de gritar con todas tus fuerzas.',
  usage: '{prefix}scream',
  example: '',
  aliases: ['shout'],
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};