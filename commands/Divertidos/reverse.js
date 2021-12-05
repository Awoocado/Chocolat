const filters = require('../../data/filters.json');
exports.run = async (client, message, args) => {
    var texto = args.join(' ');
    if (!texto) return message.channel.createMessage(':x: | Escriba un mensaje para repetirlo de manera inversa.').then(m => setTimeout(() => m.delete(), 6000));
    if (!message.member.hasPermission('administrator')) {
        if (filters.insult.some(p => args.join(' ').toLowerCase().includes(p)) || filters.links.some(p => args.join(' ').toLowerCase().includes(p)) || filters.noNSFW.some(p => args.join(' ').toLowerCase().includes(p)) || filters.insult.some(p => (args.join(' ').split("").reverse().join("")).toLowerCase().includes(p)) || filters.links.some(p => (args.join(' ').split("").reverse().join("")).toLowerCase().includes(p)) || filters.noNSFW.some(p => (args.join(' ').split("").reverse().join("")).toLowerCase().includes(p))) {
        if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
          return message.channel.createMessage(':x: | El texto del reverse no puede incluir palabras ofensivas o enlaces. (Solo usuarios con el permiso `Administrador` activado pueden esquivar eso)').then(m => setTimeout(() => m.delete(), 6000))
        }
    }
    texto = texto.split("").reverse().join("");
    message.channel.createMessage(texto);
};

exports.config = {
    command: 'reverse',
    category: 'Comandos Divertidos',
    permissions: 'Ninguno',
    description: 'Repite tu mensaje de manera inversa.',
    usage: '{prefix}reverse <texto>',
    example: '{prefix}reverse Hola, ¿qué tal?',
    aliases: ['esrever'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 2000
};
