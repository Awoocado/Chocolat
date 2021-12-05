const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {

    let rand1 = Math.round(Math.random() * 10);
    if (!args.join(' ')) return message.channel.createMessage(":x: | Debes escribir algo para puntuar.").then(m => setTimeout(() => m.delete(), 6000))
    const embed = new Eris.Embed()
        .title(":question: Evaluación")
        .description(`Le doy a **${args.join(' ')}** un **${rand1}/10**`)
        .color(Math.floor(Math.random() * 0xffffff));
    message.channel.createMessage({ embed });
};

exports.config = {
    command: 'rate',
    category: 'Comandos Divertidos',
    permissions: 'Ninguno.',
    description: '{botname} evaluará lo que coloques en una escala del 1 al 10. Puedes escribir lo que quieras, o mencionar a un usuario.',
    usage: '{prefix}rate <texto>',
    example: '{prefix}rate Half-Life',
    aliases: ['rt', 'ratewaifu'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 2000
};