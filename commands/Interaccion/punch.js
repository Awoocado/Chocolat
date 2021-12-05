const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r2 = ['**{nombre}** golpeó a **{otro}** D:', '**{otro}** recibe unos buenos puñetazos de **{nombre}** >n<', '**{nombre}** se agarra a golpes contra **{otro}** >o<'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  let user = message.mentions[0]

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no deberías hacer eso... Autolastimarse es malo en todos los sentidos. No permitiré que te hagas daño.');
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+", n-no me golpees... por favor :'c");
  if (!user) return message.channel.createMessage(message.author.mention+', lo siento... pero yo no soy violenta... Así que debes mencionar a alguien.').then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('punch').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.punch[Math.floor(Math.random() * gifs.punch.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.punch[Math.floor(Math.random() * gifs.punch.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'punch',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Golpea al usuario mencionado D\':',
  usage: '{prefix}punch <@usuario>',
  example: '{prefix}punch @MathError#6880\n\nEsto hará que golpees al usuario mencionado.',
  aliases: ['hit'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
