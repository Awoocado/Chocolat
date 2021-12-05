const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];;
  if (!message.channel.memberHasPermission(client.user.id, 'manageMessages'));
else message.delete();
  if (!user) return message.channel.createMessage(':x: | Menciona a alguien para revivirlo o curarlo.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', si estás muerto no te puedes revivir, y si estás vivo, ¿para qué revivirte?').then(m => setTimeout(() => m.delete(), 6000))

  const embed = new Eris.Embed().image(gifs.revive[Math.floor(Math.random() * gifs.revive.length)]).color(Math.floor(Math.random() * 0xffffff)).footer('Comando secreto: 1/15.');

  if (message.content.includes(client.user.id)) embed.description(`¡Muchas gracias ${message.author.username}!, me siento como nueva.`);
  else if (!message.content.includes(client.user.id) && user) embed.description(`**${message.author.username}** ha revivido/curado a **${user.username}**`);
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'revive',
  category: "Comandos Secretos",
  permissions: 'Ninguno',
  description: 'Revive al usuario mencionado que haya muerto con este comando secreto.',
  usage: '{prefix}revive <@Usuario>',
  example: '{prefix}revive @MathError6880\n\nEsto hará que revivas al usuario mencionado.',
  aliases: ['resurrect'],
  developerOnly: false,
  allowedToDisable: true,
  visible: false,
  cooldown: 5000
};