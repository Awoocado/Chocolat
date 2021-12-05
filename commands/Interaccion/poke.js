const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['-poke poke- ¿Sientes algo **{nombre}**?', '**{nombre}**... Déjame fastidiarte un poco e.e', '>:D sufre **{nombre}**'];
  let r2 = ['**{nombre}** fastidia a **{otro}** e.e', '**{nombre}** trata de conseguir la atención de **{otro}**', '**{nombre}** molesta un poco a **{otro}** >u<'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿te fastidiarás a ti mismo? e.e');
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`O-oye **${message.author.username}**... deja de fastidiarme >.<`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('poke').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.poke[Math.floor(Math.random() * gifs.poke.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.poke[Math.floor(Math.random() * gifs.poke.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'poke',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Fastidia a alguien del servidor o deja que {botname} te fastidie e.e',
  usage: '{prefix}poke [@usuario]',
  example: '{prefix}poke | {prefix}poke @MathError#6880\n\n1. *{prefix}poke*: {botname} te fastidiará. \n2. *{prefix}poke @usuario*: Fastidia al usuario mencionado.',
  aliases: ['tap', 'jab'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
