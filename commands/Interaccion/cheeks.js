const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**'+client.user.username+'** pellizca las mejillas de **{nombre}**', 'Que mejillas tan suave tienes **{nombre}** owo', 'Déjame tocarte las mejillas >u<', '¿**{nombre}** te gusta que te agarre las mejillas? O.o'];
  let r2 = ['**{nombre}** no pudo resistir la suavidad de las mejillas de **{otro}**', '**{nombre}** pellizca las mejillas de **{otro}**', '**{otro}** sufre de que **{nombre}** le pellizque >u<'];
  let embed = new Eris.Embed();
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', de que puedes, puedes, pero no lo hagas.');
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  
  if (message.content.includes(client.user.id))  embed.description(`Waah, no me hagas esto (๑•﹏•)`);
  else if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  embed.image(gifs.cheeks[Math.floor(Math.random() * gifs.cheeks.length)]);
  embed.color(Math.floor(Math.random() * 0xffffff));
  
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'cheeks',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Pellizca las mejillas del usuario mencionado, o deja que {botname} te pellizque las mejillas.',
  usage: '{prefix}cheeks [@usuario]',
  example: '{prefix}cheeks | {prefix}cheeks @MathError#6880\n\n1. *{prefix}cheeks*: {botname} te pellizcará las mejillas.\n2. *{prefix}cheeks @usuario*: Esto hará que le pellizques las mejillas al usuario mencionado.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};