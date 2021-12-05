const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['¡**{nombre}** salió corriendo!', '**{nombre}** se va demasiado rápido, es casi imposible seguirle.', '¡Corre **{nombre}**, corre!'];
  let r2 = ['**{nombre}** escapa de **{otro}**', '**{nombre}** sale corriendo de **{otro}** >u<', '¡**{otro}** no puede hacer nada ante la velocidad de **{nombre}** corriendo!'];
  
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿acaso pretendes que el universo explote?').then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+", n-no huyas de mí, regresa por favor... TnT");
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).image(gifs.run[Math.floor(Math.random() * gifs.run.length)]);
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'run',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Corre de cualquier enemigo, huye de la situación, escapa de la persona a quien tengas a tu lado con este maravilloso comando.',
  usage: '{prefix}run',
  example: '{prefix}run | {prefix}run @MathError#6880\n\n1. *{prefix}run*: Sal corriendo del lugar. \n2. *{prefix}run @usuario*: Sal corriendo del usuario mencionado.',
  aliases: ['sprint', 'dash'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};