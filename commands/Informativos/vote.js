const config = require('../../config.json')

exports.run = async (client, message, args) => {
    try {
        await message.author.createMessage("Estaré eternamente agradecida que dejes tu voto a favor de mí, este es el enlace en donde puedes votar, gracias por elegirme: https://discordbots.org/bot/379757424447455232/vote");
        await message.channel.createMessage(':white_check_mark: | Te he enviado el enlace de votación a tus Mensajes Privados.').then(m => setTimeout(() => m.delete(), 6000))
    } catch (e) {
        return message.channel.createMessage(':x: | No pude enviarte el mensaje a tus Mensajes Privados. Es posible que tengas tus Mensajes Privados deshabilitados. Utiliza `{prefix}infonodm` para obtener toda la información necesaria sin recibir algún mensaje privado.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000))
    }
};

exports.config = {
    command: 'vote',
    category: 'Comandos Informativos',
    permissions: 'Ninguno',
    description: 'Vota por {botname} en Discord Bot List. El bot te enviará el enlace para votar a tus Mensajes Privados.',
    usage: '{prefix}vote',
    example: '',
    developerOnly: false,
    allowedToDisable: false,
    visible: true,
    cooldown: 5000
};