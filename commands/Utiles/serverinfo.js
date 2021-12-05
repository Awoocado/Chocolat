const Eris = require("eris-additions")(require("eris"));
const dateFormat = require('dateformat');
const config = require('../../config.json')
exports.run = async (client, message, args) => {
  let server = message.guild;
  let users = server.members.filter(s => s.user.bot !== true)
  let bots = server.members.filter(s => s.user.bot !== false)
  const region = {
    "brazil": "Brazil :flag_br:",
    "eu-central": "Central Europe :flag_eu:",
    "singapore": "Singapore :flag_sg:",
    "us-central": "U.S. Central :flag_us:",
    "sydney": "Sydney :flag_au:",
    "us-east": "U.S. East :flag_us:",
    "us-south": "U.S. South :flag_us:",
    "us-west": "U.S. West :flag_us:",
    "eu-west": "Western Europe :flag_eu:",
    "singapore": "Singapore :flag_sg:",
    "london": "London :flag_gb:",
    "japan": "Japan :flag_jp:",
    "russia": "russia :flag_ru:",
    "hongkong": "Hong Kong :flag_hk:",
    "frankfurt": "Frankfurt",
    "india": "India",
    "amsterdan": "Amsterdan",
    "europe": "Europe :flag_eu:"
  };
  const verificationLevels = {
    0:'Ninguno.\nSin restricciones.',
    1:'Bajo.\nEl usuario debe tener un correo verificado.',
    2:'Medio.\nEl usuario debe llevar registrado en Discord al menos 5 minutos.',
    3:'(╯°□°）╯︵ ┻━┻ (Alto)\nEl usuario debe ser miembro del servidor más de 10 minutos para poder enviar mensajes.',
    4:'┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻ (Extremo)\nEl usuario debe tener un número de teléfono válido y verificado.'
  }
  const explicitContentFilter = {
    0:'**Nivel 1**\nNo escanear ningún mensaje.',
    1:'**Nivel 2**\nEscanear mensajes de miembros sin roles.',
    2:'**Nivel 3**\nEscanear todos los mensajes.'
  };

  const embed = new Eris.Embed()
    .thumbnail(server.iconURL)
    .author(server.name, server.iconURL)
    .field('ID', server.id, true)
    .field('Región', `${region[server.region]}`, true)
    .field('Creado el', `${dateFormat(server.createdAt)}`, true)
    .field('Dueño del servidor', server.members.get(server.ownerID).tag + ' (' + server.ownerID + ')', true)
    .field(`Miembros totales: ${server.memberCount}`, `Usuarios: ${users.length}\n Bots: ${bots.length}`, true)
    .field('Roles', server.roles.size + '\nUsa {prefix}rolelist para obtener la lista de roles.'.replace(/{prefix}/gi, config.prefix), true)
    .field('Canales', `Canales de Texto: ${server.channels.filter(m => m.type === 0).length} \n Canales de Voz: ${server.channels.filter(m => m.type === 2).length}\nUsa {prefix}channellist para obtener la lista de canales.`.replace(/{prefix}/gi, config.prefix), true)
    .field('Canal AFK', server.afkChannelID !== null ? `Nombre: ${server.channels.get(server.afkChannelID).name} \n Tiempo de espera: ${server.afkTimeout} segundos.` : 'Ninguno.', true)
    .field('Nivel de verificación', `${verificationLevels[server.verificationLevel]}`, true)
    .field('Filtro de contenido explícito', `${explicitContentFilter[server.explicitContentFilter]}`, true)
    .color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'serverinfo',
  category: 'Comandos Útiles',
  permissions: 'Ninguno',
  description: 'Obtén información detallada del servidor.',
  usage: '{prefix}serverinfo',
  example: '',
  aliases: ['sinfo', 'server'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};