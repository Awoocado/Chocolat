const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['**{nombre}** parece tener sueño... Zzz', '**{nombre}** probablemente se está durmiendo >u<', '**{nombre}** tiene sueeeño... Zzz'];
  let r2 = ['**{nombre}** le apetece tomar una siesta con **{otro}** uwu', '**{nombre}** se dormirá junto a **{otro}**... Zzz', '**{nombre}** está en las últimas y descansará junto a **{otro}** >u<'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+", ¡No puedes dormir contigo! Eso es lo mismo que dormir a solas ._.").then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('sleepy').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.sleep[Math.floor(Math.random() * gifs.sleep.length)]);
return      message.channel.createMessage({ embed });
    });
  }else {
    embed.image(gifs.sleep[Math.floor(Math.random() * gifs.sleep.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'sleep',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Expresa que tienes sueño, o que ya te dormiste. También puedes dormir junto al usuario mencionado. zZz',
  usage: '{prefix}sleep [@usuario]',
  example: '{prefix}sleep | {prefix}sleep @MathError#6880\n\n1. *{prefix}sleep*: Duérmete o expresa tu sueño. \n2. *{prefix}sleep @usuario*: Duérmete junto al usuario mencionado.',
  aliases: ['nap', 'rest'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
