const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** está feliz :D', '**{nombre}** anda muy alegre uwu', '**{nombre}** se ha alegrado mucho >u<', '¡**{nombre}** tiene una gran sonrisa de felicidad! >u<'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));

  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('smile').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.happy[Math.floor(Math.random() * gifs.happy.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.happy[Math.floor(Math.random() * gifs.happy.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'happy',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa que estás feliz :D',
  usage: '{prefix}happy',
  example: '',
  aliases: ['glad', 'cheerful', 'smile'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
