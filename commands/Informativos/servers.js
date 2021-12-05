const Eris = require("eris-additions")(require("eris"));

exports.run = async (client, message, args) => {
  let developers = ['192756779573051392', '398658092021055511', '224619540263337984']
  if (!developers.includes(message.author.id)) return message.channel.createMessage(':x: | Este comando es sólo para desarrolladores del bot temporalmente.').then(m => setTimeout(() => m.delete(), 6000))
  let guilds = await client.guilds.size;
  let users = await client.users.size;

  const embed = new Eris.Embed()
    .author('Servidores de ' + client.user.username + '', client.user.avatarURL)
    .description('' + client.user.username + ' está en **' + guilds + '** servidores y con **' + users + '** usuarios.')
    .color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'servers',
  category: 'Comandos Informativos',
  permissions: 'Ninguno',
  description: 'Envía la cantidad de servidores donde está {botname} y la cantidad de usuarios que la usan.',
  usage: '{prefix}servers',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};