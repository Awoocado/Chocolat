const Eris = require("eris-additions")(require("eris"));
const moment = require("moment");require('moment-duration-format');
const pack = require('../../package.json');
const config = require("../../config.json")

exports.run = async (client, message, args) => {
  let botversion = pack.version;
  let VC = (client.commands.filter(w => w.config.visible == true).map(q => q.config.command)).length
  let IC = (client.commands.filter(w => w.config.visible == false).map(q => q.config.command)).length
  let comandos = `Total: ${VC+IC} | Visibles: ${VC} | Invisibles: ${IC}`;

  const actividad = moment.duration(client.uptime).format(" D [días], H [hrs], m [mins], s [segs]");

  const embed = new Eris.Embed()
    .color(Math.floor(Math.random() * 0xffffff))
    .author(`Información de ${client.user.username}`, client.user.avatarURL)
    .thumbnail(client.user.avatarURL)
    .field('Desarrolladores', '```Noname7612#5043\nArcus#3871\nAvocado#0741```', true)
    .field('Programación', `\`\`\`• Versión del bot: ${botversion}\n• Lenguaje: JavaScript\n• Librería: Eris v${pack.dependencies["eris"]}\n• Comandos: ${comandos}\n• Prefijo: {prefix}\`\`\``.replace(/{prefix}/gi, config.prefix), true)
    .field('Actividad', `\`\`\`• Tiempo en línea: ${actividad}\n• Uso de Memoria del Cluster: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n• Shard: ${message.channel.guild.shard.id + 1}\`\`\``, true)
    .field('Links', '[Página web](https://chocolatbot.weebly.com) | [Servidor](https://discord.gg/CgSHkuK) | [Invitar](https://discordapp.com/oauth2/authorize?client_id=379757424447455232&permissions=8&scope=bot) | [Upvote](https://discordbots.org/bot/379757424447455232)', true)
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'botinfo',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Muestra información técnica del bot.',
  usage: '{prefix}botinfo',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
