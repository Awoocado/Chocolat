const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {

  const embed = new Eris.Embed().title(":question: Tirar moneda").color(Math.floor(Math.random() * 0xffffff));

  if (Math.random() > .50) {
    embed.description(`¡Cayó cara!`);
    embed.image(`https://cdn.discordapp.com/attachments/492119037971791872/543940275156942871/CCCOIN.png`);
  }else {
	embed.description(`¡Cayó cruz!`).image(`https://cdn.discordapp.com/attachments/492119037971791872/543936032400474122/CCCCOIN.png`)
};
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'coinflip',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Simula el lanzamiento de una moneda y te dará el resultado aleatoriamente.',
  usage: '{prefix}coinflip',
  example: '',
  aliases: ['coin'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
