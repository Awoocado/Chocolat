const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  let rauser = (message.guild.members.filter(m => m.user.bot == false).map(u => u.user.tag));
  const embed = new Eris.Embed().title(":question: Selección aleatoria").description('El usuario seleccionado es: **' + rauser[Math.floor(Math.random() * rauser.length)] + '**').color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'randomuser',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Selecciona un usuario aleatoriamente. Incluye bots.',
  usage: '{prefix}randomuser',
  example: '',
  aliases: ['ranuser'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 2000
};