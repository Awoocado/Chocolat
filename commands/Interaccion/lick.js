const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];
  let r2 = ['**{nombre}** lame a **{otro}** o///o', '**{otro}**, te ha lamido de forma lasciva **{nombre}** >///<', '**{nombre}** está lamiendo suavemente a **{otro}** >u<'];

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿te vas a lamer a ti mismo?');
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+', lo siento, a mí no, mejor menciona a otro n.n').then(m => setTimeout(() => m.delete(), 6000));
  if (!user) return message.channel.createMessage(message.author.mention+", menciona a alguien.. y-yo no haré eso...").then(m => setTimeout(() => m.delete(), 6000));
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));

  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('lick').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.lick[Math.floor(Math.random() * gifs.lick.length)]);
return       message.channel.createMessage({ embed });
    });
  } else {
    embed.image(gifs.lick[Math.floor(Math.random() * gifs.lick.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'lick',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Lame al usuario mencionado.',
  usage: '{prefix}lick <@usuario>',
  example: '{prefix}lick @MathError#6880\n\nEsto hará que lamas al usuario mencionado.',
  aliases: ['slurp'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
