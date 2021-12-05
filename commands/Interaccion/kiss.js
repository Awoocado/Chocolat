const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];
  let deny = ['344414319880175618'];
  let aby = ['656860233402023946'];
  let r2 = ['**{nombre}** le dio un beso a **{otro}** o///o', '**{otro}** ha recibido un beso de **{nombre}** >///<', '**{nombre}** le ha dado un beso con mucho amor a **{otro}** u///u'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(deny)) return message.channel.createMessage(message.author.mention+', no puedes besar a esa persona.').then(m => setTimeout(() => m.delete(), 6000))
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿te besarás a ti mismo? o.O');
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+', n-no puedo hacerlo >u<');
  if (!user) return message.channel.createMessage(message.author.mention+", l-lo siento >u<, pero debes mencionar a alguien.").then(m => setTimeout(() => m.delete(), 6000))
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.author.id == aby) embed.description(`**${message.author.username}** le dio un delicioso beso sabor a chocolate a **${user.username}** o///o :chocolate_bar:`);
  else embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
 
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('kiss').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.kiss[Math.floor(Math.random() * gifs.kiss.length)]);
return       message.channel.createMessage({ embed });
    });
  } else {
    embed.image(gifs.kiss[Math.floor(Math.random() * gifs.kiss.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'kiss',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Besa al usuario mencionado o///o',
  usage: '{prefix}kiss <@usuario>',
  example: '{prefix}kiss @MathError#6880\n\nEsto hará que beses al usuario mencionado.',
  aliases: ['peck', 'smooch'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
