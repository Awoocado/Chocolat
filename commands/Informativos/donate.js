const Eris = require("eris-additions")(require("eris"));
const config = require('../../config.json')

exports.run = async (client, message, args) => {
  const embed = new Eris.Embed()
    .author('Donaciones.', client.user.avatarURL)
    .description('Actualmente contamos con `Patreon y PayPal` para recibir donaciones. ¡Donando podrás acceder a contenido exclusivo y demás cosas! :heart: ')
    .field('Patreon.', '[Click acá para donar.](https://www.patreon.com/ChocolatDiscordBot)')
    .field('PayPal', 'Consulte en el soporte del [servidor](https://discord.gg/CgSHkuK).')
    .color(Math.floor(Math.random() * 0xffffff))
  try {
    await message.author.createMessage({ embed });
    await message.channel.createMessage(':white_check_mark: | Te he enviado el método de donación a tus mensajes privados.').then(m => setTimeout(() => m.delete(), 6000))
  } catch (e) {
    return message.channel.createMessage(':x: | No pude enviarte el mensaje a tus Mensajes Privados. Es posible que tengas tus Mensajes Privados deshabilitados. Utiliza `{prefix}infonodm` para obtener toda la información necesaria sin recibir algún mensaje privado.'.replace(/{prefix}/gi, config.prefix)).then(m => setTimeout(() => m.delete(), 6000))
  };
};

exports.config = {
  command: 'donate',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: '{botname} te enviará los métodos de donaciones a tus mensajes privados.',
  usage: '{prefix}donate',
  aliases: ['patreon', 'paypal'],
  example: '',
  developerOnly: false,
  allowedToDisable: false,
  visible: true,
  cooldown: 5000
};