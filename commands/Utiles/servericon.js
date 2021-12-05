const Eris = require("eris-additions")(require("eris"))

exports.run = async (client, message, args) => {
  let icon = message.guild.iconURL
  if (!icon) return message.channel.createMessage(':x: | Este servidor no tiene un ícono válido.').then(m => setTimeout(() => m.delete(), 6000))
  const embed = new Eris.Embed()
    .title(`Icono de ${message.guild.name}`)
    .description(`[URL del icono](${icon})`)
    .image(`${icon}`)
    .footer(`Pedido por: ${message.author.tag}`)
    .color(Math.floor(Math.random() * 0xffffff))
  message.channel.createMessage({ embed })
}

exports.config = {
  command: 'servericon',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Muestra el ícono del servidor.',
  usage: '{prefix}servericon',
  example: '',
  aliases: ['sicon', 'spp', 'serveravatar'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
}