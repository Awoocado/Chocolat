const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['¡**{nombre}** se puso a bailar!', '¡**{nombre}** baila, baila!', 'Parece que a **{nombre}** le encanta bailar. ¡Mira esos pasos!'];
  let r2 = ['**{otro}**, parece que **{nombre}** quiere bailar contigo o.o', '**{nombre}** baila para **{otro}** >u<', '¡**{nombre}** y **{otro}**, a bailar!'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes bailar contigo mismo. >u<');
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('dance').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.dance[Math.floor(Math.random() * gifs.dance.length)]);
return message.channel.createMessage({ embed });
    });
  } else {
    embed.image(gifs.dance[Math.floor(Math.random() * gifs.dance.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'dance',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Expresa tus ganas de bailar ♫ O baila con el usuario mencionado.',
  usage: '{prefix}dance [@usuario]',
  example: '{prefix}dance | {prefix}dance @MathError#6880\n\n1. *{prefix}dance*: Empezarás a bailar.\n2. *{prefix}dance @usuario*: Esto hará que bailes junto al usuario mencionado.',
  aliases: ['move'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
