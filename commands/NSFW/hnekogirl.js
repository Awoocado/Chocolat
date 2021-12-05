const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.createMessage(":x: | No puedo mostrar contenido NSFW fuera de los canales NSFW.").then(m => setTimeout(() => m.delete(), 6000));
    message.channel.createMessage("Comando temporalmente desactivado, disculpe las molestias.");
};

exports.config = {
    command: "hnekogirl",
    category: 'Comandos NSFW',
    permissions: 'Canal NSFW',
    description: 'Muestra una imagen aleatoria de una Chica Gato erótica.',
    usage: '{prefix}hnekogirl',
    example: '',
    aliases: ['hneko'],
    developerOnly: false,
    allowedToDisable: true,
    visible: true,
    cooldown: 5000
};
