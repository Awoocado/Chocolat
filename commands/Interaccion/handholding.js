const Eris = require("eris-additions")(require("eris"));
const Taihou = require('taihou');
const config = require("../../config.json")
const weebSH = new Taihou(config.taihou.token, true, config.taihou.options);
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let user = message.mentions[0];
  let r2 = ['**{nombre}** le agarra la mano a **{otro}**', '**{nombre}** sostiene la mano de **{otro}** románticamente u///u', '**{nombre}** y **{otro}** se agarran de la mano >u<'];
  if (!user) return message.channel.createMessage(message.author.mention+', y-yo no podría ir tan lejos... así que mejor menciona a un usuario.').then(m => setTimeout(() => m.delete(), 8000));
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', aww... Entiendo que estés solo/a... Pero deberás mencionar a otra persona.');
  if (message.content.includes(client.user.id)) return message.channel.createMessage(message.author.mention+', lo siento... pero yo n-no puedo hacer eso >///<, menciona a otro, ¿sí?');
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  if (Math.random() > .50) {
    return weebSH.toph.getRandomImage('handholding').then(gif => {
      embed.image(gif.url);
      message.channel.createMessage({ embed });
    }).catch(error => {
      embed.footer('Ha ocurrido un error. Se estarán mostrando GIFs alternativos.').image(gifs.handholding[Math.floor(Math.random() * gifs.handholding.length)]);
      return message.channel.createMessage({ embed });
    });
  } else {
    embed.image(gifs.handholding[Math.floor(Math.random() * gifs.handholding.length)]);
  };
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'handholding',
  category: 'Comandos de Interacción',
  permissions: 'Ninguno',
  description: 'Agárrale la mano románticamente al usuario mencionado.',
  usage: '{prefix}handholding <@usuario>',
  example: '{prefix}handholding @MathError#6880\n\nEsto le agarrá la mano románticamente al usuario mencionado.',
  aliases: ['hh', 'hands'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
