const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (!message.channel.nsfw) return message.channel.createMessage(":x: | No puedo mostrar contenido NSFW fuera de los canales NSFW.").then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+', deberías mencionar a otra persona. ¬¬').then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', mejor menciona a un usuario, ¿no? (o//u//o")').then(m => setTimeout(() => m.delete(), 6000));
  if (!user) {
    embed.description(`**${message.author.username}** se ha venido.`);
    embed.image(gifs.cum2[Math.floor(Math.random() * gifs.cum2.length)]);
  } else {
    embed.description(`**${message.author.username}** se vino en **${user.username}**`);
    embed.image(gifs.cum1[Math.floor(Math.random() * gifs.cum1.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'cum',
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Vente en el usuario mencionado o hazlo solo.',
  usage: '{prefix}cum [@usuario]',
  example: '{prefix}cum | {prefix}cum @MathError#6880\n\n1. *{prefix}cum*: Córrete solo.\n2. *{prefix}cum @usuario*: Córrete en el usuario mencionado.',
  aliases: ['cream'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};