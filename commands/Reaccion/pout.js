const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** se ha molestado un poquito e.e', '**{nombre}** hace pucheros.', '**{nombre}** no parece estar feliz por ello e.e'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));

  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('pout').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.pout[Math.floor(Math.random() * gifs.pout.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.pout[Math.floor(Math.random() * gifs.pout.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'pout',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: '¿Tienes ganas de quejarte? Con este comando podrás expresar esa sensación con un puchero.',
  usage: '{prefix}pout',
  example: '',
  aliases: ['ling'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
