const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['Déjame estar junto a ti **{nombre}** uwu', '¿**{nombre}** te gusta estar junto a mí? >w<', 'Me acurrucaré contigo **{nombre}**, espero no incomodarte n.n'];
  let r2 = ['**{nombre}** se acurruca con **{otro}** uwu', '**{nombre}** está muy cerca de **{otro}**, se ven tiernos >u<', '**{otro}** déjate recibir cariño por **{nombre}**'];
  let embed = new Eris.Embed().color(12397940);

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes acurrucarte a ti mismo... Aunque puedes acurrucarte conmigo u///u utilizando `{prefix}cuddle`.'.replace(/{prefix}/gi, require('../../config.json').prefix)).then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('cuddle').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.cuddle[Math.floor(Math.random() * gifs.cuddle.length)]);
return      message.channel.createMessage({ embed });
    });
  } else {
    embed.image(gifs.cuddle[Math.floor(Math.random() * gifs.cuddle.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'cuddle',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Acurrúcate con el usuario mencionado o acurrúcate con {botname} uwu',
  usage: '{prefix}cuddle [@usuario]',
  example: '{prefix}cuddle | {prefix}cuddle @MathError#6880\n\n1. *{prefix}cuddle*: Sin mencionar a alguien podrás acurrucarte con {botname}.\n2. *{prefix}cuddle @usuario*: Esto hará que te acurruques con el usuario mencionado.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
