const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let exception = ['417840205584793609']; //¿Quién es este? (?) //InkStyles#0007
  let user = message.mentions[0];
  let r = ['**{nombre}** está aburriéndose.', '**{nombre}** no sabe qué hacer.', '**{nombre}** se aburre demasiado... Casi para dormirse pero también le aburre...'];
  let embed = new Eris.Embed().image(gifs.bored[Math.floor(gifs.bored.length * Math.random())]).color(Math.floor(Math.random() * 0xffffff));

  if (exception.includes(message.author.id) && user) {
    embed.description(`**${message.author.username}** se aburre con tu wea **${user}**.`);
  } else {
    embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'bored',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: '¿Estás aburrido/a? Demúestralo con este comando.',
  usage: '{prefix}bored',
  example: '',
  aliases: ['tired', 'dull'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};