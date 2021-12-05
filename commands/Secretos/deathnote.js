const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  let user = message.mentions[0];

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¡no deberías hacerte eso!').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(client.user.id)) return message.channel.createMessage('Mejor ahorra la tinta.').then(m => setTimeout(() => m.delete(), 6000))
  if (!user) return message.channel.createMessage(':x: | Debes mencionar a un usuario.').then(m => setTimeout(() => m.delete(), 6000))
  let embed = new Eris.Embed().description(`**${message.author.username}** está escribiendo algo sospechoso.`).image(gifs.deathnote1[Math.floor(Math.random() * gifs.deathnote1.length)]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 2/15.');
  message.channel.createMessage({ embed });
  let embed2 = new Eris.Embed().description(`**${user.username}** ha muerto. D:`).image(gifs.deathnote2[Math.floor(Math.random() * gifs.deathnote2.length)]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 2/15.');
  embed = embed2;
  setTimeout(function () {
    message.channel.createMessage({ embed });
  }, 40000);
};

exports.config = {
  command: 'deathnote',
  category: "Comandos Secretos",
  permissions: 'Ninguno',
  description: 'Escribe la muerte del usuario mencionado en la Death Note. Una vez pasados los 40 segundos se anunciará la muerte del usuario. (Tipo: Comando de Interacción)',
  usage: '{prefix}deathnote <@usuario>',
  example: '{prefix}deathnote @MathError#6880\n\nEsto hará que escribas en la Death Note el nombre del usuario mencionado.',
  aliases: ['dnote'],
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 45000
};