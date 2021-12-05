const Eris = require("eris-additions")(require("eris"));
exports.run = async (client, message, args) => {
  let memess = require('../../data/memes.json')
  let r = memess[Math.floor(Math.random() * memess.length)];
  const vid = ['.mp4', '.mov', 'webm']
  const embed = new Eris.Embed()
    .image(r)
    .color(Math.floor(Math.random() * 0xffffff));
  if(vid.some(p => r.toLowerCase().includes(p))) message.channel.createMessage(`${r}`);
  else message.channel.createMessage({ embed });
};

exports.config = {
  command: 'meme',
  category: 'Comandos Divertidos',
  permissions: 'Ninguno',
  description: 'Obtén un meme aleatorio. Cortesía Comunidad de Chocolat.',
  usage: '{prefix}meme',
  example: '',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
