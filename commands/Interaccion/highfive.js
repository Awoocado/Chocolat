const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['¡Choca esos 5 **{nombre}**!', '¡Hasta arriba **{nombre}**!', '¡Chócalas **{nombre}**!'];
  let r2 = ['¡**{nombre}** choca esos 5 con **{otro}**!', '¡**{nombre}** y **{otro}** se comparten la gloria!', '**{otro}** dale los 5 a **{nombre}**'];
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿te darás los 5 a ti mismo? O.o');
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  
  if (message.content.includes(client.user.id)) embed.description(`¡Yay! :D/ **${message.author.username}**`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('highfive').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.highfive[Math.floor(Math.random() * gifs.highfive.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.highfive[Math.floor(Math.random() * gifs.highfive.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'highfive',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: '¡Da los 5 a la persona mencionada! :D/ o deja que {botname} te de los 5.',
  usage: '{prefix}highfive [@usuario]',
  example: '{prefix}highfive | {prefix}highfive @MathError#6880\n\n1. *{prefix}highfive*: {botname} te dará los 5 si no mencionas a alguien.\n2. *{prefix}highfive @usuario*: Con esto le darás los 5 al usuario mencionado.',
  aliases: ['five'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
