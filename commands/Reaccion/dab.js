const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).description(`**${message.author.username}** hizo un dab.`);

  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('dab').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs[Math.floor(Math.random() * gifs.length)]);
      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.dab[Math.floor(Math.random() * gifs.dab.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'dab',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Realiza un dab en el momento que consideres oportuno.',
  usage: '{prefix}dab',
  example: '',
  aliases: ['lol', 'ggez'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};