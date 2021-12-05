const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
    let r = ['Lo lascivo está afectando a **{nombre}**', '**{nombre}** se envuelve en pensamientos pervertidos... O.o', '**{nombre}** no puede parar de pensar cosas lascivas o///o'];
    const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
    embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));

    if (Math.random() > .50) {
        return weebSH.toph.getRandomImage('lewd').then(gif => {
          embed.image(gif.url);
          message.channel.createMessage({ embed });
        }).catch(error => {
          embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.lewd[Math.floor(Math.random() * gifs.lewd.length)]);
return    message.channel.createMessage({ embed });
        });
      }else {
        embed.image(gifs.lewd[Math.floor(Math.random() * gifs.lewd.length)]);
      };
    message.channel.createMessage({ embed });
};

exports.config = {
    command: 'lewd',
    category: 'Comandos de Reacción',
    permissions: 'Ninguno',
    description: 'Expresa que algo es pervertido para ti.',
    usage: '{prefix}lewd',
    example: '',
    aliases: ['lascivious', 'obscene'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 5000
};
