const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** empezó a reírse ^u^', '**{nombre}** se está partiendo de la risa.', '**{nombre}** se ríe a carcajadas.'];
  let r2 = ['**{nombre}** se ríe de **{otro}**', '**{nombre}** se parte de la risa por **{otro}**', '**{otro}** hizo reír a **{nombre}** >u<'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).image(gifs.laugh[Math.floor(Math.random() * gifs.laugh.length)]);

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿por qué te reirías de ti mismo?');
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`**${message.author.username}**, ¡no te rías de mí! >:C`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'laugh',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Ríe de la diversión o ríete de alguien.',
  usage: '{prefix}laugh [@usuario]',
  example: '{prefix}laugh | {prefix}laugh @MathError#6880\n\n1. *{prefix}laugh*: Ríete de la diversión o de algo. \n2. *{prefix}laugh @usuario*: Ríete del usuario mencionado.',
  aliases: ['haha'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};