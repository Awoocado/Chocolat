const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.createMessage(message.author.mention+", no puedo mostrar contenido NSFW fuera de los canales NSFW.").then(m => setTimeout(() => m.delete(), 6000))
  let user = message.mentions[0];

  if (!user) return message.channel.createMessage(message.author.mention+", e-esto ya es ir muy lejos, así que d-debes mencionar a alguien...").then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+', conmigo no...').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', entonces... te follarás a ti mismo... vale...').then(m => setTimeout(() => m.delete(), 6000))

  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).description(`**${message.author.username}** se folló a **${user.username}** O///O`);
    embed.image(gifs.fuck[Math.floor(gifs.fuck.length * Math.random())]);
    message.channel.createMessage({ embed });
};

exports.config = {
  command: "fuck",
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Ten relaciones sexuales con el usuario mencionado.',
  usage: '{prefix}fuck <@usuario>',
  example: '{prefix}fuck @SomeUser#7732\n\nEsto hará que tengas sexo con el usuario mencionado.',
  aliases: ['sex', 'rape'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
