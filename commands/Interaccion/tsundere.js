const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
    let user = message.mentions[0];
    const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).image(gifs.tsundere[Math.floor(Math.random() * gifs.tsundere.length)]);

    if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿practicarás ser Tsundere? Mejor inténtalo.').then(m => setTimeout(() => m.delete(), 6000));
    if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+", tonto/a, sólo yo te puedo ser tsundere. ¡HUM! ¬.¬");
    if (!user) {
        embed.description(`¬¬" ¡Hmm! tonto/a, **${message.author.username}**`);
    } else {
        embed.description(`**${message.author.username}** le está siendo tsundere a **${user.username}**`);
    };
    message.channel.createMessage({ embed });
};

exports.config = {
    command: 'tsundere',
    category: 'Comandos de Interacción',
    permissions: 'Ninguno',
    description: '¿Te consideras tsundere? Pues este comando será perfecto para ti, sé tsundere hacia alguien.',
    usage: '{prefix}tsundere [@usuario]',
    example: '{prefix}tsundere | {prefix}tsundere @MathError#6880\n\n1. *{prefix}tsundere*: {botname} te será tsundere.\n2. *{prefix}tsundere @usuario*: Sé tsundere hacia el usuario mencionado.',
    aliases: ['hmpf'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 5000
};