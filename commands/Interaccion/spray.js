const Eris = require("eris-additions")(require("eris"));
const gifs = require('../../data/gif.json');

exports.run = async (client, message, args) => {
  let r = ['-Le rocía spray a **{nombre}**- jejeje', '**{nombre}** esto será por tu bien -le rocía-', 'Te rociaré toda la cara con mi spray **{nombre}** o.o'];
  let r2 = ['**{nombre}** roció a **{otro}**', '**{otro}** recibió tremenda rociada por **{nombre}**', '**{nombre}** le rocía algo que parece ser veneno a **{otro}**'];
  const embed = new Eris.Embed().color(Math.floor(Math.random() * 0xffffff)).image(gifs.spray[Math.floor(Math.random() * gifs.spray.length)]);

  if (message.content.includes(message.author.id)) return message.channel.createMessage(message.author.mention+', ¿de verdad te vas a rociar a ti mismo?').then(m => setTimeout(() => m.delete(), 6000));
  let m = {'{nombre}': message.author.username, '{otro}': message.mentions[0] ? message.mentions[0].username: undefined};
  if (message.content.includes(client.user.id)) embed.description(`**${message.author.username}** ¡Aaah, a mí no, me arde! >.<`);
  else if (!message.content.includes(client.user.id) && message.mentions[0]) embed.description((r2[Math.floor(Math.random() * r2.length)]).replace(/{nombre}|{otro}/gi, function(ra){return m[ra]}));
  else embed.description((r[Math.floor(Math.random() * r.length)]).replace(/{nombre}/gi, message.author.username));
  
  message.channel.createMessage({ embed });
};

exports.config = {
  command: 'spray',
  category: "Comandos de Interacción",
  permissions: 'Ninguno',
  description: 'Rocíale tu sustancia favorita a un usuario, o deja que {botname} te rocíe un spray.',
  usage: '{prefix}spray [@usuario]',
  example: '{prefix}spray | {prefix}spray @MathError#6880\n\n1. *{prefix}spray*: {botname} te rociará con un spray.\n2. *{prefix}spray @usuario*: Rocíale con un spray una sustancia al usuario mencionado.',
  aliases: ['sprinkle'],
  developerOnly: false,
  allowedToDisable: true,
  visible: true,
  cooldown: 5000
};
