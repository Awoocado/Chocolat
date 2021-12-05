const Eris = require("eris-additions")(require("eris"));
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['A **{nombre}** le entró el apetito y se puso a comer.', '¿Tienes hambre **{nombre}**? Tengo comida para darte uwu', '**{nombre}** se está alimentando apropiadamente.', '**{nombre}** está comiendo.'];
  let r2 = ['**{nombre}** le da de comer a **{otro}**', '**{nombre}** está cuidando de **{otro}** con rica comida >u<', '**{nombre}** pensó que sería buena idea dejar con el estómago lleno a **{otro}**'];

  if (message.content.includes(message.author.id)) return message.channel.createMessage('No puedes darte de comer a ti mismo. Sólo come y ya está :D/');
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description('Oh, gracias por la comida n.n **' + message.author.username + '**');
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > 0.45) {
    const feed = await neko.sfw.feed().catch(error => {
      embed.footer('Ocurrió un error. Se estarán mostrando GIFs alternativos.').image(gifs.feed[Math.floor(Math.random() * gifs.feed.length)]);
      return message.channel.createMessage({ embed });
    });
    embed.image(feed.url);
  } else {
    embed.image(gifs.feed[Math.floor(Math.random() * gifs.feed.length)]);
  };
  message.channel.createMessage({ embed });
};exports.config = {
  command: 'feed',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Dale de comer a un usuario, o deja que {botname} te dé de comer.',
  usage: '{prefix}feed [@usuario]',
  example: '{prefix}feed | {prefix}feed @MathError#6880\n\n1. *{prefix}feed*: {botname} te dará de comer.\n2. *{prefix}feed @usuario*: Esto hará que les de comer al usuario mencionado.',
  aliases: ['eat'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
