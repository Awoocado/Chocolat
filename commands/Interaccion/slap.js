const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];
  let ex = ['561665106807619584'];
  let r = ['-abofetea a **{nombre}**-', '¡Reacciona **{nombre}**!', 'Haré que despiertes con esto >u< -abofetea a **{nombre}**-'];
  let r2 = ['**{nombre}** le dio una bofetada a **{otro}** -n-', '**{otro}** recibió una bofetada de **{nombre}** :c', '**{nombre}** es cruel y abofetea a **{otro}** >n<'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿te darás una bofetada a ti mismo? o.o').then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+", o-oye... no me des una bofetada, ¿te hice algo malo? :'c").then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (ex.includes(message.author.id)) embed.description(`**${message.author.username}** le dio una bofetada a **${user.username}**, pero con amor :3`);
  else if (!ex.includes(message.author.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('slap').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.slap[Math.floor(Math.random() * gifs.slap.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.slap[Math.floor(Math.random() * gifs.slap.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'slap',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Bofetea al usuario mencionado o deja que {botname} te de una bofetada.',
  usage: '{prefix}slap [@usuario]',
  example: '{prefix}slap | {prefix}slap @MathError#6880\n\n1. *{prefix}slap*: {botname} te dará una bofetada.\n2. *{prefix}slap @usuario*: Esto hará que le des una bofetada al usuario mencionado.',
  aliases: ['cuff'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
