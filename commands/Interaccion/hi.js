const Eris = require("eris-additions")(require("eris"))
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['¡**{nombre}** está saludando a todos!', '**{nombre}** nos saluda, hola **{nombre}**', '**{nombre}** te saluda, regrésale un saludo.'];
  let r2 = ['**{nombre}** saluda a **{otro}**', '¡**{otro}**, te saluda **{nombre}**, salúdale!', '**{otro}**, hola de parte de **{nombre}** uwu'];
  const embed = new Eris.Embed().image(gifs.hi[Math.floor(Math.random() * gifs.hi.length)]).color(Math.floor(Math.random() * 0xffffff));

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', no puedes saludarte a ti mismo O.o');
  if (message.content.includes(client.user.id)) {
    embed.description(`¡Hooolaaa! **${message.author.username}** nwn`);
    return message.channel.createMessage({ embed });
  };
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
    message.channel.createMessage({ embed });
};

exports.config = {
  command: 'hi',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Saluda a un amigo o saluda a todos los presentes n.n/',
  usage: '{prefix}hi [@usuario]',
  example: '{prefix}hi | {prefix}hi @MathError#6880\n\n1. *{prefix}hi*: Saluda a todos.\n2. *{prefix}hi @usuario*: Saluda al usuario mencionado.', 
  aliases: ['hello'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};