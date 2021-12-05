const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return message.channel.createMessage(message.author.mention+', no puedo mostrar contenido NSFW fuera de los canales NSFW.').then(m => setTimeout(() => m.delete(), 6000))
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).description("...");
    embed.image(gifs.gmasturbate[Math.floor(gifs.gmasturbate.length * Math.random())]);
    message.channel.createMessage({ embed });
};

exports.config = {
  command: "gmasturbate",
  category: 'Comandos NSFW',
  permissions: 'Canal NSFW',
  description: 'Muestra gifs de chicas masturbándose. En su mayoría son provenientes del hentai.',
  usage: '{prefix}gmasturbate',
  example: '',
  aliases: ['gmast'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
