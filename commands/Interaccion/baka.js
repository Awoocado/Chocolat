const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  let r = ['¡¡**{nombre}** B-BAKAA!!', '>n< **{nombre}** baka.', '¡Torpe **{nombre}**!'];
  let r2 = ['¡**{nombre}** le recuerda a **{otro}** que es completamente torpe!', '¡¡**{otro}** B-BAKAAA!!', '¡Hmpf, BAKA! **{otro}**'];
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('baka').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.')
embed.image(gifs.baka[Math.floor(Math.random() * gifs.baka.length)])
      return message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.baka[Math.floor(Math.random() * gifs.baka.length)])
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'baka',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Dile al usuario mencionado que es un completo Baka (idiota)',
  usage: '{prefix}baka [@usuario]',
  example: '{prefix}baka | {prefix}baka @MathError#6880\n\n1. *{prefix}baka*: {botname} te dirá que eres idiota.\n2. *{prefix}baka @usuario*: Esto hace que le digas al usuario mencionado que es idiota.',
  aliases: ['stupid', 'idiot'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
