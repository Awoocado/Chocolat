const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['-Moja a **{nombre}**- ¿Eso pedías?', 'Ahí te va >u< -moja a **{nombre}**-' , '-Slpash splash- >u< ¿cómo se siente **{nombre}?**'];
  let r2 = ['**{nombre}** moja a **{otro}** owo', '**{nombre}** no se resiste las ganas de mojar a **{otro}** >u<', '**{otro}** se va a mojar por culpa de **{nombre}** >.<'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).image(gifs.splash[Math.floor(Math.random() * gifs.splash.length)]);

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿por qué lo harías?').then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`**${message.author.username}** ¡no me mojes! >n<`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'splash',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Moja al usuario mencionado, o deja que {botname} te moje.',
  usage: '{prefix}splash [@usuario]',
  example: '{prefix}splash | {prefix}splash @MathError#6880\n\n1. *{prefix}splash:* {botname} te mojará.\n2. *{prefix}splash @usuario*: Moja al usuario mencionado.',
  aliases: ['plash'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};