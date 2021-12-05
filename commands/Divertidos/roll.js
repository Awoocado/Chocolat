const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
    const roll = [
        'https://cdn.discordapp.com/attachments/315914386944557056/371053489973100545/n1.png',
        'https://cdn.discordapp.com/attachments/315914386944557056/371053492594409473/n2.png',
        'https://cdn.discordapp.com/attachments/315914386944557056/371053496092459019/n3.png',
        'https://cdn.discordapp.com/attachments/315914386944557056/371053490643927042/n4.png',
        'https://cdn.discordapp.com/attachments/315914386944557056/371053495714840576/n5.png',
        'https://cdn.discordapp.com/attachments/315914386944557056/371053499070414848/n6.png'
    ];

    const embed = new Eris.Embed()
        .title('Tirar dado.')
        .description(`**${message.author.username}**, el dado cayó:`)
        .image(roll[Math.floor(roll.length * Math.random())])
        .color(Math.floor(Math.random() * 0xffffff));
    message.channel.createMessage({ embed });
};

exports.config = {
    command: 'roll',
    category: 'Comandos Divertidos',
    permissions: 'Ninguno',
    description: 'Simula el lanzamiento de un dado y te mostrará el resultado obtenido.',
    usage: '{prefix}roll',
    example: '',
    aliases: ['dice'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 5000
};