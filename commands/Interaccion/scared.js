const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['A **{nombre}** le aterroriza algo D:', '**{nombre}** tiene miedo de algo >n<', '¡Controla tu miedo **{nombre}**!'];
  let r2 = ['**{nombre}** tiene miedo de **{otro}** o.o', '**{otro}** es la peor pesadilla de **{nombre}** D:', '**{nombre}** tiene pavor de **{otro}** D\':'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).image(gifs.scared[Math.floor(Math.random() * gifs.scared.length)]);

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no te tengas miedo a ti mismo. Seguro eres una maravillosa persona :3').then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`**${message.author.username}** juju, ¿tienes miedo de mí?. >:)`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'scared',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Siente miedo de algo o de alguien.',
  usage: '{prefix}scared [@usuario]',
  example: '{prefix}scared | {prefix}scared @MathError#6880\n\n1. *{prefix}scared:* Siente miedo de algo.\n2. *{prefix}scared @usuario*: Siente miedo del usuario mencionado.',
  aliases: ['afraid', 'fearful'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};