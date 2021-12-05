const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** déjame darte un abrazo >u<', '**{nombre}** ven conmigo, te voy a dar un abrazo muy cariñoso uwu', '-abraza a **{nombre}**- o///o'];
  let r2 = ['**{nombre}** le da un cariñoso abrazo a **{otro}**', '**{otro}** recibe un caluroso abrazo de **{nombre}** >u<', '**{nombre}** abrazó a **{otro}** uwu', '**{nombre}** le da un abrazo a **{otro}** con amor u///u'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes abrazarte a ti mismo. A-aunque, si quieres un abrazo de mi parte, puedes utilizar `{prefix}hug`... uwu'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`Aww... -corresponde el abrazo de **${message.author.username}**- uwu`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('hug').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.hug[Math.floor(Math.random() * gifs.hug.length)]);
return       message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.hug[Math.floor(Math.random() * gifs.hug.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'hug',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Abraza a alguien del servidor o deja que {botname} te abrace >u<',
  usage: '{prefix}hug [@usuario]',
  example: '{prefix}hug | {prefix}hug @MathError#6880\n\n1. *{prefix}hug*: {botname}te abrazará si no mencionas a alguien.\n2. *{prefix}hug @usuario*: Esto hará que abraces al usuario mencionado.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
