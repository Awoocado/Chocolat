const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** llora >.<', '**{nombre}** se ha puesto a llorar por ello.', '**{nombre}** ha dejado caer sus lágrimas...'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('cry').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.cry[Math.floor(Math.random() * gifs.cry.length)])
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.cry[Math.floor(Math.random() * gifs.cry.length)])
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'cry',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: '¿Quieres expresar que estás llorando? Hazlo con este comando.',
  usage: '{prefix}cry',
  example: '',
  aliases: ['weep', 'waa', 'mourn'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
