const Eris = require("eris-additions")(require("eris"))
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', deberías aplaudirle a otra persona, no te aplaudas a ti. :c');
  let r = ['¡**{nombre}** aplaude!', '**{nombre}** está aplaudiendo.', '**{nombre}** comenzó a aplaudir.'];
  let r2 = ['**{nombre}** reconoce las hazañas de **{otro}**', '¡**{nombre}** felicita a **{otro}**!', '**{nombre}** le aplaude a **{otro}**'];
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  let embed = new Eris.Embed();
  
  if (message.content.includes(client.user.id)) embed.description(`**${message.author.username}** muchas gracias n.n`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  embed.image(gifs.claps[Math.floor(Math.random() * gifs.claps.length)]);
  embed.color(Math.floor(Math.random() * 0xffffff));
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'claps',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Aplaude de algo o aplaude al usuario mencionado.',
  usage: '{prefix}claps [@usuario]',
  example: '{prefix}claps | {prefix}claps @MathError#6880\n\n1. *{prefix}claps*: Esto hará que le aplaudas a algo. \n2. *{prefix}claps @usuario*: Aplaude al usuario mencionado.',
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};