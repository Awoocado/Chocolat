const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.createMessage(":x: | No puedo mostrar contenido NSFW fuera de los canales NSFW.").then(m => setTimeout(() => m.delete(), 6000));
  let user = message.mentions[0];

  if (!user) return message.channel.createMessage(message.author.mention+", debes mencionar a un usuario o//n//o").then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+', no pienso hacerte eso.').then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿cómo diablos piensas hacerte eso a ti mismo?').then(m => setTimeout(() => m.delete(), 6000));
  
  const embed = new Eris.Embed().description(`**${message.author.username}** le hace una rusa a **${user.username}** O///O`).image(gifs.boobjob[Math.floor(Math.random() * gifs.boobjob.length)]).color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: "boobjob",
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Ten una forma más extravagante de hacerle una felación a alguien.',
  usage: '{prefix}boobjob <@usuario>',
  example: '{prefix}boobjob @MathError#6880\n\nEsto hará que le hagas una rusa al usuario mencionado.',
  aliases: ['boobs'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
