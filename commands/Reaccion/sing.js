const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['¡**{nombre}** está cantando con alegría! >u<', '**{nombre}** se puso a cantar >w<', '**{nombre}** canta con mucha emoción owo', '**{nombre}** adora cantar ＾3＾♪'];
  const embed = new Eris.Embed().image(gifs.sing[Math.floor(Math.random() * gifs.sing.length)]).color(Math.floor(Math.random() * 0xffffff));
  embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'sing',
  category: "Comandos de Reacción",
  permissions: 'Ninguno',
  description: '¡Canta con una gran emoción! ¡Dedícale un canto a todos!',
  usage: '{prefix}sing',
  example: '',
  aliases: ['chant'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};