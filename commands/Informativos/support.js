const config = require('../../config.json')

exports.run = async (client, message, args) => {
    try {
        message.author.createMessage('Este es el enlace de invitación al Servidor de Soporte de ' + client.user.username + '. Ahí podrás resolver dudas acerca del bot y sus comandos. También cuenta con un apartado social para entablar amistades y pasar un buen rato.\n> Enlace: https://discord.gg/CgSHkuK');
        message.channel.createMessage(':white_check_mark: | Te he enviado la invitación del servidor a tus mensajes privados.').then(m => setTimeout(() => m.delete(), 6000))
    } catch (e) {
        return message.channel.createMessage(':x: | No pude enviarte el mensaje a tus Mensajes Privados. Es posible que tengas tus Mensajes Privados deshabilitados. Utiliza `{prefix}infonodm` para obtener toda la información necesaria sin recibir algún mensaje privado.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000))
    };
}
exports.config = {
    command: 'support',
    category: 'Comandos Informativos',
    permissions: 'Ninguno',
    description: '{botname} te enviará la invitación al Servidor de Soporte a tus mensajes privados.',
    usage: '{prefix}support',
    example: '',
    aliases: ['staff'],
    developerOnly: false,
    allowedToDisable: false,
    visible: true,
    cooldown: 5000
};