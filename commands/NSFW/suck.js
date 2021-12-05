const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.createMessage(message.author.mention+', no puedo mostrar contenido NSFW fuera de los canales NSFW.').then(m => setTimeout(() => m.delete(), 6000));
  let user = message.mentions[0];

  if (!user) return message.channel.createMessage(message.author.mention+', debes mencionar a alguien. ¬///¬').then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+', a-a mí no...').then(m => setTimeout(() => m.delete(), 6000));
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', n-no creo que haga falta que te diga... lo obvio -.-').then(m => setTimeout(() => m.delete(), 6000));
  
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).description(`**${message.author.username}** lame/chupa el miembro de **${user.username}**...`);
    embed.image(gifs.suck[Math.floor(gifs.suck.length * Math.random())]);
    message.channel.createMessage({ embed });
};

exports.config = {
  command: 'suck',
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Lame/chupa el miembro del usuario mencionado...',
  usage: '{prefix}suck <@usuario>',
  example: '{prefix}suck @SomeUse#7781\nEsto hará que le chupes/lamas el pene/vagina al usuario mencionado.',
  aliases: ['blowjob'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
