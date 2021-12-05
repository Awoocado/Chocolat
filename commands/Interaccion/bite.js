const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let len = ["456840549001854988"]; 
  let r = ['-ñam-', '-ñam ñam- sabes a sal **{nombre}**', '-ñam ñam- sabes a dulce **{nombre}**', '-ÑAM- Tan dulce... Te devoraré òwó'];
  let r2 = ['**{nombre}** ha mordido a **{otro}** D:', '**{otro}** sabe a dulce, **{nombre}** no resistió sus ganas de morderle -nom nom-', '**{nombre}** piensa que **{otro}** es una comida O.o', '**{otro}**, te va a comer **{nombre}** a puro mordisco >w<'];
  let embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`Ayy >.< No me muerdas **${message.author.username}**`);
  else if (message.content.includes(message.author.id) && message.author.id == len) embed.description(`**${message.author.username}** se ha mordido a si mismx. o.O`);
  else if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿te vas a morder a ti mismo? o.O');
  else if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('bite').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.bite[Math.floor(Math.random() * gifs.bite.length)])
      return message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.bite[Math.floor(Math.random() * gifs.bite.length)])
  };
  message.channel.createMessage({ embed });
};exports.config = {
  command: "bite",
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Muerde al usuario mencionado, o deja que {botname} te muerda.',
  usage: '{prefix}bite [@usuario]',
  example: '{prefix}bite | {prefix}bite @MathError#6880\n\n1. *{prefix}bite*: {botname} te morderá.\n2. *{prefix}bite @usuario*: Esto hará que muerdas al usuario mencionado.',
  aliases: ['ñam'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
