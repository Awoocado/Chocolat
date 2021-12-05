const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  let r = ['¡**{nombre}** se está disculpando!', '**{nombre}** quiere disculparse... :c', '**{nombre}** pide una disculpa.'];
  let r2 = ['**{nombre}** se disculpa con **{otro}**', '**{otro}**, **{nombre}** te pide disculpas... >n<', '**{nombre}** le está pidiendo perdón a **{otro}**'];
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  const embed = new Eris.Embed().image(gifs.sorry[Math.floor(Math.random() * gifs.sorry.length)]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 12/15.');
  if (!message.content.includes(message.author.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'sorry',
  category: 'Comandos Secretos',
  permissions: 'Ninguno',
  description: '¿Hiciste algo que no debías? No hay problema, discúlpate adecuadamente con este comando secreto.',
  usage: '{prefix}sorry [@usuario]',
  example: '{prefix}sorry | {prefix}sorry @MathError#6880\n\n1. *{prefix}sorry*: Esto hará que te diculpes de algo a todo el público. \n2. *{prefix}sorry @usuario*: Discúlpate con el usuario mencionado.',
  aliases: ['soz'],
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};
