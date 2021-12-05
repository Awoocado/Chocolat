const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
    let ping = Math.floor(message.channel.guild.shard.latency);
    const embed = new Eris.Embed().title("🏓 Ping").description(`:incoming_envelope: Envío de mensajes: **${Date.now() - message.timestamp} ms.**\n:satellite_orbital: DiscordAPI: **${ping} ms.**`).color(Math.floor(Math.random() * 0xffffff));
    message.channel.createMessage({ embed });
};

exports.config = {
  command: 'ping',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Obtén la latencia de envíos de mensajes de {botname} y de la API de Discord.',
  usage: '{prefix}ping',
  example: '',
  aliases: ['pong', 'p'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};