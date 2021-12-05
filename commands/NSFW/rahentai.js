const Eris = require("eris-additions")(require("eris"));
let gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.createMessage(message.author.mention+', no puedo mostrar contenido NSFW fuera de los canales NSFW.').then(m => setTimeout(() => m.delete(), 6000));
    let gifs2 = {
        0:gifs.boobjob,
        1:gifs.cum1,
        2:gifs.cum2,
        3:gifs.fuck,
        4:gifs.gmasturbate,
        5:gifs.rahentai,
        6:gifs.suck
    };
    let random = gifs2[Math.floor(7 * Math.random())];
    const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).description("...");
    embed.image(random[Math.floor(random.length * Math.random())]);
    message.channel.createMessage({ embed });
};

exports.config = {
    command: "rahentai",
    category: 'Comandos NSFW',
    permissions: 'Canal NSFW',
    description: "Muestra gifs hentai aleatoriamente.",
    usage: '{prefix}rahentai',
    example: '',
    aliases: ['randomh', 'rh'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 10000
};
