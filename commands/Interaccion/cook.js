const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['¡**{nombre}** está cocinando algo muy rico!', '**{nombre}** se ha puesto a cocinar.', 'Veo que te gusta la cocina **{nombre}**', '¡A cocinar **{nombre}**!', '¿Qué estará cocinando **{nombre}**?'];
  let r2 = ['**{nombre}** le cocina algo a **{otro}**', '**{otro}** tenía hambre, y **{nombre}** le cocina algo rico.', '**{nombre}** alimentará a **{otro}**... Se paciente **{otro}**', '**{otro}** comerá la comida que **{nombre}** prepara.', '**{nombre}** cocina algo asombroso para **{otro}**'];
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  const embed = new Eris.Embed().image(gifs.cook[Math.floor(Math.random() * gifs.cook.length)]).color(Math.floor(Math.random() * 0xffffff));
  if (!message.content.includes(message.author.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'cook',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: '¿Con hambre, con ganas de cocinar algo? Podrás cocinar algo para ti mismo o para alguien más si usas este comando.',
  usage: '{prefix}cook [@usuario]',
  example: '{prefix}cook | {prefix}cook @MathError#6880\n\n1. *{prefix}cook*: Esto hará que cocines sin más. \n2. *{prefix}cook @usuario*: Cocínale al usuario mencionado.',
  aliases: ['prepare', 'make'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};