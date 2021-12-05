const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se ha confundido O.o', '**{nombre}** no entiende absolutamente nada.', 'Todo es tan confuso para **{nombre}**', '**{nombre}** no lo entiende >.<'];
  let embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('clagwimoth').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.blush[Math.floor(Math.random() * gifs.blush.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.confused[Math.floor(Math.random() * gifs.confused.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'confused',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa que estás confundido/a. o.O',
  usage: '{prefix}confused',
  example: '',
  aliases: ['fuzzy', 'bewildered'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
