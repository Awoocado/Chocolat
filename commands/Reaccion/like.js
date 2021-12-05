const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
    let r = ['A **{nombre}** le gusta :D', '**{nombre}** aprueba eso.', '**{nombre}** considera correcto aquello (ovo)b'];
    const embed = new Eris.Embed().color(0x2551aa);
    embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));

    if (Math.random() > .50) {
        return weebSH.toph.getRandomImage('thumbsup').then(gif => {
          embed.image(gif.url);
          message.channel.createMessage({ embed });
        }).catch(error => {
          embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.like[Math.floor(Math.random() * gifs.like.length)]);
         return message.channel.createMessage({ embed });
        });
      }else {
        embed.image(gifs.like[Math.floor(Math.random() * gifs.like.length)]);
      };
    message.channel.createMessage({ embed });
};

exports.config = {
    command: 'like',
    category: 'Comandos de Reacción',
    permissions: 'Ninguno',
    description: 'Expresa que te gusta algo.',
    usage: '{prefix}like',
    example: '',
    aliases: ['yeah', 'thumbsup'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 5000
};
