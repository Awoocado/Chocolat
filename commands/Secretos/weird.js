const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['What the...?', '¿Cómo?', 'Mmm... ¿Ok?', 'Emm...', 'H0w?'];
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  const embed = new Eris.Embed().description(r[Math.floor(r.length * Math.random())]).image(gifs.weird[Math.floor(gifs.weird.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 15/15.');
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'weird',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: 'Observa lo raro entre lo raro del anime.',
  usage: '{prefix}weird',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};