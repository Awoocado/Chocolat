const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));
  let r = ['**{nombre}** te acariciaré un poquito nwn', 'Déjame acariarte **{nombre}**', 'Ven, quiero acariciarte **{nombre}** uwu'];
  let r2 = ['**{nombre}** le da caricias a **{otro}** uwu', '**{otro}** recibe caricias con cariño por **{nombre}**', '**{nombre}** acaricia con amor a **{otro}** >u<'];

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes acariciarte a ti mismo. Aunque si quieres que yo te acaricie, utiliza `{prefix}pat` uwu.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`uwu -corresponde las caricias de **${message.author.username}**-`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('pat').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.pat[Math.floor(Math.random() * gifs.pat.length)]);
return       message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.pat[Math.floor(Math.random() * gifs.pat.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'pat',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Acaricia al usuario mencionado o deja que {botname} te acaricie uwu',
  usage: '{prefix}pat [@usuario]',
  example: '{prefix}pat | {prefix}pat @MathError#6880\n\n1. *{prefix}pat*: {botname} te acariciará si no mencionas a alguien.\n2. *{prefix}pat @usuario*: Esto hará que acaricies al usuario mencionado.',
  aliases: ['pet'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
