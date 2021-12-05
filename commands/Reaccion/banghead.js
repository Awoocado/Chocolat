const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['¡**{nombre}** se está golpeando la cabeza!', '**{nombre}** no aguanta esta presión, entonces decidió golpearse la cabeza >.<', '**{nombre}** ya no aguanta más tanta presión.', '**{nombre}** se estampa la cabeza contra lo que pueda D\':'];
  let embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  if (Math.random() > .50) {
embed.image(gifs.banghead[Math.floor(Math.random() * gifs.banghead.length)])
return message.channel.createMessage({ embed });
  }else {
    return weebSH.toph.getRandomImage('banghead').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.')
embed.image(gifs.banghead[Math.floor(Math.random() * gifs.banghead.length)])
      message.channel.createMessage({ embed });
    });
};
};

exports.config = {
  command: 'banghead',
  category: 'Comandos de Reacción',
  permissions: 'Ninguno',
  description: 'Expresa tus ganas de golpearte la cabeza contra una pared o mesa.',
  usage: '{prefix}banghead',
  example: '',
  aliases: ['bhead', 'bangh'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
