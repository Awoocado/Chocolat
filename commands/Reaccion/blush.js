const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se ha sonrojado o///o', '**{nombre}** es casi del mismo color que un tomate >u<', '**{nombre}** está sonrojándose demasiado >///<', 'Parece que **{nombre}** tiene mucha vergüenza u///u'];
  let embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));

  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('blush').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.blush[Math.floor(Math.random() * gifs.blush.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.blush[Math.floor(Math.random() * gifs.blush.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'blush',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa que estás sonrojado/a o///o',
  usage: '{prefix}blush',
  example: '',
  aliases: ['redden', 'flush'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
